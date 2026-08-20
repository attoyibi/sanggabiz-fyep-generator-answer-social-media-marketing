/** Skrip pemeriksaan: membuat DOCX di Node untuk memastikan tata letaknya benar. */
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

const { exportDocx } = await import("../src/lib/export/docx.ts");
const kode = kodeNilai(task, selections);
await exportDocx(blocks, task.submission.fileName(nama), kode);
console.log("kode nilai:", kode);

const buf = Buffer.from(await captured[0].arrayBuffer());
const out = process.argv[6] ?? "/tmp/out.docx";
writeFileSync(out, buf);
console.log(`ditulis ${out} (${buf.length} byte)`);

// downloadBlob() memasang timer 60 detik untuk melepas object URL. Di browser itu
// tidak masalah, tetapi di Node timer tersebut menahan proses tetap hidup.
process.exit(0);
