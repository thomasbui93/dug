const { memoize } = require('../cache/memoize')
const getWeather = require('./get_weather')

const getWeatherMood = (states) => states.reduce((acc, state) => {
  const aggregated = acc instanceof Map ? acc : new Map()
  aggregated.set(state, aggregated.has(state) ? aggregated.get(state) + 1 : 0)
  return aggregated
})

const getWeatherMoodFromIP = async (ip) => {
  const weather = await getWeather(ip)
  return getWeatherMood(weather)
}

module.exports = memoize(getWeatherMoodFromIP, 'weather_mood_ip', 1000 * 60 * 60)
