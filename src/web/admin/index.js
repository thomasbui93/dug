const { Router } = require('express')
const jobRouter = require('./job')

const adminRouter = Router();

adminRouter.use('/job', jobRouter)

module.exports = adminRouter
