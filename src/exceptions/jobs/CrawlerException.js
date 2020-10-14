module.exports = class CrawlerException extends Error {
  constructor(message) {
    super(message)
    this.name = 'CrawlerException'
  }
}
