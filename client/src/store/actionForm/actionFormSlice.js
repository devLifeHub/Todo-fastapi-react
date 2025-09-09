import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isProfileVisible: false,
  isReviewVisible: false,
  isAddTodoVisible: false,
  isUpdateTodoVisible: false,
  isDeleteTodoVisible: false,
}

const actionFormSlice = createSlice({
  name: "actionForm",
  initialState,
  reducers: {
    showProfileForm: s => { s.isProfileVisible = true },
    hideProfileForm: s => { s.isProfileVisible = false },

    showReviewForm: s => { s.isReviewVisible = true },
    hideReviewForm: s => { s.isReviewVisible = false },

    showAddTodoForm: s => { s.isAddTodoVisible = true },
    hideAddTodoForm: s => { s.isAddTodoVisible = false },

    showUpdateTodoForm: s => { s.isUpdateTodoVisible = true },
    hideUpdateTodoForm: s => { s.isUpdateTodoVisible = false },

    showDeleteTodoForm: s => { s.isDeleteTodoVisible = true },
    hideDeleteTodoForm: s => { s.isDeleteTodoVisible = false },


    hideForm: s => {
      s.isProfileVisible = false;
      s.isReviewVisible = false;
      s.isAddTodoVisible = false;
      s.isUpdateTodoVisible = false;
      s.isDeleteTodoVisible = false;
    },

    resetActionForm: () => initialState
  }
}) 

export const {
  showProfileForm,
  hideProfileForm,
  showReviewForm,
  hideReviewForm,
  showAddTodoForm,
  hideAddTodoForm,
  showUpdateTodoForm,
  hideUpdateTodoForm,
  showDeleteTodoForm,
  hideDeleteTodoForm,
  resetActionForm,
  hideForm,
} = actionFormSlice.actions

export default actionFormSlice.reducer
