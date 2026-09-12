import type { CapstoneSection } from "../types";

/**
 * Formulir jalur "UMKM sendiri".
 *
 * Urutan bagiannya sengaja dibuat sama dengan urutan bagian pada A3 Summary
 * Report, sehingga peserta mengisi dengan urutan yang sama seperti dokumen yang
 * akan ia terima. Tiap isian membawa contoh siap pakai: peserta bisa
 * menyalinnya lebih dahulu lalu menyuntingnya, supaya tidak berhadapan dengan
 * halaman kosong dan tahu sedetail apa isian yang diharapkan.
 */
export const capstoneForm: CapstoneSection[] = [
  {
    id: "profil",
    title: "Profil UMKM",
    description:
      "Keterangan dasar usaha yang kamu dampingi. Bagian ini mengisi Business Context di A3 Report dan Slide 1 pada deck.",
    fields: [
      {
        id: "namaUmkm",
        label: "Nama UMKM",
        placeholder: "Contoh: Kopi Lereng",
        hint: "Tulis nama usahanya apa adanya. Nama ini dipakai di seluruh dokumen.",
        contoh: "Kopi Lereng",
        wajib: true,
      },
      {
        id: "bidang",
        label: "Bidang usaha dan produk utama",
        placeholder: "Contoh: kedai kopi dengan biji dari petani lokal Temanggung",
        hint: "Sebut jenis usahanya dan apa yang dijual. Satu kalimat sudah cukup.",
        contoh: "Kedai kopi yang menyangrai sendiri biji dari petani lokal Temanggung",
        wajib: true,
      },
      {
        id: "lokasi",
        label: "Lokasi usaha",
        placeholder: "Contoh: Sleman, Yogyakarta",
        hint: "Kota atau kabupaten tempat usaha beroperasi.",
        contoh: "Sleman, Yogyakarta",
        wajib: true,
      },
      {
        id: "keunggulan",
        label: "Keunggulan utama",
        placeholder: "Tulis dua sampai tiga keunggulan, pisahkan dengan baris baru",
        hint: "Apa yang membuat usaha ini berbeda dari pesaingnya. Tulis satu keunggulan per baris.",
        multiline: true,
        contoh:
          "Biji kopi dibeli langsung dari petani sehingga harganya lebih adil\nDisangrai sendiri setiap pekan, jadi selalu segar\nHarga segelas masih di bawah kedai sejenis di pusat kota",
        wajib: true,
      },
      {
        id: "akun",
        label: "Akun media sosial",
        placeholder: "Contoh: @kopilereng",
        hint: "Akun yang dikelola. Boleh dikosongkan bila usahanya belum punya akun.",
        contoh: "@kopilereng",
      },
    ],
  },
  {
    id: "audiens",
    title: "Target Audiens",
    description:
      "Siapa yang mau dijangkau dan apa yang sedang ia butuhkan. Bagian ini mengisi Business Context dan menjadi dasar seluruh pilihan konten.",
    fields: [
      {
        id: "audiens",
        label: "Siapa target audiensnya",
        placeholder: "Sebut usia, lokasi, pekerjaan, dan kebiasaannya di media sosial",
        hint: "Makin sempit makin baik. Sebut usia, tempat tinggal, pekerjaan, dan kapan ia biasanya membuka media sosial.",
        multiline: true,
        contoh:
          "Mahasiswa dan pekerja muda usia 19-28 tahun di sekitar Sleman yang mencari tempat mengerjakan tugas di luar rumah. Membuka Instagram menjelang siang saat memilih tempat makan, dan menyimpan rekomendasi tempat untuk dikunjungi akhir pekan.",
        wajib: true,
      },
      {
        id: "painPoint",
        label: "Masalah atau kebutuhan audiens",
        placeholder: "Tulis dua sampai tiga hal yang mengganjal bagi audiens",
        hint: "Keadaan yang bisa dijawab usaha ini. Tulis satu per baris.",
        multiline: true,
        contoh:
          "Sulit menemukan tempat yang colokannya banyak dan wifinya stabil\nSering ragu karena tidak tahu seramai apa tempatnya pada jam tertentu\nIngin kopi enak tetapi anggarannya terbatas",
        wajib: true,
      },
    ],
  },
  {
    id: "strategi",
    title: "Strategy Highlights",
    description:
      "Pokok-pokok rencana kontenmu. Bagian ini mengisi Strategy Highlights di A3 Report dan Slide 2 pada deck.",
    fields: [
      {
        id: "pilar",
        label: "Pilar konten",
        placeholder: "Tulis tiga sampai empat pilar, satu per baris",
        hint: "Tema tetap yang diputar bergantian. Beri keterangan singkat tugas tiap pilar.",
        multiline: true,
        contoh:
          "Suasana: memperlihatkan keadaan kedai pada jam-jam berbeda\nAsal biji: cerita petani dan proses sangrai setiap pekan\nMenu: perkenalan racikan beserta harganya\nPengunjung: potongan cerita orang yang bekerja di kedai",
        wajib: true,
      },
      {
        id: "ritme",
        label: "Ritme unggahan dan alasannya",
        placeholder: "Contoh: tiga kali sepekan pada Selasa, Jumat, dan Minggu",
        hint: "Berapa kali sepekan, hari apa, dan mengapa ritme itu yang dipilih.",
        multiline: true,
        contoh:
          "Tiga kali sepekan pada Selasa, Jumat, dan Minggu sore. Jumat dan Minggu dipilih karena audiens menyusun rencana akhir pekan pada hari-hari itu, sedangkan Selasa dipakai untuk konten asal biji yang tidak terburu waktu.",
        wajib: true,
      },
    ],
  },
  {
    id: "teknik",
    title: "Technical Skill Evidence",
    description:
      "Teknik yang kamu pakai saat membuat konten. Dokumen capstone secara khusus meminta bagian ini disebutkan.",
    fields: [
      {
        id: "hook",
        label: "Visual hook dan alasannya",
        placeholder: "Gambarkan bingkai pertama kontenmu dan mengapa dipilih",
        hint: "Apa yang muncul di detik pertama, dan mengapa itu menahan perhatian audiensmu.",
        multiline: true,
        contoh:
          "Bingkai pertama berupa rekaman dekat kopi yang dituang dengan uap yang masih terlihat, diambil pada jam tiga sore saat cahaya masuk dari jendela samping. Dipilih karena audiens membuka Instagram menjelang jam istirahat, dan gambar hangat seperti ini menahan guliran lebih lama daripada foto bangunan kedai.",
        wajib: true,
      },
      {
        id: "formula",
        label: "Formula copywriting yang dipakai",
        placeholder: "Contoh: PAS (Problem, Agitate, Solution)",
        hint: "Sebut nama formulanya, misalnya AIDA, PAS, atau Before-After-Bridge.",
        contoh: "PAS (Problem, Agitate, Solution)",
        wajib: true,
      },
      {
        id: "storytelling",
        label: "Teknik storytelling",
        placeholder: "Bagaimana caption kamu bercerita",
        hint: "Cara kamu menyusun cerita di caption. Boleh dikosongkan bila belum dipakai.",
        multiline: true,
        contoh:
          "Caption ditulis dari sudut pandang pengunjung, dibuka dengan keadaan yang dikenali pembaca lalu ditutup dengan ajakan datang pada jam tertentu.",
      },
    ],
  },
  {
    id: "galeri",
    title: "Visual Gallery",
    description:
      "Konten yang kamu buat dan akan ditampilkan sebagai thumbnail di A3 Report. Dua konten pertama wajib diisi.",
    fields: [
      {
        id: "konten1",
        label: "Konten 1",
        placeholder: "Format | Kanal | Judul dan penjelasan singkat",
        hint: "Tulis dengan pola: format, kanal, lalu judul dan penjelasannya, dipisah tanda |",
        multiline: true,
        contoh:
          "Reels 20 detik | Reels | Proses menuang kopi pada jam tiga sore, tanpa narasi, hanya suara aslinya",
        wajib: true,
      },
      {
        id: "konten2",
        label: "Konten 2",
        placeholder: "Format | Kanal | Judul dan penjelasan singkat",
        hint: "Usahakan formatnya berbeda dari konten pertama supaya galerinya tidak datar.",
        multiline: true,
        contoh:
          "Carousel 5 slide | Feed Instagram | Perjalanan biji kopi dari kebun petani Temanggung sampai jadi segelas di meja",
        wajib: true,
      },
      {
        id: "konten3",
        label: "Konten 3",
        placeholder: "Format | Kanal | Judul dan penjelasan singkat",
        hint: "Boleh dikosongkan bila kontenmu baru dua.",
        multiline: true,
        contoh:
          "Poster tunggal | Feed Instagram | Peta jam ramai kedai dalam sepekan supaya pengunjung bisa memilih waktu datang",
      },
      {
        id: "konten4",
        label: "Konten 4",
        placeholder: "Format | Kanal | Judul dan penjelasan singkat",
        hint: "Boleh dikosongkan.",
        multiline: true,
        contoh:
          "Cerita berseri | Story sorotan | Perkenalan barista dan racikan andalan masing-masing",
      },
    ],
  },
  {
    id: "penutup",
    title: "Impact dan Penutup",
    description:
      "Analisis dampak dan slide penutup. Bagian ini mengisi Slide Impact & Potential serta Closure & Hire Me pada deck.",
    fields: [
      {
        id: "impact",
        label: "Analisis dampak bagi UMKM",
        placeholder: "Sebut ukuran yang dipantau dan tenggat waktunya",
        hint: "Angka apa yang akan kamu pantau, berapa targetnya, dan dalam berapa lama.",
        multiline: true,
        contoh:
          "Yang dipantau ada tiga dalam tiga bulan: jangkauan akun non-pengikut, jumlah simpanan per konten, dan jumlah pengunjung yang menyebut melihat kedai dari Instagram saat memesan. Target jangkauan naik sekitar tiga puluh persen, dipilih karena tiga unggahan sepekan belum cukup untuk lonjakan yang lebih besar.",
        wajib: true,
      },
      {
        id: "hireme",
        label: "Penutup Hire Me",
        placeholder: "Keterampilan apa yang sudah kamu buktikan lewat proyek ini",
        hint: "Sebut keterampilan yang terbukti di deck ini, bukan sekadar pernyataan siap bekerja.",
        multiline: true,
        contoh:
          "Tiga hal yang terbukti sepanjang deck ini: menyusun profil audiens yang spesifik beserta titik sakitnya, menurunkannya menjadi pilar konten dengan alasan di tiap pilihan, dan memproduksi konten yang konsisten dengan identitas usaha.",
        wajib: true,
      },
      {
        id: "portfolio",
        label: "Tautan portofolio untuk kode QR",
        placeholder: "Contoh: https://drive.google.com/...",
        hint: "Tautan ke file PPT lengkapmu. A3 Report memuat kode QR yang mengarah ke sini.",
        contoh: "https://drive.google.com/file/d/contoh-tautan-ppt",
      },
    ],
  },
];
