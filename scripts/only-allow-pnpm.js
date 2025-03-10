const { execSync } = require('child_process')

if (process.env.npm_execpath.indexOf('pnpm') === -1) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    `\n⚠️  此项目仅支持使用 pnpm 作为包管理工具。\n   请执行: \x1b[1mpnpm install\x1b[0m\n`
  )
  process.exit(1)
}
