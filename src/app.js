const express = require('express')
const { config } = require('dotenv')
const errorHandler = require('./web/error')
const notFoundHandler = require('./web/error/404')

config()
const router = require('./web')

const app = express()
router(app)
app.use(errorHandler)
app.use(notFoundHandler)

module.exports = app
