import api from '../index'


const avatarApi = {
  uploadAvatar: file => {
    const form = new FormData()
    form.append('file', file)
    return api.post('/avatar/upload/task', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  uploadAvatarStatus: taskId => 
    api.get(`/avatar/upload/status/${taskId}`),

  fetchAvatarIdTask: avatarId =>
    api.get(`/avatar/fetch/task/id/${avatarId}`),

  fetchAvatarUserTask: () => api.get("/avatar/fetch/user/task"),

  fetchAvatarStatus: taskId =>
    api.get(`/avatar/fetch/status/${taskId}`),

  fetchAvatarUserId: taskId =>
    api.get(`/avatar/fetch/result/${taskId}`, { responseType: 'blob' }),
}

export default avatarApi