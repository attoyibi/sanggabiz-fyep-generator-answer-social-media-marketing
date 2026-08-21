/**
 * Tipe inti untuk seluruh "Tugas Praktik Mandiri".
 * Menambahkan tugas baru = membuat satu folder di src/tasks/<id>/
 * lalu mendaftarkannya di src/tasks/registry.ts. Tidak ada file lain yang perlu disentuh.
 */

/**
 * Kode kelas untuk nama berkas unduhan. Repo ini dipakai program
 * Social Media Marketing, jadi nama berkasnya berpola
 * "SMM-tpm1-[Nama Lengkap Peserta]".
 */
export const KODE_KELAS = "SMM";

/** Kualitas jawaban. Peserta tidak melihat label ini saat memilih. */
export type Grade = "tepat" | "sebagian" | "kurang";

/**
 * Pilihan peserta yang disimpan di localStorage.
 *
 * `variantId` adalah varian yang benar-benar dilihat peserta ketika ia menekan
 * kartu. Id itu ikut disimpan supaya isi jawaban yang sudah dipilih TIDAK
 * berubah saat halaman dimuat ulang, walaupun seed pengacaknya selalu baru.
 * Grup yang belum dijawab tetap mengambil varian dari seed, jadi isinya masih
 * berganti setiap halaman dibuka.
 */
export interface Pilihan {
  grade: Grade;
  variantId?: string;
}

/**
 * Bentuk pilihan yang diterima fungsi inti. Grade polos tetap didukung supaya
 * skrip pemeriksaan di folder scripts/ dan data localStorage versi lama
 * tidak perlu diubah.
 */
export type PilihanInput = Grade | Pilihan;

/**
 * Satu varian jawaban di dalam bank jawaban.
 * Varian dipilih acak per-peserta (berdasarkan seed), sehingga dua peserta
 * yang sama-sama memilih opsi "tepat" tetap menghasilkan dokumen yang berbeda.
 */
export interface Variant {
  id: string;
  /** Judul kartu pilihan, juga dipakai sebagai label ringkas di dokumen. */
  headline: string;
  /** Poin-poin yang tampil di kartu sekaligus masuk ke dokumen. */
  points: string[];
  /** Kalimat naratif untuk dokumen (opsional, dipakai bila blok butuh prosa). */
  narrative?: string;
  /** Data terstruktur untuk pembuat tabel / diagram. */
  fields?: Record<string, string>;
}

export interface ChoiceOption {
  grade: Grade;
  /** Bank jawaban untuk grade ini. Satu diambil acak per peserta. */
  variants: Variant[];
}

/** Satu pertanyaan pilihan. Peserta cukup klik salah satu kartu. */
export interface ChoiceGroup {
  id: string;
  /** Label pendek, mis. "Segmen 1". */
  label: string;
  question: string;
  hint?: string;
  /**
   * Bentuk kartu pilihan. Kosongkan untuk kartu biasa (judul + poin).
   *
   * "profile" menampilkan kartu Audience Profile lengkap dengan potret audiens,
   * supaya peserta memilih satu profil utuh, bukan lima bagian terpisah.
   *
   * "dual" menampilkan dua blok berlabel dalam satu kartu, untuk tabel template
   * yang memang berisi dua baris sekaligus seperti Kekuatan/Kelemahan.
   *
   * "plan" menampilkan satu baris content plan utuh: tipe visual, judul,
   * copywriting, platform, referensi, dan catatan produksi.
   *
   * "konten" menampilkan ringkasan content plan dari tugas sebelumnya, dengan
   * rinciannya bisa dibuka saat dibutuhkan.
   */
  card?: "profile" | "dual" | "plan" | "konten";
  /**
   * Grup tanpa penilaian. Dipakai untuk pilihan yang semua opsinya sama-sama
   * benar, mis. konten mana dari tugas sebelumnya yang mau dikembangkan.
   * Grup seperti ini tetap wajib dijawab, tetapi tidak ikut menghitung nilai.
   */
  ungraded?: boolean;
  /** Label kedua blok pada kartu "dual", mis. ["Kekuatan", "Kelemahan"]. */
  dualLabels?: [string, string];
  options: ChoiceOption[];
}

/** Satu nomor instruksi dari PDF. */
export interface TaskStep {
  id: string;
  number: number;
  title: string;
  /** Instruksi apa adanya dari PDF, ditampilkan sebagai konteks. */
  brief: string[];
  groups: ChoiceGroup[];
}

export interface TaskMeta {
  judulPelatihan: string;
  chapter: string;
  tujuan: string;
}

export interface Submission {
  /** Pola nama file, mis. "SMM-tpm1-[Nama Lengkap Peserta]". */
  fileNamePattern: string;
  /** Fungsi nama file final tanpa ekstensi. */
  fileName: (nama: string) => string;
  notes: string[];
}

