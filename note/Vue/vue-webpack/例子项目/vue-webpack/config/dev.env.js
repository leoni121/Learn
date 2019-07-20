// 当开发时调取dev.env.js的开发环境配置
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

/*console.log(merge(prodEnv, {
  NODE_ENV: '"development"'
}));*/
// 输出之后是  { NODE_EVN: '"development"' }
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
