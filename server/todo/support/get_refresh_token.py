from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/drive"]

secrets_path = "/Users/aleksandr/Downloads/TodoList/server/todo/client_secret.json"

flow = InstalledAppFlow.from_client_secrets_file(
    str(secrets_path),
    scopes=SCOPES
)
creds = flow.run_local_server(port=8080)

print("REFRESH_TOKEN =", creds.refresh_token)
