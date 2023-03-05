
const defineInterval = window => {
  const windowInterval = window.setInterval;
  const windowTimeout = window.setTimeout;
  let timeoutCallCounter = 0;  
  let intervalCallCounter = 0;

  window.setInterval = function setInterval(...args) {
    console.log('interval', intervalCallCounter);
    ++intervalCallCounter;
    if (intervalCallCounter > 3) {
      return;
    }
    const intervalId = windowInterval(...args);

    var clearAll = function() {
      window.clearInterval(intervalId);
    }
    windowTimeout(clearAll, 5000);

    return intervalId;
  }

  window.setTimeout = function(callBack, time) {
    console.log('timeout', timeoutCallCounter);
    ++timeoutCallCounter;
    if (timeoutCallCounter === 5) {
      global.allTimeoutsCleaned = true;
      return;
    }
    if (time === 300000) time = 10000;
    return windowTimeout(callBack, time)
  }
}

module.exports = defineInterval;