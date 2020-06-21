const healthCheck = require('./health_check')
const greeting = require('./api/greeting')
const poem = require('./api/poem')
const admin = require('./admin')

module.exports = (app) => {
  app.use('/z/check', healthCheck)
  app.use('/api/greeting', greeting)
  app.use('/api/poem', poem)

  app.use('/admin', admin)
}
