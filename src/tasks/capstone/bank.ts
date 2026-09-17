import type { ChoiceGroup } from "../types";

/**
 * BANK JAWABAN CAPSTONE: jalur mitra, brand "Sanggabiz".
 *
 * Susunannya mengikuti bagian-bagian yang diminta dokumen Capstone Project:
 * Business Context, Strategy Highlights, Technical Skill Evidence, Visual
 * Gallery, lalu Impact dan Closure untuk deck presentasinya.
 *
 * Tiap grade punya beberapa varian dan satu diambil acak per peserta, jadi dua
 * orang yang sama-sama memilih kartu "tepat" tetap menghasilkan dokumen yang
 * berbeda. Dengan sembilan grup, kombinasi jawaban tepatnya lebih dari dua
 * ratus ribu, sehingga hasil tiap peserta praktis tidak pernah kembar.
 *
 * Token yang tersedia: {{nama}}, {{brand}}, {{audiens}}.
 */

/* ================================================================== */
/* BAGIAN 1: BUSINESS CONTEXT                                        */
/* ================================================================== */

const konteks: ChoiceGroup = {
  id: "konteks",
  label: "Business Context",
  question: "Ringkasan profil {{brand}} untuk bagian Business Context di A3 Report",
  hint: "Dokumen capstone meminta ringkasan singkat profil UMKM. Pilih yang menjelaskan model bisnisnya, bukan sekadar menyebut namanya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "kon-t1",
          headline: "Virtual business partner yang menjual kelegaan operasional",
          fields: {
            isi: "{{brand}} adalah perusahaan konsultan dan pendampingan bisnis berbasis teknologi di Yogyakarta yang bekerja sebagai virtual business partner. Alih-alih menjual satu aplikasi, {{brand}} mengambil alih fungsi-fungsi operasional pemilik usaha, keuangan, penagihan, layanan pelanggan, sampai administrasi tim, lewat lima layanan yang saling terhubung. Yang sebenarnya dibeli pelanggan bukan perangkat lunaknya, melainkan waktu dan ketenangan untuk kembali mengurus pertumbuhan usahanya.",
          },
          points: [
            "Kategori: konsultan dan pendampingan bisnis berbasis teknologi, berbasis di Yogyakarta",
            "Model: virtual business partner, mengambil alih fungsi operasional pemilik usaha",
            "Nilai jual: bukan perangkat lunaknya, melainkan waktu dan ketenangan yang dikembalikan",
          ],
        },
        {
          id: "kon-t2",
          headline: "Satu paket operasional untuk usaha yang sudah digital tapi masih berantakan",
          fields: {
            isi: "{{brand}} menyasar celah yang jarang dibicarakan: banyak UMKM sudah berjualan daring, tetapi catatan keuangan, faktur, pajak, dan percakapan pelanggannya masih tersebar di banyak tempat. {{brand}} merapikan itu lewat satu rangkaian layanan, dasbor operasional, chatbot multikanal, pembukuan otomatis, sistem tim, dan konsultasi strategis, sehingga adopsi digital yang sudah dilakukan pemilik usaha akhirnya berubah menjadi kendali yang sebenarnya.",
          },
          points: [
            "Masalah yang diangkat: usaha sudah digital, tetapi operasionalnya masih tersebar",
            "Solusi: satu rangkaian layanan yang menyatukan keuangan, pelanggan, dan tim",
            "Hasil yang dijanjikan: adopsi digital berubah menjadi kendali operasional",
          ],
        },
        {
          id: "kon-t3",
          headline: "Perusahaan women-led dengan misi inklusi digital",
          fields: {
            isi: "{{brand}} adalah perusahaan berbasis di Yogyakarta yang dipimpin perempuan dan menempatkan inklusi sebagai bagian dari model bisnisnya, bukan sekadar program sampingan. Lewat inisiatif SanggaTech for Her, {{brand}} membuka akses teknologi dan pendampingan bagi pelaku UMKM perempuan, wirausaha muda, dan penyandang disabilitas, kelompok yang selama ini paling jarang disentuh layanan konsultan bisnis. Posisi ini membuat ceritanya berbeda dari penyedia jasa sejenis.",
          },
          points: [
            "Identitas: perusahaan women-led berbasis di Yogyakarta",
            "Inklusi ditempatkan di dalam model bisnis, bukan sebagai program sampingan",
            "Pembeda: menjangkau kelompok yang jarang disentuh layanan konsultan bisnis",
          ],
        },
        {
          id: "kon-t4",
          headline: "Pendampingan bertahap lewat metode Realign, Automate, People, Impact",
          fields: {
            isi: "{{brand}} mendampingi pelaku usaha melalui empat tahap berurutan: Realign untuk memetakan masalah yang sebenarnya, Automate untuk merapikan alur kerja yang berulang, People untuk menguatkan tim dan kepemimpinannya, lalu Impact untuk memastikan perbaikan itu bertahan. Struktur bertahap inilah yang membedakan {{brand}} dari penyedia perangkat lunak biasa, pelanggan tidak dilepas dengan akun baru, melainkan ditemani sampai cara kerjanya benar-benar berubah.",
          },
          points: [
            "Metode: empat tahap berurutan yaitu Realign, Automate, People, Impact",
            "Fokus tiap tahap: memetakan masalah, merapikan alur, menguatkan tim, menjaga hasil",
            "Pembeda: pelanggan didampingi sampai cara kerjanya berubah, bukan sekadar diberi akun",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "kon-s1",
          headline: "Penyedia jasa konsultan bisnis di Yogyakarta",
          fields: {
            isi: "{{brand}} adalah penyedia jasa konsultan bisnis yang berkantor di Yogyakarta dan melayani pelaku UMKM. Layanannya mencakup konsultasi, pelatihan, dan dukungan operasional untuk membantu pemilik usaha menjalankan bisnisnya.",
          },
          points: [
            "Kategori dan lokasi sudah benar",
            "Layanan disebut secara umum tanpa menjelaskan model virtual business partner",
            "Belum terlihat apa yang membedakannya dari konsultan bisnis lain",
          ],
        },
        {
          id: "kon-s2",
          headline: "Perusahaan teknologi yang memakai AI untuk membantu UMKM",
          fields: {
            isi: "{{brand}} adalah perusahaan teknologi yang memanfaatkan kecerdasan buatan untuk membantu UMKM. Perusahaan ini menyediakan beberapa produk digital yang bisa dipakai pemilik usaha untuk mengelola bisnisnya sehari-hari.",
          },
          points: [
            "Menyebut AI dan sasaran UMKM dengan benar",
            "Menggambarkan {{brand}} sebagai penjual produk, bukan mitra operasional",
            "Lima layanan intinya tidak disebut sehingga cakupannya kabur",
          ],
        },
        {
          id: "kon-s3",
          headline: "Usaha yang memberi pelatihan untuk pelaku usaha perempuan",
          fields: {
            isi: "{{brand}} adalah usaha yang memberikan pelatihan dan pendampingan kepada pelaku usaha, dengan perhatian khusus pada perempuan dan anak muda. Kegiatannya berupa workshop dan pendampingan bisnis.",
          },
          points: [
            "Sisi inklusi dan pelatihan sudah ditangkap",
            "Sisi teknologi dan layanan operasional hilang sama sekali",
            "Terbaca seperti lembaga pelatihan, bukan perusahaan penyedia layanan bisnis",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "kon-k1",
          headline: "Brand lokal yang sedang berkembang pesat",
          fields: {
            isi: "{{brand}} adalah sebuah brand lokal yang sedang berkembang pesat dan memiliki banyak pelanggan setia. Perusahaan ini terus berinovasi untuk memberikan yang terbaik bagi konsumennya.",
          },
          points: [
            "Tidak menyebut bidang usaha maupun layanannya",
            "Kalimatnya bisa dipakai untuk perusahaan mana pun",
            "Tidak bisa dipakai mitra untuk menilai kecocokan",
          ],
        },
        {
          id: "kon-k2",
          headline: "Perusahaan dengan visi dan misi yang kuat",
          fields: {
            isi: "{{brand}} merupakan perusahaan yang memiliki visi dan misi yang kuat serta berkomitmen tinggi terhadap kepuasan pelanggan. Dengan tim yang solid, {{brand}} siap bersaing di era digital.",
          },
          points: [
            "Hanya berisi kalimat promosi tanpa keterangan usaha",
            "Tidak ada model bisnis, sasaran, maupun layanan yang bisa dipakai",
            "Bagian Business Context menjadi kosong secara isi",
          ],
        },
        {
          id: "kon-k3",
          headline: "Toko daring yang menjual berbagai kebutuhan",
          fields: {
            isi: "{{brand}} adalah toko daring yang menjual berbagai macam kebutuhan sehari-hari dengan harga terjangkau dan pengiriman cepat ke seluruh Indonesia.",
          },
          points: [
            "Salah kategori: {{brand}} bukan toko daring",
            "Seluruh strategi yang dibangun di atasnya ikut meleset",
            "Mitra akan langsung melihat risetnya tidak dilakukan",
          ],
        },
      ],
    },
  ],
};

