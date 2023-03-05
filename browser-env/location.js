const defineLocation = window => {
  Object.defineProperties(window.Location, {
    'protocol': {
      get() {
        return 'https:'
      }
    },
    'hostname': {
      get() {
        return 'www.zalando.co.uk'
      }
    },
  });
}

module.exports = defineLocation;