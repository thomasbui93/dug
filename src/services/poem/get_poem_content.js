const { getPageElement } = require('../../helpers/crawler')
const crawler = require('../crawler')
const log = require('../logging').child({
  tag: 'poem service',
})
const { setCache, getCache } = require('../cache')

module.exports = async (poemUrl) => {
  try {
    if (!poemUrl) throw Error('Missing the url for fetching a poem')
    const cacheKey = `poem:${poemUrl}`

    const cache = await getCache(cacheKey)
    if (!!cache) return cache

    const content = await crawler(poemUrl, (pageContent) => {
      let poem = getPageElement(pageContent, '.poem-view-separated')
      let html = poem.html()
      if (!html) {
        poem = getPageElement(pageContent, '.page-header h1', '.poem-content > p')
        html = poem.map((p, index) => `<div class="p-fragment-${index + 1}">${p.html()}</div>`).join('')
      }

      return {
        content: html,
        tags: ['poem_entry'],
      }
    })
    if (content.indexOf('null') > -1) {
      throw Error('Crawling has failed')
    }
    await setCache(cacheKey, content)

    return content
  } catch (err) {
    log.error(err.message, {
      stack: err.stack,
    })
    return false
  }
}
