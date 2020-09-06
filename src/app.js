const express = require('express')
const cors = require('cors')
const { config } = require('dotenv')
const mongoSetup = require('./setup/mongoose')
const errorHandler = require('./web/error')
const notFoundHandler = require('./web/error/404')
const router = require('./web')
const rateLimited = require('./middleware/rate_limit/general')

module.exports = async () => {
  config()
  await mongoSetup()

  const app = express()
  app.use(cors())
  app.use(rateLimited)
  router(app)
  app.use(express.static('public'))
  app.use(errorHandler)
  app.use(notFoundHandler)

  return app
}
