const normalizeStatus = (apiStatus) => {
  switch (apiStatus) {
    case "PENDING": return "loading"
    case "SUCCESS": return "succeeded"
    case "FAILED": return "failed"
    default: return "idle"
  }
}

export default normalizeStatus
