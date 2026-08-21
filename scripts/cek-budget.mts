/**
 * Skrip pemeriksaan: memastikan tabel plotting TPM 7 selalu berjumlah tepat
 * sama dengan total budget studi kasus, apa pun jawaban yang dipilih peserta.
 *
 * Dokumen budgeting yang angkanya tidak pas tidak ada gunanya, jadi properti
 * ini diperiksa untuk seluruh kombinasi jawaban, bukan sekadar contoh.
 */
import { buildContext, allGroups } from "../src/lib/resolve.ts";
import { getTask } from "../src/tasks/registry.ts";
import { susunPlotting } from "../src/tasks/tpm-7/index.ts";
import type { Grade, Pilihan } from "../src/tasks/types.ts";

const TOTAL = 10_000_000;
const DURASI = 14;
const task = getTask("tpm-7")!;
const grup = allGroups(task);

const seeds = Number(process.argv[2] ?? 300);
let diperiksa = 0;
const masalah: string[] = [];

/** Seluruh kombinasi tingkat kualitas untuk grup yang paling memengaruhi angka. */
const modes: Grade[] = ["tepat", "sebagian", "kurang"];

/**
 * Selain tingkat kualitas yang seragam, dicoba juga campuran: peserta bisa saja
 * memilih alokasi yang tepat tetapi pola belanja yang keliru.
 */
const acakGrade = (n: number): Grade => modes[n % modes.length];

for (const [ke, mode] of [...modes, "campur" as const].entries()) {
  for (let seed = 1; seed <= seeds; seed++) {
    const sel: Record<string, Pilihan> = {};
    for (const [gi, g] of grup.entries()) {
      sel[g.id] = { grade: mode === "campur" ? acakGrade(seed + gi * 7 + ke) : (mode as Grade) };
    }
    const ctx = buildContext(task, "Putri Amalia", seed, sel);
    const baris = susunPlotting(ctx);
    diperiksa++;

    const total = baris.reduce((a, b) => a + b.budget, 0);
    const alokasi = ctx.answers["alokasi"]?.variant.headline ?? "?";
    if (total !== TOTAL) masalah.push(`total ${total} (seharusnya ${TOTAL}) — ${mode}/${alokasi}`);
    if (baris.length !== DURASI) masalah.push(`jumlah hari ${baris.length} — ${mode}/${alokasi}`);
    if (baris.some((b) => b.budget < 0)) masalah.push(`ada budget negatif — ${mode}/${alokasi}`);
    const urut = baris.every((b, i) => b.hari === i + 1);
    if (!urut) masalah.push(`nomor hari tidak berurutan — ${mode}/${alokasi}`);

    // Pola yang menjanjikan kenaikan tidak boleh turun tajam di tengah jalan:
    // kurva gergaji akan bertentangan dengan alasan yang dipilih peserta.
    const pola = ctx.answers["polaHarian"]?.variant.fields?.pola ?? "";
    if (pola === "naik" || pola === "rata-naik" || pola === "dua") {
      for (let i = 1; i < baris.length; i++) {
        const turun = baris[i - 1].budget - baris[i].budget;
        if (turun > baris[i - 1].budget * 0.12) {
          masalah.push(
            `pola ${pola} turun ${turun} di hari ${baris[i].hari} — ${mode}/${alokasi}`
          );
          break;
        }
      }
    }
  }
}

console.log(`kombinasi diperiksa: ${diperiksa}`);
if (masalah.length === 0) {
  console.log(`semua tabel berjumlah tepat Rp${TOTAL.toLocaleString("id-ID")} untuk ${DURASI} hari`);
} else {
  const unik = [...new Set(masalah)];
  console.log(`masalah: ${masalah.length} (${unik.length} jenis)`);
  for (const m of unik.slice(0, 15)) console.log("  " + m);
  process.exitCode = 1;
}
process.exit(process.exitCode ?? 0);
