"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import ChoiceGroupCard from "./ChoiceGroupCard";
import DocumentPreview from "./DocumentPreview";
import { getTask } from "@/tasks/registry";
import type { FormatUnduhan, Grade, Pilihan } from "@/tasks/types";
import { allGroups, buildContext, progressOf } from "@/lib/resolve";
import { kodeNilai } from "@/lib/scoring";
import { createSeed } from "@/lib/rng";
import { EMPTY_TERSIMPAN, loadState, saveState, clearState, type PesertaState } from "@/lib/storage";
import { safeFileName } from "@/lib/download";

/** Nama format pada tombol unduh. */
const LABEL_UNDUHAN: Record<FormatUnduhan, string> = {
  pdf: "PDF",
  docx: "DOCX",
  xlsx: "Excel",
};

export default function TaskRunner({ taskId }: { taskId: string }) {
  const task = getTask(taskId)!;

  const [state, setState] = useState<PesertaState>({ ...EMPTY_TERSIMPAN, seed: 0 });
  const [hydrated, setHydrated] = useState(false);
  const [namaInput, setNamaInput] = useState("");
  const [busy, setBusy] = useState<null | FormatUnduhan>(null);
  const [pesan, setPesan] = useState<string | null>(null);
  const [konfirmasiReset, setKonfirmasiReset] = useState(false);
  const [ubahNama, setUbahNama] = useState(false);

  /* ---------- muat & simpan localStorage ---------- */
  useEffect(() => {
    // Nama dan pilihan diambil dari localStorage, tetapi seed selalu dibuat baru.
    // Seed baru hanya memengaruhi grup yang BELUM dijawab: isinya berganti tiap
    // halaman dibuka, sehingga tiap orang mendapat jawaban yang berbeda.
    // Grup yang sudah dijawab terkunci pada variantId yang tersimpan.
    const loaded = loadState();
    setState({ ...loaded, seed: createSeed() });
    setNamaInput(loaded.nama);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !state.nama) return;
    saveState(state);
  }, [state, hydrated]);

  const selections = useMemo<Record<string, Pilihan>>(
    () => state.selections[taskId] ?? {},
    [state.selections, taskId]
  );

  const groups = useMemo(() => allGroups(task), [task]);

  const ctx = useMemo(
    () => buildContext(task, state.nama || "Nama Peserta", state.seed, selections),
    [task, state.nama, state.seed, selections]
  );

  const blocks = useMemo(() => task.buildDocument(ctx), [task, ctx]);
  const progres = useMemo(() => progressOf(task, selections), [task, selections]);
  const lengkap = progres.belum === 0;
  // Kode untuk pemeriksa; hanya ikut ke berkas hasil unduhan, tidak pernah tampil di layar.
  const kode = useMemo(() => kodeNilai(task, selections), [task, selections]);
  const namaFile = safeFileName(task.submission.fileName(state.nama || "Nama Peserta"));
  // Format pengumpulan tugas ini, yaitu format pertama pada daftar unduhan.
  const formatUtama = task.downloads[0];

  /* ---------- aksi ---------- */
  const mulai = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const nama = namaInput.trim().replace(/\s+/g, " ");
      if (nama.length < 3) return;
      setState((prev) => ({ ...prev, nama }));
    },
    [namaInput]
  );

  /** Memperbaiki nama tanpa mengubah seed maupun jawaban yang sudah dipilih. */
  const simpanNama = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const bersih = namaInput.trim().replace(/\s+/g, " ");
      if (bersih.length < 3) return;
      setState((prev) => ({ ...prev, nama: bersih }));
      setUbahNama(false);
      setPesan(
        `Nama diperbarui. Nama file sekarang: ${safeFileName(task.submission.fileName(bersih))}.${task.downloads[0]}`
      );
    },
    [namaInput, task]
  );

  const batalUbahNama = useCallback(() => {
    setNamaInput(state.nama);
    setUbahNama(false);
  }, [state.nama]);

  /**
   * Menyimpan pilihan peserta beserta id varian yang sedang ia lihat.
   * Id itulah yang membuat jawaban terpilih tidak berubah saat halaman
   * dimuat ulang, meskipun seed pengacaknya selalu baru.
   */
  const pilih = useCallback(
    (groupId: string, grade: Grade, variantId: string) => {
      setState((prev) => ({
        ...prev,
        selections: {
          ...prev.selections,
          [taskId]: { ...(prev.selections[taskId] ?? {}), [groupId]: { grade, variantId } },
        },
      }));
    },
    [taskId]
  );

  const reset = useCallback(() => {
    clearState();
    setState({ ...EMPTY_TERSIMPAN, seed: createSeed() });
    setNamaInput("");
    setKonfirmasiReset(false);
    setUbahNama(false);
    setPesan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const unduh = useCallback(
    async (format: FormatUnduhan) => {
      setBusy(format);
      setPesan(null);
      try {
        if (format === "pdf") {
          const { exportPdf } = await import("@/lib/export/pdf");
          await exportPdf(blocks, namaFile, kode);
        } else if (format === "xlsx") {
          const { exportXlsx } = await import("@/lib/export/xlsx");
          await exportXlsx(task.buildWorkbook!(ctx), namaFile, kode);
        } else {
          const { exportDocx } = await import("@/lib/export/docx");
          await exportDocx(blocks, namaFile, kode);
        }
        setPesan(`Berhasil diunduh: ${namaFile}.${format}`);
      } catch (err) {
        console.error(err);
        const detail = err instanceof Error ? err.message : String(err);
        // Chunk ekspor dimuat saat tombol ditekan. Bila versi aplikasi berubah
        // sementara halaman masih terbuka, chunk lama hilang dan pemuatan gagal.
        const chunkBasi = /chunk|dynamically imported|failed to fetch|importing a module/i.test(detail);
        setPesan(
          chunkBasi
            ? "Versi halaman sudah kedaluwarsa. Muat ulang halaman lalu coba unduh lagi. Jawabanmu tidak akan hilang."
            : `Gagal membuat file: ${detail}`
        );
      } finally {
        setBusy(null);
      }
    },
    [blocks, namaFile, kode, task, ctx]
  );

  useEffect(() => {
    // Pesan keberhasilan hilang sendiri; pesan kegagalan dibiarkan agar sempat dibaca.
    if (!pesan || pesan.startsWith("Gagal") || pesan.startsWith("Versi halaman")) return;
    const t = setTimeout(() => setPesan(null), 6000);
    return () => clearTimeout(t);
  }, [pesan]);

  /* ---------- tampilan ---------- */
  if (!hydrated) {
    return (
      <>
        <Navbar activeId={taskId} />
        <main className="mx-auto max-w-5xl px-4 py-12">
          <div className="h-32 animate-pulse rounded-2xl bg-white/60" />
        </main>
      </>
    );
  }

  const sudahMulai = Boolean(state.nama);

  return (
    <>
      <Navbar activeId={taskId} />

      <main className="mx-auto max-w-5xl px-4 pb-40 pt-6">
        {/* Judul tugas */}
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            Tugas Praktik Mandiri - {task.code.replace(/\D/g, "")}
          </p>
          <h1 className="mt-1 text-[1.6rem] font-extrabold leading-tight sm:text-[2rem]">
            {task.title}
          </h1>
          <p className="mt-1 text-[0.95rem] text-ink-soft">{task.subtitle}</p>
        </div>

        {/* Kartu info pelatihan */}
        <div className="card mb-5 grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
          <Info label="Judul Pelatihan" value={task.meta.judulPelatihan} />
          <Info label="Chapter" value={task.meta.chapter} />
          <Info label="Tujuan" value={task.meta.tujuan} />
        </div>

        {/* Studi kasus */}
        <div className="mb-5">
          <div className="bar-blue">Studi Kasus</div>
          <div className="card mt-2.5 p-4 sm:p-5">
            {task.caseStudy.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-justify text-[0.9rem] leading-relaxed ${
                  i > 0 ? "mt-2.5" : ""
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Instruksi tugas */}
        <div className="mb-6">
          <div className="bar-blue">Instruksi Tugas</div>
          <div className="card mt-2.5 p-4 sm:p-5">
            <ol className="space-y-2">
              {task.instructionSummary.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-[0.9rem] leading-relaxed">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[11px] font-bold text-brand">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Gerbang nama */}
        {!sudahMulai ? (
          <section className="card border-brand/30 bg-white p-5 sm:p-7">
            <h2 className="text-lg font-bold">Masukkan nama lengkapmu</h2>
            <p className="mt-1 text-[0.88rem] text-ink-soft">
              Nama ini dipakai sebagai nama file sesuai ketentuan pengumpulan:{" "}
              <span className="font-semibold text-ink">{task.submission.fileNamePattern}</span>
            </p>
            <form onSubmit={mulai} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <input
                autoFocus
                value={namaInput}
                onChange={(e) => setNamaInput(e.target.value)}
                placeholder="Contoh: Putri Amalia"
                aria-label="Nama lengkap peserta"
                className="flex-1 rounded-lg border border-line bg-white px-4 py-3 text-[0.95rem] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="submit"
                disabled={namaInput.trim().length < 3}
                className="rounded-lg bg-brand px-6 py-3 text-[0.95rem] font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                Mulai Kerjakan
              </button>
            </form>
            {namaInput.trim().length >= 3 && (
              <p className="mt-3 text-[0.8rem] text-ink-soft">
                File akan bernama{" "}
                <span className="font-semibold text-brand">
                  {safeFileName(task.submission.fileName(namaInput.trim().replace(/\s+/g, " ")))}.{formatUtama}
                </span>
              </p>
            )}
          </section>
        ) : (
          <>
            {/* Identitas peserta */}
            <div className="card mb-6 p-4">
              {ubahNama ? (
                <form onSubmit={simpanNama} className="flex flex-col gap-2.5">
                  <label
                    htmlFor="ubah-nama"
                    className="text-[0.8rem] font-semibold text-ink-soft"
                  >
                    Perbaiki nama lengkapmu
                  </label>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <input
                      id="ubah-nama"
                      autoFocus
                      value={namaInput}
                      onChange={(e) => setNamaInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") batalUbahNama();
                      }}
                      placeholder="Contoh: Putri Amalia"
                      className="flex-1 rounded-lg border border-line bg-white px-3.5 py-2.5 text-[0.9rem] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={
                          namaInput.trim().length < 3 ||
                          namaInput.trim().replace(/\s+/g, " ") === state.nama
                        }
                        className="rounded-lg bg-brand px-4 py-2.5 text-[0.82rem] font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={batalUbahNama}
                        className="rounded-lg border border-line px-4 py-2.5 text-[0.82rem] font-semibold transition hover:border-ink-soft"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                  <p className="text-[0.76rem] text-ink-soft">
                    Mengganti nama tidak menghapus jawaban yang sudah kamu pilih.
                  </p>
                </form>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-[0.95rem] font-bold text-white">
                    {state.nama.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.95rem] font-bold">{state.nama}</p>
                    <p className="truncate text-[0.78rem] text-ink-soft">
                      Nama file: {namaFile}.{formatUtama}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNamaInput(state.nama);
                      setUbahNama(true);
                    }}
                    title="Perbaiki nama bila ada salah ketik"
                    className="rounded-lg border border-line px-3 py-2 text-[0.8rem] font-semibold text-ink transition hover:border-brand hover:text-brand"
                  >
                    Ubah nama
                  </button>
                </div>
              )}
            </div>

            {/* Langkah-langkah */}
            {task.steps.map((step) => {
              const mulaiIndex = groups.findIndex((g) => g.id === step.groups[0]?.id);
              return (
                <section key={step.id} className="mb-8" id={step.id}>
                  <div className="mb-3 flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-[0.9rem] font-bold text-white">
                      {step.number}
                    </span>
                    <div>
                      <h2 className="text-[1.05rem] font-bold leading-tight">{step.title}</h2>
                      <ul className="mt-1.5 space-y-1">
                        {step.brief.map((b, i) => (
                          <li key={i} className="text-[0.82rem] leading-relaxed text-ink-soft">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {step.groups.map((group, gi) => (
                      <ChoiceGroupCard
                        key={group.id}
                        group={group}
                        taskId={taskId}
                        seed={state.seed}
                        selected={selections[group.id]}
                        index={mulaiIndex + gi + 1}
                        onSelect={pilih}
                        fill={ctx.fill}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Status pengerjaan */}
            <section className="card mb-6 p-4 sm:p-5">
              <h2 className="text-[1.05rem] font-bold">Status Pengerjaan</h2>
              {lengkap ? (
                <p className="mt-1 text-[0.85rem] text-ink-soft">
                  Semua {progres.total} bagian sudah terisi. Periksa kembali pratinjau dokumen di
                  bawah, lalu unduh berkasnya. Kamu masih bisa mengganti pilihan kapan saja sebelum
                  mengunduh.
                </p>
              ) : (
                <p className="mt-1 text-[0.85rem] text-ink-soft">
                  Masih ada {progres.belum} bagian yang belum dipilih. Lengkapi semuanya untuk bisa
                  mengunduh dokumen.
                </p>
              )}
              <p className="mt-2.5 border-t border-line pt-2.5 text-[0.78rem] text-ink-soft">
                Pilihan jawaban disusun ulang setiap kali halaman dibuka, sehingga isi dokumen
                setiap peserta berbeda. Pilihan yang sudah kamu tentukan tetap tersimpan.
              </p>
            </section>

            {/* Pratinjau dokumen */}
            <section className="mb-6">
              <div className="bar-blue">Pratinjau Dokumen</div>
              <p className="mb-2.5 mt-2.5 text-[0.8rem] text-ink-soft">
                Inilah isi file yang akan diunduh. Perubahan pilihan langsung terlihat di sini.
              </p>
              <DocumentPreview blocks={blocks} />
            </section>

            {/* Ketentuan pengumpulan */}
            <section className="card mb-6 p-4 sm:p-5">
              <h2 className="text-[0.95rem] font-bold">Ketentuan Pengumpulan</h2>
              <ul className="mt-2 space-y-1.5">
                {task.submission.notes.map((n, i) => (
                  <li
                    key={i}
                    className="relative pl-4 text-[0.83rem] leading-relaxed text-ink-soft before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>

      {/* Bilah aksi bawah */}
      {sudahMulai && (
        <div className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-4 py-3">
            {pesan && (
              <p
                role="status"
                className="mb-2 rounded-lg bg-brand-soft px-3 py-2 text-[0.8rem] font-medium text-brand-dark"
              >
                {pesan}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-auto min-w-0">
                <div className="flex items-center gap-2">
                  <div
                    className="h-1.5 w-24 overflow-hidden rounded-full bg-line"
                    role="progressbar"
                    aria-valuenow={progres.terisi}
                    aria-valuemin={0}
                    aria-valuemax={progres.total}
                  >
                    <div
                      className="h-full rounded-full bg-brand transition-all"
                      style={{
                        width: `${(progres.terisi / progres.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[0.78rem] font-semibold text-ink-soft">
                    {progres.terisi}/{progres.total} terisi
                  </span>
                </div>
              </div>

              {konfirmasiReset ? (
                <>
                  <span className="text-[0.8rem] font-semibold text-ink-soft">
                    Hapus semua jawaban?
                  </span>
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-lg bg-rose-600 px-3.5 py-2 text-[0.82rem] font-semibold text-white transition hover:bg-rose-700"
                  >
                    Ya, reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setKonfirmasiReset(false)}
                    className="rounded-lg border border-line px-3.5 py-2 text-[0.82rem] font-semibold transition hover:border-ink-soft"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setKonfirmasiReset(true)}
                  className="rounded-lg border border-line px-3.5 py-2 text-[0.82rem] font-semibold text-ink transition hover:border-rose-400 hover:text-rose-600"
                >
                  Reset
                </button>
              )}

              {/* Format unduhan berbeda tiap tugas: TPM 1 dikumpulkan sebagai PDF,
                  TPM 2 sebagai Excel. Format pertama pada daftar adalah format
                  pengumpulannya, dan tampil sebagai tombol utama. */}
              {task.downloads.map((format, i) => {
                const utama = i === 0;
                return (
                  <button
                    key={format}
                    type="button"
                    onClick={() => unduh(format)}
                    disabled={busy !== null || !lengkap}
                    className={
                      utama
                        ? "rounded-lg bg-brand px-4 py-2 text-[0.82rem] font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                        : "rounded-lg border border-brand px-3.5 py-2 text-[0.82rem] font-semibold text-brand transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
                    }
                  >
                    {busy === format ? "Menyiapkan..." : `Unduh ${LABEL_UNDUHAN[format]}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-soft">{label}</p>
      <p className="mt-0.5 text-[0.83rem] leading-relaxed">{value}</p>
    </div>
  );
}
