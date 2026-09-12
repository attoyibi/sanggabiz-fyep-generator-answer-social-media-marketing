"use client";

import type { CapstoneMode, Grade, Pilihan } from "@/tasks/types";

const KEY = "tpg:v1";

/**
 * Bentuk data yang disimpan di localStorage.
 *
 * Seed sengaja TIDAK ikut disimpan. Seed dibuat ulang setiap kali halaman
 * dimuat, sehingga grup yang BELUM dijawab selalu menampilkan varian baru dan
 * dua orang yang membuka halaman ini mendapat isi jawaban yang berbeda.
 *
 * Yang bertahan adalah nama dan pilihan peserta. Sejak pilihan menyimpan
 * `variantId`, grup yang SUDAH dijawab terkunci pada varian yang benar-benar
 * dilihat peserta, jadi isinya tidak ikut berganti saat halaman dimuat ulang.
 */
export interface PesertaTersimpan {
  nama: string;
  /** taskId -> groupId -> pilihan (grade + varian yang dikunci) */
  selections: Record<string, Record<string, Pilihan>>;
  /** taskId -> jalur capstone yang dipilih peserta. */
  modes: Record<string, CapstoneMode>;
  /** taskId -> id isian formulir -> nilai yang diketik peserta. */
  forms: Record<string, Record<string, string>>;
  updatedAt: string;
}

/** Data tersimpan ditambah seed yang hanya hidup selama halaman terbuka. */
export interface PesertaState extends PesertaTersimpan {
  seed: number;
}

export const EMPTY_TERSIMPAN: PesertaTersimpan = {
  nama: "",
  selections: {},
  modes: {},
  forms: {},
  updatedAt: "",
};

const GRADE_SAH: Grade[] = ["tepat", "sebagian", "kurang"];
const MODE_SAH: CapstoneMode[] = ["mitra", "sendiri"];

/** Peta taskId -> jalur capstone, mengabaikan nilai yang tidak dikenal. */
function bacaModes(raw: unknown): Record<string, CapstoneMode> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, CapstoneMode> = {};
  for (const [taskId, nilai] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof nilai === "string" && MODE_SAH.includes(nilai as CapstoneMode)) {
      out[taskId] = nilai as CapstoneMode;
    }
  }
  return out;
}

/** Peta taskId -> isian formulir, hanya menerima pasangan teks. */
function bacaForms(raw: unknown): Record<string, Record<string, string>> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, Record<string, string>> = {};
  for (const [taskId, isian] of Object.entries(raw as Record<string, unknown>)) {
    if (!isian || typeof isian !== "object") continue;
    const perIsian: Record<string, string> = {};
    for (const [fieldId, nilai] of Object.entries(isian as Record<string, unknown>)) {
      if (typeof nilai === "string") perIsian[fieldId] = nilai;
    }
    if (Object.keys(perIsian).length > 0) out[taskId] = perIsian;
  }
  return out;
}

/**
 * Data versi lama menyimpan pilihan sebagai grade polos ("tepat"), tanpa
 * varian terkunci. Bentuk itu tetap dibaca dan diubah menjadi objek Pilihan,
 * supaya peserta yang sudah mengerjakan tidak kehilangan progresnya.
 */
function bacaSelections(raw: unknown): Record<string, Record<string, Pilihan>> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, Record<string, Pilihan>> = {};
  for (const [taskId, grup] of Object.entries(raw as Record<string, unknown>)) {
    if (!grup || typeof grup !== "object") continue;
    const perGrup: Record<string, Pilihan> = {};
    for (const [groupId, nilai] of Object.entries(grup as Record<string, unknown>)) {
      if (typeof nilai === "string") {
        if (GRADE_SAH.includes(nilai as Grade)) perGrup[groupId] = { grade: nilai as Grade };
        continue;
      }
      if (nilai && typeof nilai === "object") {
        const { grade, variantId } = nilai as Partial<Pilihan>;
        if (typeof grade === "string" && GRADE_SAH.includes(grade)) {
          perGrup[groupId] =
            typeof variantId === "string" ? { grade, variantId } : { grade };
        }
      }
    }
    if (Object.keys(perGrup).length > 0) out[taskId] = perGrup;
  }
  return out;
}

export function loadState(): PesertaTersimpan {
  if (typeof window === "undefined") return EMPTY_TERSIMPAN;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_TERSIMPAN;
    const parsed = JSON.parse(raw) as Partial<PesertaTersimpan>;
    if (typeof parsed.nama !== "string") return EMPTY_TERSIMPAN;
    return {
      nama: parsed.nama,
      selections: bacaSelections(parsed.selections),
      modes: bacaModes(parsed.modes),
      forms: bacaForms(parsed.forms),
      updatedAt: parsed.updatedAt ?? "",
    };
  } catch {
    return EMPTY_TERSIMPAN;
  }
}

export function saveState(state: PesertaState): void {
  if (typeof window === "undefined") return;
  try {
    const { nama, selections, modes, forms } = state;
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ nama, selections, modes, forms, updatedAt: new Date().toISOString() })
    );
  } catch {
    /* localStorage penuh atau diblokir: jawaban tetap jalan untuk sesi ini */
  }
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* abaikan */
  }
}
