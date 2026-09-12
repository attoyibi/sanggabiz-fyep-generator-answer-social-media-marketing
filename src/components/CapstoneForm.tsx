"use client";

import { useState } from "react";
import type { CapstoneField, CapstoneSection } from "@/tasks/types";
import { terisi } from "@/lib/capstone";

/**
 * Formulir jalur "UMKM sendiri".
 *
 * Tiap kolom membawa penjelasan dan contoh siap pakai. Tombol "Pakai contoh"
 * mengisi kolom dengan contohnya supaya peserta punya titik awal untuk
 * disunting: jauh lebih mudah daripada menghadapi kolom kosong, dan sekaligus
 * memperlihatkan sedetail apa isian yang diharapkan.
 */
export default function CapstoneForm({
  sections,
  nilai,
  onUbah,
}: {
  sections: CapstoneSection[];
  nilai: Record<string, string>;
  onUbah: (fieldId: string, value: string) => void;
}) {
  return (
    <div className="grid gap-5">
      {sections.map((section, i) => (
        <Bagian
          key={section.id}
          section={section}
          nomor={i + 1}
          nilai={nilai}
          onUbah={onUbah}
        />
      ))}
    </div>
  );
}

function Bagian({
  section,
  nomor,
  nilai,
  onUbah,
}: {
  section: CapstoneSection;
  nomor: number;
  nilai: Record<string, string>;
  onUbah: (fieldId: string, value: string) => void;
}) {
  const wajib = section.fields.filter((f) => f.wajib);
  const sudah = wajib.filter((f) => terisi(nilai[f.id])).length;
  const lengkap = wajib.length > 0 && sudah === wajib.length;

  return (
    <section className="card overflow-hidden">
      <div className="flex items-start gap-3 border-b border-line bg-surface-soft px-4 py-3.5 sm:px-5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[0.9rem] font-bold text-white ${
            lengkap ? "bg-accent" : "bg-ink"
          }`}
        >
          {lengkap ? <CheckIcon /> : nomor}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[1rem] font-bold leading-tight">{section.title}</h3>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-soft">
            {section.description}
          </p>
        </div>
        {wajib.length > 0 && (
          <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[0.72rem] font-semibold text-ink-soft">
            {sudah}/{wajib.length}
          </span>
        )}
      </div>

      <div className="grid gap-4 p-4 sm:p-5">
        {section.fields.map((field) => (
          <Isian
            key={field.id}
            field={field}
            value={nilai[field.id] ?? ""}
            onUbah={(v) => onUbah(field.id, v)}
          />
        ))}
      </div>
    </section>
  );
}

function Isian({
  field,
  value,
  onUbah,
}: {
  field: CapstoneField;
  value: string;
  onUbah: (value: string) => void;
}) {
  const [fokus, setFokus] = useState(false);
  const sudahDiisi = terisi(value);
  const kosongWajib = Boolean(field.wajib) && !sudahDiisi;

  const kelasKotak =
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.88rem] leading-relaxed outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 " +
    (kosongWajib ? "border-line" : "border-accent/35");

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <label htmlFor={field.id} className="text-[0.86rem] font-bold">
          {field.label}
        </label>
        {field.wajib ? (
          <span className="text-[0.72rem] font-semibold text-accent">wajib</span>
        ) : (
          <span className="text-[0.72rem] text-ink-soft">boleh dikosongkan</span>
        )}
        {sudahDiisi && (
          <span className="text-[0.72rem] font-semibold text-emerald-600">terisi</span>
        )}
      </div>

      <p className="mb-2 text-[0.78rem] leading-relaxed text-ink-soft">{field.hint}</p>

      {field.multiline ? (
        <textarea
          id={field.id}
          rows={fokus || sudahDiisi ? 5 : 3}
          value={value}
          placeholder={field.placeholder}
          onFocus={() => setFokus(true)}
          onBlur={() => setFokus(false)}
          onChange={(e) => onUbah(e.target.value)}
          className={`${kelasKotak} resize-y`}
        />
      ) : (
        <input
          id={field.id}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onUbah(e.target.value)}
          className={kelasKotak}
        />
      )}

      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onUbah(field.contoh)}
          className="rounded-md border border-line px-2.5 py-1 text-[0.74rem] font-semibold text-ink-soft transition hover:border-accent hover:text-accent"
        >
          {sudahDiisi ? "Ganti dengan contoh" : "Pakai contoh"}
        </button>
        {sudahDiisi && (
          <button
            type="button"
            onClick={() => onUbah("")}
            className="rounded-md px-2 py-1 text-[0.74rem] font-semibold text-ink-soft transition hover:text-rose-600"
          >
            Kosongkan
          </button>
        )}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
