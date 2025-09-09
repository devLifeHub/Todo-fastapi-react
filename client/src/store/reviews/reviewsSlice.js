
import { createSlice } from "@reduxjs/toolkit"
import reviewsThunks from "./reviewsThunks"

const { createReviewThunk, fetchAllReviewsThunk } = reviewsThunks

const initialState = {
  review: null,
  createStatus: "idle",
  createError:  null,

  reviewsAll: null,
  fetchStatus: "idle",
  fetchError: null,
}

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewErrors: (s) => {
      s.createError = null
    },
  },
  extraReducers: (builder) => {
    // — CREATE REVIEW —
    builder
      .addCase(createReviewThunk.pending, (s) => {
        s.createStatus = "loading"
        s.createError = null
      })
      .addCase(createReviewThunk.fulfilled, (s, a) => {
        s.createStatus = "succeeded"
        s.review = a.payload
      })
      .addCase(createReviewThunk.rejected, (s, a) => {
        s.createStatus = "failed"
        s.createError = a.payload
      })

      // fetch all reviews
      .addCase(fetchAllReviewsThunk.pending, (s) => {
        s.fetchStatus = "loading"
        s.fetchError = null
      })
      .addCase(fetchAllReviewsThunk.fulfilled, (s, a) => {
        s.fetchStatus = "succeeded"
        s.reviewsAll = a.payload
      })
      .addCase(fetchAllReviewsThunk.rejected, (s, a) => {
        s.fetchStatus = "failed"
        s.fetchError = a.payload
      })
  },
})

export const { clearReviewErrors } = reviewSlice.actions
export default reviewSlice.reducer
