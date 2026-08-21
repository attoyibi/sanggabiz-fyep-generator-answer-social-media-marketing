import {
  KODE_KELAS,
  type BuildContext,
  type DocBlock,
  type Rich,
  type TaskDefinition,
} from "../types";
import { tpm8Groups } from "./bank";

const PERIODE = "04 - 10 Agustus 2025";

const judulDokumen: Rich = [{ text: "Membaca & Menganalisis TikTok Insight" }];

/** Lebar kolom label pada template ini: 30,1% dari lebar isi. */
const LEBAR_LABEL = 0.301;

/* ------------------------------------------------------------------ */
/* Data TikTok Insight yang dianalisis                                 */
/* ------------------------------------------------------------------ */

/**
 * Angka pada berkas Data TikTok Insight, ditulis sekali di sini.
 *
 * Dipakai dua tempat: ditampilkan pada studi kasus di layar, dan dilampirkan
 * di akhir dokumen supaya analisisnya bisa diperiksa tanpa membuka berkas lain.
 */
const DATA: { bagian: string; baris: [string, string][] }[] = [
  {
    bagian: "Overview Engagement",
    baris: [
      ["Video Views", "79,7K (+145,97%)"],
      ["Profile Views", "1.774 (+152,35%)"],
      ["Likes", "6.860 (+154,45%)"],
      ["Comments", "60 (+650%)"],
      ["Shares", "714 (+146,21%)"],
    ],
  },
  {
    bagian: "Followers",
    baris: [
      ["Total Followers", "74.029"],
      ["New Followers", "+1.643"],
      ["Growth Rate", "+2,35%"],
      ["Gender", "67,9% Female, 32,1% Male"],
      ["Top Territories", "98% Indonesia"],
      ["Follower Activity", "Puncak jam aktif pukul 8 malam"],
    ],
  },
  {
    bagian: "Postingan Video (durasi 15,18 detik)",
    baris: [
      ["Video Views", "137,4K"],
      ["Likes", "24K"],
      ["Comments", "169"],
      ["Shares", "410"],
      ["Reached Audience", "124.010"],
      ["Average Watch Time", "10,3 detik"],
      ["Watched Full Video", "34,62%"],
      ["Video Views by Section", "86% For You Page, 5% Profile, 4% Following"],
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Pembantu                                                            */
/* ------------------------------------------------------------------ */

/** Isi jawaban sebuah grup, tanpa poin alasannya. */
function isi(ctx: BuildContext, groupId: string): string {
  const a = ctx.answers[groupId];
  if (!a) return "Belum dijawab";
  return ctx.fill(a.variant.fields?.isi ?? a.variant.headline);
}

/** Satu strategi: judul lalu penjelasannya, tanpa poin alasan agar tetap ringkas. */
function strategi(ctx: BuildContext, groupId: string): string {
  const a = ctx.answers[groupId];
  if (!a) return "Belum dijawab";
  return `${ctx.fill(a.variant.headline)}\n${ctx.fill(a.variant.fields?.isi ?? "")}`.trim();
}

/* ------------------------------------------------------------------ */

const tpm8: TaskDefinition = {
  id: "tpm-8",
  navLabel: "Tugas 8",
  code: "TPM 8",
  title: "Membaca & Menganalisis TikTok Insight",
  subtitle: "Pembacaan metrics, kekuatan dan kelemahan, lalu strategi optimasi",
  available: true,
  // Template tugas ini memakai A4 potret, berbeda dari template tugas sebelumnya.
  orientation: "portrait",
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Menganalisis Metrics & Membuat Strategi Optimasi",
    tujuan:
      "Peserta mampu membaca dan menganalisis data metrics di TikTok Insight, mengidentifikasi kekuatan dan kelemahan performa konten, serta menyusun strategi optimasi berdasarkan hasil analisis metrics.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang Social Media Specialist yang bertugas memantau performa konten TikTok milik sebuah brand. Kebetulan, brand tempatmu bekerja baru saja memposting sebuah video berdurasi 15 detik dengan tema edukasi singkat.",
      "Setelah berjalan 7 hari, kamu mendapatkan data insight dari TikTok Analytics untuk periode 04 - 10 Agustus 2025. Data itulah yang harus kamu baca, analisis, dan jadikan dasar strategi perbaikan.",
      "Overview Engagement — Video Views 79,7K (+145,97%), Profile Views 1.774 (+152,35%), Likes 6.860 (+154,45%), Comments 60 (+650%), Shares 714 (+146,21%).",
      "Followers — Total 74.029, New Followers +1.643, Growth Rate +2,35%, Gender 67,9% Female dan 32,1% Male, Top Territories 98% Indonesia, dengan puncak jam aktif di pukul 8 malam.",
      "Postingan Video (durasi 15,18 detik) — Video Views 137,4K, Likes 24K, Comments 169, Shares 410, Reached Audience 124.010, Average Watch Time 10,3 detik, Watched Full Video 34,62%, serta Video Views by Section 86% For You Page, 5% Profile, dan 4% Following.",
    ],
  },
  instructionSummary: [
    "Baca data insight seperti engagement, followers, dan performa video, kemudian tentukan kekuatan dan kelemahannya.",
    "Susun strategi perbaikan berdasarkan hasil analisis, misalnya optimasi jam posting, jenis konten, durasi, dan lainnya. Tulis minimal 3 strategi.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm8-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm8-${nama}`,
    notes: [
      "Serahkan file dalam format PDF berisi hasil membaca insight, identifikasi kekuatan dan kelemahan, analisis lanjutan, serta strategi optimasi.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm8-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm8-Putri Amalia.pdf`,
      "Berkas Word disediakan bila kamu ingin menyunting ulang isinya sebelum dikumpulkan.",
    ],
  },

  tokens: (ctx) => ({
    nama: ctx.nama,
    periode: PERIODE,
  }),

  downloads: ["pdf", "docx"],

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Baca Data TikTok Insight",
      brief: [
        "Baca ketiga bagian data: overview engagement, followers, dan performa postingan video.",
        "Sebutkan angkanya, jangan hanya kesan umum. Pembacaan inilah yang jadi dasar seluruh bagian berikutnya.",
      ],
      groups: tpm8Groups.slice(0, 3),
    },
    {
      id: "step-2",
      number: 2,
      title: "Identifikasi Kekuatan, Kelemahan, dan Perilaku Audiens",
      brief: [
        "Tentukan metrics apa yang sudah baik dan apa yang perlu ditingkatkan.",
        "Hubungkan data metrics dengan perilaku audiens: jam aktif, gender, dan lokasi.",
      ],
      groups: tpm8Groups.slice(3, 6),
    },
    {
      id: "step-3",
      number: 3,
      title: "Susun Strategi Optimasi",
      brief: [
        "Tulis tiga strategi optimasi berbasis data: distribusi, konten, dan engagement.",
        "Rubrik meminta strategi yang relevan dengan hasil analisis, aplikatif, dan mencakup aspek distribusi maupun engagement.",
      ],
      groups: tpm8Groups.slice(6, 9),
    },
  ],

  /* ---------------- Berkas PDF dan Word ---------------- */
  buildDocument: (ctx) => {
    const b: DocBlock[] = [];

    b.push({ type: "title", text: judulDokumen });
    b.push({ type: "byline", text: `Nama Peserta: ${ctx.nama} · Periode Data: ${PERIODE}` });

    /* ---- Bagian 1: Hasil Membaca TikTok Insight ---- */
    b.push({ type: "label", text: "Hasil Membaca TikTok Insight" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: LEBAR_LABEL,
      rows: [
        { label: "Bagaimana performa data engagement-nya?", value: isi(ctx, "engagement") },
        { label: "Bagaimana performa data followers-nya?", value: isi(ctx, "followers") },
        { label: "Bagaimana performa data postingan videonya?", value: isi(ctx, "video") },
      ],
    });

    /* ---- Bagian 2: Identifikasi Kekuatan & Kelemahan ---- */
    b.push({ type: "label", text: "Identifikasi Kekuatan & Kelemahan" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: LEBAR_LABEL,
      rows: [
        { label: "Metrics apa yang sudah baik?", value: isi(ctx, "kekuatan") },
        { label: "Metrics apa yang perlu ditingkatkan?", value: isi(ctx, "kelemahan") },
      ],
    });

    /* ---- Bagian 3: Analisis Lebih Lanjut ---- */
    b.push({ type: "label", text: "Analisis Lebih Lanjut" });
    b.push({
      type: "note",
      text: "Lakukan analisis metrics dan performa konten lebih lanjut, dengan menghubungkan data yang ada dengan perilaku audiens (jam aktif, gender, lokasi)!",
    });
    b.push({ type: "grid", boldKolomPertama: false, rows: [[isi(ctx, "perilaku")]] });

    /* ---- Bagian 4: Strategi Optimasi Konten ---- */
    b.push({ type: "label", text: "Buat Strategi Optimasi Konten" });
    b.push({
      type: "note",
      text: "Berdasarkan hasil membaca dan menganalisis data, tulis minimal 3 strategi optimasi yang bisa diterapkan untuk konten selanjutnya!",
    });
    b.push({
      type: "grid",
      boldKolomPertama: false,
      rows: [
        [`1. ${strategi(ctx, "strategiDistribusi")}`],
        [`2. ${strategi(ctx, "strategiKonten")}`],
        [`3. ${strategi(ctx, "strategiEngagement")}`],
      ],
    });

    /* ---- Lampiran data, supaya analisisnya bisa diperiksa ---- */
    // Dibiarkan mengalir: memaksa halaman baru hanya menyisakan halaman kosong
    // ketika bagian strategi sudah berakhir di tengah halaman.
    b.push({ type: "label", text: "Data yang Dianalisis" });
    b.push({
      type: "note",
      text: `Sumber: TikTok Insight periode ${PERIODE}. Dilampirkan supaya seluruh angka pada analisis di atas bisa diperiksa ulang.`,
    });
    b.push({
      type: "grid",
      head: ["Bagian", "Metrics", "Nilai"],
      widths: [1.5, 1.6, 2.4],
      rows: DATA.flatMap((d) =>
        d.baris.map((r, i) => [i === 0 ? d.bagian : "", r[0], r[1]])
      ),
    });

    return b;
  },
};

export default tpm8;
