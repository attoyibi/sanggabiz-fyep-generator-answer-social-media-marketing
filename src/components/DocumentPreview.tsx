"use client";

import type { DocBlock, Rich } from "@/tasks/types";

/* Warna template resmi Plan International. */
const BIRU = "#0072CE";
const KUNING = "#FFD500";
const HIJAU = "#D6D839";
const SALEM = "#F47A68";
const LANGIT = "#58CAE8";

const garis = `1.5px solid ${BIRU}`;

/** Teks yang sebagian potongannya dicetak miring, mis. kata "Brand". */
function RichText({ text }: { text: Rich }) {
  if (typeof text === "string") return <>{text}</>;
  return (
    <>
      {text.map((s, i) => (s.italic ? <em key={i}>{s.text}</em> : <span key={i}>{s.text}</span>))}
    </>
  );
}

/**
 * Menampilkan model dokumen yang sama persis dengan yang diekspor ke PDF/DOCX,
 * mengikuti tata letak template resmi: judul rata tengah, label biru di atas
 * blok kuning, dan tabel bergaris biru.
 */
export default function DocumentPreview({ blocks }: { blocks: DocBlock[] }) {
  return (
    <article className="doc-sheet" style={{ fontFamily: "var(--font-poppins), var(--font-inter), sans-serif" }}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </article>
  );
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "title":
      return (
        <div className="relative mb-1 mt-2 flex items-start gap-3">
          <h2 className="flex-1 text-center text-[1.15rem] font-bold leading-snug text-black">
            <RichText text={block.text} />
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/plan/logo-plan.png"
            alt="Plan International"
            className="h-9 w-auto shrink-0"
          />
        </div>
      );

    case "byline":
      return <p className="mb-4 text-center text-[0.78rem] italic text-ink-soft">{block.text}</p>;

    case "note":
      return <p className="mb-2 mt-1 text-[0.85rem] leading-relaxed">{block.text}</p>;

    case "label":
      return (
        <p className="mb-2 mt-5">
          <span
            className="px-1.5 py-0.5 text-[0.85rem] font-bold"
            style={{ background: KUNING, color: BIRU }}
          >
            {block.text}
          </span>
        </p>
      );

    case "fieldTable":
      return (
        <div className="my-2 overflow-x-auto">
          <table className="w-full border-collapse" style={{ border: garis }}>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>
                  <th
                    scope="row"
                    className={`w-[21%] p-2 align-top text-[0.82rem] font-bold ${
                      (block.labelAlign ?? "center") === "center" ? "text-center" : "text-left"
                    }`}
                    style={{ border: garis }}
                  >
                    <RichText text={r.label} />
                  </th>
                  <td className="p-2 align-top text-[0.82rem]" style={{ border: garis }}>
                    {r.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "profile":
      return (
        <div className="my-2 overflow-x-auto">
          <table className="w-full border-collapse" style={{ border: garis }}>
            <tbody>
              <tr>
                <td rowSpan={5} className="w-[26%] p-3 align-top text-center" style={{ border: garis }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/plan/foto-${block.avatar}.jpg`}
                    alt="Potret target audiens"
                    className="mx-auto h-24 w-24 object-cover"
                  />
                  <p className="mt-3 text-left text-[0.82rem] font-bold italic">
                    Key Communication Channel:
                  </p>
                  <p className="mt-1 text-left text-[0.75rem]">{block.channel}</p>
                </td>
                <td
                  colSpan={2}
                  className="p-2 text-center text-[0.95rem] font-bold italic text-white"
                  style={{ border: garis, background: BIRU }}
                >
                  Audience Profile
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="p-2 align-top text-[0.82rem]" style={{ border: garis }}>
                  <span className="font-bold italic">Description: </span>
                  {block.description}
                </td>
              </tr>
              <BarisWarna judul="Key Demographic" warna={HIJAU} pasangan={block.demographic} />
              <BarisWarna judul="Key Psychographic" warna={SALEM} pasangan={block.psychographic} />
              <tr>
                <td
                  className="w-[22%] p-2 align-top text-[0.82rem] font-bold italic"
                  style={{ border: garis, background: LANGIT }}
                >
                  Customer Pain Points
                </td>
                <td className="p-2 align-top text-[0.75rem]" style={{ border: garis, background: LANGIT }}>
                  <ul className="space-y-0.5">
                    {block.painPoints.map((p, i) => (
                      <li key={i} className="relative pl-3 before:absolute before:left-0 before:content-['•']">
                        {p}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case "analysis":
      return (
        <div className="my-2 overflow-x-auto">
          <table className="w-full border-collapse" style={{ border: garis }}>
            <thead>
              <tr>
                {[block.observation.title, "Elemen yang Dianalisis", "Hasil Analisis"].map((t, i) => (
                  <th
                    key={i}
                    className="p-2 text-left text-[0.82rem] font-bold text-white"
                    style={{ border: garis, background: BIRU, width: ["34%", "25%", "41%"][i] }}
                  >
                    <RichText text={t} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>
                  {i === 0 && (
                    <td
                      rowSpan={block.rows.length}
                      className="p-2 align-top text-[0.75rem]"
                      style={{ border: garis }}
                    >
                      {block.observation.lines.map((l, j) => (
                        <p key={j} className="mb-1">
                          {l}
                        </p>
                      ))}
                    </td>
                  )}
                  <td className="p-2 align-top text-[0.82rem] font-bold" style={{ border: garis }}>
                    <RichText text={r.label} />
                  </td>
                  <td className="p-2 align-top text-[0.75rem] whitespace-pre-line" style={{ border: garis }}>
                    {r.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "grid":
      return (
        <div className="my-2 overflow-x-auto">
          <table className="w-full border-collapse" style={{ border: garis }}>
            {block.head && (
              <thead>
                <tr>
                  {block.head.map((t, i) => (
                    <th
                      key={i}
                      className="p-1.5 text-left text-[0.72rem] font-bold text-white"
                      style={{ border: garis, background: BIRU }}
                    >
                      <RichText text={t} />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((baris, i) => (
                <tr key={i}>
                  {baris.map((teks, j) => (
                    <td
                      key={j}
                      className={`p-1.5 align-top text-[0.7rem] ${
                        j === 0 && (block.boldKolomPertama ?? true) ? "font-semibold" : ""
                      }`}
                      style={{ border: garis }}
                    >
                      {teks}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <p className="mt-1 text-[0.7rem] italic text-ink-soft">{block.caption}</p>
          )}
        </div>
      );

    case "pageBreak":
      return <hr className="my-6 border-dashed" style={{ borderColor: BIRU }} />;

    default:
      return null;
  }
}

function BarisWarna({
  judul,
  warna,
  pasangan,
}: {
  judul: string;
  warna: string;
  pasangan: [string, string][];
}) {
  return (
    <tr>
      <td
        className="w-[22%] p-2 align-top text-[0.82rem] font-bold italic"
        style={{ border: garis, background: warna }}
      >
        {judul}
      </td>
      <td className="p-2 align-top text-[0.75rem]" style={{ border: garis, background: warna }}>
        {pasangan.map(([k, v], i) => (
          <p key={i}>
            <em>{k}:</em> {v}
          </p>
        ))}
      </td>
    </tr>
  );
}
