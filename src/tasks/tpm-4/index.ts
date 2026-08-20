import {
  BRAND_WARNA,
  KODE_KELAS,
  type BuildContext,
  type DesignLayer,
  type DesignSpec,
  type DocBlock,
  type Rich,
  type TaskDefinition,
} from "../types";
import { tpm4Groups } from "./bank";

const BRAND = "FitActive";

const judulDokumen: Rich = [
  { text: "Desain Konten Visual " },
  { text: BRAND, italic: false },
];

/** Isi field sebuah grup pada tugas ini. */
function f(ctx: BuildContext, groupId: string, key: string, fallback = "Belum dijawab"): string {
  const v = ctx.answers[groupId]?.variant.fields?.[key];
  return v !== undefined ? ctx.fill(v) : fallback;
}

/** Jawaban lengkap sebuah grup: judul lalu poin-poinnya. */
function uraian(ctx: BuildContext, groupId: string): string {
  const a = ctx.answers[groupId];
  if (!a) return "Belum dijawab";
  const isi = a.variant.fields?.isi ? `${ctx.fill(a.variant.fields.isi)}\n` : "";
  return `${ctx.fill(a.variant.headline)}\n${isi}${a.variant.points.map((p) => `• ${ctx.fill(p)}`).join("\n")}`;
}

/** Mengubah nama warna Brand Guideline menjadi kode hex. */
function hex(nama: string): string {
  if (nama.startsWith("#")) return nama;
  return (BRAND_WARNA as Record<string, string>)[nama] ?? BRAND_WARNA.planBlue;
}

/* ------------------------------------------------------------------ */
/* Penyusun desain                                                     */
/* ------------------------------------------------------------------ */

/** Ukuran kanvas: mengikuti tipe visual rancangan, kecuali peserta memaksa lain. */
function ukuranKanvas(ctx: BuildContext): { w: number; h: number; nama: string } {
  const mode = f(ctx, "format", "mode", "auto");
  if (mode === "persegi") return { w: 1080, h: 1080, nama: "Persegi 1:1" };
  if (mode === "vertikal") return { w: 1080, h: 1920, nama: "Vertikal 9:16" };
  const tipe = ctx.fill("{{tipeKonten}}").toLowerCase();
  return /reels|story|video|vertikal/.test(tipe)
    ? { w: 1080, h: 1920, nama: "Vertikal 9:16" }
    : { w: 1080, h: 1080, nama: "Persegi 1:1" };
}

/** Jumlah lembar: carousel mengikuti jumlah halaman pada rancangan TPM 3. */
function jumlahLembar(ctx: BuildContext): number {
  const tipe = ctx.fill("{{tipeKonten}}").toLowerCase();
  if (!tipe.includes("carousel")) return 1;
  const angka = tipe.match(/(\d+)\s*halaman/);
  // Dibatasi 6 supaya jumlah berkas unduhan tetap wajar.
  return angka ? Math.min(Math.max(Number(angka[1]), 2), 6) : 3;
}

/**
 * Isi tiap lembar: pembuka, isi, lalu penutup. Pada carousel, ajakan peserta
 * pindah ke lembar terakhir dan lembar pertama memakai penanda geser.
 */
function isiLembarUntuk(
  judul: string,
  pendukung: string,
  cta: string,
  ke: number,
  total: number
): { atas: string; tengah: string; bawah: string } {
  if (total === 1) return { atas: judul, tengah: pendukung, bawah: cta };
  if (ke === 0) return { atas: judul, tengah: pendukung, bawah: "Geser ke samping" };
  if (ke === total - 1) return { atas: cta || "Simpan konten ini", tengah: pendukung, bawah: BRAND };
  return { atas: `${ke + 1}`, tengah: pendukung, bawah: BRAND };
}

/**
 * Menyusun satu lembar desain.
 *
 * Bentuknya ditentukan jawaban peserta: "pola" mengatur susunan, warna diambil
 * dari Brand Guideline, dan teksnya dari jawaban grup teks. Pola dari jawaban
 * yang keliru sengaja digambar apa adanya, supaya peserta melihat sendiri
 * akibatnya pada desain.
 */
