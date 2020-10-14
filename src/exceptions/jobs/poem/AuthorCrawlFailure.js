module.exports = class AuthorCrawlFailure extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthorCrawlFailure'
  }
}
