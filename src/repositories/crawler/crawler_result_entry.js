const CrawlerResultEntryModel = require('../../models/crawler/crawler_result_entry');

class CrawlerResultEntryRepository {
  static async create({
    url, tags, content, metadata,
  }) {
    try {
      const entry = await CrawlerResultEntryModel.create({
        url,
        tags,
        content,
        metadata,
      })
      return entry
    } catch (err) {
      throw new Error('Failed to insert CrawlerResultEntry')
    }
  }

  static async retrieveByUrl(url) {
    try {
      const entry = await CrawlerResultEntryModel.findOne({
        url,
      })
      return entry
    } catch (err) {
      throw new Error('Failed to find an entry from given url')
    }
  }

  static async deleteMany(options) {
    try {
      const result = await CrawlerResultEntryModel.deleteMany(options)
      return result
    } catch (err) {
      throw new Error(`Failed to find an entry from given options: ${options}`)
    }
  }
}

module.exports = CrawlerResultEntryRepository
