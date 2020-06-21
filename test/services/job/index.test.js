const getJob = require('../../../src/services/job')
const { getCacheValidationJob } = require('../../../src/jobs/cache_validate')
const { getPoemJob } = require('../../../src/jobs/poem')

describe('getJob', () => {
  describe('arguments validation', () => {
    it('throws error if one of arguments is missing', async () => {
      await expect(getJob())
        .rejects
        .toThrow()
      await expect(getJob('poem'))
        .rejects
        .toThrow()
    })

    it('throws error if invalid arguments is presented', async () => {
      await expect(getJob('poem', 'nah'))
        .rejects
        .toThrow()
      await expect(getJob('nah', 'all'))
        .rejects
        .toThrow()
    })
  })

  describe('valid arguments', () => {
    it('call cache job functionality from given arguments', async () => {
      const cacheJob = getCacheValidationJob()
      jest.spyOn(cacheJob, 'getActive')

      await getJob('cache', 'active')
      expect(cacheJob.getActive).toHaveBeenCalled()
    })

    it('call poem job functionality from given arguments', async () => {
      const poemJob = getPoemJob()
      jest.spyOn(poemJob, 'getActive')

      await getJob('poem', 'active')
      expect(poemJob.getActive).toHaveBeenCalled()
    })
  })
})
