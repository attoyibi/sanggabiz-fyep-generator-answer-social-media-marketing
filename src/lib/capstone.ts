import type { CapstoneField, TaskDefinition } from "@/tasks/types";

/**
 * Perhitungan untuk jalur "UMKM sendiri".
 *
 * Di jalur mitra, kelengkapan dan nilai datang dari kartu pilihan seperti tugas
 * lain. Di jalur ini peserta membawa data usahanya sendiri, jadi tidak ada
 * jawaban benar yang bisa dibandingkan: yang dinilai adalah kelengkapan isian
 * wajib, sesuai daftar bagian yang diminta dokumen capstone.
 */

/** Semua isian wajib pada formulir sebuah tugas capstone. */
export function isianWajib(task: TaskDefinition): CapstoneField[] {
  if (!task.capstone) return [];
  return task.capstone.form.flatMap((s) => s.fields).filter((f) => f.wajib);
}

/** Sebuah isian dianggap terisi bila ada teks di dalamnya. */
export function terisi(nilai: string | undefined): boolean {
  return Boolean(nilai && nilai.trim().length > 0);
}

export function progresFormulir(
  task: TaskDefinition,
  form: Record<string, string>
): { terisi: number; total: number; belum: number } {
  const wajib = isianWajib(task);
  const sudah = wajib.filter((f) => terisi(form[f.id])).length;
  return { terisi: sudah, total: wajib.length, belum: wajib.length - sudah };
}

/** Nilai 0-100 dari kelengkapan isian wajib. */
export function nilaiFormulir(task: TaskDefinition, form: Record<string, string>): number {
  const { terisi: sudah, total } = progresFormulir(task, form);
  if (total === 0) return 0;
  return Math.round((sudah / total) * 100);
}
