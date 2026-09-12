import type { SlideSpec } from "@/tasks/types";
import { downloadBlob, safeFileName } from "../download";
import { LOGO_PLAN_PNG } from "./assets";

/**
 * Penyusun deck presentasi .pptx.
 *
 * Dokumen Capstone meminta PPT sebagai berkas tersendiri, bukan sebagai
 * halaman di dalam dokumen lain, jadi yang dihasilkan di sini benar-benar
 * berkas PowerPoint yang bisa dibuka dan disunting ulang peserta — di
 * PowerPoint, Google Slides, maupun Canva.
 *
 * Warnanya mengikuti palet resmi Plan International yang sama dengan berkas
 * PDF dan DOCX, supaya seluruh berkas capstone terbaca sebagai satu keluarga.
 */

const BIRU = "0072CE";
const MAGENTA = "DC0080";
const KUNING = "FFD500";
const HITAM = "000000";
const PUTIH = "FFFFFF";
const ABU = "5A6476";
const SAMAR = "C6CDD8";

/** Poppins dipakai template resmi; PowerPoint jatuh ke font bawaan bila belum terpasang. */
const FONT = "Poppins";

/** Slide 16:9 dalam inci. */
const W = 13.333;
const H = 7.5;
const TEPI = 0.62;
const ISI_W = W - TEPI * 2;

export async function exportPptx(
  slides: SlideSpec[],
  fileBaseName: string,
  /** Kode penilaian untuk pemeriksa, mis. "fyep-90". */
  kodeNilai?: string
): Promise<void> {
  const { default: PptxGenJS } = await import("pptxgenjs");
  const pptx = new PptxGenJS();

  pptx.defineLayout({ name: "SMM16x9", width: W, height: H });
  pptx.layout = "SMM16x9";

  let terakhir: Slide | undefined;

  for (const spec of slides) {
    const slide = pptx.addSlide();
    terakhir = slide;
    const sampul = spec.layout === "sampul";
    const penutup = spec.layout === "penutup";
    const gelap = sampul || penutup;

    slide.background = { color: gelap ? BIRU : PUTIH };

    // Logo Plan selalu di kanan atas, sama seperti template resmi.
    const logoW = 1.75;
    const logoH = (logoW * 360) / 640;
    const logoX = W - TEPI - logoW;
    const logoY = 0.34;
    // Logonya berwarna biru, jadi di slide berlatar biru ia diberi alas putih
    // seperti lencana pada halaman sampul dokumen resminya.
    if (gelap) {
      slide.addShape("roundRect", {
        x: logoX - 0.14,
        y: logoY - 0.1,
        w: logoW + 0.28,
        h: logoH + 0.2,
        fill: { color: PUTIH },
        rectRadius: 0.06,
      });
    }
    slide.addImage({
      data: `data:image/png;base64,${LOGO_PLAN_PNG}`,
      x: logoX,
      y: logoY,
      w: logoW,
      h: logoH,
    });

    if (sampul) {
      renderSampul(slide, spec);
    } else if (penutup) {
      renderPenutup(slide, spec);
    } else {
      renderIsi(slide, spec);
    }
  }

  if (kodeNilai && terakhir) {
    // Kode pemeriksa diletakkan samar di kaki slide terakhir, sama seperti
    // pada berkas PDF dan DOCX.
    terakhir.addText(kodeNilai, {
      x: TEPI,
      y: H - 0.42,
      w: 3,
      h: 0.26,
      fontFace: FONT,
      fontSize: 7,
      color: SAMAR,
    });
  }

  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  downloadBlob(blob, `${safeFileName(fileBaseName)}.pptx`);
}

/* ------------------------------------------------------------------ */
/* Tata letak                                                          */
/* ------------------------------------------------------------------ */

type Slide = ReturnType<InstanceType<typeof import("pptxgenjs").default>["addSlide"]>;

