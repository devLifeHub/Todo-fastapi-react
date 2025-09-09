from sqlalchemy import Enum
from enum import Enum as PyEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from core.types.user_id import UserIdType
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase, SQLAlchemyBaseUserTable
from .base import Base
from .mixins.id_int_pk import IdIntPkMixin

class UserPlanEnum(PyEnum):
    BASIC = "BASIC"
    PREMIUM = "PREMIUM"
    VIP = "VIP"

class User(Base, IdIntPkMixin, SQLAlchemyBaseUserTable[UserIdType]):
    name: Mapped[str] = mapped_column(nullable=False, index=True)
    surname: Mapped[str] = mapped_column(nullable=False)
    plan: Mapped[str] = mapped_column(
        Enum(UserPlanEnum, name="user_plan_enum", create_type=True),
        nullable=False,
        server_default=UserPlanEnum.BASIC.value
    )

    reviews: Mapped[list["Review"]] = relationship(
        "Review",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    todos: Mapped[list["Todo"]] = relationship(
        "Todo",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    avatars: Mapped[list["Avatar"]] = relationship(
        "Avatar",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    @classmethod
    def get_db(cls, session: "AsyncSession"):
        return SQLAlchemyUserDatabase(session, cls)
