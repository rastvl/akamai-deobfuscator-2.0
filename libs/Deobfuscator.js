
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const ExecutionContext = require('./ExecutionContext');
const window = require('./../browser-env/window');
const Interpreter = require('./Interpreter');


class Deobfuscator {
  constructor(ast, env) {
    this.ast = ast;
    this.env = env;
    this.exec = new ExecutionContext(window, env);
    this.interpreter = new Interpreter();
  }

  getCode() {
    return generate(this.ast).code;
  }

  deobfuscate() {
    this._replaceStrings();
  }

  _replaceStrings() {
    const self = this;
    traverse(this.ast, {
      CallExpression: path => {
        const { node } = path;
        if (
          t.isMemberExpression(node.callee) &&
          (
            (t.isIdentifier(node.callee.object) &&
            node.callee.object.name === 'EE') ||
            (t.isMemberExpression(node.callee.object) &&
            t.isIdentifier(node.callee.object.object) &&
            node.callee.object.object.name === 'EE')
          ) &&
          t.isIdentifier(node.callee.property)
        ) {
          try {
            let result = self.interpreter.eval(node, self.exec);
            if (typeof result === 'string') {
              path.replaceWith(t.stringLiteral(result));
            } else if (typeof result === 'number') {
              path.replaceWith(t.numericLiteral(result));
            }
          } catch(err) { console.log(err) }
        }
      }
    });
  }
  
}

module.exports = Deobfuscator;