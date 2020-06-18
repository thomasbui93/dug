const Queue = require('bull')
const getPoemContent = require('../services/poem/get_poem_content')
const log = require('../services/logging').child({
  tag: 'poem_job',
})

const poemQueue = new Queue('poems', process.env.REDISCLOUD_URL)
const LAG_TIME =  60 * 1000;

const addPoemQueue = (searchKey, links) => {
  poemQueue.add({ searchKey, links })
}
const lagTime = () => setTimeout(() => LAG_TIME)
const isDuplicated = async (key) => {
  const activeJobs = await poemQueue.getActive()
  const found = activeJobs.find((job) => {
    const { searchKey } = job.data
    return searchKey === key
  })
  return typeof found !== 'undefined'
}
const poemQueueHandler = async (job) => {
  const { searchKey, links } = job.data
  const isDup = await isDuplicated(searchKey)
  if (isDup) return
  let counter = 0

  const crawlers = links.map(async (link) => {
    try {
      await getPoemContent(link)
      await lagTime()
      counter ++ 
      poemQueue.progress(counter / links.length * 100)
    } catch (err) {
      throw new Error(`Failed to fetch data from URL: ${link}`);
    }
  })
  
  Promise.all(crawlers)
    .then((values) => log.info(values))
    .catch((err) => log.error(err))
    .finally(() => {
      log.info('Finish task!')
    })
}

poemQueue.process(poemQueueHandler)

module.exports.addPoemQueue = addPoemQueue
module.exports.isDuplicated = isDuplicated
module.exports.poemQueueHandler = poemQueueHandler
module.exports.getJobs = async (start, end) => {
  try {
    const rawJobs = await poemQueue.getJobs(start, end)
    const jobData = rawJobs.map(async (job) => {
      const state = await job.getState()
      const progress = await job.progress()
      return {
        id: job.id,
        state,
        progress
      }
    })
    const jobs = await Promise.all(jobData)
    return jobs
  } catch (err) {
    throw new Error('Failed to get active jobs')
  }
}
