import httpx

import httpx

async def fetch_gdrive_avatar_bytes(file_id: str) -> tuple[bytes, str]:
    url = f"https://drive.google.com/uc?id={file_id}"
    async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client:
        r = await client.get(url)
        r.raise_for_status()
        return r.content, r.headers.get("Content-Type", "application/octet-stream")
