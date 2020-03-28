const log = require('../../services/logging').child({
  tag: 'uncaught',
})

module.exports = (err, req, res) => {
  log.error('Uncaught exception', {
    request: req.url,
    method: req.method,
    body: req.body,
    stack: err.stack,
  })

  res.status(500).send({
    error: true,
  })
}
