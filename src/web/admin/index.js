const { Router } = require('express')
const jobRouter = require('./job')
const cacheRouter = require('./cache')

const adminRouter = Router()

adminRouter.use('/job', jobRouter)
adminRouter.use('/cache', cacheRouter)

module.exports = adminRouter
