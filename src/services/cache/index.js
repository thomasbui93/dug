const native = require('./native')
const memcached = require('./memcached')

module.exports = process.env.NODE_ENV === 'production' ? memcached : native
