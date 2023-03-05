class NetworkInformation {
  constructor() {

  }

  get downlink() {
    return 4.6
  }

  get effectiveType() {
    return '4g';
  }

  get rtt() {
    return 150;
  }

  get saveData() {
    return false
  }

}

module.exports = NetworkInformation;