from fastapi import APIRouter

from core.config import settings

router = APIRouter(
    prefix=settings.api_prices.prices,
    tags=settings.api_prices.tags,
)

@router.get("/subscription-prices/")
async def get_subscription_prices():
    return settings.subscription.get_prices()
