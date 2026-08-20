import type { DocBlock, Rich, RichSpan } from "@/tasks/types";
import { downloadBlob, safeFileName } from "../download";
import { FOTO_JPEG, LOGO_PLAN_PNG } from "./assets";

/* Warna template resmi. */
const BIRU = "0072CE";
const KUNING = "FFD500";
const HIJAU = "D6D839";
const SALEM = "F47A68";
const LANGIT = "58CAE8";
const ABU = "999999";
/** Abu sangat muda untuk kode penilaian di kaki halaman. */
const SAMAR = "C6CDD8";

const FONT = "Poppins";
/** Ukuran dalam setengah-poin, mengikuti w:sz pada template. */
const SZ_JUDUL = 36;
const SZ_KEPALA = 30;
const SZ_TEKS = 26;
const SZ_KECIL = 20;

/** A4 lanskap dalam twips, sama persis dengan sectPr template. */
const HAL_W = 16834;
const HAL_H = 11909;
const MARGIN = 1440;
const ISI_W = HAL_W - MARGIN * 2;

function spans(text: Rich): RichSpan[] {
  return typeof text === "string" ? [{ text }] : text;
}

function base64ToBytes(b64: string): Uint8Array {
  if (typeof atob === "function") {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  return new Uint8Array(Buffer.from(b64, "base64"));
}

export async function exportDocx(
  blocks: DocBlock[],
  fileBaseName: string,
  /** Kode penilaian untuk pemeriksa, mis. "fyep-90". */
  kodeNilai?: string
): Promise<void> {
  const d = await import("docx");
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    ImageRun,
    AlignmentType,
    Header,
    Footer,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    ShadingType,
    VerticalMergeType,
    VerticalAlign,
    PageOrientation,
  } = d;

  const children: unknown[] = [];
  const push = (item: unknown) => children.push(item);

  /** Garis biru tebal, mengikuti w:sz="18" pada template. */
  const garis = { style: BorderStyle.SINGLE, size: 18, color: BIRU } as const;
  const semuaGaris = {
    top: garis,
    bottom: garis,
    left: garis,
    right: garis,
    insideHorizontal: garis,
    insideVertical: garis,
  };

  const teksRun = (
    s: RichSpan,
    opts: { bold?: boolean; color?: string; size?: number; shading?: string } = {}
  ) =>
    new TextRun({
      text: s.text,
      font: FONT,
      bold: opts.bold ?? true,
      italics: s.italic,
      color: opts.color,
      size: opts.size ?? SZ_TEKS,
      ...(opts.shading
        ? { shading: { type: ShadingType.CLEAR, fill: opts.shading, color: "auto" } }
        : {}),
    });

  const richPara = (
    text: Rich,
    opts: { bold?: boolean; color?: string; size?: number; align?: (typeof AlignmentType)[keyof typeof AlignmentType] } = {}
  ) =>
    new Paragraph({
      alignment: opts.align,
      children: spans(text).map((s) => teksRun(s, opts)),
    });

  /** Paragraf isi jawaban; teks dengan \n tetap dipecah jadi beberapa baris. */
  const isiPara = (teks: string, size = SZ_TEKS, opts: { italics?: boolean; color?: string } = {}) =>
    new Paragraph({
      children: teks.split("\n").map(
        (baris, i) =>
          new TextRun({
            text: baris,
            break: i === 0 ? undefined : 1,
            font: FONT,
            size,
            italics: opts.italics,
            color: opts.color,
          })
      ),
    });

  const sel = (
    isi: unknown[],
    opts: { width: number; fill?: string; merge?: "restart" | "continue"; span?: number } = { width: 1000 }
  ) =>
    new TableCell({
      width: { size: opts.width, type: WidthType.DXA },
      columnSpan: opts.span,
      verticalAlign: VerticalAlign.TOP,
      margins: { top: 90, bottom: 90, left: 120, right: 120 },
      ...(opts.fill ? { shading: { type: ShadingType.CLEAR, fill: opts.fill, color: "auto" } } : {}),
      ...(opts.merge
        ? {
            verticalMerge:
              opts.merge === "restart" ? VerticalMergeType.RESTART : VerticalMergeType.CONTINUE,
          }
        : {}),
      children: isi as never[],
    });

  const tabel = (rows: unknown[], lebar: number[]) =>
    new Table({
      width: { size: ISI_W, type: WidthType.DXA },
      columnWidths: lebar,
      borders: semuaGaris,
      rows: rows as never[],
    });

  const jarak = () => push(new Paragraph({ text: "", spacing: { after: 200 } }));

  for (const block of blocks) {
    switch (block.type) {
      case "title":
        push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: spans(block.text).map((s) => teksRun(s, { size: SZ_JUDUL })),
          })
        );
        break;

      case "byline":
        push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({ text: block.text, font: FONT, size: SZ_KECIL, italics: true, color: ABU }),
            ],
          })
        );
        break;

      case "label":
        // Titik berwarna kuning di kiri-kanan meniru template: memberi jarak
        // di dalam blok kuning tanpa memunculkan tanda baca yang terlihat.
        push(
          new Paragraph({
            spacing: { before: 160, after: 120 },
            children: [
              teksRun({ text: "." }, { color: KUNING, shading: KUNING }),
              teksRun({ text: block.text }, { color: BIRU, shading: KUNING }),
              teksRun({ text: "." }, { color: KUNING, shading: KUNING }),
            ],
          })
        );
        break;

      case "fieldTable": {
        const w0 = Math.round(ISI_W * 0.2133);
        const w1 = ISI_W - w0;
        const tengah = (block.labelAlign ?? "center") === "center";
        push(
          tabel(
            block.rows.map(
              (r) =>
                new TableRow({
                  children: [
                    sel([richPara(r.label, { align: tengah ? AlignmentType.CENTER : undefined })], {
                      width: w0,
                    }),
                    sel([isiPara(r.value)], { width: w1 }),
                  ],
                })
            ),
            [w0, w1]
          )
        );
        jarak();
        break;
      }

      case "profile": {
        const w0 = Math.round(ISI_W * 0.2583);
        const w1 = Math.round(ISI_W * 0.2208);
        const w2 = ISI_W - w0 - w1;
        const foto = FOTO_JPEG[block.avatar] ?? FOTO_JPEG.a1;

        const kolomKiri = [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                type: "jpg",
                data: base64ToBytes(foto),
                transformation: { width: 120, height: 120 },
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              new TextRun({ text: "Key Communication Channel:", font: FONT, bold: true, italics: true, size: SZ_TEKS }),
            ],
          }),
          isiPara(block.channel, SZ_KECIL),
        ];

        const barisWarna = (judul: string, fill: string, isi: unknown[]) =>
          new TableRow({
            children: [
              sel([], { width: w0, merge: "continue" }),
              sel([richPara(judul, { size: SZ_TEKS })], { width: w1, fill }),
              sel(isi, { width: w2, fill }),
            ],
          });

        const pasangan = (list: [string, string][]) =>
          list.map(
            ([k, v]) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `${k}: `, font: FONT, italics: true, size: SZ_KECIL }),
                  new TextRun({ text: v, font: FONT, size: SZ_KECIL }),
                ],
              })
          );

        push(
          tabel(
            [
              new TableRow({
                children: [
                  sel(kolomKiri, { width: w0, merge: "restart" }),
                  sel(
                    [
                      richPara("Audience Profile", {
                        size: SZ_KEPALA,
                        color: "FFFFFF",
                        align: AlignmentType.CENTER,
                      }),
                    ],
                    { width: w1 + w2, fill: BIRU, span: 2 }
                  ),
                ],
              }),
              new TableRow({
                children: [
                  sel([], { width: w0, merge: "continue" }),
                  sel(
                    [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Description: ", font: FONT, bold: true, italics: true, size: SZ_TEKS }),
                          new TextRun({ text: block.description, font: FONT, size: SZ_TEKS }),
                        ],
                      }),
                    ],
                    { width: w1 + w2, span: 2 }
                  ),
                ],
              }),
              barisWarna("Key Demographic", HIJAU, pasangan(block.demographic)),
              barisWarna("Key Psychographic", SALEM, pasangan(block.psychographic)),
              barisWarna(
                "Customer Pain Points",
                LANGIT,
                block.painPoints.map(
                  (p) =>
                    new Paragraph({
                      bullet: { level: 0 },
                      children: [new TextRun({ text: p, font: FONT, size: SZ_KECIL })],
                    })
                )
              ),
            ],
            [w0, w1, w2]
          )
        );
        jarak();
        break;
      }

      case "analysis": {
        const w0 = Math.round(ISI_W * 0.3441);
        const w1 = Math.round(ISI_W * 0.2462);
        const w2 = ISI_W - w0 - w1;

        const kepala = new TableRow({
          tableHeader: true,
          children: [
            sel([richPara(block.observation.title, { color: "FFFFFF" })], { width: w0, fill: BIRU }),
            sel([richPara("Elemen yang Dianalisis", { color: "FFFFFF" })], { width: w1, fill: BIRU }),
            sel([richPara("Hasil Analisis", { color: "FFFFFF" })], { width: w2, fill: BIRU }),
          ],
        });

        const isiBaris = block.rows.map((r, i) =>
          new TableRow({
            children: [
              i === 0
                ? sel(
                    block.observation.lines.map((l) => isiPara(l, SZ_KECIL)),
                    { width: w0, merge: "restart" }
                  )
                : sel([], { width: w0, merge: "continue" }),
              sel([richPara(r.label)], { width: w1 }),
              sel([isiPara(r.value, SZ_KECIL)], { width: w2 }),
            ],
          })
        );

        push(tabel([kepala, ...isiBaris], [w0, w1, w2]));
        jarak();
        break;
      }

      case "pageBreak":
        push(new Paragraph({ children: [], pageBreakBefore: true }));
        break;
    }
  }

  const doc = new Document({
    creator: "Generator Tugas Praktik Mandiri",
    title: fileBaseName,
    keywords: kodeNilai ?? "",
    styles: {
      default: {
        document: { run: { font: FONT, size: SZ_TEKS } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: HAL_W, height: HAL_H, orientation: PageOrientation.LANDSCAPE },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 720, footer: 720 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new ImageRun({
                    type: "png",
                    data: base64ToBytes(LOGO_PLAN_PNG),
                    transformation: { width: 113, height: 64 },
                  }),
                ],
              }),
            ],
          }),
        },
        footers: kodeNilai
          ? {
              default: new Footer({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: kodeNilai, font: FONT, size: 11, color: SAMAR })],
                  }),
                ],
              }),
            }
          : undefined,
        children: children as never[],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `${safeFileName(fileBaseName)}.docx`);
}
