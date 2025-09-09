from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from core.models.review import Review
from core.models.user import User
from core.models.avatar import Avatar
from core.schemas.review import ReviewCreate, ReviewUpdate

async def create_review(session: AsyncSession, user_id: int, review_data: ReviewCreate) -> Review | None:
    existing_review = await session.execute(select(Review).where(Review.user_id == user_id))
    if existing_review.scalar_one_or_none():
        return None

    new_review = Review(user_id=user_id, **review_data.dict())
    session.add(new_review)
    await session.commit()
    await session.refresh(new_review)
    return new_review

async def get_reviews(session: AsyncSession) -> list:
    stmt = (
        select(
            Review.rating,
            Review.comment,
            Review.created_at,
            User.name,
            User.surname,
            Avatar.avatar,
        )
        .select_from(Review)
        .join(User, Review.user_id == User.id)
        .outerjoin(Avatar, Review.user_id == Avatar.user_id)
    )

    result = await session.execute(stmt)
    return [dict(row._mapping) for row in result]

async def get_review(session: AsyncSession, review_id: int) -> Review | None:
    result = await session.execute(select(Review).where(Review.id == review_id))
    return result.scalar_one_or_none()

async def update_review(session: AsyncSession, review_id: int, review_data: ReviewUpdate) -> Review | None:
    review = await get_review(session, review_id)
    if not review:
        return None
    for key, value in review_data.dict(exclude_unset=True).items():
        setattr(review, key, value)
    await session.commit()
    await session.refresh(review)
    return review

async def delete_review(session: AsyncSession, review_id: int, user_id: int) -> bool:
    review = await get_review(session, review_id)
    if not review or review.user_id != user_id:  # 🔥 Проверяем, что отзыв принадлежит текущему пользователю
        return False
    await session.delete(review)
    await session.commit()
    return True

async def get_reviews_by_user(session: AsyncSession, user_id: int) -> list[Review]:
    query = select(Review).where(Review.user_id == user_id)
    result = await session.execute(query)
    return result.scalars().all()
