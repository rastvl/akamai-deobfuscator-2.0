chrome = {};
chrome.app = {
  InstallState: {
    DISABLED: "disabled",
    INSTALLED: "installed",
    NOT_INSTALLED: "not_installed",
  },
  RunningState: {
    CANNOT_RUN: "cannot_run",
    READY_TO_RUN: "ready_to_run",
    RUNNING: "running",
  },
  getDetails: () => {
    "[native code]";
  },
  getIsInstalled: () => {
    "[native code]";
  },
  installState: () => {
    "[native code]";
  },
  get isInstalled() {
    return false;
  },
  runningState: () => {
    "[native code]";
  },
};

chrome.runtime = {
  OnInstalledReason: {
    CHROME_UPDATE: "chrome_update",
    INSTALL: "install",
    SHARED_MODULE_UPDATE: "shared_module_update",
    UPDATE: "update",
  },
  OnRestartRequiredReason: {
    APP_UPDATE: "app_update",
    OS_UPDATE: "os_update",
    PERIODIC: "periodic",
  },
  PlatformArch: {
    ARM: "arm",
    ARM64: "arm64",
    MIPS: "mips",
    MIPS64: "mips64",
    X86_32: "x86-32",
    X86_64: "x86-64",
  },
  PlatformNaclArch: {
    ARM: "arm",
    MIPS: "mips",
    MIPS64: "mips64",
    X86_32: "x86-32",
    X86_64: "x86-64",
  },
  PlatformOs: {
    ANDROID: "android",
    CROS: "cros",
    FUCHSIA: "fuchsia",
    LINUX: "linux",
    MAC: "mac",
    OPENBSD: "openbsd",
    WIN: "win",
  },
  RequestUpdateCheckStatus: {
    NO_UPDATE: "no_update",
    THROTTLED: "throttled",
    UPDATE_AVAILABLE: "update_available",
  },
  connect: function() {
    "[native code]";
  },
  sendMessage: function() {
    "[native code]";
  },
  id: undefined,
};

let startE = Date.now();
chrome.csi = function () {
  "[native code]";
  return {
    startE: startE,
    onloadT: startE + 281,
    pageT: 3947.235,
    tran: 15,
  };
};

chrome.loadTimes = function () {
  "[native code]";
  return {
    get requestTime() {
      return startE / 1000;
    },
    get startLoadTime() {
      return startE / 1000;
    },
    get commitLoadTime() {
      return startE / 1000 + 0.324;
    },
    get finishDocumentLoadTime() {
      return startE / 1000 + 0.498;
    },
    get finishLoadTime() {
      return startE / 1000 + 0.534;
    },
    get firstPaintTime() {
      return startE / 1000 + 0.437;
    },
    get firstPaintAfterLoadTime() {
      return 0;
    },
    get navigationType() {
      return "Other";
    },
    get wasFetchedViaSpdy() {
      return true;
    },
    get wasNpnNegotiated() {
      return true;
    },
    get npnNegotiatedProtocol() {
      return "h3";
    },
    get wasAlternateProtocolAvailable() {
      return false;
    },
    get connectionInfo() {
      return "h3";
    },
  };
};

module.exports = chrome;