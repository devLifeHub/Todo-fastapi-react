import { createAsyncThunk } from '@reduxjs/toolkit'
import statsApi from '../../api/services/stats'

const { fetchStats } = statsApi

const statsThunks = {
    fetchStatsThunk: createAsyncThunk(
      'stats/fetchStats',
      async (_, thunkAPI) => {
        try {
          return await fetchStats()
        } catch (err) {
          return thunkAPI.rejectWithValue(err.response?.data || err.message)
        }
      }
    )
}

export default statsThunks
