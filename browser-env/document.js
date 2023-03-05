
const defineDocument = window => {
  Object.defineProperties(window.Document.prototype, {
    URL: {
      get: () => {
        return 'https://my.asos.com/identity/login?signin=ca270a738a5c227ec615ac4f24216ca7';
      }
    },
    hidden: {
      get: () => false,
    },
  })
}

module.exports = defineDocument;