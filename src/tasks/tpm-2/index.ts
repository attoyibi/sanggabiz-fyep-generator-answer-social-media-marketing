import {
  KODE_KELAS,
  type BuildContext,
  type DocBlock,
  type Rich,
  type SheetRow,
  type SheetSpec,
  type TaskDefinition,
} from "../types";
import { tpm2Groups } from "./bank";

const BRAND = "FitActive";

/** Judul lembar, mengikuti berkas template. */
const judulKalender: Rich = [{ text: "Content Calendar" }];
const judulPlan: Rich = [{ text: "Content Plan" }];

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"] as const;
const KUNCI_HARI = ["sen", "sel", "rab", "kam", "jum", "sab", "min"] as const;
/** Instruksi meminta rencana 1 minggu, tanggal 1-7 September 2025 (Senin-Minggu). */
const BULAN = "SEPTEMBER 2025";
/** Content plan disusun untuk 3 hari pertama. */
const TANGGAL_PLAN = ["1 September 2025", "2 September 2025", "3 September 2025"];

/** Kolom Content Plan, sama persis dengan template. */
const KOLOM_PLAN = [
  "Tanggal Posting",
  "Marketing Objective",
  "Pilar Konten",
  "Tipe Visual",
  "Judul Konten",
  "Copywriting",
  "Platform",
  "PIC (Person in Charge)",
  "Link Referensi Konten",
  "Link Hasil Konten",
  "Jam Posting",
  "Status Konten",
  "Notes",
];
/** Lebar kolom Content Plan dalam satuan karakter, mengikuti template. */
const LEBAR_PLAN = [18.4, 23.3, 23.9, 18.6, 37.3, 39.6, 15.8, 21.8, 21.6, 16.9, 15, 15.9, 17.8];

/* ------------------------------------------------------------------ */
/* Pembantu                                                            */
/* ------------------------------------------------------------------ */

function f(ctx: BuildContext, groupId: string, key: string, fallback = "-"): string {
  const v = ctx.answers[groupId]?.variant.fields?.[key];
  return v ? ctx.fill(v) : fallback;
}

/**
 * Satu baris content plan, 13 kolom sesuai template.
 *
 * Kolom Marketing Objective, PIC, Jam Posting, dan Status Konten diambil dari
 * jawaban bagian lain lewat token, supaya rencana harian tidak pernah
 * bertentangan dengan objective dan jadwal yang sudah ditetapkan.
 */
function barisPlan(ctx: BuildContext, ke: number): string[] {
  const gid = `plan${ke + 1}`;
  return [
    TANGGAL_PLAN[ke],
    f(ctx, "objective", "nama", "Belum dijawab"),
    f(ctx, gid, "pilar", "Belum dijawab"),
    f(ctx, gid, "tipeVisual", "Belum dijawab"),
    f(ctx, gid, "judul", "Belum dijawab"),
    f(ctx, gid, "copywriting", "Belum dijawab"),
    f(ctx, gid, "platform", "Belum dijawab"),
    f(ctx, "pic", "pic", "Belum dijawab"),
    f(ctx, gid, "referensi", "Belum dijawab"),
    "Diisi setelah konten tayang",
    f(ctx, "jadwal", KUNCI_HARI[ke], "Belum dijawab"),
    f(ctx, "status", "status", "Belum dijawab"),
    f(ctx, gid, "catatan", "Belum dijawab"),
  ];
}

/* ------------------------------------------------------------------ */
/* Definisi tugas                                                      */
/* ------------------------------------------------------------------ */

