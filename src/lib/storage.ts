"use client";

import type { Grade } from "@/tasks/types";

const KEY = "tpg:v1";

export interface PesertaState {
  nama: string;
  seed: number;
  /** taskId -> groupId -> grade */
  selections: Record<string, Record<string, Grade>>;
  updatedAt: string;
}

export const EMPTY_STATE: PesertaState = {
  nama: "",
  seed: 0,
  selections: {},
  updatedAt: "",
};

export function loadState(): PesertaState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<PesertaState>;
    if (typeof parsed.nama !== "string" || typeof parsed.seed !== "number") return EMPTY_STATE;
    return {
      nama: parsed.nama,
      seed: parsed.seed,
      selections: parsed.selections ?? {},
      updatedAt: parsed.updatedAt ?? "",
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function saveState(state: PesertaState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ ...state, updatedAt: new Date().toISOString() })
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
