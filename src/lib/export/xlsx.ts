import type { SheetSpec, SheetStyle } from "@/tasks/types";
import { downloadBlob, safeFileName } from "../download";

/* Warna template resmi, diambil dari styles.xml berkas template. */
const BIRU = "FF0072CE";
const KUNING = "FFFFD500";
const KREM = "FFFFF2CC";
const PUTIH = "FFFFFFFF";
const HITAM = "FF000000";
const GARIS = "FFBFBFBF";
/** Abu sangat muda untuk kode penilaian: terbaca bila dicari, tidak mencolok. */
const SAMAR = "FFC6CDD8";

const FONT = "Poppins";

interface Gaya {
  isi?: string;
  warna: string;
  tebal: boolean;
  ukuran: number;
  rata: "left" | "center";
  bergaris: boolean;
}

/** Peta gaya sel ke format Excel, meniru tampilan template. */
const GAYA: Record<SheetStyle, Gaya> = {
  judul: { isi: BIRU, warna: PUTIH, tebal: true, ukuran: 18, rata: "center", bergaris: false },
  kepala: { isi: BIRU, warna: PUTIH, tebal: true, ukuran: 11, rata: "center", bergaris: true },
  bulan: { isi: KUNING, warna: "FF0072CE", tebal: true, ukuran: 14, rata: "center", bergaris: false },
  hari: { isi: KUNING, warna: "FF0072CE", tebal: true, ukuran: 11, rata: "center", bergaris: true },
  tanggal: { isi: KREM, warna: HITAM, tebal: true, ukuran: 11, rata: "center", bergaris: true },
  isi: { warna: HITAM, tebal: false, ukuran: 10, rata: "left", bergaris: true },
  krem: { isi: KREM, warna: HITAM, tebal: false, ukuran: 10, rata: "left", bergaris: true },
  label: { warna: HITAM, tebal: true, ukuran: 11, rata: "left", bergaris: false },
  kosong: { warna: HITAM, tebal: false, ukuran: 10, rata: "left", bergaris: true },
};

export async function exportXlsx(
  sheets: SheetSpec[],
  fileBaseName: string,
  /** Kode penilaian untuk pemeriksa, mis. "fyep-90". */
  kodeNilai?: string
): Promise<void> {
  // exceljs adalah paket CommonJS: saat diimpor sebagai ESM, isinya ada di
  // .default. Bundler browser kadang sudah membuka pembungkus itu, jadi
  // keduanya perlu ditangani.
  const mod = await import("exceljs");
  const ExcelJS = ((mod as { default?: unknown }).default ?? mod) as typeof import("exceljs");
  const wb = new ExcelJS.Workbook();
  wb.creator = "Generator Tugas Praktik Mandiri";
  wb.title = fileBaseName;
  // Kode penilaian ikut ke properti berkas supaya pemeriksa bisa membacanya
  // secara massal tanpa membuka satu per satu.
  wb.keywords = kodeNilai ?? "";

  for (const spec of sheets) {
    const ws = wb.addWorksheet(spec.name, {
      views: [{ showGridLines: false }],
      pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
    });
    ws.columns = spec.columns.map((w) => ({ width: w }));

    spec.rows.forEach((baris, ri) => {
      const nomor = ri + 1;
      const row = ws.getRow(nomor);
      if (baris.height) row.height = baris.height;

      let kolom = 1;
      for (const sel of baris.cells) {
        const g = GAYA[sel.style ?? "isi"];
        const cell = row.getCell(kolom);
        cell.value = sel.text ?? "";
        cell.font = { name: FONT, size: g.ukuran, bold: g.tebal, color: { argb: g.warna } };
        cell.alignment = { vertical: "top", horizontal: g.rata, wrapText: true };
        if (g.isi) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: g.isi } };
        }
        if (g.bergaris) {
          const tepi = { style: "thin" as const, color: { argb: GARIS } };
          cell.border = { top: tepi, left: tepi, bottom: tepi, right: tepi };
        }
        if (sel.span && sel.span > 1) {
          ws.mergeCells(nomor, kolom, nomor, kolom + sel.span - 1);
          kolom += sel.span;
        } else {
          kolom += 1;
        }
      }
    });

    // Kode penilaian ditulis kecil di bawah tabel, jauh dari area kerja peserta.
    if (kodeNilai) {
      const baris = ws.getRow(spec.rows.length + 3);
      const cell = baris.getCell(1);
      cell.value = kodeNilai;
      cell.font = { name: FONT, size: 6, color: { argb: SAMAR } };
    }
  }

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  downloadBlob(blob, `${safeFileName(fileBaseName)}.xlsx`);
}
