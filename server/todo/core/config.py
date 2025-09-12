import logging
from typing import Literal, List
from pathlib import Path

from pydantic import BaseModel
from pydantic import PostgresDsn
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)

BASE_DIR = Path(__file__).resolve().parent.parent


LOG_DEFAULT_FORMAT = (
    "[%(asctime)s.%(msecs)03d] %(module)10s:%(lineno)-3d %(levelname)-7s - %(message)s"
)


class RunConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8000


class GunicornConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8000
    workers: int = 1
    timeout: int = 900


class LoggingConfig(BaseModel):
    log_level: Literal[
        "debug",
        "info",
        "warning",
        "error",
        "critical",
    ] = "info"

    log_format: str = LOG_DEFAULT_FORMAT

    @property
    def log_level_value(self) -> int:
        return logging.getLevelNamesMapping()[self.log_level.upper()]


class ApiPrefix(BaseModel):
    prefix: str = "/api"

class ApiPrefixAuth(ApiPrefix):
    auth: str = "/auth"
    users: str = "/users"

    @property
    def bearer_token_url(self) -> str:
        parts = (self.prefix, self.auth, "/login")
        path = "".join(parts)
        return path.removeprefix("/")

class ApiPrefixUser(ApiPrefix):
    users: str = "/users"

class ApiPrefixAvatar(ApiPrefix):
    avatars: str = "/avatar"

class ApiPrefixTodo(ApiPrefix):
    todos: str = "/todos"
    tags: List[str] = ["Todos"]

class ApiPrefixReview(ApiPrefix):
    reviews: str = "/reviews"

class ApiPrefixPayment(ApiPrefix):
    payments: str = "/payments"
    tags: List[str] = ["Payments"]

class ApiPrefixPrice(ApiPrefix):
    prices: str = "/prices"
    tags: List[str] = ["Prices"]

class SubscriptionConfig(BaseModel):
    BASIC: int
    PREMIUM: int
    VIP: int

    def get_prices(self) -> dict:
        return {
            "BASIC": self.BASIC,
            "PREMIUM": self.PREMIUM,
            "VIP": self.VIP,
        }

class DatabaseConfig(BaseModel):
    url: PostgresDsn
    echo: bool = True
    echo_pool: bool = True
    pool_size: int = 50
    max_overflow: int = 10

    naming_convention: dict[str, str] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_N_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }


class AccessToken(BaseModel):
    lifetime_seconds: int = 60 * 60 * 24 * 30  # 30 дней
    reset_password_token_secret: str
    verification_token_secret: str

class StripeConfig(BaseModel):
    public_key: str
    secret_key: str

class CeleryConfig(BaseModel):
    broker_url: str
    backend_url: str

class GoogleDriveConfig(BaseModel):
    service_account_file: Path = BASE_DIR / "service_account.json"
    scopes: List[str] = ["https://www.googleapis.com/auth/drive"]

    client_id: str
    client_secret: str
    refresh_token: str
    token_uri: str

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(
            BASE_DIR / ".env",
        ),
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__",
    )

    run: RunConfig = RunConfig()
    gunicorn: GunicornConfig = GunicornConfig()
    logging: LoggingConfig = LoggingConfig()
    api: ApiPrefix = ApiPrefix()
    api_auth: ApiPrefixAuth = ApiPrefixAuth()
    api_users: ApiPrefixUser = ApiPrefixUser()
    api_avatars: ApiPrefixAvatar = ApiPrefixAvatar()
    api_todos: ApiPrefixTodo = ApiPrefixTodo()
    api_reviews: ApiPrefixReview = ApiPrefixReview()
    api_payments: ApiPrefixPayment = ApiPrefixPayment()
    api_prices: ApiPrefixPrice = ApiPrefixPrice()
    google_drive: GoogleDriveConfig
    subscription: SubscriptionConfig
    db: DatabaseConfig
    access_token: AccessToken
    celery: CeleryConfig
    stripe: StripeConfig

settings = Settings()
