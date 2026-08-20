"use client";

import type { Grade } from "@/tasks/types";

const KEY = "tpg:v1";

/**
 * Bentuk data yang disimpan di localStorage.
 *
 * Seed sengaja TIDAK ikut disimpan. Seed dibuat ulang setiap kali halaman
 * dimuat supaya isi jawaban tiap peserta selalu berbeda. Yang bertahan hanya
 * nama dan pilihan peserta, sehingga progres tidak hilang saat halaman dimuat ulang.
 */
export interface PesertaTersimpan {
  nama: string;
  /** taskId -> groupId -> grade */
  selections: Record<string, Record<string, Grade>>;
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

export function loadState(): PesertaTersimpan {
  if (typeof window === "undefined") return EMPTY_TERSIMPAN;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_TERSIMPAN;
    const parsed = JSON.parse(raw) as Partial<PesertaTersimpan>;
    if (typeof parsed.nama !== "string") return EMPTY_TERSIMPAN;
    return {
      nama: parsed.nama,
      selections: parsed.selections ?? {},
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
