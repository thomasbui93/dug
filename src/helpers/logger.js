const pino = require('pino')

const logger = pino().child({
  root: 'bison',
})

module.exports = logger
