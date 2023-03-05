const defineXMLHttpRequest = window => {
  const XMLHttpRequestSend = window.XMLHttpRequest.prototype.send;
  window.XMLHttpRequest.prototype.send = function send(...args) {
    console.log(...args);
    return XMLHttpRequestSend.call(this, ...args);
  }

  const XMLHttpRequestOpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function open(...args) {
    args[1] = 'http://127.0.0.1:3000/send'; // {"success": true}
    console.log('OPEN: ', ...args);
    return XMLHttpRequestOpen.call(this, ...args);
  }
}

module.exports = defineXMLHttpRequest;