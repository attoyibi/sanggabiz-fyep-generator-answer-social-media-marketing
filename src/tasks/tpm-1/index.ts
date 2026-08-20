import type { BuildContext, DocBlock, TaskDefinition } from "../types";
import { tpm1Groups } from "./bank";

const PRODUK = "VitaFresh";

/** Pembuka dokumen — divariasikan per peserta supaya tidak seragam. */
const pembuka = [
  "Dokumen ini memuat rancangan strategi pemasaran STP (Segmentation, Targeting, Positioning) untuk produk minuman kesehatan {{produk}}. Penyusunan dilakukan sebagai bagian dari Tugas Praktik Mandiri 1 pada Chapter Dasar-Dasar Sales dan Marketing.",
  "Laporan ini disusun untuk merancang strategi pemasaran produk minuman kesehatan {{produk}} melalui pendekatan STP (Segmentation, Targeting, Positioning), agar kegiatan promosi dan penjualan dapat diarahkan secara lebih tepat sasaran.",
  "Berikut adalah hasil penyusunan strategi STP (Segmentation, Targeting, Positioning) untuk produk {{produk}}, yang dikerjakan dalam rangka Tugas Praktik Mandiri 1 pelatihan Sales dan Marketing Konvensional dan Digital.",
  "Dokumen ini berisi analisis dan rancangan strategi pemasaran produk {{produk}} yang disusun dengan kerangka STP, mulai dari pembagian pasar, pemilihan target utama, hingga perumusan posisi produk di benak konsumen.",
  "Sebagai sales dan marketing officer, penyusun merancang strategi STP untuk produk minuman kesehatan {{produk}} agar perusahaan dapat menembus pasar yang lebih luas dengan pesan yang tepat sasaran.",
];

/** Pengantar tiap bagian — juga divariasikan. */
const pengantarSegmentasi = [
  "Pasar {{produk}} dibagi menjadi tiga segmen potensial dengan menggunakan kriteria demografi, psikografi, perilaku, dan geografis. Berikut uraian karakteristik serta kebutuhan utama masing-masing segmen.",
  "Berdasarkan analisis pasar, terdapat tiga segmen potensial bagi {{produk}}. Ketiganya dibentuk dari kriteria demografi, psikografi, perilaku, dan geografis, dengan karakteristik dan kebutuhan sebagai berikut.",
  "Tahap pertama strategi STP adalah membagi pasar menjadi kelompok-kelompok yang lebih kecil dan seragam. Berikut tiga segmen pasar potensial {{produk}} beserta karakteristik dan kebutuhan utamanya.",
  "Berikut tiga segmen pasar potensial untuk {{produk}} yang disusun berdasarkan kriteria segmentasi demografi, psikografi, perilaku, dan geografis, lengkap dengan karakteristik dan kebutuhan utama setiap kelompok.",
];

const pengantarTargeting = [
  "Dari ketiga segmen tersebut, dipilih satu target pasar utama yang dinilai paling potensial untuk digarap pada tahap awal peluncuran {{produk}}.",
  "Tahap berikutnya adalah menetapkan satu target pasar utama. Pemilihan dilakukan dengan mempertimbangkan ukuran pasar, daya beli, serta potensi pertumbuhan setiap segmen.",
  "Setelah pasar dipetakan, perusahaan perlu memusatkan sumber daya pada satu segmen yang paling menjanjikan. Berikut target pasar utama {{produk}} beserta alasan pemilihannya.",
  "Berdasarkan hasil segmentasi, ditetapkan satu target pasar utama yang akan menjadi fokus kegiatan promosi dan penjualan {{produk}}.",
];

const pengantarPositioning = [
  "Tahap terakhir adalah menentukan posisi {{produk}} di benak konsumen, yaitu citra dan keunggulan apa yang ingin diingat oleh target pasar.",
  "Setelah target pasar ditetapkan, langkah selanjutnya adalah merumuskan positioning, yakni citra dan keunggulan {{produk}} yang ingin ditanamkan di benak target konsumen.",
  "Positioning menentukan bagaimana {{produk}} ingin dikenang oleh target pasarnya dibandingkan produk pesaing. Berikut rumusan strategi positioning yang dipilih.",
  "Bagian ini merumuskan citra dan keunggulan {{produk}} yang ingin ditanamkan di benak konsumen, sekaligus kalimat positioning statement yang menjadi ringkasannya.",
];