function renderSampul(slide: Slide, spec: SlideSpec): void {
  slide.addShape("rect", {
    x: TEPI,
    y: 2.5,
    w: 1.5,
    h: 0.12,
    fill: { color: KUNING },
  });
  slide.addText(spec.title, {
    x: TEPI,
    y: 2.78,
    w: ISI_W * 0.78,
    h: 1.5,
    fontFace: FONT,
    fontSize: 40,
    bold: true,
    color: PUTIH,
  });
  if (spec.subtitle) {
    slide.addText(spec.subtitle, {
      x: TEPI,
      y: 4.3,
      w: ISI_W * 0.72,
      h: 1.1,
      fontFace: FONT,
      fontSize: 17,
      color: PUTIH,
    });
  }
}

function renderPenutup(slide: Slide, spec: SlideSpec): void {
  slide.addText(spec.title, {
    x: TEPI,
    y: 1.5,
    w: ISI_W * 0.8,
    h: 0.9,
    fontFace: FONT,
    fontSize: 32,
    bold: true,
    color: PUTIH,
  });
  if (spec.subtitle) {
    slide.addText(spec.subtitle, {
      x: TEPI,
      y: 2.45,
      w: ISI_W * 0.74,
      h: 0.6,
      fontFace: FONT,
      fontSize: 15,
      color: KUNING,
    });
  }
  isiKeTeks(slide, spec, { atas: 3.2, warnaTeks: PUTIH, warnaLabel: KUNING });
}

function renderIsi(slide: Slide, spec: SlideSpec): void {
  // Percikan kuning di kiri judul, menirukan ornamen pada template resmi.
  slide.addShape("rect", {
    x: TEPI,
    y: 0.52,
    w: 0.34,
    h: 0.1,
    fill: { color: KUNING },
    rotate: 320,
  });

  slide.addText(spec.title, {
    x: TEPI,
    y: 0.62,
    w: ISI_W - 2,
    h: 0.66,
    fontFace: FONT,
    fontSize: 25,
    bold: true,
    color: BIRU,
  });

  let atas = 1.36;
  if (spec.subtitle) {
    slide.addText(spec.subtitle, {
      x: TEPI,
      y: atas,
      w: ISI_W,
      h: 0.42,
      fontFace: FONT,
      fontSize: 13,
      color: ABU,
    });
    atas += 0.56;
  }

  isiKeTeks(slide, spec, { atas, warnaTeks: HITAM, warnaLabel: BIRU });
}

/**
 * Menuangkan blok isi menjadi satu kotak teks.
 *
 * Seluruh blok digabung ke dalam satu kotak supaya PowerPoint bebas
 * menyusutkan teksnya bila slide terlalu padat, alih-alih memotongnya di
 * tengah — isi slide berasal dari jawaban peserta, panjangnya tidak tetap.
 */
function isiKeTeks(
  slide: Slide,
  spec: SlideSpec,
  opsi: { atas: number; warnaTeks: string; warnaLabel: string }
): void {
  const baris: {
    text: string;
    options: Record<string, unknown>;
  }[] = [];

  for (const blok of spec.body) {
    if (blok.type === "bullets") {
      for (const item of blok.items) {
        baris.push({
          text: item,
          options: {
            bullet: { characterCode: "25CF" },
            color: opsi.warnaTeks,
            fontSize: 14,
            paraSpaceAfter: 7,
            indentLevel: 0,
          },
        });
      }
    } else if (blok.type === "fields") {
      for (const row of blok.rows) {
        baris.push({
          text: row.label,
          options: {
            color: opsi.warnaLabel,
            fontSize: 13,
            bold: true,
            paraSpaceBefore: 5,
            breakLine: true,
          },
        });
        baris.push({
          text: row.value,
          options: {
            color: opsi.warnaTeks,
            fontSize: 13,
            paraSpaceAfter: 8,
            breakLine: true,
          },
        });
      }
    } else {
      baris.push({
        text: blok.text,
        options: {
          color: MAGENTA,
          fontSize: 12,
          italic: true,
          bold: true,
          paraSpaceBefore: 8,
          breakLine: true,
        },
      });
    }
  }

  if (baris.length === 0) return;

  slide.addText(baris, {
    x: TEPI,
    y: opsi.atas,
    w: ISI_W,
    h: H - opsi.atas - 0.6,
    fontFace: FONT,
    valign: "top",
    shrinkText: true,
  });
}
