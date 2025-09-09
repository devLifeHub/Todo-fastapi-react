import { makeSelectAvatarFetchByIdStatusLoading, makeSelectAvatarFetchResultSucceeded, selectByIdNull, selectFetchCurStatusLoading, selectFetchCurStatusSucceeded, selectUploadTaskLoading } from "@/store/avatar/avatarSelectors"
import { selectLoadingSlice } from "@/store/loading/loadingSelector"
import { hideLoading, showLoading } from "@/store/loading/loadingSlice"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

const useAvatarLoading = (avatarId) => {
    const dispatch = useDispatch()

    const avatarFetchByIdLoading = useSelector(useMemo(() => makeSelectAvatarFetchByIdStatusLoading(avatarId), [avatarId]))
    const resultSucceeded = useSelector(useMemo(() => makeSelectAvatarFetchResultSucceeded(avatarId), [avatarId]))

    const avatarByIdNull = useSelector(selectByIdNull)
    const isLoading = useSelector(selectLoadingSlice)

    const uploadLoading = useSelector(selectUploadTaskLoading)

    const fetchCurStatusLoading = useSelector(selectFetchCurStatusLoading)
    const fetchCurStatusSucceeded = useSelector(selectFetchCurStatusSucceeded) 


    const shouldShowLoading = (fetchCurStatusLoading && avatarByIdNull) || avatarFetchByIdLoading || uploadLoading
    const shouldHideLoading = (fetchCurStatusSucceeded && avatarByIdNull) || resultSucceeded

    useEffect(() => {
    if (shouldShowLoading) {
        dispatch(showLoading())
    } else if (shouldHideLoading) {
        dispatch(hideLoading())
    }
    }, [ 
        dispatch, fetchCurStatusLoading, fetchCurStatusSucceeded, avatarByIdNull, 
        avatarFetchByIdLoading, resultSucceeded, uploadLoading
    ])



      return {isLoading}
    }

    export default useAvatarLoading
      
