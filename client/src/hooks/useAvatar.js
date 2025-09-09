import { useState, useEffect } from "react"
import useFetchAvatar from "@/hooks/useFetchAvatar"
import { hasAvatarBlob } from "@/utils/avatarStorage"



const useAvatar = (avatarId) => {

  const [cachedAvatarUrl, setCachedAvatarUrl] = useState(null)
  const [isActive, setIsActive] = useState(false)

    useEffect(() => {
    if (!avatarId) return
    setCachedAvatarUrl(null)
    setIsActive(false)

    ;(async () => {
      const blob = await hasAvatarBlob(avatarId)
      if (blob) {
        const url = URL.createObjectURL(blob)
        setCachedAvatarUrl(url)
        setIsActive(false)
      } else {
        setIsActive(true)
      }
    })()
    
  }, [avatarId])

    const { fetchAvatarUrl } = useFetchAvatar({avatarId, isActive })

  const avatarUrl = cachedAvatarUrl || fetchAvatarUrl

  return { avatarUrl }
}

export default useAvatar
