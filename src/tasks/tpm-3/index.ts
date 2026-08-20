import {
  KODE_KELAS,
  type BuildContext,
  type DocBlock,
  type Rich,
  type TaskDefinition,
} from "../types";
import { tpm3Groups } from "./bank";

const BRAND = "FitActive";

const judulDokumen: Rich = [
  { text: "Rencana Konten dan " },
  { text: "Copywriting ", italic: true },
  { text: BRAND },
];

/** Isi field sebuah grup pada tugas ini. */
function f(ctx: BuildContext, groupId: string, key: string, fallback = "Belum dijawab"): string {
  const v = ctx.answers[groupId]?.variant.fields?.[key];
  return v ? ctx.fill(v) : fallback;
}

/** Headline sebuah grup, dipakai sebagai judul ringkas jawabannya. */
function h(ctx: BuildContext, groupId: string, fallback = "Belum dijawab"): string {
  const a = ctx.answers[groupId];
  return a ? ctx.fill(a.variant.headline) : fallback;
}

/** Jawaban lengkap sebuah grup: judul, uraian, lalu poin-poinnya. */
function uraian(ctx: BuildContext, groupId: string): string {
  const a = ctx.answers[groupId];
  if (!a) return "Belum dijawab";
  const isi = a.variant.fields?.isi ? `${ctx.fill(a.variant.fields.isi)}\n` : "";
  const poin = a.variant.points.map((p) => `• ${ctx.fill(p)}`).join("\n");
  return `${ctx.fill(a.variant.headline)}\n${isi}${poin}`;
}

