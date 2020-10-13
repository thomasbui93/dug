const crawler = require('../helpers/crawler')
const { getPageElement } = require('../../helpers/crawler')

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
        type: 'poem',
        key: `poem__${poemUrl}`
      }
    })

    return content
  } catch (err) {
    throw Error(`Failed to get poem content from given url ${poemUrl}`)
  }
}

module.exports = getPoemContent
