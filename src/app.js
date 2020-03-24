const express = require('express')
const { config } = require('dotenv')

config()
const router = require('./web')

const app = express()
router(app)

module.exports = app
