import type {
  BuildContext,
  ChoiceGroup,
  Grade,
  ResolvedAnswer,
  TaskDefinition,
  Variant,
} from "@/tasks/types";
import { makePicker, shuffleWithSeed } from "./rng";
import { fillTokens } from "./template";

export const GRADE_ORDER: Grade[] = ["tepat", "sebagian", "kurang"];

/** Semua grup pertanyaan sebuah tugas, berurutan. */
export function allGroups(task: TaskDefinition): ChoiceGroup[] {
  return task.steps.flatMap((s) => s.groups);
}

/**
 * Varian yang tampil untuk sebuah (grup, grade) bagi peserta dengan seed tertentu.
 * Deterministik: hasilnya sama setiap kali halaman dibuka.
 */
export function variantFor(
  seed: number,
  taskId: string,
  group: ChoiceGroup,
  grade: Grade
): Variant | undefined {
  const option = group.options.find((o) => o.grade === grade);
  if (!option || option.variants.length === 0) return undefined;
  const pick = makePicker(seed);
  return pick(`${taskId}:${group.id}:${grade}`, option.variants);
}

/** Urutan tampil kartu pilihan, diacak per peserta agar posisi jawaban tepat tidak selalu sama. */
export function optionOrder(seed: number, taskId: string, group: ChoiceGroup): Grade[] {
  const grades = group.options.map((o) => o.grade);
  return shuffleWithSeed(grades, seed, `order:${taskId}:${group.id}`);
}

/** Bangun konteks lengkap untuk membuat dokumen. */
export function buildContext(
  task: TaskDefinition,
  nama: string,
  seed: number,
  selections: Record<string, Grade>
): BuildContext {
  const answers: Record<string, ResolvedAnswer> = {};
  for (const group of allGroups(task)) {
    const grade = selections[group.id];
    if (!grade) continue;
    const variant = variantFor(seed, task.id, group, grade);
    if (!variant) continue;
    answers[group.id] = {
      groupId: group.id,
      label: group.label,
      question: group.question,
      grade,
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
  selections: Record<string, Grade>
): { terisi: number; total: number; belum: number } {
  const groups = allGroups(task);
  const terisi = groups.filter((g) => selections[g.id]).length;
  return { terisi, total: groups.length, belum: groups.length - terisi };
}
