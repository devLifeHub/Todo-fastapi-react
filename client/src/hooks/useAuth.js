import { selectIsLoginSucceeded } from "@/store/auth/authSelectors"
import { selectIsUser, selectUser } from "@/store/user/userSelectors"
import { fetchUserThunk } from "@/store/user/userThunks"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


const useAuth = () => {
  const dispatch = useDispatch()


  const isUser = useSelector(selectIsUser)
  const user = useSelector(selectUser)

  const isLoginSucceeded = useSelector(selectIsLoginSucceeded)


  const [initialized, setInitialized] = useState(false)


  useEffect(() => {
  dispatch(fetchUserThunk())
    .unwrap()
    .catch((err) => {
      if (err?.status === 401) {
        window.location.replace("/login");
      }
    })
    .finally(() => setInitialized(true));
}, [dispatch, isLoginSucceeded]);


  return { isUser, user, initialized }
}

export default useAuth