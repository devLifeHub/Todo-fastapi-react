import httpx
from fastapi import HTTPException
from fastapi.responses import StreamingResponse

async def fetch_google_drive_image(file_id: str):
    file_url = f"https://drive.google.com/uc?id={file_id}"

    async with httpx.AsyncClient(follow_redirects=True) as client:
        try:
            response = await client.get(file_url, timeout=30.0)
            response.raise_for_status()
        except httpx.HTTPError as exc:
            raise HTTPException(
                status_code=exc.response.status_code if exc.response else 500,
                detail=f"Request error to Google Drive: {exc}"
            )

    content_type = response.headers.get("Content-Type", "application/octet-stream")
    return StreamingResponse(response.aiter_bytes(), media_type=content_type)
