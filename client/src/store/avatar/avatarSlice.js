import { createSlice } from "@reduxjs/toolkit"
import avatarThunk from "./avatarThunks"
import {
  emptyUpload,
  emptyUploadStatus,
  emptyFetchCurrent,
  emptyFetchById,
  emptyFetchStatus,
  emptyFetchResult,
  emptyFetchAvatarEntry,
} from "./emptyState"
import normalizeStatus from "@/utils/normalizeStatus"

const {
  uploadAvatarThunk,
  uploadAvatarStatusThunk,
  fetchAvatarIdTaskThunk,
  fetchAvatarUserTaskThunk,
  fetchAvatarStatusThunk,
  fetchAvatarUrlThunk
} = avatarThunk


const initialState = {
  upload:       { ...emptyUpload },
  uploadStatus: { ...emptyUploadStatus },
  fetchCurrent: { ...emptyFetchCurrent },
  byId: {}
}

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    resetAvatarState: () => initialState,
    resetCurrent: (s) => {
      s.fetchCurrent = emptyFetchCurrent
    },
    clearAvatarUrl: (state, { payload: avatarId }) => {
      delete state.byId[avatarId]
    }
  },
  extraReducers: b => {
    b.addCase(uploadAvatarThunk.pending, s => {
      s.upload = { ...emptyUpload, status: "loading" }
    })
    b.addCase(uploadAvatarThunk.fulfilled, (s, a) => {
      s.upload = { ...emptyUpload, status: "succeeded", taskId: a.payload.taskId }
    })
    b.addCase(uploadAvatarThunk.rejected, (s, a) => {
      s.upload = { ...emptyUpload, status: "failed", error: a.payload }
    })

    b.addCase(uploadAvatarStatusThunk.pending, s => {
      s.uploadStatus = { ...emptyUploadStatus, status: "loading" }
    })
    b.addCase(uploadAvatarStatusThunk.fulfilled, (s, a) => {
      const { avatarId, status } = a.payload
      s.uploadStatus = { ...emptyUploadStatus, status: normalizeStatus(status), avatarId }
    })
    b.addCase(uploadAvatarStatusThunk.rejected, (s, { payload, error }) => {
      s.uploadStatus = { 
        ...emptyUploadStatus, 
        status: "failed", 
        error: payload?.msg || error.message 
      }
    })

    b.addCase(fetchAvatarIdTaskThunk.pending, (s, a) => {
      const avatarId = a.meta.arg
      s.byId[avatarId] = s.byId[avatarId] || { ...emptyFetchAvatarEntry }
      s.byId[avatarId].fetchById = { ...emptyFetchById, status: "loading" }
    })
    b.addCase(fetchAvatarIdTaskThunk.fulfilled, (s, a) => {
      const { avatarId, taskId } = a.payload
      s.byId[avatarId].fetchById = { ...emptyFetchById, status: "succeeded", avatarId, taskId }
    })
    b.addCase(fetchAvatarIdTaskThunk.rejected, (s, a) => {
      const avatarId = a.meta.arg
      s.byId[avatarId].fetchById = { ...emptyFetchById, status: "failed", error: a.payload }
    })


    b.addCase(fetchAvatarUserTaskThunk.pending, s => {
      s.fetchCurrent = { ...emptyFetchCurrent, status: "loading" }
    })
    b.addCase(fetchAvatarUserTaskThunk.fulfilled, (s, a) => {
      const { avatarId, taskId } = a.payload
      s.fetchCurrent = { ...emptyFetchCurrent, status: "succeeded", avatarId, taskId }
    })
    b.addCase(fetchAvatarUserTaskThunk.rejected, (s, a) => {
      s.fetchCurrent = { ...emptyFetchCurrent, status: "failed", error: a.payload }
    })

    b.addCase(fetchAvatarStatusThunk.pending, (s, a) => {
      const avatarId = a.meta.arg.avatarId
      s.byId[avatarId].fetchStatus = { ...emptyFetchStatus, status: "loading" }
    })
    b.addCase(fetchAvatarStatusThunk.fulfilled, (s, a) => {
      const { avatarId, status } = a.payload
      s.byId[avatarId].fetchStatus = { ...emptyFetchStatus, status: normalizeStatus(status), avatarId }
    })
    b.addCase(fetchAvatarStatusThunk.rejected, (s, a) => {
      const avatarId = a.meta.arg.avatarId
      s.byId[avatarId].fetchStatus = { ...emptyFetchStatus, status: "failed", error: a.payload }
    })

    b.addCase(fetchAvatarUrlThunk.pending, (s, a) => {
      const avatarId = a.meta.arg.avatarId
      s.byId[avatarId].fetchResult = { ...emptyFetchResult, status: "loading" }
    })
    b.addCase(fetchAvatarUrlThunk.fulfilled, (s, a) => {
      const { avatarId, avatarUrl } = a.payload
      s.byId[avatarId].fetchResult = { ...emptyFetchResult, status: "succeeded", avatarId, avatarUrl }
    })
    b.addCase(fetchAvatarUrlThunk.rejected, (s, a) => {
      const avatarId = a.meta.arg.avatarId
      s.byId[avatarId].fetchResult = { ...emptyFetchResult, status: "failed", error: a.payload }
    })
  }
})

export const { resetAvatarState, resetCurrent, clearAvatarUrl } = avatarSlice.actions
export default avatarSlice.reducer
