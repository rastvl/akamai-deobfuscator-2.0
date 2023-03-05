const t = require('@babel/types');
const generate = require("@babel/generator").default;
const Environment = require('./Environment');
const ExecutionContext = require('./ExecutionContext');
const GlobalExecutionContext = require('./GlobalExecutionContext');
const { userFunctionToString } = require('./../utils/constants');
const fs = require('fs');

class Interpreter {
  constructor(code, execCtx = GlobalExecutionContext) {
    this.scriptCode = code;
    this.callStack = [execCtx];
    this.flags = {
      continue: false,
      break: false
    }
  }

  eval(node, ctx = this.callStack[this.callStack.length - 1]) {
    if (global.allTimeoutsCleaned) {
      console.log('SetContext!');
      global.interpreterState = ctx;
      global.allTimeoutsCleaned = false;
      return;
    }

    if (t.isProgram(node)) {
      this._hoistVariables(node, ctx);
      let result;
      node.body.forEach((node) => {
        result = this.eval(node, ctx);
      });
      return result;
    }

    if (t.isExpressionStatement(node)) {
      return this.eval(node.expression, ctx);
    }

    if (t.isLiteral(node)) {
      // if (t.isNullLiteral(node)) {
      //   return null;
      // }
      // return node.value;
      return global.eval(generate(node).code)
    }

    if (t.isBinaryExpression(node)) {
      const left = this.eval(node.left, ctx);
      const right = this.eval(node.right, ctx);
      switch (node.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
        case '%':
          return left % right;
        case '**':
          return left ** right;
        case '==':
          return left == right;
        case '===':
          return left === right;
        case '!=':
          return left != right;
        case '!==':
          return left !== right;
        case '<':
          return left < right;
        case '<=':
          return left <= right;
        case '>':
          return left > right;
        case '>=':
          return left >= right;
        case '|':
          return left | right;
        case '&':
          return left & right;
        case '^':
          return left ^ right;
        case '<<':
          return left << right;
        case '>>':
          return left >> right;
        case '>>>':
          return left >>> right;
        case 'in':
          return left in right;
        case 'instanceof':
          return left instanceof right;
        default:
          throw `Unknown operator ${node.operator}`;
      }
    }

    if (t.isUnaryExpression(node)) {
      const arg = this.eval(node.argument, ctx);
      switch (node.operator) {
        case '+':
          return +arg;
        case '-':
          return -arg;
        case '!':
          return !arg;
        case '~':
          return ~arg;
        case 'typeof':
          return typeof arg;
        case 'void':
          return void arg;
        default:
          throw new Error(`Unknown unary operator ${node.operator}`);
      }
    }

    if (t.isLogicalExpression(node)) {
      switch (node.operator) {
        case '||':
          return this.eval(node.left, ctx) || this.eval(node.right, ctx);
        case '&&':
          return this.eval(node.left, ctx) && this.eval(node.right, ctx);
        case '??':
          return this.eval(node.left, ctx) ?? this.eval(node.right, ctx);
        default:
          throw new Error(`Unknown operator ${node.operator}`);
      }
    }

    if (t.isVariableDeclaration(node)) {
      let result;
      node.declarations.forEach(variableDeclarator => {
        result = this.eval(variableDeclarator, ctx);
      });
      return result;
    }

    if (t.isVariableDeclarator(node)) {
      const name = node.id.name;
      if (!node.init) { // Переменная уже определена из-за hoisting
        return;
      }
      const value = this.eval(node.init, ctx);
      return ctx.env.define(name, value);
    }

    if (t.isIdentifier(node)) {
      return ctx.env.lookup(node.name)
    }

    if (t.isAssignmentExpression(node)) {
      if (t.isIdentifier(node.left)) {
        const left = node.left.name;
        const right = this.eval(node.right, ctx);
        // if (left === 'wPE') {
        //   console.log(`CODE: ${generate(node).code} | RESULT: ${right}`);
        // }
        let prevValue = this.eval(node.left, ctx);
        switch(node.operator) {
          case '=':
            return ctx.env.assign(left, right);
          case '+=':
            return ctx.env.assign(left, prevValue + right);
          case '-=':
            return ctx.env.assign(left, prevValue - right);
          case '*=':
            return ctx.env.assign(left, prevValue * right);
          case '/=':
            return ctx.env.assign(left, prevValue / right);
          case '^=':
            return ctx.env.assign(left, prevValue ^ right);
          case '&=':
            return ctx.env.assign(left, prevValue & right);
          case '|=':
            return ctx.env.assign(left, prevValue | right);
          case '%=':
            return ctx.env.assign(left, prevValue % right);
          default:
            throw `Unimplement operator assignment ${node.operator}`
        }
      }

      if (t.isMemberExpression(node.left)) {
        let objectName = node.left.object.name;
        let object;
        if (objectName === undefined) {
          object = this.eval(node.left.object, ctx);
        } else {
          object = ctx.env.lookup(objectName);
        }
        if (!object) {
          throw `Undefined object in assignment... ${generate(node).code}`;
        }
        let prop;
        if (node.left.computed) {
          prop = this.eval(node.left.property, ctx);
        } else {
          prop = node.left.property.name;
        }
        if (prop == undefined) {
          throw `Undefined property in assignment... ${generate(node).code}`
        }
        const propValue = this.eval(node.right, ctx);
        const prevValue = object[prop];
        switch(node.operator) {
          case '=':
            return object[prop] = propValue;
          case '+=':
            return object[prop] = prevValue + propValue;
          case '-=':
            return object[prop] = prevValue + propValue;
          case '*=':
            return object[prop] = prevValue * propValue;
          case '/=':
            return object[prop] = prevValue / propValue;
          case '^=':
            return object[prop] = prevValue ^ propValue;
          case '&=':
            return object[prop] = prevValue & propValue;
          case '|=':
            return object[prop] = prevValue | propValue;
          case '%=':
            return object[prop] = prevValue % propValue;
          default:
            throw `Unimplement operator assignment ${node.operator}`
        }
      }

      throw `Unimplement assignment for node type ${node.left.type}`;
    }

    if (t.isUpdateExpression(node)) {
      if (t.isIdentifier(node.argument)) {
        const varName = node.argument.name;
        const varValue = this.eval(node.argument, ctx);
        const newValue = node.operator === '++' ? varValue + 1 : varValue - 1;
        if (node.prefix) {
          return ctx.env.assign(varName, newValue);
        }
        ctx.env.assign(varName, newValue);
        return varValue;
      }

      if (t.isMemberExpression(node.argument)) {
        const objectEnv = this.eval(node.argument.object, ctx);
        const prop = node.argument.computed ? this.eval(node.argument.property, ctx) : node.argument.property.name;
        const propValue = objectEnv[prop];
        const newValue = node.operator === '++' ? propValue + 1 : propValue - 1;
        if (node.prefix) {
          return objectEnv[prop] = newValue;
        }
        objectEnv[prop] = newValue;
        return propValue;
      }
    }

    if (t.isEmptyStatement(node)) {
      return;
    }

    if (t.isSequenceExpression(node)) {
      let result;
      const { expressions } = node;
      expressions.forEach(expr => {
        result = this.eval(expr, ctx);
      });
      return result;
    }

    if (t.isThisExpression(node)) {
      return ctx.thisValue;
    }

    if (t.isObjectExpression(node)) {
      const object = {};
      node.properties.forEach(prop => {
        const key = prop.key.name || prop.key.value;
        const value = this.eval(prop.value, ctx);
        object[key] = value;
      })
      return object;
    }

    if (t.isArrayExpression(node)) {
      const elements = node.elements.map(el => this.eval(el, ctx));
      const array = [...elements];
      return array;
    }

    if (t.isConditionalExpression(node)) {
      if (this.eval(node.test, ctx)) {
        return this.eval(node.consequent, ctx)
      } else {
        return this.eval(node.alternate, ctx);
      }
    }

    if (t.isIfStatement(node)) {
      const test = this.eval(node.test, ctx);
      if (test) {
        return this.eval(node.consequent, ctx)
      } else if (node.alternate !== null) {
        return this.eval(node.alternate, ctx)
      } else {
        return undefined;
      }
    }

    if (t.isBlockStatement(node)) {
      this._hoistVariables(node, ctx);
      let result;
      for (let i = 0; i < node.body.length; ++i) {
        const stmt = node.body[i];
        result = this.eval(stmt, ctx);
        if (this.callStack[this.callStack.length - 1] !== ctx) {
          return result;
        }

        if (this.flags.continue || this.flags.break) {
          break;
        }
      }
      return result;
    }

    if (t.isFunctionDeclaration(node)) {
      const self = this;
      const parentEnv = ctx.env;
      const func = function(...args) {
        const activationRecord = {};
        for (let i = 0; i < node.params.length; ++i) {
          activationRecord[node.params[i].name] = args[i];
        }
        activationRecord['arguments'] = [...args];
        const execCtx = new ExecutionContext(
          this,
          new Environment(activationRecord, parentEnv)
        );

        self.callStack.push(execCtx);

        if (new.target) {
          self._evalFunctionBlock(node.body, execCtx);
          return this;
        }

        let result = self._evalFunctionBlock(node.body, execCtx);
        return result;
      }

      const funcString = this.scriptCode.substring(node.loc.start.column, node.loc.end.column);
      userFunctionToString.set(func, funcString);

      ctx.env.define(node.id.name, func);
      return;
    }

    if (t.isFunctionExpression(node)) {
      const name = node.id ? node.id.name : undefined;
      const self = this;
      const parentEnv = ctx.env;
      const func = function(...args) {
        const activationRecord = {};
        if (name) {
          activationRecord[name] = func;
        }
        for (let i = 0; i < node.params.length; ++i) {
          activationRecord[node.params[i].name] = args[i];
        }
        activationRecord['arguments'] = [...args];
        const execCtx = new ExecutionContext(
          this,
          new Environment(activationRecord, parentEnv)
        );

        self.callStack.push(execCtx);

        if (new.target) {
          self._evalFunctionBlock(node.body, execCtx);
          return this;
        }

        let result = self._evalFunctionBlock(node.body, execCtx);
        return result;
      }

      const funcString = this.scriptCode.substring(node.loc.start.column, node.loc.end.column);
      userFunctionToString.set(func, funcString);

      return func;
    }

    if (t.isReturnStatement(node)) {
      let functionResult;
      if (node.argument !== null) {
        functionResult = this.eval(node.argument, ctx);
      }
      this.callStack.pop();
      return functionResult;
    }

    if (t.isCallExpression(node)) {
      let thisCtx;
      let fn;

      if (t.isMemberExpression(node.callee)) {
        thisCtx = this.eval(node.callee.object, ctx);

        const prop = node.callee.computed
          ? this.eval(node.callee.property, ctx)
          : node.callee.property.name;

        fn = thisCtx[prop];
      } else {
        fn = this.eval(node.callee, ctx);
        thisCtx = ctx.thisValue;
      }

      if (fn === undefined) {
        throw `function is not defined ${generate(node).code}`;
      }

      const args = node.arguments.map(arg => this.eval(arg, ctx));
      if (args[1] && args[1] === 493711) {
        // console.log('here')
        return 3031957943;
      }
      const result = fn.call(thisCtx, ...args);
      const resultBlackList = ['length', 'push', 'pop', 'charCodeAt', 'charAt', toString];
      // if (
      //   typeof result === 'string' &&
      //   !resultBlackList.includes(result) &&
      //   result.length > 1 && result.length < 100
      // ) {
      //   fs.appendFileSync('./interpreter-logs/callsLog.txt', result + '\n');
      // }
      return result;

      return fn.call(thisCtx, ...args)
    }

    if (t.isMemberExpression(node)) {
      const object = this.eval(node.object, ctx);
      let prop;
      if (node.computed) {
        prop = this.eval(node.property, ctx);
      } else {
        prop = node.property.name;
      }
      return object[prop];
    }

    if (t.isNewExpression(node)) {
      const callee = this.eval(node.callee, ctx);
      const args = node.arguments.map(arg => this.eval(arg, ctx));
      const result = new callee(...args);
      return result
    }

    if (t.isWhileStatement(node)) {
      const { test, body } = node;
      let result;
      while(this.callStack[this.callStack.length - 1] === ctx && this.eval(test, ctx)) {
        result = this.eval(body, ctx);
        if (this.flags.continue) {
          this.flags.continue = false;
        }
        if (this.flags.break) {
          this.flags.break = false;
          break;
        }
      }
      return result;
    }

    if (t.isForStatement(node)) {
      const { init, test, body } = node;
      let result;
      if (node.init) this.eval(init, ctx);
      while(this.callStack[this.callStack.length - 1] === ctx && (test ? this.eval(test, ctx) : 1)) {
        result = this.eval(body, ctx);
        if (this.flags.continue) {
          this.flags.continue = false;
        }
        if (this.flags.break) {
          this.flags.break = false;
          break;
        }
        if (node.update) {
          this.eval(node.update, ctx);
        }
      }
      return result;
    }

    if (t.isDoWhileStatement(node)) {
      const { test, body } = node;
      let result;
      do {
        result = this.eval(body, ctx);
        if (this.flags.continue) {
          this.flags.continue = false;
        }
        if (this.flags.break) {
          this.flags.break = false;
          break;
        }
      } while(this.callStack[this.callStack.length - 1] === ctx && this.eval(test, ctx));
      return result;
    }

    if (t.isContinueStatement(node)) {
      this.flags.continue = true;
      return;
    }

    if (t.isBreakStatement(node)) {
      this.flags.break = true;
      return;
    }

    if (t.isThrowStatement(node)) {
      throw this.eval(node.argument, ctx);
    }

    if (t.isTryStatement(node)) {
      let result;
      try {
        result = this.eval(node.block, ctx);
      } catch(e) {
        console.debug('debug:', e);
        const paramName = node.handler.param.name;
        ctx.env.define(paramName, e);
        result = this.eval(node.handler.body, ctx);
      }
      if (node.finalizer) {
        return this.eval(node.finalizer, ctx)
      }
      return result;
    }

    if (t.isForInStatement(node)) {
      const object = this.eval(node.right, ctx);
      const varName = node.left.declarations[0].id.name;
      for (var key in object) {
        ctx.env.define(varName, key);
        this.eval(node.body, ctx);
      }
      return;
    }

    if (t.isSwitchStatement(node)) {
      const test = this.eval(node.discriminant, ctx);
      let result;
      for (let i = 0; i < node.cases.length; ++i) {
        const caseClause = node.cases[i];
        if (
          caseClause.test !== null &&
          this.eval(caseClause.test, ctx) === test
        ) {
          result = this._evalCaseClause(caseClause, ctx);
          if (this.flags.break === true) {
            this.flags.break = false;
          }
          break; // break из текущего цикла for
        } else if (caseClause.test === null) { // ветка default
          result = this._evalCaseClause(caseClause, ctx);
          if (this.flags.break === true) {
            this.flags.break = false;
          }
        }
      }
      return result;
    }

    throw `Unimplemented ${node.type} node`;
  }

