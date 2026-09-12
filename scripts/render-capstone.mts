/**
 * Skrip pemeriksaan capstone: membuat kedua berkas yang diminta dokumen
 * Capstone — A3 Summary Report satu halaman dan deck .pptx — lalu menuliskannya
 * ke berkas supaya ukuran halaman dan jumlah slidenya bisa diperiksa langsung.
 *
 * Pakai: npm run cek -- render-capstone [seed] [nama] [mode] [folder]
 * mode: "mitra" atau "sendiri".
 */
import { writeFileSync } from "node:fs";
import { buildContext, allGroups } from "../src/lib/resolve.ts";
import { getTask } from "../src/tasks/registry.ts";
import { kodeNilai } from "../src/lib/scoring.ts";
import { nilaiFormulir } from "../src/lib/capstone.ts";
import type { CapstoneMode, Grade } from "../src/tasks/types.ts";

const captured: Blob[] = [];
// Stub DOM seadanya supaya downloadBlob() bisa jalan di Node, sama seperti
// skrip render lainnya di folder ini.
// @ts-expect-error stub Node
globalThis.document = {
  createElement: () => ({ click() {}, remove() {}, style: {}, href: "", download: "", rel: "" }),
  body: { appendChild() {}, removeChild() {} },
};
// @ts-expect-error stub Node
globalThis.window = globalThis;
// downloadBlob() memeriksa navigator.msSaveOrOpenBlob lebih dulu; Node 20 belum
// menyediakan navigator, jadi disiapkan sebagai objek kosong.
if (typeof globalThis.navigator === "undefined") {
  // @ts-expect-error stub Node
  globalThis.navigator = {};
}
URL.createObjectURL = (b: Blob) => {
  captured.push(b);
  return "blob:test";
};
URL.revokeObjectURL = () => {};

const seed = Number(process.argv[2] ?? 12345);
const nama = process.argv[3] ?? "Putri Amalia";
const mode = (process.argv[4] ?? "mitra") as CapstoneMode;
const folder = process.argv[5] ?? "/tmp";

const task = getTask("capstone")!;

/** Jalur mitra dijawab seluruhnya dengan grade "tepat". */
const selections: Record<string, Grade> = {};
for (const g of allGroups(task)) selections[g.id] = "tepat";

/** Jalur sendiri diisi memakai contoh bawaan tiap kolom. */
const form: Record<string, string> = {};
for (const bagian of task.capstone!.form) {
  for (const isian of bagian.fields) form[isian.id] = isian.contoh;
}

const ctx = buildContext(task, nama, seed, mode === "mitra" ? selections : {}, undefined, {
  mode,
  form: mode === "sendiri" ? form : {},
});

const kode =
  mode === "sendiri" ? `fyep-${nilaiFormulir(task, form)}` : kodeNilai(task, selections);
const namaBerkas = task.submission.fileName(nama);

/* ---------- A3 Summary Report ---------- */
const { exportPdf } = await import("../src/lib/export/pdf.ts");
await exportPdf(task.buildDocument(ctx), namaBerkas, kode, task.orientation, task.pageSize);
const pdf = Buffer.from(await captured[0].arrayBuffer());
writeFileSync(`${folder}/capstone-${mode}.pdf`, pdf);

/* ---------- Deck PPT ---------- */
const slides = task.buildSlides!(ctx);
const { exportPptx } = await import("../src/lib/export/pptx.ts");
await exportPptx(slides, namaBerkas, kode);
const pptx = Buffer.from(await captured[1].arrayBuffer());
writeFileSync(`${folder}/capstone-${mode}.pptx`, pptx);

console.log(`jalur       : ${mode}`);
console.log(`kode nilai  : ${kode}`);
console.log(`A3 one pager: ${folder}/capstone-${mode}.pdf (${pdf.length} byte)`);
console.log(`deck ppt    : ${folder}/capstone-${mode}.pptx (${pptx.length} byte, ${slides.length} slide)`);
for (const [i, s] of slides.entries()) console.log(`  slide ${i + 1}: ${s.title}`);

// downloadBlob() memasang timer pelepas object URL yang menahan proses Node.
process.exit(0);
