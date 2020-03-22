const { Router } = require('express')
const poemService = require('../../services/poem')

const router = Router()

router.get('/', async (req, res, next) => {
  const randomPoem = await poemService()

  try {
    res.json(randomPoem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
