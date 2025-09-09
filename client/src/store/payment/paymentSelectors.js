export const selectPaymentStatus = s => s.payment.paymentStatus
export const selectPaymentError  = s => s.payment.paymentError

export const selectPaymentLoading = s =>
  s.payment.paymentStatus === "loading"

export const selectPaymentSuccess = s =>
  s.payment.paymentStatus === "succeeded"

export const selectPaymentFailed = s =>
  s.payment.paymentStatus === "failed"