function susunLembar(ctx: BuildContext, ke: number, total: number): DesignSpec {
  const { w, h, nama: namaUkuran } = ukuranKanvas(ctx);
  const pola = f(ctx, "layout", "pola", "atas");
  const persen = Number(f(ctx, "safeZone", "margin", "10")) || 0;
  const m = Math.round((Math.min(w, h) * persen) / 100);
  const safeZone = { top: m, bottom: m, left: m, right: m };

  const latar = hex(f(ctx, "warna", "latar", "planBlue"));
  const warnaJudul = hex(f(ctx, "warna", "judul", "white"));
  const aksen = hex(f(ctx, "warna", "aksen", "yellow"));
  const teksAksen = hex(f(ctx, "warna", "teksAksen", "black"));

  const judul = f(ctx, "teks", "judul", "");
  const pendukung = f(ctx, "teks", "pendukung", "");
  const cta = f(ctx, "teks", "cta", "");
  const pilar = ctx.fill("{{pilarKonten}}");

  const isiLembar = isiLembarUntuk(judul, pendukung, cta, ke, total);

  const isi = w - m * 2;
  const layers: DesignLayer[] = [];
  const teksJudul = (y: number, size: number, align: "left" | "center" = "left") =>
    layers.push({
      type: "text",
      x: m,
      y,
      w: isi,
      text: isiLembar.atas,
      size,
      color: warnaJudul,
      font: "judul",
      weight: "bold",
      align,
      leading: 1.15,
    });
  const teksPendukung = (y: number, size: number, warna = warnaJudul, align: "left" | "center" = "left") =>
    layers.push({
      type: "text",
      x: m,
      y,
      w: isi,
      text: isiLembar.tengah,
      size,
      color: warna,
      font: "teks",
      align,
      leading: 1.4,
    });
  const blokCta = (y: number, tinggi: number) => {
    if (!isiLembar.bawah) return;
    layers.push({ type: "rect", x: m, y, w: isi, h: tinggi, fill: aksen, radius: Math.round(tinggi / 4) });
    layers.push({
      type: "text",
      x: m,
      y: y + tinggi / 2 - h * 0.022,
      w: isi,
      text: isiLembar.bawah,
      size: Math.round(h * 0.032),
      color: teksAksen,
      font: "judul",
      weight: "bold",
      align: "center",
    });
  };

  const S = (bagian: number) => Math.round(h * bagian);

  // Ukuran kolom pola "belah", dipakai juga saat menempatkan wordmark.
  const kolomKiri = Math.round(w * 0.52);
  const selaBelah = Math.round(w * 0.04);

  switch (pola) {
    case "bawah":
      layers.push({ type: "rect", x: 0, y: S(0.52), w, h: h - S(0.52), fill: aksen });
      teksJudul(S(0.58), S(0.075));
      teksPendukung(S(0.78), S(0.03), teksAksen);
      blokCta(h - m - S(0.09), S(0.09));
      break;

    case "tengah":
      teksPendukung(S(0.34), S(0.028), warnaJudul, "center");
      teksJudul(S(0.42), S(0.08), "center");
      blokCta(h - m - S(0.09), S(0.09));
      break;

    case "pita": {
      // Pita ikut melebar bila peserta memilih safe zone yang lebih longgar,
      // supaya label pilarnya tetap berada di dalam pita sekaligus di dalam batas aman.
      const tinggiPita = Math.max(S(0.13), m + S(0.05));
      layers.push({ type: "rect", x: 0, y: 0, w, h: tinggiPita, fill: aksen });
      layers.push({
        type: "text", x: m, y: Math.max(S(0.05), m), w: isi, text: pilar.toUpperCase(),
        size: S(0.028), color: teksAksen, font: "judul", weight: "bold",
      });
      teksJudul(Math.max(S(0.2), tinggiPita + S(0.05)), S(0.075));
      teksPendukung(S(0.46), S(0.03));
      blokCta(h - m - S(0.085), S(0.085));
      break;
    }

    case "angka":
      layers.push({
        type: "text", x: m, y: S(0.16), w: isi, text: isiLembar.atas.slice(0, 4),
        size: S(0.2), color: aksen, font: "judul", weight: "bold",
      });
      teksPendukung(S(0.45), S(0.036));
      blokCta(h - m - S(0.09), S(0.09));
      break;

    case "belah":
      layers.push({ type: "rect", x: kolomKiri, y: 0, w: w - kolomKiri, h, fill: aksen });
      layers.push({
        type: "text", x: m, y: S(0.24), w: kolomKiri - m - selaBelah, text: isiLembar.atas,
        size: S(0.055), color: warnaJudul, font: "judul", weight: "bold", leading: 1.15,
      });
      layers.push({
        type: "text", x: kolomKiri + selaBelah, y: S(0.3), w: w - kolomKiri - selaBelah - m,
        text: isiLembar.tengah,
        size: S(0.028), color: teksAksen, font: "teks", leading: 1.4,
      });
      if (isiLembar.bawah) {
        layers.push({
          type: "text", x: m, y: h - m - S(0.05), w: kolomKiri - m * 2, text: isiLembar.bawah,
          size: S(0.032), color: aksen, font: "judul", weight: "bold",
        });
      }
      break;

    /* --- Pola dari jawaban yang keliru, digambar apa adanya --- */
    case "rata":
      teksJudul(S(0.2), S(0.035));
      teksPendukung(S(0.45), S(0.035));
      layers.push({
        type: "text", x: m, y: S(0.7), w: isi, text: isiLembar.bawah,
        size: S(0.035), color: warnaJudul, font: "teks",
      });
      break;

    case "padat":
      teksJudul(m, S(0.07));
      teksPendukung(S(0.3), S(0.032));
      layers.push({
        type: "text", x: m, y: S(0.62), w: isi,
        text: `${isiLembar.tengah} ${isiLembar.tengah}`,
        size: S(0.03), color: warnaJudul, font: "teks", leading: 1.15,
      });
      blokCta(h - m - S(0.08), S(0.08));
      break;

    case "dua":
      teksJudul(S(0.14), S(0.06));
      teksPendukung(S(0.38), S(0.03));
      layers.push({
        type: "text", x: m, y: S(0.56), w: isi, text: isiLembar.bawah,
        size: S(0.06), color: aksen, font: "judul", weight: "bold",
      });
      break;

    case "tumpuk":
      // Teks ditaruh langsung di atas latar tanpa alas, kontrasnya sengaja rendah.
      teksJudul(S(0.35), S(0.07));
      teksPendukung(S(0.6), S(0.03), latar);
      break;

    case "tepi":
      layers.push({
        type: "text", x: 4, y: 4, w: w - 8, text: isiLembar.atas,
        size: S(0.06), color: warnaJudul, font: "judul", weight: "bold", leading: 1.1,
      });
      layers.push({
        type: "text", x: 4, y: h - S(0.05), w: w - 8, text: isiLembar.bawah,
        size: S(0.032), color: aksen, font: "judul", weight: "bold",
      });
      break;

    case "acak":
      teksJudul(S(0.62), S(0.05));
      layers.push({
        type: "text", x: Math.round(w * 0.55), y: S(0.12), w: Math.round(w * 0.4),
        text: isiLembar.tengah, size: S(0.026), color: warnaJudul, font: "teks",
      });
      layers.push({
        type: "text", x: m, y: S(0.28), w: isi, text: isiLembar.bawah,
        size: S(0.04), color: aksen, font: "judul", weight: "bold",
      });
      break;

    case "atas":
    default:
      teksJudul(S(0.12), S(0.075));
      teksPendukung(S(0.42), S(0.032));
      blokCta(h - m - S(0.09), S(0.09));
      break;
  }

  // Pola yang benar wajib menghormati batas aman yang dipilih peserta. Pola dari
  // jawaban yang keliru sengaja dilewati: keluarnya unsur dari batas aman justru
  // kesalahan yang ingin diperlihatkan.
  if (["atas", "bawah", "tengah", "pita", "angka", "belah"].includes(pola)) {
    for (const l of layers) {
      if (l.type !== "text") continue;
      l.x = Math.max(l.x, m);
      l.y = Math.max(l.y, m);
      l.w = Math.min(l.w, w - m - l.x);
    }
  }

  // Wordmark brand. Setiap lembar wajib membawa identitas merek sesuai Brand
  // Guideline, jadi yang menyesuaikan adalah posisinya, bukan ada-tidaknya.
  const tempatWordmark = () => {
    // Pola yang memakai tombol ajakan: wordmark duduk tepat di atas tombol.
    if (["atas", "bawah", "tengah", "pita", "angka", "padat"].includes(pola)) {
      return { x: m, y: h - m - S(0.135), w: isi, color: pola === "bawah" ? teksAksen : warnaJudul };
    }
    switch (pola) {
      case "belah":
        return { x: m, y: m, w: kolomKiri - m * 2, color: warnaJudul };
      case "tepi":
        return { x: 4, y: S(0.8), w: w - 8, color: warnaJudul };
      default:
        return { x: m, y: h - m - S(0.035), w: isi, color: warnaJudul };
    }
  };
  const wm = tempatWordmark();
  layers.push({
    type: "text",
    x: wm.x,
    y: wm.y,
    w: wm.w,
    text: BRAND,
    size: S(0.026),
    color: wm.color,
    font: "judul",
    weight: "bold",
  });

  return {
    name: total > 1 ? `lembar-${ke + 1}` : "desain",
    label: total > 1 ? `Lembar ${ke + 1} dari ${total} · ${namaUkuran}` : namaUkuran,
    width: w,
    height: h,
    background: latar,
    layers,
    safeZone,
  };
}

