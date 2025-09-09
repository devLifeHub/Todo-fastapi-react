export const emptyAsync = { status: "idle", error: null }

export const emptyUpload     = { ...emptyAsync, taskId: null }
export const emptyUploadStatus   = { ...emptyAsync, avatarId: null }

export const emptyFetchCurrent = { ...emptyAsync, taskId: null, avatarId: null }

export const emptyFetchById = { ...emptyAsync, taskId: null, avatarId: null }
export const emptyFetchStatus = { ...emptyAsync, avatarId: null }
export const emptyFetchResult = { ...emptyAsync, avatarId: null, avatarUrl: null }

export const emptyFetchAvatarEntry = {
     fetchById: { ...emptyFetchById},
      fetchStatus: { ...emptyFetchStatus},
      fetchResult: { ...emptyFetchResult},
  }
