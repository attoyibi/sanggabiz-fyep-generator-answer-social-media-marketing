/**
 * Tipe inti untuk seluruh "Tugas Praktik Mandiri".
 * Menambahkan tugas baru = membuat satu folder di src/tasks/<id>/
 * lalu mendaftarkannya di src/tasks/registry.ts. Tidak ada file lain yang perlu disentuh.
 */

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
  /** Pola nama file sesuai PDF, mis. "TPM 1 - [Nama Lengkap Peserta]". */
  fileNamePattern: string;
  /** Fungsi nama file final tanpa ekstensi. */
  fileName: (nama: string) => string;
  notes: string[];
}

/* ------------------------------------------------------------------ */
/* Model dokumen: satu model, tiga renderer (preview HTML, PDF, DOCX)   */
/* ------------------------------------------------------------------ */

export type DocBlock =
  | { type: "title"; text: string; subtitle?: string }
  | { type: "meta"; rows: [string, string][] }
  | { type: "heading"; text: string; number?: number }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "quote"; text: string; caption?: string }
  | { type: "mindmap"; root: string; branches: { label: string; children: string[] }[] }
  | { type: "flow"; nodes: { label: string; caption: string }[] }
  | { type: "divider" };

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