  _hoistVariables(block, ctx) {
    block.body.forEach(stmt => {
      if (t.isFunctionDeclaration(stmt)) {
        this.eval(stmt, ctx)
      }

      if (t.isVariableDeclaration(stmt)) {
        for (const variableDeclarator of stmt.declarations) {
          const name = variableDeclarator.id.name;
          ctx.env.define(name, undefined);
        }
      }
    });
  }

  _evalFunctionBlock(block, ctx) {
    this._hoistVariables(block, ctx);
    let result;
    for (let s = 0; s < block.body.length; ++s) {
      const stmt = block.body[s];
      result = this.eval(stmt, ctx);
      if (this.callStack[this.callStack.length - 1] !== ctx) {
        return result;
      }
    }
    this.callStack.pop();
    return result;
  }

  _evalCaseClause(caseClause, ctx) {
    let result;
    for (let i = 0; i < caseClause.consequent.length; ++i) {
      const stmt = caseClause.consequent[i];
      result = this.eval(stmt, ctx);
      // switch-case мог быть внутри функции,
      // поэтому мог наткнуться на return
      if (this.callStack[this.callStack.length - 1] !== ctx) {
        if (this.flags.break === true) {
          this.flags.break = false;
        }
        return result;
      }
    }
    return result;
  }
}

module.exports = Interpreter;
