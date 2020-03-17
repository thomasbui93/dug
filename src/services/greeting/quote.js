const fetch = require('node-fetch')

module.exports = async () => {
  const response = await fetch(process.env.QUOTE_URL)
  const json = await response.json()

  return {
    message: json.quoteText,
    author: json.quoteAuthor,
  }
}
