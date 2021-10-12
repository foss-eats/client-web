/* eslint-disable */
// hack since next.js isn't willing to support typescript here
// https://github.com/vercel/next.js/issues/5318
let tsconfig = require('./tsconfig.json')
tsconfig.compilerOptions.module = "commonjs"
require('ts-node').register(tsconfig)
module.exports = require('./next.config.ts').default
