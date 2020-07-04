const getCurrentLocation = require('./get_current_location')
const fetch = require('../../helpers/fetch')
const { memoize } = require('../cache/memoize')

const getLocationId = async (ip) => {
  try {
    const { latitude, longitude } = await getCurrentLocation(ip)
    const url = `${process.env.WEATHER_API_BASE_URL}/location/search/?lattlong=${latitude},${longitude}`
    const data = await fetch(url)
    return data[0].woeid
  } catch (err) {
    return process.env.LOCATION_ID
  }
}

const getWeather = async (ip) => {
  const woeid = await getLocationId(ip)
  const data = await fetch(`${process.env.WEATHER_API_BASE_URL}/location/${woeid}`)
  return data.consolidated_weather.map((json) => json.weather_state_name)
}

module.exports = memoize(getWeather, 'get_weather', 1000 * 60 * 60)
