const express = require('express')
const { config } = require('dotenv')
const mongoSetup = require('./setup/mongoose')
const errorHandler = require('./web/error')
const notFoundHandler = require('./web/error/404')
const router = require('./web')

module.exports = async () => {
  config()
  await mongoSetup()

  const app = express()
  router(app)
  app.use(express.static('public'))
  app.use(errorHandler)
  app.use(notFoundHandler)

  return app
}
