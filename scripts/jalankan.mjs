/**
 * Menjalankan skrip pemeriksaan di folder scripts/.
 * Dipakai lewat: npm run cek -- <nama-skrip> [argumen...]
 * Contoh: npm run cek -- cek-variasi 500
 */
import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [nama, ...args] = process.argv.slice(2);
if (!nama) {
  console.error("Pakai: npm run cek -- <cek-variasi|render-pdf|render-docx> [argumen...]");
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "tpg-"));
const out = join(dir, "bundle.mjs");
try {
  await build({
    entryPoints: [`scripts/${nama}.mts`],
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    external: ["jspdf", "docx"],
    outfile: out,
    logLevel: "error",
  });
  const res = spawnSync(process.execPath, [out, ...args], { stdio: "inherit" });
  process.exit(res.status ?? 0);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
