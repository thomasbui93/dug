const getWeatherMood = require('./get_weather_mood')
const search = require('../image/search')

const getSearchKeyword = (mood) => {
  let keyword
  let count
  mood.forEach((key, value) => {
    if (!keyword) {
      keyword = key
      count = value
    } else if (value > count) {
      keyword = key
      count = value
    }
  })
  return count
}

const getImageByMood = async (ip) => {
  const mood = await getWeatherMood(ip)
  const keyword = getSearchKeyword(mood)
  const image = await search(keyword)
  return image
}

module.exports = getImageByMood
