import { createSlice } from "@reduxjs/toolkit"
import subscriptionThunks from "./subscriptionThunks"

const { fetchPriceThunk } = subscriptionThunks

const initialState = {
  prices: [],
  priceStatus: "idle",
  priceError: null,
}

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    resetSubscriptionState(s) {
      s.prices = []
      s.priceStatus = "idle"
      s.priceError  = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPriceThunk.pending, s => {
        s.priceStatus = "loading"
        s.priceError  = null
      })
      .addCase(fetchPriceThunk.fulfilled, (s, a) => {
        s.priceStatus = "succeeded"
        s.prices = a.payload
      })
      .addCase(fetchPriceThunk.rejected, (s, a) => {
        s.priceStatus = "failed"
        s.priceError  = a.payload
      })
  }
})

export const { resetSubscriptionState } = subscriptionSlice.actions
export default subscriptionSlice.reducer
