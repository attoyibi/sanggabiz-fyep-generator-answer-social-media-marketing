import type { ChoiceGroup } from "../types";

/**
 * BANK JAWABAN TPM 3 — Rencana Konten dan Copywriting brand "FitActive".
 *
 * Tugas ini melanjutkan content plan yang disusun peserta di TPM 2. Konten yang
 * dikembangkan dipilih sendiri oleh peserta, lalu seluruh jawaban di bawah ini
 * merujuk padanya lewat token {{judulKonten}}, {{pilarKonten}}, {{tipeKonten}},
 * {{platformKonten}}, dan {{objectiveKonten}}.
 *
 * Semua varian ditulis lengkap, termasuk yang sengaja keliru.
 */

/* ================================================================== */
/* 1. PILIH KONTEN — diambil dari content plan TPM 2 (tanpa penilaian) */
/* ================================================================== */

const pilihKonten: ChoiceGroup = {
  id: "konten",
  label: "Konten Dipilih",
  question: "Pilih 1 konten dari content plan-mu yang akan dikembangkan",
  hint: "Ketiganya sama-sama boleh dipilih. Buka detailnya untuk melihat rencana yang sudah kamu susun.",
  card: "konten",
  ungraded: true,
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "kn1",
          headline: "Hari ke-1 — {{judul1}}",
          fields: {
            hari: "1",
            tanggal: "1 September 2025",
            judul: "{{judul1}}",
            objective: "{{objectiveKonten}}",
            pilar: "{{pilar1x}}",
            tipe: "{{tipe1}}",
            platform: "{{plat1}}",
            jam: "{{jam1x}}",
            copy: "{{copy1}}",
            catatan: "{{catat1}}",
          },
          points: [],
        },
        {
          id: "kn2",
          headline: "Hari ke-2 — {{judul2}}",
          fields: {
            hari: "2",
            tanggal: "2 September 2025",
            judul: "{{judul2}}",
            objective: "{{objectiveKonten}}",
            pilar: "{{pilar2x}}",
            tipe: "{{tipe2}}",
            platform: "{{plat2}}",
            jam: "{{jam2x}}",
            copy: "{{copy2}}",
            catatan: "{{catat2}}",
          },
          points: [],
        },
        {
          id: "kn3",
          headline: "Hari ke-3 — {{judul3}}",
          fields: {
            hari: "3",
            tanggal: "3 September 2025",
            judul: "{{judul3}}",
            objective: "{{objectiveKonten}}",
            pilar: "{{pilar3x}}",
            tipe: "{{tipe3}}",
            platform: "{{plat3}}",
            jam: "{{jam3x}}",
            copy: "{{copy3}}",
            catatan: "{{catat3}}",
          },
          points: [],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 2. HOOK — kalimat pembuka penarik perhatian                        */
/* ================================================================== */

const hook: ChoiceGroup = {
  id: "hook",
  label: "Hook",
  question: "Hook: kalimat pembuka konten “{{judulKonten}}”",
  hint: "Hook adalah kalimat pembuka yang membuat audiens berhenti menggeser.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "hk1a",
          headline: "Membuka dengan keluhan yang paling sering dialami audiens",
          fields: {
            isi: "“Kalau kamu pernah selesai olahraga dan bajunya masih basah sampai malam, ini penyebabnya.”",
          },
          points: [
            "Membuka dengan pengalaman yang sudah pasti pernah dialami target audiens.",
            "Audiens merasa disebut secara pribadi, sehingga berhenti menggeser.",
            "Kalimatnya di bawah 15 kata sehingga selesai terbaca dalam dua detik.",
            "Langsung menyambung ke isi konten, bukan sekadar menarik perhatian lalu berpindah topik.",
          ],
        },
        {
          id: "hk1b",
          headline: "Membuka dengan angka yang memancing rasa penasaran",
          fields: {
            isi: "“3 hal yang bikin baju olahragamu cepat rusak, dan dua di antaranya kamu lakukan tiap minggu.”",
          },
          points: [
            "Angka memberi janji isi yang jelas sehingga audiens tahu apa yang akan didapat.",
            "Bagian kedua kalimat menuduh secara halus, membuat audiens ingin memeriksa dirinya.",
            "Janji tiga poin memaksa konten tetap padat dan tidak melebar.",
            "Cocok dipakai ulang sebagai pola hook pada konten berikutnya.",
          ],
        },
        {
          id: "hk1c",
          headline: "Membuka dengan pertanyaan yang jawabannya mengejutkan",
          fields: {
            isi: "“Menurutmu bahan mana yang lebih cepat kering, katun atau polyester? Jawabannya sering bikin kaget.”",
          },
          points: [
            "Pertanyaan membuat audiens menjawab dalam hati sebelum konten menjelaskan.",
            "Janji jawaban yang mengejutkan menahan audiens sampai bagian penjelasan.",
            "Topiknya langsung menyentuh keunggulan bahan produk {{brand}}.",
            "Mendorong audiens menuliskan tebakannya di kolom komentar.",
          ],
        },
        {
          id: "hk1d",
          headline: "Membuka dengan pernyataan yang berlawanan dengan anggapan umum",
          fields: {
            isi: "“Baju olahraga yang adem saat dipegang justru yang paling bikin gerah saat dipakai.”",
          },
          points: [
            "Bertentangan dengan anggapan umum sehingga audiens berhenti untuk memastikan.",
            "Membuka ruang penjelasan yang justru menonjolkan keunggulan bahan {{brand}}.",
            "Tidak menyesatkan karena pernyataannya memang benar secara teknis.",
            "Mudah diingat dan sering dikutip ulang audiens di kolom komentar.",
          ],
        },
        {
          id: "hk1e",
          headline: "Membuka dengan hasil sebelum prosesnya",
          fields: {
            isi: "“Ini kondisi baju yang sudah dipakai latihan 90 kali. Sekarang lihat kenapa masih seperti baru.”",
          },
          points: [
            "Hasil ditampilkan lebih dulu supaya audiens ingin tahu prosesnya.",
            "Angka 90 kali memberi bukti konkret, bukan klaim umum.",
            "Menjawab keraguan audiens soal ketahanan bahan brand lokal.",
            "Sesuai objective {{objectiveKonten}} karena memancing audiens menonton sampai selesai.",
          ],
        },
        {
          id: "hk1f",
          headline: "Membuka dengan kesalahan yang diakui banyak orang",
          fields: {
            isi: "“Aku salah beli baju olahraga tiga kali sebelum akhirnya paham cara memilihnya.”",
          },
          points: [
            "Pengakuan membuat brand terdengar jujur, bukan menggurui.",
            "Audiens yang pernah salah beli langsung merasa senasib.",
            "Membuka jalan menuju panduan memilih tanpa terasa berjualan.",
            "Cocok dipadukan dengan storytelling pada bagian berikutnya.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "hk2a",
          headline: "Menarik tetapi tidak menyambung ke isi",
          fields: { isi: "“Kamu tidak akan percaya apa yang terjadi selanjutnya.”" },
          points: [
            "Kalimatnya memang memancing rasa penasaran.",
            "Tidak menyebut topik apa pun, jadi audiens yang tertarik bisa datang dari kelompok yang salah.",
            "Audiens merasa tertipu kalau isinya ternyata soal bahan pakaian.",
          ],
        },
        {
          id: "hk2b",
          headline: "Menyapa tanpa memberi alasan bertahan",
          fields: { isi: "“Halo semuanya, kembali lagi bersama {{brand}}!”" },
          points: [
            "Sapaannya ramah dan sesuai identitas brand.",
            "Tiga detik pertama terpakai untuk salam, bukan untuk isi.",
            "Audiens yang belum mengenal brand tidak punya alasan untuk bertahan.",
          ],
        },
        {
          id: "hk2c",
          headline: "Langsung menyebut produk sebelum masalahnya",
          fields: { isi: "“Koleksi terbaru {{brand}} sudah tersedia, yuk simak.”" },
          points: [
            "Informasinya benar dan jelas menyebut brand.",
            "Audiens belum diberi alasan mengapa koleksi itu penting bagi mereka.",
            "Hook yang langsung berjualan biasanya cepat dilewati.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "hk3a",
          headline: "Menjanjikan hal yang tidak ada di kontennya",
          fields: { isi: "“Cara cepat kurus dalam seminggu tanpa olahraga!”" },
          points: [
            "Janjinya tidak berhubungan dengan isi konten maupun produk {{brand}}.",
            "Klaim seperti ini menyesatkan dan berisiko melanggar ketentuan iklan.",
            "Audiens yang datang tidak akan menjadi pembeli.",
          ],
        },
        {
          id: "hk3b",
          headline: "Hook berisi ajakan membeli",
          fields: { isi: "“Buruan beli sekarang sebelum kehabisan!”" },
          points: [
            "Menempatkan ajakan membeli di detik pertama, sebelum audiens tahu produknya apa.",
            "Tidak ada alasan bagi audiens baru untuk bertahan menonton.",
            "Bertentangan dengan objective {{objectiveKonten}} yang mengejar perhatian lebih dulu.",
          ],
        },
        {
          id: "hk3c",
          headline: "Tanpa hook, langsung masuk penjelasan panjang",
          fields: {
            isi: "“Pakaian olahraga terbuat dari berbagai jenis bahan yang masing-masing memiliki karakteristik berbeda-beda.”",
          },
          points: [
            "Kalimat pembuka berupa penjelasan umum yang bisa ditemukan di mana saja.",
            "Tidak ada yang menahan audiens pada tiga detik pertama.",
            "Konten akan dilewati sebelum bagian pentingnya muncul.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3. VISUAL HOOK — tiga detik pertama secara visual                  */
/* ================================================================== */

const visualHook: ChoiceGroup = {
  id: "visualHook",
  label: "Visual Hook",
  question: "Visual hook: tampilan tiga detik pertama konten “{{judulKonten}}”",
  hint: "Visual hook adalah yang dilihat audiens sebelum sempat membaca teks apa pun.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "vh1a",
          headline: "Perbandingan berdampingan sejak frame pertama",
          fields: {
            isi: "Frame pertama langsung menampilkan dua kaos berdampingan dalam satu layar: satu basah menempel di badan, satu kering. Tidak ada intro, tidak ada logo, langsung perbandingannya.",
          },
          points: [
            "Perbedaan terlihat dalam satu pandangan, tanpa perlu membaca teks.",
            "Menghapus intro dan logo pembuka yang biasanya membuat audiens menggeser.",
            "Bekerja meski ditonton tanpa suara, seperti kebiasaan sebagian besar audiens.",
            "Sesuai format {{tipeKonten}} yang dipilih pada content plan.",
          ],
        },
        {
          id: "vh1b",
          headline: "Gerakan besar di detik pertama",
          fields: {
            isi: "Konten dibuka dengan gerakan besar, misalnya kaos dijatuhkan ke air lalu diangkat, direkam dari dekat sehingga tetesan airnya terlihat jelas.",
          },
          points: [
            "Gerakan menarik perhatian lebih cepat daripada gambar diam.",
            "Rekaman jarak dekat membuat detail bahan terlihat di layar ponsel.",
            "Tidak butuh teks apa pun untuk dipahami.",
            "Menyiapkan penonton pada topik daya serap bahan yang jadi inti konten.",
          ],
        },
        {
          id: "vh1c",
          headline: "Teks besar satu baris di atas gambar yang kontras",
          fields: {
            isi: "Tiga detik pertama menampilkan satu baris teks berukuran besar di atas gambar berlatar kontras, memuat inti pesan konten. Teks hilang setelah tiga detik agar tidak mengganggu isi.",
          },
          points: [
            "Satu baris teks besar terbaca dalam sekali pandang, bahkan sambil menggeser cepat.",
            "Latar kontras membuat teks tetap terbaca di layar terang maupun gelap.",
            "Teks dihilangkan setelah tiga detik supaya tidak menutupi isi konten.",
            "Cocok untuk audiens yang menonton tanpa suara.",
          ],
        },
        {
          id: "vh1d",
          headline: "Wajah menghadap kamera dengan ekspresi jelas",
          fields: {
            isi: "Dibuka dengan wajah menghadap kamera dari jarak dekat sambil mengucapkan hook, dengan ekspresi yang menegaskan isi kalimatnya.",
          },
          points: [
            "Wajah manusia paling cepat menarik perhatian di beranda yang penuh gambar.",
            "Ekspresi memperkuat kalimat hook tanpa perlu tambahan teks.",
            "Membangun kedekatan karena terasa seperti diajak bicara langsung.",
            "Mudah diproduksi ulang untuk konten berikutnya dengan biaya kecil.",
          ],
        },
        {
          id: "vh1e",
          headline: "Hasil akhir ditampilkan lebih dulu",
          fields: {
            isi: "Frame pembuka menampilkan hasil akhirnya, misalnya kaos yang masih rapi setelah puluhan kali dicuci, baru kemudian mundur menjelaskan prosesnya.",
          },
          points: [
            "Hasil yang menarik membuat audiens ingin tahu bagaimana bisa begitu.",
            "Urutan mundur menahan audiens sampai bagian penjelasan.",
            "Bukti terlihat lebih dulu, sehingga klaim brand tidak terasa kosong.",
            "Sejalan dengan objective {{objectiveKonten}}.",
          ],
        },
        {
          id: "vh1f",
          headline: "Situasi sehari-hari yang langsung dikenali audiens",
          fields: {
            isi: "Dibuka dengan situasi yang dikenali audiens, misalnya seseorang menarik-narik kaosnya yang menempel setelah latihan siang di tengah kota.",
          },
          points: [
            "Situasinya langsung dikenali audiens urban yang berolahraga di cuaca panas.",
            "Tidak perlu penjelasan karena audiens pernah mengalaminya sendiri.",
            "Menyiapkan masalah yang nanti dijawab oleh produk.",
            "Terasa jujur karena direkam pada situasi nyata, bukan di studio.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "vh2a",
          headline: "Foto produk rapi tanpa konteks",
          fields: { isi: "Frame pertama berupa foto produk di atas latar putih, diam tanpa gerakan." },
          points: [
            "Fotonya rapi dan warna produk terlihat jelas.",
            "Gambar diam tanpa konteks jarang menahan audiens di beranda.",
            "Belum ada alasan bagi audiens untuk menonton sampai detik berikutnya.",
          ],
        },
        {
          id: "vh2b",
          headline: "Teks pembuka terlalu panjang",
          fields: {
            isi: "Tiga detik pertama menampilkan paragraf penjelasan tentang jenis bahan dan keunggulannya.",
          },
          points: [
            "Isinya benar dan sesuai topik konten.",
            "Paragraf panjang tidak selesai terbaca dalam tiga detik.",
            "Audiens menggeser sebelum sempat menangkap pesannya.",
          ],
        },
        {
          id: "vh2c",
          headline: "Logo brand sebagai pembuka",
          fields: { isi: "Konten dibuka dengan animasi logo {{brand}} selama dua detik sebelum masuk isi." },
          points: [
            "Membantu pengenalan brand bagi audiens yang sudah mengikuti akun.",
            "Dua detik pertama terpakai untuk logo, bukan untuk menahan audiens baru.",
            "Audiens yang belum mengenal brand tidak punya alasan bertahan.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "vh3a",
          headline: "Visual tidak berhubungan dengan isi",
          fields: { isi: "Dibuka dengan cuplikan tren joget yang sedang ramai, lalu berpindah ke pembahasan bahan." },
          points: [
            "Perpindahan yang tiba-tiba membuat audiens merasa tertipu.",
            "Audiens yang datang karena trennya tidak berminat pada produk.",
            "Tidak ada hubungan dengan pilar {{pilarKonten}} yang sudah ditetapkan.",
          ],
        },
        {
          id: "vh3b",
          headline: "Gambar gelap dan sulit dilihat",
          fields: { isi: "Rekaman diambil di ruangan minim cahaya sehingga detail bahan hampir tidak terlihat." },
          points: [
            "Detail bahan yang jadi inti konten justru tidak terlihat.",
            "Konten gelap sulit ditonton di layar ponsel pada siang hari.",
            "Menurunkan kesan mutu produk maupun brand.",
          ],
        },
        {
          id: "vh3c",
          headline: "Menumpuk banyak teks dan tempelan",
          fields: {
            isi: "Frame pembuka dipenuhi teks, stiker, tanda panah, dan logo sekaligus agar terlihat ramai.",
          },
          points: [
            "Layar yang terlalu penuh membuat pesan utamanya tidak terbaca.",
            "Audiens tidak tahu harus melihat ke bagian mana lebih dulu.",
            "Bertentangan dengan tujuan visual hook, yaitu menyampaikan satu hal dengan cepat.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 4. STORYTELLING — struktur narasi konten                           */
/* ================================================================== */

const storytelling: ChoiceGroup = {
  id: "storytelling",
  label: "Storytelling",
  question: "Struktur storytelling konten “{{judulKonten}}”",
  hint: "Storytelling menyusun konten sebagai cerita agar terasa relatable, bukan sekadar daftar informasi.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "st1a",
          headline: "Masalah — Perjuangan — Titik balik — Hasil",
          fields: {
            isi: "Konten dibuka dengan masalah yang dialami audiens, dilanjutkan usaha yang sudah dicoba dan gagal, lalu titik balik saat ia mengetahui penyebab sebenarnya, dan ditutup dengan kondisi setelah masalahnya teratasi.",
          },
          points: [
            "Masalah: latihan siang selalu berakhir dengan baju basah menempel sepanjang hari.",
            "Perjuangan: sudah mencoba mengganti ukuran dan mencuci lebih sering, tetap sama.",
            "Titik balik: mengetahui bahwa penyebabnya bahan yang menahan uap, bukan ukurannya.",
            "Hasil: setelah berganti bahan, badan lebih cepat kering dan latihan terasa lebih ringan.",
          ],
        },
        {
          id: "st1b",
          headline: "Sebelum — Sesudah — Jembatan",
          fields: {
            isi: "Konten menampilkan kondisi sebelum, lalu kondisi sesudah, baru menjelaskan apa yang menjembatani keduanya sehingga audiens tahu langkah yang harus ditiru.",
          },
          points: [
            "Sebelum: baju melar setelah dua bulan dan warnanya pudar tidak merata.",
            "Sesudah: baju masih rapi setelah tiga bulan latihan rutin.",
            "Jembatan: pilihan bahan dan cara mencuci yang tepat.",
            "Audiens langsung tahu apa yang perlu diubah, bukan sekadar melihat hasilnya.",
          ],
        },
        {
          id: "st1c",
          headline: "Satu tokoh, satu hari, satu masalah",
          fields: {
            isi: "Konten mengikuti satu orang dalam satu hari, dari berangkat kerja sampai latihan sore, dengan satu masalah yang muncul dan terselesaikan di ujung cerita.",
          },
          points: [
            "Satu tokoh membuat audiens punya sosok untuk diikuti sampai akhir.",
            "Batas satu hari menjaga cerita tetap padat dan mudah diikuti.",
            "Satu masalah saja sehingga pesannya tidak terpecah.",
            "Ceritanya berlatar keseharian audiens urban, bukan situasi yang dibuat-buat.",
          ],
        },
        {
          id: "st1d",
          headline: "Kesalahan umum — Penjelasan — Cara benar",
          fields: {
            isi: "Konten dibuka dengan kesalahan yang banyak dilakukan audiens, dilanjutkan penjelasan mengapa itu keliru, lalu ditutup dengan cara yang benar beserta alasannya.",
          },
          points: [
            "Kesalahan umum: memilih bahan yang terasa adem saat dipegang.",
            "Penjelasan: bahan seperti itu justru menahan keringat di permukaan kulit.",
            "Cara benar: memilih bahan yang membiarkan uap keluar, meski tidak terasa adem di tangan.",
            "Audiens merasa terbantu, bukan disalahkan, karena alasannya dijelaskan.",
          ],
        },
        {
          id: "st1e",
          headline: "Pertanyaan audiens jadi pembuka cerita",
          fields: {
            isi: "Konten dibuka dengan menampilkan pertanyaan nyata dari kolom komentar, lalu diceritakan bagaimana tim menelusuri jawabannya, dan ditutup dengan hasil temuannya.",
          },
          points: [
            "Pertanyaan nyata dari audiens membuat konten terasa menjawab kebutuhan, bukan menebak.",
            "Proses penelusuran menjadikan brand terlihat jujur dan tidak sekadar mengklaim.",
            "Audiens yang bertanya merasa dihargai dan cenderung kembali berkomentar.",
            "Menghasilkan bahan konten yang bisa diulang setiap pekan.",
          ],
        },
        {
          id: "st1f",
          headline: "Perjalanan tiga bulan dalam satu konten",
          fields: {
            isi: "Konten merangkum perjalanan tiga bulan pemakaian produk dalam beberapa potongan singkat, dari minggu pertama sampai kondisi terakhir, tanpa menyembunyikan bagian yang kurang bagus.",
          },
          points: [
            "Rentang waktu yang panjang memberi bukti yang tidak bisa dibantah.",
            "Bagian yang kurang bagus tetap ditampilkan sehingga ceritanya dipercaya.",
            "Potongan singkat menjaga durasi tetap pendek meski rentangnya panjang.",
            "Cocok untuk pilar {{pilarKonten}} yang sudah dipilih di content plan.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "st2a",
          headline: "Ada cerita tetapi tanpa penyelesaian",
          fields: {
            isi: "Konten menceritakan masalah audiens dengan rinci, lalu berhenti tanpa menunjukkan bagaimana masalah itu diselesaikan.",
          },
          points: [
            "Bagian masalahnya kuat dan mudah dikenali audiens.",
            "Cerita tanpa penyelesaian membuat audiens tidak tahu harus berbuat apa.",
            "Produk tidak pernah muncul sebagai bagian dari jawabannya.",
          ],
        },
        {
          id: "st2b",
          headline: "Cerita bagus tetapi terlalu panjang",
          fields: {
            isi: "Konten menceritakan perjalanan lengkap dari awal membeli, mencoba berbagai merek, sampai menemukan yang cocok, dengan banyak bagian selingan.",
          },
          points: [
            "Ceritanya utuh dan punya penyelesaian yang jelas.",
            "Banyak selingan membuat durasi membengkak melebihi format {{tipeKonten}}.",
            "Audiens biasanya berhenti sebelum bagian penyelesaiannya muncul.",
          ],
        },
        {
          id: "st2c",
          headline: "Daftar informasi yang disebut sebagai cerita",
          fields: {
            isi: "Konten menyebutkan lima keunggulan bahan satu per satu secara berurutan.",
          },
          points: [
            "Informasinya benar dan tersusun rapi.",
            "Daftar berurutan bukan cerita, karena tidak ada tokoh maupun perubahan keadaan.",
            "Audiens sulit terhubung secara emosional dengan daftar.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "st3a",
          headline: "Cerita yang dikarang dan tidak masuk akal",
          fields: {
            isi: "Konten menceritakan seseorang yang langsung menang lomba lari setelah berganti baju olahraga.",
          },
          points: [
            "Ceritanya tidak masuk akal sehingga menurunkan kepercayaan pada brand.",
            "Menjanjikan hasil yang tidak mungkin diberikan oleh pakaian.",
            "Audiens yang kecewa setelah membeli tidak akan kembali.",
          ],
        },
        {
          id: "st3b",
          headline: "Cerita tentang brand, bukan tentang audiens",
          fields: {
            isi: "Konten menceritakan sejarah berdirinya {{brand}} sejak 2020 beserta daftar pencapaiannya.",
          },
          points: [
            "Audiens baru belum punya alasan untuk peduli pada sejarah brand.",
            "Tidak ada masalah audiens yang diangkat maupun diselesaikan.",
            "Cocoknya untuk profil perusahaan, bukan untuk konten yang mengejar {{objectiveKonten}}.",
          ],
        },
        {
          id: "st3c",
          headline: "Menyalin cerita milik akun lain",
          fields: {
            isi: "Konten memakai naskah cerita milik akun brand lain dengan mengganti nama produknya saja.",
          },
          points: [
            "Menyalin naskah pihak lain berisiko bagi brand.",
            "Ceritanya tidak berangkat dari audiens {{brand}} sendiri sehingga terasa asing.",
            "Audiens yang mengenali sumber aslinya akan kehilangan kepercayaan.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 5. UGC — pemanfaatan konten buatan pelanggan                        */
/* ================================================================== */

const ugc: ChoiceGroup = {
  id: "ugc",
  label: "UGC",
  question: "Penerapan User Generated Content pada konten “{{judulKonten}}”",
  hint: "UGC adalah konten yang dibuat pelanggan lalu dimanfaatkan brand.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "ug1a",
          headline: "Mengajak pembeli mengirim foto pemakaian dengan panduan jelas",
          fields: {
            isi: "Pembeli diajak mengirim foto produk yang sudah dipakai lebih dari sebulan lewat pesan langsung, disertai panduan singkat: foto apa adanya, sebutkan sudah berapa lama dipakai, dan untuk olahraga apa. Foto terpilih diunggah ulang dengan izin dan disebut namanya.",
          },
          points: [
            "Panduan singkat membuat kiriman audiens langsung layak pakai tanpa banyak penyuntingan.",
            "Izin diminta lebih dulu sebelum foto diunggah ulang.",
            "Nama pengirim disebut, sehingga audiens lain terdorong ikut mengirim.",
            "Menghasilkan bahan konten berkelanjutan tanpa biaya produksi tambahan.",
          ],
        },
        {
          id: "ug1b",
          headline: "Mengangkat komentar audiens jadi bahan konten",
          fields: {
            isi: "Komentar dan pertanyaan audiens dikumpulkan sepekan, lalu tiga yang paling sering muncul ditampilkan di konten beserta jawabannya. Nama pengirim ditutup untuk menjaga privasinya.",
          },
          points: [
            "Bahan kontennya datang langsung dari kebutuhan audiens, bukan tebakan tim.",
            "Audiens yang bertanya merasa dijawab sehingga terdorong berkomentar lagi.",
            "Nama pengirim ditutup untuk menjaga privasi.",
            "Bisa diulang tiap pekan dengan biaya produksi yang kecil.",
          ],
        },
        {
          id: "ug1c",
          headline: "Kolaborasi dengan anggota komunitas sebagai pemakai nyata",
          fields: {
            isi: "Beberapa anggota komunitas lari diajak memakai produk selama satu bulan, lalu merekam sendiri tanggapannya dengan kata-kata mereka sendiri tanpa naskah dari brand.",
          },
          points: [
            "Tanggapan tanpa naskah terdengar jujur dan tidak seperti iklan.",
            "Pemakai nyata lebih dipercaya audiens daripada model profesional.",
            "Satu bulan pemakaian memberi dasar yang cukup untuk menilai.",
            "Anggota komunitas ikut membagikan kontennya ke lingkarannya sendiri.",
          ],
        },
        {
          id: "ug1d",
          headline: "Tantangan berhadiah dengan syarat yang mudah",
          fields: {
            isi: "Audiens diajak mengunggah foto rutinitas olahraganya dengan tagar khusus. Syaratnya cukup satu foto, tanpa keharusan menandai banyak teman. Pemenang dipilih dari cerita yang paling jujur, bukan dari jumlah suka.",
          },
          points: [
            "Syarat yang mudah membuat lebih banyak audiens ikut serta.",
            "Penilaian berdasarkan cerita, bukan jumlah suka, sehingga kirimannya tetap bermutu.",
            "Tagar khusus memudahkan tim mengumpulkan bahan konten.",
            "Tidak memaksa audiens menandai banyak teman yang biasanya justru mengganggu.",
          ],
        },
        {
          id: "ug1e",
          headline: "Menampilkan ulasan apa adanya, termasuk yang kurang bagus",
          fields: {
            isi: "Konten menampilkan kiriman pembeli apa adanya, termasuk satu masukan yang kurang bagus, lalu brand menanggapinya secara terbuka di konten yang sama.",
          },
          points: [
            "Menampilkan masukan yang kurang bagus justru menaikkan kepercayaan audiens.",
            "Tanggapan terbuka menunjukkan brand mendengarkan pembelinya.",
            "Membedakan {{brand}} dari akun yang hanya menampilkan pujian.",
            "Mendorong pembeli lain berani memberi masukan yang jujur.",
          ],
        },
        {
          id: "ug1f",
          headline: "Mengumpulkan cerita pembeli lama sebagai bukti ketahanan",
          fields: {
            isi: "Pembeli yang sudah memakai produk lebih dari enam bulan diajak mengirim foto kondisi terkini beserta ceritanya, lalu dirangkai menjadi satu konten bukti ketahanan bahan.",
          },
          points: [
            "Menjawab keraguan terbesar audiens terhadap brand lokal, yaitu ketahanan bahan.",
            "Bukti datang dari pembeli, bukan dari klaim brand sendiri.",
            "Rentang enam bulan membuat buktinya sulit dibantah.",
            "Pembeli lama merasa dihargai dan cenderung membeli lagi.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "ug2a",
          headline: "Mengunggah ulang tanpa panduan",
          fields: {
            isi: "Foto pembeli yang menandai akun {{brand}} langsung diunggah ulang tanpa panduan maupun penyuntingan.",
          },
          points: [
            "Sudah memanfaatkan konten buatan pelanggan sesuai maksud UGC.",
            "Tanpa panduan, mutu foto yang masuk sangat beragam.",
            "Grid akun jadi tidak seragam karena gaya fotonya berbeda-beda.",
          ],
        },
        {
          id: "ug2b",
          headline: "Meminta testimoni tetapi menuliskan naskahnya",
          fields: {
            isi: "Pembeli diminta merekam testimoni dengan naskah yang sudah disiapkan brand kata per kata.",
          },
          points: [
            "Pesannya terkendali dan pasti sesuai keinginan brand.",
            "Testimoni bernaskah terdengar kaku dan mudah dikenali audiens sebagai iklan.",
            "Kehilangan keunggulan utama UGC, yaitu kesan jujur.",
          ],
        },
        {
          id: "ug2c",
          headline: "Mengumpulkan UGC tanpa rencana pemakaian",
          fields: {
            isi: "Audiens diajak mengirim foto, tetapi belum ditentukan foto itu akan dipakai di konten yang mana.",
          },
          points: [
            "Ajakan mengirimnya sudah jelas dan mudah diikuti.",
            "Tanpa rencana pemakaian, kiriman audiens menumpuk tanpa pernah tayang.",
            "Audiens yang sudah mengirim merasa diabaikan.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "ug3a",
          headline: "Mengambil foto pengguna tanpa izin",
          fields: {
            isi: "Foto audiens yang memakai produk diambil dari akun pribadinya lalu diunggah ulang tanpa meminta izin.",
          },
          points: [
            "Mengunggah ulang tanpa izin melanggar hak pemilik foto.",
            "Berisiko menimbulkan keluhan terbuka yang merusak citra brand.",
            "Audiens lain jadi enggan membagikan foto pemakaiannya.",
          ],
        },
        {
          id: "ug3b",
          headline: "Membuat testimoni palsu",
          fields: {
            isi: "Tim membuat akun baru lalu menulis testimoni seolah-olah dari pembeli sungguhan.",
          },
          points: [
            "Testimoni palsu menyesatkan audiens dan melanggar ketentuan iklan.",
            "Sekali ketahuan, kepercayaan pada brand sulit dipulihkan.",
            "Bertentangan dengan tujuan UGC, yaitu menampilkan pengalaman nyata.",
          ],
        },
        {
          id: "ug3c",
          headline: "Mewajibkan pembelian untuk ikut serta",
          fields: {
            isi: "Audiens hanya boleh mengirim konten bila sudah membeli produk dengan nilai tertentu.",
          },
          points: [
            "Syarat pembelian menutup partisipasi audiens yang baru mengenal brand.",
            "Kiriman yang masuk sedikit sehingga bahan kontennya kering.",
            "Terasa seperti transaksi, bukan ajakan berbagi pengalaman.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 6. IDE VISUAL — rancangan visual secara rinci                      */
/* ================================================================== */

const ideVisual: ChoiceGroup = {
  id: "ideVisual",
  label: "Ide Visual",
  question: "Ide visual rinci untuk konten “{{judulKonten}}”",
  hint: "Uraikan cukup rinci agar tim produksi bisa langsung mengerjakannya di tugas berikutnya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "iv1a",
          headline: "Tiga babak: masalah, penjelasan, bukti",
          fields: {
            isi: "Babak 1 (0-3 detik): rekaman jarak dekat kaos basah menempel di punggung, cahaya alami siang hari. Babak 2 (3-15 detik): potongan bergantian antara wajah yang menjelaskan dan gambar jarak dekat serat bahan. Babak 3 (15-25 detik): dua kaos berdampingan setelah 10 menit, satu masih basah satu sudah kering. Warna: netral dengan aksen biru brand. Teks layar: satu baris per babak, huruf tebal ukuran besar.",
          },
          points: [
            "Dibagi tiga babak dengan durasi jelas sehingga tim tahu panjang tiap bagian.",
            "Menyebut jarak pengambilan, arah cahaya, dan warna yang dipakai.",
            "Teks layar dibatasi satu baris per babak agar tetap terbaca di layar ponsel.",
            "Sesuai format {{tipeKonten}} pada content plan.",
          ],
        },
        {
          id: "iv1b",
          headline: "Carousel enam halaman dengan pola tetap",
          fields: {
            isi: "Halaman 1: pertanyaan besar di atas latar biru brand. Halaman 2-4: masing-masing satu poin, foto jarak dekat di atas, satu kalimat penjelas di bawah. Halaman 5: tabel perbandingan sederhana dua kolom. Halaman 6: ajakan menyimpan, latar kuning dengan logo kecil di sudut. Huruf sama di semua halaman, ukuran judul dua kali ukuran isi.",
          },
          points: [
            "Setiap halaman punya satu tugas, tidak menumpuk banyak pesan.",
            "Pola tata letak sama di semua halaman sehingga pembaca terbiasa menggeser.",
            "Warna latar berganti pada halaman pembuka dan penutup untuk menandai batas.",
            "Halaman terakhir mengajak menyimpan, sesuai objective {{objectiveKonten}}.",
          ],
        },
        {
          id: "iv1c",
          headline: "Uji sederhana direkam tanpa potongan",
          fields: {
            isi: "Satu pengambilan gambar tanpa potongan, kamera diam di atas meja. Dua potong bahan dibasahi dengan takaran air yang sama, lalu dibiarkan di bawah kipas. Penghitung waktu ditampilkan di sudut layar. Cahaya dari jendela, latar meja kayu polos. Durasi dipercepat dua kali pada bagian menunggu.",
          },
          points: [
            "Rekaman tanpa potongan membuat hasil ujinya sulit diragukan.",
            "Penghitung waktu di sudut layar memberi bukti yang bisa diperiksa penonton.",
            "Latar polos menjaga perhatian tetap pada bahan yang diuji.",
            "Bagian menunggu dipercepat supaya durasi tetap pendek.",
          ],
        },
        {
          id: "iv1d",
          headline: "Satu hari dalam hidup, direkam dari sudut yang sama",
          fields: {
            isi: "Empat potongan pada jam berbeda: 06.30 bersiap, 12.00 di kantor, 17.30 latihan, 20.00 di rumah. Semua diambil dari tinggi dada dengan jarak yang sama agar perubahan kondisi baju terlihat. Jam ditampilkan sebagai teks kecil di sudut. Tanpa musik keras, hanya suara sekitar.",
          },
          points: [
            "Sudut dan jarak yang sama membuat perubahan kondisi baju mudah dibandingkan.",
            "Empat titik waktu menceritakan satu hari penuh tanpa perlu narasi panjang.",
            "Suara sekitar tanpa musik keras membuatnya terasa nyata.",
            "Cocok untuk audiens urban yang mengenali ritme harian itu.",
          ],
        },
        {
          id: "iv1e",
          headline: "Foto jarak dekat berpasangan sebelum dan sesudah",
          fields: {
            isi: "Tiga pasang foto jarak dekat: serat bahan baru dan setelah 90 kali cuci, jahitan bahu baru dan sekarang, warna bagian dalam dan luar. Semua difoto dengan cahaya dan latar yang sama. Setiap pasangan diberi label kecil berisi jumlah pemakaian.",
          },
          points: [
            "Pasangan foto dengan cahaya dan latar sama membuat perbandingannya adil.",
            "Tiga pasangan cukup untuk membuktikan tanpa membuat konten bertele-tele.",
            "Label jumlah pemakaian memberi ukuran yang konkret.",
            "Foto jarak dekat menampilkan detail yang tidak terlihat di foto katalog.",
          ],
        },
        {
          id: "iv1f",
          headline: "Gabungan rekaman brand dan kiriman pembeli",
          fields: {
            isi: "Bagian pembuka dan penutup direkam tim dengan mutu tinggi, bagian tengah memakai kiriman pembeli apa adanya. Perbedaan mutu dibiarkan terlihat sebagai penanda bahwa bagian itu benar-benar dari pengguna. Nama pengirim ditampilkan sebagai teks kecil di sudut.",
          },
          points: [
            "Perbedaan mutu dibiarkan terlihat justru sebagai penanda kejujuran.",
            "Pembuka dan penutup tetap rapi sehingga akun terlihat terurus.",
            "Nama pengirim ditampilkan sebagai bentuk penghargaan.",
            "Menghemat biaya produksi karena bagian tengahnya dari audiens.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "iv2a",
          headline: "Arahan umum tanpa rincian teknis",
          fields: { isi: "Buat video yang menarik dan estetik menampilkan produk dengan warna cerah." },
          points: [
            "Arah gayanya sudah disebut, yaitu menarik dan cerah.",
            "Tidak menyebut durasi, jumlah babak, jarak pengambilan, maupun teks layar.",
            "Tim produksi masih harus menebak banyak hal sebelum bisa mulai.",
          ],
        },
        {
          id: "iv2b",
          headline: "Rinci tetapi tidak sesuai formatnya",
          fields: {
            isi: "Rancangan berupa carousel dua belas halaman dengan penjelasan panjang di setiap halaman.",
          },
          points: [
            "Rinciannya cukup untuk langsung dikerjakan tim.",
            "Dua belas halaman jarang ditelusuri sampai habis oleh audiens.",
            "Tidak sesuai dengan {{tipeKonten}} yang sudah ditetapkan di content plan.",
          ],
        },
        {
          id: "iv2c",
          headline: "Visual bagus tetapi tanpa teks layar",
          fields: {
            isi: "Rekaman tiga babak dengan pengambilan gambar rapi, tanpa teks di layar sama sekali karena mengandalkan suara narasi.",
          },
          points: [
            "Susunan babak dan pengambilan gambarnya sudah jelas.",
            "Sebagian besar audiens menonton tanpa suara, jadi pesannya tidak sampai.",
            "Cukup ditambah satu baris teks per babak untuk memperbaikinya.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "iv3a",
          headline: "Menyerahkan sepenuhnya ke tim produksi",
          fields: { isi: "Visualnya bebas, terserah tim produksi saja yang penting bagus." },
          points: [
            "Tidak ada rancangan yang bisa dikerjakan tim.",
            "Instruksi meminta rancangan dalam bentuk deskripsi detail.",
            "Hasilnya tidak akan sejalan dengan hook dan storytelling yang sudah disusun.",
          ],
        },
        {
          id: "iv3b",
          headline: "Menyalin visual konten viral apa adanya",
          fields: {
            isi: "Meniru persis susunan visual konten viral milik akun lain, termasuk musik dan urutan potongannya.",
          },
          points: [
            "Meniru persis berisiko pada hak pakai musik maupun susunan kontennya.",
            "Tidak ada ciri visual {{brand}} yang terbangun.",
            "Audiens yang mengenali sumbernya menganggap brand tidak orisinal.",
          ],
        },
        {
          id: "iv3c",
          headline: "Visual mewah di luar kemampuan tim",
          fields: {
            isi: "Rekaman memakai drone, studio sewaan, dan lima model profesional dengan tiga hari pengambilan gambar.",
          },
          points: [
            "Biaya dan waktunya jauh melampaui kemampuan tim konten harian.",
            "Konten yang tidak bisa diproduksi rutin justru merusak konsistensi jadwal.",
            "Bertentangan dengan masalah pada studi kasus, yaitu jadwal unggah yang tidak konsisten.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 7. CAPTION — naskah dengan formula copywriting                     */
/* ================================================================== */

const caption: ChoiceGroup = {
  id: "caption",
  label: "Caption",
  question: "Caption konten “{{judulKonten}}” beserta formula copywriting-nya",
  hint: "Pakai salah satu formula: AIDA, FAB, PAS, atau ACCA. Strukturnya harus terlihat di naskahnya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "cp1a",
          headline: "AIDA — Attention, Interest, Desire, Action",
          fields: {
            formula: "AIDA (Attention, Interest, Desire, Action)",
            isi: "Attention: Selesai olahraga, bajumu masih basah sampai malam?\n\nInterest: Yang bikin gerah ternyata bukan panasnya, tapi bahan yang menahan uap keringat di permukaan kulit. Di udara lembap seperti Jakarta, bedanya terasa setelah 20 menit bergerak.\n\nDesire: Bahan breathable {{brand}} membiarkan uap keluar, jadi badan lebih cepat kering dan latihan tidak terganggu baju yang menempel.\n\nAction: Panduan memilih bahannya kami simpan di sorotan akun. Simpan konten ini biar tidak hilang.",
          },
          points: [
            "Attention: membuka dengan pengalaman yang dikenali audiens.",
            "Interest: menjelaskan penyebabnya sehingga audiens paham, bukan sekadar percaya.",
            "Desire: menghubungkan penjelasan itu dengan keunggulan produk.",
            "Action: satu ajakan yang ringan, yaitu menyimpan konten.",
          ],
        },
        {
          id: "cp1b",
          headline: "PAS — Problem, Agitate, Solution",
          fields: {
            formula: "PAS (Problem, Agitate, Solution)",
            isi: "Problem: Baju olahraga yang baru dibeli dua bulan lalu sudah melar di bagian bahu.\n\nAgitate: Ganti baru tiap dua bulan artinya empat kali beli dalam setahun. Belum lagi rasa tidak percaya diri saat potongannya sudah tidak rapi lagi di depan orang.\n\nSolution: Jahitan rata dan bahan yang kembali ke bentuk semula bikin satu potong bertahan jauh lebih lama. Cek cara memeriksanya sebelum kamu beli lagi.",
          },
          points: [
            "Problem: menyebut masalah nyata dengan rentang waktu yang konkret.",
            "Agitate: memperbesar akibatnya lewat hitungan biaya dan rasa tidak percaya diri.",
            "Solution: menawarkan jalan keluar berupa cara memeriksa, bukan langsung menyuruh membeli.",
            "Nada bicaranya tetap membantu, bukan menakut-nakuti berlebihan.",
          ],
        },
        {
          id: "cp1c",
          headline: "FAB — Features, Advantages, Benefits",
          fields: {
            formula: "FAB (Features, Advantages, Benefits)",
            isi: "Features: Bahan breathable dengan rajutan berpori dan jahitan rata di bagian bahu.\n\nAdvantages: Uap keringat keluar lebih cepat dan tidak ada jahitan yang mengganjal saat tangan diangkat.\n\nBenefits: Latihan terasa lebih ringan, badan cepat kering, dan bajunya tetap pantas dipakai berkumpul setelah latihan.\n\nMau lihat detail jahitannya? Ada di unggahan sebelumnya.",
          },
          points: [
            "Features: menyebut ciri produk secara teknis dan konkret.",
            "Advantages: menerjemahkan ciri itu menjadi keunggulan yang bisa dirasakan.",
            "Benefits: menutup dengan manfaat dalam bahasa keseharian audiens.",
            "Ditutup ajakan ringan tanpa memaksa membeli.",
          ],
        },
        {
          id: "cp1d",
          headline: "ACCA — Awareness, Comprehension, Conviction, Action",
          fields: {
            formula: "ACCA (Awareness, Comprehension, Conviction, Action)",
            isi: "Awareness: Banyak yang mengira baju olahraga yang adem saat dipegang pasti nyaman dipakai.\n\nComprehension: Padahal rasa adem di tangan datang dari bahan yang menyerap, dan bahan yang menyerap justru menahan keringat di kulit.\n\nConviction: Kami uji dua bahan dengan takaran air yang sama. Hasilnya bisa kamu lihat di video ini, tanpa potongan.\n\nAction: Kalau kamu sering latihan siang, coba periksa label bahan bajumu sekarang.",
          },
          points: [
            "Awareness: mengangkat anggapan umum yang dipegang banyak audiens.",
            "Comprehension: menjelaskan mengapa anggapan itu keliru.",
            "Conviction: memberi bukti berupa pengujian yang bisa dilihat sendiri.",
            "Action: ajakan sederhana yang bisa langsung dilakukan audiens.",
          ],
        },
        {
          id: "cp1e",
          headline: "AIDA versi pendek untuk konten video",
          fields: {
            formula: "AIDA (Attention, Interest, Desire, Action)",
            isi: "Attention: Baju ini sudah dipakai latihan 90 kali.\n\nInterest: Tidak melar, warnanya juga belum pudar. Rahasianya ada di dua hal: rajutan bahan dan cara mencucinya.\n\nDesire: Artinya satu potong bisa menemani latihanmu berbulan-bulan tanpa perlu diganti.\n\nAction: Cara mencuci yang benar kami tulis di komentar pertama.",
          },
          points: [
            "Keempat tahap AIDA dipadatkan agar cocok untuk caption video pendek.",
            "Attention memakai angka konkret sehingga langsung dipercaya.",
            "Desire diterjemahkan menjadi manfaat waktu dan biaya, bukan sekadar mutu.",
            "Action mengarahkan ke kolom komentar sehingga interaksi ikut naik.",
          ],
        },
        {
          id: "cp1f",
          headline: "PAS dengan sudut pandang pemakai",
          fields: {
            formula: "PAS (Problem, Agitate, Solution)",
            isi: "Problem: “Aku selalu bawa baju ganti ke kantor karena habis lari pagi bajunya masih basah.”\n\nAgitate: Satu tas tambahan tiap hari, dan tetap saja bau keringatnya tertinggal di ruangan.\n\nSolution: Sejak ganti bahan yang cepat kering, aku tidak perlu bawa baju ganti lagi. Ceritanya kami tulis lengkap di unggahan ini.",
          },
          points: [
            "Ditulis dari sudut pandang pemakai sehingga terasa seperti cerita, bukan iklan.",
            "Agitate menyebut kerepotan harian yang konkret, bukan keluhan umum.",
            "Solution muncul sebagai pengalaman pribadi, bukan klaim brand.",
            "Cocok dipadukan dengan bahan UGC yang sudah dikumpulkan.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "cp2a",
          headline: "Menyebut formula tetapi strukturnya tidak terlihat",
          fields: {
            formula: "AIDA (Attention, Interest, Desire, Action)",
            isi: "Baju olahraga {{brand}} nyaman dipakai, bahannya breathable, cocok untuk latihan harian. Yuk cek koleksinya sekarang!",
          },
          points: [
            "Formula yang dipakai sudah disebut dengan benar.",
            "Naskahnya tidak menunjukkan tahap Attention, Interest, maupun Desire secara terpisah.",
            "Pemeriksa tidak bisa melihat penerapan formulanya di dalam caption.",
          ],
        },
        {
          id: "cp2b",
          headline: "Struktur lengkap tetapi terlalu panjang",
          fields: {
            formula: "ACCA (Awareness, Comprehension, Conviction, Action)",
            isi: "Awareness: Banyak sekali orang di Indonesia yang setiap harinya melakukan aktivitas olahraga dengan berbagai macam jenis mulai dari lari, bersepeda, angkat beban, yoga, dan lain sebagainya.\n\nComprehension: Setiap jenis olahraga tersebut tentunya membutuhkan jenis pakaian yang berbeda-beda pula, dan hal ini sering kali tidak disadari oleh banyak orang yang baru memulai.\n\nConviction: Kami sudah melakukan berbagai pengujian terhadap berbagai jenis bahan.\n\nAction: Silakan kunjungi toko kami.",
          },
          points: [
            "Keempat tahap ACCA sudah ada dan urutannya benar.",
            "Kalimatnya berputar-putar sehingga bagian penting tenggelam.",
            "Caption sepanjang ini terpotong di beranda sebelum bagian Action terbaca.",
          ],
        },
        {
          id: "cp2c",
          headline: "Formula benar tetapi ajakannya kabur",
          fields: {
            formula: "FAB (Features, Advantages, Benefits)",
            isi: "Features: Bahan breathable dengan rajutan berpori.\n\nAdvantages: Uap keringat keluar lebih cepat.\n\nBenefits: Latihan jadi lebih nyaman.\n\nSemoga bermanfaat ya.",
          },
          points: [
            "Ketiga tahap FAB tersusun rapi dan mudah diikuti.",
            "Penutupnya tidak mengajak audiens melakukan apa pun.",
            "Konten kehilangan kesempatan menaikkan interaksi yang jadi objective.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "cp3a",
          headline: "Tanpa formula, hanya ajakan membeli berulang",
          fields: {
            formula: "Tidak memakai formula",
            isi: "BURUAN BELI SEKARANG! DISKON BESAR! STOK TERBATAS! KLIK LINK DI BIO SEKARANG JUGA!",
          },
          points: [
            "Tidak memakai satu pun formula yang diminta instruksi.",
            "Seluruh naskah berisi ajakan membeli tanpa alasan bagi audiens.",
            "Huruf kapital sepanjang caption membuatnya sulit dibaca dan terkesan berteriak.",
          ],
        },
        {
          id: "cp3b",
          headline: "Caption berisi klaim yang tidak benar",
          fields: {
            formula: "AIDA (Attention, Interest, Desire, Action)",
            isi: "Attention: Mau kurus tanpa diet?\n\nInterest: Baju ini membakar lemak saat kamu bergerak.\n\nDesire: Cukup pakai sebulan, berat badan turun sendiri.\n\nAction: Pesan sekarang sebelum kehabisan!",
          },
          points: [
            "Klaim membakar lemak dan menurunkan berat badan tidak benar untuk pakaian.",
            "Berisiko melanggar ketentuan iklan dan merusak kepercayaan audiens.",
            "Struktur AIDA-nya benar, tetapi isinya menyesatkan.",
          ],
        },
        {
          id: "cp3c",
          headline: "Caption tidak berhubungan dengan kontennya",
          fields: {
            formula: "Tidak memakai formula",
            isi: "Selamat pagi semuanya, semoga harimu menyenangkan. Jangan lupa follow akun kami ya!",
          },
          points: [
            "Caption tidak menyinggung isi konten “{{judulKonten}}” sama sekali.",
            "Audiens yang tertarik pada kontennya tidak mendapat penjelasan lanjutan.",
            "Tidak memakai formula copywriting seperti yang diminta instruksi.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 8. KESESUAIAN DENGAN OBJECTIVE — tahap finalisasi                  */
/* ================================================================== */

const kesesuaian: ChoiceGroup = {
  id: "kesesuaian",
  label: "Kesesuaian",
  question: "Bagaimana rencana konten dan caption ini menjawab objective {{objectiveKonten}}?",
  hint: "Tahap finalisasi meminta pemeriksaan bahwa rencana dan caption sejalan dengan objective.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "ks1a",
          headline: "Diperiksa lewat tiga titik: hook, isi, dan ajakan",
          fields: {
            isi: "Hook menahan audiens pada tiga detik pertama sehingga jangkauannya naik; isi konten menjawab satu masalah nyata sehingga audiens bertahan sampai selesai; ajakan di akhir meminta tindakan ringan yang sesuai objective {{objectiveKonten}}, bukan langsung menyuruh membeli.",
          },
          points: [
            "Hook diperiksa terhadap kebutuhan menahan audiens di detik awal.",
            "Isi konten diperiksa terhadap satu masalah audiens yang jelas.",
            "Ajakan diperiksa agar setara dengan tahap yang dikejar objective.",
            "Ketiganya dinilai sebelum konten masuk tahap produksi.",
          ],
        },
        {
          id: "ks1b",
          headline: "Dicek terhadap ukuran keberhasilan yang sudah ditetapkan",
          fields: {
            isi: "Objective {{objectiveKonten}} punya ukuran keberhasilan yang sudah ditetapkan di content plan. Rencana konten ini diperiksa apakah bentuknya memang mendorong ukuran itu, bukan sekadar terlihat bagus.",
          },
          points: [
            "Pemeriksaan berpatokan pada ukuran keberhasilan, bukan selera.",
            "Bentuk konten dipilih karena mendorong ukuran itu, bukan karena sedang tren.",
            "Kalau tidak mendorong ukurannya, rencana diubah sebelum diproduksi.",
            "Hasilnya bisa dibandingkan setelah konten tayang.",
          ],
        },
        {
          id: "ks1c",
          headline: "Diperiksa terhadap pilar dan audiens yang sudah dipetakan",
          fields: {
            isi: "Rencana ini diperiksa terhadap dua hal: apakah masih berada di dalam pilar {{pilarKonten}}, dan apakah bahasanya sesuai dengan profil audiens yang dipetakan pada tugas pertama.",
          },
          points: [
            "Pilar dijaga agar konten tidak melenceng dari susunan pekan itu.",
            "Bahasa diperiksa terhadap profil audiens, bukan terhadap selera tim.",
            "Menjaga seluruh rangkaian tugas tetap saling menyambung.",
            "Konten yang keluar dari pilar dijadwal ulang, bukan dipaksakan tayang.",
          ],
        },
        {
          id: "ks1d",
          headline: "Diperiksa lewat pertanyaan tunggal: apa yang audiens lakukan setelah menonton",
          fields: {
            isi: "Satu pertanyaan dipakai sebagai penyaring: setelah menonton konten ini, apa yang diharapkan audiens lakukan? Bila jawabannya tidak jelas atau tidak sesuai objective {{objectiveKonten}}, rencananya diperbaiki lebih dulu.",
          },
          points: [
            "Satu pertanyaan sederhana yang bisa dipakai siapa pun di tim.",
            "Jawaban yang kabur menandakan kontennya belum punya arah.",
            "Menghubungkan langsung isi konten dengan tindakan audiens.",
            "Memaksa ajakan di akhir konten dibuat spesifik.",
          ],
        },
        {
          id: "ks1e",
          headline: "Diperiksa terhadap tahap perjalanan audiens",
          fields: {
            isi: "Objective {{objectiveKonten}} menempatkan audiens pada tahap tertentu. Rencana ini diperiksa apakah isinya sesuai tahap itu, misalnya konten pengenalan tidak diminta langsung menghasilkan pembelian.",
          },
          points: [
            "Isi konten disesuaikan dengan tahap perjalanan audiens.",
            "Konten pengenalan tidak dibebani target penjualan langsung.",
            "Menghindari ajakan yang terlalu jauh dari kesiapan audiens.",
            "Ukuran keberhasilannya pun mengikuti tahap tersebut.",
          ],
        },
        {
          id: "ks1f",
          headline: "Diperiksa bersama tim sebelum masuk produksi",
          fields: {
            isi: "Rencana konten dan caption dibaca ulang bersama satu anggota tim lain sebelum masuk produksi. Pemeriksa menandai bagian yang belum sejalan dengan objective {{objectiveKonten}}, lalu diperbaiki sebelum status berubah menjadi siap tayang.",
          },
          points: [
            "Pemeriksaan dilakukan orang lain, bukan penulisnya sendiri.",
            "Bagian yang belum sejalan ditandai dan diperbaiki, bukan dibiarkan.",
            "Status baru berubah menjadi siap tayang setelah pemeriksaan selesai.",
            "Mengurangi konten yang tayang lalu disesali kemudian.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "ks2a",
          headline: "Menyatakan sudah sesuai tanpa alasan",
          fields: { isi: "Rencana konten dan caption ini sudah sesuai dengan objective yang ditetapkan." },
          points: [
            "Sudah menyatakan hubungan antara rencana dan objective.",
            "Tidak menjelaskan bagian mana yang membuatnya sesuai.",
            "Pernyataan seperti ini tidak bisa dipakai memperbaiki rencana.",
          ],
        },
        {
          id: "ks2b",
          headline: "Hanya memeriksa caption",
          fields: {
            isi: "Caption sudah memakai formula copywriting dan ajakannya jelas, jadi kontennya dianggap sesuai objective.",
          },
          points: [
            "Pemeriksaan caption sudah benar dan memang perlu.",
            "Hook, storytelling, dan ide visual tidak ikut diperiksa.",
            "Konten bisa saja gagal menahan audiens meski captionnya bagus.",
          ],
        },
        {
          id: "ks2c",
          headline: "Memeriksa terhadap selera, bukan objective",
          fields: { isi: "Rencana ini sudah bagus dan enak dilihat, jadi pasti disukai audiens." },
          points: [
            "Menaruh perhatian pada mutu tampilan konten.",
            "Selera tim bukan ukuran yang bisa diperiksa maupun dibandingkan.",
            "Objective {{objectiveKonten}} tidak disinggung sama sekali.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "ks3a",
          headline: "Tidak perlu diperiksa",
          fields: { isi: "Tidak perlu diperiksa lagi, yang penting kontennya tayang tepat waktu." },
          points: [
            "Tahap finalisasi pada instruksi dilewati begitu saja.",
            "Konten yang tidak sejalan dengan objective tetap tayang dan membuang slot unggah.",
            "Hasilnya tidak bisa dievaluasi karena tidak ada patokan.",
          ],
        },
        {
          id: "ks3b",
          headline: "Diukur dari jumlah suka saja",
          fields: { isi: "Kalau nanti banyak yang suka berarti sudah sesuai objective." },
          points: [
            "Jumlah suka belum tentu mencerminkan objective yang dikejar.",
            "Pemeriksaan baru dilakukan setelah tayang, padahal seharusnya sebelum produksi.",
            "Konten yang meleset tidak bisa lagi diperbaiki saat itu.",
          ],
        },
        {
          id: "ks3c",
          headline: "Mengganti objective agar cocok dengan kontennya",
          fields: {
            isi: "Kalau rencana kontennya tidak sesuai objective, objective-nya saja yang diganti mengikuti konten.",
          },
          points: [
            "Membalik urutan: konten seharusnya mengikuti objective, bukan sebaliknya.",
            "Objective yang berubah-ubah membuat hasil antar pekan tidak bisa dibandingkan.",
            "Seluruh perencanaan pada tugas sebelumnya jadi tidak berguna.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */

export const tpm3Groups: ChoiceGroup[] = [
  pilihKonten,
  hook,
  visualHook,
  storytelling,
  ugc,
  ideVisual,
  caption,
  kesesuaian,
];

export const bankTpm3 = {
  pilihKonten,
  hook,
  visualHook,
  storytelling,
  ugc,
  ideVisual,
  caption,
  kesesuaian,
};
