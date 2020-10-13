const PageCache = require('../models/page_cache')
const getAllPoemLinks = require('./author_page')
const getPoemContent = require('./poem_page')

const poemJob = async function (authorName) {
  await PageCache.sync()
  const allPoemLinks = await getAllPoemLinks(authorName)
  const promises = allPoemLinks.map(poemLink => getPoemContent(`${process.env.BASE_POEM_URL}/${poemLink}`))
  return Promise.all(promises)
    .then(() => {
      console.log('Finished crawling pages.')
    })
}

poemJob(process.env.AUTHOR)
