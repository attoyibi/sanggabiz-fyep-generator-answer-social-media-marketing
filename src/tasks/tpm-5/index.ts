import { KODE_KELAS, type DocBlock, type TaskDefinition } from "../types";

const BRAND = "FitActive";

/**
 * TPM 5 — Membuat Konten Video di CapCut.
 *
 * Tugas ini tidak punya bank jawaban dan tidak menghasilkan berkas dari
 * website. Hasil yang diminta berupa video MP4 yang memang harus diedit
 * sendiri oleh peserta di CapCut, jadi halamannya hanya memuat panduan.
 */
const tpm5: TaskDefinition = {
  id: "tpm-5",
  navLabel: "Tugas 5",
  code: "TPM 5",
  title: "Membuat Konten Video di CapCut",
  subtitle: "Dikerjakan langsung di CapCut, tidak dibuatkan oleh website ini",
  available: true,
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Membuat Konten Video di CapCut",
    tujuan:
      "Peserta mampu menerjemahkan rancangan konten menjadi konten video, menyelaraskan isi video dengan objective dan strategi konten, mengoperasikan tools editing dan fitur-fitur CapCut, serta menerapkan prinsip video short-form, format konten, dan safe zone ke dalam editing video.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      `Kamu adalah seorang Social Media Specialist di sebuah perusahaan bernama ${BRAND}.`,
      "Pada praktik sebelumnya kamu sudah menyusun content plan, rencana detail konten, dan mendesain konten visual. Sekarang, perusahaan ingin meningkatkan engagement dengan konten video yang lebih interaktif.",
      "Sebagai bagian dari tim Social Media Specialist, kamu ditugaskan untuk menggunakan rancangan konten yang sudah dibuat pada praktik sebelumnya, lalu mengedit konten video marketing sesuai rancangan itu menggunakan CapCut.",
    ],
  },
  instructionSummary: [
    "Terjemahkan rancangan konten menjadi konten video dengan menerapkan prinsip video short-form: hook, value, dan CTA.",
    "Edit videonya di CapCut sesuai brand guideline, dengan memperhatikan format konten dan safe zone agar tidak tertutup antarmuka platform.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm5-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm5-${nama}`,
    notes: [
      "Export video dan serahkan dalam format MP4.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm5-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm5-Putri Amalia.mp4`,
      "Periksa dulu durasi, rasio, kualitas audio-visual, dan kesesuaian pesannya sebelum dikirimkan.",
    ],
  },

  panduan: {
    judul: "Cara Mengerjakan Tugas Ini",
    pengantar:
      "Berbeda dengan tugas lain di website ini, bagian ini tidak menyediakan pilihan jawaban maupun tombol unduh. Hasil yang diminta berupa video, dan video hanya bisa jadi kalau kamu sendiri yang mengeditnya. Kami sarankan mengerjakannya langsung di CapCut — di situlah kemampuan yang dinilai tugas ini benar-benar terlatih.",
    tautan: [
      {
        label: "Buka CapCut (web atau aplikasi)",
        url: "https://www.capcut.com/",
        catatan: "Bisa dipakai lewat peramban tanpa memasang aplikasi apa pun.",
      },
      {
        label: "Contoh dan bahan rujukan tugas",
        url: "https://drive.google.com/file/d/115tYi2MwDRgJbPP7Zsdnx0pzzISYrRIB/view",
        catatan: "Lihat dulu sebelum mulai mengedit, supaya arah videonya tidak melenceng.",
      },
    ],
    langkah: [
      {
        judul: "Tinjau kembali rancanganmu",
        isi: "Buka lagi content plan di Tugas 2 dan rancangan detail konten di Tugas 3. Video ini harus mengikuti rancangan itu, bukan ide baru.",
      },
      {
        judul: "Pilih satu konten",
        isi: "Tentukan satu konten yang paling potensial dijadikan video. Kalau di Tugas 3 kamu sudah memilih satu konten untuk dikembangkan, pakai yang itu supaya seluruh tugasmu tetap sejalan.",
      },
      {
        judul: "Siapkan aset",
        isi: "Kumpulkan footage, gambar, audio, dan elemen visual yang dibutuhkan. Aset boleh rekaman sendiri maupun stok, asal sesuai rancangan kontenmu.",
      },
      {
        judul: "Edit di CapCut",
        isi: "Susun videonya dengan tiga elemen video short-form: hook di detik-detik awal, value di bagian tengah, dan CTA di penutup. Warna dan font mengikuti Brand Guideline, dan jaga teks penting tetap di dalam safe zone.",
      },
      {
        judul: "Finalisasi",
        isi: "Periksa durasi, rasio, kualitas audio-visual, dan kesesuaian pesannya dengan objective yang sudah kamu tetapkan.",
      },
      {
        judul: "Export dan kumpulkan",
        isi: `Export sebagai MP4, lalu beri nama berkas ${KODE_KELAS}-tpm5-[Nama Lengkap Peserta].mp4 sebelum dikirimkan.`,
      },
    ],
    catatan: [
      "Kalau kamu sudah pernah membuat video yang isinya sejalan dengan rancangan kontenmu, video itu boleh dikumpulkan untuk tugas ini — tidak harus membuat yang benar-benar baru.",
      "Perlu diketahui juga, penilaian pelatihan ini dihitung dari keseluruhan tugas. Peserta yang mengerjakan tugas-tugas lain dengan baik umumnya tetap berada di atas batas kelulusan meskipun bagian video ini belum sempat dikumpulkan. Meski begitu, mengerjakannya tetap yang paling kami sarankan, karena di sinilah keterampilan editing-nya benar-benar terbentuk. Untuk kepastian angka kelulusan, silakan cek kembali ke penyelenggara.",
    ],
  },

  // Tidak ada berkas yang disusun website untuk tugas ini.
  downloads: [],
  steps: [],
  buildDocument: (): DocBlock[] => [],
};

export default tpm5;
