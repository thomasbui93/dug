const crawler = require('../helpers/crawler')
const { getPageElement } = require('../../helpers/crawler')
const searchPage = require('./search_page')

const getAuthorPoemLinks = async (searchTerm) => {
  try {
    const mainPage = await searchPage(searchTerm)
    if (!mainPage) throw Error('Missing URL for fetching all poem')

    const content = await crawler(mainPage, (body) => {
      const linkDOMs = getPageElement(body, '.poem-group-list li a')
      const links = linkDOMs.map((_, link) => link.attribs.href).toArray()

      return {
        type: 'poem',
        content: JSON.stringify(links),
        key: `author_page__${searchTerm}`
      }
    })

    return JSON.parse(content)
  } catch (err) {
    console.log(err)
    throw Error('Failed to get author poem links.')
  }
}

module.exports = getAuthorPoemLinks
