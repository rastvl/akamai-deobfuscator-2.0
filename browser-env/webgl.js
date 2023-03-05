const { WEBGLEXTENSIONS } = require('./../utils/constants');

const defineWebGL = window => {
  class WebGLDebugRendererInfo {
    constructor() {}

    get UNMASKED_RENDERER_WEBGL() {
      return 37446;
    }
    get UNMASKED_VENDOR_WEBGL() {
      return 37445;
    }
  }
  const glDebugInfo = new WebGLDebugRendererInfo();

  class WebGLRenderingContext {
    constructor() {

    }

    getExtension(ex) {
      if (ex === 'WEBGL_debug_renderer_info') {
        return glDebugInfo;
      }
      return {}
    }

    getParameter(param) {
      if (param === 37446) {
        return 'ANGLE (Intel Inc., Intel(R) Iris(TM) Plus Graphics 640, OpenGL 4.1)';
      }
      if (param === 37445) {
        return 'Google Inc. (Intel Inc.)';
      }
      
      return {};
    }

    getSupportedExtensions() {
      return WEBGLEXTENSIONS;
    }
  }

  const getContext = window.HTMLCanvasElement.prototype.getContext;
  window.HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (type === 'webgl' ||
        type === 'webgl2' ||
        type === 'experimental-webgl'
    ) {
      return new WebGLRenderingContext();
    }
    return getContext.call(this, type, ...args);
  }

  window.WebGLRenderingContext = WebGLRenderingContext;
  window.WebGL2RenderingContext = WebGLRenderingContext;
}

module.exports = defineWebGL;