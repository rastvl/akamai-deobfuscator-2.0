class ExecutionContext {
  constructor(thisValue, env) {
    this.thisValue = thisValue;
    this.env = env;
  }
}

module.exports = ExecutionContext;