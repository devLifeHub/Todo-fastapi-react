from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.config import settings

raw = str(settings.db.url)
sync_url = raw.replace("+asyncpg", "+pg8000")
sync_engine = create_engine(sync_url, echo=settings.db.echo)

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=sync_engine
)