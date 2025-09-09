import { createAsyncThunk } from "@reduxjs/toolkit"
import reviewsApi from '@/api/services/reviews'

const { createReview, fetchAllReviews } = reviewsApi

const pollTaskStatus = async (task_id, interval = 2000, timeout = 30000) => {
  const startTime = Date.now()
  while (true) {
    const response = await fetch(`/tasks/status/${task_id}`)
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText)
    }
    const data = await response.json()
    if (data.status === "SUCCESS") return data.result
    if (data.status === "FAILURE") throw new Error(data.result || "Task failed")
    if (Date.now() - startTime > timeout) throw new Error("Task polling timed out")
    await new Promise((resolve) => setTimeout(resolve, interval))
  }
}

const reviewsThunks = {
  createReviewThunk: createAsyncThunk(
    "reviews/createReview",
    async (review, thunk) => {
      try {
        const response = await createReview(review)
        const { task_id } = response
        const result = await pollTaskStatus(task_id)
        return result
      } catch (err) {
        return thunk.rejectWithValue(err.message)
      }
    }
  ),
  fetchAllReviewsThunk: createAsyncThunk(
    "reviews/fetchAllReviews",
    async (_, thunk) => {
      try {
        const { data } = await fetchAllReviews()
        return data
      } catch (err) {
        return thunk.rejectWithValue(err.message)
      }
    }
  )
}

export default reviewsThunks
