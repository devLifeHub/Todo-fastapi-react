const extractError = err =>
  err.response?.data?.message || err.response?.data || err.message || "Неизвестная ошибка"

export default extractError