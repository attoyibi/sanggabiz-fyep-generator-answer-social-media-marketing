import type { TaskDefinition } from "./types";
import tpm1 from "./tpm-1";
import tpm2 from "./tpm-2";
import tpm3 from "./tpm-3";

/**
 * ====================================================================
 * CARA MENAMBAH TUGAS BARU (Tugas 2, 3, ... 8)
 * ====================================================================
 * 1. Salin folder src/tasks/tpm-1 menjadi src/tasks/tpm-2.
 * 2. Ubah isi bank.ts (bank jawaban) dan index.ts (studi kasus, instruksi,
 *    langkah, dan buildDocument) sesuai PDF tugas yang baru.
 * 3. Import di bawah, lalu masukkan ke array TASKS. Selesai.
 *    Navbar, penyimpanan localStorage, preview, dan export PDF/DOCX
 *    otomatis mengikuti tanpa perlu diubah.
 */
export const TASKS: TaskDefinition[] = [tpm1, tpm2, tpm3];

/** Jumlah slot yang ditampilkan di navbar, termasuk tugas yang belum tersedia. */
export const TOTAL_SLOT_TUGAS = 8;

/** Daftar untuk navbar: tugas terdaftar + placeholder "segera hadir". */
export interface NavItem {
  id: string;
  label: string;
  available: boolean;
}

export function getNavItems(): NavItem[] {
  const items: NavItem[] = TASKS.map((t) => ({
    id: t.id,
    label: t.navLabel,
    available: t.available,
  }));
  for (let i = items.length; i < TOTAL_SLOT_TUGAS; i++) {
    items.push({ id: `slot-${i + 1}`, label: `Tugas ${i + 1}`, available: false });
  }
  return items;
}

export function getTask(id: string): TaskDefinition | undefined {
  return TASKS.find((t) => t.id === id);
}

export const DEFAULT_TASK_ID = TASKS[0].id;
