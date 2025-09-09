import api from '../index'

const subscriptionApi = {
  fetchPrice: () => api.get("/prices/subscription-prices"),
}

export default subscriptionApi