const { Router } = require('express')
const jobService = require('../../services/job')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { job, type } = req.query
    const jobs = await jobService(job, type)
    res.json(jobs)
  } catch (err) {
    next(err)
  }
})

module.exports = router
