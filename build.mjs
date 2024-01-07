import { buildSync } from "esbuild";
import pkg from './package.json' assert {type: 'json'}
import * as path from "node:path";
import * as fs from "node:fs";
import * as url from "node:url";

rmDist(import.meta.url);

buildSync({
  entryPoints: ["src/index.ts"],
  format: "esm",
  outdir: "dist",
  bundle: true,
  splitting: true,
  platform: "browser",
  external: Object.keys(pkg.dependencies),
});

console.log("✅ Build done!");

function rmDist(importUrl) {
  const dirname = path.dirname(url.fileURLToPath(importUrl));
  const dist = path.join(dirname, "dist");
  if (fs.existsSync(dist)) {
    console.log(`Cleaning dist folder...`);
    fs.rmSync(dist, { recursive: true, force: true });
  }
}
