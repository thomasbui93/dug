module.exports = class PoemJobFailure extends Error {
  constructor(message) {
    super(message)
    this.name = 'PoemJobFailure'
  }
}
