import { buildSync } from 'esbuild'
import { printDone, rmDist } from '../../scripts/build-utils.mjs'

rmDist()

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
