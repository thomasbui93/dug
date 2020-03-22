let caches = {}

exports.setCache = (key, data, ttl) => {
  caches[key] = {
    data,
    ttl,
    timestamp: new Date()
  }
  return data
}

exports.getCache = (key) => {
  try {
    const cacheData = caches[key]
    if (typeof cacheData === 'undefined') return undefined
    const diff = new Date() - cacheData.timestamp - cacheData.ttl
    if (diff > 0) {
      return undefined
    } else {
      return cacheData.data
    }
  } catch (err) {
    console.log(err)
  }
}

exports.clearCache = (key) => {
  if (key === '*') {
    caches = {}
  } else {
    delete caches[key]
  }
}
