import {
  KODE_KELAS,
  type BuildContext,
  type DocBlock,
  type Rich,
  type SheetRow,
  type SheetSpec,
  type TaskDefinition,
} from "../types";
import { tpm7Groups } from "./bank";

const BRAND = "HealthyBite";
/** Angka tetap dari studi kasus. */
const TOTAL_BUDGET = 10_000_000;
const DURASI = 14;
/** Budget harian dibulatkan ke kelipatan ini supaya angkanya wajar dipakai. */
const PEMBULATAN = 1_000;

const judulDokumen: Rich = [{ text: "Membuat Strategi dan Plotting Budget Campaign" }];

const OBJECTIVE = ["Awareness", "Consideration", "Conversion"] as const;

/* ------------------------------------------------------------------ */
/* Pembantu                                                            */
/* ------------------------------------------------------------------ */

function f(ctx: BuildContext, groupId: string, key: string, fallback = "-"): string {
  const v = ctx.answers[groupId]?.variant.fields?.[key];
  return v !== undefined ? ctx.fill(v) : fallback;
}

function angka(ctx: BuildContext, groupId: string, key: string, fallback: number): number {
  const v = Number(f(ctx, groupId, key, String(fallback)));
  return Number.isFinite(v) ? v : fallback;
}

/** Rp1.234.000 */
function rupiah(n: number): string {
  return `Rp${n.toLocaleString("id-ID")}`;
}

/** Jawaban lengkap sebuah grup: judul lalu poin-poinnya. */
function uraian(ctx: BuildContext, groupId: string): string {
  const a = ctx.answers[groupId];
  if (!a) return "Belum dijawab";
  const isi = a.variant.fields?.isi ? `${ctx.fill(a.variant.fields.isi)}\n` : "";
  return `${ctx.fill(a.variant.headline)}\n${isi}${a.variant.points.map((p) => `• ${ctx.fill(p)}`).join("\n")}`;
}

/* ------------------------------------------------------------------ */
/* Perhitungan plotting budget                                         */
/* ------------------------------------------------------------------ */

export interface BarisHari {
  hari: number;
  objective: string;
  budget: number;
  fase: "Testing" | "Scaling";
}

/**
 * Bobot belanja untuk seluruh 14 hari campaign.
 *
 * Kurvanya dibuat sekali untuk seluruh durasi, bukan diulang di tiap tahap
 * objective. Kalau diulang per tahap, belanja harian akan naik lalu jatuh lagi
 * setiap pindah tahap, dan bentuk gergaji itu bertentangan dengan alasan yang
 * dipilih peserta. Pola dari jawaban yang keliru tetap dihitung apa adanya,
 * supaya akibatnya terlihat pada tabelnya sendiri.
 */
function bobotHarian(pola: string, hariTesting: number): number[] {
  const n = DURASI;
  const naik = (dari: number, sampai: number, panjang: number, mulai = 0) =>
    Array.from({ length: panjang }, (_, i) =>
      panjang === 1 ? sampai : dari + ((sampai - dari) * (i + mulai)) / (panjang - 1)
    );

  switch (pola) {
    case "naik":
      return naik(1, 2.2, n);
    case "dua": {
      const batas = hariTesting > 0 ? hariTesting : Math.ceil(n / 2);
      return Array.from({ length: n }, (_, i) => (i < batas ? 1 : 1.8));
    }
    case "rata-naik": {
      const t = Math.min(hariTesting, n);
      return [...Array.from({ length: t }, () => 1), ...naik(1, 2.2, n - t)];
    }
    case "rata":
      return Array.from({ length: n }, () => 1);
    case "depan":
      return naik(2.4, 0.5, n);
    case "belakang":
      return naik(0.35, 2.8, n);
    default:
      return Array.from({ length: n }, () => 1);
  }
}

