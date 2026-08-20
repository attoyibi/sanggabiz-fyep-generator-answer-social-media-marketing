import type { DocBlock, Rich, RichSpan } from "@/tasks/types";
import { downloadBlob, safeFileName } from "../download";
import { FOTO_JPEG, LOGO_PLAN_PNG } from "./assets";

/* ------------------------------------------------------------------ */
/* Geometri halaman — mengikuti template resmi: A4 lanskap, margin 1"   */
/* ------------------------------------------------------------------ */

const PAGE_W = 297;
const PAGE_H = 210;
const MARGIN = 25.4;
const CONTENT_W = PAGE_W - MARGIN * 2;
/** Selisih kecil metrik font antara jsPDF dan pembaca PDF. */
const WRAP_SLACK = 1;

/** Logo Plan di pojok kanan atas, di dalam area header (di atas margin isi). */
const LOGO_W = 30;
const LOGO_H = (LOGO_W * 360) / 640;
const LOGO_Y = 7;

const BIRU: [number, number, number] = [0, 114, 206];
const KUNING: [number, number, number] = [255, 213, 0];
const HIJAU: [number, number, number] = [214, 216, 57];
const SALEM: [number, number, number] = [244, 122, 104];
const LANGIT: [number, number, number] = [88, 202, 232];
const ABU: [number, number, number] = [153, 153, 153];
const HITAM: [number, number, number] = [0, 0, 0];
const PUTIH: [number, number, number] = [255, 255, 255];
/** Abu sangat muda untuk kode penilaian: terbaca bila dicari, tidak mencolok. */
const SAMAR: [number, number, number] = [198, 205, 216];

/** Tebal garis tabel: w:sz="18" pada template = 2,25pt. */
const GARIS = 0.79;
const PAD = 2.4;
/** Jarak antarbaris teks, sebagai kelipatan ukuran font. */
const LEADING = 1.42;

const PT = 25.4 / 72;

function spans(text: Rich): RichSpan[] {
  return typeof text === "string" ? [{ text }] : text;
}