const tpm2: TaskDefinition = {
  id: "tpm-2",
  navLabel: "Tugas 2",
  code: "TPM 2",
  title: "Merancang Content Calendar dan Content Plan",
  subtitle: "Objective, content pillar, kalender 1 minggu, dan rencana konten 3 hari",
  available: true,
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Merancang Content Calendar & Content Plan",
    tujuan:
      "Peserta mampu menentukan objective konten, menentukan content pillar, menyusun content calendar, serta menyusun content plan.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang Social Media Specialist di sebuah perusahaan bernama “FitActive”. FitActive adalah brand pakaian olahraga lokal yang menawarkan koleksi pakaian dengan desain modern dan bahan berkualitas tinggi. Sejak berdiri pada tahun 2020, FitActive berfokus pada gaya hidup aktif dan sehat untuk masyarakat urban.",
      "Keunggulan utamanya ada tiga: Desain Fungsional, yaitu koleksi pakaian yang menggabungkan gaya dan kenyamanan; Bahan Berkualitas, yaitu material breathable yang mendukung aktivitas olahraga; serta Harga Terjangkau, yaitu produk lokal berkualitas tinggi dengan harga yang kompetitif.",
      "Saat ini FitActive ingin meningkatkan kesadaran dan keterlibatan audiens di platform Instagram dan TikTok. Namun jadwal posting yang tidak konsisten dan kurangnya variasi jenis konten menyebabkan stagnasi dalam pertumbuhan followers dan engagement.",
      "Untuk menjawab tantangan ini, FitActive membutuhkan content calendar dan content plan yang mampu menciptakan kombinasi konten yang konsisten, menarik, dan relevan dengan target audiensnya.",
    ],
  },
  instructionSummary: [
    "Susun content calendar untuk 1 minggu. Elemen yang harus ada: hari, jam, dan rencana konten.",
    "Susun content plan untuk 3 hari. Elemen yang harus ada: tanggal posting, objective konten, content pillar, tipe visual, judul konten, copywriting, platform, PIC, referensi konten, hasil konten, jam posting, status konten, dan notes.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm2-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm2-${nama}`,
    notes: [
      "Serahkan file dalam format Excel atau Spreadsheet yang berisi Content Calendar dan Content Plan.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm2-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm2-Putri Amalia.xlsx`,
      "Cek kembali kelengkapan dan kesesuaian jawaban sebelum dikirimkan.",
    ],
  },

  /**
   * Kolom yang muncul berulang di content plan — objective, pilar, jam, PIC,
   * dan status — diambil dari jawaban bagian lain lewat token, bukan diacak
   * sendiri, supaya seluruh berkas tetap saling sejalan.
   */
  tokens: (ctx) => ({
    nama: ctx.nama,
    brand: BRAND,
    objective: ctx.answers["objective"]?.variant.fields?.nama ?? "belum ditentukan",
    pilar1: ctx.answers["pilar"]?.variant.fields?.p1 ?? "Pilar 1",
    pilar2: ctx.answers["pilar"]?.variant.fields?.p2 ?? "Pilar 2",
    pilar3: ctx.answers["pilar"]?.variant.fields?.p3 ?? "Pilar 3",
    pilar4: ctx.answers["pilar"]?.variant.fields?.p4 ?? "Pilar 4",
    pic: ctx.answers["pic"]?.variant.fields?.pic ?? "mengikuti jawaban PIC",
    status: ctx.answers["status"]?.variant.fields?.status ?? "Request",
  }),

  downloads: ["xlsx", "pdf"],

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Tentukan Objective dan Content Pillar",
      brief: [
        "Tentukan objective konten yang menjawab masalah pada studi kasus.",
        "Susun content pillar sebagai kelompok tema yang dipakai berulang sepanjang pekan.",
      ],
      groups: tpm2Groups.slice(0, 2),
    },
    {
      id: "step-2",
      number: 2,
      title: "Susun Content Calendar (1 minggu)",
      brief: [
        "Susun content calendar yang berisi rencana konten secara umum untuk 1 minggu, tanggal 1-7 September 2025.",
        "Elemen yang harus ada: hari, jam, dan rencana konten.",
      ],
      groups: tpm2Groups.slice(2, 4),
    },
    {
      id: "step-3",
      number: 3,
      title: "Susun Content Plan (3 hari)",
      brief: [
        "Susun content plan yang berisi rencana konten secara rinci untuk 3 hari pertama.",
        "Pilih satu kartu per hari; tanggal, objective, PIC, jam posting, dan status konten ikut terisi dari jawaban sebelumnya.",
      ],
      groups: tpm2Groups.slice(4, 9),
    },
  ],

  /* ---------------- Berkas PDF ---------------- */
  buildDocument: (ctx) => {
    const b: DocBlock[] = [];

    b.push({ type: "title", text: judulKalender });
    b.push({ type: "byline", text: `Disiapkan oleh: ${ctx.nama} · ${BULAN}` });

    b.push({ type: "label", text: "Objective dan Content Pillar" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        { label: "Marketing Objective", value: f(ctx, "objective", "isi", "Belum dijawab") },
        { label: "Content Pillar", value: f(ctx, "pilar", "isi", "Belum dijawab") },
        { label: "PIC", value: f(ctx, "pic", "pic", "Belum dijawab") },
        { label: "Alur Status Konten", value: f(ctx, "status", "alur", "Belum dijawab") },
      ],
    });

    b.push({ type: "label", text: "Content Calendar — 1 Minggu (1-7 September 2025)" });
    b.push({
      type: "grid",
      head: HARI.map((h) => h as string),
      rows: [
        KUNCI_HARI.map((_, i) => `${i + 1} September`),
        KUNCI_HARI.map((k) => f(ctx, "jadwal", k, "-")),
        KUNCI_HARI.map((k) => f(ctx, "rencana", k, "-")),
      ],
      caption: "Baris: tanggal, jam unggah, dan rencana konten.",
    });

    b.push({ type: "pageBreak" });
    b.push({ type: "title", text: judulPlan });
    b.push({ type: "byline", text: `Disiapkan oleh: ${ctx.nama}` });

    for (let i = 0; i < 3; i++) {
      const baris = barisPlan(ctx, i);
      b.push({ type: "label", text: `Hari ke-${i + 1} — ${TANGGAL_PLAN[i]}` });
      b.push({
        type: "fieldTable",
        labelAlign: "left",
        rows: KOLOM_PLAN.map((kolom, k) => ({ label: kolom, value: baris[k] })),
      });
    }

    return b;
  },

  /* ---------------- Berkas Excel ---------------- */
  buildWorkbook: (ctx) => {
    /* Sheet 1: Content Calendar, berbentuk grid satu bulan seperti template.
       Hanya minggu pertama yang terisi, sesuai instruksi 1 minggu. */
    const kalender: SheetRow[] = [
      { height: 34, cells: [{ text: "Content Calendar", style: "judul", span: 7 }] },
      { height: 24, cells: [{ text: BULAN, style: "bulan", span: 7 }] },
      {
        cells: [
          { text: `Disiapkan Oleh: ${ctx.nama}`, style: "label", span: 4 },
          { text: "Date Updated: 1 September 2025", style: "label", span: 3 },
        ],
      },
      {
        cells: [
          { text: `Objective: ${f(ctx, "objective", "nama", "-")}`, style: "label", span: 3 },
          { text: `Alur Status: ${f(ctx, "status", "alur", "-")}`, style: "label", span: 4 },
        ],
      },
      { cells: [] },
      { cells: HARI.map((h) => ({ text: h as string, style: "hari" as const })) },
      {
        cells: KUNCI_HARI.map((_, i) => ({ text: `${i + 1}`, style: "tanggal" as const })),
      },
      {
        height: 28,
        cells: KUNCI_HARI.map((k) => ({ text: f(ctx, "jadwal", k, "-"), style: "krem" as const })),
      },
      {
        height: 74,
        cells: KUNCI_HARI.map((k) => ({ text: f(ctx, "rencana", k, "-"), style: "isi" as const })),
      },
    ];

    // Sisa bulan dibiarkan kosong, sama seperti template yang dibagikan.
    let tanggal = 8;
    while (tanggal <= 30) {
      const angka: SheetRow = { cells: [] };
      for (let i = 0; i < 7; i++) {
        angka.cells.push({ text: tanggal <= 30 ? `${tanggal}` : "", style: "tanggal" });
        tanggal++;
      }
      kalender.push(angka);
      kalender.push({ height: 28, cells: Array.from({ length: 7 }, () => ({ style: "kosong" as const })) });
      kalender.push({ height: 74, cells: Array.from({ length: 7 }, () => ({ style: "kosong" as const })) });
    }

    /* Sheet 2: Content Plan, 13 kolom dan 3 baris sesuai instruksi. */
    const plan: SheetRow[] = [
      { height: 30, cells: [{ text: "Content Plan", style: "judul", span: KOLOM_PLAN.length }] },
      { height: 32, cells: KOLOM_PLAN.map((k) => ({ text: k, style: "kepala" as const })) },
      ...[0, 1, 2].map((i) => ({
        height: 96,
        cells: barisPlan(ctx, i).map((teks) => ({ text: teks, style: "isi" as const })),
      })),
    ];

    const sheets: SheetSpec[] = [
      { name: "Content Calendar", columns: Array.from({ length: 7 }, () => 26), rows: kalender },
      { name: "Content Plan", columns: LEBAR_PLAN, rows: plan },
    ];
    return sheets;
  },
};

export default tpm2;
