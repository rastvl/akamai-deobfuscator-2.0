const defineCanvas = window => {
  window.CanvasRenderingContext2D = window.document.createElement('canvas').getContext('2d');
  window.CanvasRenderingContext = window.document.createElement('canvas').getContext('2d');
}

module.exports = defineCanvas;