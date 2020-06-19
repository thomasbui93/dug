const { Router } = require('express')
const poemService = require('../../services/poem')
const getPoemContent = require('../../services/poem/get_poem_content')

const router = Router()

router.get('/', async (req, res, next) => {
  const randomPoem = await poemService(req.query.author)

  try {
    res.json(randomPoem)
  } catch (err) {
    next(err)
  }
})

router.get('/crawler', async (req, res, next) => {
  const poem = await getPoemContent(encodeURI(req.query.link))
  try {
    res.json({
      poem
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
