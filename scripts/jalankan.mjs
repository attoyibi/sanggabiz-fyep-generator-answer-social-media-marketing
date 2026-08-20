/**
 * Menjalankan skrip pemeriksaan di folder scripts/.
 * Dipakai lewat: npm run cek -- <nama-skrip> [argumen...]
 * Contoh: npm run cek -- cek-variasi 500
 */
import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";

const [nama, ...args] = process.argv.slice(2);
if (!nama) {
  console.error("Pakai: npm run cek -- <cek-variasi|render-pdf|render-docx> [argumen...]");
  process.exit(1);
}

/**
 * Bundel ditulis di dalam folder proyek, bukan di temp dir sistem.
 * "jspdf" dan "docx" sengaja dibiarkan eksternal, jadi Node harus bisa
 * menemukannya lewat node_modules proyek saat bundel dijalankan.
 * Pola nama berkasnya sudah terdaftar di .gitignore.
 */
const out = join(process.cwd(), `.${nama}.mjs`);
let status = 0;
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
  status = res.status ?? 0;
} finally {
  // Dibersihkan di sini, bukan setelah process.exit(), karena process.exit()
  // melewati blok finally sehingga bundelnya akan tertinggal.
  rmSync(out, { force: true });
}
process.exit(status);
