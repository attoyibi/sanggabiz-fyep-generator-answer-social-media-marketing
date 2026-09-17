import {
  BRAND_WARNA,
  KODE_KELAS,
  type BuildContext,
  type DesignLayer,
  type DesignSpec,
  type DocBlock,
  type IconNode,
  type SlideSpec,
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

/**
 * Ringkasan pendek untuk A3 Summary Report.
 *
 * Dokumen capstone menyebut A3 Report sebagai "laporan ringkas satu halaman"
 * yang dipakai untuk screening cepat, jadi yang masuk ke sana adalah poin-poin
 * jawaban, bukan uraian panjangnya. Uraian utuhnya tetap dipakai di deck, yang
 * memang tempatnya menjelaskan.
 */
function ringkas(
  ctx: BuildContext,
  sumber: { grup: string; field: string },
  /** Batas jumlah baris supaya laporannya tetap muat satu halaman. */
  maksBaris = 2
): string {
  if (ctx.mode === "sendiri") {
    const isi = dariForm(ctx, sumber.field);
    if (!isi) return BELUM;
    // Isian peserta berbentuk paragraf bebas, jadi tiap baris ikut dipotong
    // sepanjang satu baris cetak, membatasi jumlah barisnya saja tidak cukup
    // karena satu paragraf panjang tetap membungkus menjadi beberapa baris.
    return isi
      .split("\n")
      .filter(Boolean)
      .slice(0, maksBaris)
      .map((baris) => penggal(baris.trim(), 108))
      .join("\n");
  }
  const jawaban = ctx.answers[sumber.grup];
  if (!jawaban) return BELUM;
  return jawaban.variant.points
    .slice(0, maksBaris)
    .map((p) => `- ${ctx.fill(p)}`)
    .join("\n");
}

/** Satu konten pada Visual Gallery, sudah dipisah bagiannya. */
interface KontenGaleri {
  format: string;
  kanal: string;
  penjelasan: string;
}

/**
 * Konten Visual Gallery, apa pun jalurnya.
 *
 * Pola isinya "format | kanal | penjelasan". Peserta jalur sendiri bisa saja
 * menulis tanpa pemisah, jadi kalimat utuhnya dipakai sebagai penjelasan
 * alih-alih menggeser bagian lain.
 */
function galeriItems(ctx: BuildContext): KontenGaleri[] {
  const mentah =
    ctx.mode === "sendiri"
      ? ["konten1", "konten2", "konten3", "konten4"].map((f) => dariForm(ctx, f))
      : ["k1", "k2", "k3", "k4"].map((k) => dariKartu(ctx, "galeri", k));

  return mentah
    .filter((v) => v.length > 0)
    .map((v) => {
      const [a = "", b = "", c = ""] = v.split("|").map((x) => x.trim());
      return c ? { format: a, kanal: b, penjelasan: c } : { format: "", kanal: "", penjelasan: a };
    });
}

/**
 * Baris tabel Visual Gallery untuk one pager.
 *
 * Penjelasannya dipangkas supaya tiap konten cukup satu baris: galeri di A3
 * Report memang hanya penanda karya, sedangkan uraian utuhnya sudah mendapat
 * satu slide sendiri di deck.
 */
function galeriRows(ctx: BuildContext): string[][] {
  const items = galeriItems(ctx);
  if (items.length === 0) return [["1", "-", BELUM]];
  return items.map((k, i) => [
    String(i + 1),
    k.format ? `${k.format} - ${k.kanal}` : "-",
    penggal(k.penjelasan, 78),
  ]);
}

/**
 * Peran tiap konten di dalam strategi, sejajar urutannya dengan galeriItems().
 *
 * Pada jalur mitra, poin-poin kartu galeri memang ditulis satu poin untuk satu
 * konten, jadi poin ke-i menjelaskan konten ke-i. Jalur sendiri tidak punya
 * padanannya karena kontennya dituliskan peserta.
 */
function galeriPeran(ctx: BuildContext): string[] {
  if (ctx.mode === "sendiri") return [];
  return (ctx.answers["galeri"]?.variant.points ?? []).map((p) => ctx.fill(p));
}

/** Memotong teks pada batas kata terdekat, lalu menutupnya dengan elipsis. */
function penggal(teks: string, maks: number): string {
  if (teks.length <= maks) return teks;
  const potong = teks.slice(0, maks);
  const spasi = potong.lastIndexOf(" ");
  return `${(spasi > maks * 0.6 ? potong.slice(0, spasi) : potong).trimEnd()}...`;
}

/* ------------------------------------------------------------------ */
/* Visual otomatis untuk deck PPT                                       */
/*                                                                      */
/* Dokumen capstone resminya meminta peserta menempelkan visual sendiri */
/* di tiap slide showcase dan melengkapi Profile Card dengan foto. Deck */
/* yang dihasilkan di sini malah menggambar kartu bermerek untuk kedua  */
/* bagian itu, supaya berkas yang diunduh langsung lengkap tanpa bagian */
/* kosong yang masih menunggu peserta menambahkan sesuatu secara manual.*/
/* Peserta tetap bebas menimpanya dengan visual asli saat menyunting    */
/* ulang deck-nya di Canva/PowerPoint, ini hanya isian siap pakai.      */
/* ------------------------------------------------------------------ */

/** Warna aksen kartu showcase (badge, ikon pil), dipilih acak per peserta lewat ctx.pick(). */
const PALET_SHOWCASE = [
  BRAND_WARNA.planBlue,
  BRAND_WARNA.magenta,
  BRAND_WARNA.darkBlue,
  BRAND_WARNA.orange,
  BRAND_WARNA.lightBlue,
  BRAND_WARNA.purple,
] as const;

/** Krem hangat, dipakai sebagai latar netral mengikuti gaya referensi tata letak. */
const KREM = "#FBF6E9";
const HITAM_JUDUL = "#1A1A1A";
const ABU_TEKS = "#4A4A4A";

/**
 * Jenis konten ditebak dari teks format, supaya ikonnya benar-benar mewakili
 * bentuk visual yang dimaksud (Reels menampilkan ikon putar, carousel
 * menampilkan tumpukan kartu, dst.), bukan sekadar kotak warna polos.
 */
type JenisKonten = "video" | "carousel" | "story" | "poster" | "dokumen";

function tebakJenis(format: string): JenisKonten {
  const f = format.toLowerCase();
  if (/reels|video|capcut/.test(f)) return "video";
  if (/carousel/.test(f)) return "carousel";
  if (/story|cerita berseri|sorotan/.test(f)) return "story";
  if (/poster|gambar|feed tunggal|single/.test(f)) return "poster";
  return "dokumen";
}

/* ------------------------------------------------------------------ */
/* Ikon: data mentah dari lucide-react (lihat package.json)             */
/*                                                                      */
/* Kanvas 2D tidak bisa merender komponen React secara langsung, jadi   */
/* path/rect/circle tiap ikon disalin apa adanya dari berkas sumber     */
/* lucide-react (node_modules/lucide-react/dist/esm/icons/*.mjs) lalu   */
/* digambar lewat DesignLayer bertipe "icon" (lihat src/tasks/types.ts  */
/* dan penggambarnya di src/lib/export/png.ts). Dengan ini proyek punya */
/* satu sumber ikon yang konsisten, bukan bentuk primitif gambar tangan.*/
/* ------------------------------------------------------------------ */
const IKON_VIDEO: IconNode[] = [
  ["path", { d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }],
  ["rect", { x: 2, y: 6, width: 14, height: 12 }],
];
const IKON_CAROUSEL: IconNode[] = [
  ["path", { d: "M2 7v10" }],
  ["path", { d: "M6 5v14" }],
  ["rect", { x: 10, y: 3, width: 12, height: 18 }],
];
const IKON_STORY: IconNode[] = [
  ["rect", { x: 5, y: 2, width: 14, height: 20 }],
  ["path", { d: "M12 18h.01" }],
];
const IKON_POSTER: IconNode[] = [
  ["rect", { x: 3, y: 3, width: 18, height: 18 }],
  ["circle", { cx: 9, cy: 9, r: 2 }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }],
];
const IKON_DOKUMEN: IconNode[] = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
    },
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M10 9H8" }],
  ["path", { d: "M16 13H8" }],
  ["path", { d: "M16 17H8" }],
];
const IKON_TARGET: IconNode[] = [
  ["circle", { cx: 12, cy: 12, r: 10 }],
  ["circle", { cx: 12, cy: 12, r: 6 }],
  ["circle", { cx: 12, cy: 12, r: 2 }],
];
const IKON_CHEVRON: IconNode[] = [["path", { d: "m9 18 6-6-6-6" }]];

