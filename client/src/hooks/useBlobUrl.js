import { useState, useEffect } from "react"

const useBlobUrl = (blob, isBlob) => {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!isBlob || !blob) {
      setUrl(prev => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      return
    }

    const url = URL.createObjectURL(blob)
    setUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [blob, isBlob])

  return url
}

export default useBlobUrl
