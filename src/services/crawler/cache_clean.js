const crawlerResultEntryRepository = require('../../repositories/crawler/crawler_result_entry')
const log = require('../logging').child({
  tag: 'validate_cache',
})

module.exports = async () => {
  try {
    const resultDuplicated = await crawlerResultEntryRepository.deleteMany({
      "tags": [
        "poem_author_links:Lý Bạch",
        "https://www.thivien.net"
      ]
    })
    const resultNullContent = await crawlerResultEntryRepository.deleteMany({
      content: /null/,
    })
    const resultEmptyContent = await crawlerResultEntryRepository.deleteMany({
      content: [],
    })
  } catch (err) {
    log.error(err)
    throw Error('Failed to clean invalid cache')
  }
}
