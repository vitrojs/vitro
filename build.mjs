import { buildSync } from 'esbuild'
import { printDone, rmDist } from '../../scripts/build-utils.mjs'

rmDist(import.meta.url)

buildSync({
  entryPoints: ['src/index.ts', 'src/jsx/runtime.ts'],
  format: 'esm',
  outdir: 'dist',
  bundle: true,
  splitting: true,
  platform: 'browser',
  external: ['oby', 'htm'],
})

printDone()



import * as path from 'node:path'
import * as fs from 'node:fs'
import * as url from 'node:url'

export function rmDist(importUrl) {
  const dirname = path.dirname(url.fileURLToPath(importUrl))
  const dist = path.join(dirname, 'dist')
  if (fs.existsSync(dist)) {
    console.log(`Cleaning dist folder...`)
    fs.rmSync(dist, { recursive: true, force: true })
  }
}

export function printDone() {
  console.log('✅ Build done!')
}
