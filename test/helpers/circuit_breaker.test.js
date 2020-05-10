const CircuitBreaker = require('../../src/helpers/circuit_breaker')

jest.useFakeTimers()

describe('CircuitBreaker heat method', () => {
  describe('when failureCount is less than breakPoint', () => {
    it('increase one', () => {
      const circuit = new CircuitBreaker()
      const prev = circuit.failureCount
      circuit.heat()
      expect(prev + 1).toEqual(circuit.failureCount)
    })
  })

  describe('when failureCount is equal than breakPoint', () => {
    it('does not increase', () => {
      const circuit = new CircuitBreaker(1)
      circuit.heat()
      const prev = circuit.failureCount
      circuit.heat()
      expect(prev).toEqual(circuit.failureCount)
    })
  })

  describe('when failureCount is greater than breakPoint', () => {
    it('does not increase', () => {
      const circuit = new CircuitBreaker(1)
      circuit.heat()
      circuit.heat()
      const prev = circuit.failureCount
      circuit.heat()
      expect(prev).toEqual(circuit.failureCount)
    })
  })
})

describe('CircuitBreaker cutCheck method', () => {
  describe('when failureCount is less than breakPoint', () => {
    it('return false state', () => {
      const circuit = new CircuitBreaker()
      expect(circuit.cutCheck()).toBe(false)
      expect(circuit.resetTimer).toBeNull()
    })
  })

  describe('when failureCount reach breakPoint', () => {
    it('return true state', () => {
      const circuit = new CircuitBreaker()
      circuit.failureCount = circuit.breakPoint
      circuit.resetTimer = true // manually turn off reset.
      expect(circuit.cutCheck()).toBe(true)
      expect(circuit.resetTimer).toBeTruthy()
    })

    it('set up a timer to check reset the failure counter', () => {
      const circuit = new CircuitBreaker()
      circuit.failureCount = circuit.breakPoint

      circuit.cutCheck()
      jest.runOnlyPendingTimers()
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(clearTimeout).toHaveBeenCalledTimes(1)
      expect(circuit.failureCount).toBe(0)
      expect(circuit.resetTimer).toBeNull()
    })
  })
})
