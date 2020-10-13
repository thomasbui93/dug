const { scrapLink } = require('../../helpers/crawler')
const crawler = require('../helpers/crawler')

const getSearchPage = async (searchTerm) => {
  try {
    const searchUrl = `https://www.thivien.net/qsearch.xml.php?Core=author&Field=Name&Value=${encodeURI(searchTerm)}&Page=0`
    const content = await crawler(searchUrl, (body) => ({
      content: scrapLink(body),
      type: 'poem',
      key: `search_page__${searchTerm}`
    }))

    return content
  } catch (err) {
    console.log(err)
    throw Error('Failed to get main page from search keyword.')
  }
}

module.exports = getSearchPage
