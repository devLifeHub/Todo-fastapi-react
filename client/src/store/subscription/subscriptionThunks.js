import { createAsyncThunk } from "@reduxjs/toolkit"
import subscriptionApi from "../../api/services/subscription"

const { fetchPrice } = subscriptionApi

const subscriptionThunks = {
  fetchPriceThunk: createAsyncThunk(
    "subscription/fetchPrice",
    async (_, thunk) => {
      try {
        const { data } = await fetchPrice()
        return data;
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Error loading prices"
        return thunk.rejectWithValue(msg)
      }
    }
  ),
}

export default subscriptionThunks
