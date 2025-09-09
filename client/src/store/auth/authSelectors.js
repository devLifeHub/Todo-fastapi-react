export const selectAccessToken = s => s.auth.accessToken
export const selectIsAuthenticated = s => s.auth.isAuthenticated

export const selectRegisterStatus  = s => s.auth.registerStatus
export const selectIsRegisterSucceeded = s => selectRegisterStatus(s) === "succeeded"
export const selectIsRegisterError = s => selectRegisterStatus(s) === "failed"
export const selectRegisterError = s => s.auth.registerError

export const selectLoginStatus = s => s.auth.loginStatus
export const selectIsLoginSucceeded = s => selectLoginStatus(s) === "succeeded"
export const selectIsLoginError = s => selectLoginStatus(s) === "failed"
export const selectLoginError = s => s.auth.loginError

export const selectFetchStatus = s => s.auth.fetchStatus
export const selectFetchError = s => s.auth.fetchError

export const selectLogoutStatus = s => s.auth.logoutStatus
export const selectLogoutError = s => s.auth.logoutError
