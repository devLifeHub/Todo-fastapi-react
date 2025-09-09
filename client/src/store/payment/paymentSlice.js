import { createSlice } from "@reduxjs/toolkit"
import paymentThunks from "./paymentThunks"

const { createPaymentThunk } = paymentThunks

const initialState = {
  paymentStatus: "idle",
  paymentError:  null,
}

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: s => {
      s.paymentStatus = "idle"
      s.paymentError  = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createPaymentThunk.pending, s => { 
        s.paymentStatus = "loading";
        s.paymentError = null 
    })
      .addCase(createPaymentThunk.fulfilled, s => { 
        s.paymentStatus = "succeeded" 
    })
      .addCase(createPaymentThunk.rejected,  (s, a) => { 
        s.paymentStatus = "failed";
        s.paymentError = a.payload 
    })
  }
})

export const { resetPaymentState } = paymentSlice.actions
export default paymentSlice.reducer
