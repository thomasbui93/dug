const pino = require('pino')
const { createWriteStream } = require('pino-sentry')

const stream = createWriteStream({
  dsn: process.env.SENTRY_DSN,
  serverName: process.env.APP_NAME,
})
const logger = pino({}, stream)

module.exports = logger