function ikonJenis(jenis: JenisKonten): IconNode[] {
  switch (jenis) {
    case "video":
      return IKON_VIDEO;
    case "carousel":
      return IKON_CAROUSEL;
    case "story":
      return IKON_STORY;
    case "poster":
      return IKON_POSTER;
    default:
      return IKON_DOKUMEN;
  }
}

/**
 * Kartu untuk satu konten pada Individual Showcase, mengikuti pola tata
 * letak pada referensi di public/layout_reference: badge logo pojok kiri
 * atas, judul besar-bold, subteks deskripsi, lalu dua kartu pil kuning
 * berisi ikon + label tebal + keterangan.
 *
 * Warna aksen dan latar (krem/kuning) dipilih acak lewat ctx.pick() supaya
 * tiap peserta mendapat kombinasi berbeda, sama seperti bank jawaban tugas
 * lain. Ikonnya sendiri mengikuti jenis konten yang sebenarnya dipilih
 * (Reels, carousel, story, dst.), bukan gambar generik.
 */
function desainShowcase(
  item: KontenGaleri,
  index: number,
  brand: string,
  peran: string | undefined,
  pick: BuildContext["pick"]
): DesignSpec {
  const aksen = pick(`capstone-showcase-warna-${index}`, [...PALET_SHOWCASE]);
  const latar = pick(`capstone-showcase-latar-${index}`, [KREM, KREM, BRAND_WARNA.yellow]);
  // Dua gaya tata letak dipilih acak per peserta: "tumpuk" (dua kartu pil
  // berdiri, judul rata kiri) dan "alur" (satu pil lebar dengan panah
  // penghubung, judul rata tengah) — supaya slide showcase antar-konten dan
  // antar-peserta tidak terasa seragam, meniru variasi gaya pada referensi.
  const gaya = pick(`capstone-showcase-gaya-${index}`, ["tumpuk", "alur"]);
  const rataTengah = gaya === "alur";
  // Kartu pil selalu kuning, kecuali latarnya sendiri sudah kuning — dalam
  // kondisi itu pilnya dibuat krem supaya tetap kontras dan batasnya tetap
  // terlihat, bukan menyatu dengan latar belakang.
  const warnaPil = latar === BRAND_WARNA.yellow ? KREM : BRAND_WARNA.yellow;
  const jenis = tebakJenis(item.format);
  const W = 1000;
  const H = 1250;
  const M = 64;
  const lebarIsi = W - M * 2;

  const layers: DesignLayer[] = [];

  // Badge logo/inisial, pojok kiri atas — posisinya tetap di setiap kartu,
  // meniru badge logo pada referensi.
  const inisial = (brand.trim()[0] ?? "?").toUpperCase();
  layers.push({ type: "ellipse", cx: M + 34, cy: M + 34, rx: 34, ry: 34, fill: aksen });
  layers.push({
    type: "text",
    x: M,
    y: M + 19,
    w: 68,
    text: inisial,
    size: 28,
    color: BRAND_WARNA.white,
    font: "judul",
    weight: "bold",
    align: "center",
  });

  // Judul besar: nama format kontennya.
  const judulTeks = item.format || "Konten";
  const judulY = M + 110;
  const judulSize = 56;
  layers.push({
    type: "text",
    x: M,
    y: judulY,
    w: lebarIsi,
    text: judulTeks,
    size: judulSize,
    color: HITAM_JUDUL,
    font: "judul",
    weight: "bold",
    leading: 1.15,
    align: rataTengah ? "center" : "left",
  });

  // Taksiran jumlah baris supaya subteks dan kartu pil di bawahnya tidak
  // tertindih judul, sama seperti pola taksiran baris pada TPM 4. Dibuat
  // sengaja konservatif (chars/baris kecil) supaya jarak yang dihasilkan
  // lebih longgar, bukan lebih sempit, bila taksirannya meleset.
  const barisJudul = Math.max(1, Math.ceil(judulTeks.length / 18));
  const subteksY = judulY + barisJudul * judulSize * 1.15 + 28;
  const subteksTeks = penggal(item.penjelasan || "Konten belum dijelaskan", 140);
  const subteksSize = 30;
  layers.push({
    type: "text",
    x: M,
    y: subteksY,
    w: lebarIsi,
    text: subteksTeks,
    size: subteksSize,
    color: ABU_TEKS,
    font: "teks",
    leading: 1.35,
    align: rataTengah ? "center" : "left",
  });

  const barisSub = Math.max(1, Math.ceil(subteksTeks.length / 46));
  const pilAtas = subteksY + barisSub * subteksSize * 1.35 + 56;
  const peranIsi = peran || [item.format, item.kanal].filter(Boolean).join(" • ") || "Bagian dari rangkaian konten";

  if (gaya === "tumpuk") {
    const pilTinggi = 130;
    const pilJarak = 28;

    /** Satu kartu pil kuning: lingkaran ikon di kiri, label tebal + keterangan di kanan. */
    function pil(label: string, isi: string, node: IconNode[], y: number): void {
      layers.push({ type: "rect", x: M, y, w: lebarIsi, h: pilTinggi, fill: warnaPil, radius: 24 });
      const bulatCx = M + 28 + 26;
      const bulatCy = y + pilTinggi / 2;
      layers.push({ type: "ellipse", cx: bulatCx, cy: bulatCy, rx: 26, ry: 26, fill: BRAND_WARNA.white });
      layers.push({ type: "icon", node, viewBox: 24, x: bulatCx - 15, y: bulatCy - 15, size: 30, color: aksen, strokeWidth: 2.2 });

      const teksX = M + 28 + 66;
      const teksW = lebarIsi - 28 * 2 - 66;
      layers.push({
        type: "text",
        x: teksX,
        y: y + 22,
        w: teksW,
        text: label,
        size: 24,
        color: HITAM_JUDUL,
        font: "judul",
        weight: "bold",
        leading: 1.2,
      });
      layers.push({
        type: "text",
        x: teksX,
        y: y + 56,
        w: teksW,
        text: penggal(isi, 70),
        size: 22,
        color: ABU_TEKS,
        font: "teks",
        leading: 1.3,
      });
    }

    pil("Kanal", item.kanal || "Belum ditentukan", ikonJenis(jenis), pilAtas);
    pil("Peran dalam Strategi", peranIsi, IKON_TARGET, pilAtas + pilTinggi + pilJarak);
  } else {
    // Gaya "alur": satu pil lebar terbagi dua, dihubungkan panah di tengah —
    // meniru pola "Data Mentah → Proses → Dasbor" pada referensi.
    const pilTinggi = 170;
    const gapTengah = 70;
    const halfW = (lebarIsi - gapTengah) / 2;

    layers.push({ type: "rect", x: M, y: pilAtas, w: lebarIsi, h: pilTinggi, fill: warnaPil, radius: 24 });

    function separuh(label: string, isi: string, node: IconNode[], kiri: boolean): void {
      const x0 = kiri ? M + 24 : M + halfW + gapTengah;
      const bulatCx = x0 + 22;
      const bulatCy = pilAtas + 64;
      layers.push({ type: "ellipse", cx: bulatCx, cy: bulatCy, rx: 22, ry: 22, fill: BRAND_WARNA.white });
      layers.push({ type: "icon", node, viewBox: 24, x: bulatCx - 13, y: bulatCy - 13, size: 26, color: aksen, strokeWidth: 2.2 });

      const teksX = x0 + 56;
      const teksW = halfW - 24 - 56;
      layers.push({
        type: "text",
        x: teksX,
        y: pilAtas + 26,
        w: teksW,
        text: label,
        size: 21,
        color: HITAM_JUDUL,
        font: "judul",
        weight: "bold",
        leading: 1.2,
      });
      layers.push({
        type: "text",
        x: teksX,
        y: pilAtas + 58,
        w: teksW,
        text: penggal(isi, 46),
        size: 19,
        color: ABU_TEKS,
        font: "teks",
        leading: 1.3,
      });
    }

    separuh("Kanal", item.kanal || "Belum ditentukan", ikonJenis(jenis), true);
    separuh("Peran", peranIsi, IKON_TARGET, false);

    layers.push({
      type: "icon",
      node: IKON_CHEVRON,
      viewBox: 24,
      x: M + halfW + gapTengah / 2 - 12,
      y: pilAtas + 64 - 12,
      size: 24,
      color: aksen,
      strokeWidth: 2.5,
    });
  }

  // Footer: nama akun di kiri, ikon panah di kanan — meniru penanda "Geser"
  // pada referensi.
  layers.push({
    type: "text",
    x: M,
    y: H - M - 26,
    w: lebarIsi * 0.7,
    text: `@${brand.toLowerCase().replace(/\s+/g, "")}`,
    size: 22,
    color: ABU_TEKS,
    font: "teks",
    weight: "bold",
  });
  layers.push({ type: "icon", node: IKON_CHEVRON, viewBox: 24, x: W - M - 24, y: H - M - 38, size: 24, color: aksen });

  return {
    name: `showcase-${index + 1}`,
    label: `Individual Showcase ${index + 1}`,
    width: W,
    height: H,
    background: latar,
    layers,
    safeZone: { top: 40, bottom: 40, left: 40, right: 40 },
  };
}

