/** Skrip pemeriksaan: membuat DOCX di Node untuk memastikan tata letaknya benar. */
import { writeFileSync } from "node:fs";
import { buildContext, allGroups } from "../src/lib/resolve.ts";
import { getTask } from "../src/tasks/registry.ts";
import { kodeNilai } from "../src/lib/scoring.ts";
import type { Grade } from "../src/tasks/types.ts";

const captured: Blob[] = [];
// @ts-expect-error stub Node
globalThis.document = {
  createElement: () => ({ click() {}, href: "", download: "" }),
  body: { appendChild() {}, removeChild() {} },
};
const origCreate = URL.createObjectURL;
URL.createObjectURL = (b: Blob) => {
  captured.push(b);
  return "blob:test";
};
URL.revokeObjectURL = () => {};
void origCreate;

const seed = Number(process.argv[2] ?? 12345);
const nama = process.argv[3] ?? "Putri Amalia";
const mode = (process.argv[4] ?? "tepat") as Grade;

const task = getTask("tpm-1")!;
const selections: Record<string, Grade> = {};
for (const g of allGroups(task)) selections[g.id] = mode;

const ctx = buildContext(task, nama, seed, selections);
const blocks = task.buildDocument(ctx);

const { exportDocx } = await import("../src/lib/export/docx.ts");
const kode = kodeNilai(task, selections);
await exportDocx(blocks, task.submission.fileName(nama), kode);
console.log("kode nilai:", kode);

const buf = Buffer.from(await captured[0].arrayBuffer());
const out = process.argv[5] ?? "/tmp/out.docx";
writeFileSync(out, buf);
console.log(`ditulis ${out} (${buf.length} byte)`);
