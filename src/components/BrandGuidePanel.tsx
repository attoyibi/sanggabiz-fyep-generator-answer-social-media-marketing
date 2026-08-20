import { BRAND_WARNA, type BrandGuide } from "@/tasks/types";

/** Warna terang perlu teks gelap supaya kodenya tetap terbaca. */
const TERANG: string[] = ["yellow", "white", "lightGrey", "lightBlue", "green"];

/**
 * Panel Brand Guideline: palet warna resmi dan pasangan fontnya.
 *
 * Ditampilkan sebelum peserta memilih jawaban, supaya pilihan warna dan font
 * pada desain bisa dicocokkan langsung dengan panduannya.
 */
export default function BrandGuidePanel({ guide }: { guide: BrandGuide }) {
  return (
    <div className="mb-6">
      <div className="bar-blue">{guide.judul}</div>
      <div className="card mt-2.5 p-4 sm:p-5">
        <p className="text-[0.9rem] leading-relaxed text-ink-soft">{guide.pengantar}</p>

        <h3 className="mt-4 text-[0.8rem] font-bold uppercase tracking-wide text-ink-soft">
          Palet Warna
        </h3>
        <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {guide.warna.map((w) => {
            const kode = BRAND_WARNA[w.kunci];
            const gelap = !TERANG.includes(w.kunci);
            return (
              <li
                key={w.kunci}
                className="flex flex-col justify-between rounded-lg border border-line px-2.5 py-2"
                style={{ background: kode, color: gelap ? "#FFFFFF" : "#111111" }}
              >
                <span className="text-[0.78rem] font-bold leading-tight">{w.nama}</span>
                <span className="mt-1 font-mono text-[0.7rem] opacity-80">{kode}</span>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-4 text-[0.8rem] font-bold uppercase tracking-wide text-ink-soft">
          Font
        </h3>
        <ul className="mt-2 space-y-2">
          {guide.font.map((f) => (
            <li key={f.peran} className="rounded-lg border border-line px-3 py-2">
              <div className="text-[0.72rem] font-semibold uppercase tracking-wide text-ink-soft">
                {f.peran}
              </div>
              <div className="mt-0.5 text-[0.95rem] font-bold">{f.nama}</div>
              <div
                className="mt-1 text-[0.85rem] text-ink-soft"
                style={{ fontFamily: f.nama.includes("Poppins") ? "var(--font-poppins), sans-serif" : "Arial, sans-serif" }}
              >
                {f.contoh}
              </div>
            </li>
          ))}
        </ul>

        {guide.catatan.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {guide.catatan.map((c, i) => (
              <li key={i} className="flex gap-2 text-[0.85rem] leading-relaxed text-ink-soft">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
