const path = require('path')
const { version } = require(path.resolve(__dirname, '../package.json'))
const fs = require('fs-extra')
const { getComponents, nameToCamel } = require('./utils')
const { tconModules } = require('../doc.config')

const components = getComponents()
const es = path.resolve(__dirname, '../es')
const jsPath = path.join(es, 'index.js')
const lessPath = path.join(es, 'index.less')

const js = `import Vant from 'vant/es/index.js'
${components.map(({ name }) => `import ${nameToCamel(name)} from './${name}'`).join('\n')}

const componentArr = [${components.map(({ name }) => `${nameToCamel(name)}`).join(', ')}]

export default {
  version: '${version}',
  install: function (app, options) {
    app.use(Vant)
    componentArr.forEach(com => {
      app.component(com.name, com)
    })
  }
}
`

const css = components.map(({ name, style, style2 }) => {
  if (fs.pathExistsSync(style)) {
    return `@import "../src/${name}/index.less";`
  } else if (fs.pathExistsSync(style2)) {
    return `@import "../es/${name}/index.css";`
  }
}).filter(Boolean)

// 注入依赖
Array.prototype.unshift.apply(
  css,
  [
    '@import "~vant/lib/index.less";',
    '@import "../src/style/index.less";'
  ].concat(tconModules.map(x => `@import "~tcon/dist/${x}.css";`))
)

fs.outputFileSync(jsPath, js)
fs.outputFileSync(lessPath, css.join('\n'))
console.log('生成入口文件')