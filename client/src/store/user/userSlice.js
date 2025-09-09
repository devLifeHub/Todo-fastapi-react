import { createSlice } from '@reduxjs/toolkit'
import { deleteUserThunk, fetchUserThunk, patchUserThunk } from './userThunks'


const initialState = {
  user: null,
  status: {
    fetch: 'idle',
    patch: 'idle',
    delete: 'idle',
  },
  error: {
    fetch: null,
    patch: null,
    delete: null,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUserThunk.pending, (state) => {
        state.status.fetch = 'loading'
        state.error.fetch = null
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.status.fetch = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.status.fetch = 'failed'
        state.error.fetch = action.payload
      })

      // patchUser
      .addCase(patchUserThunk.pending, (state) => {
        state.status.patch = 'loading'
        state.error.patch = null
      })
      .addCase(patchUserThunk.fulfilled, (state, action) => {
        state.status.patch = 'succeeded'
        state.user = action.payload
      })
      .addCase(patchUserThunk.rejected, (state, action) => {
        state.status.patch = 'failed'
        state.error.patch = action.payload
      })

      // deleteUser
      .addCase(deleteUserThunk.pending, (state) => {
        state.status.delete = 'loading'
        state.error.delete = null
      })
      .addCase(deleteUserThunk.fulfilled, () => initialState)
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.status.delete = 'failed'
        state.error.delete = action.payload
      })
  },
})

export const { clearUserState } = userSlice.actions
export default userSlice.reducer