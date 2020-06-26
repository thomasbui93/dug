const generalRateLimit = require('../../../src/middleware/rate_limit/general')

describe('Totalism rate limit', () => {
  describe('the given limit is not reach', () => {
    it('call next function without Error', () => {
      const next = jest.fn()
      generalRateLimit({}, {}, next)
      expect(next).toHaveBeenCalledTimes(1)
      expect(next.mock.calls[0][0]).toBe(undefined)
    })
  })

  describe('the given limit is reached', () => {
    it('call next function with Error', () => {
      process.env.RATE_LIMITED_TOTAL = 1
      const next = jest.fn()
      generalRateLimit({}, {}, next)
      expect(next).toHaveBeenCalledTimes(1)
      expect(next.mock.calls[0][0]).toBeInstanceOf(Error)
    })
  })
})
