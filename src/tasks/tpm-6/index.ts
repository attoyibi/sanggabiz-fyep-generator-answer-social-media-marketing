import { KODE_KELAS, type DocBlock, type TaskDefinition } from "../types";

/**
 * TPM 6 — Setting Up Iklan di Meta Ads.
 *
 * Seperti TPM 5, tugas ini tidak punya bank jawaban dan tidak menghasilkan
 * berkas dari website. Yang diminta adalah tangkapan layar dari Meta Ads
 * Manager milik peserta sendiri, jadi halamannya hanya memuat panduan.
 */
const tpm6: TaskDefinition = {
  id: "tpm-6",
  navLabel: "Tugas 6",
  code: "TPM 6",
  title: "Setting Up Iklan di Meta Ads",
  subtitle: "Dikerjakan langsung di Meta Ads Manager, tidak dibuatkan oleh website ini",
  available: true,
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Setting Up Iklan di Meta Ads",
    tujuan:
      "Peserta mampu memahami struktur Meta Ads (Campaign, Ad Set, Ad), melakukan setting campaign sesuai alur yang benar, menentukan objective, audience, dan placement iklan, serta menentukan kreatif iklan berupa konten, copywriting, dan CTA.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang Social Media Specialist di sebuah brand yang sedang mulai beriklan di Meta Ads, yaitu Facebook dan Instagram. Perusahaan ingin menguji alur iklannya lebih dahulu dengan melakukan setting campaign, namun belum sampai tahap mengalokasikan budget.",
      "Sebagai bagian dari tim Social Media Specialist, kamu ditugaskan untuk melakukan setting campaign di Meta Ads mulai dari setting objective, pengaturan di bagian Ad Set, sampai bagian Ad.",
      "Setiap tahapan setting itu didokumentasikan dengan tangkapan layar, lalu diserahkan dalam bentuk satu dokumen berisi screenshots sebagai bahan review.",
    ],
  },
  instructionSummary: [
    "Lakukan setting campaign di Meta Ads: bagian Campaign (nama dan objective), bagian Ad Set (budgeting, bidding, target audience, placement), dan bagian Ad (gambar atau video, copywriting, CTA).",
    "Ambil tangkapan layar pada setiap tahapan setting, lalu serahkan seluruhnya dalam satu dokumen PDF sebagai bahan review.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm6-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm6-${nama}`,
    notes: [
      "Serahkan file berisi screenshot dalam format PDF, mencakup bagian Campaign, Ad Set, dan Ad.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm6-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm6-Putri Amalia.pdf`,
      "Pastikan seluruh bagian setting sudah terdokumentasi sebelum dikirimkan.",
    ],
  },

  panduan: {
    judul: "Cara Mengerjakan Tugas Ini",
    pengantar:
      "Sama seperti Tugas 5, bagian ini tidak menyediakan pilihan jawaban maupun tombol unduh. Yang diminta adalah tangkapan layar dari Meta Ads Manager milikmu sendiri, jadi tidak ada yang bisa dibuatkan website ini. Kami sarankan mengerjakannya langsung di Ads Manager sambil mengikuti video demonstrasinya — di situlah alur Campaign, Ad Set, dan Ad benar-benar terlihat.",
    tautan: [
      {
        label: "Video demonstrasi: Setting Up Iklan di Meta Ads",
        url: "https://drive.google.com/file/d/10DcRYQsJ53fvuelvb0Jo4c8XYqhvk-Sg/view",
        catatan: "Tonton dulu sampai selesai, lalu ikuti langkahnya sambil membuka Ads Manager.",
      },
      {
        label: "Buka Meta Ads Manager",
        url: "https://adsmanager.facebook.com/",
        catatan: "Masuk memakai akun Facebook-mu. Belum perlu memasang metode pembayaran apa pun.",
      },
    ],
    langkah: [
      {
        judul: "Pilih konten dan copywriting-nya",
        isi: "Tentukan satu konten beserta copywriting-nya untuk dijadikan materi iklan. Pakai aset yang sudah kamu buat di tugas sebelumnya — desain visual dari Tugas 4 atau video dari Tugas 5, dengan caption dari Tugas 3 — supaya seluruh tugasmu tetap sejalan.",
      },
      {
        judul: "Masuk ke Meta Ads Manager",
        isi: "Masuk ke akun Facebook, lalu buka dashboard Meta Ads Manager.",
      },
      {
        judul: "Buat Campaign baru",
        isi: "Pilih “Create” untuk membuat campaign baru, lalu tentukan nama campaign dan objective-nya. Objective inilah yang menentukan bentuk pengaturan di dua bagian berikutnya.",
      },
      {
        judul: "Atur bagian Ad Set",
        isi: "Tentukan sistem budgeting dan bidding, target audience berdasarkan demografi, minat, perilaku, atau lokasi, serta placement iklannya — misalnya Facebook Feed, Instagram Feed, atau Instagram Stories.",
      },
      {
        judul: "Atur bagian Ad",
        isi: "Masukkan materi kreatifnya: gambar atau video, teks utama dan headline, lalu tombol CTA yang sesuai dengan objective yang sudah kamu pilih.",
      },
      {
        judul: "Screenshot tiap tahapan",
        isi: "Ambil tangkapan layar pada setiap bagian: Campaign, Ad Set, dan Ad. Pastikan pengaturan yang kamu buat terbaca jelas di gambarnya.",
      },
      {
        judul: "Susun dan kumpulkan",
        isi: `Gabungkan seluruh screenshot menjadi satu berkas PDF, beri nama ${KODE_KELAS}-tpm6-[Nama Lengkap Peserta].pdf, lalu kirimkan.`,
      },
    ],
    catatan: [
      "Berhenti di tahap draft. Instruksi tugas ini menegaskan iklannya tidak perlu diaktifkan dan tidak perlu dialokasikan budget — cukup disimpan sebagai draft. Jadi jangan menekan tombol publish, dan kamu tidak akan dikenai biaya apa pun.",
      "Kalau kamu sudah pernah melakukan setting iklan di Meta Ads sebelumnya, screenshot-nya boleh langsung dikumpulkan untuk tugas ini — yang penting isinya sejalan dengan konten dan copywriting yang kamu pakai di tugas-tugas sebelumnya.",
      "Perlu diketahui juga, penilaian pelatihan ini dihitung dari keseluruhan tugas. Peserta yang mengerjakan tugas-tugas lain dengan baik umumnya tetap berada di atas batas kelulusan meskipun bagian ini dikumpulkan seadanya. Meski begitu, mencoba sendiri alurnya tetap yang paling kami sarankan, karena struktur Campaign, Ad Set, dan Ad paling mudah dipahami dengan mempraktikkannya. Untuk kepastian angka kelulusan, silakan cek kembali ke penyelenggara.",
    ],
  },

  // Tidak ada berkas yang disusun website untuk tugas ini.
  downloads: [],
  steps: [],
  buildDocument: (): DocBlock[] => [],
};

export default tpm6;
