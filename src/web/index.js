const healthCheck = require('./health_check')
const greeting = require('./api/greeting')

module.exports = (app) => {
  app.use('/z/check', healthCheck)
  app.use('/api/greeting', greeting)
}
