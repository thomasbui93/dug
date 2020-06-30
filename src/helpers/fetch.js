const fetch = require('node-fetch')

module.exports = async (url, options) => {
  const response = await fetch(url, {
    timeout: 3000,
    ...options,
  })
  const data = await response.json()
  return data
}
