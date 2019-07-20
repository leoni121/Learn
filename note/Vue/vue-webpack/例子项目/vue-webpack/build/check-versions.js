// 该文件用于检测node和npm的版本，实现版本依赖
'use strict'
// 对文案输出的一个彩色设置
const chalk = require('chalk')
// 对版本进行检查
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

// 返回通过child_process模块的新建子进程，执行 Unix 系统命令后转成没有空格的字符串
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    // 使用semver格式化版本
    currentVersion: semver.clean(process.version),
    // 获取package.json中设置的node版本
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    // 自动调用npm --version命令，并且把参数返回给exec函数，从而获取纯净的版本号
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    // 如果版本号不符合package.json文件中指定的版本号，就执行下面错误提示的代码
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
