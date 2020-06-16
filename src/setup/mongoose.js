const { connect } = require('mongoose')

module.exports = async (url = process.env.MONGO_URL) => {
  try {
    await connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (err) {
    throw Error('Failed to connect to MongoDB')
  }
}
