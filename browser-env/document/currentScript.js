const defineCurrentScript = window => {
  Object.defineProperty(window.Document.prototype, 'currentScript', {
    get: () => {
      return new Proxy({}, {
        get(target, prop, r) {
          if (prop === 'src') {
            return 'https://my.asos.com/cPYhw7js-taKj/GV/951_KziztRsQ/f5OEkf5rkY5Qit/fSovAg/WXQ/MOWY5XCs'
          }
        }
      })
    }
  });
}

module.exports = defineCurrentScript;