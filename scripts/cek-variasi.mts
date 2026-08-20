/** Memeriksa bahwa dokumen setiap peserta benar-benar berbeda. */
import { buildContext, allGroups } from "../src/lib/resolve";
import { getTask } from "../src/tasks/registry";
import type { DocBlock, Grade } from "../src/tasks/types";
import { createHash } from "node:crypto";

const task = getTask("tpm-1")!;
const groups = allGroups(task);

function teks(blocks: DocBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "title": return b.text + (b.subtitle ?? "");
        case "meta": return b.rows.map((r) => r.join(":")).join("|");
        case "heading": case "subheading": case "paragraph": return b.text;
        case "quote": return b.text + (b.caption ?? "");
        case "bullets": return b.items.join("|");
        case "table": return b.head.join("|") + b.rows.map((r) => r.join("|")).join("|");
        case "flow": return b.nodes.map((n) => n.label + n.caption).join("|");
        case "mindmap": return b.root + b.branches.map((x) => x.label + x.children.join("|")).join("|");
        default: return "";
      }
    })
    .join("\n");
}

const N = Number(process.argv[2] ?? 500);
const hashes = new Set<string>();
const formats = new Map<string, number>();
const segmen1 = new Map<string, number>();
let minLen = Infinity, maxLen = 0;

for (let i = 0; i < N; i++) {
  const seed = (Math.random() * 0xffffffff) >>> 0;
  const selections: Record<string, Grade> = {};
  for (const g of groups) selections[g.id] = "tepat";
  const ctx = buildContext(task, `Peserta ${i}`, seed, selections);
  const blocks = task.buildDocument(ctx);
  const t = teks(blocks);
  // hilangkan nama peserta supaya yang dibandingkan murni isi jawabannya
  const isi = t.replaceAll(`Peserta ${i}`, "X");
  hashes.add(createHash("sha1").update(isi).digest("hex"));
  minLen = Math.min(minLen, isi.length);
  maxLen = Math.max(maxLen, isi.length);
  const f = ctx.answers["visual"].variant.fields!.format;
  formats.set(f, (formats.get(f) ?? 0) + 1);
  const s1 = ctx.answers["seg1"].variant.headline;
  segmen1.set(s1, (segmen1.get(s1) ?? 0) + 1);
}

console.log(`${N} peserta -> ${hashes.size} dokumen unik (${((hashes.size / N) * 100).toFixed(1)}% unik)`);
console.log("panjang isi:", minLen, "-", maxLen, "karakter");
console.log("sebaran bentuk visual:", JSON.stringify(Object.fromEntries(formats)));
console.log("sebaran segmen 1:");
for (const [k, v] of [...segmen1].sort((a, b) => b[1] - a[1])) console.log(`  ${v.toString().padStart(4)}  ${k}`);
