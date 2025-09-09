import api from '../index'

const reviewsApi = {
  createReview: review => api.post('/reviews', review),
  fetchAllReviews: () => api.get('/reviews/all')
}

export default reviewsApi