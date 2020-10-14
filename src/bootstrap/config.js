const { config } = require('dotenv')

let output

module.exports = function setupConfig() {
  if (typeof output !== 'undefined') return
  output = config()
}
