const Queue = require('bull')
const cacheClean = require('../services/crawler/cache_clean')
const log = require('../services/logging').child({
  tag: 'cache_validate_job',
})

const cacheValidateQueue = new Queue('cache_validate_job', process.env.REDISCLOUD_URL)

cacheValidateQueue.process(async () => {
  try {
    await cacheClean()
  } catch (err) {
    log.error('Failed to clean invalid cache.')
  }
})

module.exports.cacheValidate = () => {
  cacheValidateQueue.add()
}

module.exports.getCacheValidationJob = () => cacheValidateQueue
