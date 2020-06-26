const crawlerResultEntryRepository = require('../../repositories/crawler/crawler_result_entry')
const log = require('../logging').child({
  tag: 'validate_cache',
})

module.exports = async (author) => {
  try {
    const query = author ? {
      $or: [{
        content: /null/,
      }, {
        tags: {
          $all: [`poem_author_search:${author}`],
        },
      }],
    } : {
      content: /null/,
    }
    const result = await crawlerResultEntryRepository.deleteMany(query)
    log.info(`Remove invalid cached result: ${result}`)
  } catch (err) {
    log.error(err)
    throw Error('Failed to clean invalid cache')
  }
}
