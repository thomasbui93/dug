const bootstrap = require('./bootstrap');
const startAllJobs = require('./jobs')

async function start() {
  await bootstrap()
  startAllJobs()
}

start()
