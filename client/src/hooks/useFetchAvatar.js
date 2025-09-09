import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import avatarThunk from "@/store/avatar/avatarThunks"
import {
  makeSelectAvatarUrl,
  makeSelectAvatarTaskStatus,
  makeSelectAvatarTaskId,
  makeSelectAvatarFetchStatusStatus,
} from "@/store/avatar/avatarSelectors"
import pollForCondition from "@/utils/pollForCondition"


const useFetchAvatar = ({ avatarId, isActive }) => {
  const dispatch = useDispatch()

  const { fetchAvatarIdTaskThunk, fetchAvatarStatusThunk, fetchAvatarUrlThunk } = avatarThunk

   const sendTaskStatus = useSelector(
    useMemo(() => makeSelectAvatarTaskStatus(avatarId), [avatarId])
  )

  const taskId = useSelector(
    useMemo(() => makeSelectAvatarTaskId(avatarId), [avatarId])
  )

  const pollingStatus = useSelector(
    useMemo(() => makeSelectAvatarFetchStatusStatus(avatarId), [avatarId])
  )

  const fetchAvatarUrl = useSelector(
    useMemo(() => makeSelectAvatarUrl(avatarId), [avatarId])
  )
    
  useEffect(() => {
    if (!isActive || !avatarId) return
    dispatch(fetchAvatarIdTaskThunk(avatarId))
  }, [dispatch, isActive, avatarId])

  useEffect(() => {
    if ( sendTaskStatus !== "succeeded" || !avatarId || !taskId || !isActive ) return
    const controller = new AbortController()
    const { signal } = controller
    let cancelled = false

    ;(async () => {
      try {
        await pollForCondition(
          () =>
            dispatch(fetchAvatarStatusThunk({ avatarId, taskId })).unwrap(),
          (d) => d.status !== "PENDING",
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
  }, [dispatch, sendTaskStatus, avatarId, taskId, isActive])

  useEffect(() => {
    if (pollingStatus !== "succeeded" || !avatarId || !taskId || !isActive) return
    dispatch(fetchAvatarUrlThunk({ avatarId, taskId }))
  }, [dispatch, pollingStatus, avatarId, taskId, isActive])

  return { fetchAvatarUrl }
}

export default useFetchAvatar