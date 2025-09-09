import { createAsyncThunk } from "@reduxjs/toolkit"
import paymentApi from "../../api/services/payment"

const { createPayment } = paymentApi

const paymentThunks = {
  createPaymentThunk: createAsyncThunk(
    "payment/create",
    async (pay, thunk) => {
      try {
        const { data } = await createPayment(pay)
        console.log("data", data)
        return data
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Error processing payment"
        return thunk.rejectWithValue(msg)
      }
    }
  ),
}

export default paymentThunks
