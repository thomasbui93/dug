const PoemJobFailure = require('../../exceptions/jobs/poem/PoemJobFailure')
const PageCache = require('../models/page_cache')
const getAllPoemLinks = require('./author_page')
const getPoemContent = require('./poem_page')
const logger = require('../../helpers/logger')

const log = logger.child('poem_job')

async function poemJob(authorName) {
  try {
    await PageCache.sync()
    const allPoemLinks = await getAllPoemLinks(authorName)
    const promises = allPoemLinks.map((poemLink) => getPoemContent(`${process.env.BASE_POEM_URL}/${poemLink}`))
    const results = await Promise.all(promises)

    return results.length
  } catch (err) {
    log.error(err, 'Poems fetching job failed')
    throw new PoemJobFailure(`Poems fetching job failed: ${err.message}`)
  }
}

poemJob(process.env.AUTHOR)
