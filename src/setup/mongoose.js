const mongoose = require('mongoose')

module.exports = async (url = process.env.MONGO_URL) => {
  try {
    mongoose.set('debug', process.env.NODE_ENV !== 'production')
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (err) {
    throw Error('Failed to connect to MongoDB')
  }
}