const penutup = [
  "Dengan rangkaian strategi STP di atas, kegiatan promosi dan penjualan {{produk}} dapat diarahkan pada kelompok konsumen yang tepat, dengan pesan yang sesuai dengan kebutuhan mereka, sehingga anggaran pemasaran digunakan secara lebih efisien.",
  "Rangkaian strategi STP tersebut menjadikan segmentasi, target pasar, dan positioning {{produk}} saling terhubung, sehingga setiap kegiatan promosi memiliki dasar yang jelas dan hasilnya dapat diukur.",
  "Melalui strategi STP di atas, {{produk}} memiliki sasaran pasar yang jelas serta posisi yang khas di benak konsumen, sehingga produk tidak sekadar bersaing pada harga, melainkan pada manfaat yang ditawarkan.",
  "Strategi STP yang telah disusun ini menjadi pijakan bagi penyusunan bauran pemasaran {{produk}} pada tahap berikutnya, mulai dari penetapan harga, saluran distribusi, hingga pemilihan media promosi.",
];

/* ------------------------------------------------------------------ */
/* Pembuat blok visualisasi (nomor 4)                                  */
/* ------------------------------------------------------------------ */

function buildVisual(ctx: BuildContext): DocBlock[] {
  const visual = ctx.answers["visual"];
  const format = visual?.variant.fields?.format ?? "table";
  const blocks: DocBlock[] = [];

  const segIds = ["seg1", "seg2", "seg3"] as const;
  const segs = segIds.map((id) => {
    const a = ctx.answers[id];
    return {
      nama: ctx.fill(a?.variant.fields?.nama ?? a?.variant.headline ?? "-"),
      kriteria: ctx.fill(a?.variant.fields?.kriteria ?? "-"),
      karakteristik: ctx.fill(a?.variant.fields?.karakteristik ?? "-"),
      kebutuhan: ctx.fill(a?.variant.fields?.kebutuhan ?? "-"),
    };
  });

  const target = ctx.fill(ctx.answers["target"]?.variant.fields?.target ?? "-");
  const statement = ctx.fill(
    ctx.answers["statement"]?.variant.fields?.statement ??
      ctx.answers["statement"]?.variant.headline ??
      "-"
  );
  const posisiHeadline = ctx.fill(ctx.answers["posisi"]?.variant.headline ?? "-");

  if (visual?.variant.narrative) {
    blocks.push({ type: "paragraph", text: ctx.fill(visual.variant.narrative) });
  }

  const isTarget = (nama: string) =>
    target !== "-" && (target.includes(nama) || nama.includes(target));

  switch (format) {
    case "table":
      blocks.push({
        type: "table",
        head: ["Tahap", "Isi Strategi", "Keterangan"],
        rows: [
          ...segs.map((s, i) => [
            `Segmentasi ${i + 1}`,
            `${s.nama}\n(Kriteria: ${s.kriteria})`,
            `Karakteristik: ${s.karakteristik}\nKebutuhan utama: ${s.kebutuhan}`,
          ]),
          ["Targeting", target, `Target pasar utama yang dipilih dari ketiga segmen di atas.`],
          ["Positioning", statement, posisiHeadline],
        ],
        caption: "Tabel STP: hubungan segmentasi, target pasar, dan positioning",
      });
      break;

    case "table-min":
      blocks.push({
        type: "table",
        head: ["Segmentasi", "Targeting", "Positioning"],
        rows: [[segs.map((s) => s.nama).join("; "), target, statement]],
        caption: "Tabel ringkas STP",
      });
      break;

    case "flow":
      blocks.push({
        type: "flow",
        nodes: [
          {
            label: "1. SEGMENTASI",
            caption: segs.map((s, i) => `${i + 1}. ${s.nama} (${s.kriteria})`).join("\n"),
          },
          {
            label: "2. TARGETING",
            caption: `Target utama: ${target}`,
          },
          {
            label: "3. POSITIONING",
            caption: statement,
          },
        ],
      });
      break;

    case "mindmap":
      blocks.push({
        type: "mindmap",
        root: PRODUK,
        branches: [
          {
            label: "Segmentasi",
            children: segs.map((s) => `${s.nama} - ${s.kriteria}`),
          },
          {
            label: "Targeting",
            children: [
              `Target utama: ${target}`,
              ...segs.filter((s) => !isTarget(s.nama)).map((s) => `Pasar perluasan: ${s.nama}`),
            ],
          },
          {
            label: "Positioning",
            children: [posisiHeadline, statement],
          },
        ],
      });
      break;

    case "list":
      blocks.push({
        type: "bullets",
        items: [
          `Segmentasi: ${segs.map((s) => s.nama).join("; ")}`,
          `Targeting: ${target}`,
          `Positioning: ${statement}`,
        ],
      });
      break;

    default:
      // Format yang tidak relevan: tetap ditulis apa adanya sesuai pilihan peserta.
      blocks.push({
        type: "bullets",
        items: visual ? visual.variant.points.map((p) => ctx.fill(p)) : [],
      });
      break;
  }

  return blocks;
}

