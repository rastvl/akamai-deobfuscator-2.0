const { parse } = require('@babel/parser');
const fs = require('fs');
const Interpreter = require('./libs/Interpreter');
const Deobfuscator = require('./libs/Deobfuscator');

const srcCode = fs.readFileSync('./input/src.js', { encoding: 'utf-8' });

const ast = parse(srcCode);

function deobfucateCode(ctx) {
  const { env } = ctx;
  const deobfuscator = new Deobfuscator(ast, env);
  deobfuscator.deobfuscate();
  const code = deobfuscator.getCode();
  if (!fs.existsSync('./output/')) {
    fs.mkdirSync('./output/');
  }
  fs.writeFileSync('./output/deobfuscated.js', code);
}

const interval = setInterval(() => {
  console.log('cheking...');
  if (global.interpreterState) {
    clearInterval(interval);
    deobfucateCode(global.interpreterState)
  }
}, 3000);

console.log('go');
console.log(new Interpreter(srcCode).eval(ast.program))