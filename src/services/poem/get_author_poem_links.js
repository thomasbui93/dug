const crawler = require('../crawler')
const { scrapLink, getPageElement } = require('../../helpers/crawler')
const log = require('../logging').child({
  tag: 'poem service',
})

const getMainPage = async (searchTerm) => {
  try {
    const searchUrl = `https://www.thivien.net/qsearch.xml.php?Core=author&Field=Name&Value=${encodeURI(searchTerm)}&Page=0`
    const content = await crawler(searchUrl, (body) => ({
      content: scrapLink(body),
      tags: [`poem_author_search:${searchTerm}`],
    }))

    return content
  } catch (err) {
    log.error(err.message, {
      stack: err.stack,
    })
    return false
  }
}

module.exports = async (searchTerm) => {
  try {
    const mainPage = await getMainPage(searchTerm)
    if (!mainPage) throw Error('Missing URL for fetching all poem')

    const content = await crawler(mainPage, (body) => {
      const linkDOMs = getPageElement(body, '.poem-group-list li a')
      const links = linkDOMs.map((_, link) => link.attribs.href).toArray()

      return {
        tags: [`poem_author_links:${searchTerm}`],
        content: links,
      }
    })

    return content
  } catch (err) {
    log.error(err.message, {
      stack: err.stack,
    })
    return []
  }
}
