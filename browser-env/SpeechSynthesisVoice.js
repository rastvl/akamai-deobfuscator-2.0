const defineSpeechSynthesisVoice = (window) => {
  class SpeechSynthesisVoice extends Object {}

  window.SpeechSynthesisVoice = SpeechSynthesisVoice;

  window.Object.defineProperty(
    window.SpeechSynthesisVoice.prototype,
    Symbol.toStringTag,
    {
      configurable: true,
      enumerable: false,
      writable: false,
      value: "SpeechSynthesisVoice",
    }
  );

  window.Object.defineProperty(
    window.SpeechSynthesisVoice.prototype,
    "constructor",
    {
      value: Object,
    }
  );

  // hook
  const props = ["default", "lang", "localService", "name", "voiceURI"];
  const voiceObjs = [];

  for (const voice of fakeVoices) {
    const voiceObj = new SpeechSynthesisVoice();
    voiceObjs.push(voiceObj);

    window.Object.setPrototypeOf(
      voiceObj,
      new Proxy(window.SpeechSynthesisVoice.prototype, {
        ownKeys(target) {
          // 'constructor' not in the prototype of SpeechSynthesisVoice
          return window.Reflect.ownKeys(target).filter(
            (e) => e !== "constructor"
          );
        },
        get: (target, property, receiver) => {
          //
          if (property === "__proto__") {
            return window.Object.getPrototypeOf(voiceObj);
          }

          return window.Reflect.get(target, property, receiver);
        },
      })
    );
  }

  for (const prop of props) {
    Object.defineProperty(SpeechSynthesisVoice.prototype, prop, {

    });

    utils.mockGetterWithProxy(
      SpeechSynthesisVoice.prototype,
      prop,
      _Object.create,
      {
        configurable: true,
        enumerable: true,
      },
      {
        apply: (target, thisArg, args) => {
          if (
            voiceObjs.map((e) => _Object.getPrototypeOf(e)).includes(thisArg)
          ) {
            // window.speechSynthesis.getVoices()[0].__proto__.default
            // throw TypeError

            if (props.includes(prop)) {
              throw utils.patchError(new TypeError("Illegal invocation"), prop);
            } else {
              return undefined;
            }
          }

          return fakeVoices[voiceObjs.indexOf(thisArg)][prop];
        },
      }
    );
  }
};

module.exports = defineSpeechSynthesisVoice;