/* ------------------------------------------------------------------ */
/* Definisi tugas                                                      */
/* ------------------------------------------------------------------ */

const tpm1: TaskDefinition = {
  id: "tpm-1",
  navLabel: "Tugas 1",
  code: "TPM 1",
  title: "Merancang Strategi Marketing",
  subtitle: "Segmentasi, Targeting, dan Positioning (STP) suatu produk",
  available: true,
  meta: {
    judulPelatihan: "Sales dan Marketing Konvensional dan Digital",
    chapter: "Dasar-Dasar Sales dan Marketing",
    tujuan:
      "Peserta mampu memahami konsep dasar penjualan dan pemasaran konvensional vs digital, karakteristik, serta peran penting dalam bisnis.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang sales dan marketing officer di sebuah perusahaan yang baru meluncurkan produk minuman kesehatan bernama “VitaFresh”, yaitu minuman sari buah alami dengan tambahan vitamin C tinggi untuk gaya hidup sehat.",
      "Perusahaan ingin menembus pasar yang lebih luas dan meminta kamu menyusun strategi STP (Segmentasi, Targeting, Positioning) agar promosi dan penjualan produk lebih tepat sasaran.",
    ],
  },
  instructionSummary: [
    "Tentukan minimal 3 segmen pasar potensial berdasarkan kriteria demografi, psikografi, perilaku, atau geografis.",
    "Pilih 1 target pasar utama yang paling potensial beserta alasannya.",
    "Rumuskan strategi positioning dan kalimat positioning statement.",
    "Buat sketsa sederhana yang menggambarkan hubungan segmentasi, target pasar, dan positioning.",
  ],
  submission: {
    fileNamePattern: "TPM 1 - [Nama Lengkap Peserta]",
    fileName: (nama) => `TPM 1 - ${nama}`,
    notes: [
      "Kirimkan file dalam bentuk PDF yang berisi hasil penyusunan strategi STP produk.",
      "Nama file ditulis dengan format TPM 1 - [Nama Lengkap Peserta]. Contoh: TPM 1 - Putri Amalia.pdf",
      "Maksimal ukuran file 10MB.",
    ],
  },

  tokens: (ctx) => ({
    nama: ctx.nama,
    produk: PRODUK,
    seg1: ctx.answers["seg1"]?.variant.fields?.nama ?? ctx.answers["seg1"]?.variant.headline ?? "Segmen 1",
    seg2: ctx.answers["seg2"]?.variant.fields?.nama ?? ctx.answers["seg2"]?.variant.headline ?? "Segmen 2",
    seg3: ctx.answers["seg3"]?.variant.fields?.nama ?? ctx.answers["seg3"]?.variant.headline ?? "Segmen 3",
  }),

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Analisis Pasar dan Segmentasi (Segmentation)",
      brief: [
        "Tentukan minimal 3 segmen pasar potensial berdasarkan kriteria: 1. Demografi, 2. Psikografi, 3. Perilaku, atau 4. Geografis.",
        "Jelaskan karakteristik setiap segmen dan kebutuhan utama mereka.",
      ],
      groups: tpm1Groups.slice(0, 3),
    },
    {
      id: "step-2",
      number: 2,
      title: "Pilih Target Pasar (Targeting)",
      brief: [
        "Pilih 1 target pasar utama yang paling potensial untuk produk “VitaFresh”.",
        "Jelaskan alasan pemilihan target tersebut (misalnya: ukuran pasar, daya beli, potensi pertumbuhan, dan sebagainya).",
      ],
      groups: tpm1Groups.slice(3, 5),
    },
    {
      id: "step-3",
      number: 3,
      title: "Tentukan Positioning (Positioning)",
      brief: [
        "Rumuskan strategi positioning yang menggambarkan citra dan keunggulan produk “VitaFresh” di benak konsumen.",
        "Buat kalimat positioning statement.",
      ],
      groups: tpm1Groups.slice(5, 7),
    },
    {
      id: "step-4",
      number: 4,
      title: "Visualisasi Strategi",
      brief: [
        "Buat sketsa sederhana (bisa berupa tabel, diagram, atau mind map) yang menggambarkan hubungan antara segmentasi, target pasar, dan positioning.",
      ],
      groups: tpm1Groups.slice(7, 8),
    },
  ],

  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const A = ctx.answers;

    b.push({
      type: "title",
      text: "Strategi Marketing STP Produk VitaFresh",
      subtitle: "Tugas Praktik Mandiri 1 - Merancang Strategi Marketing",
    });

    b.push({
      type: "meta",
      rows: [
        ["Nama Peserta", ctx.nama],
        ["Judul Pelatihan", ctx.task.meta.judulPelatihan],
        ["Chapter", ctx.task.meta.chapter],
        ["Tugas", "Praktik Mandiri 1 - Merancang Strategi Marketing (STP)"],
        ["Produk", `${PRODUK} - minuman sari buah alami dengan vitamin C tinggi`],
      ],
    });

    b.push({ type: "divider" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("pembuka", pembuka)) });

    /* ---- 1. Segmentasi ---- */
    b.push({ type: "heading", number: 1, text: "Analisis Pasar dan Segmentasi (Segmentation)" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("intro-seg", pengantarSegmentasi)) });

    (["seg1", "seg2", "seg3"] as const).forEach((id, i) => {
      const a = A[id];
      if (!a) return;
      const f = a.variant.fields ?? {};
      b.push({
        type: "subheading",
        text: `Segmen ${i + 1}: ${ctx.fill(f.nama ?? a.variant.headline)}`,
      });
      b.push({
        type: "bullets",
        items: [
          `Kriteria segmentasi: ${ctx.fill(f.kriteria ?? "-")}`,
          `Karakteristik: ${ctx.fill(f.karakteristik ?? "-")}`,
          `Kebutuhan utama: ${ctx.fill(f.kebutuhan ?? "-")}`,
        ],
      });
    });

    b.push({
      type: "table",
      head: ["Segmen", "Kriteria", "Kebutuhan Utama"],
      rows: (["seg1", "seg2", "seg3"] as const).map((id, i) => {
        const f = A[id]?.variant.fields ?? {};
        return [
          `${i + 1}. ${ctx.fill(f.nama ?? A[id]?.variant.headline ?? "-")}`,
          ctx.fill(f.kriteria ?? "-"),
          ctx.fill(f.kebutuhan ?? "-"),
        ];
      }),
      caption: "Ringkasan tiga segmen pasar potensial",
    });

    /* ---- 2. Targeting ---- */
    b.push({ type: "heading", number: 2, text: "Pilih Target Pasar (Targeting)" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("intro-target", pengantarTargeting)) });

    const target = A["target"];
    if (target) {
      b.push({
        type: "subheading",
        text: `Target Pasar Utama: ${ctx.fill(target.variant.fields?.target ?? target.variant.headline)}`,
      });
      if (target.variant.narrative) {
        b.push({ type: "paragraph", text: ctx.fill(target.variant.narrative) });
      }
      b.push({ type: "bullets", items: target.variant.points.map((p) => ctx.fill(p)) });
    }

    const alasan = A["alasan"];
    if (alasan) {
      b.push({ type: "subheading", text: "Alasan Pemilihan Target Pasar" });
      b.push({ type: "bullets", items: alasan.variant.points.map((p) => ctx.fill(p)) });
    }

    /* ---- 3. Positioning ---- */
    b.push({ type: "heading", number: 3, text: "Tentukan Positioning (Positioning)" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("intro-posisi", pengantarPositioning)) });

    const posisi = A["posisi"];
    if (posisi) {
      b.push({ type: "subheading", text: `Strategi Positioning: ${ctx.fill(posisi.variant.headline)}` });
      if (posisi.variant.narrative) {
        b.push({ type: "paragraph", text: ctx.fill(posisi.variant.narrative) });
      }
      b.push({ type: "bullets", items: posisi.variant.points.map((p) => ctx.fill(p)) });
    }

    const st = A["statement"];
    if (st) {
      b.push({ type: "subheading", text: "Positioning Statement" });
      b.push({
        type: "quote",
        text: ctx.fill(st.variant.fields?.statement ?? st.variant.headline),
        caption: st.variant.points[0] ? ctx.fill(st.variant.points[0]) : undefined,
      });
    }

    /* ---- 4. Visualisasi ---- */
    b.push({ type: "heading", number: 4, text: "Visualisasi Strategi" });
    b.push(...buildVisual(ctx));

    /* ---- Penutup ---- */
    b.push({ type: "divider" });
    b.push({ type: "heading", text: "Kesimpulan" });
    b.push({ type: "paragraph", text: ctx.fill(ctx.pick("penutup", penutup)) });

    return b;
  },
};

export default tpm1;
