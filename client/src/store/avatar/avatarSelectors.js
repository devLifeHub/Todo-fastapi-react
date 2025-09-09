import { createSelector } from "@reduxjs/toolkit"
import {
  emptyFetchAvatarEntry,
  emptyFetchCurrent,
  emptyFetchStatus,
  emptyFetchResult,
  emptyFetchById
} from "./emptyState"

export const selectAvatarState = state => state.avatar

export const selectUpload = createSelector(
  selectAvatarState,
  avatar => avatar.upload
)

export const selectUploadStatus = createSelector(
  selectAvatarState,
  avatar => avatar.uploadStatus
)

export const selectUploadTaskStatus = s =>
  s.avatar.upload?.status ?? "idle"

export const selectUploadResponseStatus = s =>
  s.avatar.uploadStatus?.status ?? "idle"

export const selectUploadLoading = s =>
  [selectUploadTaskStatus(s), selectUploadResponseStatus(s)].includes("loading")

export const selectUploadSucceeded = s =>
  [selectUploadTaskStatus(s), selectUploadResponseStatus(s)].includes("succeeded")


// ===============
export const selectUploadTaskLoading = s => s.avatar.upload?.status === "loading"
export const selectUploadTaskSucceeded = s => s.avatar.upload?.status === "succeeded"
export const selectUploadTaskId = s => s.avatar.upload?.taskId

export const selectUploadStatusSucceeded = s => s.avatar.uploadStatus?.status === "succeeded"
export const selectUploadAvatarId = s => s.avatar.uploadStatus.avatarId

export const selectFetchById = createSelector(
  selectAvatarState,
  avatar => avatar.fetchById || emptyFetchCurrent
)
export const selectFetchCurrent = createSelector(
  selectAvatarState,
  avatar => avatar.fetchCurrent || emptyFetchCurrent
)
export const selectFetchByIdStatuss = createSelector(
  selectFetchById,
  fetch => fetch.status
)
export const selectFetchCurrentStatus = createSelector(
  selectFetchCurrent,
  fetch => fetch.status
)
export const selectFetchByIdLoading = createSelector(
  selectFetchByIdStatuss,
  status => status === "loading"
)
export const selectFetchCurrentLoading = createSelector(
  selectFetchCurrentStatus,
  status => status === "loading"
)
export const selectCurAvatarId = createSelector(
  selectFetchCurrent,
  fetch => fetch.avatarId ?? null
)

export const selectByIdMap = createSelector(
  selectAvatarState,
  avatar => avatar.byId
)

export const makeSelectAvatarEntry = avatarId => createSelector(
  selectByIdMap,
  byId => byId[avatarId] || emptyFetchAvatarEntry
)

export const makeSelectAvatarTask = avatarId => createSelector(
  makeSelectAvatarEntry(avatarId),
  entry => entry.fetchById || emptyFetchCurrent
)
export const makeSelectAvatarTaskStatus = avatarId => createSelector(
  makeSelectAvatarTask(avatarId),
  task => task.status
)
export const makeSelectAvatarTaskLoading = avatarId => createSelector(
  makeSelectAvatarTaskStatus(avatarId),
  status => status === "loading"
)
export const makeSelectAvatarTaskId = avatarId => createSelector(
  makeSelectAvatarTask(avatarId),
  task => task.taskId
)

export const makeSelectAvatarStatus = avatarId => createSelector(
  makeSelectAvatarEntry(avatarId),
  entry => entry.fetchStatus?.status || emptyFetchStatus
)

// ============
export const makeSelectAvatarStatusLoading = avatarId => createSelector(
  makeSelectAvatarStatus(avatarId),
  fetchStatus => fetchStatus.status === "loading"
)

export const makeSelectAvatarResult = avatarId => createSelector(
  makeSelectAvatarEntry(avatarId),
  entry => entry.fetchResult || emptyFetchResult
)
export const makeSelectAvatarResultStatus = avatarId => createSelector(
  makeSelectAvatarResult(avatarId),
  res => res.status
)
export const makeSelectAvatarResultLoading = avatarId => createSelector(
  makeSelectAvatarResultStatus(avatarId),
  status => status === "loading"
)
export const makeSelectAvatarUrl = avatarId => createSelector(
  makeSelectAvatarResult(avatarId),
  res => res.avatarUrl || ""
)

export const selectCurAvatarTaskError = createSelector(
  selectFetchCurrent,
  fetch => fetch.error || null
)
export const makeSelectIdTaskError = id => state =>
  state.avatar.byId[id]?.fetchById?.error || null
export const makeSelectStatusError = id => state =>
  state.avatar.byId[id]?.fetchStatus?.error || null
export const makeSelectResultError = id => state =>
  state.avatar.byId[id]?.fetchResult?.error || null


export const selectFetchByIdStatus = state =>
  state.avatar.fetchById?.status ?? "idle"


export const makeSelectFetchByIdStatusById = avatarId => createSelector(
  state => state.avatar.byId[avatarId]?.fetchById || emptyFetchCurrent,
  fetchTask => fetchTask.status
)

export const selectFetchCurStatus = state =>
  state.avatar.fetchCurrent?.status ?? "idle"

export const selectFetchCurStatusLoading = state =>
  state.avatar.fetchCurrent?.status === "loading"

export const selectFetchCurStatusSucceeded = state =>
  state.avatar.fetchCurrent?.status === "succeeded"


export const makeSelectAvatarFetchStatusStatus = avatarId => createSelector(
  state => state.avatar.byId[avatarId]?.fetchStatus || emptyFetchStatus,
  fetchStatus => fetchStatus.status
)


export const makeSelectAvatarFetchByIdStatus = avatarId => createSelector(
  s => s.avatar.byId[avatarId]?.fetchById || emptyFetchById,
  fetchById => fetchById.status
)

export const makeSelectAvatarFetchByIdStatusLoading = avatarId => createSelector(
  makeSelectAvatarFetchByIdStatus(avatarId),
  status => status === "loading"
)


export const makeSelectAvatarFetchResultStatus = avatarId => createSelector(
  s => s.avatar.byId[avatarId]?.fetchResult || emptyFetchResult,
  fetchResult => fetchResult.status
)

export const makeSelectAvatarFetchResultSucceeded = avatarId => createSelector(
  makeSelectAvatarFetchResultStatus(avatarId),
  status => status === "succeeded"
)

export const makeSelectAvatarFetchResultError = avatarId => createSelector(
  makeSelectAvatarFetchResultStatus(avatarId),
  status => status === "failed"
)

export const selectById = s => s.avatar.byId

export const selectByIdNull = s => {
  const avatarNull = s.avatar.byId
  return Object.keys(avatarNull).length === 0 ? true : false
}