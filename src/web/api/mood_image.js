const { Router } = require('express')
const weatherService = require('../../services/weather/get_image_by_mood')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const image = await weatherService(req.connection.remoteAddress)
    res.json({
      image,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
