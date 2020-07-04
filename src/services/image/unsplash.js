const Unsplash = require('unsplash-js')
const fetch = require('node-fetch')
const { memoize } = require('../cache/memoize')

global.fetch = fetch

const searchImage = async (query) => {
  // eslint-disable-next-line
  const instance = new Unsplash.default({ accessKey: `${process.env.UNSPLASH_KEY}` })
  return new Promise((resolve, reject) => {
    instance
      .search
      .photos(query, 1, 10)
      .then(Unsplash.toJson)
      .then(({ results }) => {
        const randomIndex = Math.floor(Math.random() * (results.length - 1))
        resolve(results[randomIndex].urls.raw)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = memoize(searchImage, 'unsplash_search', 1000 * 5)
