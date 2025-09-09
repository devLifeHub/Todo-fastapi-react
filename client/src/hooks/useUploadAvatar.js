import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectUploadTaskId,
  selectUploadTaskSucceeded,
  selectUploadAvatarId,
} from "@/store/avatar/avatarSelectors"
import avatarThunk from "@/store/avatar/avatarThunks"
import pollForCondition from "@/utils/pollForCondition"

export default function useUploadAvatar() {
  const dispatch = useDispatch();

  const { uploadAvatarStatusThunk } = avatarThunk

  const uploadTaskId = useSelector(selectUploadTaskId)

  const uploadTaskSucceeded = useSelector(selectUploadTaskSucceeded)
  const uploadAvatarId = useSelector(selectUploadAvatarId)

    
  useEffect(() => {
    if (!uploadTaskSucceeded || !uploadTaskId) return
    
    const controller = new AbortController()
    const { signal } = controller
    let cancelled = false
    
    ;(async () => {
      try {
        await pollForCondition(
          () => dispatch(uploadAvatarStatusThunk(uploadTaskId)).unwrap(),
          d => d.status !== "PENDING",
          1000,
          signal
        )
      } catch (err) {
        if (!cancelled) console.error("Polling error:", err)
        }
    })()
    
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [dispatch, uploadTaskSucceeded, uploadTaskId])

  return { uploadAvatarId }
}
