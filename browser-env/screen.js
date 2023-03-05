const defineScreenOrientation = window => {
  class ScreenOrientation {
    constructor() {
      this.onchange = null;
    }

    get angle() {
      return 0;
    }

    get type() {
      return 'landscape-primary';
    }
  }

  window.ScreenOrientation = ScreenOrientation;
}

const defineScreen = (window) => {
  defineScreenOrientation(window);
  Object.defineProperties(window.Screen.prototype, {
    'availHeight': {
      get: () => 900
    },
    'availLeft': {
      get: () => 0
    },
    'availTop': {
      get: () => 0
    },
    'availWidth': {
      get: () => 1440
    },
    'colorDepth': {
      get: () => 30
    },
    'height': {
      get: () => 900
    },
    'isExtended': {
      get: () => false
    },
    'pixelDepth': {
      get: () => 30
    },
    'width': {
      get: () => 1440
    },
    'orientation': {
      get() {
        return new window.ScreenOrientation();
      }
    },
    'onchange': {
      get() {
        return null;
      }
    },
  });

  Object.defineProperties(window, {
    innerHeight: {
      get() {
        return 821;
      }
    },
    innerWidth: {
      get() {
        return 1440;
      }
    },
    outerHeight: {
      get() {
        return 900;
      }
    },
    outerWidth: {
      get() {
        return 1440;
      }
    },
    devicePixelRatio: {
      get() {
        return 1;
      }
    }
  });

}

module.exports = defineScreen;