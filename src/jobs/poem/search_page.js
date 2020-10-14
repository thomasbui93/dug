const AuthorSearchFailure = require('../../exceptions/jobs/poem/AuthorSearchFailure')
const { scrapLink } = require('../../helpers/crawler')
const crawler = require('../helpers/crawler')
const logger = require('../../helpers/logger')

const log = logger.child('poem_author_search')

const getSearchPage = async (searchTerm) => {
  try {
    const searchUrl = `https://www.thivien.net/qsearch.xml.php?Core=author&Field=Name&Value=${encodeURI(searchTerm)}&Page=0`
    const content = await crawler(searchUrl, (body) => ({
      content: scrapLink(body),
      type: 'poem',
      key: `search_page__${searchTerm}`,
    }))

    return content
  } catch (err) {
    log.error(err, 'Failed to search author page.')
    throw new AuthorSearchFailure(err.message)
  }
}

module.exports = getSearchPage