export async function exportPdf(
  blocks: DocBlock[],
  fileBaseName: string,
  /** Kode penilaian untuk pemeriksa, mis. "fyep-90". */
  kodeNilai?: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const {
    POPPINS_REGULAR,
    POPPINS_BOLD,
    POPPINS_ITALIC,
    POPPINS_BOLDITALIC,
  } = await import("./poppins");

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape", compress: true });

  // Template memakai Poppins, jadi fontnya disematkan supaya bentuk hurufnya sama.
  const fonts: [string, string, string][] = [
    ["Poppins-Regular.ttf", POPPINS_REGULAR, "normal"],
    ["Poppins-Bold.ttf", POPPINS_BOLD, "bold"],
    ["Poppins-Italic.ttf", POPPINS_ITALIC, "italic"],
    ["Poppins-BoldItalic.ttf", POPPINS_BOLDITALIC, "bolditalic"],
  ];
  for (const [nama, data, gaya] of fonts) {
    doc.addFileToVFS(nama, data);
    doc.addFont(nama, "Poppins", gaya);
  }

  const gaya = (bold?: boolean, italic?: boolean) =>
    bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal";

  const set = (size: number, bold?: boolean, italic?: boolean, warna: [number, number, number] = HITAM) => {
    doc.setFont("Poppins", gaya(bold, italic));
    doc.setFontSize(size);
    doc.setTextColor(...warna);
  };

  const lh = (size: number) => size * LEADING * PT;

  /** Memecah teks menjadi baris yang muat pada lebar tertentu. */
  const pecah = (teks: string, size: number, lebar: number, bold?: boolean, italic?: boolean) => {
    doc.setFont("Poppins", gaya(bold, italic));
    doc.setFontSize(size);
    return doc.splitTextToSize(teks, lebar - WRAP_SLACK) as string[];
  };

  const logo = () => doc.addImage(LOGO_PLAN_PNG, "PNG", PAGE_W - MARGIN - LOGO_W, LOGO_Y, LOGO_W, LOGO_H);

  let y = MARGIN;
  logo();

  const halamanBaru = () => {
    doc.addPage();
    logo();
    y = MARGIN;
  };

  /** Memastikan ruang tersedia; pindah halaman bila kurang. */
  const muat = (tinggi: number) => {
    if (y + tinggi > PAGE_H - MARGIN) halamanBaru();
  };

  /** Menulis satu baris teks bergaya campuran, rata tengah. */
  const richTengah = (text: Rich, size: number) => {
    const bagian = spans(text);
    const lebar = bagian.map((s) => {
      doc.setFont("Poppins", gaya(true, s.italic));
      doc.setFontSize(size);
      return doc.getTextWidth(s.text);
    });
    const total = lebar.reduce((a, b) => a + b, 0);
    let x = (PAGE_W - total) / 2;
    for (let i = 0; i < bagian.length; i++) {
      set(size, true, bagian[i].italic, HITAM);
      doc.text(bagian[i].text, x, y + size * PT * 0.95);
      x += lebar[i];
    }
    y += lh(size) + 4;
  };

  /** Menulis teks bergaya campuran mulai dari x tertentu, membungkus bila perlu. */
  const richKiri = (
    text: Rich,
    size: number,
    x: number,
    lebarMaks: number,
    warna: [number, number, number],
    yAwal: number
  ): number => {
    const bagian = spans(text);
    let cx = x;
    let cy = yAwal;
    for (const s of bagian) {
      set(size, true, s.italic, warna);
      for (const kata of s.text.split(/(\s+)/)) {
        if (!kata) continue;
        const w = doc.getTextWidth(kata);
        if (cx + w > x + lebarMaks && cx > x) {
          cx = x;
          cy += lh(size);
        }
        doc.text(kata, cx, cy + size * PT * 0.95);
        cx += w;
      }
    }
    return cy + lh(size);
  };

  /** Tinggi yang dibutuhkan teks bergaya campuran pada lebar tertentu. */
  const richTinggi = (text: Rich, size: number, lebarMaks: number): number => {
    const bagian = spans(text);
    let cx = 0;
    let baris = 1;
    for (const s of bagian) {
      doc.setFont("Poppins", gaya(true, s.italic));
      doc.setFontSize(size);
      for (const kata of s.text.split(/(\s+)/)) {
        if (!kata) continue;
        const w = doc.getTextWidth(kata);
        if (cx + w > lebarMaks && cx > 0) {
          cx = 0;
          baris++;
        }
        cx += w;
      }
    }
    return baris * lh(size);
  };

  /* ---------------- blok ---------------- */

  const blokJudul = (text: Rich) => {
    muat(16);
    richTengah(text, 18);
  };

  const blokByline = (text: string) => {
    muat(8);
    set(10, false, true, ABU);
    doc.text(text, PAGE_W / 2, y + 3, { align: "center" });
    y += lh(10) + 4;
  };

  const blokLabel = (text: string) => {
    const size = 13;
    const tinggi = lh(size) + 2.6;
    // Label ditahan bersama awal isinya: bila sisa halaman hanya cukup untuk
    // labelnya saja, keduanya dipindah ke halaman berikutnya.
    const RUANG_ISI = 24;
    muat(tinggi + 3 + RUANG_ISI);
    set(size, true, false, BIRU);
    const w = doc.getTextWidth(text) + 7;
    doc.setFillColor(...KUNING);
    doc.rect(MARGIN, y, w, tinggi, "F");
    doc.text(text, MARGIN + 3.5, y + tinggi - size * PT * 0.42);
    y += tinggi + 3.5;
  };

  /** Menggambar kotak bergaris biru. */
  const kotak = (x: number, yy: number, w: number, h: number, isi?: [number, number, number]) => {
    if (isi) {
      doc.setFillColor(...isi);
      doc.rect(x, yy, w, h, "F");
    }
    doc.setDrawColor(...BIRU);
    doc.setLineWidth(GARIS);
    doc.rect(x, yy, w, h, "S");
  };

  const blokFieldTable = (
    rows: { label: Rich; value: string }[],
    labelAlign: "center" | "left"
  ) => {
    const wLabel = CONTENT_W * 0.2133;
    const wIsi = CONTENT_W - wLabel;
    const size = 13;

    for (const row of rows) {
      const barisIsi = pecah(row.value, size, wIsi - PAD * 2);
      const tLabel = richTinggi(row.label, size, wLabel - PAD * 2);
      const tIsi = barisIsi.length * lh(size);
      const tinggi = Math.max(tLabel, tIsi) + PAD * 2 + 2;
      muat(tinggi);

      kotak(MARGIN, y, wLabel, tinggi);
      kotak(MARGIN + wLabel, y, wIsi, tinggi);

      if (labelAlign === "center") {
        const wl = richTinggi(row.label, size, wLabel - PAD * 2);
        const yl = y + (tinggi - wl) / 2;
        // Rata tengah hanya rapi bila labelnya satu baris; template pun begitu.
        const teks = spans(row.label);
        const total = teks.reduce((a, s) => {
          doc.setFont("Poppins", gaya(true, s.italic));
          doc.setFontSize(size);
          return a + doc.getTextWidth(s.text);
        }, 0);
        let x = MARGIN + (wLabel - total) / 2;
        for (const s of teks) {
          set(size, true, s.italic, HITAM);
          doc.text(s.text, x, yl + size * PT * 0.95);
          x += doc.getTextWidth(s.text);
        }
      } else {
        richKiri(row.label, size, MARGIN + PAD, wLabel - PAD * 2, HITAM, y + PAD);
      }

      set(size, false, false, HITAM);
      let yi = y + PAD;
      for (const b of barisIsi) {
        doc.text(b, MARGIN + wLabel + PAD, yi + size * PT * 0.95);
        yi += lh(size);
      }
      y += tinggi;
    }
    y += 6;
  };

  const blokProfile = (b: Extract<DocBlock, { type: "profile" }>) => {
    const w0 = CONTENT_W * 0.2583;
    const w1 = CONTENT_W * 0.2208;
    const w2 = CONTENT_W - w0 - w1;
    const x0 = MARGIN;
    const x1 = x0 + w0;
    const x2 = x1 + w1;
    // Kartu profil memuat jauh lebih banyak teks daripada template kosongnya,
    // jadi ukurannya dirapatkan agar seluruh kartu tetap muat dalam satu halaman.
    const sJudul = 14;
    const s = 11;
    const sKecil = 9;
    const sLabel = 10;

    /**
     * Menyiapkan pasangan "Kunci: nilai" dengan gantung baris: nilai yang
     * panjang dibungkus dan barisnya menjorok sejajar di bawah nilai pertama.
     */
    const pasangan = (list: [string, string][], lebar: number) =>
      list.map(([k, v]) => {
        doc.setFont("Poppins", "italic");
        doc.setFontSize(sKecil);
        const wk = doc.getTextWidth(`${k}: `);
        return { k, wk, baris: pecah(v, sKecil, Math.max(lebar - wk, 20)) };
      });

    const isiDemo = pasangan(b.demographic, w2 - PAD * 2);
    const isiPsy = pasangan(b.psychographic, w2 - PAD * 2);

    const barisDesc = pecah(b.description, s, w1 + w2 - PAD * 2);
    const barisPain = b.painPoints.flatMap((p) => pecah(`• ${p}`, sKecil, w2 - PAD * 2));

    const tJudul = lh(sJudul) + PAD * 2;
    // Satu baris tambahan untuk label "Description:" di atas isinya.
    const tDesc = Math.max((barisDesc.length + 1) * lh(s) + PAD * 2, 14);
    const tinggiPasangan = (isi: ReturnType<typeof pasangan>) =>
      Math.max(isi.reduce((a, x) => a + x.baris.length * lh(sKecil), 0) + PAD * 2, 14);
    const tDemo = tinggiPasangan(isiDemo);
    const tPsy = tinggiPasangan(isiPsy);
    const tPain = Math.max(barisPain.length * lh(sKecil) + PAD * 2, 14);

    const total = tJudul + tDesc + tDemo + tPsy + tPain;
    muat(total);
    const atas = y;

    // Kolom kiri: ilustrasi audiens + saluran komunikasi utama.
    kotak(x0, atas, w0, total);
    const foto = FOTO_JPEG[b.avatar] ?? FOTO_JPEG.a1;
    const gW = Math.min(w0 - 16, 32);
    doc.addImage(foto, "JPEG", x0 + (w0 - gW) / 2, atas + 5, gW, gW);
    let yCh = atas + 5 + gW + 6;
    set(sLabel, true, true, HITAM);
    for (const baris of pecah("Key Communication Channel:", sLabel, w0 - PAD * 2 - 2, true, true)) {
      doc.text(baris, x0 + PAD + 1, yCh + sLabel * PT * 0.95);
      yCh += lh(sLabel);
    }
    set(sKecil, false, false, HITAM);
    for (const baris of pecah(b.channel, sKecil, w0 - PAD * 2 - 2)) {
      if (yCh + lh(sKecil) > atas + total - 2) break;
      doc.text(baris, x0 + PAD + 1, yCh + sKecil * PT * 0.95);
      yCh += lh(sKecil);
    }

    // Kepala biru.
    let cy = atas;
    kotak(x1, cy, w1 + w2, tJudul, BIRU);
    set(sJudul, true, true, PUTIH);
    doc.text("Audience Profile", x1 + (w1 + w2) / 2, cy + tJudul / 2 + sJudul * PT * 0.36, {
      align: "center",
    });
    cy += tJudul;

    // Description.
    kotak(x1, cy, w1 + w2, tDesc);
    set(s, true, true, HITAM);
    doc.text("Description:", x1 + PAD, cy + PAD + s * PT * 0.95);
    set(s, false, false, HITAM);
    let yd = cy + PAD + lh(s);
    for (const baris of barisDesc) {
      doc.text(baris, x1 + PAD, yd + s * PT * 0.95);
      yd += lh(s);
    }
    cy += tDesc;

    // Tiga blok berwarna: demografi, psikografi, pain points.
    const gambarPasangan = (isi: ReturnType<typeof pasangan>, yMulai: number) => {
      let yi = yMulai;
      for (const { k, wk, baris } of isi) {
        set(sKecil, false, true, HITAM);
        doc.text(`${k}:`, x2 + PAD, yi + sKecil * PT * 0.95);
        set(sKecil, false, false, HITAM);
        for (const baris1 of baris) {
          doc.text(baris1, x2 + PAD + wk, yi + sKecil * PT * 0.95);
          yi += lh(sKecil);
        }
      }
    };

    for (const [judul, warna, tinggi, jenis] of [
      ["Key Demographic", HIJAU, tDemo, "demo"],
      ["Key Psychographic", SALEM, tPsy, "psy"],
      ["Customer Pain Points", LANGIT, tPain, "pain"],
    ] as [string, [number, number, number], number, string][]) {
      kotak(x1, cy, w1, tinggi, warna);
      kotak(x2, cy, w2, tinggi, warna);
      set(s, true, true, HITAM);
      for (const [i, baris] of pecah(judul, s, w1 - PAD * 2, true, true).entries()) {
        doc.text(baris, x1 + PAD, cy + PAD + i * lh(s) + s * PT * 0.95);
      }
      if (jenis === "pain") {
        set(sKecil, false, false, HITAM);
        let yi = cy + PAD;
        for (const baris of barisPain) {
          doc.text(baris, x2 + PAD, yi + sKecil * PT * 0.95);
          yi += lh(sKecil);
        }
      } else {
        gambarPasangan(jenis === "demo" ? isiDemo : isiPsy, cy + PAD);
      }
      cy += tinggi;
    }
    y = atas + total + 6;
  };

  const blokAnalysis = (b: Extract<DocBlock, { type: "analysis" }>) => {
    const w0 = CONTENT_W * 0.3441;
    const w1 = CONTENT_W * 0.2462;
    const w2 = CONTENT_W - w0 - w1;
    const x0 = MARGIN;
    const x1 = x0 + w0;
    const x2 = x1 + w1;
    const s = 13;
    // Isi jawaban jauh lebih panjang daripada teks contoh pada template,
    // jadi ukurannya dirapatkan supaya tidak hanya satu baris per halaman.
    const sIsi = 10;

    const judulKepala: [number, number, Rich][] = [
      [x0, w0, b.observation.title],
      [x1, w1, "Elemen yang Dianalisis"],
      [x2, w2, "Hasil Analisis"],
    ];
    // Kepala tabel bisa lebih dari satu baris, jadi tingginya ikut diukur.
    const tinggiKepala =
      Math.max(...judulKepala.map(([, w, t]) => richTinggi(t, s, w - PAD * 2))) + PAD * 2;

    const barisPengamatan = b.observation.lines.flatMap((l) => pecah(l, sIsi, w0 - PAD * 2));

    // Hitung tinggi tiap baris lebih dulu, lalu bagi ke halaman.
    const ukur = b.rows.map((r) => {
      const isi = pecah(r.value, sIsi, w2 - PAD * 2);
      const tLabel = richTinggi(r.label, s, w1 - PAD * 2);
      return {
        row: r,
        isi,
        tinggi: Math.max(tLabel, isi.length * lh(sIsi)) + PAD * 2 + 1,
      };
    });

    const kepala = () => {
      for (const [x, w, t] of judulKepala) {
        kotak(x, y, w, tinggiKepala, BIRU);
        richKiri(t, s, x + PAD, w - PAD * 2, PUTIH, y + PAD);
      }
      y += tinggiKepala;
    };

    let i = 0;
    // Penunjuk baris kolom pengamatan; isinya diteruskan ke potongan halaman
    // berikutnya bila tidak habis, bukan dipotong begitu saja.
    let oi = 0;
    while (i < ukur.length) {
      if (y + tinggiKepala + ukur[i].tinggi > PAGE_H - MARGIN) halamanBaru();
      kepala();

      // Kumpulkan baris yang muat di halaman ini.
      const potong: typeof ukur = [];
      let tinggiTotal = 0;
      while (i < ukur.length && y + tinggiTotal + ukur[i].tinggi <= PAGE_H - MARGIN) {
        tinggiTotal += ukur[i].tinggi;
        potong.push(ukur[i]);
        i++;
      }
      if (potong.length === 0) {
        // Baris tunggal lebih tinggi dari satu halaman: tetap digambar apa adanya.
        potong.push(ukur[i]);
        tinggiTotal = ukur[i].tinggi;
        i++;
      }

      // Pada potongan terakhir, catatan pengamatan yang masih tersisa bisa lebih
      // tinggi daripada kumpulan barisnya. Baris terakhir dipanjangkan supaya
      // catatan itu muat utuh dan tabel tetap rata di bawah.
      if (i >= ukur.length) {
        const sisa = (barisPengamatan.length - oi) * lh(sIsi) + PAD * 2;
        const kurang = sisa - tinggiTotal;
        const ruang = PAGE_H - MARGIN - y - tinggiTotal;
        if (kurang > 0) {
          const tambah = Math.min(kurang, Math.max(ruang, 0));
          potong[potong.length - 1].tinggi += tambah;
          tinggiTotal += tambah;
        }
      }

      // Kolom pengamatan menyatu untuk seluruh baris di halaman ini.
      kotak(x0, y, w0, tinggiTotal);
      set(sIsi, false, false, HITAM);
      let yo = y + PAD;
      while (oi < barisPengamatan.length && yo + lh(sIsi) <= y + tinggiTotal) {
        doc.text(barisPengamatan[oi], x0 + PAD, yo + sIsi * PT * 0.95);
        yo += lh(sIsi);
        oi++;
      }

      let cy = y;
      for (const u of potong) {
        kotak(x1, cy, w1, u.tinggi);
        kotak(x2, cy, w2, u.tinggi);
        richKiri(u.row.label, s, x1 + PAD, w1 - PAD * 2, HITAM, cy + PAD);
        set(sIsi, false, false, HITAM);
        let yi = cy + PAD;
        for (const baris of u.isi) {
          doc.text(baris, x2 + PAD, yi + sIsi * PT * 0.95);
          yi += lh(sIsi);
        }
        cy += u.tinggi;
      }
      y = cy;
    }
    y += 6;
  };

  /** Tabel dengan jumlah kolom bebas, mis. grid kalender konten. */
  const blokGrid = (b: Extract<DocBlock, { type: "grid" }>) => {
    const n = b.head?.length ?? b.rows[0]?.length ?? 1;
    const bobot = b.widths ?? Array(n).fill(1);
    const jumlah = bobot.reduce((a, x) => a + x, 0);
    const lebar = bobot.map((w) => (CONTENT_W * w) / jumlah);
    const x0 = (i: number) => MARGIN + lebar.slice(0, i).reduce((a, x) => a + x, 0);
    const s = 9;

    const tinggiKepala = b.head
      ? Math.max(...b.head.map((t, i) => richTinggi(t, s, lebar[i] - PAD * 2))) + PAD * 2
      : 0;

    const gambarKepala = () => {
      if (!b.head) return;
      b.head.forEach((t, i) => {
        kotak(x0(i), y, lebar[i], tinggiKepala, BIRU);
        richKiri(t, s, x0(i) + PAD, lebar[i] - PAD * 2, PUTIH, y + PAD);
      });
      y += tinggiKepala;
    };

    if (b.head) {
      muat(tinggiKepala + 12);
      gambarKepala();
    }

    for (const baris of b.rows) {
      const sel = baris.map((teks, i) => pecah(teks, s, lebar[i] - PAD * 2));
      const tinggi = Math.max(...sel.map((l) => l.length)) * lh(s) + PAD * 2;
      // Baris yang tidak muat pindah halaman bersama kepala tabelnya, supaya
      // tidak ada baris yang berdiri sendiri tanpa nama kolom.
      if (y + tinggi > PAGE_H - MARGIN) {
        halamanBaru();
        gambarKepala();
      }
      sel.forEach((baris1, i) => {
        kotak(x0(i), y, lebar[i], tinggi);
        set(s, i === 0, false, HITAM);
        let yi = y + PAD;
        for (const t of baris1) {
          doc.text(t, x0(i) + PAD, yi + s * PT * 0.95);
          yi += lh(s);
        }
      });
      y += tinggi;
    }

    if (b.caption) {
      y += 2;
      set(8.5, false, true, ABU);
      doc.text(b.caption, MARGIN, y + 3);
      y += 5;
    }
    y += 6;
  };

  /* ---------------- jalankan ---------------- */

  for (const block of blocks) {
    switch (block.type) {
      case "title":
        blokJudul(block.text);
        break;
      case "byline":
        blokByline(block.text);
        break;
      case "label":
        blokLabel(block.text);
        break;
      case "fieldTable":
        blokFieldTable(block.rows, block.labelAlign ?? "center");
        break;
      case "profile":
        blokProfile(block);
        break;
      case "analysis":
        blokAnalysis(block);
        break;
      case "grid":
        blokGrid(block);
        break;
      case "pageBreak":
        halamanBaru();
        break;
    }
  }

  // Kode penilaian kecil di kaki tiap halaman, untuk pemeriksa.
  if (kodeNilai) {
    const total = doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      doc.setPage(i);
      set(5.5, false, false, SAMAR);
      doc.text(kodeNilai, PAGE_W - MARGIN, PAGE_H - 8, { align: "right" });
      set(7, false, false, SAMAR);
      doc.text(`Halaman ${i} dari ${total}`, MARGIN, PAGE_H - 8);
    }
  }

  doc.setProperties({
    title: fileBaseName,
    subject: "Tugas Praktik Mandiri",
    keywords: kodeNilai ?? "",
  });

  downloadBlob(doc.output("blob"), `${safeFileName(fileBaseName)}.pdf`);
}
