from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.dependencies.get_db import get_db_session
from core.config import settings
from core.models.user import User
from api.views.auth_users.fastapi_users import fastapi_users

router = APIRouter(
    prefix=settings.api_users.users,
    tags=["Users"],
)

current_active_user = fastapi_users.current_user(active=True)

@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_current_user(
    user: Annotated[User, Depends(current_active_user)],
    session: AsyncSession = Depends(get_db_session)
):
    db_user = await session.get(User, user.id)
    if db_user:
        await session.delete(db_user)
        await session.commit()