/** Kartu profil untuk slide penutup: inisial, nama, dan peran. Warna dipilih acak per peserta. */
function desainProfilCard(nama: string, pick: BuildContext["pick"]): DesignSpec {
  const latar = pick("capstone-profil-warna", [...PALET_SHOWCASE]);
  const inisial =
    nama
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() ?? "")
      .join("") || "?";
  const W = 900;
  const H = 900;

  const layers: DesignLayer[] = [
    { type: "ellipse", cx: W / 2, cy: 320, rx: 170, ry: 170, fill: BRAND_WARNA.white },
    {
      type: "text",
      x: W / 2 - 170,
      y: 320 - 78,
      w: 340,
      text: inisial,
      size: 130,
      color: latar,
      font: "judul",
      weight: "bold",
      align: "center",
    },
    {
      type: "text",
      x: 50,
      y: 540,
      w: W - 100,
      text: nama || "Nama Peserta",
      size: 52,
      color: BRAND_WARNA.white,
      font: "judul",
      weight: "bold",
      align: "center",
    },
    {
      type: "text",
      x: 50,
      y: 616,
      w: W - 100,
      text: "Social Media Specialist",
      size: 28,
      color: BRAND_WARNA.white,
      font: "teks",
      align: "center",
    },
  ];

  return {
    name: "profile-card",
    label: "Profile Card",
    width: W,
    height: H,
    background: latar,
    layers,
    safeZone: { top: 40, bottom: 40, left: 40, right: 40 },
  };
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
      "Kamu bisa mengerjakannya dengan dua cara. Memakai mitra UMKM yang sudah kami siapkan, yaitu Sanggabiz, sehingga kamu tinggal memilih jawaban seperti pada tugas-tugas sebelumnya. Atau memakai data UMKM milikmu sendiri, usaha keluarga, usaha teman, atau klien yang benar-benar kamu dampingi, lalu mengisikannya lewat formulir di halaman ini.",
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
        `Kamu adalah seorang Social Media Specialist yang dipercaya menangani akun Instagram ${SANGGABIZ.nama}, sebuah perusahaan di ${SANGGABIZ.kota} yang bekerja sebagai ${SANGGABIZ.model}. Alih-alih menjual satu aplikasi, ${SANGGABIZ.nama} mengambil alih pekerjaan operasional pemilik usaha, keuangan, penagihan, layanan pelanggan, sampai administrasi tim, lewat lima layanan yang saling terhubung.`,
        `${SANGGABIZ.nama} dipimpin perempuan dan menempatkan inklusi di dalam model bisnisnya. Lewat program ${SANGGABIZ.program}, perusahaan ini membuka akses teknologi dan pendampingan bagi pelaku UMKM perempuan, wirausaha muda, dan penyandang disabilitas, kelompok yang selama ini paling jarang disentuh layanan konsultan bisnis.`,
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
        "Kamu mengerjakan capstone ini memakai UMKM pilihanmu sendiri, usaha milikmu, usaha keluarga, usaha teman, atau klien yang benar-benar kamu dampingi. Portofolio yang lahir dari kasus nyata biasanya lebih kuat di mata pemberi kerja, karena kamu bisa menceritakan keputusannya dengan yakin saat ditanya.",
        "Yang perlu kamu siapkan hanyalah keterangan dasar usahanya: bidang usaha, lokasi, keunggulan, siapa audiensnya, dan konten apa yang sudah atau akan kamu buat. Tidak perlu data penjualan atau angka rahasia apa pun.",
        "Formulir di bawah akan memandumu bagian demi bagian, mengikuti urutan yang sama dengan A3 Summary Report. Tiap kolom disertai penjelasan dan contoh isian yang bisa kamu pakai sebagai titik awal lalu kamu sunting sesuai usahamu.",
        "Kalau usaha yang kamu pilih belum punya akun media sosial atau kontennya baru rencana, itu tidak masalah. Tulis saja rencananya: yang dinilai adalah cara berpikirmu menyusun strategi, bukan jumlah pengikut usahanya.",
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
      "Ada dua berkas yang harus dikumpulkan, dan halaman ini menyiapkan keduanya: A3 Summary Report satu halaman (tombol A3 One Pager) dan PPT Presentasi (tombol Deck PPT).",
      `Nama file ditulis dengan format ${KODE_KELAS}-capstone-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-capstone-Putri Amalia.pdf dan ${KODE_KELAS}-capstone-Putri Amalia.pptx`,
      "Berkas .pptx-nya bisa langsung dibuka dan disunting di PowerPoint, Google Slides, maupun Canva. Kamu bebas berkreasi mengubah tampilannya selama bagian-bagian yang diminta tetap ada.",
      "Referensi visual A3 Report: cari \"One Page Marketing Case Study\" atau \"Executive Summary Infographic\". Untuk deck, cari \"Digital Marketing Pitch Deck\".",
      "Sebelum dikirim, tambahkan kode QR yang mengarah ke file PPT lengkapmu pada A3 Report, serta lengkapi Profile Card di slide penutup dengan foto profesional dan tautan LinkedIn.",
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

  /**
   * Dokumen capstone meminta dua berkas terpisah, jadi keduanya dihasilkan
   * sebagai berkas yang benar-benar berbeda bentuk: PDF A3 satu halaman untuk
   * Summary Report, dan .pptx yang bisa disunting untuk decknya.
   */
  downloads: ["pdf", "pptx"],
  orientation: "landscape",
  pageSize: "a3",
  labelUnduhan: {
    pdf: "A3 One Pager",
    pptx: "Deck PPT",
  },

  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const namaUmkm =
      ctx.mode === "sendiri" ? dariForm(ctx, "namaUmkm") || BELUM : SANGGABIZ.nama;

    /* ---------- Halaman 1: A3 Summary Report ---------- */
    b.push({ type: "title", text: "Capstone Project - A3 Summary Report" });
    // Identitas sengaja dirapatkan menjadi satu baris: laporan ini harus muat
    // satu halaman, dan tiga baris terpisah menghabiskan ruang tanpa menambah
    // keterangan apa pun.
    b.push({
      type: "byline",
      text: `${ctx.nama}  •  Social Media Marketing  •  Mitra UMKM: ${namaUmkm}`,
    });

    b.push({ type: "label", text: "Business Context" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.24,
      rows:
        ctx.mode === "sendiri"
          ? [
              {
                label: "Profil UMKM",
                value: [
                  dariForm(ctx, "bidang") || BELUM,
                  `${dariForm(ctx, "lokasi") || BELUM}  •  ${dariForm(ctx, "akun") || "belum ada akun"}`,
                  ringkas(ctx, { grup: "konteks", field: "keunggulan" }),
                ].join("\n"),
              },
              {
                label: "Target Audiens",
                value: [
                  ringkas(ctx, { grup: "audiens", field: "audiens" }),
                  ringkas(ctx, { grup: "audiens", field: "painPoint" }, 1),
                ].join("\n"),
              },
            ]
          : [
              {
                label: "Profil UMKM",
                value: [
                  `${SANGGABIZ.nama} - ${SANGGABIZ.tagline}`,
                  `${SANGGABIZ.kota}  •  ${SANGGABIZ.instagram}`,
                ].join("\n"),
              },
              { label: "Target Audiens", value: ringkas(ctx, { grup: "audiens", field: "audiens" }) },
            ],
    });

    b.push({ type: "label", text: "Strategy Highlights" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.24,
      rows: [
        { label: "Pilar Konten", value: ringkas(ctx, { grup: "pilar", field: "pilar" }) },
        { label: "Ritme Konten", value: ringkas(ctx, { grup: "kalender", field: "ritme" }) },
      ],
    });

    b.push({ type: "label", text: "Visual Gallery" });
    b.push({
      type: "grid",
      head: ["No", "Format dan Kanal", "Judul dan Penjelasan"],
      widths: [0.05, 0.23, 0.72],
      rows: galeriRows(ctx),
    });

    // Tautan portofolio digabung ke tabel ini, bukan diberi label sendiri:
    // isinya cuma satu baris, dan A3 Report harus tetap muat satu halaman.
    b.push({ type: "label", text: "Technical Skill Evidence & Portfolio" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      labelWidth: 0.24,
      rows: [
        { label: "Visual Hook", value: ringkas(ctx, { grup: "hook", field: "hook" }) },
        {
          label: "Copywriting",
          value:
            ctx.mode === "sendiri"
              ? [dariForm(ctx, "formula") || BELUM, dariForm(ctx, "storytelling")]
                  .filter(Boolean)
                  .join("\n")
              : [
                  dariKartu(ctx, "copywriting", "formula") || BELUM,
                  ...(ctx.answers["copywriting"]?.variant.points ?? [])
                    .slice(0, 1)
                    .map((p) => `- ${ctx.fill(p)}`),
                ].join("\n"),
        },
        {
          label: "QR Code Portfolio",
          value:
            ctx.mode === "sendiri"
              ? dariForm(ctx, "portfolio") || "Belum diisi - tempelkan tautan deck PPT-mu di sini"
              : "Unggah deck PPT ke Google Drive, buka aksesnya, lalu ubah tautannya jadi kode QR",
        },
      ],
    });

    return b;
  },

  /**
   * Deck presentasi. Penomoran slidenya mengikuti dokumen Capstone resmi,
   * termasuk rentang "Slide 3-9" untuk Individual Showcase: di situ satu
   * konten memang mendapat satu slide, jadi jumlahnya ikut jumlah konten
   * yang dipilih peserta.
   */
  buildSlides: (ctx) => {
    const namaUmkm =
      ctx.mode === "sendiri" ? dariForm(ctx, "namaUmkm") || BELUM : SANGGABIZ.nama;
    const konten = galeriItems(ctx);
    const hook = bahan(ctx, { grup: "hook", field: "hook" });
    const narasi = bahan(ctx, { grup: "copywriting", field: "storytelling" });
    const formula =
      ctx.mode === "sendiri"
        ? bahan(ctx, { grup: "copywriting", field: "formula" })
        : bahan(ctx, { grup: "copywriting", key: "formula", field: "formula" });

    const slides: SlideSpec[] = [
      {
        layout: "sampul",
        title: "Capstone Project",
        subtitle: `Social Media Marketing untuk ${namaUmkm}\n${ctx.nama}`,
        body: [],
      },
      {
        title: "Slide 1: Profil & Analisis Bisnis",
        subtitle: "Hasil riset target audiens dan kompetitor",
        body: [
          {
            type: "fields",
            rows: [
              { label: "Profil Mitra", value: bahan(ctx, { grup: "konteks", field: "bidang" }) },
              {
                label: "Target Audiens",
                value: bahan(ctx, { grup: "audiens", field: "audiens" }),
              },
            ],
          },
        ],
      },
      {
        title: "Slide 2: Strategic Content Plan",
        subtitle: "Kalender konten dan alasan pemilihan topik",
        body: [
          {
            type: "fields",
            rows: [
              { label: "Pilar Konten", value: bahan(ctx, { grup: "pilar", field: "pilar" }) },
              {
                label: "Ritme dan Alasan Topik",
                value: bahan(ctx, { grup: "kalender", field: "ritme" }),
              },
              // Pendekatan visual dan copywriting berlaku untuk seluruh konten,
              // jadi tempatnya di sini, bukan diulang di tiap slide showcase.
              { label: "Visual Hook yang Dipakai", value: hook },
              { label: "Formula Copywriting", value: formula },
              { label: "Cara Narasi Bekerja", value: narasi },
            ],
          },
        ],
      },
    ];

    /*
     * Slide 3-9: satu konten satu slide, sesuai ketentuan dokumen capstone.
     *
     * Tiap slide memuat hal yang khas konten itu (isi dan perannya di dalam
     * strategi) beserta kartu visual bermerek yang digambar otomatis lewat
     * desainShowcase(), supaya slide-nya tidak punya bagian kosong yang masih
     * harus diisi manual. Pendekatan visual dan copywriting sudah dinyatakan
     * di Slide 2; peserta tetap bebas mengganti kartu ini dengan visual asli
     * saat menyunting ulang deck-nya di Canva/PowerPoint.
     */
    const daftar = konten.length > 0 ? konten : [{ format: "", kanal: "", penjelasan: BELUM }];
    const peran = galeriPeran(ctx);
    daftar.forEach((k, i) => {
      const baris = [{ label: "Konten", value: k.penjelasan }];
      if (peran[i]) baris.push({ label: "Peran dalam Strategi", value: peran[i] });
      baris.push({
        label: "Mengapa Hook Ini Bekerja",
        value: `Hook "${penggal(hook, 80)}" dipakai karena konsisten dengan formula copywriting dan narasi yang sudah ditetapkan di Slide 2.`,
      });
      slides.push({
        title: `Individual Showcase ${i + 1}`,
        subtitle: k.format ? `${k.format} - ${k.kanal}` : undefined,
        body: [{ type: "fields", rows: baris }],
        visual: desainShowcase(k, i, namaUmkm, peran[i], ctx.pick),
      });
    });

    slides.push({
      title: "Slide 6: Impact & Potential",
      subtitle: "Potensi peningkatan brand awareness bagi mitra UMKM",
      body: [
        {
          type: "fields",
          rows: [{ label: "Analisis", value: bahan(ctx, { grup: "impact", field: "impact" }) }],
        },
      ],
    });

    slides.push({
      layout: "penutup",
      title: "Slide 7: Closure & Hire Me",
      subtitle: "Kesiapan berkontribusi di industri",
      body: [
        {
          type: "fields",
          rows: [
            {
              label: "Yang sudah dibuktikan",
              value: bahan(ctx, { grup: "hireme", field: "hireme" }),
            },
          ],
        },
      ],
      // Kartu profil (inisial, nama, peran) digambar otomatis lewat
      // desainProfilCard(), menggantikan foto profesional peserta yang tidak
      // tersedia bagi generator ini. Peserta bebas menimpanya dengan foto
      // asli dan tautan LinkedIn saat menyunting ulang deck-nya.
      visual: desainProfilCard(ctx.nama, ctx.pick),
    });

    return slides;
  },
};

export default capstone;
