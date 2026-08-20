import type { ChoiceGroup } from "../types";

/**
 * BANK JAWABAN TPM 1 — Riset Target Audiens dan Konten Kompetitor brand "FitActive".
 *
 * Setiap grade punya banyak varian. Satu varian diambil acak per peserta
 * (berdasarkan seed), jadi dua peserta yang sama-sama memilih kartu "tepat"
 * tetap menghasilkan isi dokumen yang berbeda.
 *
 * Token yang tersedia di dalam teks:
 * {{nama}}, {{brand}}, {{audiens}}, {{channel}}, {{kompetitor}}.
 */

/* ================================================================== */
/* LANGKAH 1 — SEGMENTASI TARGET AUDIENS                              */
/* 1.1 Geographic                                                      */
/* ================================================================== */

const geographic: ChoiceGroup = {
  id: "geo",
  label: "Geographic",
  question: "Segmen Geographic — lokasi tempat target audiens tinggal",
  hint: "Geographic menyorot negara, kota, atau wilayah tertentu tempat audiens berada.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "geo1a",
          headline: "Jabodetabek dan kota satelit penyangganya",
          fields: {
            isi: "Jakarta, Bogor, Depok, Tangerang, dan Bekasi, termasuk kota satelit penyangganya seperti Serpong dan Cibubur. Wilayah ini padat, memiliki banyak pusat kebugaran dan taman kota, serta jaringan pengiriman yang sudah mapan sehingga produk {{brand}} dapat sampai dalam satu sampai dua hari.",
          },
          points: [
            "Wilayah: Jakarta, Bogor, Depok, Tangerang, Bekasi beserta kota satelitnya",
            "Alasan: kepadatan penduduk tinggi dengan banyak pusat kebugaran dan taman kota",
            "Pendukung: jaringan pengiriman sudah mapan, produk sampai dalam 1-2 hari",
          ],
        },
        {
          id: "geo1b",
          headline: "Kota metropolitan di Pulau Jawa",
          fields: {
            isi: "Jakarta, Bandung, Surabaya, Semarang, dan Yogyakarta. Kelima kota ini memiliki komunitas lari dan pesepeda yang aktif, kegiatan car free day rutin setiap pekan, serta daya beli kelas menengah yang sesuai dengan rentang harga {{brand}}.",
          },
          points: [
            "Wilayah: Jakarta, Bandung, Surabaya, Semarang, dan Yogyakarta",
            "Alasan: komunitas lari dan pesepeda aktif dengan car free day rutin tiap pekan",
            "Pendukung: daya beli kelas menengah sesuai rentang harga produk",
          ],
        },
        {
          id: "geo1c",
          headline: "Kawasan urban dengan fasilitas olahraga publik",
          fields: {
            isi: "Kawasan perkotaan yang memiliki fasilitas olahraga publik seperti Gelora Bung Karno, Alun-alun Kota Bandung, dan Taman Bungkul Surabaya, tempat audiens berolahraga bersama pada pagi hari maupun akhir pekan.",
          },
          points: [
            "Wilayah: kawasan urban dengan fasilitas olahraga publik yang ramai dipakai",
            "Contoh titik: Gelora Bung Karno, Alun-alun Kota Bandung, Taman Bungkul Surabaya",
            "Alasan: audiens berkumpul dan berolahraga bersama di pagi hari dan akhir pekan",
          ],
        },
        {
          id: "geo1d",
          headline: "Kota besar beriklim tropis panas dan lembap",
          fields: {
            isi: "Kota-kota besar Indonesia dengan suhu harian di atas 30 derajat dan kelembapan tinggi seperti Jakarta, Surabaya, Medan, dan Makassar. Kondisi ini membuat bahan breathable menjadi kebutuhan nyata, bukan sekadar nilai tambah.",
          },
          points: [
            "Wilayah: Jakarta, Surabaya, Medan, dan Makassar",
            "Alasan: suhu harian di atas 30 derajat dengan kelembapan tinggi",
            "Kaitan produk: bahan breathable {{brand}} menjawab kebutuhan nyata di iklim ini",
          ],
        },
        {
          id: "geo1e",
          headline: "Kawasan perkantoran dan hunian vertikal perkotaan",
          fields: {
            isi: "Kawasan pusat bisnis dan hunian vertikal di kota besar seperti Sudirman, Kuningan, SCBD, serta apartemen di sekitarnya yang umumnya menyediakan pusat kebugaran di dalam gedung, sehingga penghuninya berolahraga di sela jam kerja.",
          },
          points: [
            "Wilayah: kawasan pusat bisnis dan hunian vertikal seperti Sudirman, Kuningan, SCBD",
            "Alasan: gedung perkantoran dan apartemen menyediakan pusat kebugaran di dalamnya",
            "Perilaku terkait: audiens berolahraga di sela jam kerja dan sepulang kantor",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "geo2a",
          headline: "Kota besar di Indonesia",
          fields: { isi: "Kota-kota besar di Indonesia yang penduduknya banyak dan aktif berolahraga." },
          points: [
            "Sudah menyebut kriteria geografis, yaitu kota besar",
            "Namun tidak menyebut kota mana saja sehingga sasarannya belum jelas",
            "Belum menjelaskan mengapa wilayah tersebut yang dipilih",
          ],
        },
        {
          id: "geo2b",
          headline: "Pulau Jawa",
          fields: { isi: "Seluruh wilayah Pulau Jawa." },
          points: [
            "Wilayah sudah dipersempit dibanding seluruh Indonesia",
            "Cakupannya masih terlalu luas, mencakup kota besar sampai wilayah pedesaan",
            "Kebiasaan berolahraga di dalam wilayah seluas ini sangat berbeda-beda",
          ],
        },
        {
          id: "geo2c",
          headline: "Daerah perkotaan",
          fields: { isi: "Masyarakat yang tinggal di daerah perkotaan." },
          points: [
            "Sudah mengarah ke masyarakat urban sesuai fokus {{brand}}",
            "Tidak menyebut kota atau wilayah tertentu sehingga sulit dipakai menyusun konten",
            "Tidak ada alasan pemilihan wilayah yang dijelaskan",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "geo3a",
          headline: "Seluruh dunia",
          fields: { isi: "Seluruh dunia, karena produk bisa dikirim ke mana saja." },
          points: [
            "Tidak melakukan segmentasi geografis sama sekali",
            "{{brand}} adalah brand lokal yang jangkauan pengirimannya belum sampai lintas negara",
            "Konten tidak dapat disesuaikan dengan kebiasaan audiens mana pun",
          ],
        },
        {
          id: "geo3b",
          headline: "Di mana saja yang ada internet",
          fields: { isi: "Semua lokasi yang terjangkau internet." },
          points: [
            "Bukan pembagian wilayah, melainkan syarat teknis mengakses media sosial",
            "Tidak menjawab pertanyaan di mana target audiens tinggal",
            "Instruksi segmentasi geographic tidak terpenuhi",
          ],
        },
        {
          id: "geo3c",
          headline: "Ditentukan menyusul setelah akun ramai",
          fields: { isi: "Wilayah audiens sengaja tidak dibatasi lebih dulu; penentuannya menunggu sampai jumlah pengikut akun bertambah banyak." },
          points: [
            "Tidak ada segmen geografis yang disusun",
            "Menunda penentuan wilayah membuat jadwal unggah dan pilihan bahasa tidak bisa ditetapkan",
            "Tahapan profil audiens dan riset kompetitor jadi tidak punya pijakan",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 1.2 Sociographic                                                    */
/* ================================================================== */

const sociographic: ChoiceGroup = {
  id: "socio",
  label: "Sociographic",
  question: "Segmen Sociographic — hubungan sosial dan status ekonomi audiens",
  hint: "Sociographic menyorot lingkungan sosial dan status ekonomi yang memengaruhi keputusan pembelian.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "soc1a",
          headline: "Kelas menengah urban yang tergabung di komunitas olahraga",
          fields: {
            isi: "Kelas menengah perkotaan dengan pengeluaran rumah tangga Rp4-8 juta per bulan yang tergabung dalam komunitas lari, bersepeda, atau kelas kebugaran. Keputusan membeli banyak dipengaruhi rekomendasi sesama anggota komunitas dan apa yang dipakai saat latihan bersama.",
          },
          points: [
            "Status ekonomi: kelas menengah dengan pengeluaran Rp4-8 juta per bulan",
            "Hubungan sosial: anggota komunitas lari, bersepeda, atau kelas kebugaran",
            "Pengaruh pembelian: rekomendasi sesama anggota dan pilihan pakaian saat latihan bersama",
          ],
        },
        {
          id: "soc1b",
          headline: "Karyawan kantoran dengan lingkaran pertemanan kantor yang aktif",
          fields: {
            isi: "Karyawan kantoran berpenghasilan Rp5-12 juta per bulan yang memiliki lingkaran pertemanan kantor gemar berolahraga bersama, seperti klub lari kantor atau kelas kebugaran sepulang kerja. Pembelian sering terjadi secara bersamaan dalam satu kelompok.",
          },
          points: [
            "Status ekonomi: karyawan berpenghasilan Rp5-12 juta per bulan",
            "Hubungan sosial: lingkaran pertemanan kantor yang berolahraga bersama",
            "Pengaruh pembelian: pembelian kerap terjadi bersamaan dalam satu kelompok",
          ],
        },
        {
          id: "soc1c",
          headline: "Pekerja muda mandiri yang mengatur anggarannya sendiri",
          fields: {
            isi: "Pekerja muda yang sudah berpenghasilan sendiri dan mengatur anggaran belanjanya tanpa campur tangan keluarga, dengan sisa anggaran gaya hidup sekitar Rp500 ribu sampai Rp1,5 juta per bulan yang sebagian dialokasikan untuk perlengkapan olahraga.",
          },
          points: [
            "Status ekonomi: berpenghasilan sendiri, mengatur anggaran belanja secara mandiri",
            "Hubungan sosial: keputusan membeli tidak bergantung pada persetujuan keluarga",
            "Pengaruh pembelian: anggaran gaya hidup Rp500 ribu - Rp1,5 juta per bulan",
          ],
        },
        {
          id: "soc1d",
          headline: "Mahasiswa dan first jobber yang dipengaruhi lingkar pertemanan",
          fields: {
            isi: "Mahasiswa tingkat akhir dan pekerja tahun pertama dengan anggaran terbatas, yang keputusan membelinya sangat dipengaruhi apa yang dipakai teman sepermainan dan senior di komunitas kampus maupun kantor.",
          },
          points: [
            "Status ekonomi: anggaran terbatas, sensitif terhadap harga",
            "Hubungan sosial: mengikuti pilihan teman sepermainan dan senior di komunitas",
            "Pengaruh pembelian: keputusan membeli mengikuti tren di dalam lingkar pertemanan",
          ],
        },
        {
          id: "soc1e",
          headline: "Keluarga muda kelas menengah dengan gaya hidup sehat",
          fields: {
            isi: "Pasangan muda tanpa anak atau dengan satu anak, berpenghasilan gabungan Rp10-18 juta per bulan, yang menjadikan olahraga sebagai kegiatan bersama akhir pekan dan kerap membeli perlengkapan olahraga sekaligus untuk berdua.",
          },
          points: [
            "Status ekonomi: penghasilan gabungan Rp10-18 juta per bulan",
            "Hubungan sosial: pasangan yang berolahraga bersama pada akhir pekan",
            "Pengaruh pembelian: kerap membeli sekaligus untuk dua orang dalam satu transaksi",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "soc2a",
          headline: "Kelas menengah",
          fields: { isi: "Masyarakat kelas menengah yang mampu membeli pakaian olahraga." },
          points: [
            "Status ekonomi sudah disebut, yaitu kelas menengah",
            "Belum ada rentang penghasilan atau pengeluaran sebagai patokan",
            "Hubungan sosial yang memengaruhi keputusan pembelian belum dibahas",
          ],
        },
        {
          id: "soc2b",
          headline: "Orang yang suka berolahraga",
          fields: { isi: "Orang-orang yang gemar berolahraga secara rutin." },
          points: [
            "Menyebut kegemaran, padahal sociographic menyorot hubungan sosial dan status ekonomi",
            "Kegemaran berolahraga lebih tepat masuk ke segmen behavioral atau psychographic",
            "Status ekonomi audiens tidak disinggung sama sekali",
          ],
        },
        {
          id: "soc2c",
          headline: "Sudah punya penghasilan sendiri",
          fields: { isi: "Orang yang sudah bekerja dan punya penghasilan sendiri." },
          points: [
            "Sudah menyentuh sisi status ekonomi audiens",
            "Rentang penghasilannya tidak disebut sehingga daya belinya belum terukur",
            "Lingkungan sosial yang memengaruhi keputusan membeli belum dijelaskan",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "soc3a",
          headline: "Semua kalangan",
          fields: { isi: "Semua kalangan masyarakat, dari bawah sampai atas." },
          points: [
            "Tidak ada pembagian status ekonomi sama sekali",
            "Rentang harga {{brand}} tidak mungkin cocok untuk semua kalangan sekaligus",
            "Instruksi segmentasi sociographic tidak terpenuhi",
          ],
        },
        {
          id: "soc3b",
          headline: "Orang kaya saja",
          fields: { isi: "Kalangan atas yang punya banyak uang." },
          points: [
            "Bertentangan dengan keunggulan {{brand}} yang menonjolkan harga terjangkau",
            "Tidak ada penjelasan hubungan sosial yang memengaruhi keputusan membeli",
            "Menutup pasar kelas menengah yang justru paling sesuai dengan produk",
          ],
        },
        {
          id: "soc3c",
          headline: "Tidak perlu dibahas",
          fields: { isi: "Status ekonomi tidak perlu dibahas karena semua orang butuh pakaian." },
          points: [
            "Melewatkan satu dari lima segmen yang diminta instruksi",
            "Daya beli audiens tidak terpetakan sehingga penetapan harga konten promo tidak berdasar",
            "Profil audiens pada tahap berikutnya kehilangan salah satu dasar penyusunnya",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 1.3 Demographic                                                     */
/* ================================================================== */

const demographic: ChoiceGroup = {
  id: "demo",
  label: "Demographic",
  question: "Segmen Demographic — usia, jenis kelamin, pendapatan, pendidikan, pekerjaan",
  hint: "Demographic berisi data yang bisa diukur dengan angka atau kategori.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "dem1a",
          headline: "Usia 22-32 tahun, karyawan awal karier",
          fields: {
            age: "22-32 tahun",
            gender: "Perempuan dan laki-laki dengan komposisi seimbang",
            education: "D3 sampai S1",
            income: "Rp5-10 juta per bulan",
            isi: "Usia 22-32 tahun; perempuan dan laki-laki dengan komposisi seimbang; pendidikan D3 sampai S1; pendapatan Rp5-10 juta per bulan; pekerjaan karyawan swasta di awal sampai pertengahan karier.",
          },
          points: [
            "Usia: 22-32 tahun",
            "Jenis kelamin: perempuan dan laki-laki dengan komposisi seimbang",
            "Pendidikan: D3 sampai S1",
            "Pendapatan: Rp5-10 juta per bulan",
            "Pekerjaan: karyawan swasta di awal sampai pertengahan karier",
          ],
        },
        {
          id: "dem1b",
          headline: "Usia 18-28 tahun, mahasiswa dan pekerja tahun pertama",
          fields: {
            age: "18-28 tahun",
            gender: "Mayoritas perempuan",
            education: "SMA sampai S1",
            income: "Rp2-6 juta per bulan termasuk uang saku",
            isi: "Usia 18-28 tahun; mayoritas perempuan; pendidikan SMA sampai S1; pendapatan atau uang saku Rp2-6 juta per bulan; berstatus mahasiswa tingkat akhir dan pekerja tahun pertama.",
          },
          points: [
            "Usia: 18-28 tahun",
            "Jenis kelamin: mayoritas perempuan",
            "Pendidikan: SMA sampai S1",
            "Pendapatan: Rp2-6 juta per bulan termasuk uang saku",
            "Pekerjaan: mahasiswa tingkat akhir dan pekerja tahun pertama",
          ],
        },
        {
          id: "dem1c",
          headline: "Usia 25-38 tahun, profesional kota besar",
          fields: {
            age: "25-38 tahun",
            gender: "Perempuan dan laki-laki",
            education: "S1 sampai S2",
            income: "Rp8-15 juta per bulan",
            isi: "Usia 25-38 tahun; perempuan dan laki-laki; pendidikan S1 sampai S2; pendapatan Rp8-15 juta per bulan; pekerjaan profesional dan staf tingkat menengah di kota besar.",
          },
          points: [
            "Usia: 25-38 tahun",
            "Jenis kelamin: perempuan dan laki-laki",
            "Pendidikan: S1 sampai S2",
            "Pendapatan: Rp8-15 juta per bulan",
            "Pekerjaan: profesional dan staf tingkat menengah di kota besar",
          ],
        },
        {
          id: "dem1d",
          headline: "Usia 20-30 tahun, mayoritas perempuan urban",
          fields: {
            age: "20-30 tahun",
            gender: "Mayoritas perempuan, sekitar tujuh dari sepuluh audiens",
            education: "D3 sampai S1",
            income: "Rp4-9 juta per bulan",
            isi: "Usia 20-30 tahun; sekitar tujuh dari sepuluh perempuan; pendidikan D3 sampai S1; pendapatan Rp4-9 juta per bulan; pekerjaan karyawan, pekerja lepas kreatif, dan wirausaha kecil.",
          },
          points: [
            "Usia: 20-30 tahun",
            "Jenis kelamin: mayoritas perempuan, sekitar tujuh dari sepuluh audiens",
            "Pendidikan: D3 sampai S1",
            "Pendapatan: Rp4-9 juta per bulan",
            "Pekerjaan: karyawan, pekerja lepas kreatif, dan wirausaha kecil",
          ],
        },
        {
          id: "dem1e",
          headline: "Usia 24-35 tahun, pekerja kantoran dan wirausaha muda",
          fields: {
            age: "24-35 tahun",
            gender: "Perempuan dan laki-laki",
            education: "S1",
            income: "Rp6-12 juta per bulan",
            isi: "Usia 24-35 tahun; perempuan dan laki-laki; pendidikan S1; pendapatan Rp6-12 juta per bulan; pekerjaan pegawai kantoran serta wirausaha muda yang jam kerjanya lentur.",
          },
          points: [
            "Usia: 24-35 tahun",
            "Jenis kelamin: perempuan dan laki-laki",
            "Pendidikan: S1",
            "Pendapatan: Rp6-12 juta per bulan",
            "Pekerjaan: pegawai kantoran dan wirausaha muda dengan jam kerja lentur",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "dem2a",
          headline: "Usia 18-45 tahun",
          fields: {
            age: "18-40 tahun",
            gender: "Semua gender",
            education: "Tidak dibatasi",
            income: "Penghasilan menengah, tanpa angka",
            isi: "Usia 18-45 tahun, laki-laki dan perempuan, sudah bekerja.",
          },
          points: [
            "Usia dan jenis kelamin sudah disebut",
            "Rentang usianya terlalu lebar sehingga gaya konten yang cocok berbeda jauh di dalamnya",
            "Pendidikan dan pendapatan belum dicantumkan",
          ],
        },
        {
          id: "dem2b",
          headline: "Anak muda yang sudah bekerja",
          fields: {
            age: "Usia produktif, tanpa angka",
            gender: "Perempuan",
            education: "Lulusan perguruan tinggi",
            income: "Cukup untuk memenuhi kebutuhan sehari-hari",
            isi: "Anak muda yang sudah bekerja dan punya penghasilan.",
          },
          points: [
            "Pekerjaan sudah disinggung",
            "Tidak ada angka usia maupun rentang pendapatan yang bisa diukur",
            "Demographic seharusnya berisi data yang terukur dengan angka atau kategori",
          ],
        },
        {
          id: "dem2c",
          headline: "Perempuan usia produktif",
          fields: {
            age: "Usia produktif, tanpa angka",
            gender: "Perempuan",
            education: "Semua jenjang pendidikan",
            income: "Menyesuaikan kemampuan masing-masing",
            isi: "Perempuan usia produktif yang aktif berolahraga.",
          },
          points: [
            "Jenis kelamin sudah ditetapkan",
            "Istilah usia produktif mencakup 15 sampai 64 tahun sehingga terlalu luas",
            "Pendidikan, pendapatan, dan pekerjaan belum disebut sama sekali",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "dem3a",
          headline: "Semua umur",
          fields: {
            age: "Semua umur",
            gender: "Semua gender",
            education: "Semua jenjang",
            income: "Semua tingkat penghasilan",
            isi: "Semua umur dan semua jenis kelamin.",
          },
          points: [
            "Tidak ada pembatasan demografis sama sekali",
            "Kebutuhan anak-anak, remaja, dan lansia sangat berbeda dan tidak mungkin dijawab satu konten",
            "Instruksi segmentasi demographic tidak terpenuhi",
          ],
        },
        {
          id: "dem3b",
          headline: "Siapa saja yang mau beli",
          fields: {
            age: "Berapa pun",
            gender: "Laki-laki dan perempuan",
            education: "Apa saja",
            income: "Berapa pun, yang penting bersedia membeli",
            isi: "Siapa saja yang mau membeli produk {{brand}}.",
          },
          points: [
            "Bukan data demografis, melainkan pernyataan tentang kesediaan membeli",
            "Tidak ada satu pun dari usia, jenis kelamin, pendidikan, atau pendapatan yang disebut",
            "Profil audiens pada tahap berikutnya tidak bisa diisi",
          ],
        },
        {
          id: "dem3c",
          headline: "Atlet profesional",
          fields: {
            age: "6-12 tahun",
            gender: "Perempuan dan laki-laki",
            education: "Sekolah dasar",
            income: "Belum berpenghasilan",
            isi: "Atlet profesional yang bertanding di kejuaraan nasional.",
          },
          points: [
            "Tidak sesuai fokus {{brand}} yang menyasar gaya hidup aktif masyarakat urban",
            "Jumlah atlet profesional terlalu sedikit untuk menopang penjualan brand",
            "Kebutuhan mereka pada perlengkapan bertanding berbeda dari koleksi {{brand}}",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 1.4 Behavioral                                                      */
/* ================================================================== */

const behavioral: ChoiceGroup = {
  id: "behav",
  label: "Behavioral",
  question: "Segmen Behavioral — kebiasaan, perilaku, dan pola penggunaan produk",
  hint: "Behavioral menyorot bagaimana audiens berolahraga, mencari, dan membeli produk.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "beh1a",
          headline: "Berolahraga 3-4 kali sepekan, membeli saat tanggal kembar",
          fields: {
            isi: "Berolahraga tiga sampai empat kali sepekan berupa lari pagi dan kelas kebugaran; membaca ulasan pembeli sebelum memutuskan; menunggu tanggal kembar untuk berbelanja; dan mengganti pakaian olahraga rata-rata setiap enam sampai dua belas bulan.",
          },
          points: [
            "Pola olahraga: tiga sampai empat kali sepekan, lari pagi dan kelas kebugaran",
            "Pola mencari: membaca ulasan pembeli sebelum memutuskan",
            "Pola membeli: menunggu tanggal kembar dan promo besar",
            "Pola pemakaian: mengganti pakaian olahraga setiap 6-12 bulan",
          ],
        },
        {
          id: "beh1b",
          headline: "Memakai pakaian olahraga untuk aktivitas harian",
          fields: {
            isi: "Memakai pakaian olahraga tidak hanya saat berlatih tetapi juga untuk berkegiatan sehari-hari seperti berbelanja dan bekerja dari kafe; menilai produk dari kenyamanan dipakai berjam-jam; dan cenderung membeli beberapa potong sekaligus agar bisa dipadupadankan.",
          },
          points: [
            "Pola pemakaian: dipakai untuk latihan sekaligus kegiatan harian",
            "Dasar penilaian: kenyamanan saat dipakai berjam-jam",
            "Pola membeli: membeli beberapa potong sekaligus agar mudah dipadupadankan",
          ],
        },
        {
          id: "beh1c",
          headline: "Mencari produk lewat pencarian dan ulasan di media sosial",
          fields: {
            isi: "Mengetik nama produk di kolom pencarian Instagram dan TikTok sebelum membeli; membaca kolom komentar untuk mencari keluhan pembeli lain; membandingkan minimal dua sampai tiga brand; lalu menyelesaikan pembelian lewat marketplace atau tautan di bio.",
          },
          points: [
            "Pola mencari: mengetik nama produk di kolom pencarian media sosial",
            "Pola memeriksa: membaca kolom komentar untuk mencari keluhan pembeli lain",
            "Pola membandingkan: menimbang dua sampai tiga brand sebelum memutuskan",
            "Pola membeli: menyelesaikan transaksi lewat marketplace atau tautan di bio",
          ],
        },
        {
          id: "beh1d",
          headline: "Ikut kegiatan komunitas dan membeli menjelang acara lari",
          fields: {
            isi: "Rutin mengikuti kegiatan komunitas seperti lari bersama dan kelas kebugaran berkelompok; membeli perlengkapan baru menjelang acara lari atau tantangan olahraga; serta membagikan foto kegiatan olahraganya di media sosial.",
          },
          points: [
            "Pola kegiatan: rutin ikut lari bersama dan kelas kebugaran berkelompok",
            "Pemicu pembelian: menjelang acara lari atau tantangan olahraga",
            "Pola berbagi: mengunggah foto kegiatan olahraga ke media sosial",
          ],
        },
        {
          id: "beh1e",
          headline: "Membeli berulang dari brand yang sudah cocok",
          fields: {
            isi: "Setia pada brand yang ukurannya sudah terbukti pas dan bahannya cocok di kulit; membeli berulang dua sampai tiga kali setahun; serta cenderung merekomendasikan brand tersebut ke teman komunitasnya tanpa diminta.",
          },
          points: [
            "Pola kesetiaan: bertahan pada brand yang ukuran dan bahannya sudah terbukti cocok",
            "Pola membeli: pembelian berulang dua sampai tiga kali setahun",
            "Pola menyebarkan: merekomendasikan ke teman komunitas tanpa diminta",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "beh2a",
          headline: "Suka berolahraga",
          fields: { isi: "Audiens yang suka berolahraga dan menjaga kebugaran." },
          points: [
            "Kebiasaan berolahraga sudah disebut",
            "Belum ada frekuensi, jenis olahraga, maupun waktu berlatihnya",
            "Pola mencari dan membeli produk tidak dibahas sama sekali",
          ],
        },
        {
          id: "beh2b",
          headline: "Sering belanja online",
          fields: { isi: "Terbiasa berbelanja lewat aplikasi belanja daring." },
          points: [
            "Pola membeli sudah disinggung",
            "Belum menjelaskan bagaimana audiens menemukan produk sebelum membeli",
            "Pola pemakaian produk setelah dibeli belum dibahas",
          ],
        },
        {
          id: "beh2c",
          headline: "Suka produk diskon",
          fields: { isi: "Menunggu diskon sebelum membeli pakaian olahraga." },
          points: [
            "Satu pemicu pembelian sudah teridentifikasi, yaitu diskon",
            "Hanya satu perilaku, belum menggambarkan pola secara utuh",
            "Frekuensi berolahraga dan pola pemakaian produk tidak disebut",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "beh3a",
          headline: "Perilakunya bermacam-macam",
          fields: { isi: "Perilaku audiens bermacam-macam, tidak bisa disamakan." },
          points: [
            "Tidak ada pola perilaku yang dipetakan",
            "Justru menghindari tugas segmentasi behavioral yang diminta instruksi",
            "Konten tidak bisa dirancang tanpa mengetahui kebiasaan audiens",
          ],
        },
        {
          id: "beh3b",
          headline: "Suka warna cerah",
          fields: { isi: "Audiens menyukai pakaian berwarna cerah." },
          points: [
            "Selera warna adalah preferensi produk, bukan pola perilaku",
            "Tidak menjelaskan kebiasaan berolahraga maupun pola pembelian",
            "Segmen behavioral tetap kosong meski kolomnya sudah terisi",
          ],
        },
        {
          id: "beh3c",
          headline: "Tidak pernah berolahraga",
          fields: { isi: "Audiens yang tidak pernah berolahraga sama sekali." },
          points: [
            "Bertolak belakang dengan fokus {{brand}} pada gaya hidup aktif",
            "Kelompok ini tidak memiliki kebutuhan terhadap pakaian olahraga",
            "Segmen yang dipilih tidak relevan dengan produk seperti diminta instruksi",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 1.5 Psychographic                                                   */
/* ================================================================== */

const psychographic: ChoiceGroup = {
  id: "psycho",
  label: "Psychographic",
  question: "Segmen Psychographic — gaya hidup, nilai, minat, dan kepribadian audiens",
  hint: "Psychographic menyorot apa yang dianggap penting oleh audiens dan bagaimana mereka ingin dilihat.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "psy1a",
          headline: "Gaya hidup aktif dengan nilai konsistensi diri",
          fields: {
            values: "Konsistensi dan perbaikan diri secara bertahap",
            interest: "Kebugaran, nutrisi, dan produktivitas",
            opinions: "Menganggap olahraga adalah rutinitas yang dijalani terus-menerus, bukan tren sesaat",
            isi: "Menjadikan olahraga sebagai bagian rutinitas, bukan tren sesaat; memegang nilai konsistensi dan perbaikan diri; berminat pada topik kebugaran, nutrisi, dan produktivitas; berkepribadian disiplin serta senang mencatat perkembangan latihannya.",
          },
          points: [
            "Gaya hidup: olahraga sebagai rutinitas, bukan tren sesaat",
            "Nilai: konsistensi dan perbaikan diri secara bertahap",
            "Minat: kebugaran, nutrisi, dan produktivitas",
            "Kepribadian: disiplin dan senang mencatat perkembangan latihan",
          ],
        },
        {
          id: "psy1b",
          headline: "Bangga memakai produk lokal berkualitas",
          fields: {
            values: "Kebanggaan memakai produk dalam negeri",
            interest: "Brand lokal dan cerita di balik pembuatan produk",
            opinions: "Menganggap brand lokal sudah setara brand luar bila mutunya terbukti",
            isi: "Memilih brand dalam negeri bila mutunya sebanding dengan brand luar; memegang nilai keberpihakan pada produk lokal; berminat pada cerita di balik pembuatan produk; dan senang membagikan temuan brand lokal ke lingkar pertemanannya.",
          },
          points: [
            "Gaya hidup: mengutamakan brand dalam negeri bila mutunya sebanding",
            "Nilai: keberpihakan pada produk lokal",
            "Minat: cerita di balik proses pembuatan produk",
            "Kepribadian: senang membagikan temuan brand lokal ke lingkar pertemanan",
          ],
        },
        {
          id: "psy1c",
          headline: "Menyukai estetika minimalis dan penampilan rapi",
          fields: {
            values: "Kesederhanaan, kerapian, dan kepraktisan",
            interest: "Gaya busana minimalis dan penataan warna netral",
            opinions: "Menganggap pakaian olahraga harus tetap pantas dipakai di luar tempat latihan",
            isi: "Memilih pakaian olahraga berpotongan bersih dengan warna netral yang mudah dipadupadankan; memegang nilai kesederhanaan dan kepraktisan; berminat pada topik gaya busana dan penataan ruang; serta ingin terlihat rapi bahkan saat berolahraga.",
          },
          points: [
            "Gaya hidup: memilih potongan bersih dengan warna netral yang mudah dipadupadankan",
            "Nilai: kesederhanaan dan kepraktisan",
            "Minat: gaya busana dan penataan ruang",
            "Kepribadian: ingin tetap terlihat rapi bahkan saat berolahraga",
          ],
        },
        {
          id: "psy1d",
          headline: "Mengejar keseimbangan kerja dan kesehatan",
          fields: {
            values: "Keseimbangan antara pekerjaan dan kesehatan",
            interest: "Kesehatan mental, tidur berkualitas, dan pengelolaan waktu",
            opinions: "Menganggap olahraga adalah bentuk perawatan diri, bukan ajang bersaing",
            isi: "Berolahraga sebagai cara melepas tekanan pekerjaan dan menjaga kesehatan mental; memegang nilai keseimbangan hidup; berminat pada topik kesehatan mental, tidur berkualitas, dan pengelolaan waktu; berkepribadian tenang dan menghindari pola latihan berlebihan.",
          },
          points: [
            "Gaya hidup: berolahraga untuk melepas tekanan kerja dan menjaga kesehatan mental",
            "Nilai: keseimbangan antara pekerjaan dan kesehatan",
            "Minat: kesehatan mental, tidur berkualitas, dan pengelolaan waktu",
            "Kepribadian: tenang, menghindari pola latihan berlebihan",
          ],
        },
        {
          id: "psy1e",
          headline: "Berorientasi nilai uang dan mutu yang sepadan",
          fields: {
            values: "Kejujuran dan kewajaran harga",
            interest: "Ulasan perbandingan produk dan ketahanan bahan",
            opinions: "Menganggap harga mahal tidak selalu berarti mutu bagus",
            isi: "Bersedia membayar lebih untuk bahan yang awet, tetapi menolak membayar mahal hanya untuk nama brand; memegang nilai kejujuran dan kewajaran harga; berminat pada ulasan perbandingan produk; serta berkepribadian teliti dan gemar membandingkan sebelum memutuskan.",
          },
          points: [
            "Gaya hidup: bersedia membayar lebih untuk bahan yang awet",
            "Nilai: kejujuran dan kewajaran harga, menolak membayar sekadar untuk nama brand",
            "Minat: ulasan perbandingan produk",
            "Kepribadian: teliti dan gemar membandingkan sebelum memutuskan",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "psy2a",
          headline: "Suka gaya hidup sehat",
          fields: {
            values: "Menyukai gaya hidup sehat",
            interest: "Olahraga secara umum",
            opinions: "Menganggap olahraga itu penting untuk menjaga kesehatan",
            isi: "Audiens yang menyukai gaya hidup sehat.",
          },
          points: [
            "Gaya hidup sudah disebut secara umum",
            "Nilai, minat, dan kepribadian audiens belum diuraikan",
            "Ciri ini berlaku untuk hampir semua pembeli pakaian olahraga",
          ],
        },
        {
          id: "psy2b",
          headline: "Mengikuti tren kekinian",
          fields: {
            values: "Mengikuti tren terbaru",
            interest: "Konten yang sedang tren",
            opinions: "Menganggap produk yang sedang ramai dibicarakan pasti bagus",
            isi: "Audiens yang senang mengikuti tren terbaru.",
          },
          points: [
            "Sudah menyentuh sisi kepribadian audiens",
            "Belum dijelaskan nilai apa yang mereka pegang saat memilih produk",
            "Minat di luar tren belum dipetakan sehingga ide konten cepat habis",
          ],
        },
        {
          id: "psy2c",
          headline: "Peduli penampilan",
          fields: {
            values: "Kepedulian pada penampilan",
            interest: "Penampilan saat berolahraga",
            opinions: "Menganggap penampilan saat berolahraga ikut menaikkan rasa percaya diri",
            isi: "Audiens yang peduli pada penampilannya saat berolahraga.",
          },
          points: [
            "Satu nilai sudah teridentifikasi, yaitu kepedulian pada penampilan",
            "Gaya hidup dan minat di luar penampilan belum dibahas",
            "Belum cukup untuk menentukan sudut pandang konten yang khas",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "psy3a",
          headline: "Semua orang ingin sehat",
          fields: {
            values: "Ingin sehat sebagaimana orang pada umumnya",
            interest: "Segala hal yang berkaitan dengan kesehatan",
            opinions: "Menganggap keinginan semua orang pada dasarnya sama",
            isi: "Semua orang pasti ingin sehat, jadi tidak perlu dipilah.",
          },
          points: [
            "Tidak melakukan pemilahan psikografis sama sekali",
            "Keinginan umum bukan dasar yang bisa dipakai menyusun sudut pandang konten",
            "Instruksi segmentasi psychographic tidak terpenuhi",
          ],
        },
        {
          id: "psy3b",
          headline: "Yang penting suka belanja",
          fields: {
            values: "Gemar berbelanja",
            interest: "Belanja apa saja",
            opinions: "Menganggap berbelanja adalah hiburan tersendiri",
            isi: "Audiens yang gemar berbelanja apa saja.",
          },
          points: [
            "Menggambarkan kebiasaan berbelanja, bukan gaya hidup atau nilai audiens",
            "Tidak berhubungan dengan olahraga maupun produk {{brand}}",
            "Kolom terisi tetapi tidak menambah pemahaman tentang audiens",
          ],
        },
        {
          id: "psy3c",
          headline: "Tidak bisa ditebak",
          fields: {
            values: "Berubah-ubah mengikuti suasana hati",
            interest: "Berganti-ganti setiap beberapa bulan",
            opinions: "Menganggap seleranya sendiri sulit ditebak",
            isi: "Gaya hidup audiens tidak bisa ditebak dan berubah-ubah.",
          },
          points: [
            "Tidak ada hasil segmentasi yang dihasilkan",
            "Riset audiens memang bertujuan menemukan pola dari keragaman tersebut",
            "Profil audiens pada tahap berikutnya kehilangan bahan penyusunnya",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* LANGKAH 2 — PROFIL AUDIENS                                          */
/*                                                                     */
/* Template menampilkan profil audiens sebagai SATU kartu utuh, jadi   */
/* peserta memilih satu profil lengkap, bukan lima bagian terpisah.    */
/* Age/Gender/Education/Income dan Values/Interest/Opinions memakai    */
/* token supaya selalu sejalan dengan hasil segmentasi di langkah 1.   */
/* Poin varian dipakai sebagai isi Customer Pain Points.               */
/* ================================================================== */

const profilAudiens: ChoiceGroup = {
  id: "profil",
  label: "Profil Audiens",
  question: "Pilih satu profil audiens utama {{brand}}",
  hint: "Satu kartu berisi profil lengkap: ilustrasi, deskripsi, saluran utama, dan customer pain points.",
  card: "profile",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pr1a",
          headline: "Rani, Karyawan Muda Urban",
          fields: {
            avatar: "a1",
            nama: "Rani, Karyawan Muda Urban",
            description:
              "Karyawan swasta di kota besar yang berolahraga tiga sampai empat kali sepekan di sela jam kerja. Tujuan utamanya menemukan pakaian olahraga yang nyaman dipakai berjam-jam, tidak gerah di cuaca panas, dan harganya masuk akal. Karakternya disiplin, teliti membaca ulasan, dan tidak mudah percaya klaim iklan.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel:
              "Instagram sebagai kanal utama: Reels untuk menjangkau audiens baru dan carousel untuk penjelasan bahan. TikTok dipakai sebagai kanal pendukung dengan potongan video yang sama.",
          },
          points: [
            "Pakaian olahraga yang dimiliki terasa gerah dan menempel di badan saat dipakai di cuaca panas dan lembap.",
            "Brand luar dengan bahan breathable harganya di luar anggaran bulanan.",
            "Ukuran brand luar sering tidak pas di postur tubuh Indonesia sehingga harus ditukar.",
            "Sulit menemukan brand yang menjelaskan jenis bahan secara terbuka sebelum pembelian.",
          ],
        },
        {
          id: "pr1b",
          headline: "Dimas, Anggota Komunitas Lari",
          fields: {
            avatar: "a4",
            nama: "Dimas, Anggota Komunitas Lari",
            description:
              "Pekerja muda yang tergabung dalam komunitas lari kota dan berlatih bersama dua kali sepekan. Tujuan utamanya mendapatkan pakaian yang tidak menyerap keringat berlebihan saat berlari jarak menengah dan tetap pantas dipakai berkumpul setelah latihan. Karakternya sosial dan mudah merekomendasikan produk yang cocok ke sesama anggota.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel:
              "Instagram sebagai kanal utama, memadukan feed, Reels, dan unggahan bersama komunitas lari. Didukung kolaborasi dengan akun komunitas olahraga kota untuk menjangkau anggota barunya.",
          },
          points: [
            "Pakaian olahraga murah cepat melar dan warnanya pudar setelah beberapa kali dicuci.",
            "Potongan dan warnanya terlalu mencolok sehingga tidak bisa dipakai berkumpul setelah latihan.",
            "Terlalu banyak pilihan brand di marketplace tanpa penjelasan pembeda yang jelas.",
            "Sulit menilai daya tahan bahan hanya dari foto katalog di media sosial.",
          ],
        },
        {
          id: "pr1c",
          headline: "Sekar, Perempuan Urban Aktif",
          fields: {
            avatar: "a2",
            nama: "Sekar, Perempuan Urban Aktif",
            description:
              "Perempuan pekerja dengan jam kerja lentur yang memakai pakaian olahraga tidak hanya untuk berlatih tetapi juga untuk berkegiatan sehari-hari. Tujuan utamanya menemukan koleksi berpotongan rapi yang bisa dipadupadankan. Karakternya memperhatikan tampilan, aktif di Instagram, dan gemar menyimpan referensi gaya busana.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel:
              "Instagram sebagai kanal utama, dengan Reels sebagai penarik audiens baru dan Story sebagai ruang interaksi harian. WhatsApp dipakai untuk menjawab pertanyaan ukuran yang butuh jawaban panjang.",
          },
          points: [
            "Merasa kurang percaya diri memakai pakaian olahraga yang potongannya tidak sesuai bentuk tubuh.",
            "Takut salah memilih ukuran karena panduan ukuran tiap brand berbeda-beda.",
            "Khawatir produk yang datang tidak sesuai dengan foto yang ditampilkan di media sosial.",
            "Tidak menemukan contoh pemakaian oleh orang dengan bentuk tubuh yang serupa.",
          ],
        },
        {
          id: "pr1d",
          headline: "Bagas, Pekerja Tahun Pertama",
          fields: {
            avatar: "a5",
            nama: "Bagas, Pekerja Tahun Pertama",
            description:
              "Pekerja tahun pertama yang baru mulai rutin berolahraga di pusat kebugaran dekat kantor. Tujuan utamanya mendapatkan pakaian olahraga layak dengan harga yang masih terjangkau penghasilannya. Karakternya cermat membandingkan harga, menunggu promo, dan mengandalkan ulasan pembeli sebelum memutuskan.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel:
              "TikTok sebagai kanal utama karena biaya menjangkau audiens baru paling rendah, dengan Instagram sebagai kanal pendukung tempat calon pembeli mencari informasi lebih lengkap.",
          },
          points: [
            "Anggaran bulanan untuk perlengkapan olahraga ketat, sehingga salah beli terasa memberatkan.",
            "Istilah bahan seperti breathable dipakai semua brand tanpa penjelasan yang mudah dipahami.",
            "Waktu berolahraga terbatas di sela jam kerja sehingga perlengkapan harus praktis dan mudah dirawat.",
            "Sulit menilai mutu produk hanya dari foto katalog di media sosial.",
          ],
        },
        {
          id: "pr1e",
          headline: "Laras, Profesional Kota Besar",
          fields: {
            avatar: "a3",
            nama: "Laras, Profesional Kota Besar",
            description:
              "Profesional di kota besar yang berolahraga untuk melepas tekanan pekerjaan. Tujuan utamanya memiliki beberapa potong pakaian olahraga awet yang tidak perlu sering diganti. Karakternya menghargai kepraktisan, bersedia membayar lebih untuk bahan yang tahan lama, dan tidak tertarik mengikuti tren sesaat.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel:
              "Instagram sebagai tempat memperkenalkan produk dan membangun kepercayaan, dengan marketplace sebagai penutup transaksi lewat tautan di bio dan stiker tautan di Story.",
          },
          points: [
            "Masih ragu apakah brand lokal mampu menandingi ketahanan bahan brand luar.",
            "Sulit menemukan ulasan jangka panjang, misalnya kondisi produk setelah enam bulan pemakaian.",
            "Konten brand lebih banyak menampilkan foto katalog daripada pemakaian sehari-hari yang nyata.",
            "Tidak ada penjelasan cara merawat agar produk tetap awet setelah dibeli.",
          ],
        },
        {
          id: "pr1f",
          headline: "Rizky, Pencari Informasi Bahan",
          fields: {
            avatar: "a6",
            nama: "Rizky, Pencari Informasi Bahan",
            description:
              "Pekerja muda yang selalu memeriksa komposisi bahan sebelum membeli dan gemar membandingkan spesifikasi antarbrand. Tujuan utamanya memastikan bahan yang dibeli benar-benar sesuai untuk cuaca panas dan latihan rutin. Karakternya teliti, banyak bertanya di kolom komentar, dan menyimpan konten sebagai rujukan.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel:
              "Instagram sebagai kanal utama lewat carousel penjelas bahan dan panduan ukuran yang disimpan di sorotan akun, didukung Reels untuk menjangkau audiens di luar pengikut.",
          },
          points: [
            "Klaim bahan disebut dengan istilah teknis tanpa penjelasan yang mudah dipahami audiens awam.",
            "Panduan ukuran sulit ditemukan karena tidak disimpan di sorotan akun.",
            "Pertanyaan di kolom komentar sering tidak dijawab sehingga harus mencari ke akun lain.",
            "Sulit membandingkan bahan antarbrand karena tiap brand memakai istilah yang berbeda.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pr2a",
          headline: "Audiens Olahraga",
          fields: {
            avatar: "a1",
            nama: "Audiens Olahraga",
            description: "Orang-orang yang suka berolahraga dan membutuhkan pakaian olahraga yang nyaman.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel: "Media sosial.",
          },
          points: [
            "Pakaian olahraga harganya mahal.",
            "Deskripsi belum menyebut peran atau pekerjaan audiens.",
            "Saluran utama hanya ditulis media sosial tanpa menyebut platformnya.",
          ],
        },
        {
          id: "pr2b",
          headline: "Karyawan Aktif",
          fields: {
            avatar: "a2",
            nama: "Karyawan Aktif",
            description: "Karyawan kantoran yang aktif berolahraga di waktu luangnya.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel: "Instagram.",
          },
          points: [
            "Audiens bingung memilih pakaian olahraga yang cocok.",
            "Belum dijelaskan penyebab kebingungannya sehingga konten belum tahu harus menjawab apa.",
            "Saluran sudah disebut, tetapi belum menyebut fitur maupun bentuk kontennya.",
          ],
        },
        {
          id: "pr2c",
          headline: "Anak Muda Kekinian",
          fields: {
            avatar: "a5",
            nama: "Anak Muda Kekinian",
            description: "Anak muda yang ingin tampil keren dan kekinian ketika berolahraga.",
            age: "{{age}}",
            gender: "{{gender}}",
            education: "{{education}}",
            income: "{{income}}",
            values: "{{values}}",
            interest: "{{interest}}",
            opinions: "{{opinions}}",
            channel: "Instagram, TikTok, Facebook, X, dan YouTube sekaligus.",
          },
          points: [
            "Audiens sibuk bekerja dan sulit meluangkan waktu berolahraga.",
            "Masalah waktu memang nyata, tetapi tidak bisa diselesaikan oleh pakaian olahraga.",
            "Menyebut banyak platform sekaligus tanpa menetapkan mana yang utama.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pr3a",
          headline: "Semua Orang",
          fields: {
            avatar: "a1",
            nama: "Semua Orang",
            description: "Semua orang yang membutuhkan pakaian, karena setiap orang pasti berpakaian.",
            age: "Semua umur",
            gender: "Semua gender",
            education: "Semua jenjang",
            income: "Semua tingkat penghasilan",
            values: "Ingin tampil pantas tanpa memikirkan mereknya",
            interest: "Beragam, tidak terpusat pada olahraga",
            opinions: "Menganggap semua pakaian olahraga pada dasarnya sama saja",
            channel: "Brosur dan spanduk di pinggir jalan.",
          },
          points: [
            "Audiens tidak punya masalah apa pun terkait pakaian olahraga.",
            "Hasil segmentasi di langkah sebelumnya tidak dipakai sama sekali.",
            "Saluran yang dipilih tidak menjawab tantangan engagement Instagram pada studi kasus.",
          ],
        },
        {
          id: "pr3b",
          headline: "Pelanggan {{brand}}",
          fields: {
            avatar: "a3",
            nama: "Pelanggan {{brand}}",
            description: "Orang-orang yang sudah pernah membeli produk {{brand}}.",
            age: "Seluruh pembeli lama, tanpa rentang usia tertentu",
            gender: "Laki-laki dan perempuan",
            education: "Beragam, tidak dicatat saat pembelian",
            income: "Beragam, mengikuti riwayat belanja masing-masing",
            values: "Sudah telanjur percaya pada brand",
            interest: "Promo khusus untuk pembeli lama",
            opinions: "Menganggap pembeli baru tidak perlu dikejar lagi",
            channel: "Panggilan telepon satu per satu ke nomor pembeli lama.",
          },
          points: [
            "Engagement Instagram {{brand}} masih rendah.",
            "Ini masalah yang dihadapi brand, bukan masalah yang dialami audiens.",
            "Membatasi diri pada pembeli lama menutup peluang menjangkau audiens baru.",
          ],
        },
        {
          id: "pr3c",
          headline: "Atlet Profesional Nasional",
          fields: {
            avatar: "a4",
            nama: "Atlet Profesional Nasional",
            description:
              "Atlet yang berlatih setiap hari di pemusatan latihan dan bertanding mewakili daerah atau negara. Tujuan utamanya memperoleh perlengkapan bertanding berstandar kompetisi. Karakternya menuntut spesifikasi teknis yang ketat dan terikat kontrak dengan penyedia perlengkapan resmi.",
            age: "18-30 tahun",
            gender: "Laki-laki dan perempuan",
            education: "SMA sampai S1",
            income: "Bergantung pada bonus dan kontrak sponsor",
            values: "Prestasi dan hasil pertandingan di atas segalanya",
            interest: "Program latihan, nutrisi kompetisi, dan perlengkapan bertanding",
            opinions: "Menganggap pakaian olahraga harian tidak memadai untuk kompetisi",
            channel: "Kerja sama langsung dengan pelatih dan pengurus cabang olahraga.",
          },
          points: [
            "Jumlah atlet profesional terlalu sedikit untuk menopang penjualan brand.",
            "Kebutuhan perlengkapan bertanding berbeda jauh dari koleksi harian {{brand}}.",
            "Bertentangan dengan fokus {{brand}} pada gaya hidup aktif masyarakat urban.",
            "Saluran yang dipilih tidak menjawab tantangan engagement Instagram pada studi kasus.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* LANGKAH 3 — RISET KONTEN KOMPETITOR                                 */
/* 3.1 Identifikasi kompetitor utama                                   */
/*                                                                     */
/* Baris "Logo" dan "Screenshot" pada template diganti uraian hasil    */
/* pengamatan: identitas, isi bio, kesan grid, dan daftar konten feed. */
/* Field konten1..konten4 berformat:                                   */
/*   "Format | Tema | Pesan yang ditangkap | Bentuk CTA"               */
/* ================================================================== */

const kompetitorUtama: ChoiceGroup = {
  id: "kompetitor",
  label: "Kompetitor",
  question: "Langkah 1 — identifikasi 1 kompetitor utama beserta akun Instagramnya",
  hint: "Pilih satu brand. Identitas, isi bio, kesan grid, dan daftar konten feed ikut terisi.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "kom1a",
          headline: "CoreNation Activewear (@corenationactive)",
          fields: {
            nama: "CoreNation Activewear",
            akun: "@corenationactive",
            kategori: "Brand activewear lokal asal Surabaya dengan lini khusus perempuan, laki-laki, dan hijab olahraga",
            identitas:
              "Wordmark huruf kapital tanpa serif berwarna gelap dengan foto profil berlatar polos, memberi kesan bersih dan modern",
            bio: "Menyebut posisinya sebagai perlengkapan untuk gaya hidup aktif buatan Indonesia, dilengkapi tautan menuju toko daring dan nomor layanan pelanggan",
            highlight: "Katalog produk, panduan ukuran, ulasan pembeli, dan informasi pengiriman",
            grid:
              "Grid didominasi foto model mengenakan produk dengan latar studio dan luar ruang, warna dominan netral dan pastel, tampak rapi dan seragam antarunggahan",
            konten1: "Reels | Model memperagakan koleksi terbaru sambil bergerak | Produk nyaman dipakai bergerak aktif | Ajakan melihat koleksi lewat tautan di bio",
            konten2: "Carousel | Panduan memilih ukuran dan jenis bahan | Brand membantu pembeli memilih dengan tepat | Ajakan menyimpan unggahan sebagai rujukan",
            konten3: "Feed foto | Foto produk dengan latar bersih | Menonjolkan potongan dan detail jahitan | Ajakan mengunjungi toko daring",
            konten4: "Reels | Rutinitas latihan singkat memakai produk | Produk menemani rutinitas harian | Ajakan mencoba gerakan yang ditampilkan",
          },
          points: [
            "Nama brand: CoreNation Activewear",
            "Akun Instagram: @corenationactive",
            "Alasan dipilih: sama-sama brand pakaian olahraga lokal yang menyasar gaya hidup aktif masyarakat urban",
            "Kesamaan kategori: menawarkan koleksi pakaian olahraga sehari-hari, bukan perlengkapan bertanding",
          ],
        },
        {
          id: "kom1b",
          headline: "Ortuseight (@ortuseight)",
          fields: {
            nama: "Ortuseight",
            akun: "@ortuseight",
            kategori: "Brand olahraga lokal asal Tangerang dengan lini sepatu dan apparel olahraga",
            identitas:
              "Logo berbentuk lambang tegas dengan warna kontras tinggi, memberi kesan sporty dan berani",
            bio: "Menegaskan diri sebagai brand olahraga Indonesia, disertai tautan menuju toko resmi dan penyebutan akun lini produknya",
            highlight: "Peluncuran produk, kolaborasi atlet, dan katalog per kategori olahraga",
            grid:
              "Grid didominasi foto produk berlatar gelap dan cuplikan aksi olahraga, warnanya kontras dan mencolok, terasa energik antarunggahan",
            konten1: "Reels | Cuplikan aksi olahraga memakai produk | Produk mendukung performa saat bertanding | Ajakan melihat koleksi di toko resmi",
            konten2: "Feed foto | Peluncuran seri produk baru | Menonjolkan teknologi dan desain terbaru | Ajakan menandai teman di kolom komentar",
            konten3: "Carousel | Rincian fitur produk per bagian | Menjelaskan keunggulan teknis produk | Ajakan membaca sampai halaman terakhir",
            konten4: "Reels | Kolaborasi dengan atlet atau komunitas | Brand didukung penggunanya di lapangan | Ajakan mengikuti kegiatan berikutnya",
          },
          points: [
            "Nama brand: Ortuseight",
            "Akun Instagram: @ortuseight",
            "Alasan dipilih: brand olahraga lokal dengan jangkauan audiens luas yang juga menjual apparel olahraga",
            "Kesamaan kategori: menyasar audiens muda perkotaan yang aktif berolahraga",
          ],
        },
        {
          id: "kom1c",
          headline: "League Indonesia (@league_world)",
          fields: {
            nama: "League Indonesia",
            akun: "@league_world",
            kategori: "Brand sportswear lokal dengan lini sepatu dan pakaian olahraga",
            identitas:
              "Wordmark huruf tebal dengan penanda tagar #LeadTheWay, warna dominan gelap dan berkesan tegas",
            bio: "Memuat tagar kampanye brand serta informasi layanan pelanggan dan tautan pembelian",
            highlight: "Koleksi terbaru, kampanye brand, dan lokasi gerai",
            grid:
              "Grid memadukan foto kampanye brand dengan foto produk, warna dominan gelap dan monokrom, terlihat konsisten sebagai satu kesatuan",
            konten1: "Feed foto | Foto kampanye brand dengan model | Membangun citra brand secara keseluruhan | Ajakan mengikuti tagar kampanye",
            konten2: "Reels | Cuplikan pemakaian produk saat berolahraga | Produk mengikuti gerak pemakainya | Ajakan berbelanja lewat tautan di bio",
            konten3: "Carousel | Perkenalan koleksi terbaru per model | Memperlihatkan pilihan warna dan tipe | Ajakan memilih favorit di kolom komentar",
            konten4: "Feed foto | Informasi ketersediaan di gerai | Mempermudah pembeli menemukan produk | Ajakan mengunjungi gerai terdekat",
          },
          points: [
            "Nama brand: League Indonesia",
            "Akun Instagram: @league_world",
            "Alasan dipilih: brand sportswear lokal mapan yang menjadi pembanding wajar bagi {{brand}}",
            "Kesamaan kategori: menjual pakaian dan perlengkapan olahraga untuk pemakaian harian",
          ],
        },
        {
          id: "kom1d",
          headline: "Specs Indonesia (@specs_indonesia)",
          fields: {
            nama: "Specs Indonesia",
            akun: "@specs_indonesia",
            kategori: "Brand olahraga lokal asal Jakarta dengan lini sepatu dan apparel",
            identitas:
              "Logo wordmark miring berwarna kontras yang sudah dikenal luas, berkesan kompetitif",
            bio: "Menyebut identitasnya sebagai brand olahraga Indonesia disertai tautan menuju toko resmi",
            highlight: "Katalog produk, kegiatan komunitas, dan kolaborasi",
            grid:
              "Grid didominasi foto produk dan momen pertandingan, warnanya kuat dan kontras, terasa lebih ramai dibanding akun activewear",
            konten1: "Feed foto | Foto produk sepatu dan apparel | Menonjolkan desain dan warna produk | Ajakan berbelanja di toko resmi",
            konten2: "Reels | Momen pertandingan dan latihan | Produk dipakai di situasi olahraga sungguhan | Ajakan menonton sampai selesai",
            konten3: "Carousel | Penjelasan seri produk | Membedakan tiap seri bagi calon pembeli | Ajakan bertanya lewat pesan langsung",
            konten4: "Reels | Kegiatan komunitas dan kompetisi | Brand dekat dengan komunitas olahraga | Ajakan mendaftar kegiatan berikutnya",
          },
          points: [
            "Nama brand: Specs Indonesia",
            "Akun Instagram: @specs_indonesia",
            "Alasan dipilih: brand olahraga lokal dengan pengenalan nama yang kuat di kalangan audiens muda",
            "Kesamaan kategori: menjual apparel olahraga bagi audiens perkotaan yang aktif",
          ],
        },
        {
          id: "kom1e",
          headline: "Aruna Sportswear (@arunasportswear)",
          fields: {
            nama: "Aruna Sportswear Indonesia",
            akun: "@arunasportswear",
            kategori: "Brand sportswear lokal yang menonjolkan kenyamanan dan bahan ringan",
            identitas:
              "Wordmark tipis tanpa serif dengan warna lembut, berkesan tenang dan minimalis",
            bio: "Menyebut janji produknya yang nyaman dan ringan, disertai tautan menuju toko daring",
            highlight: "Katalog koleksi, panduan ukuran, dan ulasan pembeli",
            grid:
              "Grid didominasi foto produk berlatar terang dengan warna lembut, tampak bersih dan seragam antarunggahan",
            konten1: "Feed foto | Foto produk dengan latar terang | Menonjolkan kesan ringan dan nyaman | Ajakan melihat katalog di tautan bio",
            konten2: "Carousel | Perbandingan jenis bahan yang dipakai | Membantu pembeli memahami pilihan bahan | Ajakan menyimpan unggahan",
            konten3: "Reels | Model memperagakan produk saat bergerak | Produk mengikuti gerak tanpa mengganggu | Ajakan mencoba koleksi terbaru",
            konten4: "Feed foto | Unggahan ulang foto pembeli | Produk sudah dipakai pengguna nyata | Ajakan mengirim foto pemakaian sendiri",
          },
          points: [
            "Nama brand: Aruna Sportswear Indonesia",
            "Akun Instagram: @arunasportswear",
            "Alasan dipilih: brand sportswear lokal dengan positioning kenyamanan yang paling dekat dengan {{brand}}",
            "Kesamaan kategori: menyasar audiens urban yang mencari pakaian olahraga nyaman untuk pemakaian harian",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "kom2a",
          headline: "Brand olahraga lokal (tanpa menyebut nama)",
          fields: {
            nama: "Salah satu brand pakaian olahraga lokal",
            akun: "Akun brand pakaian olahraga lokal di Instagram, nama akunnya tidak dicatat",
            kategori: "Brand pakaian olahraga lokal",
            identitas: "Logo bertuliskan nama brand dengan warna gelap dan foto profil polos",
            bio: "Berisi nama brand dan satu tautan menuju toko daring",
            highlight: "Katalog produk dan cara pemesanan",
            grid: "Grid berisi campuran foto produk dan foto model, tampak cukup rapi tetapi warnanya belum seragam",
            konten1: "Feed foto | Foto produk di atas latar polos | Menampilkan pilihan warna produk | Ajakan berbelanja di toko daring",
            konten2: "Reels | Model memakai produk sambil berjalan | Produk nyaman dipakai bergerak | Ajakan melihat tautan di bio",
            konten3: "Feed foto | Model memakai produk di luar ruang | Produk cocok untuk kegiatan harian | Ajakan menandai teman",
            konten4: "Feed foto | Pengumuman potongan harga | Menonjolkan harga miring | Ajakan segera memesan",
          },
          points: [
            "Kategori kompetitor sudah tepat, yaitu brand pakaian olahraga lokal",
            "Nama brand dan akun Instagramnya tidak dicatat sehingga tidak bisa ditelusuri ulang",
            "Instruksi langkah 1 meminta identifikasi kompetitor secara spesifik",
          ],
        },
        {
          id: "kom2b",
          headline: "Nike (@nike)",
          fields: {
            nama: "Nike",
            akun: "@nike",
            kategori: "Brand olahraga global",
            identitas: "Logo centang yang sudah dikenal di seluruh dunia",
            bio: "Berisi kalimat kampanye global dan tautan menuju situs resmi",
            highlight: "Kampanye global, kolaborasi atlet dunia, dan peluncuran produk",
            grid: "Grid berisi foto kampanye berbiaya besar dengan atlet ternama dan penggarapan visual tingkat tinggi",
            konten1: "Reels | Kampanye global dengan atlet dunia | Membangun citra brand global | Ajakan mengikuti kampanye",
            konten2: "Feed foto | Peluncuran produk edisi terbatas | Menonjolkan kelangkaan produk | Ajakan mendaftar antrean pembelian",
            konten3: "Reels | Cerita perjalanan atlet | Menghubungkan brand dengan semangat juang | Ajakan menonton versi panjang",
            konten4: "Feed foto | Kolaborasi dengan perancang ternama | Menonjolkan nilai eksklusif | Ajakan menantikan tanggal rilis",
          },
          points: [
            "Nama brand dan akun sudah spesifik dan mudah ditelusuri",
            "Namun skala, anggaran, dan audiensnya jauh berbeda dari {{brand}} sebagai brand lokal",
            "Hasil analisisnya sulit ditiru karena kemampuan produksi kontennya tidak sebanding",
          ],
        },
        {
          id: "kom2c",
          headline: "Toko daring penjual pakaian olahraga",
          fields: {
            nama: "Toko daring penjual berbagai merek",
            akun: "Akun toko di marketplace",
            kategori: "Penjual ulang berbagai merek pakaian olahraga",
            identitas: "Memakai foto produk dari pemasok, tanpa identitas visual sendiri",
            bio: "Berisi daftar merek yang dijual dan nomor pemesanan",
            highlight: "Daftar harga dan bukti pengiriman",
            grid: "Grid berisi foto produk dari berbagai merek tanpa gaya visual yang seragam",
            konten1: "Feed foto | Foto produk dari berbagai merek | Menampilkan ketersediaan barang | Ajakan memesan lewat pesan langsung",
            konten2: "Feed foto | Daftar harga | Menonjolkan harga murah | Ajakan menanyakan stok",
            konten3: "Feed foto | Bukti pengiriman | Menunjukkan toko aktif melayani | Ajakan memesan hari ini",
            konten4: "Feed foto | Foto produk ulang dari pemasok | Menampilkan pilihan barang | Ajakan menyimpan nomor pemesanan",
          },
          points: [
            "Sudah menyasar kategori produk yang sama, yaitu pakaian olahraga",
            "Namun yang dianalisis adalah penjual ulang, bukan brand yang membangun identitasnya sendiri",
            "Strategi kontennya tidak sebanding untuk dijadikan rujukan {{brand}}",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "kom3a",
          headline: "Brand minuman kemasan",
          fields: {
            nama: "Brand minuman kemasan",
            akun: "Akun brand minuman",
            kategori: "Produk minuman, bukan pakaian olahraga",
            identitas: "Identitas visual khas kategori minuman",
            bio: "Berisi kalimat promosi produk minuman",
            highlight: "Varian rasa dan lokasi pembelian",
            grid: "Grid berisi foto kemasan minuman dan kegiatan promosi produk",
            konten1: "Feed foto | Foto kemasan produk minuman | Menonjolkan kesegaran produk | Ajakan mencoba varian baru",
            konten2: "Reels | Kegiatan promosi di pusat perbelanjaan | Menarik perhatian pengunjung | Ajakan mengunjungi stan",
            konten3: "Feed foto | Varian rasa baru | Menonjolkan pilihan rasa | Ajakan memilih rasa favorit",
            konten4: "Feed foto | Undian berhadiah | Mendorong pembelian berulang | Ajakan mengumpulkan tutup botol",
          },
          points: [
            "Bukan kompetitor karena tidak menjual produk atau layanan yang sama",
            "Riset kompetitor mensyaratkan brand yang menjual produk sejenis",
            "Hasil analisisnya tidak dapat dipakai menyusun strategi konten {{brand}}",
          ],
        },
        {
          id: "kom3b",
          headline: "Akun {{brand}} sendiri",
          fields: {
            nama: "{{brand}}",
            akun: "Akun {{brand}} sendiri",
            kategori: "Brand sendiri, bukan pesaing",
            identitas: "Identitas visual {{brand}}",
            bio: "Bio akun {{brand}}",
            highlight: "Katalog produk {{brand}}",
            grid: "Grid akun {{brand}} sendiri",
            konten1: "Feed foto | Konten {{brand}} sendiri | Konten milik brand sendiri | Ajakan berbelanja",
            konten2: "Reels | Konten {{brand}} sendiri | Konten milik brand sendiri | Ajakan berbelanja",
            konten3: "Feed foto | Konten {{brand}} sendiri | Konten milik brand sendiri | Ajakan berbelanja",
            konten4: "Feed foto | Konten {{brand}} sendiri | Konten milik brand sendiri | Ajakan berbelanja",
          },
          points: [
            "Yang dianalisis adalah akun sendiri, bukan pesaing",
            "Tidak ada pembanding yang diperoleh dari kegiatan riset ini",
            "Instruksi langkah 1 untuk mengidentifikasi kompetitor utama tidak dijalankan",
          ],
        },
        {
          id: "kom3c",
          headline: "Akun komunitas penggemar olahraga",
          fields: {
            nama: "Akun komunitas penggemar olahraga",
            akun: "Akun komunitas penggemar, bukan akun brand penjual produk",
            kategori: "Komunitas penggemar, tidak menjual produk apa pun",
            identitas: "Foto profil berupa lambang komunitas dengan warna cerah",
            bio: "Berisi nama komunitas, kota asal, dan jadwal kegiatan bersama",
            highlight: "Dokumentasi kegiatan, daftar anggota, dan jadwal latihan",
            grid: "Grid berisi foto kegiatan bersama dan potret anggota, warnanya beragam tanpa pola tetap",
            konten1: "Feed foto | Dokumentasi lari bersama akhir pekan | Mengajak anggota baru bergabung | Ajakan mendaftar kegiatan berikutnya",
            konten2: "Reels | Cuplikan kegiatan komunitas | Menunjukkan keseruan berlatih bersama | Ajakan menandai teman satu komunitas",
            konten3: "Feed foto | Ucapan selamat kepada anggota | Mempererat hubungan antaranggota | Ajakan memberi ucapan di kolom komentar",
            konten4: "Feed foto | Pengumuman jadwal latihan | Menyampaikan informasi internal | Ajakan menyimpan tanggalnya",
          },
          points: [
            "Komunitas penggemar tidak menjual produk, jadi bukan kompetitor {{brand}}",
            "Riset kompetitor mensyaratkan brand yang menjual produk atau layanan sejenis",
            "Strategi kontennya tidak sebanding untuk dijadikan rujukan brand yang berjualan",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3.2 Analisis konten kompetitor — 5 elemen sesuai template           */
/* ================================================================== */

const elemenVisual: ChoiceGroup = {
  id: "visual",
  label: "Elemen Visual",
  question: "Langkah 2 — Elemen Visual konten {{kompetitor}}",
  hint: "Amati warna, jenis foto, tata letak, dan konsistensi tampilan antarunggahan.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "vis1a",
          headline: "Warna konsisten dengan foto model sebagai tokoh utama",
          points: [
            "Warna dominan: satu keluarga warna dipakai berulang di hampir seluruh unggahan sehingga grid terlihat sebagai satu kesatuan.",
            "Jenis gambar: didominasi foto model mengenakan produk, bukan foto produk yang berdiri sendiri.",
            "Tata letak: teks pada gambar diletakkan di posisi yang sama antarunggahan dengan ukuran huruf yang seragam.",
            "Konsistensi: gaya penyuntingan foto tidak berubah-ubah, sehingga akun mudah dikenali meski muncul di beranda orang lain.",
          ],
        },
        {
          id: "vis1b",
          headline: "Video pendek vertikal mendominasi, foto sebagai pelengkap",
          points: [
            "Format utama: video pendek vertikal yang memenuhi layar, dengan foto feed sebagai pelengkap.",
            "Warna dominan: kontras cukup tinggi agar gerakan tetap terbaca saat ditonton di layar kecil.",
            "Tata letak: tiga detik pertama selalu menampilkan produk atau gerakan, tanpa pembuka yang bertele-tele.",
            "Konsistensi: sampul Reels dibuat seragam sehingga grid tetap rapi meski isinya video.",
          ],
        },
        {
          id: "vis1c",
          headline: "Latar bersih dengan penonjolan detail produk",
          points: [
            "Warna dominan: latar polos terang yang membuat produk menjadi pusat perhatian.",
            "Jenis gambar: banyak foto jarak dekat yang menyorot jahitan, bahan, dan detail potongan.",
            "Tata letak: satu unggahan menampilkan satu pesan saja, tidak menumpuk banyak informasi dalam satu gambar.",
            "Konsistensi: sudut pengambilan gambar berulang di tiap seri produk sehingga terasa seperti katalog yang tertata.",
          ],
        },
        {
          id: "vis1d",
          headline: "Perpaduan foto kampanye dan foto pemakaian sehari-hari",
          points: [
            "Jenis gambar: foto kampanye bergaya profesional diselingi foto pemakaian sehari-hari yang terasa lebih apa adanya.",
            "Warna dominan: foto kampanye memakai warna yang lebih matang, sementara foto keseharian dibiarkan lebih natural.",
            "Tata letak: unggahan kampanye ditempatkan berkala agar grid tidak terlihat monoton.",
            "Konsistensi: meski dua gaya dipakai bersamaan, keduanya tetap memakai logo dan tipografi yang sama.",
          ],
        },
        {
          id: "vis1e",
          headline: "Carousel penjelas dengan tata letak yang berulang",
          points: [
            "Format utama: carousel yang menjelaskan satu topik secara bertahap dari halaman pertama sampai terakhir.",
            "Tata letak: halaman pertama berisi pertanyaan atau masalah, halaman berikutnya berisi jawaban, halaman terakhir berisi ajakan.",
            "Warna dominan: warna latar tiap halaman dibuat berselang-seling agar pembaca terdorong menggeser.",
            "Konsistensi: pola susunan yang sama dipakai di setiap carousel sehingga pengikut terbiasa dengan alurnya.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "vis2a",
          headline: "Fotonya bagus",
          points: [
            "Foto yang dipakai terlihat bagus dan menarik.",
            "Belum menjelaskan warna dominan, jenis gambar, maupun tata letaknya.",
            "Penilaian bagus atau tidak bersifat selera, belum berupa hasil pengamatan yang bisa dibandingkan.",
          ],
        },
        {
          id: "vis2b",
          headline: "Warna dominan disebut, unsur lain belum",
          points: [
            "Warna dominan akun ini adalah warna gelap dan netral.",
            "Satu unsur sudah teramati dengan jelas.",
            "Jenis gambar, tata letak, dan konsistensi antarunggahan belum dibahas.",
          ],
        },
        {
          id: "vis2c",
          headline: "Banyak memakai video",
          points: [
            "Akun ini banyak mengunggah video pendek.",
            "Format konten sudah teridentifikasi.",
            "Belum menjelaskan bagaimana video tersebut disusun secara visual dan apakah gayanya konsisten.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "vis3a",
          headline: "Tidak diamati",
          points: [
            "Elemen visual kompetitor tidak diamati.",
            "Baris wajib pada template analisis konten dibiarkan kosong.",
            "Peluang dan inspirasi pada langkah 4 kehilangan bahan pembandingnya.",
          ],
        },
        {
          id: "vis3b",
          headline: "Menilai dari selera pribadi",
          points: [
            "Konten kompetitor jelek dan tidak enak dilihat.",
            "Penilaian bersifat selera pribadi, bukan hasil pengamatan unsur visual.",
            "Tidak menjelaskan satu pun dari warna, jenis gambar, tata letak, atau konsistensi.",
          ],
        },
        {
          id: "vis3c",
          headline: "Membahas harga produk",
          points: [
            "Harga produk kompetitor lebih mahal dibanding {{brand}}.",
            "Yang dibahas adalah harga, bukan elemen visual konten.",
            "Baris ini terisi tetapi tidak menjawab pertanyaan pada template.",
          ],
        },
      ],
    },
  ],
};

const pesanUtama: ChoiceGroup = {
  id: "pesan",
  label: "Pesan Utama",
  question: "Langkah 2 — Pesan Utama yang disampaikan konten {{kompetitor}}",
  hint: "Pesan utama adalah gagasan yang ingin ditanamkan lewat konten, bukan sekadar isi caption.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pes1a",
          headline: "Produk mendukung gerak tanpa mengganggu",
          points: [
            "Pesan utama: produk dirancang agar pemakainya bisa bergerak bebas tanpa terganggu pakaiannya.",
            "Cara menyampaikan: memperlihatkan pemakaian saat bergerak, bukan sekadar berpose diam.",
            "Sasaran pesan: audiens yang pernah terganggu oleh pakaian olahraga yang menempel atau melar.",
            "Bukti yang ditampilkan: penjelasan bahan dan potongan yang muncul berulang di berbagai unggahan.",
          ],
        },
        {
          id: "pes1b",
          headline: "Bangga memakai produk buatan dalam negeri",
          points: [
            "Pesan utama: brand lokal sudah setara brand luar sehingga pemakainya tidak perlu ragu.",
            "Cara menyampaikan: menegaskan asal produksi dan menampilkan orang-orang di balik pembuatannya.",
            "Sasaran pesan: audiens yang berpihak pada produk dalam negeri tetapi masih meragukan mutunya.",
            "Bukti yang ditampilkan: cerita proses produksi dan ulasan pemakai dalam negeri.",
          ],
        },
        {
          id: "pes1c",
          headline: "Olahraga adalah kebiasaan harian, bukan tren sesaat",
          points: [
            "Pesan utama: berolahraga adalah kebiasaan yang dijalani terus-menerus, dan produk menemani prosesnya.",
            "Cara menyampaikan: menampilkan rutinitas sehari-hari, bukan pencapaian yang muluk.",
            "Sasaran pesan: audiens yang baru mulai membangun kebiasaan berolahraga.",
            "Bukti yang ditampilkan: unggahan berkala yang menyorot proses, bukan hasil akhir.",
          ],
        },
        {
          id: "pes1d",
          headline: "Mutu tinggi dengan harga yang masih masuk akal",
          points: [
            "Pesan utama: pembeli tidak perlu membayar mahal untuk mendapatkan bahan yang layak.",
            "Cara menyampaikan: menjelaskan bahan secara terbuka lalu menyandingkannya dengan harga.",
            "Sasaran pesan: audiens yang teliti membandingkan nilai uang sebelum membeli.",
            "Bukti yang ditampilkan: penjelasan jenis bahan dan perbandingan dengan pilihan lain di pasar.",
          ],
        },
        {
          id: "pes1e",
          headline: "Produk pantas dipakai di dalam maupun di luar tempat latihan",
          points: [
            "Pesan utama: satu potong pakaian bisa dipakai untuk berlatih sekaligus untuk berkegiatan sehari-hari.",
            "Cara menyampaikan: menampilkan satu produk pada dua situasi berbeda dalam satu unggahan.",
            "Sasaran pesan: audiens perkotaan dengan jadwal padat yang tidak sempat berganti pakaian.",
            "Bukti yang ditampilkan: contoh padu padan produk untuk berbagai kegiatan.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pes2a",
          headline: "Menjual produk",
          points: [
            "Pesan utamanya adalah menjual produk kepada pengikut akun.",
            "Menjual memang tujuan akhirnya, tetapi itu bukan pesan yang ditanamkan lewat konten.",
            "Belum menjelaskan gagasan apa yang ingin diingat audiens setelah melihat kontennya.",
          ],
        },
        {
          id: "pes2b",
          headline: "Mengajak hidup sehat",
          points: [
            "Pesan utamanya mengajak audiens untuk hidup lebih sehat.",
            "Sudah menangkap arah pesan secara umum.",
            "Belum menjelaskan bagaimana pesan itu disampaikan dan kepada siapa ditujukan.",
          ],
        },
        {
          id: "pes2c",
          headline: "Produknya bagus dan berkualitas",
          points: [
            "Pesan utamanya adalah produknya bagus dan berkualitas.",
            "Klaim ini dipakai hampir semua brand sehingga belum menunjukkan pembeda kompetitor.",
            "Belum terlihat sudut pandang khas yang bisa dipelajari oleh {{brand}}.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pes3a",
          headline: "Tidak ada pesan",
          points: [
            "Konten kompetitor tidak menyampaikan pesan apa pun.",
            "Setiap konten yang diunggah brand selalu membawa pesan, sekurang-kurangnya secara tersirat.",
            "Baris wajib pada template analisis konten tidak terisi secara berarti.",
          ],
        },
        {
          id: "pes3b",
          headline: "Menyalin caption apa adanya",
          points: [
            "Caption unggahan terakhir mereka berbunyi seperti yang tertulis di akunnya.",
            "Menyalin caption bukan menganalisis pesan utama.",
            "Gagasan di balik konten tetap tidak terungkap.",
          ],
        },
        {
          id: "pes3c",
          headline: "Pesannya sama seperti {{brand}}",
          points: [
            "Pesan kompetitor sama persis dengan pesan {{brand}}.",
            "Disampaikan tanpa pengamatan, sehingga tidak ada pembeda yang ditemukan.",
            "Riset kompetitor justru bertujuan menemukan perbedaannya.",
          ],
        },
      ],
    },
  ],
};

const ctaGroup: ChoiceGroup = {
  id: "cta",
  label: "Call to Action",
  question: "Langkah 2 — Call to Action (CTA) yang dipakai {{kompetitor}}",
  hint: "CTA adalah ajakan bertindak yang diberikan kepada audiens di akhir konten.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "cta1a",
          headline: "Ajakan berbelanja lewat tautan di bio",
          points: [
            "Bentuk CTA: mengarahkan audiens ke tautan di bio untuk menuju toko daring.",
            "Penempatan: disebut di akhir caption sekaligus ditulis pada gambar terakhir carousel.",
            "Frekuensi: muncul di hampir seluruh unggahan produk, tetapi tidak dipakai pada konten edukasi.",
            "Catatan: ajakannya singkat dan tidak mendesak, sehingga tidak terasa seperti jualan terus-menerus.",
          ],
        },
        {
          id: "cta1b",
          headline: "Ajakan berinteraksi di kolom komentar",
          points: [
            "Bentuk CTA: meminta audiens menyebutkan pilihan favorit atau menandai teman di kolom komentar.",
            "Penempatan: diletakkan di kalimat pertama caption agar terbaca sebelum caption terpotong.",
            "Frekuensi: dipakai berselang-seling dengan ajakan berbelanja agar interaksi tetap tumbuh.",
            "Catatan: cara ini menambah jumlah komentar sehingga unggahan lebih lama bertahan di beranda.",
          ],
        },
        {
          id: "cta1c",
          headline: "Ajakan menyimpan unggahan sebagai rujukan",
          points: [
            "Bentuk CTA: meminta audiens menyimpan unggahan agar bisa dibuka lagi saat dibutuhkan.",
            "Penempatan: muncul pada konten panduan ukuran dan penjelasan bahan.",
            "Frekuensi: khusus dipakai pada konten edukasi, tidak pada konten promosi.",
            "Catatan: jumlah simpanan yang tinggi membantu unggahan menjangkau audiens di luar pengikut.",
          ],
        },
        {
          id: "cta1d",
          headline: "Ajakan bertanya lewat pesan langsung",
          points: [
            "Bentuk CTA: mengarahkan audiens mengirim pesan langsung untuk menanyakan ukuran dan ketersediaan.",
            "Penempatan: disebut di akhir caption dan diulang pada Story.",
            "Frekuensi: dipakai pada unggahan produk yang pilihan ukurannya beragam.",
            "Catatan: memindahkan percakapan ke ruang pribadi sehingga peluang penjualan lebih mudah ditutup.",
          ],
        },
        {
          id: "cta1e",
          headline: "Ajakan mengikuti kegiatan atau kolaborasi",
          points: [
            "Bentuk CTA: mengajak audiens mendaftar kegiatan komunitas atau mengikuti kolaborasi brand.",
            "Penempatan: ditulis jelas pada gambar dan diulang di caption beserta tenggat waktunya.",
            "Frekuensi: muncul berkala menjelang kegiatan, tidak pada unggahan harian.",
            "Catatan: mendorong keterlibatan yang berlanjut ke luar media sosial.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "cta2a",
          headline: "Ada ajakan membeli",
          points: [
            "Kompetitor mengajak audiens untuk membeli produknya.",
            "Bentuk ajakan sudah teridentifikasi secara umum.",
            "Belum menjelaskan kalimat ajakannya, letaknya, maupun seberapa sering dipakai.",
          ],
        },
        {
          id: "cta2b",
          headline: "Menyuruh cek bio",
          points: [
            "Kompetitor menulis ajakan untuk mengecek tautan di bio.",
            "Sudah menyebut bentuk CTA yang dipakai.",
            "Belum diamati apakah CTA ini dipakai di semua konten atau hanya sebagian.",
          ],
        },
        {
          id: "cta2c",
          headline: "CTA-nya biasa saja",
          points: [
            "CTA kompetitor terlihat biasa dan tidak menarik.",
            "Penilaian sudah diberikan, tetapi tanpa menyebut bentuk CTA yang diamati.",
            "Tidak bisa dipakai sebagai bahan perbandingan bagi {{brand}}.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "cta3a",
          headline: "Tidak diamati",
          points: [
            "Call to action kompetitor tidak diamati.",
            "Baris wajib pada template analisis konten dibiarkan kosong.",
            "{{brand}} kehilangan gambaran cara kompetitor mendorong audiens bertindak.",
          ],
        },
        {
          id: "cta3b",
          headline: "Kompetitor tidak pernah memakai CTA",
          points: [
            "Kompetitor sama sekali tidak pernah memakai ajakan bertindak.",
            "Pernyataan ini disampaikan tanpa memeriksa caption unggahannya.",
            "Hampir semua akun brand memakai CTA dalam bentuk tertentu.",
          ],
        },
        {
          id: "cta3c",
          headline: "Membahas jumlah pengikut",
          points: [
            "Kompetitor punya pengikut lebih banyak dibanding {{brand}}.",
            "Yang dibahas adalah jumlah pengikut, bukan bentuk ajakan bertindak.",
            "Baris terisi tetapi tidak menjawab pertanyaan pada template.",
          ],
        },
      ],
    },
  ],
};

const promoGroup: ChoiceGroup = {
  id: "promo",
  label: "Diskon / Promo",
  question: "Langkah 2 — Diskon atau Promo yang dijalankan {{kompetitor}}",
  hint: "Amati bentuk penawaran, waktu penayangan, dan cara menyampaikannya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pro1a",
          headline: "Promo tanggal kembar dengan hitung mundur",
          points: [
            "Bentuk promo: potongan harga pada tanggal kembar setiap bulan.",
            "Waktu penayangan: konten pengingat mulai muncul beberapa hari sebelum tanggalnya.",
            "Cara menyampaikan: memakai hitung mundur di Story untuk menjaga perhatian audiens.",
            "Catatan: promo diarahkan ke marketplace, bukan ke toko daring milik brand sendiri.",
          ],
        },
        {
          id: "pro1b",
          headline: "Paket hemat pembelian beberapa potong",
          points: [
            "Bentuk promo: harga lebih murah bila membeli dua potong atau lebih sekaligus.",
            "Waktu penayangan: berjalan terus-menerus, bukan hanya pada tanggal tertentu.",
            "Cara menyampaikan: menampilkan contoh padu padan agar pembelian lebih dari satu terasa masuk akal.",
            "Catatan: mendorong nilai belanja per pembeli tanpa memangkas harga satuan terlalu dalam.",
          ],
        },
        {
          id: "pro1c",
          headline: "Gratis ongkos kirim dengan batas belanja minimum",
          points: [
            "Bentuk promo: bebas ongkos kirim untuk pembelian di atas nilai tertentu.",
            "Waktu penayangan: ditayangkan berkala, terutama menjelang akhir bulan.",
            "Cara menyampaikan: disebut singkat pada gambar produk, bukan dibuat sebagai unggahan tersendiri.",
            "Catatan: menekan keraguan pembeli daring yang sering terhalang biaya kirim.",
          ],
        },
        {
          id: "pro1d",
          headline: "Promo peluncuran koleksi baru dengan jumlah terbatas",
          points: [
            "Bentuk promo: harga khusus pada hari-hari pertama peluncuran koleksi.",
            "Waktu penayangan: hanya berlangsung beberapa hari sejak koleksi dirilis.",
            "Cara menyampaikan: menegaskan jumlah terbatas agar audiens tidak menunda pembelian.",
            "Catatan: mendorong penjualan awal sekaligus menciptakan perbincangan seputar koleksi baru.",
          ],
        },
        {
          id: "pro1e",
          headline: "Kode potongan lewat kolaborasi kreator",
          points: [
            "Bentuk promo: kode potongan harga yang dibagikan lewat akun kreator yang diajak bekerja sama.",
            "Waktu penayangan: mengikuti jadwal unggahan kreator, bukan jadwal brand.",
            "Cara menyampaikan: kode disebut di dalam video kreator dan diulang di caption.",
            "Catatan: sekaligus menjadi cara mengukur kreator mana yang paling banyak mendatangkan pembeli.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pro2a",
          headline: "Sering ada diskon",
          points: [
            "Kompetitor sering mengadakan diskon.",
            "Keberadaan promo sudah teramati.",
            "Belum menjelaskan bentuk, besaran, waktu, maupun cara menyampaikannya.",
          ],
        },
        {
          id: "pro2b",
          headline: "Ada promo saat tanggal kembar",
          points: [
            "Kompetitor mengadakan promo pada tanggal kembar.",
            "Waktu promo sudah teridentifikasi dengan jelas.",
            "Belum diamati bagaimana promo itu disampaikan lewat kontennya.",
          ],
        },
        {
          id: "pro2c",
          headline: "Harganya sering murah",
          points: [
            "Harga produk kompetitor sering terlihat murah.",
            "Sudah menyinggung sisi harga.",
            "Belum membedakan mana harga normal dan mana harga promo.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pro3a",
          headline: "Tidak diamati",
          points: [
            "Promo kompetitor tidak diamati.",
            "Baris wajib pada template analisis konten dibiarkan kosong.",
            "{{brand}} kehilangan gambaran pola penawaran di kategori yang sama.",
          ],
        },
        {
          id: "pro3b",
          headline: "Menebak tanpa memeriksa",
          points: [
            "Kemungkinan besar kompetitor memberi diskon besar setiap minggu.",
            "Disampaikan sebagai dugaan, bukan hasil pengamatan akun.",
            "Riset kompetitor menuntut pencatatan apa yang benar-benar terlihat.",
          ],
        },
        {
          id: "pro3c",
          headline: "Menyarankan menurunkan harga sendiri",
          points: [
            "{{brand}} sebaiknya menurunkan harga di bawah kompetitor.",
            "Ini saran tindakan, bukan hasil pengamatan promo kompetitor.",
            "Perang harga juga bertentangan dengan keunggulan {{brand}} pada mutu bahan.",
          ],
        },
      ],
    },
  ],
};

const engagementGroup: ChoiceGroup = {
  id: "engagement",
  label: "Engagement",
  question: "Langkah 2 — Engagement pada konten {{kompetitor}}",
  hint: "Amati jenis konten yang paling banyak menarik interaksi dan isi kolom komentarnya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "eng1a",
          headline: "Video pemakaian produk paling banyak menarik interaksi",
          points: [
            "Konten dengan interaksi tertinggi: video pendek yang memperlihatkan produk dipakai bergerak.",
            "Konten dengan interaksi terendah: foto produk polos tanpa model maupun konteks pemakaian.",
            "Isi kolom komentar: paling banyak menanyakan ukuran, bahan, dan ketersediaan warna.",
            "Pola waktu: unggahan malam hari mendapat komentar lebih banyak dibanding unggahan siang.",
          ],
        },
        {
          id: "eng1b",
          headline: "Konten edukasi banyak disimpan dan dibagikan",
          points: [
            "Konten dengan interaksi tertinggi: carousel panduan ukuran dan penjelasan bahan yang banyak disimpan audiens.",
            "Konten dengan interaksi terendah: unggahan promo berulang yang isinya mirip satu sama lain.",
            "Isi kolom komentar: banyak berisi ucapan terima kasih dan pertanyaan lanjutan seputar perawatan produk.",
            "Pola waktu: interaksi konten edukasi terus bertambah beberapa hari setelah diunggah.",
          ],
        },
        {
          id: "eng1c",
          headline: "Unggahan ulang foto pengguna mendapat komentar terbanyak",
          points: [
            "Konten dengan interaksi tertinggi: unggahan ulang foto pembeli yang memakai produk.",
            "Konten dengan interaksi terendah: foto kampanye bergaya profesional yang terasa jauh dari keseharian audiens.",
            "Isi kolom komentar: banyak audiens menandai teman dan menanyakan tempat pembelian.",
            "Pola waktu: interaksi memuncak pada hari pertama lalu menurun tajam.",
          ],
        },
        {
          id: "eng1d",
          headline: "Konten kegiatan komunitas menumbuhkan percakapan",
          points: [
            "Konten dengan interaksi tertinggi: liputan kegiatan komunitas dan latihan bersama.",
            "Konten dengan interaksi terendah: unggahan berisi pengumuman satu arah tanpa ajakan berinteraksi.",
            "Isi kolom komentar: peserta kegiatan saling membalas dan menanyakan jadwal berikutnya.",
            "Pola waktu: percakapan berlanjut beberapa hari setelah kegiatan berlangsung.",
          ],
        },
        {
          id: "eng1e",
          headline: "Interaksi tinggi pada konten yang mengangkat keluhan audiens",
          points: [
            "Konten dengan interaksi tertinggi: unggahan yang membahas keluhan umum audiens, misalnya pakaian yang gerah atau ukuran yang tidak pas.",
            "Konten dengan interaksi terendah: unggahan yang hanya memuji produk sendiri.",
            "Isi kolom komentar: audiens ramai membagikan pengalaman serupa yang mereka alami.",
            "Pola waktu: unggahan jenis ini bertahan lebih lama di beranda karena komentarnya terus bertambah.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "eng2a",
          headline: "Engagement-nya bagus",
          points: [
            "Engagement akun kompetitor terlihat bagus.",
            "Penilaian sudah diberikan secara umum.",
            "Belum menyebut jenis konten mana yang paling banyak menarik interaksi.",
          ],
        },
        {
          id: "eng2b",
          headline: "Banyak yang like",
          points: [
            "Unggahan kompetitor banyak mendapat tanda suka.",
            "Satu bentuk interaksi sudah teramati.",
            "Komentar, simpanan, dan bagikan ulang belum diperiksa sama sekali.",
          ],
        },
        {
          id: "eng2c",
          headline: "Komentarnya banyak tapi tidak dibaca isinya",
          points: [
            "Kolom komentar kompetitor ramai terisi.",
            "Jumlah komentar sudah teramati.",
            "Isi komentarnya belum dibaca sehingga kebutuhan audiens tidak tertangkap.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "eng3a",
          headline: "Tidak diamati",
          points: [
            "Engagement konten kompetitor tidak diamati.",
            "Baris wajib pada template analisis konten dibiarkan kosong.",
            "Padahal tantangan utama {{brand}} pada studi kasus justru soal engagement.",
          ],
        },
        {
          id: "eng3b",
          headline: "Menuduh interaksinya palsu",
          points: [
            "Interaksi di akun kompetitor pasti dibeli dan tidak asli.",
            "Tuduhan disampaikan tanpa bukti pengamatan apa pun.",
            "Tidak menghasilkan pelajaran yang bisa dipakai {{brand}}.",
          ],
        },
        {
          id: "eng3c",
          headline: "Membahas jumlah produk yang dijual",
          points: [
            "Kompetitor menjual banyak jenis produk di tokonya.",
            "Yang dibahas adalah ragam produk, bukan interaksi pada konten.",
            "Baris terisi tetapi tidak menjawab pertanyaan pada template.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3.3 Identifikasi kekuatan dan kelemahan kompetitor                  */
/* ================================================================== */

const kekuatanKelemahan: ChoiceGroup = {
  id: "kuatlemah",
  label: "Kekuatan & Kelemahan",
  question: "Langkah 3 — kekuatan dan kelemahan konten {{kompetitor}}",
  hint: "Satu kartu berisi kekuatan sekaligus kelemahan, sesuai bentuk tabelnya pada template.",
  card: "dual",
  dualLabels: ["Kekuatan", "Kelemahan"],
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "kk1a",
          headline: "Identitas visual konsisten dan mudah dikenali",
          fields: {
            a: "Identitas visual konsisten dan mudah dikenali\n• Gaya visual yang seragam membuat unggahan mereka langsung dikenali meski muncul di beranda tanpa nama akun.\n• Jadwal unggah teratur sehingga akun selalu hadir di beranda pengikutnya.\n• Konten edukasi dan konten jualan diselang-seling, sehingga akun tidak terasa berjualan terus-menerus.\n• Panduan ukuran yang lengkap mengurangi keraguan calon pembeli sebelum bertransaksi.",
            b: "Terlalu banyak konten jualan, sedikit konten edukasi\n• Sebagian besar unggahan berisi penawaran produk sehingga audiens jenuh dan interaksinya menurun.\n• Pertanyaan dasar audiens seperti cara memilih ukuran jarang dijawab lewat konten.\n• Nada bicara terasa satu arah, lebih banyak mengumumkan daripada mengajak berbicara.\n• Celah ini bisa diisi {{brand}} dengan konten yang menjawab keraguan audiens sebelum membeli.",
          },
          points: [
            "Kekuatan: Identitas visual konsisten dan mudah dikenali",
            "Kelemahan: Terlalu banyak konten jualan, sedikit konten edukasi",
          ],
        },
        {
          id: "kk1b",
          headline: "Dekat dengan komunitas dan pemakai nyata",
          fields: {
            a: "Dekat dengan komunitas dan pemakai nyata\n• Rutin mengunggah ulang foto pembeli sehingga audiens merasa dilibatkan, bukan sekadar ditawari produk.\n• Aktif membalas komentar dan pertanyaan sehingga kolom komentar terasa hidup.\n• Kegiatan komunitas menghasilkan bahan konten tanpa biaya produksi besar.\n• Rekomendasi antaraudiens berjalan sendiri karena pemakainya merasa menjadi bagian dari brand.",
            b: "Kolom komentar jarang dibalas\n• Banyak pertanyaan audiens di kolom komentar dibiarkan tanpa jawaban.\n• Audiens yang tidak terjawab berpindah mencari informasi ke akun lain.\n• Interaksi berhenti di satu putaran karena percakapan tidak dilanjutkan brand.\n• Celah ini bisa diisi {{brand}} dengan membalas komentar secara cepat dan ramah.",
          },
          points: [
            "Kekuatan: Dekat dengan komunitas dan pemakai nyata",
            "Kelemahan: Kolom komentar jarang dibalas",
          ],
        },
        {
          id: "kk1c",
          headline: "Penjelasan produk terbuka dan mudah dipahami",
          fields: {
            a: "Penjelasan produk terbuka dan mudah dipahami\n• Jenis bahan dan cara perawatan dijelaskan dengan bahasa sederhana, bukan istilah teknis yang membingungkan.\n• Setiap klaim produk disertai penjelasan pendukung sehingga terasa dapat dipercaya.\n• Konten panduan banyak disimpan audiens, sehingga jangkauannya bertahan lama.\n• Keterbukaan ini menekan jumlah pertanyaan berulang dan mempercepat keputusan membeli.",
            b: "Konten terasa jauh dari keseharian audiens\n• Foto kampanye bergaya profesional mendominasi, sementara contoh pemakaian sehari-hari jarang muncul.\n• Model yang ditampilkan cenderung seragam sehingga audiens sulit membayangkan produk di tubuhnya sendiri.\n• Situasi yang ditampilkan lebih mirip pemotretan daripada kegiatan olahraga sungguhan.\n• Celah ini bisa diisi {{brand}} dengan menampilkan pemakai nyata dengan beragam bentuk tubuh.",
          },
          points: [
            "Kekuatan: Penjelasan produk terbuka dan mudah dipahami",
            "Kelemahan: Konten terasa jauh dari keseharian audiens",
          ],
        },
        {
          id: "kk1d",
          headline: "Format video pendek digarap dengan matang",
          fields: {
            a: "Format video pendek digarap dengan matang\n• Tiga detik pertama selalu langsung menampilkan produk atau gerakan sehingga penonton tidak cepat menggeser.\n• Durasi video dijaga tetap pendek sehingga banyak yang menonton sampai selesai.\n• Sampul video dibuat seragam sehingga grid tetap rapi meski isinya video.\n• Video yang sama dipakai ulang di kanal lain sehingga biaya produksi lebih hemat.",
            b: "Penjelasan bahan dan ukuran kurang lengkap\n• Klaim bahan disebut dengan istilah teknis tanpa penjelasan yang mudah dipahami audiens awam.\n• Panduan ukuran sulit ditemukan karena tidak disimpan di sorotan akun.\n• Pertanyaan tentang ukuran berulang terus di kolom komentar tiap unggahan produk.\n• Celah ini bisa diisi {{brand}} dengan panduan ukuran tetap yang mudah diakses.",
          },
          points: [
            "Kekuatan: Format video pendek digarap dengan matang",
            "Kelemahan: Penjelasan bahan dan ukuran kurang lengkap",
          ],
        },
        {
          id: "kk1e",
          headline: "Penawaran dikemas rapi tanpa merusak citra brand",
          fields: {
            a: "Penawaran dikemas rapi tanpa merusak citra brand\n• Promo disampaikan dengan tenggat waktu yang jelas sehingga mendorong keputusan cepat.\n• Unggahan promo tidak mendominasi grid, sehingga citra brand tidak turun menjadi sekadar toko diskon.\n• Paket pembelian beberapa potong menaikkan nilai belanja tanpa memangkas harga satuan terlalu dalam.\n• Alur dari konten menuju pembelian pendek karena tautan selalu tersedia dan mudah ditemukan.",
            b: "Jadwal unggah tidak teratur dan format kurang beragam\n• Jeda antarunggahan kadang panjang sehingga akun hilang dari beranda pengikutnya.\n• Format yang dipakai berulang pada bentuk yang sama sehingga terasa monoton.\n• Fitur Story dan sorotan kurang dimanfaatkan untuk menjaga interaksi harian.\n• Celah ini bisa diisi {{brand}} dengan jadwal tetap dan variasi format yang terencana.",
          },
          points: [
            "Kekuatan: Penawaran dikemas rapi tanpa merusak citra brand",
            "Kelemahan: Jadwal unggah tidak teratur dan format kurang beragam",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "kk2a",
          headline: "Kontennya bagus",
          fields: {
            a: "Kontennya bagus\n• Konten kompetitor terlihat bagus dan menarik.\n• Belum menjelaskan bagian mana yang membuatnya bagus.\n• Tidak bisa dijadikan pelajaran karena tidak ada hal khusus yang bisa ditiru.",
            b: "Kontennya kurang menarik\n• Konten kompetitor kurang menarik untuk dilihat.\n• Belum menjelaskan bagian mana yang membuatnya kurang menarik.\n• Belum bisa diubah menjadi peluang bagi {{brand}} pada langkah berikutnya.",
          },
          points: [
            "Kekuatan: Kontennya bagus",
            "Kelemahan: Kontennya kurang menarik",
          ],
        },
        {
          id: "kk2b",
          headline: "Followers-nya banyak",
          fields: {
            a: "Followers-nya banyak\n• Kompetitor memiliki pengikut yang jauh lebih banyak.\n• Jumlah pengikut adalah hasil, bukan kekuatan strategi kontennya.\n• Belum menjelaskan apa yang mereka lakukan sehingga pengikutnya bertambah.",
            b: "Jarang mengunggah\n• Kompetitor jarang mengunggah konten baru.\n• Satu kelemahan nyata sudah teridentifikasi.\n• Belum dilengkapi kelemahan lain sehingga celah yang tersedia belum terlihat utuh.",
          },
          points: [
            "Kekuatan: Followers-nya banyak",
            "Kelemahan: Jarang mengunggah",
          ],
        },
        {
          id: "kk2c",
          headline: "Rajin mengunggah",
          fields: {
            a: "Rajin mengunggah\n• Kompetitor rajin mengunggah konten setiap hari.\n• Keteraturan unggah memang salah satu kekuatan yang nyata.\n• Belum dilengkapi kekuatan lain sehingga gambarannya belum utuh.",
            b: "Harganya terlalu mahal\n• Produk kompetitor dijual dengan harga yang terlalu mahal.\n• Ini kelemahan pada sisi produk dan harga, bukan pada kontennya.\n• Template langkah 3 meminta kelemahan yang terlihat dari konten media sosialnya.",
          },
          points: [
            "Kekuatan: Rajin mengunggah",
            "Kelemahan: Harganya terlalu mahal",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "kk3a",
          headline: "Tidak punya kekuatan",
          fields: {
            a: "Tidak punya kekuatan\n• Kompetitor tidak punya kekuatan apa pun yang perlu dicatat.\n• Penilaian ini menutup kemungkinan belajar dari pesaing.\n• Instruksi langkah 3 untuk mengidentifikasi kekuatan tidak terpenuhi.",
            b: "Tidak punya kelemahan\n• Kompetitor tidak punya kelemahan sama sekali.\n• Menutup peluang yang seharusnya ditemukan pada langkah berikutnya.\n• Instruksi langkah 3 untuk mengidentifikasi kelemahan tidak terpenuhi.",
          },
          points: [
            "Kekuatan: Tidak punya kekuatan",
            "Kelemahan: Tidak punya kelemahan",
          ],
        },
        {
          id: "kk3b",
          headline: "Kekuatannya karena modalnya besar",
          fields: {
            a: "Kekuatannya karena modalnya besar\n• Kompetitor unggul semata-mata karena punya modal besar.\n• Tidak menjelaskan keputusan konten apa yang membuat mereka berhasil.\n• Tidak ada satu pun pelajaran yang bisa diterapkan {{brand}}.",
            b: "Menjelekkan kompetitor\n• Kompetitor payah dan tidak pantas dijadikan pembanding.\n• Bukan analisis, melainkan penilaian yang merendahkan.\n• Tidak menghasilkan celah yang bisa dimanfaatkan {{brand}}.",
          },
          points: [
            "Kekuatan: Kekuatannya karena modalnya besar",
            "Kelemahan: Menjelekkan kompetitor",
          ],
        },
        {
          id: "kk3c",
          headline: "Menyebut kekuatan produk, bukan konten",
          fields: {
            a: "Menyebut kekuatan produk, bukan konten\n• Kekuatan kompetitor adalah bahan produknya yang bagus.\n• Yang diminta adalah kekuatan pada konten media sosialnya.\n• Analisis produk tidak menjawab pertanyaan pada template riset konten.",
            b: "Tidak diamati karena akunnya besar\n• Kompetitor terlalu besar sehingga tidak perlu dicari kelemahannya.\n• Akun besar tetap memiliki celah, terutama pada kedekatan dengan audiens.\n• Baris wajib pada template dibiarkan tanpa hasil pengamatan.",
          },
          points: [
            "Kekuatan: Menyebut kekuatan produk, bukan konten",
            "Kelemahan: Tidak diamati karena akunnya besar",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3.4 Temukan peluang dan inspirasi                                   */
/* ================================================================== */

const peluangInspirasi: ChoiceGroup = {
  id: "peluanginspirasi",
  label: "Peluang & Inspirasi",
  question: "Langkah 4 — peluang dan ancaman yang bisa menjadi inspirasi bagi {{brand}}",
  hint: "Satu kartu berisi peluang sekaligus ancaman yang diubah menjadi inspirasi.",
  card: "dual",
  dualLabels: ["Peluang", "Ancaman menjadi Inspirasi"],
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pi1a",
          headline: "Menjadi akun yang paling jelas menjelaskan ukuran dan bahan",
          fields: {
            a: "Menjadi akun yang paling jelas menjelaskan ukuran dan bahan\n• Peluang: mengisi celah penjelasan ukuran dan bahan yang belum digarap kompetitor secara tuntas.\n• Bentuk konten: carousel panduan ukuran tetap yang disimpan di sorotan akun dan diperbarui tiap koleksi baru.\n• Dampak yang diharapkan: keraguan calon pembeli berkurang sehingga jarak dari melihat konten ke membeli menjadi lebih pendek.\n• Ukuran keberhasilan: jumlah simpanan unggahan naik dan pertanyaan ukuran di kolom komentar berkurang.",
            b: "Konsistensi visual mereka jadi acuan panduan gaya {{brand}}\n• Ancaman: identitas visual kompetitor yang konsisten membuat akun mereka lebih mudah dikenali daripada {{brand}}.\n• Inspirasi: menyusun panduan gaya sederhana berisi tiga warna utama, satu jenis huruf, dan pola tata letak tetap.\n• Penerapan: seluruh unggahan {{brand}} mengikuti panduan tersebut agar grid terbaca sebagai satu kesatuan.\n• Pembeda yang dijaga: warna dan nada bicara {{brand}} tetap dibuat berbeda agar tidak terlihat meniru.",
          },
          points: [
            "Peluang: Menjadi akun yang paling jelas menjelaskan ukuran dan bahan",
            "Ancaman menjadi Inspirasi: Konsistensi visual mereka jadi acuan panduan gaya {{brand}}",
          ],
        },
        {
          id: "pi1b",
          headline: "Membangun kedekatan lewat balasan komentar dan pesan",
          fields: {
            a: "Membangun kedekatan lewat balasan komentar dan pesan\n• Peluang: memanfaatkan kebiasaan kompetitor yang jarang membalas komentar audiens.\n• Bentuk konten: menjawab komentar dalam bentuk video pendek dan mengangkat pertanyaan audiens menjadi bahan unggahan.\n• Dampak yang diharapkan: kolom komentar {{brand}} terasa hidup sehingga unggahan bertahan lebih lama di beranda.\n• Ukuran keberhasilan: jumlah komentar dan pesan langsung per unggahan meningkat.",
            b: "Kedekatan mereka dengan komunitas jadi acuan program komunitas {{brand}}\n• Ancaman: kompetitor sudah lebih dulu dekat dengan komunitas olahraga sehingga rekomendasi mengalir sendiri.\n• Inspirasi: menjalankan program lari bersama berkala dan mengunggah ulang foto peserta.\n• Penerapan: menjadikan kegiatan komunitas sebagai sumber bahan konten mingguan yang murah diproduksi.\n• Pembeda yang dijaga: {{brand}} menyasar komunitas pemula yang belum banyak digarap kompetitor.",
          },
          points: [
            "Peluang: Membangun kedekatan lewat balasan komentar dan pesan",
            "Ancaman menjadi Inspirasi: Kedekatan mereka dengan komunitas jadi acuan program komunitas {{brand}}",
          ],
        },
        {
          id: "pi1c",
          headline: "Menampilkan pemakai nyata dengan beragam bentuk tubuh",
          fields: {
            a: "Menampilkan pemakai nyata dengan beragam bentuk tubuh\n• Peluang: mengisi celah konten kompetitor yang masih didominasi foto kampanye bergaya profesional.\n• Bentuk konten: unggahan ulang foto pembeli dan kolaborasi dengan pegiat komunitas yang bukan model profesional.\n• Dampak yang diharapkan: audiens lebih mudah membayangkan produk di tubuhnya sendiri.\n• Ukuran keberhasilan: bertambahnya foto pemakaian yang dikirim audiens tanpa diminta.",
            b: "Video pendek mereka jadi acuan format konten {{brand}}\n• Ancaman: kompetitor sudah mahir menggarap video pendek sehingga menguasai beranda audiens.\n• Inspirasi: mengadopsi pola pembuka tiga detik yang langsung menampilkan produk atau gerakan.\n• Penerapan: menyiapkan tiga pola video tetap yang bisa diproduksi berulang oleh tim kecil.\n• Pembeda yang dijaga: isi video {{brand}} difokuskan pada keluhan gerah di cuaca panas, sudut yang belum digarap kompetitor.",
          },
          points: [
            "Peluang: Menampilkan pemakai nyata dengan beragam bentuk tubuh",
            "Ancaman menjadi Inspirasi: Video pendek mereka jadi acuan format konten {{brand}}",
          ],
        },
        {
          id: "pi1d",
          headline: "Mengangkat keunggulan bahan breathable untuk iklim tropis",
          fields: {
            a: "Mengangkat keunggulan bahan breathable untuk iklim tropis\n• Peluang: kompetitor menyebut istilah bahan secara umum, belum mengaitkannya dengan cuaca panas dan lembap di Indonesia.\n• Bentuk konten: uji sederhana yang memperlihatkan perbedaan rasa gerah saat berolahraga di siang hari.\n• Dampak yang diharapkan: keunggulan {{brand}} tersambung langsung dengan keluhan nyata audiens.\n• Ukuran keberhasilan: bertambahnya komentar yang menceritakan pengalaman gerah saat berolahraga.",
            b: "Kelengkapan panduan produk mereka jadi acuan konten edukasi {{brand}}\n• Ancaman: panduan produk kompetitor membuat calon pembeli lebih percaya kepada mereka.\n• Inspirasi: membuat sorotan tetap berisi panduan ukuran, jenis bahan, dan cara perawatan.\n• Penerapan: memperbarui sorotan tersebut setiap kali koleksi baru dirilis.\n• Pembeda yang dijaga: {{brand}} menulis panduannya dengan bahasa sehari-hari tanpa istilah teknis.",
          },
          points: [
            "Peluang: Mengangkat keunggulan bahan breathable untuk iklim tropis",
            "Ancaman menjadi Inspirasi: Kelengkapan panduan produk mereka jadi acuan konten edukasi {{brand}}",
          ],
        },
        {
          id: "pi1e",
          headline: "Menjaga jadwal unggah tetap dan format yang beragam",
          fields: {
            a: "Menjaga jadwal unggah tetap dan format yang beragam\n• Peluang: memanfaatkan jadwal unggah kompetitor yang belum teratur.\n• Bentuk konten: kalender konten mingguan yang memadukan Reels, carousel edukasi, dan Story interaktif.\n• Dampak yang diharapkan: {{brand}} lebih sering hadir di beranda audiens tanpa menambah biaya produksi besar.\n• Ukuran keberhasilan: jangkauan mingguan tumbuh stabil dan interaksi tidak lagi naik turun tajam.",
            b: "Pengelolaan promo mereka jadi acuan kalender penawaran {{brand}}\n• Ancaman: promo kompetitor yang tertata membuat audiens menunggu penawaran mereka setiap bulan.\n• Inspirasi: menyusun kalender penawaran {{brand}} dengan tenggat yang jelas dan diumumkan jauh hari.\n• Penerapan: menjaga porsi unggahan promo agar tidak mendominasi grid dan menurunkan citra brand.\n• Pembeda yang dijaga: penawaran {{brand}} berbentuk paket padu padan, bukan potongan harga besar-besaran.",
          },
          points: [
            "Peluang: Menjaga jadwal unggah tetap dan format yang beragam",
            "Ancaman menjadi Inspirasi: Pengelolaan promo mereka jadi acuan kalender penawaran {{brand}}",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pi2a",
          headline: "Membuat konten lebih bagus",
          fields: {
            a: "Membuat konten lebih bagus\n• Peluangnya adalah membuat konten yang lebih bagus dari kompetitor.\n• Arahnya benar, tetapi belum menyebut bentuk konten yang akan dibuat.\n• Belum jelas celah kompetitor mana yang sedang dimanfaatkan.",
            b: "Belajar dari kompetitor\n• {{brand}} sebaiknya belajar dari kompetitor.\n• Arahnya sudah benar, tetapi belum menyebut apa yang dipelajari.\n• Belum ada bentuk penerapan yang bisa langsung dikerjakan tim konten.",
          },
          points: [
            "Peluang: Membuat konten lebih bagus",
            "Ancaman menjadi Inspirasi: Belajar dari kompetitor",
          ],
        },
        {
          id: "pi2b",
          headline: "Lebih sering mengunggah",
          fields: {
            a: "Lebih sering mengunggah\n• Peluangnya adalah mengunggah konten lebih sering dibanding kompetitor.\n• Sudah memanfaatkan satu celah yang nyata.\n• Belum menjelaskan isi kontennya, sehingga menambah frekuensi saja belum tentu menaikkan interaksi.",
            b: "Ancaman disebut, inspirasinya belum\n• Ancamannya adalah kompetitor punya pengikut jauh lebih banyak.\n• Ancaman sudah teridentifikasi dengan jelas.\n• Belum diubah menjadi pelajaran maupun langkah yang bisa diterapkan {{brand}}.",
          },
          points: [
            "Peluang: Lebih sering mengunggah",
            "Ancaman menjadi Inspirasi: Ancaman disebut, inspirasinya belum",
          ],
        },
        {
          id: "pi2c",
          headline: "Memakai jasa influencer",
          fields: {
            a: "Memakai jasa influencer\n• Peluangnya adalah bekerja sama dengan influencer.\n• Bentuk kegiatannya sudah disebut.\n• Belum dikaitkan dengan kelemahan kompetitor maupun kebutuhan audiens yang sudah dipetakan.",
            b: "Meniru gaya visual kompetitor\n• {{brand}} sebaiknya memakai gaya visual yang sama dengan kompetitor.\n• Mengambil pelajaran dari konsistensi visual memang tepat.\n• Menyamakan gaya justru menghapus pembeda {{brand}} di mata audiens.",
          },
          points: [
            "Peluang: Memakai jasa influencer",
            "Ancaman menjadi Inspirasi: Meniru gaya visual kompetitor",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pi3a",
          headline: "Meniru seluruh konten kompetitor",
          fields: {
            a: "Meniru seluruh konten kompetitor\n• Peluangnya adalah meniru persis seluruh konten kompetitor.\n• Meniru bulat-bulat menghapus pembeda {{brand}} di mata audiens.\n• Riset kompetitor bertujuan menemukan celah, bukan menyalin.",
            b: "Tidak ada ancaman\n• Kompetitor tidak menjadi ancaman bagi {{brand}} sama sekali.\n• Kekuatan kompetitor yang sudah dicatat di langkah 3 diabaikan begitu saja.\n• Instruksi langkah 4 tidak terpenuhi.",
          },
          points: [
            "Peluang: Meniru seluruh konten kompetitor",
            "Ancaman menjadi Inspirasi: Tidak ada ancaman",
          ],
        },
        {
          id: "pi3b",
          headline: "Menjatuhkan kompetitor lewat konten",
          fields: {
            a: "Menjatuhkan kompetitor lewat konten\n• Peluangnya adalah membuat konten yang menjelekkan kompetitor.\n• Berisiko merusak citra {{brand}} di mata audiens.\n• Tidak menjawab kebutuhan audiens yang sudah dipetakan pada profil audiens.",
            b: "Menyerah pada kompetitor\n• Kompetitor terlalu kuat sehingga {{brand}} sebaiknya tidak bersaing di Instagram.\n• Bertentangan dengan tujuan tugas, yaitu menyusun strategi konten Instagram ke depan.\n• Seluruh hasil riset audiens dan kompetitor menjadi tidak terpakai.",
          },
          points: [
            "Peluang: Menjatuhkan kompetitor lewat konten",
            "Ancaman menjadi Inspirasi: Menyerah pada kompetitor",
          ],
        },
        {
          id: "pi3c",
          headline: "Tidak ada peluang",
          fields: {
            a: "Tidak ada peluang\n• Tidak ada peluang yang bisa diambil karena kompetitor sudah unggul.\n• Menutup seluruh hasil riset yang sudah dikerjakan pada langkah sebelumnya.\n• Instruksi langkah 4 untuk menemukan peluang tidak terpenuhi.",
            b: "Melaporkan akun kompetitor\n• {{brand}} sebaiknya melaporkan akun kompetitor agar tidak bisa mengunggah konten.\n• Bukan langkah strategi konten dan berpotensi merugikan brand sendiri.\n• Tidak menghasilkan inspirasi apa pun bagi konten {{brand}}.",
          },
          points: [
            "Peluang: Tidak ada peluang",
            "Ancaman menjadi Inspirasi: Melaporkan akun kompetitor",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */

export const tpm1Groups: ChoiceGroup[] = [
  geographic,
  sociographic,
  demographic,
  behavioral,
  psychographic,
  profilAudiens,
  kompetitorUtama,
  elemenVisual,
  pesanUtama,
  ctaGroup,
  promoGroup,
  engagementGroup,
  kekuatanKelemahan,
  peluangInspirasi,
];

export const bankTpm1 = {
  geographic,
  sociographic,
  demographic,
  behavioral,
  psychographic,
  profilAudiens,
  kompetitorUtama,
  elemenVisual,
  pesanUtama,
  ctaGroup,
  promoGroup,
  engagementGroup,
  kekuatanKelemahan,
  peluangInspirasi,
};
