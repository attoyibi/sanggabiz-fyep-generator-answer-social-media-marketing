import type { ChoiceGroup } from "../types";

/**
 * BANK JAWABAN TPM 2 — Content Calendar dan Content Plan brand "FitActive".
 *
 * Setiap grade punya banyak varian. Satu varian diambil acak per peserta
 * (berdasarkan seed), jadi dua peserta yang sama-sama memilih kartu "tepat"
 * tetap menghasilkan isi berkas yang berbeda.
 *
 * Semua varian — termasuk yang sengaja salah — ditulis lengkap. Jawaban yang
 * keliru harus keliru pada isinya, bukan pada kekosongannya.
 *
 * Token yang tersedia: {{nama}}, {{brand}}, {{objective}}, {{pilar1}}..{{pilar4}},
 * {{jam1}}..{{jam3}}, {{pic}}, {{status}}.
 */

/* ================================================================== */
/* 1. MARKETING OBJECTIVE                                              */
/* ================================================================== */

const objective: ChoiceGroup = {
  id: "objective",
  label: "Objective",
  question: "Marketing objective utama konten {{brand}} pekan ini",
  hint: "Objective menentukan apa yang dikejar konten sepekan, bukan sekadar jenis kontennya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "ob1a",
          headline: "Awareness — memperkenalkan {{brand}} ke audiens baru",
          fields: {
            nama: "Awareness",
            isi: "Memperkenalkan {{brand}} kepada audiens yang belum mengenal brand, dengan ukuran keberhasilan berupa jangkauan dan jumlah akun baru yang melihat konten.",
          },
          points: [
            "Objective: Awareness, memperkenalkan brand ke audiens yang belum mengenalnya.",
            "Alasan: studi kasus menyebut pertumbuhan followers stagnan, jadi jangkauan perlu dinaikkan lebih dulu.",
            "Ukuran keberhasilan: jangkauan mingguan dan jumlah akun baru yang menonton.",
            "Bentuk konten yang didahulukan: video pendek yang mudah dibagikan.",
          ],
        },
        {
          id: "ob1b",
          headline: "Engagement — menaikkan interaksi pada tiap unggahan",
          fields: {
            nama: "Engagement",
            isi: "Menaikkan interaksi pada tiap unggahan, dengan ukuran keberhasilan berupa jumlah komentar, simpanan, dan bagikan ulang per konten.",
          },
          points: [
            "Objective: Engagement, menaikkan interaksi pada tiap unggahan.",
            "Alasan: studi kasus menyebut engagement stagnan meski jadwal unggah sudah berjalan.",
            "Ukuran keberhasilan: jumlah komentar, simpanan, dan bagikan ulang per konten.",
            "Bentuk konten yang didahulukan: konten yang mengundang audiens menjawab atau menyimpan.",
          ],
        },
        {
          id: "ob1c",
          headline: "Awareness dan Engagement — jangkauan dulu, interaksi menyusul",
          fields: {
            nama: "Awareness dan Engagement",
            isi: "Mengejar jangkauan pada awal pekan lalu mengubahnya menjadi interaksi pada akhir pekan, dengan ukuran keberhasilan berupa jangkauan mingguan sekaligus rasio interaksi per akun terjangkau.",
          },
          points: [
            "Objective: Awareness pada awal pekan, dilanjutkan Engagement pada akhir pekan.",
            "Alasan: dua masalah pada studi kasus, yaitu followers dan engagement, ditangani berurutan.",
            "Ukuran keberhasilan: jangkauan mingguan dan rasio interaksi per akun terjangkau.",
            "Bentuk konten yang didahulukan: video pendek di awal pekan, konten tanya jawab di akhir pekan.",
          ],
        },
        {
          id: "ob1d",
          headline: "Engagement lewat konten edukasi yang layak disimpan",
          fields: {
            nama: "Engagement",
            isi: "Menaikkan interaksi melalui konten edukasi yang layak disimpan audiens, dengan ukuran keberhasilan berupa jumlah simpanan dan bagikan ulang.",
          },
          points: [
            "Objective: Engagement, dengan simpanan sebagai interaksi yang paling dikejar.",
            "Alasan: konten yang disimpan terus menjangkau audiens baru berhari-hari setelah diunggah.",
            "Ukuran keberhasilan: jumlah simpanan per konten dan pertumbuhan jangkauan susulan.",
            "Bentuk konten yang didahulukan: carousel panduan dan penjelasan bahan.",
          ],
        },
        {
          id: "ob1e",
          headline: "Awareness lewat konten yang mudah dibagikan ulang",
          fields: {
            nama: "Awareness",
            isi: "Memperluas jangkauan lewat konten yang mudah dibagikan ulang audiens, dengan ukuran keberhasilan berupa jumlah bagikan ulang dan jangkauan di luar pengikut.",
          },
          points: [
            "Objective: Awareness, memperluas jangkauan di luar pengikut yang sudah ada.",
            "Alasan: jangkauan organik paling murah datang dari audiens yang membagikan ulang.",
            "Ukuran keberhasilan: jumlah bagikan ulang dan porsi jangkauan dari non-pengikut.",
            "Bentuk konten yang didahulukan: konten relatable seputar keluhan berolahraga di cuaca panas.",
          ],
        },
        {
          id: "ob1f",
          headline: "Consideration — membuat audiens menimbang produk {{brand}}",
          fields: {
            nama: "Consideration",
            isi: "Membuat audiens yang sudah mengenal {{brand}} mulai menimbang produknya, dengan ukuran keberhasilan berupa klik tautan di bio dan pertanyaan yang masuk lewat pesan langsung.",
          },
          points: [
            "Objective: Consideration, mendorong audiens menimbang produk sebelum membeli.",
            "Alasan: jangkauan sudah tumbuh, yang belum terjadi adalah perpindahan ke tahap pertimbangan.",
            "Ukuran keberhasilan: klik tautan di bio dan jumlah pertanyaan lewat pesan langsung.",
            "Bentuk konten yang didahulukan: perbandingan bahan dan panduan memilih ukuran.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "ob2a",
          headline: "Menaikkan followers",
          fields: {
            nama: "Menaikkan followers",
            isi: "Menambah jumlah followers akun {{brand}} sebanyak-banyaknya dalam sepekan.",
          },
          points: [
            "Objective sudah mengarah pada pertumbuhan akun.",
            "Jumlah followers adalah hasil, bukan tujuan konten yang bisa dikejar langsung.",
            "Belum ada ukuran keberhasilan selain angka pengikut.",
          ],
        },
        {
          id: "ob2b",
          headline: "Membuat konten yang bagus",
          fields: {
            nama: "Konten berkualitas",
            isi: "Menghasilkan konten yang bagus dan enak dilihat sepanjang pekan.",
          },
          points: [
            "Mutu konten memang penting untuk dijaga.",
            "Namun ini standar pengerjaan, bukan objective yang bisa diukur.",
            "Tidak menjelaskan apa yang ingin dicapai dari sisi audiens.",
          ],
        },
        {
          id: "ob2c",
          headline: "Awareness tanpa ukuran keberhasilan",
          fields: {
            nama: "Awareness",
            isi: "Meningkatkan awareness brand di Instagram dan TikTok.",
          },
          points: [
            "Objective yang dipilih sudah tepat untuk masalah pada studi kasus.",
            "Belum disebut ukuran keberhasilannya, sehingga hasil pekan ini tidak bisa dinilai.",
            "Belum dijelaskan bentuk konten apa yang didahulukan untuk mencapainya.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "ob3a",
          headline: "Menjual sebanyak-banyaknya minggu ini",
          fields: {
            nama: "Penjualan langsung",
            isi: "Mengejar penjualan sebanyak-banyaknya dalam sepekan lewat konten promo setiap hari.",
          },
          points: [
            "Objective penjualan langsung tidak menjawab masalah jangkauan dan interaksi pada studi kasus.",
            "Konten promo setiap hari justru menurunkan interaksi karena audiens jenuh.",
            "Tidak ada tahap pengenalan sebelum audiens diminta membeli.",
          ],
        },
        {
          id: "ob3b",
          headline: "Mengikuti apa pun yang sedang viral",
          fields: {
            nama: "Mengikuti tren viral",
            isi: "Membuat konten mengikuti apa pun yang sedang viral pekan itu, tanpa kaitan dengan produk.",
          },
          points: [
            "Tidak ada tujuan yang dikejar selain ikut ramai sesaat.",
            "Konten yang tidak berkaitan dengan produk mendatangkan audiens yang salah.",
            "Hasilnya tidak bisa diukur maupun diulang pada pekan berikutnya.",
          ],
        },
        {
          id: "ob3c",
          headline: "Mengalahkan akun kompetitor",
          fields: {
            nama: "Mengungguli kompetitor",
            isi: "Membuat jumlah pengikut dan interaksi {{brand}} melampaui akun kompetitor dalam sepekan.",
          },
          points: [
            "Objective diarahkan ke akun lain, bukan ke audiens {{brand}} sendiri.",
            "Angka akun kompetitor berada di luar kendali tim konten.",
            "Tidak menghasilkan arahan konten yang bisa dikerjakan sehari-hari.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 2. CONTENT PILLAR                                                   */
/* ================================================================== */

const pilar: ChoiceGroup = {
  id: "pilar",
  label: "Content Pillar",
  question: "Susunan content pillar {{brand}}",
  hint: "Content pillar adalah kelompok tema konten yang dipakai berulang supaya isinya tidak monoton.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pl1a",
          headline: "Edukasi · Inspirasi · Produk · Komunitas",
          fields: {
            p1: "Edukasi",
            p2: "Inspirasi",
            p3: "Produk",
            p4: "Komunitas",
            isi: "Edukasi menjelaskan bahan dan cara memilih ukuran; Inspirasi menampilkan rutinitas olahraga yang bisa ditiru; Produk menyorot koleksi dan keunggulannya; Komunitas mengangkat pemakai nyata dan kegiatan bersama.",
          },
          points: [
            "Edukasi: penjelasan bahan, panduan ukuran, dan cara merawat produk.",
            "Inspirasi: rutinitas olahraga sederhana yang bisa langsung ditiru audiens.",
            "Produk: koleksi dan keunggulan bahan breathable {{brand}}.",
            "Komunitas: pemakai nyata, unggahan ulang, dan kegiatan latihan bersama.",
          ],
        },
        {
          id: "pl1b",
          headline: "Edukasi · Produk · Testimoni · Hiburan",
          fields: {
            p1: "Edukasi",
            p2: "Produk",
            p3: "Testimoni",
            p4: "Hiburan",
            isi: "Edukasi menjawab pertanyaan yang sering muncul; Produk memperkenalkan koleksi; Testimoni menampilkan pengalaman pembeli; Hiburan menjaga akun tetap ringan lewat konten relatable.",
          },
          points: [
            "Edukasi: menjawab pertanyaan yang paling sering muncul di kolom komentar.",
            "Produk: memperkenalkan koleksi beserta bahan dan pilihan ukurannya.",
            "Testimoni: pengalaman pembeli setelah beberapa minggu pemakaian.",
            "Hiburan: konten relatable seputar keluhan berolahraga di cuaca panas.",
          ],
        },
        {
          id: "pl1c",
          headline: "Tips Latihan · Kenali Bahan · Cerita Pengguna · Promo",
          fields: {
            p1: "Tips Latihan",
            p2: "Kenali Bahan",
            p3: "Cerita Pengguna",
            p4: "Promo",
            isi: "Tips Latihan memberi panduan olahraga singkat; Kenali Bahan membedah material produk; Cerita Pengguna mengangkat pengalaman pembeli; Promo memuat penawaran dengan porsi paling kecil.",
          },
          points: [
            "Tips Latihan: panduan olahraga singkat yang bisa dilakukan di rumah atau kantor.",
            "Kenali Bahan: membedah material breathable dengan bahasa sehari-hari.",
            "Cerita Pengguna: pengalaman pembeli beserta foto pemakaian nyata.",
            "Promo: penawaran dengan porsi paling kecil supaya akun tidak terasa berjualan terus.",
          ],
        },
        {
          id: "pl1d",
          headline: "Awareness · Edukasi · Konversi · Retensi",
          fields: {
            p1: "Awareness",
            p2: "Edukasi",
            p3: "Konversi",
            p4: "Retensi",
            isi: "Awareness menjangkau audiens baru; Edukasi membangun kepercayaan; Konversi mengarahkan ke pembelian; Retensi menjaga pembeli lama tetap terhubung.",
          },
          points: [
            "Awareness: konten ringan yang mudah dibagikan untuk menjangkau audiens baru.",
            "Edukasi: penjelasan bahan dan ukuran untuk membangun kepercayaan.",
            "Konversi: panduan memilih produk beserta ajakan berbelanja.",
            "Retensi: tips perawatan produk agar pembeli lama tetap terhubung.",
          ],
        },
        {
          id: "pl1e",
          headline: "Behind the Scene · Edukasi · Produk · Kolaborasi",
          fields: {
            p1: "Behind the Scene",
            p2: "Edukasi",
            p3: "Produk",
            p4: "Kolaborasi",
            isi: "Behind the Scene menampilkan proses pembuatan di dalam negeri; Edukasi membahas pemilihan bahan; Produk menyorot koleksi; Kolaborasi menggandeng kreator dan komunitas olahraga.",
          },
          points: [
            "Behind the Scene: proses pembuatan produk di dalam negeri.",
            "Edukasi: cara memilih bahan yang cocok untuk cuaca panas dan lembap.",
            "Produk: koleksi terbaru beserta pilihan warna dan ukuran.",
            "Kolaborasi: konten bersama kreator dan komunitas olahraga kota.",
          ],
        },
        {
          id: "pl1f",
          headline: "Masalah Kulit Latihan · Solusi Produk · Rutinitas · Komunitas",
          fields: {
            p1: "Masalah Latihan",
            p2: "Solusi Produk",
            p3: "Rutinitas",
            p4: "Komunitas",
            isi: "Masalah Latihan mengangkat keluhan nyata audiens; Solusi Produk menghubungkannya dengan keunggulan {{brand}}; Rutinitas menampilkan latihan harian; Komunitas mengangkat kegiatan bersama.",
          },
          points: [
            "Masalah Latihan: keluhan nyata seperti gerah, lecet, dan pakaian melar.",
            "Solusi Produk: menghubungkan keluhan itu dengan bahan breathable {{brand}}.",
            "Rutinitas: latihan harian yang realistis bagi pekerja kota.",
            "Komunitas: kegiatan lari bersama dan unggahan ulang foto peserta.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pl2a",
          headline: "Produk · Promo",
          fields: {
            p1: "Produk",
            p2: "Promo",
            p3: "Produk",
            p4: "Promo",
            isi: "Konten dibagi menjadi konten produk dan konten promo yang dipakai berselang-seling.",
          },
          points: [
            "Sudah ada pembagian tema yang dipakai berulang.",
            "Hanya dua pilar dan keduanya berjualan, sehingga akun terasa promosi terus-menerus.",
            "Tidak ada pilar edukasi maupun komunitas yang membangun kepercayaan.",
          ],
        },
        {
          id: "pl2b",
          headline: "Edukasi · Hiburan · Produk (tanpa keterangan)",
          fields: {
            p1: "Edukasi",
            p2: "Hiburan",
            p3: "Produk",
            p4: "Lain-lain",
            isi: "Pilar konten terdiri dari edukasi, hiburan, produk, dan lain-lain.",
          },
          points: [
            "Tiga pilar pertama sudah wajar untuk brand pakaian olahraga.",
            "Pilar keempat berupa lain-lain membuat isinya tidak terarah.",
            "Tidak dijelaskan apa isi tiap pilar, sehingga tim sulit menurunkannya jadi ide konten.",
          ],
        },
        {
          id: "pl2c",
          headline: "Foto · Video · Carousel · Story",
          fields: {
            p1: "Foto",
            p2: "Video",
            p3: "Carousel",
            p4: "Story",
            isi: "Pilar konten dibagi berdasarkan bentuk unggahannya: foto, video, carousel, dan Story.",
          },
          points: [
            "Pembagiannya konsisten dan mudah dijalankan tim.",
            "Namun yang dibagi adalah format, bukan tema seperti yang dimaksud content pillar.",
            "Isi pesannya tetap bisa monoton meski formatnya berganti-ganti.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pl3a",
          headline: "Semua pilar berisi jualan",
          fields: {
            p1: "Jualan produk",
            p2: "Jualan promo",
            p3: "Jualan bundling",
            p4: "Jualan stok terbatas",
            isi: "Keempat pilar sama-sama berisi ajakan membeli dengan sudut pandang yang berbeda-beda.",
          },
          points: [
            "Keempat pilar mengarah ke penjualan, sehingga tidak ada variasi tema sama sekali.",
            "Bertentangan dengan masalah pada studi kasus, yaitu kurangnya variasi jenis konten.",
            "Audiens jenuh dan interaksi justru menurun.",
          ],
        },
        {
          id: "pl3b",
          headline: "Pilar mengikuti suasana hati tim",
          fields: {
            p1: "Konten bebas",
            p2: "Konten dadakan",
            p3: "Konten titipan",
            p4: "Konten sisa",
            isi: "Tema konten ditentukan setiap hari mengikuti ide yang muncul saat itu.",
          },
          points: [
            "Tidak ada pilar tetap yang bisa dipakai berulang.",
            "Menghapus manfaat utama content pillar, yaitu menjaga konsistensi tema.",
            "Masalah jadwal unggah yang tidak konsisten justru berulang.",
          ],
        },
        {
          id: "pl3c",
          headline: "Pilar diambil dari brand lain apa adanya",
          fields: {
            p1: "Sepak bola",
            p2: "Basket",
            p3: "Sepatu lari",
            p4: "Suplemen",
            isi: "Pilar konten disalin dari akun brand perlengkapan olahraga lain tanpa disesuaikan.",
          },
          points: [
            "Tema yang dipilih tidak berhubungan dengan koleksi pakaian olahraga {{brand}}.",
            "Menyalin pilar brand lain menghapus pembeda {{brand}} di mata audiens.",
            "Audiens yang datang mencari topik yang tidak dijual {{brand}}.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3. JADWAL UNGGAH — jam tayang tiap hari selama sepekan             */
/* ================================================================== */

const jadwal: ChoiceGroup = {
  id: "jadwal",
  label: "Jam Unggah",
  question: "Pola hari dan jam unggah selama 1 minggu (1-7 September 2025)",
  hint: "Studi kasus menyebut jadwal posting yang tidak konsisten, jadi polanya harus tetap dan bisa diulang.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "jd1a",
          headline: "Dua jam tetap: pagi sebelum berangkat dan malam setelah pulang",
          fields: {
            sen: "06.30", sel: "19.30", rab: "06.30", kam: "19.30",
            jum: "06.30", sab: "09.00", min: "19.30",
            isi: "Unggahan dijadwalkan pada dua jam tetap, yaitu 06.30 sebelum audiens berangkat dan 19.30 setelah mereka pulang kerja. Akhir pekan digeser ke 09.00 karena audiens bangun lebih siang.",
          },
          points: [
            "Hari kerja: 06.30 dan 19.30 berselang-seling, mengikuti jam audiens membuka ponsel.",
            "Sabtu digeser ke 09.00 karena audiens bangun lebih siang di akhir pekan.",
            "Minggu kembali ke 19.30 untuk menyiapkan pekan berikutnya.",
            "Polanya tetap sehingga mudah diulang pada pekan-pekan berikutnya.",
          ],
        },
        {
          id: "jd1b",
          headline: "Fokus jam malam, satu unggahan per hari",
          fields: {
            sen: "19.00", sel: "19.00", rab: "20.00", kam: "19.00",
            jum: "20.00", sab: "10.00", min: "17.00",
            isi: "Satu unggahan per hari pada rentang 19.00-20.00 saat audiens paling banyak membuka media sosial, dengan penyesuaian di akhir pekan.",
          },
          points: [
            "Hari kerja dipusatkan pada 19.00-20.00, jam beranda paling ramai.",
            "Sabtu pukul 10.00 menyasar audiens yang berolahraga pagi.",
            "Minggu pukul 17.00 menjelang audiens bersiap untuk pekan baru.",
            "Satu unggahan per hari menjaga mutu konten tetap terkendali.",
          ],
        },
        {
          id: "jd1c",
          headline: "Pagi untuk edukasi, malam untuk konten ringan",
          fields: {
            sen: "07.00", sel: "20.00", rab: "07.00", kam: "20.00",
            jum: "07.00", sab: "08.30", min: "20.00",
            isi: "Jam pagi dipakai untuk konten edukasi yang butuh perhatian penuh, jam malam untuk konten ringan yang mudah ditonton sambil bersantai.",
          },
          points: [
            "Pukul 07.00 untuk konten edukasi, saat audiens masih fokus.",
            "Pukul 20.00 untuk konten ringan yang ditonton sambil bersantai.",
            "Sabtu pukul 08.30 mengikuti jam olahraga pagi audiens.",
            "Pembagian jam ini membuat jenis konten dan waktunya saling mendukung.",
          ],
        },
        {
          id: "jd1d",
          headline: "Lima hari kerja padat, akhir pekan lebih santai",
          fields: {
            sen: "18.30", sel: "18.30", rab: "18.30", kam: "18.30",
            jum: "18.30", sab: "11.00", min: "16.00",
            isi: "Hari kerja memakai satu jam yang sama, yaitu 18.30 saat audiens dalam perjalanan pulang, sementara akhir pekan digeser ke siang hari.",
          },
          points: [
            "Hari kerja seragam pada 18.30, saat audiens dalam perjalanan pulang.",
            "Jam yang sama tiap hari kerja membuat audiens hafal kapan konten baru muncul.",
            "Sabtu pukul 11.00 dan Minggu pukul 16.00 menyesuaikan ritme akhir pekan.",
            "Pola paling sederhana untuk tim kecil yang baru membangun kebiasaan unggah.",
          ],
        },
        {
          id: "jd1e",
          headline: "Tiga jam utama mengikuti jam istirahat audiens",
          fields: {
            sen: "12.00", sel: "19.30", rab: "12.00", kam: "19.30",
            jum: "12.00", sab: "09.30", min: "19.30",
            isi: "Unggahan dipusatkan pada jam istirahat siang dan jam santai malam, dua momen audiens paling lama membuka ponsel di hari kerja.",
          },
          points: [
            "Pukul 12.00 menyasar jam istirahat siang audiens kantoran.",
            "Pukul 19.30 menyasar jam santai setelah pulang kerja.",
            "Sabtu pukul 09.30 mengikuti jam olahraga pagi.",
            "Dua jam utama ini bergantian sehingga audiens tidak merasa dibanjiri.",
          ],
        },
        {
          id: "jd1f",
          headline: "Awal pekan lebih rapat, akhir pekan melambat",
          fields: {
            sen: "07.30", sel: "07.30", rab: "19.00", kam: "19.00",
            jum: "19.00", sab: "10.30", min: "18.00",
            isi: "Awal pekan memakai jam pagi saat audiens menyusun rencana olahraga, lalu bergeser ke jam malam menjelang akhir pekan ketika audiens lebih santai.",
          },
          points: [
            "Senin dan Selasa pukul 07.30, saat audiens menyusun rencana pekan.",
            "Rabu sampai Jumat bergeser ke 19.00 mengikuti kelelahan audiens di tengah pekan.",
            "Sabtu pukul 10.30 dan Minggu pukul 18.00 untuk ritme akhir pekan.",
            "Pergeseran jam ini tetap berpola sehingga mudah diulang.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "jd2a",
          headline: "Jam sama setiap hari tanpa penyesuaian akhir pekan",
          fields: {
            sen: "12.00", sel: "12.00", rab: "12.00", kam: "12.00",
            jum: "12.00", sab: "12.00", min: "12.00",
            isi: "Semua unggahan dijadwalkan pukul 12.00 setiap hari sepanjang pekan.",
          },
          points: [
            "Jadwalnya konsisten dan mudah dijalankan tim.",
            "Namun kebiasaan audiens di akhir pekan berbeda dan tidak diikuti.",
            "Belum ada alasan mengapa pukul 12.00 yang dipilih.",
          ],
        },
        {
          id: "jd2b",
          headline: "Hanya hari kerja, akhir pekan dikosongkan",
          fields: {
            sen: "19.00", sel: "19.00", rab: "19.00", kam: "19.00",
            jum: "19.00", sab: "Tidak mengunggah", min: "Tidak mengunggah",
            isi: "Unggahan hanya dilakukan pada hari kerja pukul 19.00, sedangkan Sabtu dan Minggu dikosongkan.",
          },
          points: [
            "Jam hari kerja sudah tetap dan mengikuti jam ramai.",
            "Akhir pekan justru saat audiens paling luang berolahraga dan membuka media sosial.",
            "Instruksi meminta rencana untuk 7 hari penuh, bukan 5 hari.",
          ],
        },
        {
          id: "jd2c",
          headline: "Jam berbeda tiap hari tanpa pola",
          fields: {
            sen: "08.00", sel: "14.00", rab: "21.00", kam: "10.00",
            jum: "17.00", sab: "13.00", min: "22.00",
            isi: "Setiap hari memakai jam yang berbeda-beda menyesuaikan kesempatan tim.",
          },
          points: [
            "Ketujuh hari sudah terisi sesuai instruksi.",
            "Jamnya berganti tanpa pola sehingga audiens tidak pernah hafal kapan konten muncul.",
            "Justru mengulang masalah jadwal tidak konsisten pada studi kasus.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "jd3a",
          headline: "Unggah kapan saja saat sempat",
          fields: {
            sen: "Menyesuaikan", sel: "Menyesuaikan", rab: "Menyesuaikan", kam: "Menyesuaikan",
            jum: "Menyesuaikan", sab: "Menyesuaikan", min: "Menyesuaikan",
            isi: "Konten diunggah kapan saja ketika tim sempat, tanpa jam yang ditetapkan sebelumnya.",
          },
          points: [
            "Tidak ada jadwal yang bisa dipakai sebagai patokan tim.",
            "Persis mengulang masalah jadwal tidak konsisten pada studi kasus.",
            "Kolom jam pada content calendar tidak terisi secara berarti.",
          ],
        },
        {
          id: "jd3b",
          headline: "Semua konten diunggah tengah malam",
          fields: {
            sen: "02.00", sel: "02.00", rab: "02.00", kam: "02.00",
            jum: "02.00", sab: "02.00", min: "02.00",
            isi: "Seluruh konten dijadwalkan pukul 02.00 dini hari karena beranda sedang sepi.",
          },
          points: [
            "Jadwalnya memang tetap, tetapi jatuh pada jam audiens tidur.",
            "Jangkauan awal sangat rendah sehingga konten sulit terangkat beranda.",
            "Bertentangan dengan tujuan menaikkan jangkauan dan interaksi.",
          ],
        },
        {
          id: "jd3c",
          headline: "Menumpuk sepuluh unggahan dalam satu hari",
          fields: {
            sen: "07.00, 09.00, 11.00, 13.00, 15.00", sel: "Tidak mengunggah", rab: "Tidak mengunggah",
            kam: "Tidak mengunggah", jum: "Tidak mengunggah", sab: "Tidak mengunggah", min: "Tidak mengunggah",
            isi: "Seluruh konten sepekan diunggah sekaligus pada hari Senin, sisanya dikosongkan.",
          },
          points: [
            "Enam dari tujuh hari tidak terisi sama sekali.",
            "Unggahan yang menumpuk saling berebut jangkauan pada hari yang sama.",
            "Bertentangan dengan tujuan menjaga kehadiran akun sepanjang pekan.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 4. RENCANA KONTEN — isi kalender tiap hari                          */
/* ================================================================== */

const rencana: ChoiceGroup = {
  id: "rencana",
  label: "Rencana Konten",
  question: "Rencana konten tiap hari selama 1 minggu",
  hint: "Kolom rencana konten pada calendar berisi gambaran umum, bukan naskah lengkap.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "rc1a",
          headline: "Berputar pada empat pilar, ditutup konten komunitas",
          fields: {
            sen: "{{pilar1}} — Reels: tiga tanda pakaian olahraga sudah tidak layak pakai",
            sel: "{{pilar2}} — Carousel: rutinitas 15 menit sebelum berangkat kerja",
            rab: "{{pilar3}} — Reels: kenapa bahan breathable tidak gerah di cuaca panas",
            kam: "{{pilar1}} — Carousel: panduan memilih ukuran yang pas",
            jum: "{{pilar3}} — Feed: koleksi pekan ini beserta pilihan warnanya",
            sab: "{{pilar4}} — Reels: liputan lari bersama komunitas kota",
            min: "{{pilar4}} — Feed: unggah ulang foto pembeli beserta ceritanya",
          },
          points: [
            "Keempat pilar dipakai bergantian sehingga tidak ada dua hari beruntun bertema sama.",
            "Konten edukasi ditaruh di hari kerja saat audiens mencari informasi.",
            "Akhir pekan diisi konten komunitas yang paling banyak mengundang komentar.",
            "Setiap hari sudah menyebut format dan sudut pandangnya, bukan sekadar tema.",
          ],
        },
        {
          id: "rc1b",
          headline: "Awal pekan menjangkau, akhir pekan mengajak berinteraksi",
          fields: {
            sen: "{{pilar1}} — Reels: keluhan gerah saat olahraga siang dan cara mengatasinya",
            sel: "{{pilar3}} — Feed: detail jahitan dan bahan koleksi terbaru",
            rab: "{{pilar2}} — Reels: latihan singkat di sela jam kerja",
            kam: "{{pilar1}} — Carousel: membaca label bahan sebelum membeli",
            jum: "{{pilar3}} — Reels: satu produk dipakai untuk tiga kegiatan berbeda",
            sab: "{{pilar4}} — Story: sesi tanya jawab ukuran bersama audiens",
            min: "{{pilar4}} — Feed: cerita pemakai setelah tiga bulan memakai produk",
          },
          points: [
            "Awal pekan memakai konten yang mudah dibagikan untuk menjangkau audiens baru.",
            "Tengah pekan menjelaskan produk saat audiens mulai menimbang.",
            "Akhir pekan mengundang percakapan lewat tanya jawab dan cerita pemakai.",
            "Alurnya naik dari pengenalan menuju pertimbangan dalam satu pekan.",
          ],
        },
        {
          id: "rc1c",
          headline: "Satu masalah audiens dibahas tuntas sepekan",
          fields: {
            sen: "{{pilar1}} — Reels: kenapa pakaian olahraga terasa gerah di cuaca lembap",
            sel: "{{pilar1}} — Carousel: perbedaan bahan katun dan bahan breathable",
            rab: "{{pilar3}} — Reels: uji sederhana bahan {{brand}} saat berkeringat",
            kam: "{{pilar2}} — Feed: rutinitas latihan sore tanpa berganti pakaian",
            jum: "{{pilar3}} — Carousel: memilih koleksi sesuai jenis olahraga",
            sab: "{{pilar4}} — Reels: tanggapan anggota komunitas setelah mencoba",
            min: "{{pilar4}} — Feed: rangkuman pertanyaan audiens sepekan beserta jawabannya",
          },
          points: [
            "Satu masalah audiens dibahas bertahap dari Senin sampai Minggu.",
            "Audiens yang tertinggal satu konten masih bisa mengikuti alurnya.",
            "Konten penutup merangkum pertanyaan sepekan sehingga interaksi terkumpul.",
            "Tema yang menyambung membuat audiens menunggu unggahan berikutnya.",
          ],
        },
        {
          id: "rc1d",
          headline: "Selang-seling konten ringan dan konten mendalam",
          fields: {
            sen: "{{pilar2}} — Reels: satu gerakan pemanasan yang sering dilewatkan",
            sel: "{{pilar1}} — Carousel: tiga hal yang menentukan kenyamanan pakaian olahraga",
            rab: "{{pilar4}} — Feed: foto anggota komunitas memakai koleksi {{brand}}",
            kam: "{{pilar3}} — Reels: koleksi terbaru dipakai saat berlari",
            jum: "{{pilar2}} — Story: jajak pendapat jenis olahraga favorit audiens",
            sab: "{{pilar1}} — Carousel: cara mencuci agar bahan tidak cepat melar",
            min: "{{pilar4}} — Reels: rangkuman kegiatan komunitas sepekan",
          },
          points: [
            "Konten ringan dan konten mendalam ditaruh berselang-seling agar audiens tidak lelah.",
            "Story jajak pendapat di hari Jumat memancing interaksi menjelang akhir pekan.",
            "Konten perawatan produk menjaga hubungan dengan pembeli lama.",
            "Format berganti tiap hari sehingga beranda audiens tidak monoton.",
          ],
        },
        {
          id: "rc1e",
          headline: "Mengikuti ritme latihan audiens sepanjang pekan",
          fields: {
            sen: "{{pilar2}} — Reels: menyusun rencana latihan untuk sepekan",
            sel: "{{pilar1}} — Carousel: memilih pakaian sesuai jenis latihan",
            rab: "{{pilar3}} — Feed: koleksi untuk latihan di dalam ruangan",
            kam: "{{pilar1}} — Reels: menjaga semangat saat latihan mulai terasa berat",
            jum: "{{pilar3}} — Carousel: paket koleksi untuk akhir pekan aktif",
            sab: "{{pilar4}} — Reels: lari bersama komunitas dan tips dari pesertanya",
            min: "{{pilar2}} — Feed: pemulihan setelah latihan berat",
          },
          points: [
            "Isi konten mengikuti ritme latihan audiens dari awal sampai akhir pekan.",
            "Senin membantu audiens menyusun rencana, Minggu menutup dengan pemulihan.",
            "Setiap hari punya alasan mengapa temanya ditaruh di hari itu.",
            "Produk muncul di hari saat audiens paling mungkin berbelanja.",
          ],
        },
        {
          id: "rc1f",
          headline: "Dua pilar utama per pekan, dua pilar pendukung",
          fields: {
            sen: "{{pilar1}} — Reels: kesalahan umum saat memilih pakaian olahraga",
            sel: "{{pilar3}} — Carousel: keunggulan bahan koleksi {{brand}}",
            rab: "{{pilar1}} — Reels: menjawab pertanyaan audiens dari kolom komentar",
            kam: "{{pilar3}} — Feed: pilihan warna koleksi pekan ini",
            jum: "{{pilar2}} — Reels: latihan ringan yang bisa dilakukan di kantor",
            sab: "{{pilar4}} — Feed: unggah ulang foto pembeli",
            min: "{{pilar1}} — Carousel: rangkuman tips sepekan",
          },
          points: [
            "Dua pilar utama mendapat porsi terbesar, dua pilar pendukung mengisi sisanya.",
            "Porsi ini membuat pesan utama pekan itu terasa jelas.",
            "Konten menjawab komentar di hari Rabu memanfaatkan pertanyaan yang sudah terkumpul.",
            "Carousel rangkuman di hari Minggu mendorong audiens menyimpan konten.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "rc2a",
          headline: "Hanya menyebut tema tanpa format",
          fields: {
            sen: "Edukasi", sel: "Produk", rab: "Edukasi", kam: "Promo",
            jum: "Produk", sab: "Komunitas", min: "Hiburan",
            isi: "Setiap hari diisi nama tema kontennya saja.",
          },
          points: [
            "Ketujuh hari sudah terisi dan temanya berganti-ganti.",
            "Belum menyebut format maupun sudut pandang, jadi tim masih harus menebak isinya.",
            "Elemen rencana konten pada calendar belum benar-benar tergambar.",
          ],
        },
        {
          id: "rc2b",
          headline: "Dua tema saja, dipakai bergantian",
          fields: {
            sen: "Konten produk", sel: "Konten promo", rab: "Konten produk", kam: "Konten promo",
            jum: "Konten produk", sab: "Konten promo", min: "Konten produk",
            isi: "Konten produk dan konten promo dipakai bergantian sepanjang pekan.",
          },
          points: [
            "Jadwalnya rapi dan mudah dijalankan tim.",
            "Hanya dua tema yang keduanya berjualan, sehingga variasinya minim.",
            "Masalah kurangnya variasi jenis konten pada studi kasus belum terjawab.",
          ],
        },
        {
          id: "rc2c",
          headline: "Rencana lengkap tetapi menumpuk di akhir pekan",
          fields: {
            sen: "Belum ada rencana khusus", sel: "Belum ada rencana khusus",
            rab: "Belum ada rencana khusus", kam: "Belum ada rencana khusus",
            jum: "{{pilar1}} — Carousel: panduan memilih ukuran",
            sab: "{{pilar3}} — Reels: koleksi terbaru", min: "{{pilar4}} — Feed: foto pembeli",
            isi: "Rencana konten hanya disiapkan untuk tiga hari terakhir dalam sepekan.",
          },
          points: [
            "Tiga hari terakhir sudah terisi lengkap dengan pilar dan format.",
            "Empat hari pertama dibiarkan tanpa rencana sehingga akun menghilang di awal pekan.",
            "Instruksi meminta rencana untuk 1 minggu penuh.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "rc3a",
          headline: "Konten promo tiap hari",
          fields: {
            sen: "Promo diskon", sel: "Promo diskon", rab: "Promo diskon", kam: "Promo diskon",
            jum: "Promo diskon", sab: "Promo diskon", min: "Promo diskon",
            isi: "Setiap hari diisi konten promo potongan harga.",
          },
          points: [
            "Tidak ada variasi tema sama sekali sepanjang pekan.",
            "Audiens jenuh dan interaksi menurun, persis masalah pada studi kasus.",
            "Citra brand turun menjadi sekadar akun diskon.",
          ],
        },
        {
          id: "rc3b",
          headline: "Mengikuti tren viral apa pun tiap hari",
          fields: {
            sen: "Ikut tren yang sedang ramai", sel: "Ikut tren yang sedang ramai",
            rab: "Ikut tren yang sedang ramai", kam: "Ikut tren yang sedang ramai",
            jum: "Ikut tren yang sedang ramai", sab: "Ikut tren yang sedang ramai",
            min: "Ikut tren yang sedang ramai",
            isi: "Isi konten ditentukan mengikuti tren yang sedang ramai pada hari itu.",
          },
          points: [
            "Tidak ada rencana yang bisa disiapkan sebelumnya oleh tim.",
            "Konten yang tidak berkaitan dengan produk mendatangkan audiens yang salah.",
            "Content calendar kehilangan fungsinya sebagai alat perencanaan.",
          ],
        },
        {
          id: "rc3c",
          headline: "Mengunggah ulang konten kompetitor",
          fields: {
            sen: "Unggah ulang konten kompetitor", sel: "Unggah ulang konten kompetitor",
            rab: "Unggah ulang konten kompetitor", kam: "Unggah ulang konten kompetitor",
            jum: "Unggah ulang konten kompetitor", sab: "Unggah ulang konten kompetitor",
            min: "Unggah ulang konten kompetitor",
            isi: "Konten diambil dari akun kompetitor lalu diunggah ulang di akun {{brand}}.",
          },
          points: [
            "Mengambil konten pihak lain tanpa izin berisiko bagi brand.",
            "Tidak ada pembeda {{brand}} yang terbangun di mata audiens.",
            "Audiens justru diarahkan mengenali produk kompetitor.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 5-7. CONTENT PLAN — satu kartu untuk satu hari (13 kolom template)  */
/*                                                                     */
/* Kolom Marketing Objective, Pilar Konten, PIC, Jam Posting, dan      */
/* Status Konten memakai token supaya selalu sejalan dengan jawaban    */
/* pada bagian sebelumnya.                                             */
/* ================================================================== */

const hari1: ChoiceGroup = {
  id: "plan1",
  label: "Plan Hari 1",
  question: "Content plan hari ke-1 — Senin, 1 September 2025",
  hint: "Satu kartu berisi rencana lengkap satu hari: tipe visual, judul, copywriting, sampai catatan.",
  card: "plan",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "h1a",
          headline: "Reels: tiga tanda pakaian olahraga sudah tidak layak pakai",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Reels 30 detik, rekaman vertikal",
            judul: "3 Tanda Baju Olahragamu Sudah Waktunya Diganti",
            copywriting:
              "Baju olahraga yang sudah melar bukan cuma soal tampilan. Ada tiga tanda yang sering diabaikan: bahan tidak lagi kembali ke bentuk semula, warnanya pudar tidak merata, dan keringat lebih lama kering. Kalau tiga-tiganya sudah muncul, itu tandanya perlu diganti.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Reels edukasi bahan di akun @corenationactive sebagai acuan tempo dan panjang video",
            catatan: "Tiga detik pertama langsung menampilkan bahan yang melar supaya penonton tidak menggeser.",
          },
          points: [
            "Tipe visual: Reels 30 detik, rekaman vertikal.",
            "Judul: 3 Tanda Baju Olahragamu Sudah Waktunya Diganti.",
            "Platform: Instagram Reels dan TikTok, memakai rekaman yang sama.",
            "Catatan: pembuka tiga detik menampilkan bahan melar supaya penonton bertahan.",
          ],
        },
        {
          id: "h1b",
          headline: "Reels: keluhan gerah saat olahraga siang",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Reels 25 detik, rekaman luar ruang",
            judul: "Kenapa Olahraga Siang Terasa Dua Kali Lebih Gerah",
            copywriting:
              "Udara Jakarta di atas 30 derajat membuat keringat sulit menguap. Yang bikin gerah sebenarnya bukan panasnya, tapi bahan yang menahan keringat menempel di kulit. Bahan breathable membiarkan uap keluar, jadi badan lebih cepat kering.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Konten cuaca dan olahraga di akun komunitas lari kota sebagai acuan sudut pandang",
            catatan: "Rekaman diambil pukul 12.00 di luar ruang agar kondisi panasnya terlihat nyata.",
          },
          points: [
            "Tipe visual: Reels 25 detik, rekaman luar ruang saat siang.",
            "Judul: Kenapa Olahraga Siang Terasa Dua Kali Lebih Gerah.",
            "Platform: Instagram Reels dan TikTok.",
            "Catatan: perekaman siang hari supaya kondisi panasnya terlihat nyata.",
          ],
        },
        {
          id: "h1c",
          headline: "Carousel: kesalahan umum memilih pakaian olahraga",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Carousel 6 halaman",
            judul: "5 Kesalahan Saat Memilih Baju Olahraga",
            copywriting:
              "Kesalahan paling sering bukan salah ukuran, tapi salah bahan. Banyak yang memilih katun karena terasa adem saat dipegang, padahal katun menahan keringat. Geser untuk melihat empat kesalahan lain yang bikin latihan jadi tidak nyaman.",
            platform: "Instagram feed dan TikTok carousel",
            referensi: "Carousel edukasi di akun @arunasportswear sebagai acuan jumlah halaman",
            catatan: "Halaman terakhir berisi ajakan menyimpan agar konten bertahan lama di beranda.",
          },
          points: [
            "Tipe visual: Carousel 6 halaman.",
            "Judul: 5 Kesalahan Saat Memilih Baju Olahraga.",
            "Platform: Instagram feed dan TikTok carousel.",
            "Catatan: halaman terakhir mengajak menyimpan supaya jangkauannya bertahan.",
          ],
        },
        {
          id: "h1d",
          headline: "Reels: satu gerakan pemanasan yang sering dilewatkan",
          fields: {
            pilar: "{{pilar2}}",
            tipeVisual: "Reels 20 detik, rekaman dalam ruang",
            judul: "Gerakan Pemanasan yang Paling Sering Dilewatkan",
            copywriting:
              "Kebanyakan orang langsung lari tanpa membuka pinggul lebih dulu. Padahal gerakan ini cuma butuh 30 detik dan bikin langkah terasa lebih ringan. Coba sebelum latihan besok, rasakan bedanya.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Konten pemanasan di akun pelatih kebugaran lokal sebagai acuan gerakan",
            catatan: "Gerakan diperagakan penuh tanpa potongan agar audiens bisa langsung menirukan.",
          },
          points: [
            "Tipe visual: Reels 20 detik, rekaman dalam ruang.",
            "Judul: Gerakan Pemanasan yang Paling Sering Dilewatkan.",
            "Platform: Instagram Reels dan TikTok.",
            "Catatan: gerakan diperagakan penuh tanpa potongan agar mudah ditiru.",
          ],
        },
        {
          id: "h1e",
          headline: "Reels: menyusun rencana latihan sepekan",
          fields: {
            pilar: "{{pilar2}}",
            tipeVisual: "Reels 35 detik dengan teks di layar",
            judul: "Cara Menyusun Jadwal Latihan yang Tidak Bikin Menyerah",
            copywriting:
              "Rencana latihan gagal biasanya bukan karena malas, tapi karena jadwalnya terlalu berat di awal. Mulai dari tiga hari saja, masing-masing 30 menit. Setelah dua minggu terasa ringan, baru ditambah.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Konten perencanaan latihan di akun komunitas lari sebagai acuan susunan",
            catatan: "Teks di layar dibuat besar karena banyak audiens menonton tanpa suara.",
          },
          points: [
            "Tipe visual: Reels 35 detik dengan teks di layar.",
            "Judul: Cara Menyusun Jadwal Latihan yang Tidak Bikin Menyerah.",
            "Platform: Instagram Reels dan TikTok.",
            "Catatan: teks layar dibuat besar untuk audiens yang menonton tanpa suara.",
          ],
        },
        {
          id: "h1f",
          headline: "Carousel: membaca label bahan sebelum membeli",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Carousel 5 halaman dengan foto jarak dekat",
            judul: "Cara Membaca Label Bahan Baju Olahraga",
            copywriting:
              "Polyester, spandex, katun — tulisan di label sebenarnya sudah memberi tahu apakah baju itu cocok untuk cuaca panas. Geser untuk tahu tiga istilah yang paling menentukan kenyamanan saat berkeringat.",
            platform: "Instagram feed",
            referensi: "Carousel penjelasan bahan di akun @corenationactive sebagai acuan kedalaman isi",
            catatan: "Foto label diambil jarak dekat agar tulisannya terbaca di layar ponsel.",
          },
          points: [
            "Tipe visual: Carousel 5 halaman dengan foto jarak dekat.",
            "Judul: Cara Membaca Label Bahan Baju Olahraga.",
            "Platform: Instagram feed.",
            "Catatan: foto label diambil jarak dekat agar terbaca di layar ponsel.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "h2a",
          headline: "Konten produk tanpa naskah",
          fields: {
            pilar: "{{pilar3}}",
            tipeVisual: "Foto produk",
            judul: "Koleksi Terbaru",
            copywriting: "Koleksi terbaru sudah tersedia. Cek sekarang.",
            platform: "Instagram",
            referensi: "Foto katalog milik brand sendiri",
            catatan: "Detail pengambilan gambar ditentukan saat pemotretan.",
          },
          points: [
            "Kolomnya sudah terisi seluruhnya sesuai template.",
            "Judul dan copywriting terlalu umum, tidak menyebut keunggulan apa pun.",
            "Tidak ada alasan mengapa audiens harus berhenti menggeser di konten ini.",
          ],
        },
        {
          id: "h2b",
          headline: "Judul menarik tetapi isi tidak menepati",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Reels 15 detik",
            judul: "Rahasia Baju Olahraga yang Tidak Pernah Bau",
            copywriting: "Ternyata rahasianya ada di bahan. Pakai produk kami, dijamin nyaman seharian.",
            platform: "Instagram Reels",
            referensi: "Konten viral berjudul rahasia di berbagai akun",
            catatan: "Judul dibuat memancing rasa penasaran.",
          },
          points: [
            "Judulnya memang memancing rasa penasaran dan formatnya sudah tepat.",
            "Isinya tidak menjelaskan rahasia yang dijanjikan judul, hanya beralih ke jualan.",
            "Audiens yang merasa tertipu judul cenderung tidak kembali menonton.",
          ],
        },
        {
          id: "h2c",
          headline: "Rencana bagus tetapi platform tidak ditentukan",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Video pendek",
            judul: "Bahan Breathable Itu Sebenarnya Apa",
            copywriting:
              "Breathable artinya bahan membiarkan uap keringat keluar. Bukan berarti dingin, tapi badan lebih cepat kering setelah berkeringat.",
            platform: "Semua platform sekaligus",
            referensi: "Konten edukasi bahan di berbagai akun brand olahraga",
            catatan: "Format akan disesuaikan belakangan mengikuti platformnya.",
          },
          points: [
            "Judul dan copywriting sudah menjelaskan satu hal dengan tuntas.",
            "Platform ditulis semua sekaligus, padahal tiap platform butuh rasio dan durasi berbeda.",
            "Tipe visual masih umum sehingga tim produksi belum bisa mulai bekerja.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "h3a",
          headline: "Promo diskon tanpa kaitan objective",
          fields: {
            pilar: "Promo",
            tipeVisual: "Foto poster diskon",
            judul: "DISKON 70% HARI INI SAJA",
            copywriting: "Buruan beli sebelum kehabisan! Diskon 70% hanya hari ini!",
            platform: "Instagram",
            referensi: "Poster diskon akun toko daring",
            catatan: "Diunggah berulang beberapa kali sehari agar terlihat audiens.",
          },
          points: [
            "Tidak berhubungan dengan objective maupun content pillar yang sudah ditetapkan.",
            "Potongan harga sebesar itu tidak sejalan dengan posisi {{brand}} pada harga yang wajar.",
            "Mengunggah berulang dalam sehari justru menurunkan jangkauan.",
          ],
        },
        {
          id: "h3b",
          headline: "Konten tanpa hubungan dengan produk",
          fields: {
            pilar: "Hiburan",
            tipeVisual: "Reels tren joget",
            judul: "Ikutan Tren Joget Minggu Ini",
            copywriting: "Lagi rame nih, ikutan yuk! Jangan lupa follow untuk konten seru lainnya.",
            platform: "TikTok",
            referensi: "Tren joget yang sedang ramai di TikTok",
            catatan: "Produk tidak perlu ditampilkan agar terlihat natural.",
          },
          points: [
            "Konten tidak menampilkan produk maupun pesan brand sama sekali.",
            "Audiens yang datang tidak berminat pada pakaian olahraga.",
            "Jangkauan naik sesaat tetapi tidak menghasilkan apa pun bagi {{brand}}.",
          ],
        },
        {
          id: "h3c",
          headline: "Menyalin konten kompetitor",
          fields: {
            pilar: "Produk",
            tipeVisual: "Unggah ulang video kompetitor",
            judul: "Video Bagus dari Brand Sebelah",
            copywriting: "Video ini bagus banget, kami unggah ulang ya. Produk kami juga mirip kok.",
            platform: "Instagram",
            referensi: "Akun kompetitor yang videonya diambil",
            catatan: "Logo kompetitor ditutup sebelum diunggah.",
          },
          points: [
            "Mengambil karya pihak lain tanpa izin berisiko bagi brand.",
            "Menutup logo kompetitor tidak menghapus persoalan hak pakainya.",
            "Audiens justru diarahkan mengenali produk kompetitor, bukan {{brand}}.",
          ],
        },
      ],
    },
  ],
};

const hari2: ChoiceGroup = {
  id: "plan2",
  label: "Plan Hari 2",
  question: "Content plan hari ke-2 — Selasa, 2 September 2025",
  hint: "Usahakan pilar dan formatnya berbeda dari hari pertama supaya beranda tidak monoton.",
  card: "plan",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "d2a",
          headline: "Carousel: panduan memilih ukuran yang pas",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Carousel 7 halaman dengan tabel ukuran",
            judul: "Panduan Ukuran yang Tidak Bikin Salah Beli",
            copywriting:
              "Ukuran M di satu brand belum tentu sama dengan M di brand lain. Yang perlu diukur cuma tiga: lingkar dada, lingkar pinggang, dan panjang badan. Geser untuk melihat tabelnya, simpan supaya tidak perlu cari lagi saat mau belanja.",
            platform: "Instagram feed",
            referensi: "Sorotan panduan ukuran di akun @corenationactive sebagai acuan kelengkapan",
            catatan: "Carousel disimpan ke sorotan akun agar mudah ditemukan kapan saja.",
          },
          points: [
            "Tipe visual: Carousel 7 halaman berisi tabel ukuran.",
            "Judul: Panduan Ukuran yang Tidak Bikin Salah Beli.",
            "Platform: Instagram feed.",
            "Catatan: konten disimpan ke sorotan akun supaya terus bisa diakses.",
          ],
        },
        {
          id: "d2b",
          headline: "Feed: detail jahitan dan bahan koleksi terbaru",
          fields: {
            pilar: "{{pilar3}}",
            tipeVisual: "Foto feed jarak dekat, tiga gambar",
            judul: "Yang Tidak Terlihat dari Foto Katalog",
            copywriting:
              "Jahitan rata di bagian bahu menentukan apakah baju terasa mengganjal saat tangan diangkat. Kami foto jarak dekat supaya kelihatan bedanya sebelum kamu memutuskan.",
            platform: "Instagram feed",
            referensi: "Foto detail produk di akun @arunasportswear sebagai acuan sudut pengambilan",
            catatan: "Pencahayaan alami agar warna bahan tidak berubah dari aslinya.",
          },
          points: [
            "Tipe visual: foto feed jarak dekat, tiga gambar.",
            "Judul: Yang Tidak Terlihat dari Foto Katalog.",
            "Platform: Instagram feed.",
            "Catatan: pencahayaan alami supaya warna bahan tidak menyimpang.",
          ],
        },
        {
          id: "d2c",
          headline: "Reels: latihan singkat di sela jam kerja",
          fields: {
            pilar: "{{pilar2}}",
            tipeVisual: "Reels 30 detik, rekaman di ruang kerja",
            judul: "Latihan 5 Menit Tanpa Perlu Ganti Baju",
            copywriting:
              "Tidak sempat ke pusat kebugaran bukan alasan berhenti bergerak. Lima menit di sela kerja sudah cukup membuat punggung tidak kaku. Ini tiga gerakan yang bisa dilakukan di dekat meja.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Konten latihan kantor di akun pelatih kebugaran sebagai acuan durasi",
            catatan: "Rekaman memakai pakaian yang pantas dipakai di kantor agar terasa nyata.",
          },
          points: [
            "Tipe visual: Reels 30 detik, rekaman di ruang kerja.",
            "Judul: Latihan 5 Menit Tanpa Perlu Ganti Baju.",
            "Platform: Instagram Reels dan TikTok.",
            "Catatan: pakaian yang dipakai pantas untuk kantor agar terasa nyata.",
          ],
        },
        {
          id: "d2d",
          headline: "Carousel: perbedaan bahan katun dan breathable",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Carousel 5 halaman, foto perbandingan",
            judul: "Katun vs Bahan Breathable: Mana yang Cocok untuk Cuaca Kita",
            copywriting:
              "Katun menyerap keringat lalu menahannya. Bahan breathable membiarkan uap keluar. Di cuaca lembap, bedanya terasa setelah 20 menit bergerak. Geser untuk melihat perbandingannya.",
            platform: "Instagram feed dan TikTok carousel",
            referensi: "Konten perbandingan bahan di akun brand olahraga lokal sebagai acuan susunan",
            catatan: "Foto perbandingan diambil pada kondisi yang sama agar adil.",
          },
          points: [
            "Tipe visual: Carousel 5 halaman berisi foto perbandingan.",
            "Judul: Katun vs Bahan Breathable: Mana yang Cocok untuk Cuaca Kita.",
            "Platform: Instagram feed dan TikTok carousel.",
            "Catatan: kedua bahan difoto pada kondisi yang sama supaya perbandingannya adil.",
          ],
        },
        {
          id: "d2e",
          headline: "Reels: satu produk untuk tiga kegiatan",
          fields: {
            pilar: "{{pilar3}}",
            tipeVisual: "Reels 25 detik, tiga latar berbeda",
            judul: "Satu Baju, Tiga Kegiatan",
            copywriting:
              "Pagi lari, siang kerja dari kafe, sore belanja. Potongan yang rapi bikin satu baju tidak cuma berguna di tempat latihan. Ini contoh padu padannya.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Konten padu padan di akun @league_world sebagai acuan perpindahan latar",
            catatan: "Perpindahan antar-latar dibuat mulus agar penonton bertahan sampai akhir.",
          },
          points: [
            "Tipe visual: Reels 25 detik dengan tiga latar berbeda.",
            "Judul: Satu Baju, Tiga Kegiatan.",
            "Platform: Instagram Reels dan TikTok.",
            "Catatan: perpindahan latar dibuat mulus supaya penonton bertahan.",
          ],
        },
        {
          id: "d2f",
          headline: "Feed: foto anggota komunitas memakai koleksi",
          fields: {
            pilar: "{{pilar4}}",
            tipeVisual: "Foto feed, unggah ulang dari anggota komunitas",
            judul: "Dipakai Latihan, Bukan Cuma Difoto",
            copywriting:
              "Foto ini dikirim salah satu anggota komunitas lari setelah dipakai latihan tiga bulan. Terima kasih sudah berbagi. Kirim fotomu juga lewat pesan langsung, kami unggah ulang.",
            platform: "Instagram feed",
            referensi: "Unggahan ulang foto pembeli di akun @specs_indonesia sebagai acuan tata letak",
            catatan: "Izin pemilik foto diminta lebih dulu lewat pesan langsung sebelum diunggah.",
          },
          points: [
            "Tipe visual: foto feed hasil unggah ulang dari anggota komunitas.",
            "Judul: Dipakai Latihan, Bukan Cuma Difoto.",
            "Platform: Instagram feed.",
            "Catatan: izin pemilik foto diminta lebih dulu sebelum diunggah.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "d2x",
          headline: "Mengulang tema hari pertama",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Reels 30 detik",
            judul: "Tanda Baju Olahraga Harus Diganti (Bagian 2)",
            copywriting: "Masih soal tanda baju olahraga yang harus diganti. Kali ini tambahannya.",
            platform: "Instagram Reels",
            referensi: "Konten hari pertama di akun sendiri",
            catatan: "Isinya melanjutkan konten kemarin.",
          },
          points: [
            "Kolomnya lengkap dan formatnya sudah tepat.",
            "Temanya sama persis dengan hari pertama sehingga beranda terasa mengulang.",
            "Content pillar yang sudah disusun tidak dimanfaatkan untuk memberi variasi.",
          ],
        },
        {
          id: "d2y",
          headline: "Copywriting terlalu panjang untuk Reels",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Reels 15 detik",
            judul: "Semua Tentang Bahan Pakaian Olahraga",
            copywriting:
              "Bahan pakaian olahraga terbagi menjadi banyak jenis, mulai dari katun, polyester, nylon, spandex, sampai campuran keduanya, masing-masing punya kelebihan dan kekurangan tersendiri yang perlu dipahami sebelum membeli, terutama untuk iklim tropis seperti di Indonesia yang lembap sepanjang tahun.",
            platform: "Instagram Reels",
            referensi: "Artikel panjang tentang jenis bahan",
            catatan: "Semua informasi dimasukkan agar lengkap.",
          },
          points: [
            "Isinya benar dan menjawab kebutuhan audiens.",
            "Naskah sepanjang itu tidak muat dibacakan dalam Reels 15 detik.",
            "Format carousel akan lebih cocok untuk isi sepadat ini.",
          ],
        },
        {
          id: "d2z",
          headline: "Tidak menyebut catatan produksi",
          fields: {
            pilar: "{{pilar3}}",
            tipeVisual: "Foto produk",
            judul: "Warna Baru Koleksi September",
            copywriting: "Tiga warna baru sudah tersedia. Mana yang jadi pilihanmu?",
            platform: "Instagram feed",
            referensi: "Foto katalog koleksi September",
            catatan: "Menyusul.",
          },
          points: [
            "Judul dan copywriting sudah singkat serta mengundang jawaban.",
            "Kolom catatan tidak berisi arahan apa pun untuk tim produksi.",
            "Tanpa catatan, hasil pemotretan bisa berbeda dari yang dibayangkan.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "d2p",
          headline: "Promo yang sama dengan hari sebelumnya",
          fields: {
            pilar: "Promo",
            tipeVisual: "Foto poster diskon",
            judul: "DISKON 70% DIPERPANJANG",
            copywriting: "Masih ada diskon 70%! Buruan sebelum benar-benar habis!",
            platform: "Instagram",
            referensi: "Poster diskon hari sebelumnya",
            catatan: "Poster kemarin dipakai ulang dengan tulisan diperpanjang.",
          },
          points: [
            "Dua hari beruntun berisi promo yang sama persis.",
            "Memakai ulang poster kemarin membuat akun terlihat tidak terurus.",
            "Tidak berhubungan dengan objective maupun content pillar yang sudah ditetapkan.",
          ],
        },
        {
          id: "d2q",
          headline: "Konten yang menjelekkan kompetitor",
          fields: {
            pilar: "Produk",
            tipeVisual: "Reels perbandingan",
            judul: "Jangan Beli Brand Sebelah, Ini Alasannya",
            copywriting: "Bahan brand sebelah gampang rusak. Mending beli punya kami saja.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Produk kompetitor yang dibeli untuk dibandingkan",
            catatan: "Nama kompetitor disamarkan sedikit.",
          },
          points: [
            "Menjelekkan kompetitor merusak citra {{brand}} di mata audiens.",
            "Klaim bahan gampang rusak disampaikan tanpa pengujian apa pun.",
            "Berisiko menimbulkan persoalan hukum meski namanya disamarkan.",
          ],
        },
        {
          id: "d2r",
          headline: "Konten pribadi tim, bukan konten brand",
          fields: {
            pilar: "Hiburan",
            tipeVisual: "Foto kegiatan kantor",
            judul: "Makan Siang Tim Hari Ini",
            copywriting: "Hari ini tim makan siang bareng. Seru banget!",
            platform: "Instagram feed",
            referensi: "Foto dari ponsel anggota tim",
            catatan: "Diunggah agar akun terlihat aktif.",
          },
          points: [
            "Isinya tidak berhubungan dengan audiens maupun produk {{brand}}.",
            "Mengisi jadwal hanya supaya akun terlihat aktif tidak menaikkan interaksi.",
            "Slot unggah yang berharga terpakai untuk konten tanpa tujuan.",
          ],
        },
      ],
    },
  ],
};

const hari3: ChoiceGroup = {
  id: "plan3",
  label: "Plan Hari 3",
  question: "Content plan hari ke-3 — Rabu, 3 September 2025",
  hint: "Hari ketiga baik dipakai untuk konten yang mengundang audiens menjawab atau menyimpan.",
  card: "plan",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "d3a",
          headline: "Reels: uji sederhana bahan saat berkeringat",
          fields: {
            pilar: "{{pilar3}}",
            tipeVisual: "Reels 40 detik, uji dua bahan berdampingan",
            judul: "Kami Uji Sendiri: Bahan Mana yang Lebih Cepat Kering",
            copywriting:
              "Dua kaos, air dalam jumlah sama, kipas yang sama. Kami rekam dari menit nol sampai kering. Hasilnya bisa kamu lihat sendiri tanpa perlu percaya klaim siapa pun.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Konten uji bahan di akun ulasan produk sebagai acuan cara pengujian",
            catatan: "Pengujian direkam tanpa potongan agar hasilnya bisa dipercaya audiens.",
          },
          points: [
            "Tipe visual: Reels 40 detik, uji dua bahan berdampingan.",
            "Judul: Kami Uji Sendiri: Bahan Mana yang Lebih Cepat Kering.",
            "Platform: Instagram Reels dan TikTok.",
            "Catatan: pengujian direkam tanpa potongan supaya hasilnya dapat dipercaya.",
          ],
        },
        {
          id: "d3b",
          headline: "Reels: menjawab pertanyaan dari kolom komentar",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Reels 30 detik, menjawab tangkapan komentar",
            judul: "Menjawab Pertanyaan Kalian soal Ukuran",
            copywriting:
              "Pertanyaan yang paling sering masuk: kalau badan tinggi tapi kurus, ambil ukuran apa? Jawabannya ada di panjang badan, bukan lingkar dada. Ini penjelasannya.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Kolom komentar unggahan {{brand}} sepekan terakhir",
            catatan: "Nama pengirim komentar ditutup untuk menjaga privasinya.",
          },
          points: [
            "Tipe visual: Reels 30 detik yang menjawab tangkapan layar komentar.",
            "Judul: Menjawab Pertanyaan Kalian soal Ukuran.",
            "Platform: Instagram Reels dan TikTok.",
            "Catatan: nama pengirim komentar ditutup untuk menjaga privasi.",
          ],
        },
        {
          id: "d3c",
          headline: "Story: jajak pendapat jenis olahraga audiens",
          fields: {
            pilar: "{{pilar2}}",
            tipeVisual: "Rangkaian Story dengan stiker jajak pendapat",
            judul: "Kamu Tim Lari atau Tim Angkat Beban?",
            copywriting:
              "Kami sedang menyiapkan koleksi berikutnya dan ingin tahu kamu lebih sering latihan apa. Pilih salah satu, hasilnya kami bagikan besok.",
            platform: "Instagram Story",
            referensi: "Story jajak pendapat di akun brand olahraga lokal sebagai acuan bentuk pertanyaan",
            catatan: "Hasil jajak pendapat diumumkan keesokan harinya agar audiens kembali membuka akun.",
          },
          points: [
            "Tipe visual: rangkaian Story dengan stiker jajak pendapat.",
            "Judul: Kamu Tim Lari atau Tim Angkat Beban?",
            "Platform: Instagram Story.",
            "Catatan: hasilnya diumumkan besok supaya audiens kembali membuka akun.",
          ],
        },
        {
          id: "d3d",
          headline: "Carousel: memilih koleksi sesuai jenis olahraga",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Carousel 6 halaman, satu olahraga per halaman",
            judul: "Baju yang Cocok untuk Tiap Jenis Olahraga",
            copywriting:
              "Lari butuh bahan yang ringan, angkat beban butuh potongan yang tidak mengganggu bahu, yoga butuh bahan yang lentur. Geser untuk melihat mana yang cocok untuk latihanmu.",
            platform: "Instagram feed dan TikTok carousel",
            referensi: "Panduan pemilihan produk di akun @ortuseight sebagai acuan pengelompokan",
            catatan: "Tiap halaman memakai satu warna latar berbeda agar pembaca terdorong menggeser.",
          },
          points: [
            "Tipe visual: Carousel 6 halaman, satu jenis olahraga per halaman.",
            "Judul: Baju yang Cocok untuk Tiap Jenis Olahraga.",
            "Platform: Instagram feed dan TikTok carousel.",
            "Catatan: warna latar berbeda tiap halaman supaya pembaca terdorong menggeser.",
          ],
        },
        {
          id: "d3e",
          headline: "Reels: menjaga semangat saat latihan terasa berat",
          fields: {
            pilar: "{{pilar2}}",
            tipeVisual: "Reels 30 detik, rekaman perjalanan latihan",
            judul: "Minggu Ketiga Biasanya yang Paling Berat",
            copywriting:
              "Semangat awal biasanya habis di minggu ketiga. Yang membantu bukan motivasi, tapi menurunkan target sementara supaya kebiasaannya tidak putus.",
            platform: "Instagram Reels dan TikTok",
            referensi: "Konten motivasi latihan di akun komunitas lari sebagai acuan nada bicara",
            catatan: "Nada bicara dibuat menenangkan, bukan menggurui.",
          },
          points: [
            "Tipe visual: Reels 30 detik berisi rekaman perjalanan latihan.",
            "Judul: Minggu Ketiga Biasanya yang Paling Berat.",
            "Platform: Instagram Reels dan TikTok.",
            "Catatan: nada bicara menenangkan, bukan menggurui.",
          ],
        },
        {
          id: "d3f",
          headline: "Feed: cerita pemakai setelah tiga bulan",
          fields: {
            pilar: "{{pilar4}}",
            tipeVisual: "Foto feed dengan kutipan pemakai",
            judul: "Tiga Bulan Dipakai, Begini Kondisinya",
            copywriting:
              "Kami minta salah satu pembeli mengirim foto produknya setelah tiga bulan dipakai latihan rutin. Tidak diperbaiki, tidak difoto ulang di studio. Ini apa adanya.",
            platform: "Instagram feed",
            referensi: "Foto dan kutipan yang dikirim pembeli lewat pesan langsung",
            catatan: "Foto ditampilkan apa adanya tanpa penyuntingan agar tetap jujur.",
          },
          points: [
            "Tipe visual: foto feed disertai kutipan pemakai.",
            "Judul: Tiga Bulan Dipakai, Begini Kondisinya.",
            "Platform: Instagram feed.",
            "Catatan: foto ditampilkan apa adanya tanpa penyuntingan.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "d3x",
          headline: "Ajakan bertindak tidak jelas",
          fields: {
            pilar: "{{pilar1}}",
            tipeVisual: "Carousel 4 halaman",
            judul: "Tips Merawat Baju Olahraga",
            copywriting: "Ini beberapa tips merawat baju olahraga agar awet. Semoga bermanfaat.",
            platform: "Instagram feed",
            referensi: "Artikel perawatan pakaian olahraga",
            catatan: "Halaman terakhir berisi logo brand.",
          },
          points: [
            "Isi kontennya bermanfaat dan sesuai pilar edukasi.",
            "Tidak ada ajakan menyimpan, berkomentar, maupun mengunjungi tautan.",
            "Konten berguna tetapi tidak mendorong interaksi yang jadi objective pekan ini.",
          ],
        },
        {
          id: "d3y",
          headline: "Platform tidak sesuai formatnya",
          fields: {
            pilar: "{{pilar3}}",
            tipeVisual: "Carousel 8 halaman",
            judul: "Semua Koleksi September",
            copywriting: "Delapan koleksi terbaru bulan ini. Geser untuk melihat semuanya.",
            platform: "TikTok",
            referensi: "Katalog koleksi September",
            catatan: "Delapan halaman agar semua koleksi masuk.",
          },
          points: [
            "Judul dan copywriting sudah jelas menyampaikan isinya.",
            "Carousel delapan halaman jarang ditelusuri sampai habis di TikTok.",
            "Format ini lebih cocok untuk Instagram feed.",
          ],
        },
        {
          id: "d3z",
          headline: "Referensi konten tidak dicantumkan",
          fields: {
            pilar: "{{pilar2}}",
            tipeVisual: "Reels 20 detik",
            judul: "Pendinginan Setelah Lari",
            copywriting: "Jangan langsung duduk setelah lari. Lakukan tiga gerakan ini dulu.",
            platform: "Instagram Reels",
            referensi: "Belum mencari referensi",
            catatan: "Gerakan diperagakan sendiri oleh tim.",
          },
          points: [
            "Isi dan formatnya sudah sesuai untuk pilar inspirasi.",
            "Kolom referensi tidak diisi, padahal template memintanya.",
            "Tanpa referensi, tim produksi tidak punya acuan tempo maupun sudut pengambilan.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "d3p",
          headline: "Konten berisi klaim kesehatan berlebihan",
          fields: {
            pilar: "Produk",
            tipeVisual: "Reels 20 detik",
            judul: "Baju Ini Bikin Badan Cepat Kurus",
            copywriting: "Pakai baju ini saat olahraga, dijamin berat badan turun lebih cepat!",
            platform: "Instagram Reels dan TikTok",
            referensi: "Konten klaim serupa di akun penjual lain",
            catatan: "Klaim dibuat menarik agar cepat viral.",
          },
          points: [
            "Pakaian olahraga tidak menurunkan berat badan, jadi klaimnya menyesatkan.",
            "Berisiko melanggar ketentuan iklan dan merusak kepercayaan audiens.",
            "Pembeli yang kecewa setelah membeli tidak akan kembali.",
          ],
        },
        {
          id: "d3q",
          headline: "Konten kosong sekadar mengisi jadwal",
          fields: {
            pilar: "Hiburan",
            tipeVisual: "Foto stok dari internet",
            judul: "Selamat Hari Rabu",
            copywriting: "Selamat hari Rabu semuanya! Semangat terus ya.",
            platform: "Instagram feed",
            referensi: "Foto stok gratis dari internet",
            catatan: "Diunggah supaya jadwal hari ini terisi.",
          },
          points: [
            "Konten tidak menyampaikan apa pun tentang produk maupun audiens.",
            "Memakai foto stok membuat akun kehilangan ciri visualnya sendiri.",
            "Mengisi jadwal tanpa isi justru menurunkan rata-rata interaksi akun.",
          ],
        },
        {
          id: "d3r",
          headline: "Meminta audiens membagikan tanpa alasan",
          fields: {
            pilar: "Komunitas",
            tipeVisual: "Foto poster ajakan",
            judul: "Share Postingan Ini ke 10 Teman!",
            copywriting: "Bagikan postingan ini ke 10 temanmu untuk dapat hadiah. Jangan lupa follow!",
            platform: "Instagram feed",
            referensi: "Konten undian di akun lain",
            catatan: "Hadiah ditentukan belakangan.",
          },
          points: [
            "Meminta audiens membagikan tanpa memberi alasan yang bernilai bagi mereka.",
            "Hadiah yang belum ditentukan membuat janji brand tidak bisa ditepati.",
            "Interaksi yang datang dari undian tidak berlanjut setelah undiannya selesai.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 8. KOLOM OPERASIONAL — PIC dan status konten                        */
/* ================================================================== */

const picGroup: ChoiceGroup = {
  id: "pic",
  label: "PIC",
  question: "Pembagian penanggung jawab konten",
  hint: "Kolom PIC pada template menyebut siapa yang mengerjakan tiap konten.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pc1a",
          headline: "Dibagi per peran: naskah, visual, dan unggah",
          fields: { pic: "Naskah: Social Media Specialist · Visual: Desainer Grafis · Unggah: Social Media Officer" },
          points: [
            "Tiga peran berbeda memegang tiga tahap yang berbeda pula.",
            "Konten yang tertahan mudah ditelusuri karena jelas berhenti di tahap siapa.",
            "Cocok untuk tim yang anggotanya sudah punya keahlian masing-masing.",
          ],
        },
        {
          id: "pc1b",
          headline: "Satu PIC per hari, bergilir antar anggota",
          fields: { pic: "PIC harian bergilir antar anggota tim konten" },
          points: [
            "Satu orang memegang satu hari penuh, dari naskah sampai unggah.",
            "Beban kerja terbagi rata karena giliran berpindah tiap hari.",
            "Cocok untuk tim kecil yang anggotanya merangkap banyak peran.",
          ],
        },
        {
          id: "pc1c",
          headline: "Dibagi mengikuti pilar konten",
          fields: { pic: "Konten edukasi: Social Media Specialist · Konten produk: tim Kreatif · Konten komunitas: Community Officer" },
          points: [
            "Penanggung jawab ditentukan mengikuti pilar kontennya.",
            "Tiap orang mendalami satu jenis konten sehingga mutunya makin terjaga.",
            "Konten yang menyentuh dua pilar dikerjakan berpasangan.",
          ],
        },
        {
          id: "pc1d",
          headline: "Dibagi per platform",
          fields: { pic: "Instagram: Social Media Specialist · TikTok: Content Creator" },
          points: [
            "Gaya konten Instagram dan TikTok berbeda, jadi penanggung jawabnya dipisah.",
            "Tiap orang hafal kebiasaan audiens di platform yang dipegangnya.",
            "Materi yang dipakai di dua platform disiapkan bersama agar tidak dikerjakan dua kali.",
          ],
        },
        {
          id: "pc1e",
          headline: "Pelaksana dan pemeriksa dipisah",
          fields: { pic: "Pelaksana: Social Media Officer · Pemeriksa: Social Media Specialist" },
          points: [
            "Satu orang mengerjakan, satu orang lain memeriksa sebelum tayang.",
            "Kesalahan tertangkap sebelum konten sampai ke audiens.",
            "Cocok saat tim masih membangun standar mutu konten.",
          ],
        },
        {
          id: "pc1f",
          headline: "Berpindah mengikuti tahap produksi",
          fields: { pic: "Riset dan naskah: Social Media Specialist · Produksi visual: Videografer · Penjadwalan: Social Media Officer" },
          points: [
            "Konten berpindah tangan mengikuti tahap produksinya.",
            "Setiap perpindahan dicatat pada kolom notes agar riwayatnya terlacak.",
            "Hambatan yang berulang mudah dikenali dari catatan perpindahan itu.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pc2a",
          headline: "Satu nama untuk semua konten",
          fields: { pic: "Social Media Specialist" },
          points: [
            "Kolom PIC sudah terisi dan penanggung jawabnya jelas satu orang.",
            "Satu orang memegang semua tahap membuat produksi mudah tersendat.",
            "Tidak ada pengganti bila orang itu berhalangan.",
          ],
        },
        {
          id: "pc2b",
          headline: "Ditulis sebagai tim, bukan orang",
          fields: { pic: "Tim konten" },
          points: [
            "Sudah menyebut pihak yang mengerjakan.",
            "Tidak menunjuk orang tertentu, sehingga tidak ada yang merasa bertanggung jawab.",
            "Saat konten terlambat, tidak jelas siapa yang harus ditanya.",
          ],
        },
        {
          id: "pc2c",
          headline: "Peran jelas tetapi tanpa tenggat",
          fields: { pic: "Naskah: Social Media Specialist · Visual: Desainer Grafis" },
          points: [
            "Pembagian peran naskah dan visual sudah tepat.",
            "Tenggat tiap tahap tidak ditetapkan, jadi materi sering selesai di hari tayang.",
            "Jadwal unggah yang konsisten sulit dijaga tanpa batas waktu produksi.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pc3a",
          headline: "Siapa saja yang sedang senggang",
          fields: { pic: "Siapa saja yang sedang senggang" },
          points: [
            "Tidak ada penanggung jawab yang bisa ditagih bila konten terlambat.",
            "Mengulang masalah jadwal unggah tidak konsisten pada studi kasus.",
            "Kolom PIC terisi tetapi tidak berarti apa pun bagi tim.",
          ],
        },
        {
          id: "pc3b",
          headline: "Diserahkan ke pihak luar tanpa arahan",
          fields: { pic: "Jasa pembuat konten dari luar, tanpa panduan gaya" },
          points: [
            "Tanpa panduan gaya, hasilnya tidak akan konsisten dengan identitas {{brand}}.",
            "Content pillar yang sudah disusun tidak diteruskan ke pelaksana.",
            "Tim sendiri kehilangan pemahaman tentang audiensnya.",
          ],
        },
        {
          id: "pc3c",
          headline: "Ditentukan belakangan saat konten mau tayang",
          fields: { pic: "Ditentukan belakangan menjelang tayang" },
          points: [
            "Penanggung jawab baru dicari saat konten sudah harus tayang.",
            "Produksi selalu terburu-buru sehingga mutunya tidak terjaga.",
            "Kolom PIC pada content plan kehilangan fungsinya sebagai alat perencanaan.",
          ],
        },
      ],
    },
  ],
};

const statusGroup: ChoiceGroup = {
  id: "status",
  label: "Status Konten",
  question: "Alur status konten yang dipakai tim",
  hint: "Kolom Status Konten dipakai memantau konten mana yang siap tayang.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "st1a",
          headline: "Request → In Progress → Ready → Posted",
          fields: { status: "Request", alur: "Request → In Progress → Ready → Posted" },
          points: [
            "Empat tahap: Request saat direncanakan, In Progress saat dikerjakan, Ready saat siap tayang, Posted setelah diunggah.",
            "Semua baris dimulai dari Request, sesuai contoh pada template.",
            "Tahap Ready memisahkan konten yang selesai dari yang sudah tayang.",
          ],
        },
        {
          id: "st1b",
          headline: "Request → Draft → Review → Approved → Posted",
          fields: { status: "Request", alur: "Request → Draft → Review → Approved → Posted" },
          points: [
            "Menambahkan tahap Review sebelum konten disetujui tayang.",
            "Konten yang butuh perbaikan dikembalikan ke Draft, bukan langsung tayang.",
            "Cocok saat konten perlu persetujuan atasan sebelum diunggah.",
          ],
        },
        {
          id: "st1c",
          headline: "Request → On Process → Scheduled → Posted",
          fields: { status: "Request", alur: "Request → On Process → Scheduled → Posted" },
          points: [
            "Tahap Scheduled menandai konten yang sudah dijadwalkan di alat penjadwal.",
            "Membedakan konten yang tinggal menunggu jam tayang dari yang masih dikerjakan.",
            "Mengurangi risiko konten terlewat karena lupa diunggah manual.",
          ],
        },
        {
          id: "st1d",
          headline: "Request → In Progress → Revisi → Ready → Posted",
          fields: { status: "Request", alur: "Request → In Progress → Revisi → Ready → Posted" },
          points: [
            "Tahap Revisi dibuat terpisah agar konten yang diperbaiki mudah dihitung.",
            "Jumlah konten yang masuk Revisi menjadi ukuran mutu naskah awal.",
            "Konten hanya boleh masuk Ready setelah revisinya tuntas.",
          ],
        },
        {
          id: "st1e",
          headline: "Request → Produksi → Siap Tayang → Tayang → Evaluasi",
          fields: { status: "Request", alur: "Request → Produksi → Siap Tayang → Tayang → Evaluasi" },
          points: [
            "Menambahkan tahap Evaluasi setelah konten tayang.",
            "Hasil tiap konten dicatat sehingga pekan berikutnya bisa diperbaiki.",
            "Menutup lingkaran perencanaan, bukan berhenti saat konten diunggah.",
          ],
        },
        {
          id: "st1f",
          headline: "Request → Ready → Posted, ditinjau tiap pagi",
          fields: { status: "Request", alur: "Request → Ready → Posted, ditinjau tiap pagi" },
          points: [
            "Tiga tahap saja agar mudah dijalankan tim kecil.",
            "Status ditinjau bersama tiap pagi dalam rapat singkat.",
            "Konten yang masih Request pada H-2 langsung ditandai sebagai berisiko.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "st2a",
          headline: "Hanya dua tahap: belum dan sudah",
          fields: { status: "Belum dikerjakan", alur: "Belum dikerjakan → Sudah diunggah" },
          points: [
            "Pembagian dua tahap memang paling sederhana untuk dijalankan.",
            "Tidak ada tahap di antaranya, jadi konten yang sedang dikerjakan tidak terlihat.",
            "Sulit mengetahui konten mana yang berisiko terlambat.",
          ],
        },
        {
          id: "st2b",
          headline: "Tahap lengkap tetapi tanpa yang memperbarui",
          fields: { status: "Request", alur: "Request → In Progress → Ready → Posted, tanpa penanggung jawab pemutakhiran" },
          points: [
            "Tahapannya sudah lengkap dari perencanaan sampai tayang.",
            "Tidak ditentukan siapa yang memperbarui status, jadi kolomnya cepat basi.",
            "Status yang tidak diperbarui membuat pemantauan jadi menyesatkan.",
          ],
        },
        {
          id: "st2c",
          headline: "Status memakai warna saja tanpa nama tahap",
          fields: { status: "Ditandai warna kuning", alur: "Penandaan warna tanpa nama tahap" },
          points: [
            "Penandaan warna memang cepat dibaca sekilas.",
            "Tanpa nama tahap, anggota baru tidak tahu arti tiap warna.",
            "Kolom status pada template meminta keterangan, bukan sekadar warna.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "st3a",
          headline: "Semua langsung ditandai selesai",
          fields: { status: "Posted", alur: "Semua baris langsung ditandai Posted sejak perencanaan" },
          points: [
            "Menandai konten sebagai sudah tayang padahal baru direncanakan.",
            "Kolom status kehilangan fungsinya sebagai alat pemantauan.",
            "Tim tidak bisa mengetahui konten mana yang benar-benar belum dikerjakan.",
          ],
        },
        {
          id: "st3b",
          headline: "Status menyesuaikan keadaan",
          fields: { status: "Menyesuaikan", alur: "Tidak ada tahap tetap, istilahnya berbeda-beda tiap orang" },
          points: [
            "Tidak ada tahap yang ditetapkan sehingga status tidak bisa dibandingkan antarbaris.",
            "Setiap orang menuliskan status dengan istilah yang berbeda-beda.",
            "Pemantauan mingguan tidak bisa dilakukan.",
          ],
        },
        {
          id: "st3c",
          headline: "Tidak memakai kolom status",
          fields: { status: "Tidak dipakai", alur: "Kolom status tidak difungsikan" },
          points: [
            "Kolom yang diminta template sengaja dikosongkan fungsinya.",
            "Konten yang tertahan baru ketahuan saat hari tayang tiba.",
            "Masalah jadwal unggah tidak konsisten pada studi kasus berulang.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */

export const tpm2Groups: ChoiceGroup[] = [
  objective,
  pilar,
  jadwal,
  rencana,
  hari1,
  hari2,
  hari3,
  picGroup,
  statusGroup,
];

export const bankTpm2 = {
  objective,
  pilar,
  jadwal,
  rencana,
  hari1,
  hari2,
  hari3,
  picGroup,
  statusGroup,
};
