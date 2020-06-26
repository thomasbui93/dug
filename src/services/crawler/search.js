const crawlerResultEntryModel = require('../../models/crawler/crawler_result_entry')

const getQuery = (tags) => (tags.length > 0 ? {
  tags: {
    $all: tags,
  },
} : {})

const crawlerResultSearch = async (tags = [], page = 1, size = 20) => {
  try {
    const results = await crawlerResultEntryModel.find(getQuery(tags))
      .sort({ createdAt: 1 })
      .skip((page - 1) * size)
      .limit(size)

    return results
  } catch (err) {
    throw Error(`Failed to query crawler result ${err.message}`)
  }
}

module.exports = crawlerResultSearch
