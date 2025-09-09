from fastapi import (
    APIRouter,
    Depends,
)
from fastapi.security import HTTPBearer

from .auth_users import router_identity
from .auth_users import router_users
from .todos import router_todos
from .users import router_user_delete

from .users import router_users_count
from .avatars import router_avatars
from .todos import router_todos_count
from .reviews import router_reviews
from .reviews import router_all_reviews

from .payments import router_payments

from .subscription_prices import router_subscription_prices

http_bearer = HTTPBearer(auto_error=False)

router_auth = APIRouter(
    dependencies=[Depends(http_bearer)],
)
router_auth.include_router(router_identity)
router_auth.include_router(router_user_delete)
router_auth.include_router(router_users)
router_auth.include_router(router_todos)
router_auth.include_router(router_reviews)
router_auth.include_router(router_avatars)

router_base = APIRouter()
router_base.include_router(router_users_count)
router_base.include_router(router_todos_count)
router_base.include_router(router_all_reviews)
router_base.include_router(router_payments)
router_base.include_router(router_subscription_prices)