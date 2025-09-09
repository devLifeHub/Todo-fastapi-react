import asyncio
import logging
from google.oauth2 import service_account
from googleapiclient.discovery import build

logging.basicConfig(level=logging.INFO)

SERVICE_ACCOUNT_FILE = "service_account.json"
SCOPES = ["https://www.googleapis.com/auth/drive"]
creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES
)
drive_service = build("drive", "v3", credentials=creds)

async def del_avatars_gdrive():
    def _delete():
        page_token = None
        while True:
            resp = drive_service.files().list(
                q="mimeType contains 'image/' and trashed = false",
                fields="nextPageToken, files(id, name)",
                pageSize=1000,
                supportsAllDrives=True,
                includeItemsFromAllDrives=True,
                pageToken=page_token
            ).execute()

            items = resp.get("files", [])
            if not items:
                logging.info("No images found")
                break

            for f in items:
                try:
                    drive_service.files().delete(fileId=f["id"]).execute()
                    logging.info(f"🗑 Delete: {f['name']} ({f['id']})")
                except Exception as e:
                    logging.warning(f"⚠️ Error delete {f['name']}: {e}")

            page_token = resp.get("nextPageToken")
            if not page_token:
                break

    await asyncio.to_thread(_delete)

if __name__ == "__main__":
    asyncio.run(del_avatars_gdrive())
