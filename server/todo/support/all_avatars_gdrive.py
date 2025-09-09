import logging
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"]
SERVICE_ACCOUNT_FILE = "service_account.json"

creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=SCOPES
)

drive_service = build("drive", "v3", credentials=creds)

def all_avatars_gdrive() -> list[dict]:
    images = []
    page_token = None

    while True:
        response = drive_service.files().list(
            q="mimeType contains 'image/' and trashed = false",
            spaces="drive",
            fields="nextPageToken, files(id, name, mimeType, webViewLink)",
            supportsAllDrives=True,
            includeItemsFromAllDrives=True,
            pageSize=1000,
            pageToken=page_token
        ).execute()

        files = response.get("files", [])
        images.extend(files)

        page_token = response.get("nextPageToken")
        if not page_token:
            break

    return images


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    avatars = all_avatars_gdrive()

    if not avatars:
        logging.info("No images available")
    else:
        for img in avatars:
            print(f"{img['name']} ({img['mimeType']}): {img['webViewLink']}")
