import api from '../index'

const userApi = {
    fetchUser: () => api.get('/users/me'),
    patchUser: data => api.patch('/users/me', data),
    deleteUser: () => api.delete(`users/me`)
}

export default userApi
