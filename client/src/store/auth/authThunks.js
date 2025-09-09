import { createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../../api/services/auth'

const { register, login, logout } = authApi

const authThunks = {
  registerThunk: createAsyncThunk('auth/register', 
    async (userData, think) => {
    try {
      const { data } = await register(userData)
      return data
    } catch (err) {
      return think.rejectWithValue(err.response?.data || 'Registration failed')
    }
  }),

  loginThunk: createAsyncThunk('auth/login', 
    async (creds, think) => {
    try {
      const { data } = await login(creds)
      localStorage.setItem('accessToken', data.access_token)
      return data
    } catch (err) {
      return think.rejectWithValue(err.response?.data || 'Login failed')
    }
  }),

  logoutThunk: createAsyncThunk('auth/logout', 
    async (_, think) => {
    try {
      await logout()
      localStorage.removeItem('accessToken')
      return true
    } catch (err) {
      return think.rejectWithValue(err.response?.data || 'Logout failed')
    }
  }),
}

export default authThunks