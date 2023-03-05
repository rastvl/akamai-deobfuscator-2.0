const ExecutionContext = require("./ExecutionContext");
const GlobalEnvironment = require("./GlobalEnvironment");
const window = require('./../browser-env/window');


module.exports = new ExecutionContext(window, GlobalEnvironment);