const audiens: ChoiceGroup = {
  id: "audiens",
  label: "Target Audiens",
  question: "Target audiens yang disasar {{brand}} di media sosial",
  hint: "Sebut siapa yang dituju beserta keadaan yang membuatnya butuh layanan ini, bukan sekadar rentang usia.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "aud-t1",
          headline: "Pemilik UMKM perempuan yang merangkap semua peran",
          fields: {
            nama: "pemilik UMKM perempuan usia 27-40 di kota menengah",
            isi: "Perempuan pemilik usaha berusia 27-40 tahun di kota menengah seperti Yogyakarta, Solo, dan Semarang, yang menjalankan usahanya sambil merangkap sebagai pencatat keuangan, admin chat, sekaligus pengurus rumah tangga. Omzetnya sudah stabil tetapi waktunya habis di pekerjaan administratif. Ia aktif di Instagram pada malam hari setelah anak tidur, dan paling tertarik pada konten yang menunjukkan cara merapikan pekerjaan, bukan yang menyuruhnya bekerja lebih keras.",
          },
          points: [
            "Siapa: perempuan pemilik usaha 27-40 tahun di kota menengah Jawa Tengah dan DIY",
            "Keadaan: omzet sudah stabil, tetapi waktunya habis di pekerjaan administratif",
            "Kebiasaan: aktif di Instagram malam hari, tertarik konten yang merapikan pekerjaan",
          ],
        },
        {
          id: "aud-t2",
          headline: "Wirausaha muda yang usahanya tumbuh lebih cepat dari sistemnya",
          fields: {
            nama: "wirausaha muda 23-32 tahun yang usahanya baru melonjak",
            isi: "Wirausaha berusia 23-32 tahun yang usahanya baru saja melonjak, pesanan naik, tim bertambah dua sampai lima orang, tetapi pencatatannya masih memakai catatan pribadi dan pesan yang berserak. Ia melek teknologi dan tidak takut mencoba alat baru, namun belum tahu mana yang benar-benar perlu. Ia mencari rujukan lewat Instagram dan LinkedIn, dan percaya pada cerita pemilik usaha lain yang keadaannya mirip dengan dirinya.",
          },
          points: [
            "Siapa: wirausaha 23-32 tahun dengan tim 2-5 orang yang baru bertambah",
            "Keadaan: pesanan naik lebih cepat daripada kerapian sistemnya",
            "Kebiasaan: mencari rujukan di Instagram dan LinkedIn, percaya cerita sesama pemilik usaha",
          ],
        },
        {
          id: "aud-t3",
          headline: "Pemilik usaha yang sudah digital tapi datanya tercerai-berai",
          fields: {
            nama: "pemilik usaha 30-45 tahun dengan operasional yang terpencar",
            isi: "Pemilik usaha berusia 30-45 tahun yang sudah berjualan di marketplace dan media sosial, tetapi datanya terpencar di banyak tempat: penjualan di satu aplikasi, catatan keuangan di lembar kerja, percakapan pelanggan di dua nomor berbeda. Setiap akhir bulan ia kehilangan waktu berjam-jam hanya untuk menyatukannya. Ia bukan orang yang anti teknologi, justru sudah memakai banyak, hanya tidak terhubung satu sama lain.",
          },
          points: [
            "Siapa: pemilik usaha 30-45 tahun yang sudah berjualan daring",
            "Keadaan: data penjualan, keuangan, dan percakapan tersebar di banyak tempat",
            "Titik sakit: berjam-jam hilang tiap akhir bulan hanya untuk menyatukan catatan",
          ],
        },
        {
          id: "aud-t4",
          headline: "Wirausaha penyandang disabilitas yang butuh sistem kerja lentur",
          fields: {
            nama: "wirausaha penyandang disabilitas usia 25-40 tahun",
            isi: "Wirausaha penyandang disabilitas berusia 25-40 tahun yang menjalankan usahanya dari rumah dan membutuhkan sistem kerja yang lentur serta alat yang mudah diakses. Kelompok ini jarang disasar penyedia jasa bisnis, padahal kebutuhannya paling terbantu oleh otomasi: makin banyak pekerjaan berulang yang bisa diambil alih sistem, makin besar ruang yang tersisa untuk mengurus produk dan pelanggan.",
          },
          points: [
            "Siapa: wirausaha penyandang disabilitas 25-40 tahun yang berusaha dari rumah",
            "Kebutuhan: sistem kerja lentur dan alat yang mudah diakses",
            "Peluang: kelompok ini jarang disasar pesaing, padahal paling terbantu otomasi",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "aud-s1",
          headline: "Pelaku UMKM di Indonesia usia 25-45 tahun",
          fields: {
            nama: "pelaku UMKM 25-45 tahun",
            isi: "Pelaku UMKM di Indonesia berusia 25 sampai 45 tahun yang ingin mengembangkan usahanya dan tertarik memakai teknologi untuk membantu pekerjaan sehari-hari.",
          },
          points: [
            "Rentang usia dan kategori usaha sudah disebut",
            "Keadaan dan titik sakitnya belum tergambar",
            "Terlalu luas untuk menentukan bentuk konten yang tepat",
          ],
        },
        {
          id: "aud-s2",
          headline: "Perempuan pengusaha yang aktif di media sosial",
          fields: {
            nama: "perempuan pengusaha yang aktif bermedia sosial",
            isi: "Perempuan pengusaha yang aktif menggunakan media sosial, terutama Instagram, untuk mempromosikan usahanya dan mencari informasi seputar bisnis.",
          },
          points: [
            "Jenis kelamin dan kanal sudah tepat sasaran",
            "Belum menjelaskan masalah operasional yang mau dipecahkan {{brand}}",
            "Belum bisa dipakai menyusun pesan yang spesifik",
          ],
        },
        {
          id: "aud-s3",
          headline: "Pemilik bisnis yang ingin lebih efisien",
          fields: {
            nama: "pemilik bisnis yang ingin efisien",
            isi: "Pemilik bisnis yang ingin usahanya berjalan lebih efisien dan hemat biaya, sehingga tertarik dengan layanan yang bisa membantu mengurangi beban pekerjaan.",
          },
          points: [
            "Motivasinya benar, tetapi tidak ada penanda siapa orangnya",
            "Tanpa usia, lokasi, atau keadaan usaha, profilnya belum terbentuk",
            "Sulit diturunkan menjadi pilihan kanal dan gaya bahasa",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "aud-k1",
          headline: "Semua orang yang punya usaha",
          fields: {
            nama: "semua pemilik usaha",
            isi: "Semua orang yang memiliki usaha, baik kecil maupun besar, dari berbagai kalangan dan daerah di seluruh Indonesia.",
          },
          points: [
            "Tidak ada penyempitan sama sekali",
            "Menyasar semua orang berarti tidak menyasar siapa pun",
            "Konten yang lahir dari sini akan kehilangan arah",
          ],
        },
        {
          id: "aud-k2",
          headline: "Anak muda yang suka teknologi",
          fields: {
            nama: "anak muda penyuka teknologi",
            isi: "Anak muda yang suka teknologi dan gadget terbaru serta aktif di berbagai media sosial setiap harinya.",
          },
          points: [
            "Tidak berkaitan dengan kepemilikan usaha",
            "Suka teknologi bukan alasan orang membeli layanan operasional",
            "Salah sasaran sejak awal",
          ],
        },
        {
          id: "aud-k3",
          headline: "Pelanggan yang mencari harga termurah",
          fields: {
            nama: "pencari harga termurah",
            isi: "Pelanggan yang sedang mencari layanan dengan harga paling murah di pasaran dan gemar membandingkan penawaran dari banyak penyedia.",
          },
          points: [
            "Bertabrakan dengan posisi {{brand}} sebagai mitra jangka panjang",
            "Audiens seperti ini berpindah begitu ada yang lebih murah",
            "Tidak mendukung layanan berbasis pendampingan",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* BAGIAN 2: STRATEGY HIGHLIGHTS                                     */
/* ================================================================== */

const pilar: ChoiceGroup = {
  id: "pilar",
  label: "Pilar Konten",
  question: "Pilar konten yang menopang strategi {{brand}}",
  hint: "Pilar konten adalah beberapa tema tetap yang diputar bergantian. Pilih yang tiap pilarnya punya tugas berbeda.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pil-t1",
          headline: "Empat pilar: Masalah, Bukti, Cara, dan Wajah",
          fields: {
            isi: "Strategi kontennya bertumpu pada empat pilar yang masing-masing punya tugas berbeda. Masalah mengangkat keadaan sehari-hari {{audiens}} supaya ia merasa dikenali. Bukti menampilkan hasil nyata pendampingan dalam bentuk angka dan cerita. Cara memberi langkah praktis yang bisa langsung dicoba tanpa perlu membeli apa pun. Wajah memperkenalkan tim di balik {{brand}} agar layanan yang tidak kasatmata ini punya sosok yang bisa dipercaya.",
          },
          points: [
            "Masalah: mengangkat keadaan sehari-hari audiens supaya merasa dikenali",
            "Bukti: hasil nyata pendampingan dalam bentuk angka dan cerita",
            "Cara: langkah praktis yang bisa dicoba tanpa membeli apa pun",
            "Wajah: memperkenalkan tim agar layanan tak kasatmata punya sosok terpercaya",
          ],
        },
        {
          id: "pil-t2",
          headline: "Tiga pilar berbasis tahapan pendampingan",
          fields: {
            isi: "Pilar kontennya mengikuti cara kerja {{brand}} sendiri. Realign berisi konten yang membantu audiens mengenali masalah operasionalnya lebih dahulu, sering kali mereka belum sadar di mana kebocorannya. Automate menunjukkan pekerjaan berulang apa saja yang sebenarnya bisa diserahkan pada sistem. Impact menutup dengan hasil yang terjadi setelah pendampingan berjalan. Urutan ini membuat calon pelanggan bergerak dari sadar, paham, lalu yakin.",
          },
          points: [
            "Realign: membantu audiens mengenali masalah operasionalnya lebih dahulu",
            "Automate: menunjukkan pekerjaan berulang yang bisa diserahkan pada sistem",
            "Impact: menampilkan hasil setelah pendampingan berjalan",
            "Urutannya menggiring audiens dari sadar, paham, lalu yakin",
          ],
        },
        {
          id: "pil-t3",
          headline: "Empat pilar dengan porsi 40-30-20-10",
          fields: {
            isi: "Empat pilar dijalankan dengan porsi yang sengaja tidak sama rata. Edukasi operasional mendapat porsi terbesar empat puluh persen karena inilah yang membuat audiens kembali. Studi kasus tiga puluh persen untuk membangun kepercayaan. Konten inklusi dua puluh persen mengangkat perempuan dan wirausaha muda yang didampingi, sekaligus menegaskan posisi {{brand}}. Ajakan bertindak hanya sepuluh persen supaya beranda tidak berubah menjadi etalase jualan.",
          },
          points: [
            "Edukasi operasional 40%: alasan utama audiens kembali",
            "Studi kasus 30%: membangun kepercayaan lewat hasil nyata",
            "Konten inklusi 20%: mengangkat audiens yang didampingi sekaligus menegaskan posisi",
            "Ajakan bertindak 10%: dijaga kecil agar beranda tidak jadi etalase",
          ],
        },
        {
          id: "pil-t4",
          headline: "Tiga pilar yang membalas tiga keberatan calon pelanggan",
          fields: {
            isi: "Tiap pilar dirancang membalas satu keberatan yang paling sering muncul. Pilar Hemat Waktu menjawab keraguan \"tidak sempat belajar sistem baru\" dengan menunjukkan berapa jam yang kembali setiap pekan. Pilar Aman menjawab \"data usaha saya bagaimana\" dengan menegaskan kepemilikan data tetap di tangan pemilik usaha. Pilar Terjangkau menjawab \"pasti mahal\" lewat perbandingan biaya dengan merekrut staf tetap.",
          },
          points: [
            "Hemat Waktu: menjawab keraguan \"tidak sempat belajar sistem baru\"",
            "Aman: menjawab kekhawatiran soal kepemilikan data usaha",
            "Terjangkau: menjawab anggapan mahal lewat perbandingan biaya staf tetap",
            "Tiap pilar punya satu keberatan yang jelas untuk dibalas",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pil-s1",
          headline: "Edukasi, promosi, dan hiburan",
          fields: {
            isi: "Konten dibagi menjadi tiga jenis, yaitu konten edukasi untuk memberi pengetahuan, konten promosi untuk menawarkan layanan, dan konten hiburan agar audiens tidak bosan mengikuti akun ini.",
          },
          points: [
            "Pembagiannya masuk akal dan mudah dijalankan",
            "Belum dikaitkan dengan layanan maupun audiens {{brand}}",
            "Pilar seperti ini bisa dipakai akun mana pun",
          ],
        },
        {
          id: "pil-s2",
          headline: "Tips bisnis, testimoni, dan info layanan",
          fields: {
            isi: "Pilar kontennya terdiri dari tips bisnis untuk menarik perhatian, testimoni pelanggan untuk membangun kepercayaan, dan informasi layanan supaya audiens tahu apa yang ditawarkan.",
          },
          points: [
            "Sudah ada niat membangun kepercayaan lewat testimoni",
            "Tips bisnis masih terlalu umum, belum menyentuh masalah operasional",
            "Belum ada pengaturan porsi antar pilar",
          ],
        },
        {
          id: "pil-s3",
          headline: "Konten harian mengikuti tren yang sedang ramai",
          fields: {
            isi: "Konten disusun mengikuti tren yang sedang ramai di media sosial agar jangkauannya luas, lalu disisipi pesan tentang layanan {{brand}} di bagian akhir.",
          },
          points: [
            "Bisa menambah jangkauan dalam waktu singkat",
            "Tidak ada tema tetap sehingga akun kehilangan wajah",
            "Audiens datang karena trennya, bukan karena layanannya",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pil-k1",
          headline: "Semua konten berisi penawaran layanan",
          fields: {
            isi: "Setiap unggahan berisi penawaran layanan {{brand}} lengkap dengan daftar harga dan ajakan menghubungi admin, supaya audiens langsung tahu apa yang dijual.",
          },
          points: [
            "Beranda berubah menjadi katalog dan cepat ditinggalkan",
            "Tidak ada alasan bagi audiens untuk mengikuti akun",
            "Kepercayaan tidak pernah sempat terbentuk",
          ],
        },
        {
          id: "pil-k2",
          headline: "Mengunggah apa saja yang penting rutin",
          fields: {
            isi: "Yang penting akun aktif setiap hari, jadi konten apa saja boleh diunggah asal ada yang tayang, mulai dari kutipan motivasi sampai ucapan hari besar.",
          },
          points: [
            "Tidak ada pilar sama sekali, hanya mengejar rutinitas",
            "Audiens tidak pernah tahu apa yang bisa diharapkan dari akun ini",
            "Bagian Strategy Highlights menjadi kosong secara isi",
          ],
        },
        {
          id: "pil-k3",
          headline: "Mengikuti persis akun pesaing",
          fields: {
            isi: "Pilar kontennya menyalin akun pesaing yang jumlah pengikutnya paling banyak, dengan tema dan gaya yang dibuat semirip mungkin agar hasilnya ikut serupa.",
          },
          points: [
            "Menghapus pembeda {{brand}} sebagai perusahaan women-led",
            "Yang berhasil di akun lain belum tentu cocok dengan audiens berbeda",
            "Tidak bisa disebut strategi karena tidak berangkat dari tujuan sendiri",
          ],
        },
      ],
    },
  ],
};

const kalender: ChoiceGroup = {
  id: "kalender",
  label: "Ritme Konten",
  question: "Ritme unggahan dan susunan kalender konten",
  hint: "Dokumen capstone meminta penjelasan kalender konten beserta alasan pemilihan topiknya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "kal-t1",
          headline: "Empat unggahan sepekan dengan hari tetap",
          fields: {
            isi: "Empat unggahan setiap pekan pada hari tetap: Selasa untuk konten masalah, Kamis untuk langkah praktis, Sabtu untuk studi kasus, dan Minggu malam untuk konten ringan yang menampilkan tim. Jadwal tetap membuat audiens hafal kapan harus menengok, dan jumlah empat dipilih karena masih bisa dijaga satu orang tanpa mengorbankan mutu. Jam tayangnya sekitar pukul delapan malam, saat {{audiens}} sudah selesai dengan pekerjaan hariannya.",
          },
          points: [
            "Empat unggahan sepekan pada hari tetap: Selasa, Kamis, Sabtu, Minggu malam",
            "Jumlahnya dipilih agar masih terjaga mutunya bila dikerjakan satu orang",
            "Jam tayang pukul delapan malam, saat audiens selesai bekerja",
          ],
        },
        {
          id: "kal-t2",
          headline: "Siklus empat pekan mengikuti perjalanan calon pelanggan",
          fields: {
            isi: "Kalendernya disusun dalam siklus empat pekan yang mengikuti perjalanan calon pelanggan. Pekan pertama membangun kesadaran lewat konten masalah. Pekan kedua memberi pemahaman lewat langkah praktis. Pekan ketiga membangun kepercayaan lewat studi kasus dan testimoni. Pekan keempat baru membuka ajakan konsultasi. Setelah itu siklusnya berulang dengan tema yang diperbarui, sehingga pengikut baru tetap mendapat urutan yang utuh.",
          },
          points: [
            "Siklus empat pekan: kesadaran, pemahaman, kepercayaan, lalu ajakan",
            "Ajakan konsultasi hanya dibuka di pekan keempat",
            "Siklus berulang sehingga pengikut baru tetap mendapat urutan utuh",
          ],
        },
        {
          id: "kal-t3",
          headline: "Tiga unggahan sepekan plus cerita harian",
          fields: {
            isi: "Tiga unggahan utama setiap pekan untuk beranda, ditambah cerita singkat harian yang menampilkan pekerjaan di balik layar. Unggahan utama dikerjakan sekaligus di awal bulan supaya mutunya terjaga, sementara cerita harian dibuat spontan agar akun tetap terasa hidup. Pembagian ini menahan beban produksi tetap masuk akal, bagian yang berat disiapkan jauh hari, bagian yang ringan menyesuaikan keadaan.",
          },
          points: [
            "Tiga unggahan beranda sepekan, disiapkan sekaligus di awal bulan",
            "Cerita harian dibuat spontan agar akun tetap terasa hidup",
            "Beban produksi dibagi: yang berat disiapkan jauh hari, yang ringan menyesuaikan",
          ],
        },
        {
          id: "kal-t4",
          headline: "Ritme mengikuti siklus kesibukan pemilik usaha",
          fields: {
            isi: "Ritme unggahan menyesuaikan siklus kesibukan {{audiens}}. Awal bulan diisi konten tentang menutup pembukuan dan menagih faktur, karena di situlah pekerjaan menumpuk. Pertengahan bulan berisi langkah praktis yang lebih ringan. Akhir bulan kembali ke konten perencanaan. Dengan begitu setiap unggahan datang tepat saat masalahnya sedang terasa, bukan saat audiens sedang tidak memikirkannya.",
          },
          points: [
            "Awal bulan: konten menutup pembukuan dan menagih faktur",
            "Pertengahan bulan: langkah praktis yang lebih ringan",
            "Akhir bulan: konten perencanaan untuk bulan berikutnya",
            "Konten datang tepat saat masalahnya sedang terasa",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "kal-s1",
          headline: "Tiga kali seminggu tanpa hari tetap",
          fields: {
            isi: "Unggahan dilakukan sekitar tiga kali dalam seminggu, menyesuaikan kesiapan bahan konten yang sudah dibuat. Harinya tidak ditetapkan supaya lebih lentur.",
          },
          points: [
            "Jumlah unggahan sudah masuk akal untuk dijaga",
            "Tanpa hari tetap, audiens tidak terbentuk kebiasaannya",
            "Alasan pemilihan topik belum dijelaskan sama sekali",
          ],
        },
        {
          id: "kal-s2",
          headline: "Setiap hari mengikuti jam ramai",
          fields: {
            isi: "Konten diunggah setiap hari pada jam-jam ramai media sosial, yaitu pagi sebelum kerja dan malam sebelum tidur, agar peluang terlihat audiens lebih besar.",
          },
          points: [
            "Pemilihan jam tayangnya sudah tepat",
            "Unggahan harian sulit dijaga mutunya untuk tim kecil",
            "Belum ada pembagian tema per hari",
          ],
        },
        {
          id: "kal-s3",
          headline: "Kalender bulanan berisi daftar tanggal dan judul",
          fields: {
            isi: "Dibuat kalender bulanan yang berisi daftar tanggal beserta judul konten yang akan diunggah, sehingga tim tahu apa yang harus disiapkan setiap harinya.",
          },
          points: [
            "Sudah berbentuk kalender yang bisa dikerjakan tim",
            "Hanya berisi judul, tanpa alasan mengapa topik itu dipilih",
            "Dokumen capstone secara khusus meminta alasan pemilihan topik",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "kal-k1",
          headline: "Mengunggah saat ada waktu luang",
          fields: {
            isi: "Konten diunggah kapan saja ketika ada waktu luang dan ada ide yang muncul, tanpa jadwal khusus supaya tidak membebani.",
          },
          points: [
            "Tidak ada ritme yang bisa dijadikan pegangan",
            "Akun akan tampak hidup lalu menghilang berganti-ganti",
            "Tidak bisa disebut kalender konten",
          ],
        },
        {
          id: "kal-k2",
          headline: "Sebanyak-banyaknya setiap hari",
          fields: {
            isi: "Unggah sebanyak mungkin setiap hari, bisa lima sampai sepuluh konten, supaya jangkauannya maksimal dan akun cepat besar.",
          },
          points: [
            "Beban produksinya tidak mungkin dijaga",
            "Mutu turun dan pengikut terganggu oleh banjir unggahan",
            "Jangkauan besar tidak berarti bila audiensnya pergi",
          ],
        },
        {
          id: "kal-k3",
          headline: "Menunggu sampai ada tren baru",
          fields: {
            isi: "Menunggu sampai muncul tren baru yang sedang ramai, baru membuat konten mengikuti tren tersebut agar tidak ketinggalan zaman.",
          },
          points: [
            "Jadwalnya sepenuhnya bergantung pada hal di luar kendali",
            "Bisa berhari-hari tanpa unggahan sama sekali",
            "Pesan {{brand}} tenggelam di balik tren yang tidak berkaitan",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* BAGIAN 3: TECHNICAL SKILL EVIDENCE                                */
/* ================================================================== */

const hook: ChoiceGroup = {
  id: "hook",
  label: "Visual Hook",
  question: "Visual hook yang dipakai pada detik pertama konten",
  hint: "Dokumen capstone meminta penjelasan mengapa visual hook tertentu dipakai. Pilih yang alasannya bisa dijelaskan.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "hok-t1",
          headline: "Layar terbelah: meja berantakan lawan dasbor rapi",
          fields: {
            isi: "Bingkai pertama membelah layar menjadi dua: sisi kiri menampilkan meja penuh nota, ponsel dengan pesan menumpuk, dan buku catatan terbuka; sisi kanan menampilkan satu dasbor bersih berisi angka yang sama. Perbandingan ini bekerja karena {{audiens}} mengenali sisi kiri sebagai mejanya sendiri, lalu menyadari ada kemungkinan lain dalam satu tarikan pandang, tanpa perlu satu kata pun dibaca.",
          },
          points: [
            "Bentuk: layar terbelah, meja penuh nota di kiri dan dasbor bersih di kanan",
            "Alasan: audiens mengenali sisi kiri sebagai mejanya sendiri",
            "Kekuatan: perbandingannya tertangkap tanpa perlu membaca satu kata pun",
          ],
        },
        {
          id: "hok-t2",
          headline: "Angka besar berwarna magenta di tengah layar kosong",
          fields: {
            isi: "Satu angka dicetak sangat besar dengan warna magenta di tengah bidang putih yang lapang, misalnya angka jam kerja yang hilang setiap bulan untuk merapikan catatan. Latar yang sengaja dibiarkan kosong membuat angka itu tidak punya saingan di layar. Magenta dipakai justru karena jarang muncul di beranda yang didominasi biru dan hitam, sehingga gulirannya tertahan sepersekian detik, dan sepersekian detik itulah yang dibutuhkan.",
          },
          points: [
            "Bentuk: satu angka besar berwarna magenta di tengah bidang putih yang lapang",
            "Alasan: latar kosong membuat angka itu tidak punya saingan di layar",
            "Pemilihan warna: magenta jarang muncul di beranda yang didominasi biru dan hitam",
          ],
        },
        {
          id: "hok-t3",
          headline: "Tangan menutup belasan tab sekaligus",
          fields: {
            isi: "Tiga detik pertama menampilkan rekaman layar berisi belasan tab dan aplikasi yang terbuka bersamaan, lalu satu per satu ditutup cepat sampai tersisa satu jendela saja. Gerakan menutup ini memberi rasa lega yang langsung terasa sebelum penjelasan apa pun muncul. Hook ini dipilih karena menjual hasil akhir layanan {{brand}}, berkurangnya hal yang harus diurus, bukan menjual fitur perangkat lunaknya.",
          },
          points: [
            "Bentuk: rekaman layar belasan tab ditutup cepat sampai tersisa satu",
            "Alasan: gerakan menutup memberi rasa lega sebelum penjelasan muncul",
            "Kaitan strategi: menjual hasil akhir layanan, bukan fitur perangkat lunaknya",
          ],
        },
        {
          id: "hok-t4",
          headline: "Potret pemilik usaha menatap kamera dengan satu kalimat",
          fields: {
            isi: "Bingkai pembuka berupa potret setengah badan pemilik usaha yang menatap langsung ke kamera, disertai satu kalimat pendek berlatar kuning tentang keadaan yang ia hadapi. Wajah manusia menahan guliran lebih lama daripada gambar produk, dan tatapan langsung menciptakan kesan seseorang sedang berbicara kepada penonton. Untuk layanan yang wujudnya tidak kasatmata seperti {{brand}}, kehadiran sosok nyata inilah yang membuatnya bisa dipercaya.",
          },
          points: [
            "Bentuk: potret setengah badan menatap kamera dengan satu kalimat berlatar kuning",
            "Alasan: wajah manusia menahan guliran lebih lama daripada gambar produk",
            "Kaitan strategi: layanan tak kasatmata butuh sosok nyata agar dipercaya",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "hok-s1",
          headline: "Teks besar berisi pertanyaan di awal konten",
          fields: {
            isi: "Konten dibuka dengan teks berukuran besar berisi pertanyaan yang berkaitan dengan masalah audiens, agar mereka berhenti sejenak dan membaca lanjutannya.",
          },
          points: [
            "Membuka dengan pertanyaan memang menahan perhatian",
            "Bentuk visualnya belum digambarkan secara rinci",
            "Alasan pemilihannya masih umum, belum dikaitkan dengan audiens {{brand}}",
          ],
        },
        {
          id: "hok-s2",
          headline: "Warna cerah supaya menonjol di beranda",
          fields: {
            isi: "Memakai warna-warna cerah pada bingkai pertama supaya konten terlihat menonjol dan mudah dikenali ketika audiens menggulir berandanya.",
          },
          points: [
            "Warna memang membantu menahan perhatian",
            "Belum menjelaskan warna apa dan mengapa warna itu",
            "Tanpa gambar atau pesan, warna saja belum menjadi hook",
          ],
        },
        {
          id: "hok-s3",
          headline: "Potongan video yang bergerak cepat",
          fields: {
            isi: "Menggunakan potongan-potongan video pendek yang bergerak cepat di awal konten agar terlihat dinamis dan tidak membosankan bagi penonton.",
          },
          points: [
            "Gerakan cepat memang menahan mata sesaat",
            "Belum ada pesan yang tersampaikan lewat gerakan itu",
            "Penonton berhenti tanpa tahu konten ini tentang apa",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "hok-k1",
          headline: "Langsung menampilkan logo perusahaan",
          fields: {
            isi: "Konten dibuka dengan menampilkan logo {{brand}} berukuran besar selama beberapa detik agar audiens langsung mengenali brand-nya.",
          },
          points: [
            "Logo tidak menjawab pertanyaan \"ini untuk saya atau bukan\"",
            "Detik paling berharga terbuang sebelum pesan muncul",
            "Audiens menggulir lewat sebelum isinya sempat tampil",
          ],
        },
        {
          id: "hok-k2",
          headline: "Paragraf panjang berisi penjelasan lengkap",
          fields: {
            isi: "Bingkai pertama diisi paragraf panjang yang menjelaskan seluruh layanan {{brand}} secara lengkap supaya audiens langsung mendapat informasi utuh.",
          },
          points: [
            "Teks padat justru membuat audiens langsung menggulir",
            "Bingkai pertama bertugas menahan, bukan menjelaskan",
            "Penjelasan utuh mestinya ditaruh setelah perhatian didapat",
          ],
        },
        {
          id: "hok-k3",
          headline: "Gambar acak yang sedang populer",
          fields: {
            isi: "Memakai gambar atau meme yang sedang populer di internet sebagai pembuka, meski tidak berhubungan dengan isi kontennya, yang penting menarik perhatian.",
          },
          points: [
            "Perhatian yang datang tidak berkaitan dengan layanan",
            "Audiens merasa tertipu begitu isinya tidak sesuai",
            "Merusak kepercayaan yang justru sedang dibangun",
          ],
        },
      ],
    },
  ],
};

const copywriting: ChoiceGroup = {
  id: "copywriting",
  label: "Copywriting",
  question: "Formula copywriting dan teknik storytelling yang diterapkan",
  hint: "Sebut nama formulanya dan tunjukkan bagaimana ia bekerja pada konten {{brand}}.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "cop-t1",
          headline: "PAS: Problem, Agitate, Solution",
          fields: {
            formula: "PAS (Problem, Agitate, Solution)",
            isi: "Caption disusun memakai formula PAS. Problem membuka dengan keadaan yang dikenali {{audiens}}, misalnya malam yang habis untuk mencocokkan catatan penjualan. Agitate memperjelas ongkosnya: bukan sekadar lelah, melainkan waktu yang seharusnya dipakai mengurus pelanggan. Solution menutup dengan satu langkah kecil yang bisa dicoba hari itu juga. Formula ini dipilih karena {{brand}} menjual kelegaan, dan kelegaan hanya terasa setelah bebannya lebih dahulu disadari.",
          },
          points: [
            "Problem: membuka dengan keadaan yang dikenali audiens",
            "Agitate: memperjelas ongkos sebenarnya, yaitu waktu yang terbuang",
            "Solution: menutup dengan satu langkah kecil yang bisa dicoba hari itu",
            "Alasan: kelegaan hanya terasa setelah bebannya lebih dahulu disadari",
          ],
        },
        {
          id: "cop-t2",
          headline: "Before-After-Bridge dengan cerita satu pemilik usaha",
          fields: {
            formula: "Before-After-Bridge",
            isi: "Caption memakai Before-After-Bridge yang dibungkus cerita satu orang, bukan penjelasan umum. Before menggambarkan keadaan awal seorang pemilik usaha lengkap dengan angka jam kerjanya. After menggambarkan keadaannya tiga bulan kemudian. Bridge menjelaskan apa yang berubah di antaranya. Cerita satu orang dipilih karena angka rata-rata mudah dilupakan, sementara nama dan keadaan yang mirip dengan diri sendiri jauh lebih melekat.",
          },
          points: [
            "Before: keadaan awal seorang pemilik usaha lengkap dengan angka jam kerjanya",
            "After: keadaannya tiga bulan kemudian",
            "Bridge: apa yang berubah di antara keduanya",
            "Alasan: cerita satu orang lebih melekat daripada angka rata-rata",
          ],
        },
        {
          id: "cop-t3",
          headline: "AIDA dengan bukti di bagian Interest",
          fields: {
            formula: "AIDA (Attention, Interest, Desire, Action)",
            isi: "Caption mengikuti AIDA dengan penekanan pada bagian Interest. Attention berupa satu kalimat pendek berisi angka yang mengejutkan. Interest diisi bukti: potongan dasbor sungguhan atau kutipan pemilik usaha yang didampingi, karena di titik inilah audiens memutuskan lanjut membaca atau tidak. Desire menggambarkan keadaan setelah masalahnya beres. Action menutup dengan satu ajakan tunggal, sengaja tidak lebih dari satu supaya tidak membingungkan.",
          },
          points: [
            "Attention: satu kalimat pendek berisi angka yang mengejutkan",
            "Interest: diisi bukti nyata, titik tempat audiens memutuskan lanjut atau tidak",
            "Desire: menggambarkan keadaan setelah masalahnya beres",
            "Action: satu ajakan tunggal supaya tidak membingungkan",
          ],
        },
        {
          id: "cop-t4",
          headline: "Storytelling tiga babak dengan sudut pandang orang kedua",
          fields: {
            formula: "Storytelling tiga babak, sudut pandang orang kedua",
            isi: "Caption ditulis sebagai cerita tiga babak memakai kata \"kamu\", sehingga pembaca menempati sendiri posisi tokohnya. Babak pertama menempatkan pembaca pada malam ketika pekerjaan administratif belum selesai. Babak kedua menghadirkan titik balik berupa satu perubahan cara kerja. Babak ketiga menutup dengan keadaan yang berbeda. Sudut pandang orang kedua dipilih karena {{audiens}} lebih tergerak oleh pengakuan atas keadaannya daripada oleh daftar keunggulan layanan.",
          },
          points: [
            "Babak 1: menempatkan pembaca pada malam ketika pekerjaan belum selesai",
            "Babak 2: titik balik berupa satu perubahan cara kerja",
            "Babak 3: menutup dengan keadaan yang berbeda",
            "Sudut pandang \"kamu\" dipilih agar pembaca menempati posisi tokohnya",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "cop-s1",
          headline: "AIDA tanpa penjelasan penerapan",
          fields: {
            formula: "AIDA",
            isi: "Caption ditulis mengikuti formula AIDA, yaitu Attention, Interest, Desire, dan Action, supaya susunannya rapi dan mengarah pada ajakan bertindak di akhir.",
          },
          points: [
            "Nama formulanya benar dan memang lazim dipakai",
            "Belum ditunjukkan bagaimana tiap bagian diisi untuk {{brand}}",
            "Dokumen capstone meminta bukti penerapan, bukan sekadar nama formula",
          ],
        },
        {
          id: "cop-s2",
          headline: "Bahasa santai dan akrab",
          fields: {
            formula: "Gaya bahasa santai",
            isi: "Caption ditulis dengan bahasa yang santai dan akrab seperti sedang mengobrol dengan teman, supaya audiens merasa dekat dan tidak merasa sedang dijuali.",
          },
          points: [
            "Pilihan nada bicaranya sudah sesuai dengan audiens",
            "Gaya bahasa bukan formula copywriting",
            "Belum ada susunan yang mengarahkan pembaca ke satu tindakan",
          ],
        },
        {
          id: "cop-s3",
          headline: "Cerita pengalaman pelanggan",
          fields: {
            formula: "Storytelling",
            isi: "Caption berisi cerita pengalaman pelanggan yang pernah memakai layanan {{brand}} agar audiens bisa membayangkan hasilnya secara nyata.",
          },
          points: [
            "Bercerita lewat pengalaman pelanggan sudah tepat arahnya",
            "Belum ada susunan babak yang jelas",
            "Tanpa struktur, cerita mudah melebar dan kehilangan ujung",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "cop-k1",
          headline: "Caption berisi daftar fitur dan harga",
          fields: {
            formula: "Tidak memakai formula",
            isi: "Caption berisi daftar lengkap fitur layanan {{brand}} beserta harganya masing-masing, ditutup dengan nomor telepon yang bisa dihubungi.",
          },
          points: [
            "Tidak ada formula maupun cerita di dalamnya",
            "Daftar fitur jarang dibaca sampai habis",
            "Bagian Technical Skill Evidence menjadi tidak bisa diisi",
          ],
        },
        {
          id: "cop-k2",
          headline: "Kalimat motivasi yang tidak berkaitan",
          fields: {
            formula: "Tidak memakai formula",
            isi: "Caption diisi kutipan motivasi tentang kerja keras dan kesuksesan, lalu ditutup dengan nama {{brand}} dan tagar yang sedang populer.",
          },
          points: [
            "Tidak ada kaitan dengan layanan maupun masalah audiens",
            "Tidak menggerakkan pembaca ke tindakan apa pun",
            "Kutipan motivasi tidak menunjukkan keterampilan copywriting",
          ],
        },
        {
          id: "cop-k3",
          headline: "Caption sangat panjang berisi semua informasi",
          fields: {
            formula: "Tidak memakai formula",
            isi: "Caption ditulis sepanjang mungkin agar semua informasi tentang perusahaan, sejarah, visi misi, dan seluruh layanan bisa dimuat dalam satu unggahan.",
          },
          points: [
            "Tidak ada susunan yang menuntun pembaca",
            "Terpotong \"selengkapnya\" sebelum pesan utamanya muncul",
            "Satu unggahan sebaiknya membawa satu pesan saja",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* BAGIAN 4: VISUAL GALLERY                                          */
/* ================================================================== */

const galeri: ChoiceGroup = {
  id: "galeri",
  label: "Visual Gallery",
  question: "Empat konten yang ditampilkan pada Visual Gallery",
  hint: "Galeri ini jadi bukti karya di A3 Report. Pilih rangkaian yang tiap kontennya punya peran berbeda.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "gal-t1",
          headline: "Carousel edukasi, reels perbandingan, poster data, dan cerita tim",
          fields: {
            k1: "Carousel 6 slide | Feed Instagram | \"5 Pekerjaan yang Diam-diam Menghabiskan Waktumu\": tiap slide satu pekerjaan berulang beserta perkiraan jam yang hilang, ditutup ajakan menghitung sendiri",
            k2: "Reels 25 detik | Reels | Rekaman layar belasan tab ditutup satu per satu sampai tersisa satu dasbor, dengan sulih suara pemilik usaha",
            k3: "Poster tunggal | Feed Instagram | Satu angka besar magenta berisi rata-rata jam yang kembali setiap pekan, berlatar putih lapang",
            k4: "Cerita berseri | Story sorotan | Perkenalan tiga anggota tim beserta peran masing-masing dalam mendampingi pemilik usaha",
          },
          points: [
            "Carousel edukasi: menahan audiens lebih lama dan menambah simpanan",
            "Reels perbandingan: menjangkau audiens baru di luar pengikut",
            "Poster data: mudah dibagikan ulang dan cepat dipahami",
            "Cerita tim: memberi wajah pada layanan yang tidak kasatmata",
          ],
        },
        {
          id: "gal-t2",
          headline: "Studi kasus, langkah praktis, bandingan biaya, dan tanya jawab",
          fields: {
            k1: "Carousel 7 slide | Feed Instagram | Studi kasus satu pemilik usaha: keadaan awal, yang diubah, dan hasilnya setelah tiga bulan, lengkap dengan angka",
            k2: "Reels 30 detik | Reels | Tiga langkah merapikan pencatatan penjualan yang bisa dikerjakan malam ini juga, tanpa alat berbayar",
            k3: "Poster bandingan | Feed Instagram | Biaya merekrut satu staf administrasi dibandingkan biaya layanan pendampingan, disajikan berdampingan",
            k4: "Carousel tanya jawab | Feed Instagram | Lima pertanyaan yang paling sering masuk ke direct message beserta jawaban singkatnya",
          },
          points: [
            "Studi kasus: membangun kepercayaan lewat angka dan keadaan nyata",
            "Langkah praktis: memberi nilai sebelum audiens membeli apa pun",
            "Bandingan biaya: membalas keberatan \"pasti mahal\" secara langsung",
            "Tanya jawab: menjawab keraguan yang menahan orang menghubungi",
          ],
        },
        {
          id: "gal-t3",
          headline: "Konten inklusi, demo produk, kutipan pelanggan, dan ajakan konsultasi",
          fields: {
            k1: "Reels 40 detik | Reels | Profil seorang wirausaha perempuan yang didampingi program SanggaTech for Her, dari keadaan awal sampai sekarang",
            k2: "Carousel 5 slide | Feed Instagram | Tampilan dasbor operasional dijelaskan layar demi layar dengan bahasa sehari-hari, bukan istilah teknis",
            k3: "Poster kutipan | Feed Instagram | Satu kalimat langsung dari pemilik usaha yang didampingi, dicetak besar dengan potretnya di samping",
            k4: "Poster ajakan | Feed Instagram | Ajakan konsultasi awal tanpa biaya, memuat satu langkah jelas dan tenggat yang disebutkan",
          },
          points: [
            "Konten inklusi: menegaskan posisi women-led yang membedakan {{brand}}",
            "Demo produk: menjawab \"seperti apa sebenarnya\" dengan bahasa sehari-hari",
            "Kutipan pelanggan: bukti sosial dalam bentuk yang cepat dicerna",
            "Ajakan konsultasi: satu-satunya konten jualan, ditaruh paling akhir",
          ],
        },
        {
          id: "gal-t4",
          headline: "Hook masalah, pembongkaran mitos, potongan proses, dan hasil bulanan",
          fields: {
            k1: "Reels 20 detik | Reels | Meja penuh nota berubah menjadi satu layar rapi dalam satu gerakan potong cepat, tanpa narasi",
            k2: "Carousel 6 slide | Feed Instagram | Tiga anggapan keliru tentang otomasi usaha kecil, dibantah satu per satu dengan contoh nyata",
            k3: "Cerita berseri | Story sorotan | Potongan proses pendampingan selama satu pekan, direkam apa adanya dari sisi tim",
            k4: "Poster laporan | Feed Instagram | Ringkasan hasil bulan itu: jumlah usaha yang didampingi dan jam kerja yang dihemat bersama",
          },
          points: [
            "Hook masalah: menahan guliran tanpa perlu satu kata pun",
            "Pembongkaran mitos: membalas keberatan yang jarang diucapkan terbuka",
            "Potongan proses: memperlihatkan cara kerja sehingga layanan terasa nyata",
            "Hasil bulanan: menumpuk bukti secara berkala, bukan sekali lalu hilang",
          ],
        },
        {
          id: "gal-t5",
          headline: "Transformasi sebelum-sesudah, asal-usul pendiri, mitos vs fakta, dan hasil pelanggan",
          fields: {
            k1: "Reels 25 detik | Reels | Notifikasi WhatsApp menumpuk tak terbalas berubah menjadi satu dasbor SanggaChat yang rapi, direkam dalam satu tarikan layar",
            k2: "Carousel 5 slide | Feed Instagram | Cerita asal mula {{brand}} didirikan: masalah yang dilihat pendiri pada usaha kecil di sekitarnya, sampai keputusan membangun layanan ini",
            k3: "Poster mitos vs fakta | Feed Instagram | \"Mitos: pendampingan operasional cuma buat usaha besar. Fakta: usaha kecil justru paling butuh, karena pemiliknya merangkap semua peran\"",
            k4: "Cerita berseri | Story sorotan | Satu hari kerja tim pendamping membantu klien menyelesaikan laporan bulanan, direkam apa adanya",
          },
          points: [
            "Transformasi sebelum-sesudah: memperlihatkan hasil tanpa menjelaskan fitur satu per satu",
            "Asal-usul pendiri: membangun kepercayaan lewat cerita, bukan klaim",
            "Mitos vs fakta: membalas keberatan yang sering muncul secara langsung",
            "Hasil pelanggan: bukti kerja nyata dari sudut pandang tim sendiri",
          ],
        },
        {
          id: "gal-t6",
          headline: "Checklist masalah, tips cepat diterapkan, kalkulasi biaya, dan kutipan singkat",
          fields: {
            k1: "Carousel 5 slide | Feed Instagram | \"3 Tanda Operasional Usahamu Sudah Waktunya Dibereskan\": tiap slide satu tanda beserta akibatnya bila dibiarkan",
            k2: "Reels 20 detik | Reels | Satu trik merapikan folder invoice digital yang bisa langsung dicoba malam itu juga, tanpa alat berbayar",
            k3: "Poster kalkulasi | Feed Instagram | Simulasi sederhana: biaya menggaji satu staf administrasi penuh waktu dibandingkan biaya layanan {{brand}} untuk pekerjaan yang sama",
            k4: "Poster kutipan | Feed Instagram | Satu kalimat pendek dari pemilik usaha yang didampingi, dicetak besar tanpa embel-embel tambahan",
          },
          points: [
            "Checklist masalah: membuat audiens memeriksa diri sendiri, bukan sekadar membaca",
            "Tips cepat diterapkan: memberi nilai nyata sebelum audiens membayar apa pun",
            "Kalkulasi biaya: mengubah keberatan \"mahal\" menjadi perbandingan angka yang jelas",
            "Kutipan singkat: bukti sosial yang cepat dibaca sambil menggulir",
          ],
        },
        {
          id: "gal-t7",
          headline: "Balik layar tim, tonggak pencapaian, tanya-jawab keberatan, dan ajakan santai",
          fields: {
            k1: "Reels 30 detik | Reels | Suasana rapat kecil tim {{brand}} membahas satu masalah klien, direkam natural tanpa naskah kaku",
            k2: "Poster tonggak | Feed Instagram | Angka jumlah pelaku usaha perempuan yang sudah didampingi lewat program SanggaTech for Her, disajikan sebagai pencapaian bersama",
            k3: "Carousel 4 slide | Feed Instagram | Empat keberatan yang paling sering muncul sebelum orang menghubungi {{brand}}, tiap slide satu keberatan beserta jawaban singkatnya",
            k4: "Poster ajakan | Feed Instagram | Ajakan mengobrol santai lewat direct message tanpa tekanan, bukan ajakan \"beli sekarang\"",
          },
          points: [
            "Balik layar tim: memberi wajah manusia pada layanan yang serba digital",
            "Tonggak pencapaian: bukti dampak program inklusi, bukan sekadar klaim visi",
            "Tanya-jawab keberatan: membalas keraguan sebelum sempat diucapkan",
            "Ajakan santai: menurunkan tekanan membeli, cocok untuk audiens yang baru kenal",
          ],
        },
        {
          id: "gal-t8",
          headline: "Anatomi hari kerja, hemat waktu dalam angka, testimoni bersuara, dan penutup bulan",
          fields: {
            k1: "Carousel 6 slide | Feed Instagram | \"Anatomi Satu Hari Operasional\": versi berantakan di slide awal, versi rapi memakai {{brand}} di slide akhir, dibandingkan jam demi jam",
            k2: "Poster angka | Feed Instagram | Estimasi jam kerja yang dikembalikan ke pemilik usaha per pekan setelah pekerjaan administratif diambil alih, ditulis sebagai satu angka besar",
            k3: "Reels 35 detik | Reels | Cuplikan suara pelanggan diperagakan ulang sebagai teks bergerak, menceritakan momen paling terbantu selama didampingi",
            k4: "Carousel 4 slide | Feed Instagram | Ringkasan penutup bulan: apa yang sudah dikerjakan tim untuk klien-klien dampingan, ditulis seperti laporan singkat yang jujur",
          },
          points: [
            "Anatomi hari kerja: membuat perubahan terasa konkret jam demi jam, bukan abstrak",
            "Hemat waktu dalam angka: satu ukuran yang paling mudah dirasakan pemilik usaha",
            "Testimoni bersuara: terasa lebih personal daripada kutipan teks biasa",
            "Penutup bulan: menunjukkan konsistensi kerja, bukan hanya sesekali muncul",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "gal-s1",
          headline: "Empat konten edukasi dengan tema berbeda",
          fields: {
            k1: "Carousel | Feed Instagram | Tips mengelola keuangan usaha kecil",
            k2: "Carousel | Feed Instagram | Cara membalas pesan pelanggan lebih cepat",
            k3: "Carousel | Feed Instagram | Kesalahan umum dalam mencatat penjualan",
            k4: "Carousel | Feed Instagram | Langkah menyusun laporan bulanan sederhana",
          },
          points: [
            "Temanya sudah berkaitan dengan layanan {{brand}}",
            "Keempatnya berbentuk sama sehingga galeri terlihat datar",
            "Tidak ada konten yang membangun kepercayaan atau mengajak bertindak",
          ],
        },
        {
          id: "gal-s2",
          headline: "Campuran konten dengan format beragam",
          fields: {
            k1: "Reels | Reels | Video pendek tentang layanan {{brand}}",
            k2: "Poster | Feed Instagram | Informasi layanan dan keunggulannya",
            k3: "Carousel | Feed Instagram | Penjelasan produk secara bertahap",
            k4: "Story | Story | Kegiatan tim sehari-hari",
          },
          points: [
            "Formatnya sudah beragam sehingga galeri tidak monoton",
            "Tiga dari empat konten sama-sama menjelaskan layanan",
            "Peran tiap konten belum dibedakan dengan jelas",
          ],
        },
        {
          id: "gal-s3",
          headline: "Dua konten edukasi dan dua konten promosi",
          fields: {
            k1: "Carousel | Feed Instagram | Tips singkat seputar pengelolaan usaha",
            k2: "Reels | Reels | Penjelasan singkat manfaat memakai sistem digital",
            k3: "Poster | Feed Instagram | Promo layanan bulan ini",
            k4: "Poster | Feed Instagram | Ajakan menghubungi admin untuk konsultasi",
          },
          points: [
            "Ada keseimbangan antara memberi dan menawarkan",
            "Porsi promosi setengah galeri terlalu besar untuk bukti karya",
            "Belum ada konten yang menampilkan hasil nyata pendampingan",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "gal-k1",
          headline: "Empat poster promosi dengan desain seragam",
          fields: {
            k1: "Poster | Feed Instagram | Promo diskon layanan {{brand}}",
            k2: "Poster | Feed Instagram | Daftar harga paket layanan",
            k3: "Poster | Feed Instagram | Ajakan menghubungi admin sekarang",
            k4: "Poster | Feed Instagram | Pengumuman promo berakhir besok",
          },
          points: [
            "Seluruh galeri berisi jualan tanpa satu pun bukti karya",
            "Tidak menunjukkan keterampilan apa pun kepada mitra",
            "Bertentangan dengan tujuan Visual Gallery di dokumen capstone",
          ],
        },
        {
          id: "gal-k2",
          headline: "Kutipan motivasi dengan latar foto gratis",
          fields: {
            k1: "Poster | Feed Instagram | Kutipan motivasi tentang kerja keras",
            k2: "Poster | Feed Instagram | Kutipan motivasi tentang pantang menyerah",
            k3: "Poster | Feed Instagram | Kutipan tokoh terkenal tentang bisnis",
            k4: "Poster | Feed Instagram | Ucapan selamat akhir pekan",
          },
          points: [
            "Tidak satu pun berkaitan dengan layanan {{brand}}",
            "Memakai bahan gratis yang tidak menunjukkan kemampuan desain",
            "Galeri seperti ini justru melemahkan lamaran peserta",
          ],
        },
        {
          id: "gal-k3",
          headline: "Satu konten diulang dengan warna berbeda",
          fields: {
            k1: "Poster | Feed Instagram | Pengenalan layanan {{brand}} versi biru",
            k2: "Poster | Feed Instagram | Pengenalan layanan {{brand}} versi kuning",
            k3: "Poster | Feed Instagram | Pengenalan layanan {{brand}} versi magenta",
            k4: "Poster | Feed Instagram | Pengenalan layanan {{brand}} versi hijau",
          },
          points: [
            "Isinya sama, hanya warnanya yang diganti",
            "Tidak memperlihatkan keragaman gagasan maupun format",
            "Mitra akan membacanya sebagai kekurangan bahan",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* BAGIAN 5: IMPACT & CLOSURE                                        */
/* ================================================================== */

const impact: ChoiceGroup = {
  id: "impact",
  label: "Impact & Potential",
  question: "Analisis potensi peningkatan brand awareness bagi {{brand}}",
  hint: "Dokumen capstone meminta analisis sederhana. Pilih yang menyebut ukuran dan tenggat, bukan sekadar harapan.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "imp-t1",
          headline: "Tiga ukuran dengan tenggat tiga bulan",
          fields: {
            isi: "Keberhasilan strategi ini diukur lewat tiga angka dalam tiga bulan. Pertama, jangkauan akun non-pengikut yang ditargetkan naik karena pilar masalah dan reels perbandingan memang dirancang menjangkau ke luar. Kedua, jumlah simpanan per konten edukasi, karena konten yang disimpan menandakan audiens berniat memakainya kembali. Ketiga, jumlah percakapan masuk yang menyebut satu konten tertentu, inilah tanda paling jujur bahwa kontennya benar-benar bekerja.",
          },
          points: [
            "Jangkauan non-pengikut: menguji apakah konten menjangkau ke luar",
            "Simpanan per konten edukasi: tanda audiens berniat memakainya kembali",
            "Percakapan masuk yang menyebut konten tertentu, tanda paling jujur",
            "Ditinjau dalam tenggat tiga bulan, bukan dibiarkan berjalan tanpa batas",
          ],
        },
        {
          id: "imp-t2",
          headline: "Dari jangkauan ke percakapan, bukan sekadar pengikut",
          fields: {
            isi: "Bagi {{brand}}, jumlah pengikut bukan ukuran yang paling berarti karena layanannya bernilai besar dan keputusan membelinya lama. Yang lebih layak dipantau adalah perjalanan dari jangkauan menuju percakapan: berapa orang melihat, berapa yang membuka profil, dan berapa yang akhirnya mengirim pesan. Sepuluh percakapan dari pemilik usaha yang benar-benar cocok lebih bernilai daripada seribu pengikut yang hanya lewat.",
          },
          points: [
            "Pengikut bukan ukuran utama karena keputusan membelinya lama",
            "Yang dipantau: jangkauan, kunjungan profil, lalu percakapan masuk",
            "Sepuluh percakapan yang cocok lebih bernilai daripada seribu pengikut lewat",
          ],
        },
        {
          id: "imp-t3",
          headline: "Kenaikan bertahap dengan angka acuan yang masuk akal",
          fields: {
            isi: "Dengan basis sekitar sembilan ribu pengikut, target yang masuk akal adalah kenaikan jangkauan bulanan tiga puluh sampai empat puluh persen pada tiga bulan pertama, bukan lipat ganda. Angka ini dipilih karena empat unggahan sepekan memang belum cukup untuk lonjakan besar, dan menjanjikan lebih dari itu hanya akan membuat mitra kecewa. Yang lebih penting, kenaikannya harus datang dari konten pilar tetap supaya bisa diulang, bukan dari satu konten yang kebetulan viral.",
          },
          points: [
            "Target kenaikan jangkauan 30-40% dalam tiga bulan, bukan lipat ganda",
            "Angka disesuaikan dengan ritme empat unggahan sepekan",
            "Kenaikan harus datang dari pilar tetap agar bisa diulang, bukan dari viral sesaat",
          ],
        },
        {
          id: "imp-t4",
          headline: "Dampak berlapis: kesadaran, kepercayaan, lalu perekrutan",
          fields: {
            isi: "Dampaknya bekerja berlapis. Lapis pertama, kesadaran: makin banyak pemilik usaha tahu bahwa ada yang bisa mengambil alih pekerjaan operasional mereka. Lapis kedua, kepercayaan: konten studi kasus dan wajah tim membuat {{brand}} terasa nyata, bukan sekadar akun. Lapis ketiga yang sering terlewat, perekrutan: akun yang aktif dan berposisi jelas memudahkan {{brand}} menarik talenta perempuan dan penyandang disabilitas, yang justru menjadi inti model bisnisnya.",
          },
          points: [
            "Lapis 1 kesadaran: makin banyak yang tahu layanan seperti ini ada",
            "Lapis 2 kepercayaan: studi kasus dan wajah tim membuat {{brand}} terasa nyata",
            "Lapis 3 perekrutan: akun berposisi jelas memudahkan menarik talenta",
            "Lapis ketiga penting karena talenta inklusif adalah inti model bisnisnya",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "imp-s1",
          headline: "Engagement rate dan jumlah pengikut naik",
          fields: {
            isi: "Strategi ini diperkirakan dapat meningkatkan engagement rate dan jumlah pengikut akun {{brand}} sehingga brand awareness-nya ikut meningkat di kalangan pelaku UMKM.",
          },
          points: [
            "Ukurannya sudah disebut dan memang lazim dipakai",
            "Tidak ada angka target maupun tenggat waktunya",
            "Belum dijelaskan bagaimana kenaikan itu akan terjadi",
          ],
        },
        {
          id: "imp-s2",
          headline: "Lebih banyak orang mengenal layanan",
          fields: {
            isi: "Dengan konten yang konsisten, semakin banyak orang akan mengenal layanan {{brand}} dan tertarik untuk mencoba, sehingga peluang mendapatkan pelanggan baru menjadi lebih besar.",
          },
          points: [
            "Arah dampaknya benar dan masuk akal",
            "Tidak ada satu pun ukuran yang bisa diperiksa",
            "Kalimat seperti ini tidak bisa dibuktikan benar atau salah",
          ],
        },
        {
          id: "imp-s3",
          headline: "Akun terlihat lebih profesional",
          fields: {
            isi: "Dengan desain yang mengikuti panduan merek dan konten yang tertata, akun {{brand}} akan terlihat lebih profesional dan meyakinkan di mata calon pelanggan.",
          },
          points: [
            "Tampilan yang tertata memang memengaruhi kepercayaan",
            "Profesional bukan sesuatu yang bisa diukur",
            "Belum menyentuh dampak pada jangkauan maupun percakapan",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "imp-k1",
          headline: "Akan viral dan pengikut melonjak",
          fields: {
            isi: "Konten ini berpotensi viral sehingga pengikut {{brand}} akan melonjak drastis dalam waktu singkat dan penjualan ikut meningkat tajam.",
          },
          points: [
            "Viral bukan sesuatu yang bisa direncanakan",
            "Menjanjikan hasil yang tidak bisa dipertanggungjawabkan",
            "Mitra berpengalaman akan langsung meragukan analisisnya",
          ],
        },
        {
          id: "imp-k2",
          headline: "Pasti berhasil karena kontennya bagus",
          fields: {
            isi: "Strategi ini pasti berhasil karena kontennya sudah dibuat dengan bagus dan menarik, sehingga audiens tentu akan menyukainya dan membagikannya.",
          },
          points: [
            "Tidak ada ukuran maupun alasan di balik kesimpulannya",
            "Menganggap selera audiens sudah pasti tanpa pengujian",
            "Bukan analisis, melainkan harapan",
          ],
        },
        {
          id: "imp-k3",
          headline: "Sulit diukur, jadi tidak perlu diukur",
          fields: {
            isi: "Brand awareness sulit diukur secara pasti, jadi yang penting kontennya tetap diunggah secara rutin dan hasilnya akan terlihat dengan sendirinya seiring waktu.",
          },
          points: [
            "Menolak mengukur padahal alat ukurnya tersedia di Instagram",
            "Tanpa ukuran, strategi tidak bisa diperbaiki",
            "Dokumen capstone secara khusus meminta analisis ini",
          ],
        },
      ],
    },
  ],
};

const hireme: ChoiceGroup = {
  id: "hireme",
  label: "Closure & Hire Me",
  question: "Penutup deck: kesiapan berkontribusi di industri",
  hint: "Slide penutup memuat Profile Card. Pilih penutup yang menunjukkan bukti, bukan sekadar pernyataan siap.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "hir-t1",
          headline: "Tiga keterampilan yang dibuktikan di deck ini",
          fields: {
            isi: "Penutup merangkum tiga keterampilan yang sudah dibuktikan sepanjang deck, bukan sekadar dinyatakan: riset audiens yang menghasilkan profil spesifik lengkap dengan titik sakitnya, penyusunan strategi konten berpilar dengan alasan di balik tiap pilihan, serta produksi konten yang mengikuti panduan merek. Tiap butir menunjuk kembali ke slide yang memuat buktinya. Profile Card memuat potret profesional, alamat surel, dan tautan LinkedIn.",
          },
          points: [
            "Riset audiens: dibuktikan lewat profil spesifik beserta titik sakitnya",
            "Penyusunan strategi: dibuktikan lewat pilar konten beserta alasannya",
            "Produksi konten: dibuktikan lewat karya yang mengikuti panduan merek",
            "Tiap butir menunjuk kembali ke slide yang memuat buktinya",
          ],
        },
        {
          id: "hir-t2",
          headline: "Tawaran tiga puluh hari pertama",
          fields: {
            isi: "Penutup tidak berhenti pada pernyataan siap bekerja, melainkan menawarkan rencana tiga puluh hari pertama bila diterima: pekan pertama mengaudit akun dan menyusun ulang sorotan, pekan kedua menyiapkan bank konten satu bulan, pekan ketiga menjalankan pengujian dua gaya hook, pekan keempat menyusun laporan dan usulan perbaikan. Menutup dengan rencana kerja membuat pemberi kerja bisa membayangkan hari pertama peserta bekerja.",
          },
          points: [
            "Pekan 1: mengaudit akun dan menyusun ulang sorotan",
            "Pekan 2: menyiapkan bank konten untuk satu bulan",
            "Pekan 3: menjalankan pengujian dua gaya hook",
            "Pekan 4: menyusun laporan dan usulan perbaikan",
          ],
        },
        {
          id: "hir-t3",
          headline: "Alasan cocok dengan misi inklusi {{brand}}",
          fields: {
            isi: "Penutup menghubungkan keterampilan peserta dengan hal yang dibutuhkan {{brand}} secara khusus. Perusahaan ini menjual pendampingan kepada kelompok yang sering diabaikan penyedia jasa lain, sehingga kontennya membutuhkan orang yang bisa menulis tanpa merendahkan dan bisa menampilkan pemilik usaha sebagai sosok yang mampu, bukan sebagai pihak yang perlu dikasihani. Deck ini memperlihatkan cara kerja itu di setiap slidenya.",
          },
          points: [
            "Menghubungkan keterampilan dengan kebutuhan khusus {{brand}}",
            "Menunjukkan pemahaman bahwa nada bicara adalah bagian dari misinya",
            "Bukti cara kerjanya sudah terlihat di seluruh slide sebelumnya",
          ],
        },
        {
          id: "hir-t4",
          headline: "Profile Card dengan satu kalimat penempatan diri",
          fields: {
            isi: "Slide penutup dipusatkan pada Profile Card: potret profesional, nama, satu kalimat yang menempatkan diri secara jelas, misalnya social media specialist yang bekerja untuk brand berbasis layanan, beserta tautan LinkedIn dan portofolio dalam bentuk kode QR. Satu kalimat penempatan diri dipilih karena pemberi kerja membaca slide penutup dalam hitungan detik, dan yang paling perlu tertangkap adalah bidang yang dikuasai peserta.",
          },
          points: [
            "Isi kartu: potret profesional, nama, kalimat penempatan diri, LinkedIn, kode QR",
            "Kalimat penempatan diri menyebut bidang yang dikuasai secara jelas",
            "Alasan: slide penutup dibaca dalam hitungan detik",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "hir-s1",
          headline: "Pernyataan siap bekerja dan data diri",
          fields: {
            isi: "Slide penutup berisi pernyataan bahwa peserta siap berkontribusi di industri social media marketing, dilengkapi foto, nama, nomor telepon, dan tautan LinkedIn.",
          },
          points: [
            "Unsur Profile Card yang diminta sudah lengkap",
            "Pernyataan siap tidak disertai bukti apa pun",
            "Belum menjelaskan apa yang bisa dikerjakan peserta",
          ],
        },
        {
          id: "hir-s2",
          headline: "Daftar keterampilan yang dikuasai",
          fields: {
            isi: "Slide penutup memuat daftar keterampilan yang dikuasai peserta seperti copywriting, desain konten, riset audiens, dan analisis media sosial, beserta kontak yang bisa dihubungi.",
          },
          points: [
            "Keterampilannya relevan dengan pekerjaannya",
            "Berbentuk daftar tanpa menunjuk bukti di slide sebelumnya",
            "Daftar serupa bisa ditulis siapa pun tanpa mengerjakan capstone",
          ],
        },
        {
          id: "hir-s3",
          headline: "Ucapan terima kasih dan harapan",
          fields: {
            isi: "Slide penutup berisi ucapan terima kasih atas kesempatan yang diberikan serta harapan agar dapat bergabung dan belajar lebih banyak di industri ini.",
          },
          points: [
            "Sopan dan wajar sebagai penutup presentasi",
            "Tidak memuat Profile Card yang diminta dokumen capstone",
            "Harapan belajar menempatkan peserta sebagai pihak yang meminta, bukan menawarkan",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "hir-k1",
          headline: "Hanya tulisan Terima Kasih",
          fields: {
            isi: "Slide penutup hanya berisi tulisan \"Terima Kasih\" berukuran besar di tengah slide dengan latar berwarna.",
          },
          points: [
            "Tidak ada Profile Card maupun kontak sama sekali",
            "Kesempatan terakhir meyakinkan pemberi kerja terbuang",
            "Tidak memenuhi ketentuan slide penutup di dokumen capstone",
          ],
        },
        {
          id: "hir-k2",
          headline: "Janji bekerja keras tanpa bukti",
          fields: {
            isi: "Slide penutup berisi janji bahwa peserta akan bekerja keras, disiplin, jujur, dan siap belajar hal baru apabila diberi kesempatan bergabung.",
          },
          points: [
            "Sifat pribadi tidak bisa diperiksa dari sebuah deck",
            "Tidak ada kaitan dengan keterampilan yang baru dibuktikan",
            "Kalimat yang sama muncul di hampir semua lamaran",
          ],
        },
        {
          id: "hir-k3",
          headline: "Daftar riwayat hidup lengkap",
          fields: {
            isi: "Slide penutup memuat riwayat pendidikan dari sekolah dasar sampai perguruan tinggi beserta seluruh pengalaman organisasi dan daftar sertifikat yang pernah diterima.",
          },
          points: [
            "Terlalu padat untuk dibaca dalam hitungan detik",
            "Sebagian besar isinya tidak berkaitan dengan social media marketing",
            "Profile Card yang ringkas justru lebih kuat daripada riwayat lengkap",
          ],
        },
      ],
    },
  ],
};

/** Seluruh grup capstone, berurutan sesuai langkah pengerjaan. */
export const capstoneGroups: ChoiceGroup[] = [
  konteks,
  audiens,
  pilar,
  kalender,
  hook,
  copywriting,
  galeri,
  impact,
  hireme,
];
