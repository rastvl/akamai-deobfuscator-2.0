
const defineCanPlayType = window => {

  const parseInput = arg => {
    const [mime, codecStr] = arg.trim().split(';')
    let codecs = []
    if (codecStr && codecStr.includes('codecs="')) {
      codecs = codecStr
        .trim()
        .replace(`codecs="`, '')
        .replace(`"`, '')
        .trim()
        .split(',')
        .filter(x => !!x)
        .map(x => x.trim())
    }
    return {
      mime,
      codecStr,
      codecs
    }
  }
  
  const canPlayType = {
    // Intercept certain requests
    apply: function(target, ctx, args) {
      if (!args || !args.length) {
        return target.apply(ctx, args)
      }
      const { mime, codecs } = parseInput(args[0])
      // This specific mp4 codec is missing in Chromium
      if (mime === 'video/mp4') {
        if (codecs.includes('avc1.42E01E')) {
          return 'probably'
        }
      }
      // This mimetype is only supported if no codecs are specified
      if (mime === 'audio/x-m4a' && !codecs.length) {
        return 'maybe'
      }

      // This mimetype is only supported if no codecs are specified
      if (mime === 'audio/aac' && !codecs.length) {
        return 'probably'
      }
      // Everything else as usual
      return target.apply(ctx, args)
    }
  }

  window.HTMLMediaElement.canPlayType = function() {

  }

  window.HTMLMediaElement.canPlayType = new Proxy(
    window.HTMLMediaElement.canPlayType,
    canPlayType
  )
}

const defineHTMLMediaElement = window => {
  defineCanPlayType(window);
}

module.exports = defineHTMLMediaElement;