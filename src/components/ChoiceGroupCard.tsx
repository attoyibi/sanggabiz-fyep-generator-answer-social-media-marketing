"use client";

import type { ChoiceGroup, Grade, Pilihan, Variant } from "@/tasks/types";
import { optionOrder, variantFor } from "@/lib/resolve";

interface Props {
  group: ChoiceGroup;
  taskId: string;
  seed: number;
  /** Pilihan tersimpan peserta: tingkat kualitas + varian yang dikunci. */
  selected?: Pilihan;
  index: number;
  onSelect: (groupId: string, grade: Grade, variantId: string) => void;
  fill: (text: string) => string;
}

/**
 * Kartu pilihan jawaban. Tingkat kualitas tiap opsi sengaja tidak pernah
 * ditampilkan ke peserta; penilaian hanya tercermin pada kode di kaki dokumen.
 */
export default function ChoiceGroupCard({
  group,
  taskId,
  seed,
  selected,
  index,
  onSelect,
  fill,
}: Props) {
  const order = optionOrder(seed, taskId, group);

  return (
    <section
      id={`grup-${group.id}`}
      className="card overflow-hidden"
      aria-labelledby={`label-${group.id}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line bg-surface-soft px-4 py-3 sm:px-5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
          {index}
        </span>
        <h3 id={`label-${group.id}`} className="text-[0.95rem] font-bold">
          {group.question}
        </h3>
        {selected ? (
          <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
            Terisi
          </span>
        ) : (
          <span className="ml-auto rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft ring-1 ring-line">
            Belum dipilih
          </span>
        )}
      </div>

      <div className="px-4 py-4 sm:px-5">
        {group.hint && <p className="mb-3 text-[0.8rem] text-ink-soft">{group.hint}</p>}

        <div role="radiogroup" aria-labelledby={`label-${group.id}`} className="grid gap-2.5">
          {order.map((grade) => {
            const isSelected = selected?.grade === grade;
            // Hanya kartu yang dipilih peserta yang dikunci; kartu lain tetap
            // ikut seed sehingga isinya berganti tiap halaman dimuat ulang.
            const variant = variantFor(
              seed,
              taskId,
              group,
              grade,
              isSelected ? selected?.variantId : undefined
            );
            if (!variant) return null;

            return (
              <button
                key={grade}
                type="button"
                role="radio"
                aria-checked={isSelected}
                data-selected={isSelected}
                className="opt"
                onClick={() => onSelect(group.id, grade, variant.id)}
              >
                {group.card === "profile" ? (
                  <KartuProfil variant={variant} fill={fill} />
                ) : group.card === "dual" ? (
                  <KartuGanda
                    variant={variant}
                    labels={group.dualLabels ?? ["Bagian 1", "Bagian 2"]}
                    fill={fill}
                  />
                ) : (
                  <>
                    <span className="block text-[0.9rem] font-semibold leading-snug">
                      {fill(variant.headline)}
                    </span>
                    <ul className="mt-1.5 space-y-1">
                      {variant.points.map((point, i) => (
                        <li
                          key={i}
                          className="relative pl-3 text-[0.8rem] leading-relaxed text-ink-soft before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-ink-soft/50"
                        >
                          {fill(point)}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Warna template resmi Plan International. */
const BIRU = "#0072CE";
const HIJAU = "#D6D839";
const SALEM = "#F47A68";
const LANGIT = "#58CAE8";

/**
 * Kartu profil audiens utuh: ilustrasi, deskripsi, tiga blok berwarna, dan
 * saluran utama. Bentuknya sengaja meniru tata letak dokumen hasil unduhan,
 * supaya peserta memilih satu profil lengkap berdasarkan tampilan akhirnya.
 */
function KartuProfil({ variant, fill }: { variant: Variant; fill: (t: string) => string }) {
  const f = (k: string, fallback = "-") => {
    const v = variant.fields?.[k];
    return v ? fill(v) : fallback;
  };
  const pasangan = (list: [string, string][]) =>
    list.map(([k, v]) => (
      <p key={k} className="leading-snug">
        <em>{k}:</em> {v}
      </p>
    ));

  return (
    <div className="grid gap-3 sm:grid-cols-[86px_1fr]">
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/plan/foto-${f("avatar", "a1")}.jpg`}
          alt=""
          className="mx-auto h-16 w-16 rounded object-cover sm:h-20 sm:w-20"
        />
      </div>

      <div className="min-w-0">
        <span
          className="mb-1.5 block rounded px-2 py-1 text-center text-[0.8rem] font-bold italic text-white"
          style={{ background: BIRU }}
        >
          {f("nama", fill(variant.headline))}
        </span>

        <p className="text-[0.78rem] leading-relaxed text-ink-soft">
          <span className="font-semibold italic text-ink">Description: </span>
          {f("description")}
        </p>

        <div className="mt-1.5 space-y-1 text-[0.72rem]">
          <div className="rounded px-2 py-1" style={{ background: HIJAU }}>
            <span className="font-bold italic">Key Demographic</span>
            <div className="mt-0.5">
              {pasangan([
                ["Age", f("age")],
                ["Gender", f("gender")],
                ["Education", f("education")],
                ["Income", f("income")],
              ])}
            </div>
          </div>

          <div className="rounded px-2 py-1" style={{ background: SALEM }}>
            <span className="font-bold italic">Key Psychographic</span>
            <div className="mt-0.5">
              {pasangan([
                ["Values", f("values")],
                ["Interest", f("interest")],
                ["Opinions", f("opinions")],
              ])}
            </div>
          </div>

          <div className="rounded px-2 py-1" style={{ background: LANGIT }}>
            <span className="font-bold italic">Customer Pain Points</span>
            <ul className="mt-0.5 space-y-0.5">
              {variant.points.map((p, i) => (
                <li key={i} className="relative pl-3 before:absolute before:left-0 before:content-['\\2022']">
                  {fill(p)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-1.5 text-[0.72rem] leading-snug text-ink-soft">
          <span className="font-semibold italic text-ink">Key Communication Channel: </span>
          {f("channel")}
        </p>
      </div>
    </div>
  );
}

/**
 * Kartu dengan dua blok berlabel, untuk tabel template yang memang berisi dua
 * baris sekaligus (Kekuatan/Kelemahan dan Peluang/Inspirasi). Isinya diambil
 * dari field "a" dan "b"; baris pertama tiap blok adalah judulnya.
 */
function KartuGanda({
  variant,
  labels,
  fill,
}: {
  variant: Variant;
  labels: [string, string];
  fill: (t: string) => string;
}) {
  const blok = (kunci: "a" | "b", label: string) => {
    const isi = fill(variant.fields?.[kunci] ?? "");
    const [judul, ...poin] = isi.split("\n");
    return (
      <div key={kunci} className="min-w-0">
        <span
          className="mb-1 inline-block rounded px-1.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-white"
          style={{ background: BIRU }}
        >
          {label}
        </span>
        <p className="text-[0.85rem] font-semibold leading-snug">{judul}</p>
        <ul className="mt-1 space-y-0.5">
          {poin.map((t, i) => (
            <li key={i} className="text-[0.76rem] leading-relaxed text-ink-soft">
              {t}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {blok("a", labels[0])}
      {blok("b", labels[1])}
    </div>
  );
}
