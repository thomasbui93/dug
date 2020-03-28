const timeGreeter = require('./time_greeter')
const quoteService = require('./quote')
const log = require('../logging').child({
  tag: 'greeting service',
})

module.exports = async () => {
  try {
    const quote = await quoteService()

    return {
      greeter: timeGreeter(),
      quote,
    }
  } catch (err) {
    log.error(err.message, {
      stack: err.stack,
    })
    return {
      greeter: false,
      quote: false,
    }
  }
}
