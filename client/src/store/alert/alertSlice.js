import { createSlice } from "@reduxjs/toolkit"

const defaultAlertState = { message: "", type: "", isVisible: false }

const loadAlertState = () => {
  const stored = localStorage.getItem("alert")
  return stored ? JSON.parse(stored) : defaultAlertState
}

const alertSlice = createSlice({
  name: "alert",
  initialState: loadAlertState(),
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type
      state.isVisible = true
      localStorage.setItem("alert", JSON.stringify(state))
    },
    hideAlert: (state) => {
      state.isVisible = false
      localStorage.setItem("alert", JSON.stringify(state))
    },
    resetAlert: (state) => {
      Object.assign(state, defaultAlertState)
      localStorage.removeItem("alert")
    },
  },
})

export const { showAlert, hideAlert, resetAlert } = alertSlice.actions
export default alertSlice.reducer
