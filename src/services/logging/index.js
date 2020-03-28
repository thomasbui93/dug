const pino = require('pino')

module.exports = process.env.NODE_ENV === 'production' ? require('./sentry') : pino(pino.destination('./log'))
