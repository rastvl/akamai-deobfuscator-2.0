const defineSpeechSynthesis = window => {
  class SpeechSynthesisVoice {
    constructor(def, lang, localService, name) {
      this.default_ = def;
      this.lang_ = lang;
      this.localService_ = localService;
      this.name_ = name;
      this.voiceURI_ = name;
    }

    get default() {
      return this.default_;
    }
    get lang() {
      return this.lang_;
    }
    get localService() {
      return this.localService_;
    }
    get name() {
      return this.name_;
    }
    get voiceURI() {
      return this.voiceURI_;
    }
  }

  const speech1 = new SpeechSynthesisVoice(true, "ru-RU", true, "Microsoft Irina - Russian (Russia)");
  const speech2 = new SpeechSynthesisVoice(false, "en-US", true, "Microsoft Mark - English (United States)");
  const speech3 = new SpeechSynthesisVoice(false, "en-US", true, "Microsoft Zira - English (United States)");

  class speechSynthesis extends Object {
    constructor() {
      super();
      this._onvoiceschanged = null;
    }

    getVoices() {
      return [
        speech1,
        speech2,
        speech3
      ]
    }

    get onvoiceschanged() {
      return this._onvoiceschanged ;
    }

    set onvoiceschanged(value) {
      this._onvoiceschanged = value;
      this._onvoiceschanged();
    }
  }
  window.speechSynthesis = new speechSynthesis();
}

module.exports = defineSpeechSynthesis;