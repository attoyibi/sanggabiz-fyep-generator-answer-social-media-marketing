import type { PanduanTugas } from "@/tasks/types";

/**
 * Panel panduan untuk tugas yang dikerjakan langsung di aplikasinya.
 *
 * Sebagian tugas tidak bisa dibantu website ini — hasilnya berupa berkas yang
 * memang harus dibuat sendiri oleh peserta di tools-nya. Halaman tugas seperti
 * itu tidak menampilkan kartu jawaban maupun tombol unduh, hanya panduan ini.
 */
export default function PanduanPanel({ panduan }: { panduan: PanduanTugas }) {
  return (
    <div className="mb-6">
      <div className="bar-blue">{panduan.judul}</div>
      <div className="card mt-2.5 p-4 sm:p-5">
        <p className="text-[0.92rem] leading-relaxed">{panduan.pengantar}</p>

        {panduan.tautan.length > 0 && (
          <ul className="mt-4 space-y-2">
            {panduan.tautan.map((t) => (
              <li key={t.url} className="rounded-lg border border-line px-3 py-2.5">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.92rem] font-bold text-brand underline underline-offset-2"
                >
                  {t.label}
                </a>
                {t.catatan && (
                  <p className="mt-0.5 text-[0.83rem] leading-relaxed text-ink-soft">{t.catatan}</p>
                )}
              </li>
            ))}
          </ul>
        )}

        <h3 className="mt-5 text-[0.8rem] font-bold uppercase tracking-wide text-ink-soft">
          Langkah Pengerjaan
        </h3>
        <ol className="mt-2 space-y-3">
          {panduan.langkah.map((l, i) => (
            <li key={l.judul} className="flex gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[11px] font-bold text-brand">
                {i + 1}
              </span>
              <div>
                <div className="text-[0.9rem] font-bold">{l.judul}</div>
                <p className="mt-0.5 text-[0.87rem] leading-relaxed text-ink-soft">{l.isi}</p>
              </div>
            </li>
          ))}
        </ol>

        {panduan.catatan.length > 0 && (
          <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-3">
            {panduan.catatan.map((c, i) => (
              <p
                key={i}
                className={`text-[0.87rem] leading-relaxed ${i > 0 ? "mt-2" : ""}`}
              >
                {c}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
