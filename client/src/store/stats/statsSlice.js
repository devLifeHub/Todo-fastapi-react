import { createSlice } from '@reduxjs/toolkit'
import statsThunks from './statsThunks'

const { fetchStatsThunk } = statsThunks

const initialState = {
  usersCount: 0,
  todosCount: 0,
  status: 'idle',
  error: null,
}

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatsThunk.pending, s => {
        s.status = 'loading'
        s.error = null
      })
      .addCase(fetchStatsThunk.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.usersCount = a.payload.usersCount
        s.todosCount = a.payload.todosCount
      })
      .addCase(fetchStatsThunk.rejected, (s, a) => {
        s.status = 'failed'
        s.error  = a.payload || a.error.message
      })
  }
})

export default statsSlice.reducer
