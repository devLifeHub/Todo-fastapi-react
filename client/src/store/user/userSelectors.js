
export const selectUser = (state) => state.user.user
export const selectIsUser = (state) => Boolean(state.user.user)
export const selectUserFetchError = (state) => state.user.error.fetch
export const selectUserPatchError = (state) => state.user.error.patch
export const selectUserDeleteError = (state) => state.user.error.delete

export const selectUserFetchStatus = (state) => state.user.status.fetch
export const selectUserPatchStatus = (state) => state.user.status.patch
export const selectUserDeleteStatus = (state) => state.user.status.delete
