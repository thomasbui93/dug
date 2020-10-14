const { Sequelize } = require('sequelize')
const setupConfig = require('./config')

let sequelize = null

module.exports = function getSequelize() {
  if (sequelize !== null) return sequelize
  setupConfig()
  sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
    dialect: 'mysql',
    logging: false,
  })
  return sequelize
}
