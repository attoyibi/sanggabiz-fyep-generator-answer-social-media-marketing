"use client";

import type { Grade, Pilihan } from "@/tasks/types";

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
  updatedAt: string;
}

/** Data tersimpan ditambah seed yang hanya hidup selama halaman terbuka. */
export interface PesertaState extends PesertaTersimpan {
  seed: number;
}

export const EMPTY_TERSIMPAN: PesertaTersimpan = {
  nama: "",
  selections: {},
  updatedAt: "",
};

const GRADE_SAH: Grade[] = ["tepat", "sebagian", "kurang"];

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
      updatedAt: parsed.updatedAt ?? "",
    };
  } catch {
    return EMPTY_TERSIMPAN;
  }
}

export function saveState(state: PesertaState): void {
  if (typeof window === "undefined") return;
  try {
    const { nama, selections } = state;
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ nama, selections, updatedAt: new Date().toISOString() })
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
