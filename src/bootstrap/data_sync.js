const getSequelize = require('./sequelize')

module.exports = async function dataSync() {
  const sequelize = getSequelize()
  await sequelize.authenticate()
  await sequelize.sync()
}
