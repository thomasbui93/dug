const fetch = require('node-fetch')
const CrawlerException = require('../../exceptions/jobs/CrawlerException')
const logger = require('../../helpers/logger')
const PageCache = require('../models/page_cache')

const log = logger.child('crawler')

module.exports = async (url, processor) => {
  try {
    const page = await PageCache.findOne({
      where: {
        url,
      },
    })

    if (page) return page

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
      type,
    })
    return content
  } catch (err) {
    log.error(err, 'Crawler exception.')
    throw new CrawlerException(err.message)
  }
}
