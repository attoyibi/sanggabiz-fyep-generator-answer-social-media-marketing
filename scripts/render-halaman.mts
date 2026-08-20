/**
 * Skrip pemeriksaan: memecah PDF hasil render menjadi satu berkas per halaman.
 *
 * qlmanage di macOS hanya bisa merender halaman pertama sebuah PDF, jadi untuk
 * memeriksa halaman kedua dan seterusnya tiap halaman dipisah lebih dulu.
 * Pakai: npm run cek -- render-halaman <taskId> <seed> "<nama>" <mode> <awalan>
 */
import { writeFileSync } from "node:fs";
import { buildContext, allGroups } from "../src/lib/resolve.ts";
import { getTask } from "../src/tasks/registry.ts";
import { kodeNilai } from "../src/lib/scoring.ts";
import type { Grade } from "../src/tasks/types.ts";

const captured: Blob[] = [];
// Stub DOM seadanya supaya downloadBlob() bisa jalan di Node.
// Harus mengikuti properti yang disentuh src/lib/download.ts.
// @ts-expect-error stub Node
globalThis.document = {
  createElement: () => ({
    click() {},
    remove() {},
    style: {},
    href: "",
    download: "",
    rel: "",
  }),
  body: { appendChild() {}, removeChild() {} },
};
// jspdf memakai "window" sebagai objek globalnya dan menuntut atob/btoa/console,
// jadi window diarahkan ke globalThis Node, bukan diganti objek kosong.
// @ts-expect-error stub Node
globalThis.window = globalThis;
const origCreate = URL.createObjectURL;
URL.createObjectURL = (b: Blob) => {
  captured.push(b);
  return "blob:test";
};
URL.revokeObjectURL = () => {};
void origCreate;

const taskId = process.argv[2] ?? "tpm-1";
const seed = Number(process.argv[3] ?? 12345);
const nama = process.argv[4] ?? "Putri Amalia";
const mode = (process.argv[5] ?? "tepat") as Grade;


/**
 * Konteks lengkap sebuah tugas, termasuk konteks tugas sumber bila tugas itu
 * melanjutkan tugas sebelumnya. Dipakai supaya pemeriksaan menilai isi yang
 * sama dengan yang dilihat peserta.
 */
function konteksRantai(id: string, nama: string, seed: number, mode: Grade) {
  const t = getTask(id)!;
  const sel: Record<string, Grade> = {};
  for (const g of allGroups(t)) sel[g.id] = mode;
  const src = t.dependsOn ? konteksRantai(t.dependsOn, nama, seed, mode) : undefined;
  return buildContext(t, nama, seed, sel, src);
}

const task = getTask(taskId)!;
const selections: Record<string, Grade> = {};
for (const g of allGroups(task)) selections[g.id] = mode;

const ctx = konteksRantai(taskId, nama, seed, mode);
const blocks = task.buildDocument(ctx);

const { exportPdf } = await import("../src/lib/export/pdf.ts");
const jspdf = await import("jspdf");
const out = process.argv[6] ?? "/tmp/halaman";

/** Sebagian kecil API jsPDF yang dipakai skrip ini. */
interface DokumenPdf {
  getNumberOfPages(): number;
  deletePage(halaman: number): void;
  output(jenis: "arraybuffer"): ArrayBuffer;
}

// Menangkap instance jsPDF lewat event "initialized": pdf.ts membuat dokumennya
// sendiri dan tidak mengembalikannya, jadi inilah satu-satunya cara memisah halaman.
let doc: DokumenPdf | null = null;
const pabrik = jspdf.jsPDF as unknown as {
  API: { events: [string, (this: DokumenPdf) => void][] };
};
pabrik.API.events.push([
  "initialized",
  function (this: DokumenPdf) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- jsPDF mengirim dokumennya lewat "this" pada event ini.
    doc = this;
  },
]);

/** Dokumen terakhir yang dibuat; dipanggil setelah exportPdf selesai. */
function dokumen(): DokumenPdf {
  if (!doc) throw new Error("Dokumen jsPDF tidak tertangkap.");
  return doc;
}

// Sekali jalan untuk tahu jumlah halaman.
await exportPdf(blocks, task.submission.fileName(nama), kodeNilai(task, selections));
const total = dokumen().getNumberOfPages();
console.log("jumlah halaman:", total);

for (let p = 1; p <= total; p++) {
  doc = null;
  captured.length = 0;
  await exportPdf(blocks, task.submission.fileName(nama), kodeNilai(task, selections));
  const d = dokumen();
  for (let q = total; q >= 1; q--) if (q !== p) d.deletePage(q);
  const buf = Buffer.from(d.output("arraybuffer"));
  writeFileSync(`${out}-${p}.pdf`, buf);
  console.log(`ditulis ${out}-${p}.pdf (${buf.length} byte)`);
}

process.exit(0);
