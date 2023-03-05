
class DeviceMotionEvent extends Event {
  constructor(type, ...args) {
    this.isTrusted = true;
    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelable = false;
    this.composed = false;
    this.defaultPrevented = false;
    this.eventPhase = 0;
    this.interval = 0;
    this.returnValue = true;
    this.type = type;
  }

  static requestPermission() {
    console.log('request permission DeviceMotionEvent')
  }

  get acceleration() {
    return null;
  }

  get rotationRate() {
    return null;
  }

  get accelerationIncludingGravity() {
    return null;
  }

  get currentTarget() {
    return null;
  }

  get srcElement() {
    return null;
  }

  get target() {
    return null;
  }

  get timeStamp() {
    return new Date.getTime().now();
  }
}

module.exports = DeviceMotionEvent;