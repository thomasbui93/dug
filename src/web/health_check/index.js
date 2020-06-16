const { Router } = require('express')
const { connection } = require('mongoose')
const { healthCheck } = require('../../services/cache')

const router = Router()
router.get('/', async (req, res, next) => {
  try {
    const cache = await healthCheck()
    res.json({
      cacheProvider: cache,
      status: 'ok',
      mongo: connection.readyState === 1 ? 'ok' : 'failed',
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
