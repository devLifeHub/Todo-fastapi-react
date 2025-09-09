import { createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/services/users'

const handleError = (err, message) =>
  err.response?.data || message

export const fetchUserThunk = createAsyncThunk(
  'user/fetch',
  async (_, thunkAPI) => {
    try {
      const { data } = await userApi.fetchUser()
      return data
    } catch (err) {
      if (err.silent) return thunkAPI.rejectWithValue(null)
      return thunkAPI.rejectWithValue(err.response?.data || 'Fetch user failed')
    }
  }
)

export const patchUserThunk = createAsyncThunk(
  'user/patch',
  async (data, thunkAPI) => {
    try {
      const { data: updated } = await userApi.patchUser(data)
      return updated
    } catch (err) {
      return thunkAPI.rejectWithValue(handleError(err, 'Patch user failed'))
    }
  }
)

export const deleteUserThunk = createAsyncThunk(
  'user/delete',
  async (_, thunkAPI) => {
    try {
      await userApi.deleteUser()
      return null // 204 No Content
    } catch (err) {
      return thunkAPI.rejectWithValue(handleError(err, 'Delete user failed'))
    }
  }
)
