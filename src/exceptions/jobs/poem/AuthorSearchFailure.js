module.exports = class AuthorSearchFailure extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthorSearchFailure'
  }
}
