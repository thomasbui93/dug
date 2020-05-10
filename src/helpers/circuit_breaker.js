module.exports = class CircuitBreaker {
  constructor(breakPoint = 10, autoTurnonTimeout = 15 * 60 * 000) {
    this.breakPoint = breakPoint
    this.autoTurnonTimeout = autoTurnonTimeout
    this.failureCount = 0
    this.resetTimer = null
  }

  cutCheck() {
    const isBroken = this.failureCount >= this.breakPoint
    if (isBroken) {
      if (this.resetTimer === null) {
        const self = this
        this.resetTimer = setTimeout(() => {
          self.failureCount = 0
          clearTimeout(self.resetTimer)
          self.resetTimer = null
        }, this.autoTurnonTimeout)
      }
    }
    return isBroken
  }

  heat() {
    if (this.failureCount < this.breakPoint) {
      this.failureCount += 1
    }
  }
}
