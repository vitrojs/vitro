/// <reference types="bun-types" />

import { buildSync } from 'esbuild'
import * as fs from 'node:fs'
import * as path from 'node:path'
import pkg from './package.json' assert { type: 'json' }

const isProduction = Bun.env.NODE_ENV === 'production'

const dist = path.join(import.meta.dir, 'dist')
if (fs.existsSync(dist)) {
  if (isProduction) process.exit(0)

  console.log(`🧹 Cleaning dist folder...`)
  fs.rmSync(dist, { recursive: true, force: true })
}

buildSync({
  entryPoints: ['src/index.ts', 'src/jsx/runtime.ts'],
  format: 'esm',
  outdir: 'dist',
  bundle: true,
  tsconfig: path.join(import.meta.dir, 'tsconfig.json'),
  splitting: true,
  platform: 'browser',
  external: Object.keys(pkg.dependencies),
})

console.log('✅ Build done!')
