import { createAsyncThunk } from "@reduxjs/toolkit"
import avatarApi from "@/api/services/avatars"
import extractError from "@/utils/extractError"
import { saveAvatarBlob, removeAvatarBlob } from "@/utils/avatarStorage"

const {
  uploadAvatar,
  uploadAvatarStatus,
  fetchAvatarIdTask,
  fetchAvatarUserTask,
  fetchAvatarStatus,
  fetchAvatarUserId,
} = avatarApi

const avatarThunk = {
  uploadAvatarThunk: createAsyncThunk(
  "avatar/upload",
  async ({ file, avatarId, avatarUrl }, thunkAPI) => {
    try {
      await removeAvatarBlob(avatarId, avatarUrl)

      const { data } = await uploadAvatar(file)
      return { taskId: data.task_id }
    } catch (err) {
      return thunkAPI.rejectWithValue(extractError(err))
    }
  }
),



  uploadAvatarStatusThunk: createAsyncThunk(
  "avatar/uploadStatus",
  async (taskId, { rejectWithValue }) => {
    try {
      const {data } = await uploadAvatarStatus(taskId)
      return data
    } catch (err) {
      return rejectWithValue({ msg: err.message })
    }
  }
),


  fetchAvatarIdTaskThunk: createAsyncThunk(
    "avatar/idTask",
    async (avatarId, thunkAPI) => {
      try {
        const { data } = await fetchAvatarIdTask(avatarId)
        return { avatarId, taskId: data.task_id }
      } catch (err) {
        return thunkAPI.rejectWithValue(extractError(err))
      }
    }
  ),

  fetchAvatarUserTaskThunk: createAsyncThunk(
    "avatar/userTask",
    async (_, thunkAPI) => {
      try {
        const { data } = await fetchAvatarUserTask()
        return { avatarId: data.avatar_id, taskId: data.task_id }
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response)
      }
    }
  ),
  
  fetchAvatarStatusThunk: createAsyncThunk(
    "avatar/status",
    async ({ avatarId, taskId }, { rejectWithValue }) => {
      try {
        const response = await fetchAvatarStatus(taskId)
        const status = response.data.status
        return { avatarId, status}
      } catch (err) {
        return rejectWithValue({ avatarId, msg: err.message })
      }
    }
  ),
    
  fetchAvatarUrlThunk: createAsyncThunk(
    "avatar/result",
    async ({ avatarId, taskId }, thunkAPI) => {
      try {
        const response = await fetchAvatarUserId(taskId)
        const blob = response.data
        const avatarUrl = await saveAvatarBlob(avatarId, blob)
        return { avatarId, avatarUrl }
      } catch (err) {
         const errorPayload = await extractError(err)
        return thunkAPI.rejectWithValue(errorPayload)
      }
    }
  ),

}

export default avatarThunk






//  fetchAvatarUrlThunk: createAsyncThunk(
//     "avatar/result",
//     async ({ avatarId, taskId }, thunkAPI) => {
//       try {
//         // const response = await fetchAvatarUserId(taskId)
//         const blob = await fetchAvatarUserId(taskId)
//         // const url = URL.createObjectURL(response.data)
//         return { avatarId, blob }
//       } catch (err) {
//          const errorPayload = await extractError(err) // разобраться!!!!
//         return thunkAPI.rejectWithValue(errorPayload)
//       }
//     }
//   ),