from fastapi import APIRouter

from core.config import settings
from .views import router_auth, router_base

from .views.users import router_users_count

router = APIRouter(
    prefix=settings.api.prefix,
)

router.include_router(router_auth)
router.include_router(router_base)