/* ------------------------------------------------------------------ */
/* Model dokumen: satu model, tiga renderer (preview HTML, PDF, DOCX)   */
/*                                                                      */
/* Blok-blok di bawah ini meniru template resmi Plan International yang */
/* dibagikan ke peserta: A4 lanskap, font Poppins, judul rata tengah,   */
/* label biru di atas blok kuning, dan tabel bergaris biru.             */
/* Warna diambil langsung dari berkas template, lihat PLAN_WARNA.       */
/* ------------------------------------------------------------------ */

/** Potongan teks dengan penekanan miring, mis. kata "Brand" pada judul. */
export interface RichSpan {
  text: string;
  italic?: boolean;
}

/** Teks biasa, atau rangkaian potongan bila sebagian perlu dicetak miring. */
export type Rich = string | RichSpan[];

/** Warna resmi template, diambil dari w:shd dan w:color pada berkas DOCX. */
export const PLAN_WARNA = {
  biru: "0072CE",
  kuning: "FFD500",
  hijau: "D6D839",
  salem: "F47A68",
  langit: "58CAE8",
  abu: "999999",
  hitam: "000000",
  putih: "FFFFFF",
} as const;

export type DocBlock =
  /** Judul halaman: tebal, rata tengah. */
  | { type: "title"; text: Rich }
  /** Baris kecil abu di bawah judul, dipakai untuk nama peserta. */
  | { type: "byline"; text: string }
  /** Label bagian: teks biru tebal di atas blok kuning. */
  | { type: "label"; text: string }
  /** Tabel dua kolom: label tebal di kiri, jawaban di kanan. */
  | {
      type: "fieldTable";
      rows: { label: Rich; value: string }[];
      /** Template memusatkan label pada tabel segmentasi, dan merapatkan kiri pada tabel kompetitor. */
      labelAlign?: "center" | "left";
      /** Lebar kolom label sebagai pecahan lebar isi; tiap template berbeda. */
      labelWidth?: number;
    }
  /** Kartu Audience Profile: ilustrasi di kiri, tiga blok berwarna di kanan. */
  | {
      type: "profile";
      /** Kunci ilustrasi, mis. "a1". */
      avatar: string;
      channel: string;
      description: string;
      demographic: [string, string][];
      psychographic: [string, string][];
      painPoints: string[];
    }
  /** Tabel analisis tiga kolom: kepala biru, kolom pengamatan menyatu di kiri. */
  | {
      type: "analysis";
      observation: { title: Rich; lines: string[] };
      rows: { label: Rich; value: string }[];
    }
  /** Tabel umum dengan jumlah kolom bebas, mis. grid kalender konten. */
  | {
      type: "grid";
      head?: Rich[];
      rows: string[][];
      /** Bobot lebar tiap kolom; kosongkan untuk lebar sama rata. */
      widths?: number[];
      caption?: string;
    }
  /** Kalimat pengantar biasa di antara label dan tabelnya. */
  | { type: "note"; text: string }
  /** Mulai halaman baru. */
  | { type: "pageBreak" };

/* ------------------------------------------------------------------ */
/* Model lembar kerja: dipakai tugas yang dikumpulkan sebagai Excel     */
/* ------------------------------------------------------------------ */

/** Gaya sel, mengikuti warna template resmi. */
export type SheetStyle =
  | "judul"
  | "kepala"
  | "bulan"
  | "hari"
  | "tanggal"
  | "isi"
  | "krem"
  | "label"
  | "kosong";

export interface SheetCell {
  text?: string;
  style?: SheetStyle;
  /** Jumlah kolom yang digabung, termasuk sel ini. */
  span?: number;
}

export interface SheetRow {
  /** Tinggi baris dalam poin. Kosongkan untuk tinggi bawaan. */
  height?: number;
  cells: SheetCell[];
}

export interface SheetSpec {
  name: string;
  /** Lebar tiap kolom dalam satuan karakter, mengikuti template. */
  columns: number[];
  rows: SheetRow[];
}

/** Format berkas yang bisa diunduh peserta untuk sebuah tugas. */
export type FormatUnduhan = "pdf" | "docx" | "xlsx" | "png";

/* ------------------------------------------------------------------ */
/* Model desain: dipakai tugas yang hasilnya berupa konten visual       */
/*                                                                      */
/* Satu model dipakai dua tempat: penulis PNG lewat canvas, dan         */
/* pratinjau di layar. Warnanya memakai palet Brand Guideline.          */
/* ------------------------------------------------------------------ */

/** Palet resmi Brand Guideline. */
export const BRAND_WARNA = {
  planBlue: "#0072CE",
  lightBlue: "#58CAE7",
  orange: "#ED632F",
  yellow: "#FFD500",
  purple: "#9900FF",
  black: "#000000",
  white: "#FFFFFF",
  lightGrey: "#D9D9D6",
  magenta: "#DC0080",
  darkBlue: "#243C4B",
  green: "#8AC208",
  red: "#D40D15",
} as const;

