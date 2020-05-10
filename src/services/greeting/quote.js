const fetch = require('node-fetch')
const CircuitBreaker = require('../../helpers/circuit_breaker')
const log = require('../logging').child({
  tag: 'quoteService',
})

const quoteCircuitBreaker = new CircuitBreaker(10, 15 * 60 * 1000)

module.exports = async () => {
  if (typeof process.env.QUOTE_URL !== 'string') {
    throw new Error('Missing QUOTE_URL in .env')
  }

  const faultMessage = {
    message: '',
    author: '',
  }

  try {
    if (quoteCircuitBreaker.cutCheck()) {
      log.info(`Failure exceeded threshold, retry in ${quoteCircuitBreaker.autoTurnonTimeout / 1000} seconds.`)
      return faultMessage
    }

    const response = await fetch(process.env.QUOTE_URL, {
      timeout: 3000,
    })
    const json = await response.json()
    return {
      message: json.quoteText,
      author: json.quoteAuthor,
    }
  } catch (err) {
    quoteCircuitBreaker.heat()
    return faultMessage
  }
}
