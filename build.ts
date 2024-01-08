/// <reference types="bun-types" />

import { buildSync } from 'esbuild'
import pkg from './package.json' assert { type: 'json' }
import * as path from 'node:path'
import * as fs from 'node:fs'
import * as url from 'node:url'

const dirname = path.dirname(url.fileURLToPath(import.meta.url))
const dist = path.join(dirname, 'dist')
if (fs.existsSync(dist)) {
  console.log(`🧹 Cleaning dist folder...`)
  fs.rmSync(dist, { recursive: true, force: true })
}

buildSync({
  entryPoints: ['src/index.ts', 'src/jsx/runtime.ts'],
  format: 'esm',
  outdir: 'dist',
  bundle: true,
  splitting: true,
  platform: 'browser',
  external: Object.keys(pkg.dependencies),
})

console.log('✅ Build done!')
