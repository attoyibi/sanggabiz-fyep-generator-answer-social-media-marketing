import type { TaskDefinition } from "./types";
import tpm1 from "./tpm-1";
import tpm2 from "./tpm-2";
import tpm3 from "./tpm-3";
import tpm4 from "./tpm-4";
import tpm7 from "./tpm-7";

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
export const TASKS: TaskDefinition[] = [tpm1, tpm2, tpm3, tpm4, tpm7];

/** Jumlah slot yang ditampilkan di navbar, termasuk tugas yang belum tersedia. */
export const TOTAL_SLOT_TUGAS = 8;

/** Daftar untuk navbar: tugas terdaftar + placeholder "segera hadir". */
export interface NavItem {
  id: string;
  label: string;
  available: boolean;
}

/**
 * Navbar disusun menurut nomor tugas, bukan urutan pendaftaran.
 *
 * Tugas boleh dikerjakan tidak berurutan: bila TPM 7 sudah ada sementara TPM 5
 * dan TPM 6 belum, slot 5 dan 6 tetap tampil sebagai "segera hadir" di tempatnya
 * dan TPM 7 tetap duduk di slot ketujuh.
 */
export function getNavItems(): NavItem[] {
  const items: NavItem[] = [];
  for (let n = 1; n <= TOTAL_SLOT_TUGAS; n++) {
    const tugas = TASKS.find((t) => t.id === `tpm-${n}`);
    items.push(
      tugas
        ? { id: tugas.id, label: tugas.navLabel, available: tugas.available }
        : { id: `slot-${n}`, label: `Tugas ${n}`, available: false }
    );
  }
  return items;
}

export function getTask(id: string): TaskDefinition | undefined {
  return TASKS.find((t) => t.id === id);
}

export const DEFAULT_TASK_ID = TASKS[0].id;
