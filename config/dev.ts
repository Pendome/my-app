const projectName = process.argv[2]
const fs = require('fs')
// 写入
fs.writeFileSync(
  './config/project.js',
  `export default {name:'${projectName}',mode:'${'development'}'};
`
)
const exec = require('child_process').execSync

exec('npm run dev', { stdio: 'inherit' })
export {}
