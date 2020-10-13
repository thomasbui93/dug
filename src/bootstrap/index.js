const setupConfig = require('./config')
const dataSync = require('./data_sync')

module.exports = async function bootstrap() {
  setupConfig()
  await dataSync()
}
