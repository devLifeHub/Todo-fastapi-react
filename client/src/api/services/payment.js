import api from '../index'

const paymentApi = {
  createPayment: data => api.post("/payments/", data),
}

export default paymentApi