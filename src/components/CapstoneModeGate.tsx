"use client";

import type { CapstoneConfig, CapstoneMode } from "@/tasks/types";

/**
 * Pemilih jalur capstone.
 *
 * Ditampilkan sebelum gerbang nama: peserta menentukan dulu mau mengerjakan
 * dengan mitra UMKM yang sudah disiapkan, atau dengan data usahanya sendiri.
 * Keduanya bermuara pada dokumen yang sama, jadi pilihan ini bisa diganti
 * kapan saja lewat tombol di bawah daftar.
 */
export default function CapstoneModeGate({
  config,
  onPilih,
}: {
  config: CapstoneConfig;
  onPilih: (mode: CapstoneMode) => void;
}) {
  return (
    <section className="mb-6">
      <div className="bar-accent">Pilih Cara Mengerjakan</div>
      <p className="mb-4 mt-2.5 text-[0.85rem] leading-relaxed text-ink-soft">
        Capstone bisa dikerjakan dengan dua cara. Pilih salah satu — hasil akhirnya sama, yang
        berbeda hanya dari mana bahannya datang. Kamu bisa berpindah jalur kapan saja.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <KartuJalur jalur={config.mitra} nomor="A" onPilih={() => onPilih("mitra")} />
        <KartuJalur jalur={config.sendiri} nomor="B" onPilih={() => onPilih("sendiri")} />
      </div>
    </section>
  );
}

function KartuJalur({
  jalur,
  nomor,
  onPilih,
}: {
  jalur: CapstoneConfig["mitra"];
  nomor: string;
  onPilih: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPilih}
      className="card group flex flex-col gap-3 p-5 text-left transition hover:border-accent hover:shadow-[0_10px_28px_-18px_rgba(220,0,128,0.55)]"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-[0.8rem] font-bold text-accent-dark">
          {nomor}
        </span>
        <h3 className="text-[1rem] font-bold leading-tight">{jalur.judul}</h3>
      </div>

      <p className="text-[0.85rem] leading-relaxed text-ink-soft">{jalur.ringkas}</p>

      <ul className="space-y-1.5">
        {jalur.poin.map((p, i) => (
          <li
            key={i}
            className="relative pl-4 text-[0.8rem] leading-relaxed text-ink-soft before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
          >
            {p}
          </li>
        ))}
      </ul>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[0.83rem] font-semibold text-accent">
        Pilih cara ini
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