/**
 * Menyusun tabel plotting 14 hari.
 *
 * Urutannya: kurva belanja harian dibuat lebih dahulu untuk seluruh durasi,
 * lalu hari-harinya dipotong menjadi tiga tahap sedemikian rupa sehingga
 * belanja tiap tahap sedekat mungkin dengan persentase yang dipilih peserta.
 * Setiap tahap kemudian diskalakan tipis agar totalnya tepat, dan sisa
 * pembulatan diletakkan pada hari terakhir tahap itu. Dengan cara ini jumlah
 * seluruh kolom budget selalu sama persis dengan total budget studi kasus,
 * sementara bentuk kurvanya tetap seperti yang dijanjikan jawaban peserta.
 */
export function susunPlotting(ctx: BuildContext): BarisHari[] {
  const persen = [
    angka(ctx, "alokasi", "aw", 40),
    angka(ctx, "alokasi", "co", 30),
    angka(ctx, "alokasi", "cv", 30),
  ];
  const hariTesting = Math.min(DURASI, Math.max(0, angka(ctx, "fase", "hari", 4)));
  const pola = f(ctx, "polaHarian", "pola", "naik");

  const bobot = bobotHarian(pola, hariTesting);
  const jumlahBobot = bobot.reduce((a, b) => a + b, 0);
  const kasar = bobot.map((b) => (TOTAL_BUDGET * b) / jumlahBobot);

  const jatah = persen.map((p) => Math.round((TOTAL_BUDGET * p) / 100));
  const dibiayai = persen.map((p, i) => (p > 0 ? i : -1)).filter((i) => i >= 0);

  /**
   * Memilih pembagian hari antar tahap.
   *
   * Semua pembagian yang mungkin dicoba, lalu diambil yang paling sedikit
   * membuat belanja harian turun. Batas tahap memang harus diskalakan tipis
   * agar total tiap tahap tepat, dan pembagian yang buruk membuat penskalaan
   * itu terasa sebagai penurunan tajam di tengah campaign.
   */
  const susunanTerbaik = (): number[] => {
    const k = dibiayai.length;
    const kandidat: number[][] = [];
    const kumpulkan = (sisaTahap: number, sisaHari: number, jalan: number[]) => {
      if (sisaTahap === 1) {
        kandidat.push([...jalan, sisaHari]);
        return;
      }
      for (let n = 1; n <= sisaHari - (sisaTahap - 1); n++) {
        kumpulkan(sisaTahap - 1, sisaHari - n, [...jalan, n]);
      }
    };
    kumpulkan(k, DURASI, []);

    let terbaik: number[] = kandidat[0];
    let nilaiTerbaik = Infinity;
    for (const susunan of kandidat) {
      // Belanja harian akhir untuk susunan ini, sebelum pembulatan.
      const harian: number[] = [];
      let mulai = 0;
      let sah = true;
      for (const [urutan, o] of dibiayai.entries()) {
        const n = susunan[urutan];
        const irisan = kasar.slice(mulai, mulai + n);
        const jumlahIrisan = irisan.reduce((a, b) => a + b, 0);
        if (jumlahIrisan <= 0) {
          sah = false;
          break;
        }
        for (const v of irisan) harian.push((jatah[o] * v) / jumlahIrisan);
        mulai += n;
      }
      if (!sah) continue;

      let turunTerburuk = 0;
      for (let i = 1; i < harian.length; i++) {
        const turun = (harian[i - 1] - harian[i]) / harian[i - 1];
        if (turun > turunTerburuk) turunTerburuk = turun;
      }
      if (turunTerburuk < nilaiTerbaik) {
        nilaiTerbaik = turunTerburuk;
        terbaik = susunan;
      }
    }

    const hasil = persen.map(() => 0);
    dibiayai.forEach((o, urutan) => (hasil[o] = terbaik[urutan]));
    return hasil;
  };

  const tahapHari = susunanTerbaik();

  const baris: BarisHari[] = [];
  let nomor = 1;
  for (let o = 0; o < OBJECTIVE.length; o++) {
    const n = tahapHari[o];
    if (n <= 0) continue;
    const irisan = kasar.slice(nomor - 1, nomor - 1 + n);
    const jumlahIrisan = irisan.reduce((a, b) => a + b, 0) || 1;
    let terpakai = 0;
    for (let i = 0; i < n; i++) {
      const terakhir = i === n - 1;
      // Tiap tahap diskalakan agar totalnya persis sama dengan jatahnya.
      const nilai = terakhir
        ? jatah[o] - terpakai
        : Math.round((jatah[o] * irisan[i]) / jumlahIrisan / PEMBULATAN) * PEMBULATAN;
      terpakai += nilai;
      baris.push({
        hari: nomor,
        objective: OBJECTIVE[o],
        budget: nilai,
        fase: nomor <= hariTesting ? "Testing" : "Scaling",
      });
      nomor++;
    }
  }

  return baris;
}

