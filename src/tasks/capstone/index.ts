import {
  KODE_KELAS,
  type BuildContext,
  type DocBlock,
  type TaskDefinition,
} from "../types";
import { capstoneGroups } from "./bank";
import { capstoneForm } from "./form";
import { BRAND, SANGGABIZ } from "./profil";

/** Tautan pengumpulan resmi dari dokumen Capstone Project. */
const TAUTAN_PENGUMPULAN = "https://forms.gle/cues5Sq1CT64k83z9";

/* ------------------------------------------------------------------ */
/* Pembantu: satu dokumen, dua sumber bahan                            */
/*                                                                      */
/* Di jalur mitra bahannya datang dari kartu pilihan, di jalur sendiri  */
/* dari isian formulir. Kedua pembantu di bawah menyembunyikan beda itu */
/* supaya penyusun dokumen hanya perlu menyebut apa yang ia butuhkan.   */
/* ------------------------------------------------------------------ */

const BELUM = "Belum diisi";

/** Isi sebuah field pada jawaban kartu pilihan. */
function dariKartu(ctx: BuildContext, groupId: string, key: string): string {
  const nilai = ctx.answers[groupId]?.variant.fields?.[key];
  return nilai ? ctx.fill(nilai) : "";
}

/** Isi sebuah kolom formulir. */
function dariForm(ctx: BuildContext, fieldId: string): string {
  return ctx.form?.[fieldId]?.trim() ?? "";
}

/**
 * Bahan dokumen: diambil dari kartu pilihan pada jalur mitra, dari formulir
 * pada jalur sendiri.
 */
function bahan(
  ctx: BuildContext,
  sumber: { grup: string; key?: string; field: string }
): string {
  const nilai =
    ctx.mode === "sendiri"
      ? dariForm(ctx, sumber.field)
      : dariKartu(ctx, sumber.grup, sumber.key ?? "isi");
  return nilai || BELUM;
}

/** Empat baris Visual Gallery, apa pun jalurnya. */
function galeriRows(ctx: BuildContext): string[][] {
  const mentah =
    ctx.mode === "sendiri"
      ? ["konten1", "konten2", "konten3", "konten4"].map((f) => dariForm(ctx, f))
      : ["k1", "k2", "k3", "k4"].map((k) => dariKartu(ctx, "galeri", k));

  const baris = mentah
    .filter((v) => v.length > 0)
    .map((v, i) => {
      // Pola isinya "format | kanal | penjelasan". Peserta jalur sendiri bisa
      // saja menulis tanpa pemisah, jadi bagian yang tidak ada dibiarkan kosong
      // alih-alih menggeser kolom.
      const [format = "", kanal = "", penjelasan = ""] = v.split("|").map((x) => x.trim());
      const isi = penjelasan || format;
      return [String(i + 1), penjelasan ? `${format}\n${kanal}` : "-", isi];
    });

  return baris.length > 0 ? baris : [["1", "-", BELUM]];
}

/* ------------------------------------------------------------------ */
/* Definisi tugas                                                      */
/* ------------------------------------------------------------------ */

