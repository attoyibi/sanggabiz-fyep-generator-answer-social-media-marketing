/**
 * Skrip pemeriksaan: memastikan kotak teks pada desain TPM 4 tetap berada di
 * dalam safe zone yang dipilih peserta.
 *
 * Pola tata letak dari jawaban tingkat "kurang" memang sengaja melanggar batas
 * aman — pelanggaran yang muncul untuk pola itu adalah hasil yang diharapkan.
 */
import { buildContext, allGroups } from "../src/lib/resolve.ts";
import { getTask } from "../src/tasks/registry.ts";
import type { Grade } from "../src/tasks/types.ts";

function rantai(id: string, nama: string, seed: number, mode: Grade) {
  const t = getTask(id)!;
  const sel: Record<string, Grade> = {};
  for (const g of allGroups(t)) sel[g.id] = mode;
  const src = t.dependsOn ? rantai(t.dependsOn, nama, seed, mode) : undefined;
  return buildContext(t, nama, seed, sel, src);
}

const task = getTask("tpm-4")!;
const modes: Grade[] = ["tepat", "sebagian", "kurang"];
const pelanggaran = new Map<string, number>();
let lembarDiperiksa = 0;

for (const mode of modes) {
  for (let seed = 1; seed <= 400; seed++) {
    const ctx = rantai("tpm-4", "Putri Amalia", seed, mode);
    const pola = ctx.answers["layout"]?.variant.fields?.pola ?? "?";
    for (const d of task.buildDesigns!(ctx)) {
      lembarDiperiksa++;
      const z = d.safeZone!;
      for (const l of d.layers) {
        if (l.type !== "text") continue;
        const kiri = l.x < z.left;
        const kanan = l.x + l.w > d.width - z.right;
        const atas = l.y < z.top;
        if (kiri || kanan || atas) {
          const kunci = `${mode}/${pola}${kiri ? " kiri" : ""}${kanan ? " kanan" : ""}${atas ? " atas" : ""}`;
          pelanggaran.set(kunci, (pelanggaran.get(kunci) ?? 0) + 1);
        }
      }
    }
  }
}

console.log(`lembar diperiksa: ${lembarDiperiksa}`);
if (pelanggaran.size === 0) console.log("semua kotak teks berada di dalam safe zone");
for (const [k, n] of [...pelanggaran].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${n}`);
process.exit(0);