/** Ringkasan yang dipakai dokumen dan lembar kerja. */
function ringkasan(baris: BarisHari[]) {
  const total = baris.reduce((a, b) => a + b.budget, 0);
  const testing = baris.filter((b) => b.fase === "Testing");
  const perObjective = OBJECTIVE.map((o) => ({
    nama: o,
    hari: baris.filter((b) => b.objective === o).length,
    budget: baris.filter((b) => b.objective === o).reduce((a, b) => a + b.budget, 0),
  }));
  const totalTesting = testing.reduce((a, b) => a + b.budget, 0);
  return {
    total,
    perObjective,
    hariTesting: testing.length,
    totalTesting,
    persenTesting: total > 0 ? Math.round((totalTesting / total) * 100) : 0,
  };
}

/* ------------------------------------------------------------------ */

const tpm7: TaskDefinition = {
  id: "tpm-7",
  navLabel: "Tugas 7",
  code: "TPM 7",
  title: "Menentukan Budgeting Iklan di Meta Ads",
  subtitle: "Strategi budgeting awal, plotting 14 hari, dan alasan pemilihannya",
  available: true,
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Menentukan Budgeting Iklan di Meta Ads",
    tujuan:
      "Peserta mampu menentukan strategi budgeting iklan yang tepat di Meta Ads, melakukan plotting budget berdasarkan studi kasus, serta memberikan alasan kuat terhadap strategi budgeting yang dipilih.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang Social Media Specialist di sebuah brand yang sedang merencanakan campaign baru menggunakan Meta Ads. Perusahaan ingin memaksimalkan hasil iklan dengan alokasi budget yang tepat. Namun sering kali tim mengalami kendala karena budgeting tidak terencana: over budget di awal, under budget di tengah campaign, atau pembagian yang tidak sesuai dengan objective.",
      "Brand yang kamu tangani adalah HealthyBite, brand makanan sehat lokal yang menjual granola, overnight oats, dan snack rendah kalori. Target utamanya anak muda usia 18-35 tahun di area perkotaan yang aktif di Instagram dan Facebook.",
      "Campaign ini punya tiga tujuan sekaligus: Awareness, yaitu meningkatkan brand awareness HealthyBite di Instagram dan Facebook; Consideration, yaitu mendorong audiens mengunjungi website untuk melihat produk; dan Conversion, yaitu mendapatkan pembelian pertama melalui website.",
      "Durasi campaign 14 hari dengan total budget Rp10.000.000. Target audiensnya berusia 18-35 tahun di Jakarta, Bandung, dan Surabaya, dengan interest healthy lifestyle, diet, gym, snack sehat, dan meal prep.",
      "Perusahaan ingin memastikan ada fase testing di awal campaign untuk melihat kombinasi audiens dan konten terbaik. Setelah itu, budget akan dioptimasi (scaling) ke ad set atau konten dengan performa paling baik.",
    ],
  },
  instructionSummary: [
    "Tentukan plotting budget campaign berdasarkan studi kasus: persentase budget tiap objective, pilihan daily atau lifetime budget, level CBO atau ABO, serta pembagian fase testing dan scaling.",
    "Berikan alasan terhadap strategi plotting budget yang kamu gunakan, dengan pertimbangan fokus objective, ukuran audiens, durasi campaign, dan tujuan bisnis.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm7-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm7-${nama}`,
    notes: [
      "Serahkan file dalam format PDF berisi strategi budgeting awal, plotting budget 14 hari, dan alasan pemilihan strategi.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm7-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm7-Putri Amalia.pdf`,
      "Berkas Excel disediakan sebagai alat hitung: kolom budget hariannya sudah dijumlahkan sehingga totalnya bisa diperiksa ulang.",
    ],
  },

  tokens: (ctx) => ({
    nama: ctx.nama,
    brand: BRAND,
    totalBudget: rupiah(TOTAL_BUDGET),
    durasi: `${DURASI} hari`,
  }),

  downloads: ["pdf", "xlsx"],

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Tentukan Strategi Budgeting Awal",
      brief: [
        "Tentukan persentase budget untuk objective Awareness, Consideration, dan Conversion.",
        "Tentukan pemakaian daily atau lifetime budget, serta level Campaign (CBO) atau Ad Set (ABO).",
      ],
      groups: tpm7Groups.slice(0, 3),
    },
    {
      id: "step-2",
      number: 2,
      title: "Susun Plotting Budget 14 Hari",
      brief: [
        "Tentukan susunan ad set yang diuji pada fase testing, lalu berapa hari fase itu berjalan.",
        "Tentukan bentuk belanja hariannya. Tabel 14 hari dihitung otomatis dari jawaban ini beserta persentase di langkah sebelumnya.",
      ],
      groups: tpm7Groups.slice(3, 6),
    },
    {
      id: "step-3",
      number: 3,
      title: "Berikan Alasan dan Finalisasi",
      brief: [
        "Tetapkan indikator yang dipakai memutuskan ad set mana yang budgetnya dinaikkan.",
        "Jelaskan pertimbangan dan alasan bentuk plotting-nya, lalu pastikan total belanja pas Rp10.000.000.",
      ],
      groups: tpm7Groups.slice(6, 9),
    },
  ],

  /* ---------------- Berkas PDF ---------------- */
  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const baris = susunPlotting(ctx);
    const r = ringkasan(baris);

    b.push({ type: "title", text: judulDokumen });
    b.push({ type: "byline", text: `Nama Peserta: ${ctx.nama}` });

    /* ---- Strategi Budgeting Awal, lima baris sesuai template ---- */
    b.push({ type: "label", text: "Strategi Budgeting Awal" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.246,
      rows: [
        {
          label: "Berapa persentase (%) Budget untuk Objective Awareness?",
          value: `${f(ctx, "alokasi", "aw", "0")}% — ${rupiah(r.perObjective[0].budget)}`,
        },
        {
          label: "Berapa persentase (%) Budget untuk Objective Consideration?",
          value: `${f(ctx, "alokasi", "co", "0")}% — ${rupiah(r.perObjective[1].budget)}`,
        },
        {
          label: "Berapa persentase (%) Budget untuk Objective Conversion?",
          value: `${f(ctx, "alokasi", "cv", "0")}% — ${rupiah(r.perObjective[2].budget)}`,
        },
        // Alasannya tidak diulang di sini: seluruhnya sudah diuraikan pada
        // bagian "Alasan Pemilihan Strategi".
        {
          label: "Menggunakan lifetime atau daily budget?",
          value: f(ctx, "tipeBudget", "tipe"),
        },
        {
          label: "Menggunakan budgeting di level Campaign (CBO) atau Ad Set (ABO)?",
          value: f(ctx, "levelBudget", "level"),
        },
      ],
    });

    /* ---- Plotting Budget Campaign, 14 hari sesuai template ---- */
    // Tanpa pemaksaan halaman baru: baris terakhir tabel strategi kerap tidak
    // muat di halaman pertama, dan memaksa pindah halaman hanya menyisakan
    // halaman yang isinya satu baris.
    b.push({ type: "label", text: "Plotting Budget Campaign" });
    b.push({
      type: "grid",
      head: ["Hari ke-", "Objective Campaign", "Budget Harian (Rupiah)", "Testing atau Scaling"],
      widths: [1, 2.2, 2, 2],
      rows: baris.map((h) => [String(h.hari), h.objective, rupiah(h.budget), h.fase]),
      caption:
        `Total ${rupiah(r.total)} untuk ${DURASI} hari. ` +
        `Fase testing ${r.hariTesting} hari senilai ${rupiah(r.totalTesting)} (${r.persenTesting}% dari total), ` +
        `sisanya fase scaling.`,
    });

    /* ---- Alasan Pemilihan Strategi ---- */
    b.push({ type: "pageBreak" });
    b.push({ type: "label", text: "Alasan Pemilihan Strategi" });
    b.push({
      type: "note",
      text: "Tuliskan alasanmu dalam menentukan strategi awal dan plotting budget campaign di dalam kolom ini!",
    });
    b.push({
      type: "analysis",
      observation: {
        title: [{ text: "Data Studi Kasus" }],
        lines: [
          `Brand: ${BRAND}`,
          "",
          `Total budget: ${rupiah(TOTAL_BUDGET)}`,
          `Durasi: ${DURASI} hari`,
          "",
          "Audiens: 18-35 tahun",
          "Jakarta, Bandung, Surabaya",
          "",
          "Objective: Awareness,",
          "Consideration, Conversion",
          "",
          "Catatan: ada fase testing di",
          "awal, lalu scaling ke performa",
          "terbaik.",
        ],
      },
      rows: [
        { label: "Alokasi Budget", value: uraian(ctx, "alokasi") },
        { label: "Tipe Budget", value: uraian(ctx, "tipeBudget") },
        { label: "Level Budget", value: uraian(ctx, "levelBudget") },
        { label: "Struktur Ad Set", value: uraian(ctx, "struktur") },
        { label: "Fase Testing", value: uraian(ctx, "fase") },
        { label: "Pola Budget Harian", value: uraian(ctx, "polaHarian") },
        { label: "Indikator Scaling", value: uraian(ctx, "indikator") },
        { label: "Pertimbangan Utama", value: uraian(ctx, "pertimbangan") },
        { label: "Alasan Bentuk Plotting", value: uraian(ctx, "justifikasi") },
      ],
    });

    b.push({ type: "label", text: "Pemeriksaan Akhir" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        {
          label: "Kesesuaian dengan Studi Kasus",
          value: [
            `Total budget terpakai: ${rupiah(r.total)} dari ${rupiah(TOTAL_BUDGET)}.`,
            ...r.perObjective.map(
              (o) =>
                `${o.nama}: ${o.hari} hari, ${rupiah(o.budget)} (${
                  r.total > 0 ? Math.round((o.budget / r.total) * 100) : 0
                }%).`
            ),
            `Fase testing: ${f(ctx, "fase", "ringkas", "-")}.`,
            `Pola belanja harian: ${f(ctx, "polaHarian", "ringkas", "-")}.`,
          ].join("\n"),
        },
      ],
    });

    return b;
  },

  /* ---------------- Berkas Excel ---------------- */
  buildWorkbook: (ctx) => {
    const baris = susunPlotting(ctx);
    const r = ringkasan(baris);

    const strategi: SheetRow[] = [
      { cells: [{ text: "Strategi Budgeting Awal", style: "judul", span: 2 }] },
      { cells: [] },
      {
        cells: [
          { text: "Pertanyaan", style: "kepala" },
          { text: "Jawaban", style: "kepala" },
        ],
      },
      ...[
        [
          "Berapa persentase (%) Budget untuk Objective Awareness?",
          `${f(ctx, "alokasi", "aw", "0")}%`,
        ],
        [
          "Berapa persentase (%) Budget untuk Objective Consideration?",
          `${f(ctx, "alokasi", "co", "0")}%`,
        ],
        [
          "Berapa persentase (%) Budget untuk Objective Conversion?",
          `${f(ctx, "alokasi", "cv", "0")}%`,
        ],
        ["Menggunakan lifetime atau daily budget?", f(ctx, "tipeBudget", "tipe")],
        [
          "Menggunakan budgeting di level Campaign (CBO) atau Ad Set (ABO)?",
          f(ctx, "levelBudget", "level"),
        ],
        ["Fase testing", f(ctx, "fase", "ringkas", "-")],
        ["Pola budget harian", f(ctx, "polaHarian", "ringkas", "-")],
        ["Struktur ad set saat testing", ctx.fill(ctx.answers["struktur"]?.variant.headline ?? "-")],
        ["Indikator keputusan scaling", ctx.fill(ctx.answers["indikator"]?.variant.headline ?? "-")],
      ].map((p) => ({
        cells: [
          { text: p[0], style: "label" as const },
          { text: p[1], style: "isi" as const },
        ],
      })),
    ];

    const plotting: SheetRow[] = [
      { cells: [{ text: "Plotting Budget Campaign", style: "judul", span: 4 }] },
      { cells: [] },
      {
        cells: [
          { text: "Hari ke-", style: "kepala" },
          { text: "Objective Campaign", style: "kepala" },
          { text: "Budget Harian (Rupiah)", style: "kepala" },
          { text: "Testing atau Scaling", style: "kepala" },
        ],
      },
      ...baris.map((h) => ({
        cells: [
          { text: String(h.hari), style: "tanggal" as const },
          { text: h.objective, style: "isi" as const },
          { text: rupiah(h.budget), style: "isi" as const },
          { text: h.fase, style: "isi" as const },
        ],
      })),
      {
        cells: [
          { text: "Total", style: "label" },
          { text: `${DURASI} hari`, style: "krem" },
          { text: rupiah(r.total), style: "krem" },
          { text: `Testing ${r.hariTesting} hari`, style: "krem" },
        ],
      },
    ];

    const alasan: SheetRow[] = [
      { cells: [{ text: "Alasan Pemilihan Strategi", style: "judul", span: 2 }] },
      { cells: [] },
      ...(
        [
          ["Alokasi Budget", "alokasi"],
          ["Tipe Budget", "tipeBudget"],
          ["Level Budget", "levelBudget"],
          ["Struktur Ad Set", "struktur"],
          ["Fase Testing", "fase"],
          ["Pola Budget Harian", "polaHarian"],
          ["Indikator Scaling", "indikator"],
          ["Pertimbangan Utama", "pertimbangan"],
          ["Alasan Bentuk Plotting", "justifikasi"],
        ] as const
      ).map(([judul, id]) => ({
        cells: [
          { text: judul, style: "label" as const },
          { text: uraian(ctx, id), style: "isi" as const },
        ],
      })),
      ...r.perObjective.map((o) => ({
        cells: [
          { text: `Total ${o.nama}`, style: "label" as const },
          { text: `${o.hari} hari · ${rupiah(o.budget)}`, style: "isi" as const },
        ],
      })),
    ];

    const lembar: SheetSpec[] = [
      { name: "Strategi Awal", columns: [52, 46], rows: strategi },
      { name: "Plotting Budget", columns: [10, 24, 24, 22], rows: plotting },
      { name: "Alasan", columns: [26, 90], rows: alasan },
    ];
    return lembar;
  },
};

export default tpm7;
