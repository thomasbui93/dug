const { Router } = require('express')
const { healthCheck } = require('../../services/cache')

const router = Router()
router.get('/', async (req, res, next) => {
  try {
    const cache = await healthCheck()
    res.json({
      cacheProvider: cache,
      status: 'ok',
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
