const { Router } = require('express')
const weatherService = require('../../services/weather/get_weather')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const weather = await weatherService(req.connection.remoteAddress)
    res.json(weather)
  } catch (err) {
    next(err)
  }
})

module.exports = router
