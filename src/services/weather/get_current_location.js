const { memoize } = require('../cache/memoize')
const fetch = require('../../helpers/fetch')

const getGeoLocation = async (ip) => {
  const data = await fetch(`${process.env.GEO_LOCATION_BASE_URL}/${ip}`)
  return data
}

module.exports = memoize(getGeoLocation, 'geo_location')