const tpm3: TaskDefinition = {
  id: "tpm-3",
  navLabel: "Tugas 3",
  code: "TPM 3",
  title: "Merancang Rencana Konten dan Copywriting",
  subtitle: "Hook, visual hook, storytelling, UGC, ide visual, dan caption",
  available: true,
  dependsOn: "tpm-2",
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Merancang Rencana Konten & Copywriting",
    tujuan:
      "Peserta mampu mengembangkan rencana konten yang lebih detail, menerapkan strategi storytelling dan User Generated Content, menerapkan strategi hook dan visual hook, serta menyusun caption sesuai formula AIDA, FAB, PAS, atau ACCA.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang Social Media Specialist di sebuah perusahaan bernama “FitActive”. Setelah menyusun content plan di tugas sebelumnya, brand juga ingin memastikan setiap konten dapat dieksekusi dengan strategi kreatif yang tepat agar lebih menarik.",
      "Sebagai bagian dari tim Social Media Specialist, kamu ditugaskan untuk memilih salah satu konten yang sudah dibuat dalam content plan, mengembangkannya secara detail dengan berbagai teknik pembuatan konten seperti storytelling, UGC, hook, dan visual hook, lalu membuat caption untuk konten tersebut menggunakan salah satu formula copywriting.",
      "Rancangan konten ini nantinya akan direalisasikan pada tugas praktik selanjutnya.",
    ],
  },
  instructionSummary: [
    "Susun rencana konten lebih detail dengan menerapkan teknik storytelling, hook, visual hook, dan UGC.",
    "Tentukan ide visualnya seperti apa, baik untuk format gambar maupun video, lalu tuangkan dalam bentuk deskripsi detail.",
    "Buat caption untuk konten yang dipilih memakai salah satu formula copywriting: AIDA, FAB, PAS, atau ACCA.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm3-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm3-${nama}`,
    notes: [
      "Serahkan file dalam format PDF yang berisi rencana konten detail beserta captionnya.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm3-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm3-Putri Amalia.pdf`,
      "Pastikan rencana konten dan caption sesuai dengan objective yang sudah kamu tetapkan.",
    ],
  },

  /**
   * Tugas ini melanjutkan content plan pada TPM 2. Seluruh token di bawah
   * mengambil isinya dari ctx.sumber, yaitu jawaban TPM 2 yang tersimpan di
   * localStorage. Token berakhiran angka dipakai daftar pilih konten, sedangkan
   * token berakhiran "Konten" mengikuti konten yang benar-benar dipilih peserta.
   */
  tokens: (ctx) => {
    const src = ctx.sumber;
    /** Isi satu field pada grup TPM 2, sudah melalui penggantian token TPM 2. */
    const dari = (groupId: string, key: string, fallback: string) => {
      const v = src?.answers[groupId]?.variant.fields?.[key];
      return v && src ? src.fill(v) : fallback;
    };

    const hari = ctx.answers["konten"]?.variant.fields?.hari ?? "1";
    const gid = `plan${hari}`;
    const objective = dari("objective", "nama", "objective yang sudah ditetapkan");

    return {
      nama: ctx.nama,
      brand: BRAND,
      // Ringkasan tiap hari untuk daftar pilih konten.
      judul1: dari("plan1", "judul", "Konten hari ke-1"),
      judul2: dari("plan2", "judul", "Konten hari ke-2"),
      judul3: dari("plan3", "judul", "Konten hari ke-3"),
      pilar1x: dari("plan1", "pilar", "-"),
      pilar2x: dari("plan2", "pilar", "-"),
      pilar3x: dari("plan3", "pilar", "-"),
      tipe1: dari("plan1", "tipeVisual", "-"),
      tipe2: dari("plan2", "tipeVisual", "-"),
      tipe3: dari("plan3", "tipeVisual", "-"),
      plat1: dari("plan1", "platform", "-"),
      plat2: dari("plan2", "platform", "-"),
      plat3: dari("plan3", "platform", "-"),
      copy1: dari("plan1", "copywriting", "-"),
      copy2: dari("plan2", "copywriting", "-"),
      copy3: dari("plan3", "copywriting", "-"),
      catat1: dari("plan1", "catatan", "-"),
      catat2: dari("plan2", "catatan", "-"),
      catat3: dari("plan3", "catatan", "-"),
      jam1x: dari("jadwal", "sen", "-"),
      jam2x: dari("jadwal", "sel", "-"),
      jam3x: dari("jadwal", "rab", "-"),
      // Konten yang dipilih peserta.
      judulKonten: dari(gid, "judul", "konten yang dipilih"),
      pilarKonten: dari(gid, "pilar", "-"),
      tipeKonten: dari(gid, "tipeVisual", "-"),
      platformKonten: dari(gid, "platform", "-"),
      copyKonten: dari(gid, "copywriting", "-"),
      objectiveKonten: objective,
    };
  },

  downloads: ["pdf", "docx"],

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Pilih Konten dari Content Plan",
      brief: [
        "Tinjau kembali content plan yang sudah kamu buat di TPM 2.",
        "Tentukan 1 konten yang potensial untuk dikembangkan. Ketiganya sama-sama boleh dipilih.",
      ],
      groups: tpm3Groups.slice(0, 1),
    },
    {
      id: "step-2",
      number: 2,
      title: "Rancang Rencana Konten secara Lebih Detail",
      brief: [
        "Terapkan strategi hook, visual hook, storytelling, dan UGC pada konten yang dipilih.",
        "Tentukan ide visualnya seperti apa, lalu tuangkan sebagai deskripsi detail.",
      ],
      groups: tpm3Groups.slice(1, 6),
    },
    {
      id: "step-3",
      number: 3,
      title: "Buat Caption dan Periksa Kesesuaiannya",
      brief: [
        "Tulis caption memakai salah satu formula copywriting: AIDA, FAB, PAS, atau ACCA.",
        "Pastikan rencana konten dan caption sesuai dengan objective yang sudah ditetapkan.",
      ],
      groups: tpm3Groups.slice(6, 8),
    },
  ],

  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const hari = f(ctx, "konten", "hari", "1");

    b.push({ type: "title", text: judulDokumen });
    b.push({ type: "byline", text: `Nama Peserta: ${ctx.nama}` });

    /* ---- Konten yang dikembangkan, diambil dari content plan TPM 2 ---- */
    b.push({ type: "label", text: `Konten yang Dikembangkan — Hari ke-${hari}` });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        { label: "Judul Konten", value: f(ctx, "konten", "judul") },
        { label: "Tanggal Posting", value: f(ctx, "konten", "tanggal") },
        { label: "Marketing Objective", value: f(ctx, "konten", "objective") },
        { label: "Pilar Konten", value: f(ctx, "konten", "pilar") },
        { label: "Tipe Visual", value: f(ctx, "konten", "tipe") },
        { label: "Platform", value: f(ctx, "konten", "platform") },
        { label: "Jam Posting", value: f(ctx, "konten", "jam") },
        { label: "Copywriting Awal (dari content plan)", value: f(ctx, "konten", "copy") },
      ],
    });

    /* ---- Rencana konten yang lebih detail ---- */
    b.push({ type: "pageBreak" });
    b.push({ type: "label", text: "Rencana Konten Detail" });
    b.push({
      type: "analysis",
      observation: {
        title: [{ text: "Konten yang Dikembangkan" }],
        lines: [
          f(ctx, "konten", "judul"),
          "",
          `Pilar: ${f(ctx, "konten", "pilar")}`,
          `Tipe visual: ${f(ctx, "konten", "tipe")}`,
          `Platform: ${f(ctx, "konten", "platform")}`,
          `Objective: ${f(ctx, "konten", "objective")}`,
        ],
      },
      rows: [
        { label: "Hook", value: `${h(ctx, "hook")}\n${f(ctx, "hook", "isi", "")}` },
        { label: "Visual Hook", value: `${h(ctx, "visualHook")}\n${f(ctx, "visualHook", "isi", "")}` },
        { label: "Storytelling", value: uraian(ctx, "storytelling") },
        {
          label: [{ text: "User Generated Content", italic: true }],
          value: uraian(ctx, "ugc"),
        },
        { label: "Ide Visual", value: uraian(ctx, "ideVisual") },
      ],
    });

    /* ---- Caption ---- */
    b.push({ type: "pageBreak" });
    b.push({ type: "label", text: "Caption Konten" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        { label: "Formula Copywriting", value: f(ctx, "caption", "formula") },
        { label: "Naskah Caption", value: f(ctx, "caption", "isi") },
        { label: "Catatan Penerapan Formula", value: uraian(ctx, "caption") },
      ],
    });

    b.push({ type: "label", text: "Kesesuaian dengan Objective" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        { label: "Objective yang Dikejar", value: f(ctx, "konten", "objective") },
        { label: "Cara Memeriksanya", value: uraian(ctx, "kesesuaian") },
      ],
    });

    return b;
  },
};

export default tpm3;
