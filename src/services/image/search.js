const getUnsplashImage = require('./unsplash')
const getPixaBayImage = require('./pixabay')
const { memoize } = require('../cache/memoize')
const promiseAny = require('../../helpers/promise_any')

const getRemoteImage = (provider, keyword) => {
  switch (provider) {
    case 'unsplash':
      return getUnsplashImage(keyword)
    case 'pixabay':
      return getPixaBayImage(keyword)
    default:
      throw new Error('Unknown provider')
  }
}

const searchImageByKeyword = async (keyword) => {
  const query = keyword.split(' ').join('+')
  const result = await promiseAny([
    getRemoteImage('unsplash', query),
    getRemoteImage('pixabay', query),
  ])
  return result
}

module.exports = memoize(searchImageByKeyword, 'image_search', 1000 * 30)
