const fetch = require('node-fetch')
const { URL } = require('url')
const crawlerResultEntryRepository = require('../../repositories/crawler/crawler_result_entry')

const getBaseSite = (url) => (new URL(url)).origin

module.exports = async (url, processor) => {
  const cached = await crawlerResultEntryRepository.retrieveByUrl(url)
  if (cached && cached.content.length > 100) return cached.content

  const request = await fetch(url, {
    timeout: 10000,
  })
  if (request.status !== 200) {
    throw Error('Failed request!')
  }
  const body = await request.text()
  const { content, metadata, tags } = processor(body)
  const origin = getBaseSite(url)

  await crawlerResultEntryRepository.create({
    url,
    content,
    metadata,
    tags: tags ? [...tags, origin] : [origin],
  })
  return content
}
