module.exports = class CircuitBreaker {
  constructor(breakPoint = 10, autoTurnonTimeout = 3000) {
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
        this.resetTimer = setTimeout(()=> {
          self.failureCount = 0
          clearTimeout(self.resetTimer)
          self.resetTimer = null
        }, this.autoTurnonTimeout)
      }
    }
    return isBroken
  }

  heat() {
    this.failureCount < this.breakPoint ?  this.failureCount ++ : this.failureCount
  }
}
