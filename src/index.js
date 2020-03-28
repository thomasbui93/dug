const app = require('./app')
const log = require('./services/logging').child({
  tag: 'server',
})

const port = process.env.PORT

app.listen(port, () => {
  log.info(`App is running in port ${port}`)
})
