const { getCacheValidationJob } = require('../../jobs/cache_validate')
const { getPoemJob } = require('../../jobs/poem')

const jobMap = {
  cache: getCacheValidationJob(),
  poem: getPoemJob(),
}

const typeMap = {
  active: 'getActive',
  waiting: 'getAwaiting',
  delayed: 'getDelayed',
  completed: 'getCompleted',
  all: 'getJobs',
}

module.exports = async (type, status) => {
  const job = jobMap[type]
  if (typeof job === 'undefined') {
    throw new Error('Invalid job type')
  }
  const statusFunction = typeMap[status]
  if (typeof statusFunction === 'undefined') {
    throw new Error('Invalid job status')
  }
  try {
    const jobs = await job[statusFunction]()
    return jobs
  } catch (err) {
    throw new Error(`Failed to get job with following details: ${job}, ${status}.`)
  }
}
