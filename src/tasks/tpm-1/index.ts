import { KODE_KELAS, type BuildContext, type DocBlock, type Rich, type TaskDefinition } from "../types";
import { tpm1Groups } from "./bank";

const BRAND = "FitActive";

/** Teks cadangan saat segmen sumbernya belum dipilih peserta. */
const IKUT_DEMO = "mengikuti jawaban segmen Demographic";
const IKUT_PSYCHO = "mengikuti jawaban segmen Psychographic";

/** Judul template: kata "Brand" dicetak miring, sama seperti berkas aslinya. */
const judulAudiens: Rich = [
  { text: "Membuat Riset Target Audiens " },
  { text: "Brand ", italic: true },
  { text: BRAND },
];
const judulKompetitor: Rich = [
  { text: "Membuat Riset Kompetitor " },
  { text: "Brand ", italic: true },
  { text: BRAND },
];
/** Kepala kolom pertama pada tabel analisis, mengikuti template. */
const kepalaPengamatan: Rich = [
  { text: "Pengamatan", italic: true },
  { text: " Beberapa Konten " },
  { text: "Feed", italic: true },
];

/* ------------------------------------------------------------------ */
/* Pembantu penyusun dokumen                                           */
/* ------------------------------------------------------------------ */

/** Isi field sebuah grup, sudah melalui penggantian token. */
function f(ctx: BuildContext, groupId: string, key: string, fallback = "-"): string {
  const value = ctx.answers[groupId]?.variant.fields?.[key];
  return value ? ctx.fill(value) : fallback;
}

/** Isi salah satu blok pada grup gabungan (kartu "dual"). */
function blokGanda(ctx: BuildContext, groupId: string, kunci: "a" | "b"): string {
  return f(ctx, groupId, kunci, "Belum dijawab");
}

/** Ringkasan satu jawaban untuk sel tabel: headline diikuti poin-poinnya. */
function ringkas(ctx: BuildContext, groupId: string): string {
  const a = ctx.answers[groupId];
  if (!a) return "Belum dijawab";
  const poin = a.variant.points.map((p) => `• ${ctx.fill(p)}`).join("\n");
  return `${ctx.fill(a.variant.headline)}\n${poin}`;
}

/**
 * Isi kolom pengamatan pada tabel analisis.
 *
 * Template menyediakan kolom untuk tangkapan layar konten feed. Karena peserta
 * hanya memilih dan tidak menyiapkan gambar, kolom itu diisi catatan pengamatan
 * berbentuk uraian dengan susunan kolom yang sama persis.
 */
function barisPengamatan(ctx: BuildContext): string[] {
  const keys = ["konten1", "konten2", "konten3", "konten4"];
  const baris = keys
    .map((k) => f(ctx, "kompetitor", k, ""))
    .filter((v) => v.length > 0)
    .map((v, i) => {
      const [format, tema, pesan, cta] = v.split("|").map((x) => x.trim());
      return `${i + 1}. ${format ?? "-"} — ${tema ?? "-"}\n     Pesan: ${pesan ?? "-"}\n     CTA: ${cta ?? "-"}`;
    });
  // Kepala kolomnya sudah berbunyi "Pengamatan", jadi tidak perlu keterangan
  // penutup yang berulang di tiap tabel.
  return [`Akun: ${f(ctx, "kompetitor", "akun")}`, "", ...baris];
}

/* ------------------------------------------------------------------ */
/* Definisi tugas                                                      */
/* ------------------------------------------------------------------ */

