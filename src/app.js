const express = require('express')
const { config } = require('dotenv')
const errorHandler = require('./web/error')

config()
const router = require('./web')

const app = express()
router(app)
app.use(errorHandler)

module.exports = app
