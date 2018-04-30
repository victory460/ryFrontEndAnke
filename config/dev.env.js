'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"//aaa04156.ngrok.io"',
  WX_APP_ID: '"wx0cd9d70636c0e3bd"',
  API_ROOT: '"//localhost:8080"'
})
