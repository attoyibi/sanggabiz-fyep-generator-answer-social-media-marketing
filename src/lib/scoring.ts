import type { Grade, PilihanInput, TaskDefinition } from "@/tasks/types";
import { allGroups, asPilihan } from "./resolve";

/**
 * Kode program yang dicetak di dokumen. Sama untuk semua tugas.
 * Ubah di sini bila nama programnya berganti.
 */
export const KODE_PROGRAM = "fyep";

/** Bobot nilai tiap tingkat kualitas jawaban, dalam skala 0-100. */
const BOBOT: Record<Grade, number> = {
  tepat: 100,
  sebagian: 50,
  kurang: 0,
};

/**
 * Nilai akhir peserta, 0-100, dibulatkan ke bilangan bulat.
 * Bagian yang belum dijawab dihitung nol.
 */
export function hitungNilai(
  task: TaskDefinition,
  selections: Record<string, PilihanInput>
): number {
  // Grup tanpa penilaian tidak ikut dihitung: semua pilihannya sama-sama benar,
  // jadi memasukkannya hanya akan menggeser nilai tanpa alasan.
  const groups = allGroups(task).filter((g) => !g.ungraded);
  if (groups.length === 0) return 0;
  let total = 0;
  for (const g of groups) {
    const pilihan = asPilihan(selections[g.id]);
    total += pilihan ? BOBOT[pilihan.grade] : 0;
  }
  return Math.round(total / groups.length);
}

/**
 * Kode penilaian yang dicantumkan kecil di kaki dokumen, mis. "fyep-90".
 * Dibaca oleh pemeriksa; tidak ditampilkan di layar peserta.
 */
export function kodeNilai(
  task: TaskDefinition,
  selections: Record<string, PilihanInput>
): string {
  const program = task.programCode ?? KODE_PROGRAM;
  return `${program}-${hitungNilai(task, selections)}`;
}
