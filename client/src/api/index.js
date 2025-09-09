import axios from 'axios'

const api = axios.create({
  baseURL: 'http://0.0.0.0:8000/api',
  timeout: 30000,
})

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('accessToken')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})


export default api
