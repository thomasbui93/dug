const fetch = require('node-fetch')
const PageCache = require('../models/page_cache')

module.exports = async (url, processor) => {
  const page = await PageCache.findOne({
    where: {
      url
    }
  })
  if (page) return content

  const request = await fetch(url, {
    timeout: 10000,
  })
  if (request.status !== 200) throw Error('Failed request!')

  const body = await request.text()
  const { content, type, key } = processor(body)
  if (!type) throw Error('Missing page cache type.')

  await PageCache.create({
    url,
    key,
    content,
    type
  })
  return content
}
