const { Router } = require('express')
const greetingService = require('../../services/greeting')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    res.json(greetingService())
  } catch (err) {
    next(err)
  }
})

module.exports = router
