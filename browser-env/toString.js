const { userFunctionToString } = require('./../utils/constants');

const defineToString = window => {
  const orgToString = window.Function.prototype.toString;
  window.Function.prototype.toString = function toString() {
    if (userFunctionToString.has(this)) {
      const result = userFunctionToString.get(this);
      return result;
      return result.replaceAll(/console\.log\([a-zA-Z0-9_\(\)\s,\[\]']*\);/g, '');
    }

    return orgToString.call(this);
  }

}

module.exports = defineToString;