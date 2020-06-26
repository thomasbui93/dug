const { Router } = require('express')
const { connection } = require('mongoose')
const { healthCheck } = require('../../services/cache')
const redis = require('../../helpers/redis')

const router = Router()
router.get('/', async (req, res, next) => {
  try {
    const cache = await healthCheck()
    const pong = await redis.ping()
    res.json({
      cacheProvider: cache,
      status: 'ok',
      redis: pong === 'pong' ? 'ok' : 'failed',
      mongo: connection.readyState === 1 ? 'ok' : 'failed',
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
