import type { BuildContext, DocBlock, ResolvedAnswer, TaskDefinition } from "../types";
import { tpm1Groups } from "./bank";

const BRAND = "FitActive";

/** Pembuka dokumen — divariasikan per peserta supaya tidak seragam. */
const pembuka = [
  "Dokumen ini memuat hasil riset target audiens dan riset konten kompetitor untuk brand pakaian olahraga lokal {{brand}}. Penyusunan dilakukan sebagai bagian dari Tugas Praktik Mandiri 1 pada chapter Merancang Strategi Marketing.",
  "Laporan ini disusun untuk menjawab tantangan {{brand}} dalam meningkatkan engagement di Instagram, melalui dua hal: memetakan siapa target audiensnya secara spesifik dan meriset konten kompetitor di kategori yang sama.",
  "Berikut adalah hasil riset target audiens dan konten kompetitor {{brand}}, yang dikerjakan dalam rangka Tugas Praktik Mandiri 1 pelatihan Social Media Marketing.",
  "Dokumen ini berisi segmentasi audiens, profil audiens, dan riset konten kompetitor {{brand}}, disusun sebagai dasar penentuan strategi konten Instagram pada tahap berikutnya.",
  "Sebagai bagian dari tim Social Media Specialist {{brand}}, penyusun melakukan riset target audiens dan riset konten kompetitor agar konten Instagram yang dibuat selanjutnya benar-benar sesuai dengan preferensi target market.",
];

const pengantarSegmentasi = [
  "Segmentasi audiens {{brand}} disusun memakai lima kriteria, yaitu geographic, sociographic, demographic, behavioral, dan psychographic. Berikut hasil pemetaan pada masing-masing kriteria.",
  "Tahap pertama riset adalah membagi pasar menjadi kelompok yang lebih kecil dan seragam. Berikut hasil segmentasi target audiens {{brand}} berdasarkan lima kriteria yang diminta.",
  "Berikut hasil segmentasi target audiens yang relevan dengan produk {{brand}}, disusun berdasarkan kriteria geographic, sociographic, demographic, behavioral, dan psychographic.",
  "Untuk memahami siapa sebenarnya audiens {{brand}}, pasar dipetakan lebih dulu melalui lima kriteria segmentasi berikut, mulai dari lokasi tempat tinggal sampai gaya hidup dan nilai yang dianut.",
];

const pengantarProfil = [
  "Hasil segmentasi di atas kemudian dipadatkan menjadi satu profil audiens utama {{brand}}, memakai kerangka description, key demographic, key psychographic, customer pain points, dan key communication channel.",
  "Berikut profil audiens {{brand}} yang disusun dari hasil segmentasi sebelumnya. Profil ini menjadi acuan tim dalam menentukan nada bicara, format, dan jadwal konten.",
  "Tahap kedua adalah menerjemahkan hasil segmentasi menjadi gambaran audiens yang lebih hidup, agar tim konten memiliki sosok nyata yang dituju setiap kali membuat unggahan.",
  "Setelah pasar dipetakan, hasilnya diringkas menjadi satu profil audiens utama yang akan menjadi sasaran seluruh konten Instagram {{brand}}.",
];

const pengantarKompetitor = [
  "Tahap ketiga adalah meriset konten kompetitor di Instagram memakai empat langkah: identifikasi kompetitor utama, analisis konten, identifikasi kekuatan dan kelemahan, serta menemukan peluang dan inspirasi.",
  "Riset kompetitor dilakukan untuk mengetahui apa yang sudah dikerjakan brand sejenis di Instagram, apa yang berhasil, dan celah mana yang masih terbuka bagi {{brand}}. Berikut hasilnya dalam empat langkah.",
  "Berikut hasil riset konten kompetitor {{brand}} di Instagram. Riset disusun bertahap, mulai dari menentukan kompetitor utama sampai merumuskan peluang yang bisa diambil.",
  "Bagian ini memuat pengamatan terhadap akun Instagram kompetitor {{brand}}, disusun mengikuti empat langkah riset kompetitor yang diminta pada instruksi tugas.",
];

