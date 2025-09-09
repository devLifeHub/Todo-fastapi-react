
from core.celery_app import celery_app
from utils.drive_client import delete_from_drive_sync, upload_to_drive_sync
import logging

from core.crud.review import create_review, get_reviews_by_user, get_reviews
from core.db.sync_db import SessionLocal
from core.models import db_helper, Avatar
from core.models.user import User
from utils.fetch_gdrive_bytes import fetch_gdrive_avatar_bytes

logging.basicConfig(level=logging.INFO)

import io
import logging
import base64
import asyncio

from sqlalchemy import select

@celery_app.task(name="upload_file_task")
def upload_file_task(
    user_id: int, file_data: bytes, filename: str, content_type: str
) -> dict:
    db = SessionLocal()
    try:
        user = db.get(User, user_id)
        if not user:
            return {"error": "User not found"}

        ext = filename.rsplit(".", 1)[-1]
        avatar_name = f"{user.name}_{user.surname}_{user.id}.{ext}"
        blob = io.BytesIO(file_data)

        stmt = select(Avatar).where(Avatar.user_id == user.id)
        avatar_inst = db.execute(stmt).scalar_one_or_none()

        if avatar_inst and avatar_inst.avatar:
            delete_from_drive_sync(avatar_inst.avatar)

        file_id = upload_to_drive_sync(blob, avatar_name, content_type)

        if avatar_inst:
            avatar_inst.avatar = file_id
            avatar_inst.avatar_name = avatar_name
        else:
            db.add(Avatar(
                user_id=user.id,
                avatar=file_id,
                avatar_name=avatar_name
            ))

        db.commit()
        return file_id

    except Exception:
        db.rollback()
        logging.exception("upload failed")
        return {"error": "Internal server error"}

    finally:
        db.close()

@celery_app.task(name="fetch_avatar_by_id_task")
def fetch_avatar_by_id_task(avatar_id: str) -> dict:
    try:
        data, ctype = asyncio.run(fetch_gdrive_avatar_bytes(avatar_id))
        b64 = base64.b64encode(data).decode()
        return {"bytes_b64": b64, "content_type": ctype}
    except Exception:
        logging.exception("fetch failed")
        return {"error": "Fetch failed"}

@celery_app.task(name="create_review_task")
def create_review_task(user_id: int, review_data: dict):
    async def async_create():
        from core.schemas.review import ReviewCreate
        review_data_obj = ReviewCreate(**review_data)

        async for db in db_helper.session_getter():
            existing_reviews = await get_reviews_by_user(db, user_id=user_id)
            if existing_reviews:
                review = existing_reviews[0]
                review.rating = review_data_obj.rating
                review.comment = review_data_obj.comment
                await db.commit()
                logging.info(f"Review updated: {review}")
                return review.id
            else:
                review = await create_review(db, user_id=user_id, review_data=review_data_obj)
                if review:
                    await db.commit()
                    logging.info(f"Review created: {review}")
                    return review.id
                logging.error("Failed to create review")
                return None

    loop = asyncio.new_event_loop()
    try:
        asyncio.set_event_loop(loop)
        return loop.run_until_complete(async_create())
    finally:
        loop.close()

@celery_app.task(name="delete_all_reviews_task")
def delete_all_reviews_task(user_id: int):
    async def async_delete():
        async for db in db_helper.session_getter():
            reviews = await get_reviews(db, user_id=user_id)
            if not reviews:
                logging.info("No reviews found")
                return "No reviews found"
            for review in reviews:
                await db.delete(review)
            await db.commit()
            logging.info(f"Reviews removed: {len(reviews)}")
            return f"Reviews removed: {len(reviews)}"

    loop = asyncio.get_event_loop()
    return loop.run_until_complete(async_delete())