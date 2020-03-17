const { Router } = require('express')

const router = Router()
router.get('/', (req, res, next) => {
  try {
    res.json({
      ok: true,
    })
  } catch (err) {
    next(err);
  }
})

module.exports = router