const penutup = [
  "Melalui riset di atas, {{brand}} kini memiliki gambaran yang jelas tentang siapa target audiensnya dan konten seperti apa yang sesuai dengan preferensi mereka, sehingga rendahnya engagement dapat ditangani dengan langkah yang terarah.",
  "Hasil riset target audiens dan riset kompetitor ini menjadi pijakan bagi penyusunan strategi konten Instagram {{brand}} pada tahap berikutnya, mulai dari pemilihan format, nada bicara, sampai jadwal unggah.",
  "Dengan profil audiens yang spesifik dan celah kompetitor yang sudah teridentifikasi, konten {{brand}} tidak lagi disusun berdasarkan perkiraan, melainkan berdasarkan kebutuhan audiens yang nyata.",
  "Riset ini menunjukkan bahwa kenaikan jumlah followers tidak dengan sendirinya menaikkan interaksi. Yang dibutuhkan {{brand}} adalah konten yang menjawab kebutuhan audiens tertentu, bukan konten untuk semua orang.",
];

/* ------------------------------------------------------------------ */
/* Pembantu penyusun dokumen                                           */
/* ------------------------------------------------------------------ */

/** Isi field sebuah grup, sudah melalui penggantian token. */
function f(ctx: BuildContext, groupId: string, key: string, fallback = "-"): string {
  const value = ctx.answers[groupId]?.variant.fields?.[key];
  return value ? ctx.fill(value) : fallback;
}

/** Headline sebuah grup, sudah melalui penggantian token. */
function h(ctx: BuildContext, groupId: string, fallback = "-"): string {
  const a = ctx.answers[groupId];
  return a ? ctx.fill(a.variant.headline) : fallback;
}

/** Ringkasan satu jawaban untuk sel tabel: headline diikuti poin-poinnya. */
function ringkas(ctx: BuildContext, groupId: string): string {
  const a = ctx.answers[groupId];
  if (!a) return "Belum dijawab";
  const poin = a.variant.points.map((p) => `- ${ctx.fill(p)}`).join("\n");
  return `${ctx.fill(a.variant.headline)}\n${poin}`;
}

/** Baris tabel konten feed kompetitor: "Format | Tema | Pesan | CTA". */
function barisKonten(ctx: BuildContext): string[][] {
  const keys = ["konten1", "konten2", "konten3", "konten4"];
  return keys
    .map((k) => f(ctx, "kompetitor", k, ""))
    .filter((v) => v.length > 0)
    .map((v, i) => {
      const kolom = v.split("|").map((s) => s.trim());
      return [
        `Konten ${i + 1}`,
        kolom[0] ?? "-",
        kolom[1] ?? "-",
        kolom[2] ?? "-",
        kolom[3] ?? "-",
      ];
    });
}

