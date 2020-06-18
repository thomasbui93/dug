const internalAuth = require('../../../src/middleware/auth/internal')

describe('internalAuth', () => {
  it('should call next if query contains secret same as process.env.SECRET_TOKEN', () => {
    process.env.SECRET_TOKEN = '123456'
    const next = jest.fn()
    internalAuth({
      query: {
        secret: '123456',
      },
    }, {}, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(next.mock.calls[0][0]).toBe(undefined)
  })

  it('should call next with error if query contains wrong secret', () => {
    const next = jest.fn()
    internalAuth({
      query: {
        secret: 'xxx',
      },
    }, {}, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error)
  })

  it('should call next with error if query does not contains secret', () => {
    const next = jest.fn()
    internalAuth({
      query: {
        non_secret: 'xxx',
      },
    }, {}, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error)
  })
})
