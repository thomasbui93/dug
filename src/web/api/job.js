const { Router } = require('express')
const { getJobs } = require('../../jobs/poem')

const router = Router()

router.get('/', async (req, res, next) => {
  const { start , end } = req.query
  const jobs = await getJobs(start, end)
  try {
    res.json(jobs)
  } catch (err) {
    next(err)
  }
})

module.exports = router
