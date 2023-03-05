# akamai-deobfuscator-2.0
Akamai Bot Manager 2.0 dynamic script deobfuscator.
The repository was created for [this article](https://habr.com).
```
git clone
npm install
```
Put the akamai script in `./input/src.js`
Start the server 
```
node ./utils/server.js
```
Run index.js 
```
node ./index.js
```
Check result in `./output/deobfuscated.js`
This script simply replaces strings, so use https://deobfuscate.io/ to replace proxy functions.

This repos