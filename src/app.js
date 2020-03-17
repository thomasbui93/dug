const express = require('express')
const { config } = require('dotenv')
const router = require('./web')

config()

const app = express()
router(app)

module.exports = app
