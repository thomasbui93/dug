const pino = require('pino')
const sentry = require('./sentry')

module.exports = process.env.NODE_ENV === 'production' ? sentry : pino(pino.destination('./log'))
