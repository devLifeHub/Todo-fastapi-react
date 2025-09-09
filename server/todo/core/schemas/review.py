from typing import Optional

from pydantic import BaseModel
from datetime import datetime

class ReviewBase(BaseModel):
    rating: int
    comment: str

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    rating: int | None = None
    comment: str | None = None

class ReviewRead(ReviewBase):
    name: str
    surname: str
    created_at: datetime
    rating: int
    comment: str
    avatar: Optional[str]

    class Config:
        from_attributes = True
