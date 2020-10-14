module.exports = class PoemCrawlFailure extends Error {
  constructor(message) {
    super(message)
    this.name = 'PoemCrawlFailure'
  }
}
