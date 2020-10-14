const crawler = require('../helpers/crawler')
const { getPageElement } = require('../../helpers/crawler')
const PoemCrawlFailure = require('../../exceptions/jobs/poem/PoemCrawlFailure')
const logger = require('../../helpers/logger')

const log = logger.child('poem_page')

const getPoemContent = async (poemUrl) => {
  try {
    if (!poemUrl) throw new PoemCrawlFailure('Missing the url for fetching a poem')

    const content = await crawler(poemUrl, (pageContent) => {
      let poem = getPageElement(pageContent, '.poem-view-separated')
      let html = poem.html()
      if (!html) {
        poem = getPageElement(pageContent, '.page-header h1', '.poem-content > p')
        html = poem.map((p, index) => `<div class="p-fragment-${index + 1}">${p.html()}</div>`).join('')
      }

      return {
        content: html,
        type: 'poem',
        key: `poem__${poemUrl}`,
      }
    })

    return content
  } catch (err) {
    log.error(err, `Failed to get poem content from given url ${poemUrl}.`)
    throw new PoemCrawlFailure(`Failed to get poem content from given url ${poemUrl}: ${err.message}`)
  }
}

module.exports = getPoemContent
