const fetch = require('node-fetch')

module.exports = async () => {
  if (typeof process.env.QUOTE_URL !== 'string') {
    throw new Error('Missing QUOTE_URL in .env')
  }

  const response = await fetch(process.env.QUOTE_URL)
  const json = await response.json()

  return {
    message: json.quoteText,
    author: json.quoteAuthor,
  }
}