const tpm1: TaskDefinition = {
  id: "tpm-1",
  navLabel: "Tugas 1",
  code: "TPM 1",
  title: "Riset Target Audiens dan Konten Kompetitor",
  subtitle: "Segmentasi audiens, profil audiens, dan riset konten kompetitor di Instagram",
  available: true,
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Merancang Strategi Marketing (Target Audiens & Kompetitor)",
    tujuan:
      "Peserta mampu mengidentifikasi target audiens sesuai tujuan bisnis, membuat profil audiens, menganalisis konten social media kompetitor, serta menemukan peluang dan inspirasi berdasarkan riset kompetitor.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang Social Media Specialist di sebuah perusahaan bernama “FitActive”. FitActive adalah brand pakaian olahraga lokal yang menawarkan koleksi pakaian dengan desain modern dan bahan berkualitas tinggi. Sejak berdiri pada tahun 2020, FitActive berfokus pada gaya hidup aktif dan sehat untuk masyarakat urban.",
      "Keunggulan utamanya ada tiga: Desain Fungsional, yaitu koleksi pakaian yang menggabungkan gaya dan kenyamanan; Bahan Berkualitas, yaitu material breathable yang mendukung aktivitas olahraga; serta Harga Terjangkau, yaitu produk lokal berkualitas tinggi dengan harga yang kompetitif.",
      "Saat ini kamu menghadapi tantangan untuk meningkatkan engagement di Instagram. Meskipun jumlah followers meningkat, interaksi pada setiap unggahan konten masih rendah. FitActive merasa kesulitan memahami siapa sebenarnya target audiens mereka dan seperti apa jenis konten yang sesuai dengan preferensi target market.",
      "Untuk menjawab tantangan ini, FitActive membutuhkan analisis target audiens yang spesifik dan juga riset konten kompetitor untuk menentukan strategi konten Instagram ke depannya.",
    ],
  },
  instructionSummary: [
    "Lakukan segmentasi target audiens yang relevan dengan produk FitActive, memakai segmen geographic, sociographic, demographic, behavioral, dan psychographic.",
    "Petakan hasil segmentasi menjadi daftar profil audiens: description, key demographic, key psychographic, customer pain points, dan key communication channel.",
    "Lakukan riset konten kompetitor memakai 4 langkah: identifikasi kompetitor utama, analisis konten kompetitor, identifikasi kekuatan dan kelemahan, serta temukan peluang dan inspirasi.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm1-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm1-${nama}`,
    notes: [
      "Kirimkan file dalam bentuk PDF yang berisi hasil riset target audiens dan riset konten kompetitor.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm1-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm1-Putri Amalia.pdf`,
      "Cek kembali kelengkapan dan kesesuaian jawaban sebelum dikirimkan.",
    ],
  },

  /**
   * Key Demographic dan Key Psychographic pada profil audiens wajib mengikuti
   * hasil segmentasi, bukan diacak sendiri. Nilainya diambil dari jawaban
   * segmen "demo" dan "psycho" lewat token di bawah ini.
   */
  tokens: (ctx) => ({
    nama: ctx.nama,
    brand: BRAND,
    kompetitor: ctx.answers["kompetitor"]?.variant.fields?.nama ?? "kompetitor utama",
    audiens: ctx.answers["profil"]?.variant.fields?.nama ?? "target audiens utama",
    channel: ctx.answers["profil"]?.variant.fields?.channel ?? "Instagram",
    // Cadangan dipakai hanya selama segmen terkait belum dipilih, mis. saat
    // peserta melihat kartu profil sebelum menjawab langkah 1. Kalimatnya dibuat
    // menjelaskan asalnya, bukan sekadar tanda kosong.
    age: ctx.answers["demo"]?.variant.fields?.age ?? IKUT_DEMO,
    gender: ctx.answers["demo"]?.variant.fields?.gender ?? IKUT_DEMO,
    education: ctx.answers["demo"]?.variant.fields?.education ?? IKUT_DEMO,
    income: ctx.answers["demo"]?.variant.fields?.income ?? IKUT_DEMO,
    values: ctx.answers["psycho"]?.variant.fields?.values ?? IKUT_PSYCHO,
    interest: ctx.answers["psycho"]?.variant.fields?.interest ?? IKUT_PSYCHO,
    opinions: ctx.answers["psycho"]?.variant.fields?.opinions ?? IKUT_PSYCHO,
  }),

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Segmentasi Target Audiens",
      brief: [
        "Lakukan segmentasi target audiens yang relevan dengan produk FitActive.",
        "Gunakan 5 segmen, yaitu geographic, sociographic, demographic, behavioral, dan psychographic.",
      ],
      groups: tpm1Groups.slice(0, 5),
    },
    {
      id: "step-2",
      number: 2,
      title: "Buat Profil Audiens",
      brief: [
        "Petakan hasil segmentasi menjadi profil audiens.",
        "Pilih satu kartu profil utuh; description, key demographic, key psychographic, customer pain points, dan key communication channel sudah ikut terisi.",
      ],
      groups: tpm1Groups.slice(5, 6),
    },
    {
      id: "step-3",
      number: 3,
      title: "Riset Kompetitor: Identifikasi dan Analisis Konten",
      brief: [
        "Langkah 1: identifikasi 1 kompetitor utama beserta akun Instagramnya.",
        "Langkah 2: analisis konten kompetitor pada lima elemen — elemen visual, pesan utama, call to action, diskon atau promo, dan engagement.",
      ],
      groups: tpm1Groups.slice(6, 12),
    },
    {
      id: "step-4",
      number: 4,
      title: "Riset Kompetitor: Kekuatan, Kelemahan, dan Peluang",
      brief: [
        "Langkah 3: identifikasi kekuatan dan kelemahan kompetitor dalam satu kartu.",
        "Langkah 4: temukan peluang dan ancaman yang bisa menjadi inspirasi bagi FitActive.",
      ],
      groups: tpm1Groups.slice(12, 14),
    },
  ],

  downloads: ["pdf", "docx"],

  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const pengamatan = { title: kepalaPengamatan, lines: barisPengamatan(ctx) };

    /* ---------- Berkas 1: Riset Target Audiens ---------- */
    b.push({ type: "title", text: judulAudiens });
    b.push({ type: "byline", text: `Nama Peserta: ${ctx.nama}` });

    b.push({ type: "label", text: "Segmentasi Audiens" });
    b.push({
      type: "fieldTable",
      labelAlign: "center",
      rows: (
        [
          ["geo", "Geographic"],
          ["socio", "Sociographic"],
          ["demo", "Demographic"],
          ["behav", "Behavioral"],
          ["psycho", "Psychographic"],
        ] as const
      ).map(([id, label]) => ({
        label,
        value: f(ctx, id, "isi", "Belum dijawab"),
      })),
    });

    b.push({ type: "label", text: "Profil Audiens" });
    const profil = ctx.answers["profil"];
    b.push({
      type: "profile",
      avatar: f(ctx, "profil", "avatar", "a1"),
      channel: f(ctx, "profil", "channel", "Belum dijawab"),
      description: f(ctx, "profil", "description", "Belum dijawab"),
      demographic: [
        ["Age", f(ctx, "profil", "age")],
        ["Gender", f(ctx, "profil", "gender")],
        ["Education", f(ctx, "profil", "education")],
        ["Income", f(ctx, "profil", "income")],
      ],
      psychographic: [
        ["Values", f(ctx, "profil", "values")],
        ["Interest", f(ctx, "profil", "interest")],
        ["Opinions", f(ctx, "profil", "opinions")],
      ],
      painPoints: profil ? profil.variant.points.map((p) => ctx.fill(p)) : ["Belum dijawab"],
    });

    /* ---------- Berkas 2: Riset Kompetitor ---------- */
    b.push({ type: "pageBreak" });
    b.push({ type: "title", text: judulKompetitor });

    b.push({ type: "label", text: "Langkah 1: Identifikasi 1 Kompetitor Utama" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        {
          label: [{ text: "Identitas Visual " }, { text: "Brand", italic: true }, { text: " Kompetitor" }],
          value: f(ctx, "kompetitor", "identitas"),
        },
        {
          label: [{ text: "Nama " }, { text: "Brand", italic: true }, { text: " Kompetitor" }],
          value: f(ctx, "kompetitor", "nama"),
        },
        {
          label: [{ text: "Akun Instagram " }, { text: "Brand", italic: true }, { text: " Kompetitor" }],
          value: f(ctx, "kompetitor", "akun"),
        },
        {
          label: [
            { text: "Pengamatan", italic: true },
            { text: " Halaman Depan Akun Instagram " },
            { text: "Brand", italic: true },
            { text: " Kompetitor" },
          ],
          value: [
            `Kategori: ${f(ctx, "kompetitor", "kategori")}`,
            `Isi bio: ${f(ctx, "kompetitor", "bio")}`,
            `Sorotan: ${f(ctx, "kompetitor", "highlight")}`,
            `Kesan tampilan grid: ${f(ctx, "kompetitor", "grid")}`,
          ].join("\n"),
        },
      ],
    });

    b.push({ type: "label", text: "Langkah 2: Analisis Konten Kompetitor" });
    b.push({
      type: "analysis",
      observation: pengamatan,
      rows: [
        { label: "Elemen Visual", value: ringkas(ctx, "visual") },
        { label: "Pesan Utama", value: ringkas(ctx, "pesan") },
        {
          label: [{ text: "Call to Action", italic: true }, { text: " (CTA)" }],
          value: ringkas(ctx, "cta"),
        },
        { label: "Diskon atau Promo", value: ringkas(ctx, "promo") },
        { label: [{ text: "Engagement", italic: true }], value: ringkas(ctx, "engagement") },
      ],
    });

    b.push({ type: "label", text: "Langkah 3: Identifikasi kekuatan dan Kelemahan Kompetitor" });
    b.push({
      type: "analysis",
      observation: pengamatan,
      rows: [
        { label: "Kekuatan", value: blokGanda(ctx, "kuatlemah", "a") },
        { label: "Kelemahan", value: blokGanda(ctx, "kuatlemah", "b") },
      ],
    });

    b.push({ type: "label", text: "Langkah 4: Temukan Peluang dan Ancaman yang Bisa Menjadi Inspirasi" });
    b.push({
      type: "analysis",
      observation: pengamatan,
      rows: [
        { label: "Peluang", value: blokGanda(ctx, "peluanginspirasi", "a") },
        { label: "Ancaman menjadi Inspirasi", value: blokGanda(ctx, "peluanginspirasi", "b") },
      ],
    });

    return b;
  },
};

export default tpm1;
