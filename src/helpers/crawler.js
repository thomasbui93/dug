const cheerio = require('cheerio')

module.exports.getPageElement = (pageContent, ...rest) => {
  const $ = cheerio.load(pageContent)
  return rest.length === 1 ? $(rest[0]) : rest.map((selector) => $(selector))
}

module.exports.scrapLink = (html) => {
  const regexSearch = RegExp(/href="(.*?)"/g)
  const matches = regexSearch.exec(html)
  return matches.length === 2 ? `${process.env.BASE_POEM_URL}/${matches[1]}` : false
}
