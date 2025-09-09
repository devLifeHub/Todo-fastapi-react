import { createSlice } from "@reduxjs/toolkit"

const loadingSlice = createSlice({
  name: "loading",
  initialState: { isLoading: false },
  reducers: {
    showLoading: s => { s.isLoading = true },
    hideLoading: s => { s.isLoading = false },
  }
}) 

export const { showLoading, hideLoading } = loadingSlice.actions
export default loadingSlice.reducer
