/**
 * Profil mitra UMKM untuk jalur "mitra" pada capstone.
 *
 * Sanggabiz adalah perusahaan nyata yang berbasis di Yogyakarta. Seluruh
 * keterangan di bawah diambil dari informasi publik perusahaan, situs resmi,
 * akun Instagram, dan pemberitaan media, lalu dipakai sebagai studi kasus
 * pelatihan, sama seperti FitActive pada TPM 1-8.
 *
 * Angka yang dicantumkan adalah klaim publik perusahaan, bukan hasil audit.
 * Bila dipakai ulang di luar konteks latihan, periksa dulu ke sumber aslinya.
 */
export const SANGGABIZ = {
  nama: "Sanggabiz",
  tagline: "AI-Tech Consulting, Training, & Operation System",
  model: "virtual business partner berbasis Department-as-a-Service",
  kota: "Yogyakarta",
  instagram: "@sanggabiz",
  situs: "sanggabiz.com",
  /** Lima layanan inti yang dipasarkan perusahaan. */
  layanan: [
    "Sanggabiz Dashboard: transparansi data operasional secara real time",
    "SanggaChat: chatbot AI multikanal untuk WhatsApp, Instagram, dan live chat",
    "AI Virtual Consulting: pendampingan pengambilan keputusan strategis",
    "SanggaFinance: pembukuan, penagihan, pembayaran, dan pelaporan pajak otomatis",
    "SanggaHR: sistem kerja jarak jauh dan pengembangan tim",
  ],
  /** Tahapan pendampingan yang dipakai perusahaan. */
  metode: ["Realign", "Automate", "People", "Impact"],
  program: "SanggaTech for Her",
} as const;

/** Dipakai sebagai token {{brand}} di bank jawaban. */
export const BRAND = SANGGABIZ.nama;
