const { memoize, getCacheKey } = require('../../../src/services/cache/memoize')
const { getCache } = require('../../../src/services/cache')

describe('memoize', () => {
  describe('sync function', () => {
    const fn = (x, y) => x + y
    it('should produce function that produce same result as original function', async () => {
      const memFn = await memoize(fn, 'sum_cache')
      const result = await memFn(2, 3)
      expect(result).toBe(fn(2, 3))
    })

    it('should store a cached result from the given function', async () => {
      const memFn = await memoize(fn, 'sum_cache_1')
      const result = await memFn(2, 3)
      expect(result).toBe(fn(2, 3))
      const cacheKey = `sum_cache_1__${getCacheKey([2, 3])}`
      const cached = await getCache(cacheKey)
      expect(cached).toBe(5)
    })
  })

  describe('async function', () => {
    const fn = async (x, y) => {
      const z = new Promise((resolve) => {
        resolve(x + y)
      })
      const result = await z
      return result
    }

    const errFn = async () => {
      throw new Error('Failed successfully!')
    }

    it('should produce function that produce same result as original function', async () => {
      const memFn = await memoize(fn, 'a_sum_cache')
      const result = await memFn(2, 3)
      const expected = await fn(2, 3)
      expect(result).toBe(expected)
    })

    it('should store a cached result from the given function', async () => {
      const memFn = await memoize(fn, 'a_sum_cache_1')
      const result = await memFn(2, 3)
      const expected = await fn(2, 3)
      expect(result).toBe(expected)
      const cacheKey = `a_sum_cache_1__${getCacheKey([2, 3])}`
      const cached = await getCache(cacheKey)
      expect(cached).toBe(5)
    })

    it('should not store the result if error is thrown in original function', async () => {
      try {
        const errFnMemoize = await memoize(errFn, 'err_cache')
        await errFnMemoize(2, 3)
      } catch (err) {
        expect(err instanceof Error).toBe(true)
      }
      const cacheKey = `err_cache__${getCacheKey([2, 3])}`
      const cached = await getCache(cacheKey)
      expect(cached).toBeUndefined()
    })
  })
})


describe('getCacheKey should generate unique cached key based on an array of data', () => {
  it('normal cases', () => {
    expect(getCacheKey([1, 3, '4'])).toBe('1_3_"4"')
    expect(getCacheKey(['0', 1, 3, '4'])).toBe('"0"_1_3_"4"')
    expect(getCacheKey([1, '2', 3])).toBe('1_"2"_3')
  })

  it('object case', () => {
    class Dummy {
      constructor(x, y) {
        this.x = x
        this.y = y
      }
    }
    expect(getCacheKey([1, 3, '4', new Dummy('x', 'y')])).toBe('1_3_"4"_{"x":"x","y":"y"}')
  })

  it('array case', () => {
    expect(getCacheKey([1, '2', 3, [1, 2]])).toBe('1_"2"_3_[1,2]')
  })

  it('function case', () => {
    expect(getCacheKey([1, '2', 3, () => true])).toBe('1_"2"_3')
  })
})
