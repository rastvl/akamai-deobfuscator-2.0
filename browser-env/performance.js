const MemoryInfo = require('./MemoryInfo');

const definePerformance = window => {
  Object.defineProperty(window.Performance.prototype, 'memory', {
    get() {
      return new MemoryInfo();
    }
  })
}

module.exports = definePerformance;