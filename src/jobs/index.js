const path = require('path')
const Bree = require('bree')
const PageCache = require('./models/page_cache')

module.exports = function startAllJobs() {
  const jobs = new Bree({
    root: path.resolve('src/jobs'),
    jobs: [
      {
        name: 'poem',
        path: path.join(__dirname, 'poem', 'index.js')
      },
    ]
  })
  jobs.start()
}