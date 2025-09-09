from pydantic import BaseModel
from datetime import datetime

class TodoBase(BaseModel):
    title: str
    description: str | None = None
    is_completed: bool = False
    is_fail: bool = False

    end_date: datetime | None = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    title: str | None = None
    is_completed: bool | None = None
    is_fail: bool | None = None

class TodoResponse(TodoBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
