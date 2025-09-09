from typing import Annotated

from fastapi import APIRouter, Depends
from api.views.auth_users.fastapi_users import fastapi_users
from core.config import settings
from core.schemas.user import UserRead, UserUpdate

router = APIRouter(
    prefix=settings.api_auth.users,
    tags=["Users"],
)

router.include_router(
    router=fastapi_users.get_users_router(
        UserRead,
        UserUpdate,
    ),
)