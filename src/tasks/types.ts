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
   */
  card?: "profile" | "dual";
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
  /** Mulai halaman baru. */
  | { type: "pageBreak" };

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
  submission: Submission;
  steps: TaskStep[];
  /** Token dinamis untuk teks varian, mis. {{seg1}}. */
  tokens?: (ctx: Omit<BuildContext, "fill">) => Record<string, string>;
  buildDocument: (ctx: BuildContext) => DocBlock[];
}
