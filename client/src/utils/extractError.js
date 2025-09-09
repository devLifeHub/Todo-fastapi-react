export default async function extractError(err) {
  if (err.response) {
    const payload = err.response.data

    if (payload instanceof Blob) {
      const text = await payload.text()
      try {
        return JSON.parse(text)
      } catch {
        return { msg: text }
      }
    }

    return typeof payload === "object" ? payload : { msg: String(payload) }
  }

  return { msg: err.message || String(err) }
}
