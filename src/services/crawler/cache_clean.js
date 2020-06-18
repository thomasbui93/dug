const crawlerResultEntryRepository = require('../../repositories/crawler/crawler_result_entry')
const log = require('../logging').child({
  tag: 'validate_cache',
})

module.exports = async () => {
  try {
    const result = await crawlerResultEntryRepository.deleteMany({
      content: /null/,
    })
    log.info(`Remove invalid cached result: ${result}`)
  } catch (err) {
    log.error(err)
    throw Error('Failed to clean invalid cache')
  }
}
