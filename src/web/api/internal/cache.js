const { Router } = require('express')
const { cacheValidate } = require('../../../jobs/cache_validate')
const internalAuth = require('../../../middleware/auth/internal')

const router = Router()

router.get('/', internalAuth, async (req, res, next) => {
  await cacheValidate()

  try {
    res.json({
      status: true,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
