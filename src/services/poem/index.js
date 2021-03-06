const format = require('./format')
const log = require('../logging').child({
  tag: 'poem service',
})
const getPoemContent = require('./get_poem_content')
const getAllPoemLinks = require('./get_author_poem_links')
const { addPoemQueue } = require('../../jobs/poem')
const { memoize } = require('../cache/memoize')

const getRandomPoem = (poems) => {
  if (poems.length === 0) return false
  const randomLink = Math.floor((Math.random() * poems.length))
  return `${process.env.BASE_POEM_URL}/${poems[randomLink]}`
}

module.exports = memoize(async (searchTerm = process.env.AUTHOR) => {
  try {
    const poems = await getAllPoemLinks(searchTerm)
    addPoemQueue(searchTerm, poems)
    const randomLink = getRandomPoem(poems)
    const poem = await getPoemContent(randomLink)
    return {
      poem: poem ? format(poem) : [],
      link: randomLink,
    }
  } catch (err) {
    log.error(err.message, {
      stack: err.stack,
    })
    return {
      poem: [],
      link: false,
    }
  }
}, 'random_poem', 1000 * 60)
