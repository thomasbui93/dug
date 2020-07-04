const logger = require('../services/logging').child({
  tag: 'promise_any',
})

module.exports = (promises, timeout = 5000) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Timeout error.'))
  }, timeout)
  let failureCount = 0
  promises.forEach((promise) => {
    promise.then((result) => {
      resolve(result)
    })
      .catch((err) => {
        logger.error(err)
        if (failureCount < promises.length) {
          failureCount += 1
        } else {
          reject(new Error('All promises are rejected.'))
        }
      })
  })
})
