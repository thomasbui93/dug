const PageCache = require('../jobs/models/page_cache')
const getSequelize = require('./sequelize')

module.exports = async function dataSync() {
  const sequelize = getSequelize()
  await sequelize.authenticate()
  await sequelize.sync()
  console.log("All models were synchronized successfully.", results)
}
