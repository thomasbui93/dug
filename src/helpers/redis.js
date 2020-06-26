const Redis = require('ioredis')

const redis = new Redis(process.env.REDISCLOUD_URL)

module.exports = redis
