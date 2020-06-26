const totalism = require('../../services/rate_limit/totalism')

module.exports = (req, res, next) => {
  if (!totalism()) {
    next(new Error('Too many requests for one server!'))
  } else {
    next()
  }
}
