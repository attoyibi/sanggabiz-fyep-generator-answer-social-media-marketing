/** Memeriksa perhitungan kode nilai untuk berbagai kombinasi jawaban. */
import { allGroups } from "../src/lib/resolve";
import { getTask } from "../src/tasks/registry";
import { hitungNilai, kodeNilai } from "../src/lib/scoring";
import type { Grade } from "../src/tasks/types";

const task = getTask("tpm-1")!;
const groups = allGroups(task);
const n = groups.length;

function buat(tepat: number, sebagian: number): Record<string, Grade> {
  const sel: Record<string, Grade> = {};
  groups.forEach((g, i) => {
    sel[g.id] = i < tepat ? "tepat" : i < tepat + sebagian ? "sebagian" : "kurang";
  });
  return sel;
}

console.log(`Jumlah pertanyaan: ${n}\n`);
console.log("tepat sebagian kurang -> nilai   kode");
const kasus: [number, number][] = [
  [n, 0], [n - 1, 1], [n - 1, 0], [n - 2, 2], [n - 2, 1], [n - 2, 0],
  [n - 3, 3], [n - 4, 4], [Math.floor(n / 2), 0], [0, n], [0, 0],
];
for (const [t, s] of kasus) {
  const sel = buat(t, s);
  const k = n - t - s;
  console.log(
    `${String(t).padStart(5)} ${String(s).padStart(9)} ${String(k).padStart(6)} -> ${String(hitungNilai(task, sel)).padStart(5)}   ${kodeNilai(task, sel)}`
  );
}

// jawaban kosong sebagian
const sebagianKosong: Record<string, Grade> = {};
groups.slice(0, 4).forEach((g) => (sebagianKosong[g.id] = "tepat"));
console.log(`\n4 tepat + 4 belum dijawab -> ${kodeNilai(task, sebagianKosong)}`);
