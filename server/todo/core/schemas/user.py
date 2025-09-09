from fastapi_users import schemas
from core.types.user_id import UserIdType
from enum import Enum

class UserPlanEnum(str, Enum):
    BASIC = "BASIC"
    PREMIUM = "PREMIUM"
    VIP = "VIP"

class UserRead(schemas.BaseUser[UserIdType]):
    name: str
    surname: str
    plan: UserPlanEnum

class UserCreate(schemas.BaseUserCreate):
    name: str
    surname: str
    plan: UserPlanEnum

class UserUpdate(schemas.BaseUserUpdate):
    name: str | None = None
    surname: str | None = None

