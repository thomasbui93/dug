let caches = {}

exports.setCache = (key, data, ttl) => {
  caches[key] = {
    data,
    ttl,
    timestamp: new Date(),
  }
  return data
}

exports.getCache = (key) => {
  try {
    const cacheData = caches[key]
    if (typeof cacheData === 'undefined') return undefined
    const diff = new Date() - cacheData.timestamp - cacheData.ttl
    return diff > 0 ? undefined : cacheData.data
  } catch (err) {
    return undefined
  }
}

exports.clearCache = (key) => {
  if (key === '*') {
    caches = {}
  } else {
    delete caches[key]
  }
}
