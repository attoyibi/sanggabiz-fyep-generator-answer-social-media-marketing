import type { DesignSpec } from "@/tasks/types";
import { downloadBlob, safeFileName } from "../download";

/** Keluarga font sesuai Brand Guideline: judul Poppins, teks Arial. */
const KELUARGA = {
  judul: '"Poppins", "Inter", sans-serif',
  teks: 'Arial, "Helvetica Neue", sans-serif',
} as const;

/**
 * Menggambar satu desain ke canvas.
 *
 * Dipakai dua tempat: saat peserta mengunduh PNG, dan saat pratinjau di layar.
 * Ukuran kanvasnya memakai piksel sebenarnya, jadi hasil unduhannya sudah pada
 * ukuran tayang yang benar tanpa perlu diperbesar lagi.
 */
export function gambarDesain(canvas: HTMLCanvasElement, spec: DesignSpec): void {
  canvas.width = spec.width;
  canvas.height = spec.height;
  const c = canvas.getContext("2d");
  if (!c) return;

  c.fillStyle = spec.background;
  c.fillRect(0, 0, spec.width, spec.height);

  for (const l of spec.layers) {
    if (l.type === "rect") {
      c.fillStyle = l.fill;
      if (l.radius) {
        const r = Math.min(l.radius, l.w / 2, l.h / 2);
        c.beginPath();
        c.moveTo(l.x + r, l.y);
        c.arcTo(l.x + l.w, l.y, l.x + l.w, l.y + l.h, r);
        c.arcTo(l.x + l.w, l.y + l.h, l.x, l.y + l.h, r);
        c.arcTo(l.x, l.y + l.h, l.x, l.y, r);
        c.arcTo(l.x, l.y, l.x + l.w, l.y, r);
        c.closePath();
        c.fill();
      } else {
        c.fillRect(l.x, l.y, l.w, l.h);
      }
      continue;
    }

    c.fillStyle = l.color;
    c.font = `${l.weight ?? "normal"} ${l.size}px ${KELUARGA[l.font]}`;
    c.textAlign = l.align ?? "left";
    c.textBaseline = "top";

    // Pembungkus baris sederhana: kata demi kata sampai melewati lebar maksimum.
    const baris: string[] = [];
    for (const paragraf of l.text.split("\n")) {
      let kini = "";
      for (const kata of paragraf.split(" ")) {
        const coba = kini ? `${kini} ${kata}` : kata;
        if (c.measureText(coba).width > l.w && kini) {
          baris.push(kini);
          kini = kata;
        } else {
          kini = coba;
        }
      }
      baris.push(kini);
    }

    const lh = l.size * (l.leading ?? 1.25);
    const x = l.align === "center" ? l.x + l.w / 2 : l.x;
    baris.forEach((t, i) => c.fillText(t, x, l.y + i * lh));
  }
}

/**
 * Menyiapkan font sebelum menggambar. Tanpa ini, gambar pertama bisa memakai
 * font pengganti karena Poppins belum selesai diunduh peramban.
 */
async function siapkanFont(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return;
  try {
    await document.fonts.load('700 64px "Poppins"');
    await document.fonts.load('400 32px "Poppins"');
    await document.fonts.ready;
  } catch {
    /* Font gagal dimuat: gambar tetap dibuat memakai font pengganti. */
  }
}

export async function exportPng(
  designs: DesignSpec[],
  fileBaseName: string,
  /** Kode penilaian untuk pemeriksa, mis. "fyep-90". */
  kodeNilai?: string
): Promise<void> {
  await siapkanFont();
  const canvas = document.createElement("canvas");

  for (const [i, spec] of designs.entries()) {
    gambarDesain(canvas, spec);

    // Kode penilaian dicetak sangat kecil dan samar di pojok kanan bawah,
    // di luar safe zone supaya tidak mengganggu desainnya.
    if (kodeNilai) {
      const c = canvas.getContext("2d");
      if (c) {
        c.fillStyle = "rgba(0,0,0,0.16)";
        c.font = `normal ${Math.round(spec.width / 90)}px ${KELUARGA.teks}`;
        c.textAlign = "right";
        c.textBaseline = "bottom";
        c.fillText(kodeNilai, spec.width - 12, spec.height - 10);
      }
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png")
    );
    if (!blob) throw new Error("Gambar gagal dibuat oleh peramban.");

    const akhiran = designs.length > 1 ? `-${i + 1}` : "";
    downloadBlob(blob, `${safeFileName(fileBaseName)}${akhiran}.png`);
    // Peramban membatasi unduhan beruntun, jadi diberi jeda antarberkas.
    if (i < designs.length - 1) await new Promise((r) => setTimeout(r, 400));
  }
}
