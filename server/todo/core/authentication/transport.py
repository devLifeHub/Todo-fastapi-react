from fastapi_users.authentication import BearerTransport

from core.config import settings

bearer_transport = BearerTransport(
    tokenUrl=settings.api_auth.bearer_token_url,
)
