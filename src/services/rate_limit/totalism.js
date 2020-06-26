const total = {
  timestamp: new Date(),
  count: 0,
}

module.exports = () => {
  const WINDOW_TIME = 1000 * 60
  const REQUESTS = process.env.RATE_LIMITED_TOTAL ? process.env.RATE_LIMITED_TOTAL : 1000

  const now = new Date()
  console.log(now - total.timestamp)

  if (now - total.timestamp < WINDOW_TIME) {
    if (total.count < REQUESTS) {
      total.count += 1
      return true
    }
    return false
  }
  total.timestamp = now
  total.count = 0
  return true
}
