const { Router } = require('express')
const { cacheValidate } = require('../../jobs/cache_validate')
const crawlerResultSearch = require('../../services/crawler/search')

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    await cacheValidate(req.query.author)
    res.json({
      status: true,
    })
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { tags, page, size } = req.query
    const tagList = typeof tags !== 'undefined' && tags.length > 0 ? tags.split(',') : []

    const crawlerResults = await crawlerResultSearch(tagList, page, size)

    res.json({
      crawlerResults,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
