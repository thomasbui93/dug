const { getPageElement } = require('../../helpers/crawler')
const crawler = require('../crawler')
const { memoize } = require('../cache/memoize')
const log = require('../logging').child({
  tag: 'poem service',
})

const getPoemContent = async (poemUrl) => {
  try {
    if (!poemUrl) throw Error('Missing the url for fetching a poem')

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

    return content
  } catch (err) {
    log.error(err.message, {
      stack: err.stack,
    })
    throw Error(`Failed to get poem content from given url ${poemUrl}`)
  }
}

module.exports = memoize(getPoemContent, 'poem_content')