/** Panduan merek yang ditampilkan di layar, dipakai TPM 4. */
export interface BrandGuide {
  judul: string;
  pengantar: string;
  /** Nama warna pada palet resmi; kodenya diambil dari BRAND_WARNA. */
  warna: { kunci: keyof typeof BRAND_WARNA; nama: string }[];
  font: { peran: string; nama: string; contoh: string }[];
  catatan: string[];
}

/** Satu unsur di atas kanvas. Koordinat dalam piksel, dari pojok kiri atas. */
export type DesignLayer =
  | { type: "rect"; x: number; y: number; w: number; h: number; fill: string; radius?: number }
  | {
      type: "text";
      x: number;
      y: number;
      /** Lebar maksimum sebelum teks dibungkus ke baris berikutnya. */
      w: number;
      text: string;
      size: number;
      color: string;
      /** "judul" memakai Poppins, "teks" memakai Arial, sesuai brand guideline. */
      font: "judul" | "teks";
      weight?: "normal" | "bold";
      align?: "left" | "center" | "right";
      /** Jarak antarbaris sebagai kelipatan ukuran font. */
      leading?: number;
      /**
       * Blok warna di belakang teks, digambar mengikuti lebar tiap baris.
       * Lebarnya baru diketahui saat menggambar, jadi ditangani penggambar,
       * bukan disiapkan sebagai rect terpisah.
       */
      highlight?: { fill: string; radius?: number; padX?: number; padY?: number };
    }
  | { type: "ellipse"; cx: number; cy: number; rx: number; ry: number; fill: string }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number; color: string; width: number };

export interface DesignSpec {
  /** Nama berkas tanpa ekstensi, mis. "slide-1". */
  name: string;
  /** Keterangan singkat untuk pratinjau dan resep Canva. */
  label: string;
  width: number;
  height: number;
  background: string;
  layers: DesignLayer[];
  /**
   * Batas aman dalam piksel dari tiap tepi. Unsur penting tidak boleh keluar
   * dari batas ini supaya tidak tertutup antarmuka platform.
   */
  safeZone: { top: number; bottom: number; left: number; right: number };
}

/** Jawaban yang sudah "diselesaikan": grade + varian terpilih. */
export interface ResolvedAnswer {
  groupId: string;
  label: string;
  question: string;
  grade: Grade;
  variant: Variant;
}

export interface BuildContext {
  nama: string;
  task: TaskDefinition;
  /** Akses cepat jawaban berdasarkan id grup. */
  answers: Record<string, ResolvedAnswer>;
  /** Ambil headline jawaban sebuah grup (string kosong bila belum dijawab). */
  get: (groupId: string) => string;
  /** Pengacak deterministik milik peserta, untuk memvariasikan kalimat dokumen. */
  pick: <T>(bucket: string, items: T[]) => T;
  /** Ganti token {{...}} dengan nilai sebenarnya. */
  fill: (text: string) => string;
  /**
   * Konteks tugas sumber, bila tugas ini melanjutkan tugas sebelumnya.
   * Isinya jawaban yang sudah dikunci peserta pada tugas itu, dibaca dari
   * localStorage, sehingga rencana konten yang dikembangkan benar-benar
   * rencana yang ia susun sendiri.
   */
  sumber?: BuildContext;
}

export interface TaskDefinition {
  id: string;
  navLabel: string;
  /** Kode tugas untuk nama file, mis. "TPM 1". */
  code: string;
  title: string;
  subtitle: string;
  available: boolean;
  /** Kode program untuk kode nilai di kaki dokumen. Kosongkan untuk memakai bawaan. */
  programCode?: string;
  meta: TaskMeta;
  caseStudy: { title: string; paragraphs: string[] };
  instructionSummary: string[];
  /** Panduan merek yang ditampilkan sebelum daftar pertanyaan. */
  brandGuide?: BrandGuide;
  submission: Submission;
  steps: TaskStep[];
  /** Token dinamis untuk teks varian, mis. {{brand}}. */
  tokens?: (ctx: Omit<BuildContext, "fill">) => Record<string, string>;
  /**
   * Id tugas yang harus sudah dikerjakan lebih dulu. Jawabannya dibaca dari
   * localStorage dan tersedia lewat ctx.sumber.
   */
  dependsOn?: string;
  /**
   * Format berkas yang ditawarkan ke peserta, berurutan sesuai tampilan tombol.
   * Tiap tugas bisa berbeda: TPM 1 dikumpulkan sebagai PDF, TPM 2 sebagai Excel.
   */
  downloads: FormatUnduhan[];
  buildDocument: (ctx: BuildContext) => DocBlock[];
  /** Penyusun lembar kerja; wajib bila "xlsx" ada di daftar unduhan. */
  buildWorkbook?: (ctx: BuildContext) => SheetSpec[];
  /** Penyusun desain visual; wajib bila "png" ada di daftar unduhan. */
  buildDesigns?: (ctx: BuildContext) => DesignSpec[];
}
