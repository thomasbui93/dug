const { memoize } = require('../cache/memoize')
const getWeather = require('./get_weather')

const getWeatherMood = (states) => {
  const negative = ['snow', 'sleet', 'hail', 'thunderstorm', 'rain', 'showers']
  const positive = ['cloud', 'clear']

  return states.reduce((acc, state) => {
    let sum = acc instanceof Number ? acc : 0
    if (negative.includes(state)) sum -= 1
    if (positive.includes(state)) sum += 1
    return sum
  })
}

const getWeatherMoodFromIP = async (ip) => {
  const weather = await getWeather(ip)
  return getWeatherMood(weather)
}

module.exports = memoize(getWeatherMoodFromIP, 'weather_mood_ip', 1000 * 60 * 60)
