const fetch = require('../../helpers/fetch')
const { memoize } = require('../cache/memoize')

const searchImage = async (keyword) => {
  const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API}&q=${encodeURI(keyword)}&image_type=photo`
  const { hits } = await fetch(url)
  const randomIndex = Math.floor(Math.random() * (hits.length - 1))
  return hits[randomIndex].largeImageURL
}

module.exports = memoize(searchImage, 'pixabay_search', 1000 * 5)
