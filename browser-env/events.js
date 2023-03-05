
const defineEvents = window => {
  class PointerEvent extends window.Event {
    constructor() {
      super()
    }
  }

  class DeviceOrientationEvent extends window.Event {
    constructor() {
      super()
    }
  }

  class DeviceMotionEvent extends window.Event {
    constructor() {
      super()
    }
  }

  class TouchEvent extends window.Event {
    constructor() {
      super()
    }
  }

  window.DeviceOrientationEvent = DeviceOrientationEvent;
  window.PointerEvent = PointerEvent;
  window.DeviceMotionEvent = DeviceMotionEvent;
  // window.TouchEvent = TouchEvent;

  class UniversalEvent extends window.Event {
    constructor (type) {
      super(type);
    }
    get target() {
      return window.document.createElement('input');
    }
    get currentTarget() {
      return window.document.createElement('input');
    }
    get altKey() { return 1; }
    get ctrlKey() {}
    get shiftKey() {}
    get charCode() {}
    get code() {}
    get detail() {}
    get isComposing() {}
    get key() {}
    get keyCode() { return 1; }
    get location() { return 1; }
    get metakey() { return 1; }
    get repeat() { return 1; }
    get buttun() { return 1; }
    get buttons() { return 1; }
    get clientX() { return 1; }
    get clientY() { return 0; }
    get layerX() { return 1; }
    get layerY() { return 1; }
    get offsetX() {return 1; }
    get offsetY() { return 1; }
    get pageX() { return 1; }
    get pageY() { return 0; }
    get screenX() { return 1; }
    get screenY() { return 1; }
    get x() { return 1; }
    get y() { return 1;}
    get changedTouches() { return {} }
    get touches() {}
  }

  window.UniversalEvent = UniversalEvent;
}

module.exports = defineEvents;