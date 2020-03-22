const { Client } = require('memjs')
const util = require('util')

const client = Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
  username: process.env.MEMCACHEDCLOUD_USERNAME,
  password: process.env.MEMCACHEDCLOUD_PASSWORD,
})

const clientSetCache = util.promisify(client.set)
const clientGetCache = util.promisify(client.get)

const setCache = async (key, data, ttl) => {
  try {
    await clientSetCache(key, data, { expires: ttl })
    return data
  } catch (err) {
    return undefined
  }
}

const getCache = async (key) => {
  try {
    const data = await clientGetCache(key)
    return data
  } catch (err) {
    return undefined
  }
}

module.exports = {
  setCache,
  getCache,
}