const capstone: TaskDefinition = {
  id: "capstone",
  navLabel: "Capstone",
  code: "Capstone",
  title: "Capstone Project Social Media Marketing",
  subtitle:
    "Menyusun A3 Summary Report dan kerangka PPT presentasi untuk satu mitra UMKM",
  available: true,
  istimewa: true,
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Capstone Project",
    tujuan:
      "Peserta mampu merangkum seluruh keterampilan yang dipelajari menjadi dua dokumen portofolio: A3 Summary Report satu halaman sebagai alat screening cepat bagi mitra usaha, dan deck presentasi yang menjelaskan alur riset audiens, teknik copywriting, hingga desain visual yang dihasilkan.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Capstone Project adalah tugas penutup pelatihan Social Media Marketing. Di sini kamu tidak lagi mengerjakan satu bagian kecil, melainkan menyatukan seluruh keterampilan yang sudah dilatih pada Tugas 1 sampai 8 menjadi portofolio yang bisa kamu tunjukkan kepada calon pemberi kerja.",
      "Ada dua berkas yang harus dikumpulkan. Pertama, A3 Summary Report: laporan ringkas satu halaman berisi profil UMKM, strategi kunci, dan galeri konten, yang dipakai sebagai alat bantu screening cepat bagi mitra usaha. Kedua, PPT Presentasi: deck detail yang menjelaskan alur riset audiens, teknik copywriting, hingga desain visual yang kamu hasilkan.",
      "Kamu bisa mengerjakannya dengan dua cara. Memakai mitra UMKM yang sudah kami siapkan, yaitu Sanggabiz, sehingga kamu tinggal memilih jawaban seperti pada tugas-tugas sebelumnya. Atau memakai data UMKM milikmu sendiri — usaha keluarga, usaha teman, atau klien yang benar-benar kamu dampingi — lalu mengisikannya lewat formulir di halaman ini.",
      "Apa pun jalur yang kamu pilih, hasil akhirnya sama: satu dokumen berisi seluruh bahan A3 Summary Report dan kerangka PPT yang sudah tersusun sesuai ketentuan, siap kamu pindahkan ke Canva untuk didesain.",
    ],
  },
  instructionSummary: [
    "Pilih jalur pengerjaan: memakai mitra UMKM yang sudah disiapkan, atau memasukkan data UMKM milikmu sendiri.",
    "Lengkapi seluruh bagian yang diminta: Business Context, Strategy Highlights, Technical Skill Evidence, Visual Gallery, serta analisis dampak dan penutup.",
    "Unduh dokumennya, lalu pindahkan isinya ke Canva untuk dirancang menjadi A3 Summary Report satu halaman dan deck PPT.",
    `Kumpulkan kedua berkas melalui tautan resmi: ${TAUTAN_PENGUMPULAN}`,
  ],

  capstone: {
    mitra: {
      judul: "Pakai UMKM yang sudah disiapkan",
      ringkas: `Kerjakan untuk ${SANGGABIZ.nama}, perusahaan ${SANGGABIZ.model} di ${SANGGABIZ.kota}. Risetnya sudah kami siapkan, kamu tinggal memilih jawaban.`,
      poin: [
        "Cara mengerjakannya sama persis dengan Tugas 1 sampai 8: tinggal klik dan pilih",
        "Pilihan jawaban disusun ulang setiap halaman dibuka, jadi dokumenmu tidak kembar dengan peserta lain",
        "Jawabanmu dinilai seperti tugas biasa",
      ],
      caseStudy: [
        `Kamu adalah seorang Social Media Specialist yang dipercaya menangani akun Instagram ${SANGGABIZ.nama}, sebuah perusahaan di ${SANGGABIZ.kota} yang bekerja sebagai ${SANGGABIZ.model}. Alih-alih menjual satu aplikasi, ${SANGGABIZ.nama} mengambil alih pekerjaan operasional pemilik usaha — keuangan, penagihan, layanan pelanggan, sampai administrasi tim — lewat lima layanan yang saling terhubung.`,
        `${SANGGABIZ.nama} dipimpin perempuan dan menempatkan inklusi di dalam model bisnisnya. Lewat program ${SANGGABIZ.program}, perusahaan ini membuka akses teknologi dan pendampingan bagi pelaku UMKM perempuan, wirausaha muda, dan penyandang disabilitas — kelompok yang selama ini paling jarang disentuh layanan konsultan bisnis.`,
        `Tantangannya, layanan seperti ini tidak kasatmata. Calon pelanggan tidak bisa memegang produknya, sementara keputusan untuk menyerahkan urusan keuangan dan pelanggan kepada pihak lain butuh kepercayaan yang tidak terbentuk dalam sekali lihat. Akun ${SANGGABIZ.instagram} sudah punya sekitar sembilan ribu pengikut, tetapi belum menjadi alasan orang menghubungi.`,
        "Tugasmu menyusun portofolio yang memperlihatkan bagaimana kamu akan menjawab tantangan itu: siapa yang disasar, konten apa yang dibuat, dan mengapa pilihan-pilihan itu yang diambil. Hasilnya dikemas menjadi A3 Summary Report satu halaman dan deck PPT presentasi.",
      ],
      instruksi: [
        `Tentukan Business Context: ringkasan profil ${SANGGABIZ.nama} dan target audiens yang disasar.`,
        "Susun Strategy Highlights: pilar konten beserta ritme unggahannya, lengkap dengan alasan pemilihan topik.",
        "Tunjukkan Technical Skill Evidence: visual hook yang dipakai beserta alasannya, dan formula copywriting yang menopang narasinya.",
        "Pilih empat konten untuk Visual Gallery, lalu tentukan analisis dampak dan slide penutup Hire Me.",
        "Unduh dokumennya, pindahkan ke Canva untuk dirancang, lalu kumpulkan A3 Report dan PPT lewat tautan resmi.",
      ],
    },
    sendiri: {
      judul: "Masukkan data UMKM sendiri",
      ringkas:
        "Pakai usaha milikmu, usaha keluarga, atau klien yang benar-benar kamu dampingi. Isi lewat formulir bertahap yang sudah dilengkapi contoh di tiap kolom.",
      poin: [
        "Tiap kolom punya penjelasan dan contoh isian yang bisa dipakai sekali klik",
        "Cocok bila kamu ingin portofolio yang memakai kasus nyata",
        "Kelengkapan isian wajib yang menentukan nilainya",
      ],
      caseStudy: [
        "Kamu mengerjakan capstone ini memakai UMKM pilihanmu sendiri — usaha milikmu, usaha keluarga, usaha teman, atau klien yang benar-benar kamu dampingi. Portofolio yang lahir dari kasus nyata biasanya lebih kuat di mata pemberi kerja, karena kamu bisa menceritakan keputusannya dengan yakin saat ditanya.",
        "Yang perlu kamu siapkan hanyalah keterangan dasar usahanya: bidang usaha, lokasi, keunggulan, siapa audiensnya, dan konten apa yang sudah atau akan kamu buat. Tidak perlu data penjualan atau angka rahasia apa pun.",
        "Formulir di bawah akan memandumu bagian demi bagian, mengikuti urutan yang sama dengan A3 Summary Report. Tiap kolom disertai penjelasan dan contoh isian yang bisa kamu pakai sebagai titik awal lalu kamu sunting sesuai usahamu.",
        "Kalau usaha yang kamu pilih belum punya akun media sosial atau kontennya baru rencana, itu tidak masalah. Tulis saja rencananya — yang dinilai adalah cara berpikirmu menyusun strategi, bukan jumlah pengikut usahanya.",
      ],
      instruksi: [
        "Isi Profil UMKM: nama, bidang usaha, lokasi, dan keunggulan utamanya.",
        "Tentukan Target Audiens beserta masalah atau kebutuhan yang bisa dijawab usaha ini.",
        "Susun Strategy Highlights: pilar konten dan ritme unggahan, lengkap dengan alasannya.",
        "Isi Technical Skill Evidence dan Visual Gallery: visual hook, formula copywriting, serta konten yang kamu buat.",
        "Lengkapi analisis dampak dan penutup, unduh dokumennya, lalu rancang di Canva sebelum dikumpulkan.",
      ],
    },
    form: capstoneForm,
  },

  submission: {
    fileNamePattern: `${KODE_KELAS}-capstone-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-capstone-${nama}`,
    notes: [
      "Kumpulkan dua berkas: A3 Summary Report satu halaman dan PPT Presentasi.",
      `Nama file ditulis dengan format ${KODE_KELAS}-capstone-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-capstone-Putri Amalia.pdf`,
      "Dokumen dari halaman ini berisi bahan dan kerangkanya. Desain akhirnya kamu kerjakan sendiri di Canva, dan kamu bebas berkreasi selama bagian-bagian yang diminta tetap ada.",
      "Referensi visual A3 Report: cari \"One Page Marketing Case Study\" atau \"Executive Summary Infographic\". Untuk deck, cari \"Digital Marketing Pitch Deck\".",
      "Jangan lupa cantumkan kode QR yang mengarah ke file PPT lengkapmu pada A3 Report, serta Profile Card berisi foto profesional dan tautan LinkedIn pada slide penutup.",
      `Kirimkan melalui tautan resmi: ${TAUTAN_PENGUMPULAN}`,
    ],
  },

  /**
   * Token menyesuaikan jalur: pada jalur sendiri, {{brand}} dan {{audiens}}
   * mengambil isian peserta, sehingga kalimat bawaan tetap menyebut usahanya.
   */
  tokens: (ctx) => {
    const sendiri = ctx.mode === "sendiri";
    return {
      nama: ctx.nama,
      brand: sendiri ? ctx.form?.namaUmkm?.trim() || "UMKM ini" : BRAND,
      audiens: sendiri
        ? ctx.form?.audiens?.trim().split(/[.\n]/)[0] || "target audiens"
        : ctx.answers["audiens"]?.variant.fields?.nama ?? "target audiens",
    };
  },

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Business Context",
      brief: [
        "Bagian ini mengisi Business Context pada A3 Report dan Slide 1 pada deck.",
        "Tentukan profil singkat mitra UMKM dan target audiens yang disasar.",
      ],
      groups: capstoneGroups.slice(0, 2),
    },
    {
      id: "step-2",
      number: 2,
      title: "Strategy Highlights",
      brief: [
        "Bagian ini mengisi Strategy Highlights pada A3 Report dan Slide 2 pada deck.",
        "Tentukan pilar konten beserta ritme unggahannya, lengkap dengan alasan pemilihan topik.",
      ],
      groups: capstoneGroups.slice(2, 4),
    },
    {
      id: "step-3",
      number: 3,
      title: "Technical Skill Evidence",
      brief: [
        "Dokumen capstone meminta penggunaan teknik storytelling, hook, dan formula copywriting disebutkan secara khusus.",
        "Tentukan visual hook yang dipakai beserta alasannya, lalu formula copywriting yang menopang narasinya.",
      ],
      groups: capstoneGroups.slice(4, 6),
    },
    {
      id: "step-4",
      number: 4,
      title: "Visual Gallery",
      brief: [
        "Bagian ini menjadi bukti karya pada A3 Report dan bahan Individual Showcase pada deck.",
        "Pilih rangkaian konten yang tiap bagiannya punya peran berbeda.",
      ],
      groups: capstoneGroups.slice(6, 7),
    },
    {
      id: "step-5",
      number: 5,
      title: "Impact dan Penutup",
      brief: [
        "Bagian ini mengisi Slide Impact & Potential serta Closure & Hire Me pada deck.",
        "Tentukan analisis dampak bagi mitra UMKM dan penutup yang menunjukkan kesiapanmu.",
      ],
      groups: capstoneGroups.slice(7, 9),
    },
  ],

  downloads: ["pdf", "docx"],

  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const namaUmkm =
      ctx.mode === "sendiri" ? dariForm(ctx, "namaUmkm") || BELUM : SANGGABIZ.nama;

    /* ---------- Halaman 1: A3 Summary Report ---------- */
    b.push({ type: "title", text: "Capstone Project - A3 Summary Report" });
    b.push({ type: "byline", text: `Nama Peserta: ${ctx.nama}` });

    b.push({ type: "label", text: "Identitas" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        { label: "Nama Peserta", value: ctx.nama },
        { label: "Program Pelatihan", value: "Social Media Marketing" },
        { label: "Mitra UMKM", value: namaUmkm },
      ],
    });

    b.push({ type: "label", text: "Business Context" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows:
        ctx.mode === "sendiri"
          ? [
              { label: "Profil UMKM", value: bahan(ctx, { grup: "konteks", field: "bidang" }) },
              { label: "Lokasi", value: bahan(ctx, { grup: "konteks", field: "lokasi" }) },
              {
                label: "Keunggulan Utama",
                value: bahan(ctx, { grup: "konteks", field: "keunggulan" }),
              },
              { label: "Target Audiens", value: bahan(ctx, { grup: "audiens", field: "audiens" }) },
              {
                label: "Kebutuhan Audiens",
                value: bahan(ctx, { grup: "audiens", field: "painPoint" }),
              },
              { label: "Akun Media Sosial", value: bahan(ctx, { grup: "konteks", field: "akun" }) },
            ]
          : [
              { label: "Profil UMKM", value: bahan(ctx, { grup: "konteks", field: "bidang" }) },
              { label: "Lokasi", value: SANGGABIZ.kota },
              { label: "Layanan Utama", value: SANGGABIZ.layanan.join("\n") },
              { label: "Target Audiens", value: bahan(ctx, { grup: "audiens", field: "audiens" }) },
              { label: "Akun Media Sosial", value: SANGGABIZ.instagram },
            ],
    });

    b.push({ type: "label", text: "Strategy Highlights" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        { label: "Pilar Konten", value: bahan(ctx, { grup: "pilar", field: "pilar" }) },
        { label: "Ritme Konten", value: bahan(ctx, { grup: "kalender", field: "ritme" }) },
      ],
    });

    b.push({ type: "label", text: "Visual Gallery" });
    b.push({
      type: "grid",
      head: ["No", "Format dan Kanal", "Judul dan Penjelasan"],
      widths: [0.08, 0.24, 0.68],
      rows: galeriRows(ctx),
      caption:
        "Tampilkan keempat konten ini sebagai thumbnail kecil pada A3 Report, bukan sebagai tabel.",
    });

    b.push({ type: "label", text: "Technical Skill Evidence" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        { label: "Visual Hook", value: bahan(ctx, { grup: "hook", field: "hook" }) },
        {
          label: "Formula Copywriting",
          value:
            ctx.mode === "sendiri"
              ? bahan(ctx, { grup: "copywriting", field: "formula" })
              : bahan(ctx, { grup: "copywriting", key: "formula", field: "formula" }),
        },
        {
          label: "Teknik Storytelling",
          value: bahan(ctx, { grup: "copywriting", field: "storytelling" }),
        },
      ],
    });

    b.push({ type: "label", text: "QR Code Portfolio" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        {
          label: "Tautan File PPT",
          value:
            ctx.mode === "sendiri"
              ? dariForm(ctx, "portfolio") ||
                "Belum diisi - unggah PPT-mu ke Google Drive, lalu tempelkan tautannya di sini"
              : "Unggah PPT-mu ke Google Drive, atur aksesnya menjadi dapat dilihat siapa saja, lalu ubah tautannya menjadi kode QR",
        },
      ],
    });

    /* ---------- Halaman 2: Kerangka PPT ---------- */
    b.push({ type: "pageBreak" });
    b.push({ type: "title", text: "Capstone Project - Kerangka PPT Presentasi" });
    b.push({ type: "byline", text: `Nama Peserta: ${ctx.nama}` });
    b.push({
      type: "note",
      text: "Penomoran slide di bawah mengikuti dokumen Capstone Project resmi. Isi tiap slide sudah tersusun dari jawabanmu; tinggal dipindahkan ke Canva dan dirancang tampilannya.",
    });

    b.push({ type: "label", text: "Slide 1: Profil & Analisis Bisnis" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        { label: "Profil Mitra", value: bahan(ctx, { grup: "konteks", field: "bidang" }) },
        { label: "Hasil Riset Audiens", value: bahan(ctx, { grup: "audiens", field: "audiens" }) },
      ],
    });

    b.push({ type: "label", text: "Slide 2: Strategic Content Plan" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        { label: "Pilar Konten", value: bahan(ctx, { grup: "pilar", field: "pilar" }) },
        {
          label: "Kalender dan Alasan Topik",
          value: bahan(ctx, { grup: "kalender", field: "ritme" }),
        },
      ],
    });

    b.push({ type: "label", text: "Slide 3-9: Individual Showcase" });
    b.push({
      type: "grid",
      head: ["No", "Format dan Kanal", "Judul dan Penjelasan"],
      widths: [0.08, 0.24, 0.68],
      rows: galeriRows(ctx),
      caption:
        "Satu konten satu slide. Pada tiap slide, jelaskan mengapa visual hook-nya dipilih dan bagaimana narasi copywriting-nya bekerja.",
    });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        { label: "Visual Hook yang Dipakai", value: bahan(ctx, { grup: "hook", field: "hook" }) },
        {
          label: "Cara Narasi Bekerja",
          value: bahan(ctx, { grup: "copywriting", field: "storytelling" }),
        },
      ],
    });

    b.push({ type: "label", text: "Slide 6: Impact & Potential" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        {
          label: "Potensi Brand Awareness",
          value: bahan(ctx, { grup: "impact", field: "impact" }),
        },
      ],
    });

    b.push({ type: "label", text: "Slide 7: Closure & Hire Me" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.28,
      rows: [
        { label: "Kesiapan Berkontribusi", value: bahan(ctx, { grup: "hireme", field: "hireme" }) },
        {
          label: "Profile Card",
          value:
            "Cantumkan foto profesional, nama lengkap, satu kalimat penempatan diri, serta tautan profil LinkedIn.",
        },
      ],
    });

    return b;
  },
};

export default capstone;
