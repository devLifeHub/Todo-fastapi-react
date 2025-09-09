import api from '../index'

const todoApi = {
  fetchTodos: () => api.get('/todos'),
  fetchTodo: id => api.get(`/todos/${id}`),
  createTodo: data => api.post('/todos', data),
  updateTodo: (id, data) => api.put(`/todos/${id}`, data),
  patchTodo: (id, data) => api.patch(`/todos/${id}`, data),
  deleteTodo: id => api.delete(`/todos/${id}`),
}

export default todoApi