const { Router } = require('express')
const { healthCheck } = require('../../services/cache')

const router = Router()
router.get('/', async (req, res, next) => {
  const cache = await healthCheck()

  try {
    res.json({
      cacheProvider: cache,
      status: 'ok',
    })
  } catch (err) {
    next(err);
  }
})

module.exports = router
