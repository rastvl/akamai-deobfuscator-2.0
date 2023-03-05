
const defineWebRTC = window => {
  // window.RTCPeerConnection = function RTCPeerConnection() {}
  window.webkitRTCPeerConnection = function RTCPeerConnection() {}
}

module.exports = defineWebRTC;