import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showAlert } from "@/store/alert/alertSlice"
import {
  selectIsLoginError,
  selectIsLoginSucceeded,
  selectIsRegisterError,
  selectIsRegisterSucceeded
} from "@/store/auth/authSelectors"
import { clearAuthState } from "@/store/auth/authSlice"


const useWaitAlert = () => {
  const dispatch = useDispatch()
  const isRegisterSucceeded = useSelector(selectIsRegisterSucceeded)
  const isRegisterError = useSelector(selectIsRegisterError)
  const isLoginSucceeded = useSelector(selectIsLoginSucceeded)
  const isLoginError = useSelector(selectIsLoginError)

  useEffect(() => {
    if (isRegisterSucceeded) {
      dispatch(showAlert({ message: "You have successfully registered!", type: "success" }))
      dispatch(clearAuthState())
    }
  }, [isRegisterSucceeded, dispatch])

  useEffect(() => {
    if (isRegisterError) {
      dispatch(showAlert({ message: "Incorrect data during registration", type: "error" }))
      dispatch(clearAuthState())
    }
  }, [isRegisterError, dispatch])
  
  useEffect(() => {
    if (isLoginSucceeded) {
      dispatch(showAlert({ message: "You have successfully logged into your account!", type: "success" }))
      dispatch(clearAuthState())
    }
  }, [isLoginSucceeded, dispatch])
  
  useEffect(() => {
    if (isLoginError) {
      dispatch(showAlert({ message: "Incorrect data or such account does not exist!", type: "error" }))
      dispatch(clearAuthState())
    }
  }, [isLoginError, dispatch])
}

export default useWaitAlert
