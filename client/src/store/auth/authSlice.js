import { createSlice } from '@reduxjs/toolkit'
import authThunks from './authThunks'

const { registerThunk, loginThunk, logoutThunk } = authThunks


const initialState = {
  accessToken:        localStorage.getItem("accessToken") || null,

  registerStatus:     "idle",
  registerError:      null,

  loginStatus:        "idle",
  loginError:         null,

  fetchStatus:        "idle",
  fetchError:         null,

  logoutStatus:       "idle",
  logoutError:        null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
    // register
      .addCase(registerThunk.pending, s => {
        s.registerStatus = 'loading'
        s.registerError  = null
      })
      .addCase(registerThunk.fulfilled, (s) => {
        s.registerStatus = 'succeeded'
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.registerStatus = 'failed'
        s.registerError  = a.payload
      })
      // login
      .addCase(loginThunk.pending, s => {
        s.loginStatus = 'loading'
        s.loginError = null
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.loginStatus = 'succeeded'
        s.accessToken = a.payload.access_token
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.loginStatus = 'failed'
        s.loginError = a.payload
      })
      // logout
      .addCase(logoutThunk.pending, s => {
        s.logoutStatus = 'loading'
        s.logoutError = null
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(logoutThunk.rejected, (s, a) => {
        s.logoutStatus = 'failed'
        s.logoutError = a.payload
      })
  },
})

export const { clearAuthState } = authSlice.actions
export default authSlice.reducer

