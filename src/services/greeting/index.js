const timeGreeter = require('./time_greeter')
const quoteService = require('./quote')

module.exports = async () => {
  const quote = await quoteService()

  return {
    greeter: timeGreeter(),
    quote,
  }
}
