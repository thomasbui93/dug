const { Client } = require('memjs')

const client = Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
  username: process.env.MEMCACHEDCLOUD_USERNAME,
  password: process.env.MEMCACHEDCLOUD_PASSWORD,
})

const setCache = async (key, data, ttl) => {
  try {
    await client.set(key, data, { expires: ttl })
    return data
  } catch (err) {
    return undefined
  }
}

const getCache = async (key) => {
  try {
    const data = await client.get(key)
    return data
  } catch (err) {
    return undefined
  }
}

module.exports = {
  setCache,
  getCache,
}
