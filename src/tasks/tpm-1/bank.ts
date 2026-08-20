import type { ChoiceGroup } from "../types";

/**
 * BANK JAWABAN TPM 1 — Strategi STP produk "VitaFresh".
 *
 * Setiap grade punya banyak varian. Satu varian diambil acak per peserta
 * (berdasarkan seed), jadi dua peserta yang sama-sama memilih kartu "tepat"
 * tetap menghasilkan isi dokumen yang berbeda.
 *
 * Token yang tersedia di dalam teks: {{nama}}, {{produk}}, {{seg1}}, {{seg2}}, {{seg3}}.
 */

/* ================================================================== */
/* 1. SEGMENTASI — Segmen 1 (fokus kriteria Demografi)                */
/* ================================================================== */

const segmen1: ChoiceGroup = {
  id: "seg1",
  label: "Segmen 1",
  question: "Segmen pasar pertama — berbasis kriteria Demografi",
  hint: "Pilih satu paket segmen. Karakteristik dan kebutuhan utamanya sudah ikut terisi.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "s1a",
          headline: "Mahasiswa & Pelajar Aktif (18-24 tahun)",
          fields: {
            nama: "Mahasiswa & Pelajar Aktif (18-24 tahun)",
            kriteria: "Demografi",
            karakteristik:
              "Mahasiswa dan pelajar di kota besar dengan uang saku Rp1-2,5 juta per bulan, jadwal kuliah dan organisasi padat, terbiasa jajan di minimarket kampus, serta sangat aktif di media sosial.",
            kebutuhan:
              "Minuman praktis sekali teguk yang menyegarkan, membantu menjaga daya tahan tubuh saat begadang dan jadwal padat, dengan harga yang masih ramah di kantong.",
          },
          points: [
            "Kriteria: Demografi (usia, status pendidikan, tingkat pengeluaran)",
            "Karakteristik: mahasiswa/pelajar kota besar, uang saku Rp1-2,5 juta per bulan, jadwal padat, aktif di media sosial",
            "Kebutuhan utama: minuman praktis dan menyegarkan yang menjaga daya tahan tubuh dengan harga terjangkau",
          ],
        },
        {
          id: "s1b",
          headline: "Pemuda Usia Produktif (17-25 tahun)",
          fields: {
            nama: "Pemuda Usia Produktif (17-25 tahun)",
            kriteria: "Demografi",
            karakteristik:
              "Anak muda usia sekolah akhir sampai awal kuliah/kerja, mobilitas tinggi, mudah terpengaruh tren kesehatan di media sosial, dan sering membeli minuman kemasan di perjalanan.",
            kebutuhan:
              "Minuman sehat yang tetap terasa enak dan kekinian, mudah dibawa, serta tidak membuat tubuh cepat lelah saat beraktivitas seharian.",
          },
          points: [
            "Kriteria: Demografi (kelompok usia produktif muda)",
            "Karakteristik: mobilitas tinggi, cepat mengikuti tren kesehatan dari media sosial, rutin membeli minuman kemasan",
            "Kebutuhan utama: minuman sehat yang rasanya enak, praktis dibawa, dan mendukung stamina harian",
          ],
        },
        {
          id: "s1c",
          headline: "Pekerja Muda / First Jobber (23-30 tahun)",
          fields: {
            nama: "Pekerja Muda / First Jobber (23-30 tahun)",
            kriteria: "Demografi",
            karakteristik:
              "Karyawan awal karier dengan penghasilan Rp4-8 juta per bulan, tinggal di kota besar, jam kerja panjang, dan mulai sadar bahwa pola makannya belum sehat.",
            kebutuhan:
              "Asupan vitamin C harian yang praktis tanpa harus menyiapkan jus sendiri, untuk menjaga imunitas di tengah beban kerja dan kurang tidur.",
          },
          points: [
            "Kriteria: Demografi (usia, pekerjaan, tingkat penghasilan)",
            "Karakteristik: penghasilan Rp4-8 juta per bulan, jam kerja panjang, pola makan belum teratur",
            "Kebutuhan utama: asupan vitamin C harian yang praktis untuk menjaga imunitas di tengah beban kerja",
          ],
        },
        {
          id: "s1d",
          headline: "Generasi Z Perkotaan (18-24 tahun)",
          fields: {
            nama: "Generasi Z Perkotaan (18-24 tahun)",
            kriteria: "Demografi",
            karakteristik:
              "Konsumen Gen Z di kota besar yang terbiasa membaca label komposisi, peduli isu gula berlebih, dan gemar membagikan produk favoritnya di media sosial.",
            kebutuhan:
              "Minuman dengan bahan alami dan klaim gizi yang jujur, kemasan menarik untuk dibagikan, serta rasa yang tidak terlalu manis.",
          },
          points: [
            "Kriteria: Demografi (generasi dan domisili perkotaan)",
            "Karakteristik: terbiasa membaca label komposisi, peduli isu gula berlebih, gemar membagikan produk di media sosial",
            "Kebutuhan utama: minuman berbahan alami dengan klaim gizi jujur dan rasa tidak terlalu manis",
          ],
        },
        {
          id: "s1e",
          headline: "Karyawan Kantoran Muda (25-34 tahun)",
          fields: {
            nama: "Karyawan Kantoran Muda (25-34 tahun)",
            kriteria: "Demografi",
            karakteristik:
              "Pegawai kantor di kawasan bisnis dengan penghasilan menengah, rutin membeli minuman saat jam istirahat, dan kerap melewatkan sarapan karena terburu-buru.",
            kebutuhan:
              "Pengganti asupan buah harian yang cepat dikonsumsi di sela pekerjaan dan membantu menjaga kebugaran sampai sore.",
          },
          points: [
            "Kriteria: Demografi (usia, jenis pekerjaan, kelas penghasilan)",
            "Karakteristik: bekerja di kawasan bisnis, rutin jajan saat jam istirahat, sering melewatkan sarapan",
            "Kebutuhan utama: pengganti asupan buah harian yang cepat dikonsumsi di sela pekerjaan",
          ],
        },
        {
          id: "s1f",
          headline: "Ibu Muda Kelas Menengah (25-35 tahun)",
          fields: {
            nama: "Ibu Muda Kelas Menengah (25-35 tahun)",
            kriteria: "Demografi",
            karakteristik:
              "Ibu dengan satu sampai dua anak usia sekolah, pengambil keputusan belanja rumah tangga, teliti memilih produk yang dikonsumsi keluarga.",
            kebutuhan:
              "Minuman sehat yang aman dan disukai anak, tanpa pemanis buatan, serta bisa dibeli dalam jumlah banyak untuk stok di rumah.",
          },
          points: [
            "Kriteria: Demografi (usia, status keluarga, peran belanja rumah tangga)",
            "Karakteristik: pengambil keputusan belanja keluarga, teliti memilih produk konsumsi anak",
            "Kebutuhan utama: minuman sehat tanpa pemanis buatan yang aman dan disukai anak",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "s1x",
          headline: "Anak Muda",
          fields: {
            nama: "Anak Muda",
            kriteria: "Demografi",
            karakteristik: "Anak muda yang suka minuman segar dan mengikuti tren.",
            kebutuhan: "Ingin minuman yang enak dan menyegarkan.",
          },
          points: [
            "Kriteria: Demografi, tetapi batas usianya tidak ditentukan",
            "Karakteristik: hanya disebut 'suka minuman segar', belum menggambarkan perilaku atau daya beli",
            "Kebutuhan utama: masih sangat umum, belum terhubung dengan keunggulan produk",
          ],
        },
        {
          id: "s1y",
          headline: "Konsumen Usia 15-55 Tahun",
          fields: {
            nama: "Konsumen Usia 15-55 Tahun",
            kriteria: "Demografi",
            karakteristik: "Laki-laki dan perempuan berusia 15 sampai 55 tahun di seluruh Indonesia.",
            kebutuhan: "Membutuhkan minuman yang menyehatkan.",
          },
          points: [
            "Kriteria: Demografi, tetapi rentang usianya terlalu lebar sehingga sulit dijadikan sasaran promosi",
            "Karakteristik: mencakup terlalu banyak kelompok dengan kebiasaan yang berbeda-beda",
            "Kebutuhan utama: masih normatif, belum spesifik per kelompok",
          ],
        },
        {
          id: "s1z",
          headline: "Pelajar dan Mahasiswa",
          fields: {
            nama: "Pelajar dan Mahasiswa",
            kriteria: "Demografi",
            karakteristik: "Pelajar dan mahasiswa yang masih menempuh pendidikan.",
            kebutuhan: "Butuh minuman untuk menemani belajar.",
          },
          points: [
            "Kriteria: Demografi sudah benar",
            "Karakteristik: baru menyebut status pendidikan, belum ada daya beli, kebiasaan belanja, maupun domisili",
            "Kebutuhan utama: belum dikaitkan dengan manfaat vitamin C dan bahan alami produk",
          ],
        },
        {
          id: "s1w",
          headline: "Keluarga Indonesia",
          fields: {
            nama: "Keluarga Indonesia",
            kriteria: "Demografi",
            karakteristik: "Keluarga yang tinggal di kota maupun desa.",
            kebutuhan: "Ingin anggota keluarganya sehat.",
          },
          points: [
            "Kriteria: Demografi, tetapi unit segmennya terlalu besar",
            "Karakteristik: kota dan desa digabung padahal akses distribusi dan daya belinya berbeda",
            "Kebutuhan utama: terlalu umum untuk dijadikan dasar pesan promosi",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "s1p",
          headline: "Semua Orang di Indonesia",
          fields: {
            nama: "Semua Orang di Indonesia",
            kriteria: "Tidak ada kriteria segmentasi",
            karakteristik: "Siapa saja yang haus dan ingin minum.",
            kebutuhan: "Membutuhkan minuman.",
          },
          points: [
            "Tidak menggunakan kriteria demografi, psikografi, perilaku, maupun geografis",
            "Menyasar semua orang sama saja dengan tidak melakukan segmentasi",
            "Kebutuhan utama tidak menjelaskan apa pun tentang produk",
          ],
        },
        {
          id: "s1q",
          headline: "Penderita Diabetes yang Harus Menghindari Gula",
          fields: {
            nama: "Penderita Diabetes yang Harus Menghindari Gula",
            kriteria: "Demografi/medis",
            karakteristik: "Konsumen dengan pantangan gula ketat atas anjuran dokter.",
            kebutuhan: "Membutuhkan minuman tanpa kandungan gula sama sekali.",
          },
          points: [
            "Bertentangan dengan produk: sari buah alami tetap mengandung gula buah",
            "Segmen ini justru harus membatasi konsumsi produk sejenis",
            "Kebutuhan utamanya tidak dapat dipenuhi oleh VitaFresh",
          ],
        },
        {
          id: "s1r",
          headline: "Penggemar Kopi Hitam Tanpa Gula",
          fields: {
            nama: "Penggemar Kopi Hitam Tanpa Gula",
            kriteria: "Demografi",
            karakteristik: "Konsumen yang setiap hari minum kopi hitam pahit.",
            kebutuhan: "Mencari kopi dengan tingkat kepahitan tertentu.",
          },
          points: [
            "Salah kategori produk: kebutuhannya kopi, bukan sari buah",
            "Preferensi rasa pahit berlawanan dengan karakter minuman buah",
            "Bukan kriteria demografi, melainkan preferensi produk lain",
          ],
        },
        {
          id: "s1s",
          headline: "Pemilik Kendaraan Bermotor",
          fields: {
            nama: "Pemilik Kendaraan Bermotor",
            kriteria: "Kepemilikan aset",
            karakteristik: "Orang yang memiliki sepeda motor atau mobil pribadi.",
            kebutuhan: "Membutuhkan bahan bakar dan perawatan kendaraan.",
          },
          points: [
            "Kepemilikan kendaraan tidak berhubungan dengan kebutuhan minuman kesehatan",
            "Bukan salah satu dari empat kriteria segmentasi yang diminta",
            "Kebutuhan utama sama sekali tidak relevan dengan produk",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 2. SEGMENTASI — Segmen 2 (fokus kriteria Psikografi)               */
/* ================================================================== */

const segmen2: ChoiceGroup = {
  id: "seg2",
  label: "Segmen 2",
  question: "Segmen pasar kedua — berbasis kriteria Psikografi",
  hint: "Psikografi menyorot gaya hidup, nilai, dan minat konsumen.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "s2a",
          headline: "Pegiat Gaya Hidup Sehat (Health Conscious)",
          fields: {
            nama: "Pegiat Gaya Hidup Sehat (Health Conscious)",
            kriteria: "Psikografi",
            karakteristik:
              "Konsumen yang menjadikan kesehatan sebagai prioritas, rutin membaca label gizi, menghindari pemanis buatan, dan bersedia membayar lebih untuk produk alami.",
            kebutuhan:
              "Minuman dengan bahan alami dan kandungan vitamin C yang jelas takarannya, sebagai bagian dari rutinitas menjaga imunitas harian.",
          },
          points: [
            "Kriteria: Psikografi (nilai dan prioritas hidup sehat)",
            "Karakteristik: rutin membaca label gizi, menghindari pemanis buatan, bersedia membayar lebih untuk produk alami",
            "Kebutuhan utama: minuman alami dengan kandungan vitamin C yang jelas untuk rutinitas menjaga imunitas",
          ],
        },
        {
          id: "s2b",
          headline: "Komunitas Olahraga & Kebugaran",
          fields: {
            nama: "Komunitas Olahraga & Kebugaran",
            kriteria: "Psikografi",
            karakteristik:
              "Anggota komunitas lari, gym, dan bersepeda yang berlatih tiga kali seminggu atau lebih, aktif berbagi rekomendasi produk di dalam komunitasnya.",
            kebutuhan:
              "Minuman pemulih setelah berlatih yang menyegarkan, rendah bahan sintetis, dan membantu menjaga stamina tanpa rasa berat di perut.",
          },
          points: [
            "Kriteria: Psikografi (minat dan aktivitas kebugaran)",
            "Karakteristik: berlatih minimal tiga kali seminggu, aktif berbagi rekomendasi di komunitas",
            "Kebutuhan utama: minuman pemulih setelah latihan yang menyegarkan dan rendah bahan sintetis",
          ],
        },
        {
          id: "s2c",
          headline: "Konsumen Sadar Nutrisi (Clean Eating)",
          fields: {
            nama: "Konsumen Sadar Nutrisi (Clean Eating)",
            kriteria: "Psikografi",
            karakteristik:
              "Konsumen yang menerapkan pola makan minim olahan, memilih produk dengan daftar bahan pendek, dan menaruh curiga pada klaim kesehatan yang berlebihan.",
            kebutuhan:
              "Produk dengan komposisi transparan dan bahan yang dapat dikenali, agar bisa masuk ke pola makan sehat yang sudah mereka jalani.",
          },
          points: [
            "Kriteria: Psikografi (nilai dan pola konsumsi)",
            "Karakteristik: memilih produk dengan daftar bahan pendek, kritis terhadap klaim kesehatan berlebihan",
            "Kebutuhan utama: komposisi transparan dengan bahan yang mudah dikenali",
          ],
        },
        {
          id: "s2d",
          headline: "Penganut Gaya Hidup Aktif & Wellness",
          fields: {
            nama: "Penganut Gaya Hidup Aktif & Wellness",
            kriteria: "Psikografi",
            karakteristik:
              "Konsumen yang memandang kesehatan sebagai bagian dari citra diri, mengikuti tren wellness, dan menganggap produk yang dikonsumsi mencerminkan nilai pribadinya.",
            kebutuhan:
              "Minuman yang selaras dengan citra hidup aktif, mudah dikonsumsi di sela kegiatan, dan pantas ditampilkan di lingkaran sosialnya.",
          },
          points: [
            "Kriteria: Psikografi (citra diri dan tren wellness)",
            "Karakteristik: memandang produk yang dikonsumsi sebagai cerminan nilai pribadi",
            "Kebutuhan utama: minuman yang selaras dengan citra hidup aktif dan mudah dikonsumsi di sela kegiatan",
          ],
        },
        {
          id: "s2e",
          headline: "Keluarga Muda Peduli Imunitas",
          fields: {
            nama: "Keluarga Muda Peduli Imunitas",
            kriteria: "Psikografi",
            karakteristik:
              "Keluarga muda yang sejak pandemi menjadikan daya tahan tubuh sebagai perhatian utama dan menyediakan stok produk kesehatan di rumah.",
            kebutuhan:
              "Minuman bervitamin C yang aman dikonsumsi seluruh anggota keluarga setiap hari, dengan rasa yang disukai anak.",
          },
          points: [
            "Kriteria: Psikografi (nilai dan kekhawatiran terhadap kesehatan keluarga)",
            "Karakteristik: menjadikan daya tahan tubuh sebagai perhatian utama, rutin menyetok produk kesehatan",
            "Kebutuhan utama: minuman bervitamin C yang aman untuk seluruh anggota keluarga",
          ],
        },
        {
          id: "s2f",
          headline: "Konsumen Peduli Produk Ramah Lingkungan",
          fields: {
            nama: "Konsumen Peduli Produk Ramah Lingkungan",
            kriteria: "Psikografi",
            karakteristik:
              "Konsumen yang mempertimbangkan asal bahan baku dan kemasan sebelum membeli, serta cenderung loyal pada merek yang nilainya sejalan dengan mereka.",
            kebutuhan:
              "Minuman berbahan buah asli dari sumber yang jelas dengan kemasan yang bertanggung jawab, bukan sekadar sehat di label.",
          },
          points: [
            "Kriteria: Psikografi (nilai keberlanjutan dan etika konsumsi)",
            "Karakteristik: mempertimbangkan asal bahan baku dan kemasan, loyal pada merek yang nilainya sejalan",
            "Kebutuhan utama: bahan buah asli dari sumber jelas dengan kemasan yang bertanggung jawab",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "s2x",
          headline: "Orang yang Suka Hidup Sehat",
          fields: {
            nama: "Orang yang Suka Hidup Sehat",
            kriteria: "Psikografi",
            karakteristik: "Orang-orang yang ingin hidup sehat.",
            kebutuhan: "Butuh minuman yang sehat.",
          },
          points: [
            "Kriteria: Psikografi sudah benar",
            "Karakteristik: hanya mengulang nama segmen, belum menjelaskan kebiasaan nyata",
            "Kebutuhan utama: belum menyebut manfaat spesifik seperti vitamin C atau bahan alami",
          ],
        },
        {
          id: "s2y",
          headline: "Konsumen yang Peduli Penampilan",
          fields: {
            nama: "Konsumen yang Peduli Penampilan",
            kriteria: "Psikografi",
            karakteristik: "Orang yang ingin terlihat menarik dan bugar.",
            kebutuhan: "Ingin produk yang mendukung penampilan.",
          },
          points: [
            "Kriteria: Psikografi sudah benar, tetapi fokusnya bergeser ke penampilan, bukan kesehatan",
            "Karakteristik: belum menjelaskan kebiasaan konsumsi maupun daya beli",
            "Kebutuhan utama: hubungan dengan keunggulan VitaFresh masih lemah",
          ],
        },
        {
          id: "s2z",
          headline: "Orang yang Suka Berolahraga",
          fields: {
            nama: "Orang yang Suka Berolahraga",
            kriteria: "Psikografi",
            karakteristik: "Orang yang rutin berolahraga.",
            kebutuhan: "Butuh minuman setelah olahraga.",
          },
          points: [
            "Kriteria: Psikografi sudah benar",
            "Karakteristik: belum menyebut frekuensi, jenis olahraga, maupun komunitasnya",
            "Kebutuhan utama: belum menjelaskan mengapa harus VitaFresh dan bukan air mineral biasa",
          ],
        },
        {
          id: "s2w",
          headline: "Pecinta Produk Alami",
          fields: {
            nama: "Pecinta Produk Alami",
            kriteria: "Psikografi",
            karakteristik: "Konsumen yang menyukai produk berbahan alami.",
            kebutuhan: "Mencari produk yang tidak mengandung bahan kimia.",
          },
          points: [
            "Kriteria: Psikografi sudah benar",
            "Karakteristik: masih berupa preferensi umum tanpa gambaran gaya hidup",
            "Kebutuhan utama: klaim 'tanpa bahan kimia' kurang tepat secara teknis dan tidak terukur",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "s2p",
          headline: "Pencari Minuman Berenergi Berkafein Tinggi",
          fields: {
            nama: "Pencari Minuman Berenergi Berkafein Tinggi",
            kriteria: "Psikografi",
            karakteristik: "Konsumen yang mengandalkan kafein dosis tinggi untuk begadang.",
            kebutuhan: "Efek dorongan energi instan yang kuat.",
          },
          points: [
            "Kebutuhan intinya kafein, sementara VitaFresh adalah sari buah bervitamin C",
            "Menyasar segmen ini akan mengaburkan citra produk sebagai minuman sehat",
            "Janji produk tidak akan mampu memenuhi ekspektasi segmen tersebut",
          ],
        },
        {
          id: "s2q",
          headline: "Penggemar Minuman Bersoda Manis",
          fields: {
            nama: "Penggemar Minuman Bersoda Manis",
            kriteria: "Psikografi",
            karakteristik: "Konsumen yang menyukai sensasi soda dan rasa sangat manis.",
            kebutuhan: "Sensasi berkarbonasi dan rasa manis pekat.",
          },
          points: [
            "Preferensi rasa berlawanan dengan positioning minuman alami rendah gula",
            "Segmen ini justru menjadi pasar produk pesaing kategori lain",
            "Kebutuhan utamanya tidak dapat dipenuhi produk",
          ],
        },
        {
          id: "s2r",
          headline: "Kolektor Barang Antik",
          fields: {
            nama: "Kolektor Barang Antik",
            kriteria: "Minat/hobi",
            karakteristik: "Orang yang gemar mengumpulkan barang koleksi lama.",
            kebutuhan: "Mencari barang langka bernilai koleksi.",
          },
          points: [
            "Minat kolektor tidak berhubungan dengan konsumsi minuman kesehatan",
            "Tidak ada kebutuhan yang bisa dijawab oleh produk",
            "Segmen tidak dapat dijadikan dasar strategi promosi VitaFresh",
          ],
        },
        {
          id: "s2s",
          headline: "Konsumen yang Anti Membeli Minuman Kemasan",
          fields: {
            nama: "Konsumen yang Anti Membeli Minuman Kemasan",
            kriteria: "Psikografi",
            karakteristik: "Konsumen yang berprinsip hanya membuat minuman sendiri di rumah.",
            kebutuhan: "Menghindari seluruh produk minuman kemasan.",
          },
          points: [
            "Nilai yang dianut segmen ini justru menolak kategori produk VitaFresh",
            "Biaya edukasi pasarnya sangat tinggi dengan peluang konversi kecil",
            "Bukan pilihan yang masuk akal sebagai segmen potensial",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3. SEGMENTASI — Segmen 3 (fokus Perilaku / Geografis)              */
/* ================================================================== */

const segmen3: ChoiceGroup = {
  id: "seg3",
  label: "Segmen 3",
  question: "Segmen pasar ketiga — berbasis kriteria Perilaku atau Geografis",
  hint: "Perilaku menyorot kebiasaan membeli; Geografis menyorot lokasi konsumen.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "s3a",
          headline: "Pekerja Mobilitas Tinggi di Kota Besar",
          fields: {
            nama: "Pekerja Mobilitas Tinggi di Kota Besar",
            kriteria: "Geografis & Perilaku",
            karakteristik:
              "Pekerja di Jabodetabek, Bandung, dan Surabaya yang menghabiskan lebih dari dua jam di perjalanan setiap hari dan terbiasa membeli minuman di minimarket atau stasiun.",
            kebutuhan:
              "Minuman siap minum yang mudah dijangkau di jalur harian mereka dan membantu menjaga kebugaran meski waktu istirahat terbatas.",
          },
          points: [
            "Kriteria: Geografis (kota besar) dan Perilaku (kebiasaan membeli saat perjalanan)",
            "Karakteristik: lebih dari dua jam perjalanan per hari, rutin membeli minuman di minimarket atau stasiun",
            "Kebutuhan utama: minuman siap minum yang mudah dijangkau di jalur harian",
          ],
        },
        {
          id: "s3b",
          headline: "Pembeli Online & Pengguna Layanan Pesan-Antar",
          fields: {
            nama: "Pembeli Online & Pengguna Layanan Pesan-Antar",
            kriteria: "Perilaku",
            karakteristik:
              "Konsumen yang berbelanja lewat e-commerce dan aplikasi pesan-antar minimal dua kali sebulan, sensitif terhadap promo bundling, dan rutin membaca ulasan sebelum membeli.",
            kebutuhan:
              "Kemudahan membeli dalam paket isi banyak dengan harga satuan lebih hemat, tanpa harus keluar rumah.",
          },
          points: [
            "Kriteria: Perilaku (saluran dan frekuensi pembelian)",
            "Karakteristik: belanja daring minimal dua kali sebulan, responsif terhadap promo bundling, membaca ulasan",
            "Kebutuhan utama: pembelian paket isi banyak dengan harga satuan lebih hemat",
          ],
        },
        {
          id: "s3c",
          headline: "Konsumen Loyal Produk Kesehatan (Repeat Buyer)",
          fields: {
            nama: "Konsumen Loyal Produk Kesehatan (Repeat Buyer)",
            kriteria: "Perilaku",
            karakteristik:
              "Konsumen yang sudah rutin membeli vitamin, madu, atau minuman herbal setiap bulan dan cenderung bertahan pada merek yang terbukti cocok.",
            kebutuhan:
              "Produk kesehatan yang konsisten mutunya dan selalu tersedia, agar rutinitas konsumsi bulanannya tidak terputus.",
          },
          points: [
            "Kriteria: Perilaku (tingkat loyalitas dan pola pembelian berulang)",
            "Karakteristik: rutin membeli produk kesehatan bulanan, loyal pada merek yang terbukti cocok",
            "Kebutuhan utama: mutu konsisten dan ketersediaan produk yang terjaga",
          ],
        },
        {
          id: "s3d",
          headline: "Pembeli Rutin Minimarket & Convenience Store",
          fields: {
            nama: "Pembeli Rutin Minimarket & Convenience Store",
            kriteria: "Perilaku",
            karakteristik:
              "Konsumen yang mampir ke minimarket hampir setiap hari, memutuskan pembelian dalam hitungan detik di depan lemari pendingin, dan mudah tergoda kemasan yang menonjol.",
            kebutuhan:
              "Produk yang mudah dikenali di rak pendingin dengan manfaat yang langsung terbaca dari kemasannya.",
          },
          points: [
            "Kriteria: Perilaku (tempat, frekuensi, dan cara mengambil keputusan pembelian)",
            "Karakteristik: mampir hampir setiap hari, memutuskan pembelian dalam hitungan detik di depan lemari pendingin",
            "Kebutuhan utama: produk yang mudah dikenali di rak dengan manfaat yang langsung terbaca",
          ],
        },
        {
          id: "s3e",
          headline: "Konsumen Kota Besar Jawa (Jabodetabek, Bandung, Surabaya)",
          fields: {
            nama: "Konsumen Kota Besar Jawa (Jabodetabek, Bandung, Surabaya)",
            kriteria: "Geografis",
            karakteristik:
              "Penduduk kota besar dengan kepadatan tinggi, akses ritel modern yang merata, tingkat polusi tinggi, dan kesadaran kesehatan di atas rata-rata nasional.",
            kebutuhan:
              "Asupan vitamin C harian untuk menjaga daya tahan tubuh di lingkungan padat dan berpolusi, dengan produk yang mudah didapat di sekitar tempat tinggal.",
          },
          points: [
            "Kriteria: Geografis (wilayah dengan kepadatan dan akses ritel tinggi)",
            "Karakteristik: kepadatan tinggi, ritel modern merata, polusi tinggi, kesadaran kesehatan di atas rata-rata",
            "Kebutuhan utama: asupan vitamin C harian yang mudah didapat di lingkungan sekitar",
          ],
        },
        {
          id: "s3f",
          headline: "Pembeli Saat Momen Tertentu (Sakit, Lelah, Cuaca Ekstrem)",
          fields: {
            nama: "Pembeli Saat Momen Tertentu (Sakit, Lelah, Cuaca Ekstrem)",
            kriteria: "Perilaku",
            karakteristik:
              "Konsumen yang membeli minuman kesehatan saat merasa mulai tidak enak badan, sehabis lembur, atau ketika musim pancaroba tiba.",
            kebutuhan:
              "Produk yang segera terasa menyegarkan dan dipercaya membantu pemulihan saat kondisi tubuh sedang menurun.",
          },
          points: [
            "Kriteria: Perilaku (kesempatan atau momen pembelian)",
            "Karakteristik: membeli saat mulai tidak enak badan, sehabis lembur, atau saat pancaroba",
            "Kebutuhan utama: produk menyegarkan yang dipercaya membantu pemulihan kondisi tubuh",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "s3x",
          headline: "Orang yang Belanja Online",
          fields: {
            nama: "Orang yang Belanja Online",
            kriteria: "Perilaku",
            karakteristik: "Konsumen yang terbiasa belanja lewat aplikasi.",
            kebutuhan: "Ingin belanja yang praktis.",
          },
          points: [
            "Kriteria: Perilaku sudah benar",
            "Karakteristik: belum menyebut frekuensi belanja, jenis produk, maupun sensitivitas harga",
            "Kebutuhan utama: masih umum dan belum dikaitkan dengan produk minuman kesehatan",
          ],
        },
        {
          id: "s3y",
          headline: "Konsumen Perkotaan",
          fields: {
            nama: "Konsumen Perkotaan",
            kriteria: "Geografis",
            karakteristik: "Orang yang tinggal di kota.",
            kebutuhan: "Butuh minuman praktis.",
          },
          points: [
            "Kriteria: Geografis sudah benar",
            "Karakteristik: tidak menyebut kota mana, sehingga sulit menyusun rencana distribusi",
            "Kebutuhan utama: belum menjelaskan alasan spesifik kota memerlukan produk ini",
          ],
        },
        {
          id: "s3z",
          headline: "Pembeli di Supermarket",
          fields: {
            nama: "Pembeli di Supermarket",
            kriteria: "Perilaku",
            karakteristik: "Konsumen yang berbelanja di supermarket.",
            kebutuhan: "Mencari minuman di rak supermarket.",
          },
          points: [
            "Kriteria: Perilaku sudah benar",
            "Karakteristik: hanya menyebut lokasi belanja tanpa frekuensi atau nilai belanja",
            "Kebutuhan utama: baru menggambarkan tempat, bukan kebutuhan konsumen",
          ],
        },
        {
          id: "s3w",
          headline: "Orang yang Sering Bepergian",
          fields: {
            nama: "Orang yang Sering Bepergian",
            kriteria: "Perilaku",
            karakteristik: "Konsumen yang sering dalam perjalanan.",
            kebutuhan: "Butuh minuman yang mudah dibawa.",
          },
          points: [
            "Kriteria: Perilaku sudah benar",
            "Karakteristik: belum jelas bepergian untuk apa, seberapa sering, dan di wilayah mana",
            "Kebutuhan utama: baru menyentuh kepraktisan, belum menyentuh manfaat kesehatan produk",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "s3p",
          headline: "Warga Daerah Tanpa Akses Distribusi Produk",
          fields: {
            nama: "Warga Daerah Tanpa Akses Distribusi Produk",
            kriteria: "Geografis",
            karakteristik: "Konsumen di wilayah yang belum terjangkau jalur distribusi perusahaan.",
            kebutuhan: "Tidak dapat membeli produk karena tidak tersedia di daerahnya.",
          },
          points: [
            "Segmen tidak dapat dilayani karena produk belum tersedia di sana",
            "Biaya membangun distribusi jauh melampaui potensi penjualannya",
            "Bukan segmen potensial untuk peluncuran awal",
          ],
        },
        {
          id: "s3q",
          headline: "Pengguna Aplikasi Game Online",
          fields: {
            nama: "Pengguna Aplikasi Game Online",
            kriteria: "Perilaku digital",
            karakteristik: "Konsumen yang menghabiskan waktu bermain gim daring.",
            kebutuhan: "Mencari item dan hiburan di dalam gim.",
          },
          points: [
            "Perilaku bermain gim tidak menunjukkan kebutuhan akan minuman kesehatan",
            "Kebutuhan utama yang disebut sama sekali di luar kategori produk",
            "Tidak dapat dijadikan dasar penyusunan strategi STP",
          ],
        },
        {
          id: "s3r",
          headline: "Semua Pembeli Minuman Apa Pun",
          fields: {
            nama: "Semua Pembeli Minuman Apa Pun",
            kriteria: "Tidak ada kriteria segmentasi",
            karakteristik: "Siapa pun yang pernah membeli minuman.",
            kebutuhan: "Membeli minuman.",
          },
          points: [
            "Tidak membagi pasar sama sekali, sehingga bukan segmentasi",
            "Tidak ada karakteristik pembeda yang bisa dipakai menyusun pesan",
            "Kebutuhan utama hanya mengulang nama segmen",
          ],
        },
        {
          id: "s3s",
          headline: "Pelanggan Bengkel Motor",
          fields: {
            nama: "Pelanggan Bengkel Motor",
            kriteria: "Perilaku",
            karakteristik: "Orang yang rutin menyervis kendaraannya.",
            kebutuhan: "Membutuhkan suku cadang dan jasa servis.",
          },
          points: [
            "Perilaku servis kendaraan tidak berkaitan dengan konsumsi minuman kesehatan",
            "Kebutuhan utama berada di kategori jasa, bukan produk minuman",
            "Tidak mendukung tujuan promosi VitaFresh",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 4. TARGETING — pilih 1 target pasar utama                          */
/* ================================================================== */

const targetUtama: ChoiceGroup = {
  id: "target",
  label: "Target Utama",
  question: "Pilih 1 target pasar utama yang paling potensial",
  hint: "Pilihan akan otomatis mengikuti nama segmen yang sudah kamu tentukan di nomor 1.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "t1a",
          headline: "Fokus pada {{seg1}}",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg1}}. Perusahaan memusatkan seluruh bauran promosi, penetapan harga, dan penempatan produk pada satu segmen ini terlebih dahulu sebelum melakukan perluasan ke segmen lainnya.",
          fields: { target: "{{seg1}}" },
          points: [
            "Menetapkan {{seg1}} sebagai satu-satunya target utama tahap awal",
            "Seluruh bauran promosi, harga, dan penempatan produk difokuskan ke segmen ini",
            "Segmen lain diposisikan sebagai pasar perluasan pada tahap berikutnya",
          ],
        },
        {
          id: "t1b",
          headline: "Fokus pada {{seg2}}",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg2}}. Segmen ini dijadikan pijakan awal karena kebutuhannya paling dekat dengan keunggulan inti VitaFresh, sehingga pesan produk dapat disampaikan tanpa perlu edukasi pasar yang panjang.",
          fields: { target: "{{seg2}}" },
          points: [
            "Menetapkan {{seg2}} sebagai target utama tahap awal",
            "Kebutuhan segmen paling dekat dengan keunggulan inti produk",
            "Pesan produk dapat langsung diterima tanpa edukasi pasar yang panjang",
          ],
        },
        {
          id: "t1c",
          headline: "Fokus pada {{seg1}} dengan {{seg2}} sebagai pasar sekunder",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg1}}, sementara {{seg2}} diperlakukan sebagai pasar sekunder. Sumber daya promosi dialokasikan terutama untuk target utama, dengan porsi kecil untuk menjaga kehadiran produk di pasar sekunder.",
          fields: { target: "{{seg1}}" },
          points: [
            "{{seg1}} ditetapkan sebagai target utama dan penerima porsi promosi terbesar",
            "{{seg2}} diposisikan sebagai pasar sekunder dengan porsi anggaran kecil",
            "Prioritas sumber daya menjadi jelas dan terukur",
          ],
        },
        {
          id: "t1d",
          headline: "Fokus pada {{seg2}} dengan pendekatan komunitas",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg2}}, dengan pendekatan berbasis komunitas. Perusahaan menggarap segmen ini melalui kegiatan dan kemitraan komunitas agar rekomendasi antarkonsumen berjalan secara alami.",
          fields: { target: "{{seg2}}" },
          points: [
            "{{seg2}} ditetapkan sebagai target utama",
            "Digarap melalui kegiatan dan kemitraan komunitas, bukan iklan massal",
            "Mendorong rekomendasi antarkonsumen yang berjalan secara alami",
          ],
        },
        {
          id: "t1e",
          headline: "Fokus pada {{seg3}}",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg3}}. Segmen ini dipilih karena pola pembeliannya sudah terbentuk dan jalur distribusinya paling siap, sehingga produk dapat cepat menjangkau konsumen sejak masa peluncuran.",
          fields: { target: "{{seg3}}" },
          points: [
            "{{seg3}} ditetapkan sebagai target utama tahap awal",
            "Pola pembelian segmen sudah terbentuk sehingga siklus penjualan lebih pendek",
            "Jalur distribusi paling siap untuk menjangkau segmen sejak masa peluncuran",
          ],
        },
        {
          id: "t1f",
          headline: "Fokus pada {{seg1}} sebagai pintu masuk pasar",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg1}}, yang diperlakukan sebagai pintu masuk pasar. Keberhasilan di segmen ini akan dijadikan bukti sosial untuk merambah segmen lain pada tahap berikutnya.",
          fields: { target: "{{seg1}}" },
          points: [
            "{{seg1}} dijadikan pintu masuk pasar pada tahap peluncuran",
            "Keberhasilan di segmen ini dipakai sebagai bukti sosial untuk segmen berikutnya",
            "Perluasan pasar dilakukan bertahap, bukan serentak",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "t2a",
          headline: "Fokus pada {{seg1}}, tetapi tanpa pembatasan yang jelas",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg1}}. Namun promosi tetap dijalankan ke semua kalangan yang berminat, sehingga batas segmennya menjadi kabur.",
          fields: { target: "{{seg1}}" },
          points: [
            "Target utama sudah ditetapkan, yaitu {{seg1}}",
            "Namun promosi tetap disebar ke semua kalangan sehingga batas segmen menjadi kabur",
            "Fokus sumber daya belum benar-benar terjadi",
          ],
        },
        {
          id: "t2b",
          headline: "Dua segmen sekaligus: {{seg1}} dan {{seg2}}",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg1}} dan {{seg2}} secara bersamaan dengan porsi yang sama besar, meskipun instruksi tugas meminta satu target utama.",
          fields: { target: "{{seg1}} dan {{seg2}}" },
          points: [
            "Menetapkan dua segmen dengan porsi sama besar, padahal diminta satu target utama",
            "Anggaran promosi terbagi sehingga dampaknya di tiap segmen melemah",
            "Prioritas antar-segmen belum ditentukan",
          ],
        },
        {
          id: "t2c",
          headline: "Fokus pada {{seg2}} berdasarkan perkiraan saja",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg2}}, dipilih berdasarkan perkiraan bahwa segmen ini terlihat paling ramai, tanpa didukung pertimbangan ukuran pasar maupun daya beli.",
          fields: { target: "{{seg2}}" },
          points: [
            "Target sudah mengerucut ke satu segmen, yaitu {{seg2}}",
            "Dasar pemilihannya hanya perkiraan, bukan pertimbangan ukuran pasar atau daya beli",
            "Keputusan sulit dipertanggungjawabkan kepada manajemen",
          ],
        },
        {
          id: "t2d",
          headline: "Fokus pada {{seg3}}, tetapi tanpa rencana penggarapan",
          narrative:
            "Target pasar utama yang dipilih adalah {{seg3}}, namun belum disertai gambaran bagaimana segmen tersebut akan digarap melalui promosi maupun distribusi.",
          fields: { target: "{{seg3}}" },
          points: [
            "Target utama sudah mengerucut ke {{seg3}}",
            "Belum ada gambaran cara menggarap segmen melalui promosi maupun distribusi",
            "Strategi berhenti di tahap penetapan nama segmen",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "t3a",
          headline: "Menyasar ketiga segmen sekaligus dengan cara yang sama",
          narrative:
            "Perusahaan menyasar ketiga segmen sekaligus dengan pesan, harga, dan saluran promosi yang persis sama, tanpa menetapkan target utama.",
          fields: { target: "Semua segmen tanpa prioritas" },
          points: [
            "Tidak menetapkan target utama seperti yang diminta instruksi",
            "Pesan, harga, dan saluran dibuat seragam padahal kebutuhan tiap segmen berbeda",
            "Anggaran habis terbagi tanpa dampak yang terukur di segmen mana pun",
          ],
        },
        {
          id: "t3b",
          headline: "Menyasar seluruh masyarakat Indonesia",
          narrative:
            "Perusahaan memutuskan menyasar seluruh masyarakat Indonesia tanpa membedakan segmen, dengan asumsi semakin luas sasaran maka semakin besar penjualannya.",
          fields: { target: "Seluruh masyarakat Indonesia" },
          points: [
            "Membatalkan seluruh hasil segmentasi yang sudah disusun di nomor 1",
            "Asumsi 'semakin luas semakin laku' tidak berlaku untuk produk baru dengan anggaran terbatas",
            "Tidak ada dasar untuk menyusun positioning yang tajam",
          ],
        },
        {
          id: "t3c",
          headline: "Menyasar segmen di luar hasil analisis",
          narrative:
            "Perusahaan memilih menyasar segmen yang sama sekali tidak muncul dalam analisis segmentasi, yaitu konsumen minuman berenergi berkafein tinggi.",
          fields: { target: "Konsumen minuman berenergi berkafein tinggi" },
          points: [
            "Target tidak berhubungan dengan tiga segmen yang sudah dianalisis",
            "Kebutuhan segmen tersebut tidak dapat dipenuhi oleh VitaFresh",
            "Alur Segmentasi ke Targeting menjadi terputus",
          ],
        },
        {
          id: "t3d",
          headline: "Menyerahkan penentuan target kepada distributor",
          narrative:
            "Perusahaan tidak menetapkan target pasar dan menyerahkan sepenuhnya kepada distributor untuk menjual ke siapa pun yang mau membeli.",
          fields: { target: "Tidak ditentukan" },
          points: [
            "Tidak ada keputusan targeting yang dibuat oleh perusahaan",
            "Positioning tidak mungkin disusun karena sasarannya tidak diketahui",
            "Instruksi tugas untuk memilih satu target utama tidak dijalankan",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 5. TARGETING — alasan pemilihan target                             */
/* ================================================================== */

const alasanTarget: ChoiceGroup = {
  id: "alasan",
  label: "Alasan",
  question: "Alasan pemilihan target pasar tersebut",
  hint: "PDF meminta alasan seperti ukuran pasar, daya beli, dan potensi pertumbuhan.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "a1a",
          headline: "Ukuran pasar besar, daya beli memadai, pertumbuhan cepat",
          points: [
            "Ukuran pasar: kelompok ini merupakan salah satu populasi konsumen terbesar di kota-kota besar, sehingga potensi volume penjualannya tinggi.",
            "Daya beli: pengeluaran rutin mereka untuk jajan dan minuman kemasan sudah terbentuk dan sesuai dengan rentang harga VitaFresh.",
            "Potensi pertumbuhan: kesadaran akan minuman rendah gula dan berbasis buah asli terus meningkat setiap tahun di kelompok ini.",
            "Kemudahan dijangkau: aktif di media sosial dan ritel modern, sehingga biaya promosi per konsumen relatif efisien.",
          ],
        },
        {
          id: "a1b",
          headline: "Kebutuhan paling cocok, biaya edukasi rendah, mudah dijangkau",
          points: [
            "Kesesuaian kebutuhan: masalah utama segmen ini, yaitu menjaga daya tahan tubuh secara praktis, persis dijawab oleh keunggulan VitaFresh.",
            "Biaya edukasi rendah: segmen sudah memahami manfaat vitamin C, sehingga promosi cukup menonjolkan keunggulan produk, bukan mengedukasi dari nol.",
            "Kemudahan dijangkau: terkonsentrasi di lokasi dan kanal digital tertentu sehingga promosi dapat diarahkan dengan tepat.",
            "Potensi pertumbuhan: tren gaya hidup sehat membuat jumlah konsumen di segmen ini terus bertambah.",
          ],
        },
        {
          id: "a1c",
          headline: "Frekuensi konsumsi tinggi dan potensi pembelian berulang",
          points: [
            "Frekuensi konsumsi: kebiasaan membeli minuman kemasan hampir setiap hari membuat nilai pembelian per konsumen dalam setahun cukup besar.",
            "Potensi pembelian berulang: bila cocok, segmen ini cenderung menjadikan produk sebagai konsumsi rutin, bukan pembelian sesekali.",
            "Daya beli: rentang harga minuman kesehatan masih berada dalam batas pengeluaran harian mereka.",
            "Ukuran pasar: jumlahnya besar dan tersebar merata di kota-kota yang sudah terjangkau distribusi perusahaan.",
          ],
        },
        {
          id: "a1d",
          headline: "Berpotensi menjadi penyebar rekomendasi ke segmen lain",
          points: [
            "Daya pengaruh: segmen ini aktif membagikan pengalaman produk di media sosial dan komunitasnya, sehingga menekan biaya promosi.",
            "Ukuran pasar: populasinya besar dan terus bertambah di wilayah perkotaan yang menjadi fokus distribusi awal.",
            "Daya beli: bersedia membayar lebih untuk produk yang dianggap alami dan bermanfaat bagi kesehatan.",
            "Potensi pertumbuhan: keberhasilan di segmen ini membuka jalan masuk ke segmen lain tanpa biaya promosi tambahan yang besar.",
          ],
        },
        {
          id: "a1e",
          headline: "Distribusi siap, persaingan belum padat, margin terjaga",
          points: [
            "Kesiapan distribusi: segmen ini berada di wilayah yang sudah terjangkau jaringan ritel modern dan layanan pesan-antar perusahaan.",
            "Tingkat persaingan: belum banyak merek yang menggarap segmen ini dengan pesan vitamin C dari buah asli, sehingga peluang masuk masih terbuka.",
            "Daya beli dan margin: segmen bersedia membayar harga premium wajar sehingga margin produk tetap terjaga.",
            "Potensi pertumbuhan: permintaan minuman fungsional di segmen ini tumbuh lebih cepat dibanding kategori minuman biasa.",
          ],
        },
        {
          id: "a1f",
          headline: "Sesuai kapasitas produksi dan anggaran promosi tahap awal",
          points: [
            "Kesesuaian kapasitas: ukuran segmen sebanding dengan kapasitas produksi awal, sehingga permintaan tidak melebihi kemampuan pasokan.",
            "Efisiensi anggaran: sasaran yang terfokus membuat anggaran promosi tahap awal cukup untuk mencapai jangkauan yang berarti.",
            "Daya beli: pola pengeluaran segmen sudah mencakup pembelian minuman kemasan secara rutin.",
            "Potensi pertumbuhan: bila segmen ini berhasil digarap, perluasan ke segmen berikutnya dapat dibiayai dari hasil penjualannya sendiri.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "a2a",
          headline: "Hanya menyebut jumlahnya banyak",
          points: [
            "Ukuran pasar: jumlah orang di segmen ini banyak.",
            "Belum menjelaskan daya beli maupun potensi pertumbuhan segmen.",
            "Belum menghubungkan alasan dengan keunggulan produk VitaFresh.",
          ],
        },
        {
          id: "a2b",
          headline: "Alasan benar tetapi tanpa penjelasan pendukung",
          points: [
            "Segmen ini dipilih karena punya daya beli yang bagus dan pasarnya sedang tumbuh.",
            "Tidak dijelaskan seberapa besar daya belinya dan apa yang membuat pasar tersebut tumbuh.",
            "Belum ada pertimbangan kesiapan distribusi maupun tingkat persaingan.",
          ],
        },
        {
          id: "a2c",
          headline: "Hanya menyorot kemudahan promosi",
          points: [
            "Segmen ini mudah dijangkau lewat media sosial sehingga promosinya gampang.",
            "Kemudahan promosi memang penting, tetapi bukan satu-satunya pertimbangan targeting.",
            "Ukuran pasar dan daya beli belum dibahas sama sekali.",
          ],
        },
        {
          id: "a2d",
          headline: "Mencampur alasan pasar dengan selera pribadi",
          points: [
            "Segmen ini dipilih karena pasarnya cukup besar dan kebetulan paling dekat dengan keseharian penyusun strategi.",
            "Sebagian alasan sudah tepat, tetapi preferensi pribadi bukan dasar keputusan targeting.",
            "Potensi pertumbuhan dan daya beli belum diuraikan.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "a3a",
          headline: "Karena paling gampang ditemui",
          points: [
            "Segmen ini dipilih karena paling gampang ditemui di sekitar kantor.",
            "Tidak mempertimbangkan ukuran pasar, daya beli, maupun potensi pertumbuhan.",
            "Alasan tidak dapat dipertanggungjawabkan sebagai dasar strategi.",
          ],
        },
        {
          id: "a3b",
          headline: "Karena mengikuti merek pesaing",
          points: [
            "Segmen ini dipilih semata-mata karena merek pesaing juga menyasar ke sana.",
            "Tidak ada analisis apakah segmen tersebut cocok dengan keunggulan VitaFresh.",
            "Berisiko masuk ke persaingan langsung tanpa keunggulan pembeda.",
          ],
        },
        {
          id: "a3c",
          headline: "Karena arahan atasan tanpa dasar analisis",
          points: [
            "Segmen ini dipilih karena diminta oleh atasan.",
            "Tidak ada pertimbangan ukuran pasar, daya beli, maupun potensi pertumbuhan.",
            "Instruksi tugas untuk menjelaskan alasan pemilihan tidak terpenuhi.",
          ],
        },
        {
          id: "a3d",
          headline: "Karena produknya bisa dipakai siapa saja",
          points: [
            "Produk ini bisa diminum siapa saja, jadi targetnya tidak perlu dipersempit.",
            "Pernyataan ini justru menghapus keputusan targeting yang sudah dibuat.",
            "Tidak ada satu pun kriteria pemilihan target yang dibahas.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 6. POSITIONING — strategi citra & keunggulan                       */
/* ================================================================== */

const strategiPositioning: ChoiceGroup = {
  id: "posisi",
  label: "Strategi Positioning",
  question: "Strategi positioning: citra dan keunggulan yang ingin ditanamkan",
  hint: "Positioning yang baik menegaskan pembeda produk di benak konsumen.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "p1a",
          headline: "Minuman vitamin C dari buah asli untuk generasi aktif",
          narrative:
            "VitaFresh diposisikan sebagai minuman sari buah alami dengan kandungan vitamin C tinggi yang menjadi teman harian generasi aktif dalam menjaga daya tahan tubuh.",
          points: [
            "Citra yang dibangun: minuman harian yang alami, jujur, dan dapat diandalkan untuk menjaga imunitas.",
            "Keunggulan utama: vitamin C tinggi yang berasal dari sari buah asli, bukan dari bahan tambahan sintetis.",
            "Pembeda dari pesaing: minuman buah kemasan lain menonjolkan rasa dan kesegaran, sementara VitaFresh menonjolkan manfaat gizi yang terukur.",
            "Bukti pendukung: komposisi buah asli dan takaran vitamin C dicantumkan jelas pada kemasan depan.",
          ],
        },
        {
          id: "p1b",
          headline: "Pengganti jus segar yang praktis tanpa kehilangan manfaat",
          narrative:
            "VitaFresh diposisikan sebagai pengganti jus buah segar yang praktis, sehingga konsumen tetap memperoleh asupan vitamin C harian tanpa harus repot membuatnya sendiri.",
          points: [
            "Citra yang dibangun: kepraktisan yang tidak mengorbankan mutu gizi.",
            "Keunggulan utama: manfaat setara jus buah segar dalam kemasan siap minum.",
            "Pembeda dari pesaing: bersaing dengan kerepotan membuat jus sendiri, bukan sekadar dengan sesama minuman kemasan.",
            "Bukti pendukung: kandungan buah asli dan tanpa tambahan pemanis buatan.",
          ],
        },
        {
          id: "p1c",
          headline: "Bekal imunitas harian di tengah rutinitas padat",
          narrative:
            "VitaFresh diposisikan sebagai bekal imunitas harian bagi konsumen dengan rutinitas padat, yang memerlukan asupan vitamin C tanpa menambah beban waktu maupun biaya.",
          points: [
            "Citra yang dibangun: pendamping rutinitas yang membuat konsumen tetap bugar meski jadwal padat.",
            "Keunggulan utama: satu botol memenuhi sebagian besar kebutuhan vitamin C harian.",
            "Pembeda dari pesaing: menyasar momen konsumsi harian yang berulang, bukan pembelian sesekali.",
            "Bukti pendukung: kemasan ukuran sekali minum yang mudah dibawa dan tersedia di ritel yang dilewati setiap hari.",
          ],
        },
        {
          id: "p1d",
          headline: "Minuman sehat yang jujur: manis dari buah, bukan dari gula tambahan",
          narrative:
            "VitaFresh diposisikan sebagai minuman sehat yang jujur, dengan rasa manis yang berasal dari buah asli dan bukan dari gula tambahan maupun pemanis buatan.",
          points: [
            "Citra yang dibangun: merek yang transparan dan dapat dipercaya soal isi produknya.",
            "Keunggulan utama: rasa manis alami dari buah tanpa pemanis buatan, dengan vitamin C tinggi.",
            "Pembeda dari pesaing: menjawab langsung kekhawatiran konsumen terhadap kandungan gula pada minuman kemasan.",
            "Bukti pendukung: daftar komposisi pendek dan informasi gizi yang ditampilkan terbuka.",
          ],
        },
        {
          id: "p1e",
          headline: "Teman pemulihan setelah aktivitas berat",
          narrative:
            "VitaFresh diposisikan sebagai minuman pemulih setelah beraktivitas, yang membantu mengembalikan kesegaran tubuh dengan vitamin C dari sari buah alami.",
          points: [
            "Citra yang dibangun: minuman yang hadir tepat pada momen tubuh membutuhkan pemulihan.",
            "Keunggulan utama: menyegarkan sekaligus mengembalikan asupan gizi setelah aktivitas berat.",
            "Pembeda dari pesaing: mengambil momen konsumsi yang berbeda dari minuman berenergi maupun air mineral.",
            "Bukti pendukung: kandungan vitamin C tinggi dari buah asli tanpa kafein.",
          ],
        },
        {
          id: "p1f",
          headline: "Pilihan sehat keluarga yang tetap disukai anak",
          narrative:
            "VitaFresh diposisikan sebagai minuman sehat keluarga yang tetap disukai anak-anak, sehingga orang tua tidak perlu memilih antara rasa yang disukai dan kandungan yang menyehatkan.",
          points: [
            "Citra yang dibangun: minuman yang membuat orang tua tenang dan anak tetap senang.",
            "Keunggulan utama: rasa buah asli yang disukai anak dengan vitamin C tinggi tanpa pemanis buatan.",
            "Pembeda dari pesaing: menghapus pertentangan antara 'enak' dan 'sehat' yang biasa dihadapi orang tua.",
            "Bukti pendukung: bahan alami, tanpa pewarna sintetis, dan tersedia dalam kemasan isi banyak untuk stok di rumah.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "p2a",
          headline: "Minuman berkualitas dan menyegarkan",
          narrative:
            "VitaFresh diposisikan sebagai minuman berkualitas yang menyegarkan dan baik untuk tubuh.",
          points: [
            "Citra yang dibangun: produk berkualitas dan menyegarkan.",
            "Keunggulan utama: rasanya enak dan menyehatkan.",
            "Belum ada pembeda yang jelas dari minuman kemasan lain, karena hampir semua merek mengaku berkualitas.",
          ],
        },
        {
          id: "p2b",
          headline: "Minuman sehat untuk semua kalangan",
          narrative:
            "VitaFresh diposisikan sebagai minuman sehat yang bisa dinikmati semua kalangan.",
          points: [
            "Citra yang dibangun: minuman sehat untuk siapa saja.",
            "Keunggulan utama: menyehatkan dan bisa diminum kapan saja.",
            "Positioning menjadi kabur karena tidak berpihak pada target pasar yang sudah dipilih.",
          ],
        },
        {
          id: "p2c",
          headline: "Menonjolkan rasa buah tanpa menyebut manfaat gizi",
          narrative:
            "VitaFresh diposisikan sebagai minuman dengan rasa buah yang enak dan bervariasi.",
          points: [
            "Citra yang dibangun: minuman buah dengan rasa yang enak.",
            "Keunggulan utama: pilihan rasa yang beragam.",
            "Keunggulan inti berupa vitamin C tinggi justru tidak dimunculkan sama sekali.",
          ],
        },
        {
          id: "p2d",
          headline: "Menonjolkan kemasan yang menarik",
          narrative:
            "VitaFresh diposisikan sebagai minuman dengan kemasan modern yang menarik untuk dibagikan di media sosial.",
          points: [
            "Citra yang dibangun: produk yang tampil menarik dan kekinian.",
            "Keunggulan utama: desain kemasan yang mencolok.",
            "Kemasan mudah ditiru pesaing sehingga tidak cukup kuat sebagai dasar positioning.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "p3a",
          headline: "Minuman termurah di pasaran",
          narrative:
            "VitaFresh diposisikan sebagai minuman paling murah di pasaran agar bisa dibeli siapa saja.",
          points: [
            "Citra yang dibangun: produk paling murah.",
            "Bertentangan dengan citra minuman kesehatan berbahan buah asli yang ingin dibangun.",
            "Memicu perang harga yang menggerus margin dan menurunkan persepsi mutu produk.",
          ],
        },
        {
          id: "p3b",
          headline: "Minuman berenergi untuk begadang",
          narrative:
            "VitaFresh diposisikan sebagai minuman berenergi yang membantu konsumen kuat begadang.",
          points: [
            "Citra yang dibangun keliru karena produk tidak mengandung kafein maupun stimulan.",
            "Menyesatkan konsumen dan berisiko menimbulkan kekecewaan setelah pembelian pertama.",
            "Menempatkan produk berhadapan langsung dengan kategori yang bukan keunggulannya.",
          ],
        },
        {
          id: "p3c",
          headline: "Obat penyembuh penyakit",
          narrative:
            "VitaFresh diposisikan sebagai minuman yang dapat menyembuhkan penyakit dan menggantikan obat.",
          points: [
            "Klaim menyembuhkan penyakit tidak boleh digunakan untuk produk minuman.",
            "Berisiko melanggar ketentuan iklan pangan olahan.",
            "Merusak kepercayaan konsumen begitu klaim tersebut tidak terbukti.",
          ],
        },
        {
          id: "p3d",
          headline: "Sama seperti merek lain yang sudah ada",
          narrative:
            "VitaFresh diposisikan sama persis dengan merek minuman buah yang sudah lebih dulu terkenal.",
          points: [
            "Tidak ada pembeda sehingga konsumen tidak punya alasan untuk berpindah.",
            "Bersaing langsung dengan merek mapan yang anggaran promosinya jauh lebih besar.",
            "Bertentangan dengan tujuan positioning, yaitu menempati posisi khas di benak konsumen.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 7. POSITIONING — kalimat positioning statement                     */
/* ================================================================== */

const positioningStatement: ChoiceGroup = {
  id: "statement",
  label: "Positioning Statement",
  question: "Kalimat positioning statement produk",
  hint: "Satu kalimat singkat yang menempel di benak konsumen.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "q1a",
          headline: "VitaFresh, sari buah asli bervitamin C untuk generasi aktif yang menjaga daya tahan tubuh setiap hari.",
          points: ["Menyebut produk, keunggulan inti, dan sasaran konsumen dalam satu kalimat."],
          fields: {
            statement:
              "VitaFresh, sari buah asli bervitamin C untuk generasi aktif yang menjaga daya tahan tubuh setiap hari.",
          },
        },
        {
          id: "q1b",
          headline: "VitaFresh, kesegaran buah asli dengan vitamin C tinggi untuk kamu yang selalu bergerak.",
          points: ["Menegaskan bahan alami dan kandungan gizi sekaligus menyapa target yang aktif."],
          fields: {
            statement:
              "VitaFresh, kesegaran buah asli dengan vitamin C tinggi untuk kamu yang selalu bergerak.",
          },
        },
        {
          id: "q1c",
          headline: "VitaFresh, satu botol vitamin C dari buah asli untuk menemani hari yang padat.",
          points: ["Menghubungkan keunggulan produk dengan momen konsumsi harian target pasar."],
          fields: {
            statement:
              "VitaFresh, satu botol vitamin C dari buah asli untuk menemani hari yang padat.",
          },
        },
        {
          id: "q1d",
          headline: "VitaFresh, manisnya dari buah, sehatnya dari vitamin C alami setiap hari.",
          points: ["Menonjolkan pembeda utama, yaitu manis alami tanpa gula tambahan."],
          fields: {
            statement:
              "VitaFresh, manisnya dari buah, sehatnya dari vitamin C alami setiap hari.",
          },
        },
        {
          id: "q1e",
          headline: "VitaFresh, jaga imunitas dengan cara yang praktis dan alami.",
          points: ["Menyatakan manfaat inti dengan bahasa singkat yang mudah diingat."],
          fields: {
            statement: "VitaFresh, jaga imunitas dengan cara yang praktis dan alami.",
          },
        },
        {
          id: "q1f",
          headline: "VitaFresh, minuman sari buah alami bervitamin C tinggi untuk gaya hidup sehat sehari-hari.",
          points: ["Merangkum keunggulan produk dan janji gaya hidup yang ingin diwakili."],
          fields: {
            statement:
              "VitaFresh, minuman sari buah alami bervitamin C tinggi untuk gaya hidup sehat sehari-hari.",
          },
        },
        {
          id: "q1g",
          headline: "VitaFresh, bekal vitamin C harian dari buah asli untuk keluarga yang aktif.",
          points: ["Menyapa segmen keluarga sambil tetap menegaskan keunggulan gizi produk."],
          fields: {
            statement:
              "VitaFresh, bekal vitamin C harian dari buah asli untuk keluarga yang aktif.",
          },
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "q2a",
          headline: "VitaFresh, minuman segar untuk semua.",
          points: ["Mudah diingat, tetapi tidak menyebut keunggulan maupun target pasar."],
          fields: { statement: "VitaFresh, minuman segar untuk semua." },
        },
        {
          id: "q2b",
          headline: "VitaFresh, minuman sehat pilihan keluarga Indonesia.",
          points: ["Menyebut sasaran, tetapi belum memunculkan pembeda produk."],
          fields: { statement: "VitaFresh, minuman sehat pilihan keluarga Indonesia." },
        },
        {
          id: "q2c",
          headline: "VitaFresh, rasakan kesegarannya sekarang juga.",
          points: ["Terdengar seperti ajakan iklan, belum menjelaskan posisi produk."],
          fields: { statement: "VitaFresh, rasakan kesegarannya sekarang juga." },
        },
        {
          id: "q2d",
          headline: "VitaFresh, minuman buah dengan banyak pilihan rasa.",
          points: ["Menonjolkan variasi rasa, tetapi keunggulan vitamin C tidak muncul."],
          fields: { statement: "VitaFresh, minuman buah dengan banyak pilihan rasa." },
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "q3a",
          headline: "VitaFresh, minuman paling murah se-Indonesia.",
          points: ["Bertentangan dengan citra produk kesehatan berbahan buah asli."],
          fields: { statement: "VitaFresh, minuman paling murah se-Indonesia." },
        },
        {
          id: "q3b",
          headline: "VitaFresh, minuman yang bikin kamu kuat begadang semalaman.",
          points: ["Menjanjikan manfaat yang tidak dimiliki produk dan menyesatkan konsumen."],
          fields: { statement: "VitaFresh, minuman yang bikin kamu kuat begadang semalaman." },
        },
        {
          id: "q3c",
          headline: "VitaFresh, sekali minum penyakit langsung sembuh.",
          points: ["Klaim menyembuhkan penyakit dilarang untuk produk pangan olahan."],
          fields: { statement: "VitaFresh, sekali minum penyakit langsung sembuh." },
        },
        {
          id: "q3d",
          headline: "VitaFresh, produk minuman dari perusahaan kami.",
          points: ["Tidak menyampaikan manfaat, pembeda, maupun sasaran konsumen."],
          fields: { statement: "VitaFresh, produk minuman dari perusahaan kami." },
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 8. VISUALISASI STRATEGI                                            */
/* ================================================================== */

const visualisasi: ChoiceGroup = {
  id: "visual",
  label: "Bentuk Visual",
  question: "Bentuk visualisasi hubungan Segmentasi - Targeting - Positioning",
  hint: "Visual akan digambar otomatis dari jawaban nomor 1 sampai 3.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "v1a",
          headline: "Tabel STP",
          narrative:
            "Hubungan antara segmentasi, target pasar, dan positioning digambarkan dalam bentuk tabel STP berikut.",
          fields: { format: "table" },
          points: [
            "Menampilkan ketiga segmen beserta kriteria, karakteristik, dan kebutuhan utamanya",
            "Menandai segmen mana yang menjadi target utama",
            "Menutup tabel dengan baris positioning agar alurnya terlihat utuh",
          ],
        },
        {
          id: "v1b",
          headline: "Diagram Alur Segmentasi - Targeting - Positioning",
          narrative:
            "Hubungan antara segmentasi, target pasar, dan positioning digambarkan sebagai diagram alur tiga tahap berikut.",
          fields: { format: "flow" },
          points: [
            "Menggambarkan alur berurutan dari segmentasi, targeting, hingga positioning",
            "Setiap tahap berisi ringkasan keputusan yang sudah diambil",
            "Memperlihatkan bahwa positioning merupakan lanjutan logis dari target yang dipilih",
          ],
        },
        {
          id: "v1c",
          headline: "Mind Map Strategi STP",
          narrative:
            "Hubungan antara segmentasi, target pasar, dan positioning digambarkan sebagai mind map bercabang berikut.",
          fields: { format: "mindmap" },
          points: [
            "Menempatkan produk sebagai pusat dengan tiga cabang utama STP",
            "Setiap cabang menurunkan rincian keputusan yang sudah diambil",
            "Memudahkan pembaca melihat keseluruhan strategi dalam satu tampilan",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "v2a",
          headline: "Daftar poin tanpa menunjukkan hubungan",
          narrative:
            "Hubungan antara segmentasi, target pasar, dan positioning ditulis sebagai daftar poin berikut.",
          fields: { format: "list" },
          points: [
            "Isi ketiga tahap sudah lengkap ditulis",
            "Namun disajikan sebagai daftar biasa, bukan visual",
            "Hubungan antartahap tidak terlihat sehingga instruksi visualisasi belum terpenuhi",
          ],
        },
        {
          id: "v2b",
          headline: "Tabel yang hanya berisi nama segmen",
          narrative:
            "Hubungan antara segmentasi, target pasar, dan positioning digambarkan dalam tabel sederhana berikut.",
          fields: { format: "table-min" },
          points: [
            "Sudah berbentuk tabel sesuai instruksi",
            "Namun hanya memuat nama segmen tanpa karakteristik dan kebutuhan",
            "Target pasar dan positioning tidak dihubungkan dengan segmen mana pun",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "v3a",
          headline: "Grafik penjualan bulanan",
          narrative:
            "Bagian visualisasi diisi dengan grafik perkiraan penjualan bulanan produk.",
          fields: { format: "irrelevant-sales" },
          points: [
            "Grafik penjualan tidak menggambarkan hubungan segmentasi, targeting, dan positioning",
            "Instruksi nomor 4 meminta visual hubungan antartahap STP, bukan proyeksi penjualan",
            "Pembaca tetap tidak dapat melihat alur strategi yang disusun",
          ],
        },
        {
          id: "v3b",
          headline: "Foto kemasan produk",
          narrative: "Bagian visualisasi diisi dengan foto kemasan produk.",
          fields: { format: "irrelevant-photo" },
          points: [
            "Foto kemasan tidak memuat informasi strategi sama sekali",
            "Tidak ada tabel, diagram, maupun mind map seperti yang diminta",
            "Instruksi nomor 4 tidak terpenuhi",
          ],
        },
      ],
    },
  ],
};

export const tpm1Groups: ChoiceGroup[] = [
  segmen1,
  segmen2,
  segmen3,
  targetUtama,
  alasanTarget,
  strategiPositioning,
  positioningStatement,
  visualisasi,
];

export const bankTpm1 = {
  segmen1,
  segmen2,
  segmen3,
  targetUtama,
  alasanTarget,
  strategiPositioning,
  positioningStatement,
  visualisasi,
};
