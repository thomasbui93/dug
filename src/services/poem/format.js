const cheerio = require('cheerio')
const htmlToText = require('html-to-text')

module.exports = (poem) => {
  const $ = cheerio.load(`<div class="root">${poem}</div>`)
  const titles = $('.root > h4')
  const contents = $('.root > h4 + p')
  const response = []
  titles.each(function (index) {
    response[index] = {
      title: $(this).text(),
    }
  })
  contents.each(function (index) {
    response[index].content = htmlToText.fromString($(this).html())
  })
  return response
}