/** Blok uraian sebuah jawaban: subjudul opsional, narasi, lalu poin. */
function uraian(ctx: BuildContext, a: ResolvedAnswer | undefined, subjudul?: string): DocBlock[] {
  if (!a) return [];
  const out: DocBlock[] = [];
  if (subjudul) out.push({ type: "subheading", text: subjudul });
  if (a.variant.narrative) out.push({ type: "paragraph", text: ctx.fill(a.variant.narrative) });
  out.push({ type: "bullets", items: a.variant.points.map((p) => ctx.fill(p)) });
  return out;
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
      "Kamu adalah seorang Social Media Specialist di sebuah perusahaan bernama “FitActive”. FitActive adalah brand pakaian olahraga lokal yang menawarkan koleksi pakaian dengan desain modern dan bahan berkualitas tinggi. Sejak berdiri, FitActive berfokus pada gaya hidup aktif dan sehat untuk masyarakat urban.",
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
    fileNamePattern: "TPM 1 - [Nama Lengkap Peserta]",
    fileName: (nama) => `TPM 1 - ${nama}`,
    notes: [
      "Kirimkan file dalam bentuk PDF yang berisi hasil riset target audiens dan riset konten kompetitor.",
      "Nama file ditulis dengan format TPM 1 - [Nama Lengkap Peserta]. Contoh: TPM 1 - Putri Amalia.pdf",
      "Cek kembali kelengkapan dan kesesuaian jawaban sebelum dikirimkan.",
    ],
  },

  /**
   * Key Demographic dan Key Psychographic pada profil audiens wajib mengikuti
   * hasil segmentasi, bukan diacak sendiri. Nilainya diambil dari jawaban
   * segmen "demo" dan "psycho" lewat token di bawah ini, supaya profil audiens
   * tidak pernah bertentangan dengan segmentasi di bagian sebelumnya.
   */
  tokens: (ctx) => ({
    nama: ctx.nama,
    brand: BRAND,
    kompetitor: ctx.answers["kompetitor"]?.variant.fields?.nama ?? "kompetitor utama",
    audiens: ctx.answers["desc"]?.variant.fields?.nama ?? "target audiens utama",
    channel: ctx.answers["channel"]?.variant.fields?.channel ?? "Instagram",
    age: ctx.answers["demo"]?.variant.fields?.age ?? "belum ditentukan",
    gender: ctx.answers["demo"]?.variant.fields?.gender ?? "belum ditentukan",
    education: ctx.answers["demo"]?.variant.fields?.education ?? "belum ditentukan",
    income: ctx.answers["demo"]?.variant.fields?.income ?? "belum ditentukan",
    values: ctx.answers["psycho"]?.variant.fields?.values ?? "belum ditentukan",
    interest: ctx.answers["psycho"]?.variant.fields?.interest ?? "belum ditentukan",
    opinions: ctx.answers["psycho"]?.variant.fields?.opinions ?? "belum ditentukan",
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
        "Petakan hasil segmentasi menjadi daftar profil audiens.",
        "Isi description, key demographic, key psychographic, customer pain points, dan key communication channel sesuai template yang disediakan.",
      ],
      groups: tpm1Groups.slice(5, 10),
    },
    {
      id: "step-3",
      number: 3,
      title: "Riset Kompetitor: Identifikasi dan Analisis Konten",
      brief: [
        "Langkah 1: identifikasi 1 kompetitor utama beserta akun Instagramnya.",
        "Langkah 2: analisis konten kompetitor pada lima elemen — elemen visual, pesan utama, call to action, diskon atau promo, dan engagement.",
      ],
      groups: tpm1Groups.slice(10, 16),
    },
    {
      id: "step-4",
      number: 4,
      title: "Riset Kompetitor: Kekuatan, Kelemahan, dan Peluang",
      brief: [
        "Langkah 3: identifikasi kekuatan dan kelemahan kompetitor.",
        "Langkah 4: temukan peluang dan ancaman yang bisa menjadi inspirasi bagi FitActive.",
      ],
      groups: tpm1Groups.slice(16, 20),
    },
  ],

  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const A = ctx.answers;

    b.push({
      type: "title",
      text: `Riset Target Audiens dan Konten Kompetitor Brand ${BRAND}`,
      subtitle: "Tugas Praktik Mandiri 1 - Merancang Strategi Marketing",
    });

    b.push({
      type: "meta",
      rows: [
        ["Nama Peserta", ctx.nama],
        ["Judul Pelatihan", ctx.task.meta.judulPelatihan],
        ["Chapter", ctx.task.meta.chapter],
        ["Tugas", "Praktik Mandiri 1 - Riset Target Audiens dan Konten Kompetitor"],
        ["Brand", `${BRAND} - brand pakaian olahraga lokal untuk gaya hidup aktif masyarakat urban`],
        ["Peran", "Social Media Specialist"],
      ],
    });

    b.push({ type: "divider" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("pembuka", pembuka)) });

    /* ---- 1. Segmentasi Audiens ---- */
    b.push({ type: "heading", number: 1, text: "Segmentasi Audiens" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("intro-seg", pengantarSegmentasi)) });

    const segmenIds = [
      ["geo", "Geographic"],
      ["socio", "Sociographic"],
      ["demo", "Demographic"],
      ["behav", "Behavioral"],
      ["psycho", "Psychographic"],
    ] as const;

    b.push({
      type: "table",
      head: ["Segmen", "Hasil Segmentasi"],
      rows: segmenIds.map(([id, label]) => [label, f(ctx, id, "isi", "Belum dijawab")]),
      caption: "Tabel segmentasi audiens sesuai lima kriteria pada template",
    });

    segmenIds.forEach(([id, label]) => {
      b.push(...uraian(ctx, A[id], `${label}: ${h(ctx, id)}`));
    });

    /* ---- 2. Profil Audiens ---- */
    b.push({ type: "heading", number: 2, text: "Profil Audiens" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("intro-profil", pengantarProfil)) });

    b.push({ type: "subheading", text: `Audience Profile: ${f(ctx, "desc", "nama", h(ctx, "desc"))}` });
    b.push({ type: "paragraph", text: f(ctx, "desc", "isi", "Belum dijawab") });

    b.push({
      type: "table",
      head: ["Key Demographic", "Keterangan"],
      rows: [
        ["Age", f(ctx, "keydemo", "age")],
        ["Gender", f(ctx, "keydemo", "gender")],
        ["Education", f(ctx, "keydemo", "education")],
        ["Income", f(ctx, "keydemo", "income")],
      ],
    });

    b.push({
      type: "table",
      head: ["Key Psychographic", "Keterangan"],
      rows: [
        ["Values", f(ctx, "keypsycho", "values")],
        ["Interest", f(ctx, "keypsycho", "interest")],
        ["Opinions", f(ctx, "keypsycho", "opinions")],
      ],
    });

    b.push(...uraian(ctx, A["pain"], "Customer Pain Points"));

    b.push({ type: "subheading", text: `Key Communication Channel: ${f(ctx, "channel", "channel", h(ctx, "channel"))}` });
    b.push({
      type: "bullets",
      items: A["channel"] ? A["channel"].variant.points.map((p) => ctx.fill(p)) : ["Belum dijawab"],
    });

    /* ---- 3. Riset Konten Kompetitor ---- */
    b.push({ type: "heading", number: 3, text: "Riset Konten Kompetitor" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("intro-komp", pengantarKompetitor)) });

    /* Langkah 1 */
    b.push({ type: "subheading", text: "Langkah 1: Identifikasi 1 Kompetitor Utama" });
    b.push({
      type: "table",
      head: ["Komponen", "Hasil Identifikasi"],
      rows: [
        ["Nama Brand Kompetitor", f(ctx, "kompetitor", "nama")],
        ["Akun Instagram", f(ctx, "kompetitor", "akun")],
        ["Kategori Brand", f(ctx, "kompetitor", "kategori")],
        ["Identitas Visual Brand", f(ctx, "kompetitor", "identitas")],
      ],
    });

    b.push({
      type: "table",
      head: ["Halaman Depan Akun", "Hasil Pengamatan"],
      rows: [
        ["Isi Bio", f(ctx, "kompetitor", "bio")],
        ["Sorotan (Highlight)", f(ctx, "kompetitor", "highlight")],
        ["Kesan Tampilan Grid", f(ctx, "kompetitor", "grid")],
      ],
      caption:
        "Hasil pengamatan halaman depan akun Instagram kompetitor, dicatat dalam bentuk uraian.",
    });

    b.push({ type: "bullets", items: A["kompetitor"] ? A["kompetitor"].variant.points.map((p) => ctx.fill(p)) : ["Belum dijawab"] });

    /* Langkah 2 */
    b.push({ type: "subheading", text: "Langkah 2: Analisis Konten Kompetitor" });

    const rowsKonten = barisKonten(ctx);
    if (rowsKonten.length > 0) {
      b.push({
        type: "table",
        head: ["No", "Format", "Tema Konten", "Pesan yang Ditangkap", "Bentuk CTA"],
        rows: rowsKonten,
        caption:
          "Konten feed kompetitor yang diamati, dicatat dalam bentuk uraian.",
      });
    }

    b.push({
      type: "table",
      head: ["Elemen yang Dianalisis", "Hasil Analisis"],
      rows: [
        ["Elemen Visual", ringkas(ctx, "visual")],
        ["Pesan Utama", ringkas(ctx, "pesan")],
        ["Call to Action (CTA)", ringkas(ctx, "cta")],
        ["Diskon atau Promo", ringkas(ctx, "promo")],
        ["Engagement", ringkas(ctx, "engagement")],
      ],
    });

    /* Langkah 3 */
    b.push({ type: "subheading", text: "Langkah 3: Identifikasi Kekuatan dan Kelemahan Kompetitor" });
    b.push({
      type: "table",
      head: ["Elemen yang Dianalisis", "Hasil Analisis"],
      rows: [
        ["Kekuatan", ringkas(ctx, "kekuatan")],
        ["Kelemahan", ringkas(ctx, "kelemahan")],
      ],
    });

    /* Langkah 4 */
    b.push({ type: "subheading", text: "Langkah 4: Temukan Peluang dan Ancaman yang Bisa Menjadi Inspirasi" });
    b.push({
      type: "table",
      head: ["Elemen yang Dianalisis", "Hasil Analisis"],
      rows: [
        ["Peluang", ringkas(ctx, "peluang")],
        ["Ancaman menjadi Inspirasi", ringkas(ctx, "inspirasi")],
      ],
    });

    /* ---- Penutup ---- */
    b.push({ type: "divider" });
    b.push({ type: "heading", text: "Kesimpulan" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("penutup", penutup)) });

    return b;
  },
};

export default tpm1;
