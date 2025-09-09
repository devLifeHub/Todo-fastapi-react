from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import stripe
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from core.config import settings
from core.models.user import User
from api.dependencies.get_db import get_db_session
from api.views.auth_users.fastapi_users import fastapi_users
from core.schemas.user import UserPlanEnum
from fastapi.responses import JSONResponse

router = APIRouter(prefix=settings.api_payments.payments, tags=settings.api_payments.tags)

stripe.api_key = settings.stripe.secret_key
current_user = fastapi_users.current_user()

class PaymentRequest(BaseModel):
    subscription_type: str
    payment_method_id: str

@router.post("/")
async def process_payment(payment_data: PaymentRequest, db: AsyncSession = Depends(get_db_session),
                          current_user: User = Depends(current_user)):
    subscription_prices = settings.subscription.get_prices()
    if payment_data.subscription_type not in subscription_prices:
        raise HTTPException(status_code=400, detail="Invalid subscription type!")

    amount = subscription_prices[payment_data.subscription_type] * 100
    idempotency_key = str(uuid.uuid4())

    try:
        if current_user is None:
            raise HTTPException(status_code=401, detail="User not found!")

        print("Current user:", current_user.email)

        customer = stripe.Customer.create(email=current_user.email, metadata={"test_mode": True})
        print("Stripe client created:", customer.id)

        stripe.PaymentMethod.attach(payment_data.payment_method_id, customer=customer.id)
        print("`paymentMethod.id` tied to`customer`:", payment_data.payment_method_id)

        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            customer=customer.id,
            payment_method=payment_data.payment_method_id,
            confirm=True,
            automatic_payment_methods={"enabled": True, "allow_redirects": "never"},
            metadata={"test_mode": True, "subscription": payment_data.subscription_type},
            idempotency_key=idempotency_key,
        )
        print("✅ `PaymentIntent.status` after creation:", payment_intent.status)

        if payment_intent.status != "succeeded":
            raise HTTPException(status_code=400, detail=f"Payment not completed! ({payment_intent.status})")

        current_user.plan = UserPlanEnum(payment_data.subscription_type).value
        try:
            await db.merge(current_user)
            await db.commit()
        except Exception as e:
            await db.rollback()
            raise HTTPException(status_code=500, detail=f"Error saving data: {str(e)}")

        response = JSONResponse(content={
            "status": "Test payment successful!",
            "subscription": payment_data.subscription_type,
            "amount": f"${amount / 100:.2f}",
            "payment_id": payment_intent.id,
            "updated_plan": current_user.plan,
        })
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response.headers["Access-Control-Allow-Methods"] = "POST"
        response.headers["Access-Control-Allow-Headers"] = "*"

        return response

    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=f"Payment error: {str(e)}")