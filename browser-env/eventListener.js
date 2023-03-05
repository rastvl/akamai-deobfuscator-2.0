const defineAddEventListener = window => {
  // const windowAddEventListener = window.addEventListener;
  // window.addEventListener = function(type, listener, opts) {
  //   setTimeout(() => {
  //     listener();
  //   }, 1000);
  // }

  // const documentAddEventListener = document.addEventListener;

  const addEventListener = window.EventTarget.prototype.addEventListener;
  window.EventTarget.prototype.addEventListener = function(type, listener, opts) {
    setTimeout(() => {
      listener(new window.UniversalEvent(type));
    }, 1000);
  }

}

module.exports = defineAddEventListener;