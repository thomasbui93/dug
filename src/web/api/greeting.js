const { Router } = require('express')
const greetingService = require('../../services/greeting')

const router = Router()

router.get('/', async (req, res, next) => {
  const greeting = await greetingService()

  try {
    res.json(greeting)
  } catch (err) {
    next(err)
  }
})

module.exports = router
