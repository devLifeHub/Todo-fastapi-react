import io
import logging

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload, MediaIoBaseDownload

from core.config import settings

_gd_cfg = settings.google_drive

def get_drive_service() -> "Resource":
    creds = Credentials(
        token=None,
        refresh_token=_gd_cfg.refresh_token,
        token_uri=_gd_cfg.token_uri,
        client_id=_gd_cfg.client_id,
        client_secret=_gd_cfg.client_secret,
    )
    creds.refresh(Request())
    return build("drive", "v3", credentials=creds)

def upload_to_drive_sync(blob: io.BytesIO, name: str, mime: str) -> str:
    drive_service = get_drive_service()
    media = MediaIoBaseUpload(blob, mimetype=mime, resumable=True)

    resp = (
        drive_service.files()
        .create(body={"name": name}, media_body=media, fields="id")
        .execute()
    )
    file_id = resp["id"]

    drive_service.permissions().create(
        fileId=file_id,
        body={"type": "anyone", "role": "reader", "allowFileDiscovery": False},
    ).execute()

    logging.info(f"Uploaded to My Drive: {file_id}")
    return file_id

def delete_from_drive_sync(file_id: str) -> None:
    drive_service = get_drive_service()
    try:
        drive_service.files().delete(fileId=file_id).execute()
        logging.info(f"Deleted from My Drive: {file_id}")
    except Exception as e:
        logging.warning(f"Failed to delete {file_id}: {e}")

async def fetch_gdrive_avatar_bytes(file_id: str) -> tuple[bytes, str]:
    """
    Асинхронно скачивает файл по fileId.
    Возвращает кортеж: (bytes, mimeType).
    """
    drive_service = get_drive_service()
    request = drive_service.files().get_media(fileId=file_id)
    buffer = io.BytesIO()
    downloader = MediaIoBaseDownload(buffer, request)

    done = False
    while not done:
        _, done = downloader.next_chunk()
    buffer.seek(0)

    meta = drive_service.files().get(
        fileId=file_id, fields="mimeType"
    ).execute()

    return buffer.read(), meta.get("mimeType", "application/octet-stream")
