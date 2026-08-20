import type {
  BuildContext,
  ChoiceGroup,
  Grade,
  Pilihan,
  PilihanInput,
  ResolvedAnswer,
  TaskDefinition,
  Variant,
} from "@/tasks/types";
import { makePicker, shuffleWithSeed } from "./rng";
import { fillTokens } from "./template";

export const GRADE_ORDER: Grade[] = ["tepat", "sebagian", "kurang"];

/** Menyeragamkan grade polos maupun objek Pilihan menjadi satu bentuk. */
export function asPilihan(value: PilihanInput | undefined): Pilihan | undefined {
  if (!value) return undefined;
  return typeof value === "string" ? { grade: value } : value;
}

/** Semua grup pertanyaan sebuah tugas, berurutan. */
export function allGroups(task: TaskDefinition): ChoiceGroup[] {
  return task.steps.flatMap((s) => s.groups);
}

/**
 * Varian yang tampil untuk sebuah (grup, grade).
 *
 * Bila `variantId` diberikan — artinya peserta sudah mengunci jawaban itu —
 * varian tersebut yang dipakai, sehingga isinya tidak berubah walau halaman
 * dimuat ulang dengan seed baru. Tanpa `variantId`, varian diambil dari seed
 * sehingga tiap kali halaman dibuka isinya berganti.
 */
export function variantFor(
  seed: number,
  taskId: string,
  group: ChoiceGroup,
  grade: Grade,
  variantId?: string
): Variant | undefined {
  const option = group.options.find((o) => o.grade === grade);
  if (!option || option.variants.length === 0) return undefined;
  if (variantId) {
    const terkunci = option.variants.find((v) => v.id === variantId);
    // Kalau id-nya sudah tidak ada (bank jawaban diperbarui), jatuh kembali ke seed.
    if (terkunci) return terkunci;
  }
  const pick = makePicker(seed);
  return pick(`${taskId}:${group.id}:${grade}`, option.variants);
}

/**
 * Urutan tampil kartu pilihan, diacak per peserta agar posisi jawaban tepat
 * tidak selalu sama.
 *
 * Sengaja hanya bergantung pada seed, tidak pada jawaban yang sudah dipilih.
 * Kalau urutannya ikut berubah begitu peserta mengunci jawaban, kartu-kartunya
 * melompat tepat saat diklik. Yang dikunci cukup ISI kartu terpilih; posisinya
 * boleh berganti saat halaman dimuat ulang.
 */
export function optionOrder(seed: number, taskId: string, group: ChoiceGroup): Grade[] {
  const grades = group.options.map((o) => o.grade);
  return shuffleWithSeed(grades, seed, `order:${taskId}:${group.id}`);
}

/** Bangun konteks lengkap untuk membuat dokumen. */
export function buildContext(
  task: TaskDefinition,
  nama: string,
  seed: number,
  selections: Record<string, PilihanInput>
): BuildContext {
  const answers: Record<string, ResolvedAnswer> = {};
  for (const group of allGroups(task)) {
    const pilihan = asPilihan(selections[group.id]);
    if (!pilihan) continue;
    const variant = variantFor(seed, task.id, group, pilihan.grade, pilihan.variantId);
    if (!variant) continue;
    answers[group.id] = {
      groupId: group.id,
      label: group.label,
      question: group.question,
      grade: pilihan.grade,
      variant,
    };
  }

  const pick = makePicker(seed);
  const base = {
    nama,
    task,
    answers,
    get: (groupId: string) => answers[groupId]?.variant.headline ?? "",
    pick: <T,>(bucket: string, items: T[]) => pick(`${task.id}:doc:${bucket}`, items),
  };

  const tokens = task.tokens ? task.tokens(base) : { nama };
  // Token bisa mengandung token lain, jadi diisi dua putaran.
  const resolvedTokens: Record<string, string> = {};
  for (const [k, v] of Object.entries(tokens)) {
    resolvedTokens[k] = fillTokens(v, tokens);
  }

  return { ...base, fill: (text: string) => fillTokens(text, resolvedTokens) };
}

/** Berapa bagian yang sudah dipilih peserta. */
export function progressOf(
  task: TaskDefinition,
  selections: Record<string, PilihanInput>
): { terisi: number; total: number; belum: number } {
  const groups = allGroups(task);
  const terisi = groups.filter((g) => selections[g.id]).length;
  return { terisi, total: groups.length, belum: groups.length - terisi };
}