/* ------------------------------------------------------------------ */

const tpm4: TaskDefinition = {
  id: "tpm-4",
  navLabel: "Tugas 4",
  code: "TPM 4",
  title: "Mendesain Konten Visual",
  subtitle: "Format, tata letak, warna Brand Guideline, safe zone, dan ekspor PNG",
  available: true,
  dependsOn: "tpm-3",
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Mendesain Konten Visual di Canva",
    tujuan:
      "Peserta mampu menerjemahkan rancangan konten menjadi konten visual, menyelaraskan desain dengan objective dan strategi konten, mengoperasikan tools desain, serta menerapkan prinsip desain content marketing, format konten, dan safe zone.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang Social Media Specialist di sebuah perusahaan bernama “FitActive”. Setelah menyusun content plan dan merancang ide konten secara detail, perusahaan ingin memastikan konten tersebut dapat diwujudkan dalam bentuk desain visual yang siap dipublikasikan.",
      "Sebagai bagian dari tim Social Media Specialist, kamu ditugaskan untuk menggunakan rancangan konten yang sudah dibuat pada praktik sebelumnya, lalu mendesain konten visualnya sesuai rancangan itu.",
      "Desain harus mengikuti Brand Guideline: warna dari palet resmi, judul memakai font Poppins, dan teks memakai font Arial.",
    ],
  },
  brandGuide: {
    judul: "Brand Guideline",
    pengantar:
      "Semua desain pada tugas ini mengikuti panduan merek berikut. Warna diambil dari palet resmi, judul memakai Poppins, dan teks isi memakai Arial. Pilihan yang kamu ambil di bawah akan langsung memakai warna dan font ini.",
    warna: [
      { kunci: "planBlue", nama: "Plan Blue" },
      { kunci: "lightBlue", nama: "Light Blue" },
      { kunci: "darkBlue", nama: "Dark Blue" },
      { kunci: "orange", nama: "Orange" },
      { kunci: "yellow", nama: "Yellow" },
      { kunci: "magenta", nama: "Magenta" },
      { kunci: "purple", nama: "Purple" },
      { kunci: "green", nama: "Green" },
      { kunci: "red", nama: "Red" },
      { kunci: "black", nama: "Black" },
      { kunci: "white", nama: "White" },
      { kunci: "lightGrey", nama: "Light Grey" },
    ],
    font: [
      { peran: "Judul", nama: "Poppins Bold", contoh: "Bahan yang bikin gerah" },
      { peran: "Teks isi", nama: "Arial Regular", contoh: "Pilih bahan yang benar-benar menyerap keringat." },
    ],
    catatan: [
      "Warna latar dan warna teks harus cukup kontras. Teks terang di atas latar gelap, atau sebaliknya.",
      "Pakai satu warna aksen saja per desain, untuk menandai bagian yang paling penting.",
      "Merah dan hijau dipakai terbatas, karena keduanya membawa arti peringatan dan keberhasilan.",
      "Wordmark FitActive selalu ikut tampil di setiap lembar desain.",
    ],
  },
  instructionSummary: [
    "Terjemahkan rancangan konten menjadi desain visual dengan menerapkan prinsip desain content marketing.",
    "Perhatikan format konten dan safe zone agar desain tampil optimal dan tidak tertutup antarmuka platform.",
    "Periksa konsistensi desain, kejelasan pesan, dan relevansinya dengan objective, lalu ekspor sebagai PNG.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm4-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm4-${nama}`,
    notes: [
      "Serahkan hasil desain dalam format PNG. Untuk konten carousel, kumpulkan seluruh lembarnya.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm4-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm4-Putri Amalia.png`,
      "Berkas PDF berisi spesifikasi desain dan resep Canva, untuk membuat ulang desain yang sama di Canva.",
    ],
  },

  /**
   * Token diambil dari TPM 3 lewat ctx.sumber. Karena TPM 3 sendiri memakai
   * TPM 2, memanggil fill() miliknya sudah menghasilkan nilai yang tersambung
   * sampai content plan.
   */
  tokens: (ctx) => {
    const dari = (t: string, fallback: string) => {
      const v = ctx.sumber?.fill(t);
      return v && !v.includes("{{") ? v : fallback;
    };
    const hookIsi = ctx.sumber?.answers["hook"]?.variant.fields?.isi;
    return {
      nama: ctx.nama,
      brand: BRAND,
      judulKonten: dari("{{judulKonten}}", "konten yang dipilih"),
      pilarKonten: dari("{{pilarKonten}}", "-"),
      tipeKonten: dari("{{tipeKonten}}", "Feed"),
      platformKonten: dari("{{platformKonten}}", "Instagram"),
      objectiveKonten: dari("{{objectiveKonten}}", "objective yang ditetapkan"),
      hookKonten: hookIsi && ctx.sumber ? ctx.sumber.fill(hookIsi) : "Hook dari rancangan konten",
    };
  },

  downloads: ["png", "pdf"],

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Tentukan Format dan Tata Letak",
      brief: [
        "Tentukan format dan ukuran kanvas sesuai tipe visual pada rancanganmu.",
        "Pilih susunan tata letak yang membuat hierarki visualnya jelas.",
      ],
      groups: tpm4Groups.slice(0, 2),
    },
    {
      id: "step-2",
      number: 2,
      title: "Tentukan Warna dan Teks Desain",
      brief: [
        "Pilih kombinasi warna dari Brand Guideline: Plan Blue, Light Blue, Orange, Yellow, Purple, Magenta, Dark Blue, Green, Red, serta netral hitam, putih, dan Light Grey.",
        "Tentukan teks yang tampil di desain. Naskah panjang tempatnya di caption, bukan di gambar.",
      ],
      groups: tpm4Groups.slice(2, 4),
    },
    {
      id: "step-3",
      number: 3,
      title: "Safe Zone dan Finalisasi",
      brief: [
        "Tentukan batas aman agar unsur penting tidak tertutup antarmuka platform.",
        "Periksa konsistensi desain, kejelasan pesan, dan relevansinya dengan objective sebelum diekspor.",
      ],
      groups: tpm4Groups.slice(4, 6),
    },
  ],

  buildDesigns: (ctx) => {
    const total = jumlahLembar(ctx);
    return Array.from({ length: total }, (_, i) => susunLembar(ctx, i, total));
  },

  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const { w, h, nama: namaUkuran } = ukuranKanvas(ctx);
    const total = jumlahLembar(ctx);
    const persen = f(ctx, "safeZone", "margin", "10");
    const m = Math.round((Math.min(w, h) * Number(persen)) / 100);
    const isiLebar = w - m * 2;

    const namaWarna = (kunci: string, bawaan: string) => {
      const v = f(ctx, "warna", kunci, bawaan);
      return `${v} (${hex(v)})`;
    };

    b.push({ type: "title", text: judulDokumen });
    b.push({ type: "byline", text: `Nama Peserta: ${ctx.nama}` });

    b.push({ type: "label", text: "Konten yang Didesain" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        { label: "Judul Konten", value: ctx.fill("{{judulKonten}}") },
        { label: "Pilar Konten", value: ctx.fill("{{pilarKonten}}") },
        { label: "Tipe Visual pada Rancangan", value: ctx.fill("{{tipeKonten}}") },
        { label: "Platform", value: ctx.fill("{{platformKonten}}") },
        { label: "Marketing Objective", value: ctx.fill("{{objectiveKonten}}") },
        { label: "Hook pada Rancangan", value: ctx.fill("{{hookKonten}}") },
      ],
    });

    /* ---- Resep Canva: cukup rinci untuk membuat ulang desain yang sama ---- */
    // Angka pada resep dibaca balik dari lembar yang benar-benar digambar, jadi
    // resep dan gambarnya tidak mungkin berbeda meski pola tata letaknya berubah.
    const lembar1 = susunLembar(ctx, 0, total);
    const teksLayer = lembar1.layers.filter(
      (l): l is Extract<DesignLayer, { type: "text" }> => l.type === "text"
    );
    const judulTeks = f(ctx, "teks", "judul", "");
    const pendukungTeks = f(ctx, "teks", "pendukung", "");
    const ctaTeks = f(ctx, "teks", "cta", "");
    const cari = (isi: string) => (isi ? teksLayer.find((l) => l.text === isi) : undefined);
    const lJudul =
      cari(judulTeks) ??
      teksLayer.find((l) => l.font === "judul" && l.weight === "bold" && l.text !== BRAND && l.text !== ctaTeks);
    const lPendukung = cari(pendukungTeks) ?? teksLayer.find((l) => l.font === "teks");
    const isi1 = isiLembarUntuk(judulTeks, pendukungTeks, ctaTeks, 0, total);
    const lCta = cari(isi1.bawah);
    const lWordmark = teksLayer.find((l) => l.text === BRAND);
    const kotakCta = lembar1.layers.find(
      (l): l is Extract<DesignLayer, { type: "rect" }> => l.type === "rect" && Boolean(l.radius)
    );
    const posisi = (l?: { x: number; y: number }) =>
      l ? `di posisi x ${l.x} px, y ${l.y} px` : "di dalam garis bantu";

    // Pada carousel, teks penutup lembar 1 bukan ajakan peserta, jadi disebutkan
    // apa adanya lalu ditambah keterangan di mana ajakannya benar-benar muncul.
    const catatanCarousel =
      total > 1
        ? ` Ajakan “${ctaTeks}” sendiri ditempatkan sebagai judul pada lembar ${total}, lembar terakhir carousel.`
        : "";
    const langkahCta: string = kotakCta && lCta
      ? `Tambahkan rectangle sudut membulat ${kotakCta.w} x ${kotakCta.h} px, warna ${kotakCta.fill}, ` +
        `di posisi x ${kotakCta.x} px, y ${kotakCta.y} px. Teks di dalamnya rata tengah, ` +
        `Poppins Bold ${lCta.size} px, warna ${lCta.color}, berbunyi “${isi1.bawah}”.${catatanCarousel}`
      : lCta
        ? `Tata letak ini menulis teks penutup tanpa kotak: Poppins Bold ${lCta.size} px, ` +
          `warna ${lCta.color}, ${posisi(lCta)}, berbunyi “${isi1.bawah}”.${catatanCarousel}`
        : `Tata letak ini tidak menaruh teks penutup di lembar ini.${catatanCarousel || " Tulis ajakannya di caption unggahan."}`;

    b.push({ type: "pageBreak" });
    b.push({ type: "label", text: "Resep Canva — Membuat Ulang Desain Ini" });
    b.push({
      type: "grid",
      head: ["Langkah", "Yang Dilakukan di Canva"],
      widths: [1, 3],
      rows: [
        [
          "1. Buat kanvas",
          `Custom size ${w} x ${h} px (${namaUkuran}). Untuk carousel, buat ${total} halaman dengan ukuran yang sama.`,
        ],
        [
          "2. Warna latar",
          `Klik latar, pilih warna kustom, masukkan kode ${hex(f(ctx, "warna", "latar", "planBlue"))}. Kode ini diambil dari Brand Guideline.`,
        ],
        [
          "3. Pasang garis bantu",
          `File > Settings > Show rulers and guides, lalu tarik garis bantu ${m} px dari tiap tepi. Semua teks dan tombol harus berada di dalam garis itu.`,
        ],
        [
          "4. Teks judul",
          `Tambahkan teks, font Poppins Bold, ukuran ${lJudul?.size ?? Math.round(h * 0.075)} px, warna ${lJudul?.color ?? hex(f(ctx, "warna", "judul", "white"))}, lebar kotak teks ${lJudul?.w ?? isiLebar} px, ${posisi(lJudul)}. Isi: “${judulTeks}”`,
        ],
        [
          "5. Teks pendukung",
          `Tambahkan teks kedua, font Arial, ukuran ${lPendukung?.size ?? Math.round(h * 0.032)} px, warna ${lPendukung?.color ?? hex(f(ctx, "warna", "judul", "white"))}, lebar kotak teks ${lPendukung?.w ?? isiLebar} px, ${posisi(lPendukung)}. Isi: “${pendukungTeks}”`,
        ],
        ["6. Ajakan (CTA)", langkahCta],
        [
          "7. Wordmark brand",
          `Tambahkan teks “${BRAND}” dengan font Poppins Bold ukuran ${lWordmark?.size ?? Math.round(h * 0.026)} px, warna ${lWordmark?.color ?? hex(f(ctx, "warna", "judul", "white"))}, ${posisi(lWordmark)}. Wordmark ikut tampil di setiap lembar.`,
        ],
        [
          "8. Ekspor",
          "Share > Download > pilih PNG, centang Transparent background bila perlu, lalu unduh. Untuk carousel, unduh seluruh halaman.",
        ],
      ],
      caption:
        "Ikuti langkah ini di Canva bila kamu ingin melatih fitur-fiturnya sendiri. Hasilnya sama dengan PNG yang bisa langsung diunduh dari halaman ini.",
    });

    /* ---- Spesifikasi dan alasan pilihan ---- */
    b.push({ type: "pageBreak" });
    b.push({ type: "label", text: "Spesifikasi Desain" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        { label: "Ukuran Kanvas", value: `${w} x ${h} px · ${namaUkuran} · ${total} lembar · format PNG` },
        {
          label: "Warna",
          value: [
            `Latar: ${namaWarna("latar", "planBlue")}`,
            `Judul: ${namaWarna("judul", "white")}`,
            `Aksen: ${namaWarna("aksen", "yellow")}`,
            `Teks di atas aksen: ${namaWarna("teksAksen", "black")}`,
          ].join("\n"),
        },
        { label: "Font", value: "Judul: Poppins (Bold)\nTeks: Arial" },
        { label: "Safe Zone", value: `${persen}% dari tiap tepi, setara ${m} px` },
        {
          label: "Teks pada Desain",
          value: [
            `Judul: ${f(ctx, "teks", "judul", "")}`,
            `Pendukung: ${f(ctx, "teks", "pendukung", "")}`,
            `CTA: ${f(ctx, "teks", "cta", "") || "(tidak ada)"}`,
          ].join("\n"),
        },
      ],
    });

    b.push({ type: "label", text: "Alasan Pilihan Desain" });
    b.push({
      type: "analysis",
      observation: {
        title: [{ text: "Rancangan Sumber" }],
        lines: [
          ctx.fill("{{judulKonten}}"),
          "",
          `Pilar: ${ctx.fill("{{pilarKonten}}")}`,
          `Tipe visual: ${ctx.fill("{{tipeKonten}}")}`,
          `Objective: ${ctx.fill("{{objectiveKonten}}")}`,
        ],
      },
      rows: [
        { label: "Format Konten", value: uraian(ctx, "format") },
        { label: "Tata Letak", value: uraian(ctx, "layout") },
        { label: "Warna", value: uraian(ctx, "warna") },
        { label: "Teks", value: uraian(ctx, "teks") },
        { label: "Safe Zone", value: uraian(ctx, "safeZone") },
        { label: "Finalisasi", value: uraian(ctx, "finalisasi") },
      ],
    });

    return b;
  },
};

export default tpm4;
