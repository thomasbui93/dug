const { Router } = require('express')
const poemService = require('../../services/poem')

const router = Router()

router.get('/random', async (req, res, next) => {
  const randomPoem = await poemService(req.query.author)

  try {
    res.json(randomPoem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
