const { Router } = require('express')
const { healthCheck } = require('../../services/cache')
const { connection } = require('mongoose')

const router = Router()
router.get('/', async (req, res, next) => {
  console.log(connection.readyState)
  try {
    const cache = await healthCheck()
    res.json({
      cacheProvider: cache,
      status: 'ok',
      mongo: connection.readyState === 1 ? 'ok': 'failed' 
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
