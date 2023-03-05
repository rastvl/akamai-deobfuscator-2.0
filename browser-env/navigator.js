const NetworkInformation = require('./NetworkInformation');

const definePermissions = window => {
  class PermissionStatus {
    constructor(name) {
      this.name_ = name;
      this.onchangeCallBack = null;
    }

    get name() {
      return this.name_
    }

    get onchange() {
      return this.onchangeCallBack;
    }

    set onchange(value) {
      this.onchangeCallBack = value;
      this.onchangeCallBack();
    }

    get state() {
      return 'denied'
    }
  }
  window.PermissionStatus = PermissionStatus;

  window.Permissions = function() {}
  window.Permissions.prototype.query = async function(permission) {
    const { name } = permission;
    return Promise.resolve(new window.PermissionStatus(name));
  }
}

class Brave {
  constructor() {}

  async isBrave() {
    return new Promise.resolve(true);
  }
}

const defineNavigator = (window) => {
  definePermissions(window);

  Object.defineProperties(Object.getPrototypeOf(window.navigator), {
    brave: {
      get() {
        return new Brave();
      }
    },
    bluetooth: {
      get: () => {
        return {};
      },
    },
    clipboard: {
      get: () => {
        return {};
      },
    },
    connection: {
      get: () => {
        return new NetworkInformation();
      },
    },
    cookieEnabled: {
      get: () => {
        return true;
      },
    },
    credentials: {
      get: () => {
        return {};
      },
    },
    deviceMemory: {
      get: () => 8,
    },
    bluetooth: {
      get: () => {
        return {};
      },
    },
    doNotTrack: {
      get: () => null,
    },
    geolocation: {
      get: () => {
        return {};
      },
    },
    hid: {
      get: () => {
        return {};
      },
    },
    ink: {
      get: () => {
        return {};
      },
    },
    keyboard: {
      get: () => {
        return {};
      },
    },
    locks: {
      get: () => {
        return {};
      },
    },
    managed: {
      get: () => {
        return {};
      },
    },
    maxTouchPointsoxjl: {
      get: () => 0,
    },
    mediaCapabilities: {
      get: () => {
        return {};
      },
    },
    mediaDevices: {
      get: () => {
        return {};
      },
    },
    mediaSession: {
      get: () => {
        return {};
      },
    },
    onLine: {
      get: () => true,
    },
    pdfViewerEnabled: {
      get: () => {
        return {};
      },
    },
    permissions: {
      get: () => {
        return window.Object.create(window.Permissions.prototype);
      },
    },
    platform: {
      get: () => "Win32",
    },
    product: {
      get: () => "Gecko",
    },
    productSub: {
      get: () => "20030107",
    },
    scheduling: {
      get: () => {
        return {};
      },
    },
    serial: {
      get: () => {
        return {};
      },
    },
    serviceWorker: {
      get: () => {
        return {};
      },
    },
    storage: {
      get: () => {
        return {};
      },
    },
    usb: {
      get: () => {
        return {};
      },
    },
    userActivation: {
      get: () => {
        return {};
      },
    },
    userAgent: {
      get: () =>
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    },
    userAgentData: {
      get: () => {
        return {};
      },
    },
    vendor: {
      get: () => "Google Inc.",
    },
    vendorSub: {
      get: () => "",
    },
    vibrate: {
      value: function vibrate() {
        console.log('VIBRATE!!!')
      }
    },
    getBattery: {
      value: async function getBattery() {
        return new Promise((rs, rj) => {
          setTimeout(() => {
            rs({
              charging: true
            })
          }, 100);
        })
      }
    },
    virtualKeyboard: {
      get: () => {
        return {};
      },
    },
    wakeLock: {
      get: () => {
        return {};
      },
    },
    webdriver: {
      get: () => false,
    },
    webkitPersistentStorage: {
      get: () => {
        return {};
      },
    },
    webkitTemporaryStorage: {
      get: () => {
        return {};
      },
    },
    windowControlsOverlay: {
      get: () => {
        return {};
      },
    },
    xr: {
      get: () => {
        return {};
      },
    },
    appVersion: {
      get: () =>
        "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    },
    javaEnabled: {
      value: function javaEnabled() {
        return false;
      }
    },
    requestMediaKeySystemAccess: {
      value: async function requestMediaKeySystemAccess(params) {
        return new window.Promise((rs, rj) => {
          rs(true);
        });
      }
    },
    registerProtocolHandler: {
      value: function registerProtocolHandler() {
        return;
      }
    }
  });
  window.clientInformation = window.navigator;
};

module.exports = defineNavigator;
