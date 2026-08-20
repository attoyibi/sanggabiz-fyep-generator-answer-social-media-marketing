import type { ChoiceGroup } from "../types";

/**
 * BANK JAWABAN TPM 4 — Mendesain Konten Visual brand "FitActive".
 *
 * Melanjutkan rancangan konten TPM 3, yang sendirinya melanjutkan content plan
 * TPM 2. Jawaban di sini menentukan bentuk desain yang digambar website:
 * susunan tata letak, kombinasi warna dari Brand Guideline, dan isi teksnya.
 *
 * Token: {{judulKonten}}, {{hookKonten}}, {{pilarKonten}}, {{tipeKonten}},
 * {{platformKonten}}, {{objectiveKonten}}, {{brand}}.
 */

/* ================================================================== */
/* 1. FORMAT KONTEN — ukuran kanvas dan rasio                         */
/* ================================================================== */

const format: ChoiceGroup = {
  id: "format",
  label: "Format Konten",
  question: "Format dan ukuran kanvas untuk konten “{{judulKonten}}”",
  hint: "Format mengikuti tipe visual yang kamu rancang: {{tipeKonten}}.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "fm1a",
          headline: "Mengikuti tipe visual pada rancangan",
          fields: { mode: "auto" },
          points: [
            "Ukuran kanvas ditentukan dari tipe visual yang sudah dirancang di TPM 3.",
            "Reels dan Story memakai 1080x1920 piksel dengan rasio 9:16.",
            "Feed dan carousel memakai 1080x1080 piksel dengan rasio 1:1.",
            "Format PNG dipilih karena diminta pada ketentuan pengumpulan.",
          ],
        },
        {
          id: "fm1b",
          headline: "Mengikuti rancangan, dengan margin aman diperlebar",
          fields: { mode: "auto" },
          points: [
            "Ukuran kanvas mengikuti tipe visual pada rancangan TPM 3.",
            "Margin aman diperlebar agar teks tetap terbaca saat dibagikan ulang ke Story.",
            "Rasio dijaga tepat supaya platform tidak memotong tepinya sendiri.",
            "Format PNG dipilih agar warna solid tidak pecah seperti pada JPG.",
          ],
        },
        {
          id: "fm1c",
          headline: "Mengikuti rancangan, disiapkan untuk dua platform",
          fields: { mode: "auto" },
          points: [
            "Ukuran utama mengikuti tipe visual pada rancangan TPM 3.",
            "Unsur penting ditaruh di tengah agar aman bila dipakai ulang di platform lain.",
            "Resolusi 1080 piksel cukup tajam untuk layar ponsel tanpa berkas jadi berat.",
            "Format PNG dipilih karena diminta pada ketentuan pengumpulan.",
          ],
        },
        {
          id: "fm1d",
          headline: "Mengikuti rancangan, resolusi dijaga tetap 1080 piksel",
          fields: { mode: "auto" },
          points: [
            "Ukuran kanvas mengikuti tipe visual pada rancangan TPM 3.",
            "Sisi terpendek dijaga 1080 piksel, ukuran unggah yang tidak dikompres berlebihan.",
            "Teks dibuat cukup besar agar tetap terbaca setelah kompresi platform.",
            "Format PNG menjaga ketajaman garis dan teks.",
          ],
        },
        {
          id: "fm1e",
          headline: "Mengikuti rancangan, sudah memperhitungkan potongan pratinjau",
          fields: { mode: "auto" },
          points: [
            "Ukuran kanvas mengikuti tipe visual pada rancangan TPM 3.",
            "Bagian tengah dijaga tetap utuh karena itu yang tampil pada pratinjau profil.",
            "Judul tidak ditaruh di tepi atas yang sering terpotong.",
            "Format PNG dipilih karena diminta pada ketentuan pengumpulan.",
          ],
        },
        {
          id: "fm1f",
          headline: "Mengikuti rancangan, disiapkan untuk layar kecil",
          fields: { mode: "auto" },
          points: [
            "Ukuran kanvas mengikuti tipe visual pada rancangan TPM 3.",
            "Ukuran huruf terkecil dijaga agar tetap terbaca di layar ponsel 5 inci.",
            "Jumlah baris teks dibatasi supaya tidak menutupi gambar.",
            "Format PNG dipilih karena diminta pada ketentuan pengumpulan.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "fm2a",
          headline: "Persegi untuk semua, apa pun rancangannya",
          fields: { mode: "persegi" },
          points: [
            "Ukuran 1080x1080 memang paling umum dipakai di feed Instagram.",
            "Rancangan berformat Reels jadi dipaksa ke bentuk persegi.",
            "Bagian atas dan bawah desain vertikal terpotong saat dipindahkan.",
          ],
        },
        {
          id: "fm2b",
          headline: "Vertikal untuk semua, apa pun rancangannya",
          fields: { mode: "vertikal" },
          points: [
            "Ukuran 1080x1920 tepat untuk Reels dan Story.",
            "Rancangan berformat feed jadi punya banyak ruang kosong di atas dan bawah.",
            "Tidak sesuai dengan tipe visual yang sudah ditetapkan di rancangan.",
          ],
        },
        {
          id: "fm2c",
          headline: "Mengikuti rancangan tetapi resolusi rendah",
          fields: { mode: "auto" },
          points: [
            "Rasio dan bentuknya sudah sesuai rancangan.",
            "Resolusi 540 piksel membuat teks tampak pecah setelah diunggah.",
            "Prinsip gambar berkualitas tinggi pada materi desain belum terpenuhi.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "fm3a",
          headline: "Ukuran bebas tanpa patokan",
          fields: { mode: "persegi" },
          points: [
            "Ukuran ditentukan seadanya tanpa mengikuti ketentuan platform.",
            "Platform akan memotong sendiri bagian yang tidak sesuai rasionya.",
            "Elemen penting berisiko hilang dari tampilan.",
          ],
        },
        {
          id: "fm3b",
          headline: "Ukuran cetak, bukan ukuran layar",
          fields: { mode: "persegi" },
          points: [
            "Memakai ukuran A4 yang dirancang untuk cetak, bukan untuk media sosial.",
            "Rasionya tidak cocok dengan tampilan feed maupun Story.",
            "Berkasnya jauh lebih berat tanpa menambah ketajaman di layar.",
          ],
        },
        {
          id: "fm3c",
          headline: "Format JPG kualitas rendah",
          fields: { mode: "persegi" },
          points: [
            "Ketentuan pengumpulan meminta PNG, bukan JPG.",
            "Kompresi JPG membuat tepi teks dan warna solid tampak kotor.",
            "Desain terlihat tidak rapi meski susunannya benar.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 2. TATA LETAK — hierarki visual                                    */
/* ================================================================== */

const tataLetak: ChoiceGroup = {
  id: "layout",
  label: "Tata Letak",
  question: "Susunan tata letak dan hierarki visual desain",
  hint: "Hierarki menentukan apa yang dibaca audiens lebih dulu. Pilihanmu langsung menggambar desainnya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "lo1a",
          headline: "Judul besar di atas, pesan pendukung dan CTA di bawah",
          fields: { pola: "atas" },
          points: [
            "Judul jadi unsur terbesar sehingga terbaca lebih dulu.",
            "Pesan pendukung berukuran sepertiga judul, jelas berada di tingkat kedua.",
            "CTA ditaruh paling bawah dengan blok warna agar terpisah dari isi.",
            "Ruang kosong dibiarkan di tengah supaya desain tidak terasa penuh.",
          ],
        },
        {
          id: "lo1b",
          headline: "Blok warna di bawah sebagai panggung judul",
          fields: { pola: "bawah" },
          points: [
            "Dua pertiga bagian atas dibiarkan lapang sebagai ruang bernapas.",
            "Blok warna di bawah menampung judul dan pesan pendukung sekaligus.",
            "Mata audiens jatuh ke blok warna lebih dulu karena kontrasnya paling tinggi.",
            "CTA menempel di dalam blok, jadi tidak ada unsur yang menggantung.",
          ],
        },
        {
          id: "lo1c",
          headline: "Judul di tengah, kutipan hook di atasnya",
          fields: { pola: "tengah" },
          points: [
            "Judul ditaruh tepat di tengah, titik paling aman dari potongan platform.",
            "Hook diletakkan kecil di atas judul sebagai pengantar.",
            "Bagian atas dan bawah dibiarkan kosong sehingga judul menonjol.",
            "Cocok saat pesannya cukup satu kalimat kuat.",
          ],
        },
        {
          id: "lo1d",
          headline: "Pita warna di atas untuk pilar, judul di bawahnya",
          fields: { pola: "pita" },
          points: [
            "Pita warna di atas menandai pilar konten sehingga audiens tahu jenis kontennya.",
            "Judul ditaruh persis di bawah pita, jadi urutan bacanya jelas.",
            "Warna pita berbeda tiap pilar sehingga grid akun terlihat tertata.",
            "CTA ditaruh di bawah dengan ukuran kecil supaya tidak bersaing dengan judul.",
          ],
        },
        {
          id: "lo1e",
          headline: "Angka besar sebagai jangkar, judul di sampingnya",
          fields: { pola: "angka" },
          points: [
            "Angka besar menarik mata lebih dulu, lalu berpindah ke judul di sebelahnya.",
            "Cocok untuk konten berisi daftar seperti tiga tanda atau lima kesalahan.",
            "Judul dibuat lebih kecil dari angka supaya hierarkinya tidak bertabrakan.",
            "Ruang kosong di bawah menjaga desain tetap lega.",
          ],
        },
        {
          id: "lo1f",
          headline: "Judul kiri, blok pendukung kanan",
          fields: { pola: "belah" },
          points: [
            "Kanvas dibelah dua: judul di kiri, keterangan pendukung di kanan.",
            "Pembagian dua kolom membuat teks panjang tetap mudah dibaca.",
            "Blok kanan diberi warna berbeda supaya batas keduanya terlihat.",
            "Ajakan ditaruh di kaki kolom judul, jadi tidak menabrak blok kanan.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "lo2a",
          headline: "Semua teks berukuran sama",
          fields: { pola: "rata" },
          points: [
            "Seluruh teks tersusun rapi dan sejajar.",
            "Ukuran yang seragam membuat audiens tidak tahu harus membaca dari mana.",
            "Prinsip hierarki visual yang jelas belum terpenuhi.",
          ],
        },
        {
          id: "lo2b",
          headline: "Judul besar tetapi tanpa ruang kosong",
          fields: { pola: "padat" },
          points: [
            "Hierarki ukurannya sudah benar, judul jelas paling besar.",
            "Seluruh kanvas terisi teks sehingga tidak ada ruang bernapas.",
            "Prinsip gunakan white space belum diterapkan.",
          ],
        },
        {
          id: "lo2c",
          headline: "Dua pesan utama dalam satu desain",
          fields: { pola: "dua" },
          points: [
            "Kedua pesan ditulis dengan jelas dan mudah dibaca.",
            "Prinsip satu post satu pesan dilanggar, audiens bingung mana yang utama.",
            "Salah satu pesan sebaiknya dipindah ke konten terpisah.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "lo3a",
          headline: "Teks menumpuk di atas gambar tanpa alas",
          fields: { pola: "tumpuk" },
          points: [
            "Teks ditaruh langsung di atas gambar tanpa blok warna atau bayangan.",
            "Bagian teks yang jatuh di area terang jadi tidak terbaca.",
            "Prinsip teks mudah dibaca tidak terpenuhi.",
          ],
        },
        {
          id: "lo3b",
          headline: "Semua unsur ditaruh di tepi kanvas",
          fields: { pola: "tepi" },
          points: [
            "Unsur penting keluar dari safe zone sehingga berisiko tertutup antarmuka platform.",
            "Judul di tepi atas biasanya tertimpa nama akun saat dibagikan ke Story.",
            "CTA di tepi bawah tertutup tombol platform.",
          ],
        },
        {
          id: "lo3c",
          headline: "Tanpa susunan, unsur ditaruh acak",
          fields: { pola: "acak" },
          points: [
            "Tidak ada urutan baca yang bisa diikuti audiens.",
            "Desain terlihat tidak dikerjakan dengan sengaja.",
            "Konsistensi brand pada grid akun ikut rusak.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3. KOMBINASI WARNA — dari Brand Guideline                          */
/* ================================================================== */

const warna: ChoiceGroup = {
  id: "warna",
  label: "Warna",
  question: "Kombinasi warna sesuai Brand Guideline",
  hint: "Semua pilihan memakai warna resmi Brand Guideline; yang membedakan adalah kontras dan perannya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "wn1a",
          headline: "Plan Blue sebagai latar, Yellow untuk CTA",
          fields: { latar: "planBlue", judul: "white", aksen: "yellow", teksAksen: "black" },
          points: [
            "Latar Plan Blue #0072CE menjaga konsistensi brand di seluruh grid.",
            "Judul putih di atas biru memberi kontras yang aman dibaca.",
            "Yellow #FFD500 dipakai hanya untuk CTA sehingga perhatian tertuju ke sana.",
            "Tiga warna saja, sesuai prinsip pilih warna strategis.",
          ],
        },
        {
          id: "wn1b",
          headline: "Latar putih bersih, Plan Blue untuk judul",
          fields: { latar: "white", judul: "planBlue", aksen: "orange", teksAksen: "black" },
          points: [
            "Latar putih memberi ruang bernapas paling lega.",
            "Judul Plan Blue tetap menjaga identitas brand tanpa mendominasi.",
            "Orange #ED632F dipakai untuk CTA karena paling menonjol di atas putih, dengan teks hitam agar tetap terbaca.",
            "Cocok untuk konten edukasi yang butuh kesan bersih dan jelas.",
          ],
        },
        {
          id: "wn1c",
          headline: "Dark Blue sebagai latar, Light Blue untuk pendukung",
          fields: { latar: "darkBlue", judul: "white", aksen: "lightBlue", teksAksen: "darkBlue" },
          points: [
            "Dark Blue #243C4B memberi kesan tenang dan tidak menyilaukan di malam hari.",
            "Judul putih di atasnya punya kontras tertinggi.",
            "Light Blue #58CAE7 dipakai untuk blok pendukung agar tetap satu keluarga warna.",
            "Cocok untuk konten yang tayang pada jam malam.",
          ],
        },
        {
          id: "wn1d",
          headline: "Latar Light Grey, Plan Blue dan Magenta sebagai penekan",
          fields: { latar: "lightGrey", judul: "darkBlue", aksen: "magenta", teksAksen: "white" },
          points: [
            "Light Grey #D9D9D6 lebih lembut daripada putih murni sehingga tidak menyilaukan.",
            "Judul Dark Blue terbaca jelas tanpa terasa keras.",
            "Magenta #DC0080 dipakai sedikit saja sebagai penarik perhatian.",
            "Perbandingan warnanya menjaga desain tetap tenang.",
          ],
        },
        {
          id: "wn1e",
          headline: "Latar Yellow, teks hitam, Plan Blue untuk CTA",
          fields: { latar: "yellow", judul: "black", aksen: "planBlue", teksAksen: "white" },
          points: [
            "Yellow #FFD500 sebagai latar membuat konten menonjol di beranda yang ramai.",
            "Teks hitam di atas kuning punya kontras paling tinggi dan aman dibaca.",
            "Plan Blue dipakai untuk CTA agar identitas brand tetap muncul.",
            "Cocok untuk konten yang mengejar jangkauan.",
          ],
        },
        {
          id: "wn1f",
          headline: "Latar putih, Green untuk penanda pilar",
          fields: { latar: "white", judul: "darkBlue", aksen: "green", teksAksen: "black" },
          points: [
            "Latar putih menjaga fokus tetap pada teks.",
            "Green #8AC208 dipakai sebagai penanda pilar konten, bukan sebagai warna utama.",
            "Judul Dark Blue memberi kesan tenang dan mudah dibaca.",
            "Cocok untuk konten bertema kebiasaan sehat dan rutinitas.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "wn2a",
          headline: "Warna brand tetapi kontrasnya rendah",
          fields: { latar: "lightBlue", judul: "white", aksen: "lightGrey", teksAksen: "white" },
          points: [
            "Seluruh warnanya memang diambil dari Brand Guideline.",
            "Putih di atas Light Blue kontrasnya terlalu rendah untuk dibaca di layar terang.",
            "Prinsip teks mudah dibaca belum terpenuhi.",
          ],
        },
        {
          id: "wn2b",
          headline: "Memakai lima warna sekaligus",
          fields: { latar: "purple", judul: "yellow", aksen: "green", teksAksen: "red" },
          points: [
            "Semua warnanya ada di dalam Brand Guideline.",
            "Lima warna dalam satu desain membuat mata tidak tahu harus fokus ke mana.",
            "Prinsip pilih warna strategis belum diterapkan.",
          ],
        },
        {
          id: "wn2c",
          headline: "Aman tetapi tanpa warna brand sama sekali",
          fields: { latar: "white", judul: "black", aksen: "lightGrey", teksAksen: "black" },
          points: [
            "Hitam putih memang paling aman dibaca.",
            "Tidak ada satu pun warna brand yang muncul, jadi kontennya tidak dikenali sebagai milik {{brand}}.",
            "Prinsip konsistensi brand belum terpenuhi.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "wn3a",
          headline: "Warna di luar Brand Guideline",
          fields: { latar: "#7B3F00", judul: "#FF00FF", aksen: "#00FF00", teksAksen: "#000000" },
          points: [
            "Warna yang dipakai tidak ada di dalam Brand Guideline.",
            "Grid akun jadi tidak seragam dengan konten lainnya.",
            "Prinsip konsistensi brand dilanggar.",
          ],
        },
        {
          id: "wn3b",
          headline: "Teks dan latar berwarna sama",
          fields: { latar: "planBlue", judul: "planBlue", aksen: "planBlue", teksAksen: "planBlue" },
          points: [
            "Teks hampir tidak terlihat karena warnanya sama dengan latar.",
            "Pesan konten tidak sampai sama sekali.",
            "Warnanya memang dari brand, tetapi penerapannya membuat desain tidak berfungsi.",
          ],
        },
        {
          id: "wn3c",
          headline: "Latar gradasi ramai dengan teks berwarna-warni",
          fields: { latar: "magenta", judul: "green", aksen: "purple", teksAksen: "yellow" },
          points: [
            "Kombinasi warna mencolok membuat teks sulit dipisahkan dari latarnya.",
            "Tidak ada satu warna pun yang berperan sebagai penenang.",
            "Desain terasa ramai dan menurunkan kesan mutu brand.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 4. TEKS DESAIN — isi yang benar-benar tampil di kanvas             */
/* ================================================================== */

const teks: ChoiceGroup = {
  id: "teks",
  label: "Teks Desain",
  question: "Teks yang tampil di desain",
  hint: "Teks di desain harus singkat. Naskah panjang tempatnya di caption, bukan di gambar.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "tk1a",
          headline: "Hook jadi judul, satu kalimat pendukung, satu CTA",
          fields: {
            judul: "{{hookKonten}}",
            pendukung: "Bahan yang menahan uap bikin keringat menempel di kulit.",
            cta: "Simpan dulu, biar tidak lupa",
          },
          points: [
            "Judul memakai hook yang sudah dirancang, jadi desain dan naskah sejalan.",
            "Satu kalimat pendukung saja supaya prinsip satu post satu pesan terjaga.",
            "CTA berupa ajakan ringan yang sesuai objective {{objectiveKonten}}.",
            "Total teks di bawah 20 kata sehingga terbaca dalam sekali pandang.",
          ],
        },
        {
          id: "tk1b",
          headline: "Judul singkat, angka sebagai penegas, CTA jelas",
          fields: {
            judul: "{{judulKonten}}",
            pendukung: "3 hal yang paling menentukan.",
            cta: "Geser untuk tahu",
          },
          points: [
            "Judul memakai judul konten dari rancangan sehingga mudah ditelusuri balik.",
            "Angka pada kalimat pendukung memberi janji isi yang jelas.",
            "CTA menyesuaikan format {{tipeKonten}}.",
            "Ketiganya berhierarki jelas: judul, pendukung, lalu ajakan.",
          ],
        },
        {
          id: "tk1c",
          headline: "Pertanyaan sebagai judul, jawabannya ditahan",
          fields: {
            judul: "Kenapa bajumu masih basah sampai malam?",
            pendukung: "Jawabannya bukan soal ukuran.",
            cta: "Cek penjelasannya",
          },
          points: [
            "Pertanyaan membuat audiens berhenti untuk menjawab dalam hati.",
            "Kalimat pendukung menyangkal dugaan pertama sehingga rasa penasaran bertahan.",
            "CTA mengarahkan ke isi konten, bukan langsung ke pembelian.",
            "Sesuai objective {{objectiveKonten}} yang mengejar perhatian lebih dulu.",
          ],
        },
        {
          id: "tk1d",
          headline: "Pernyataan berlawanan, penjelasan singkat, ajakan menyimpan",
          fields: {
            judul: "Yang terasa adem justru bikin gerah",
            pendukung: "Bahan penyerap menahan keringat di permukaan kulit.",
            cta: "Simpan panduannya",
          },
          points: [
            "Pernyataan yang berlawanan dengan anggapan umum menahan audiens.",
            "Penjelasan satu kalimat cukup untuk menjawab tanpa membuat desain penuh.",
            "Ajakan menyimpan menaikkan jangkauan susulan konten.",
            "Ketiga teks tetap berada di dalam safe zone.",
          ],
        },
        {
          id: "tk1e",
          headline: "Angka besar, keterangan singkat, ajakan berkomentar",
          fields: {
            judul: "90x",
            pendukung: "Dipakai latihan 90 kali. Begini kondisinya sekarang.",
            cta: "Punyamu bertahan berapa lama?",
          },
          points: [
            "Angka besar jadi jangkar visual yang langsung menarik mata.",
            "Keterangan singkat menjelaskan angkanya tanpa bertele-tele.",
            "CTA berupa pertanyaan mendorong audiens menulis komentar.",
            "Cocok dipadukan dengan tata letak berjangkar angka.",
          ],
        },
        {
          id: "tk1f",
          headline: "Nama pilar, judul, lalu ajakan sesuai platform",
          fields: {
            judul: "{{judulKonten}}",
            pendukung: "{{pilarKonten}}",
            cta: "Selengkapnya di {{platformKonten}}",
          },
          points: [
            "Nama pilar ditampilkan supaya audiens mengenali jenis kontennya.",
            "Judul tetap jadi unsur terbesar dan dibaca lebih dulu.",
            "CTA menyebut platform tempat konten itu tayang.",
            "Membantu grid akun terlihat tertata karena tiap pilar punya penanda.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "tk2a",
          headline: "Judul bagus tetapi tanpa CTA",
          fields: {
            judul: "{{hookKonten}}",
            pendukung: "Penjelasan lengkapnya ada di dalam konten.",
            cta: "",
          },
          points: [
            "Judul dan kalimat pendukungnya sudah singkat dan jelas.",
            "Tidak ada ajakan bertindak, padahal itu satu dari delapan prinsip desain.",
            "Audiens tidak tahu apa yang diharapkan setelah melihat desain.",
          ],
        },
        {
          id: "tk2b",
          headline: "Seluruh caption dimasukkan ke desain",
          fields: {
            judul: "{{judulKonten}}",
            pendukung:
              "Bahan yang menyerap keringat akan menahannya di permukaan kulit sehingga tubuh terasa lebih gerah, terutama pada cuaca lembap seperti di kota-kota besar Indonesia, dan hal ini sering tidak disadari oleh banyak orang yang baru mulai berolahraga secara rutin.",
            cta: "Baca selengkapnya di caption",
          },
          points: [
            "Isinya benar dan sesuai topik konten.",
            "Naskah sepanjang ini membuat desain penuh dan hurufnya jadi kecil.",
            "Prinsip white space dan teks mudah dibaca sama-sama terlanggar.",
          ],
        },
        {
          id: "tk2c",
          headline: "Teks singkat tetapi tidak menyebut apa pun yang khas",
          fields: {
            judul: "Koleksi Terbaru",
            pendukung: "Nyaman dan berkualitas.",
            cta: "Cek sekarang",
          },
          points: [
            "Panjang teksnya sudah pas untuk sebuah desain.",
            "Isinya bisa dipakai brand mana pun, tidak ada yang khas {{brand}}.",
            "Tidak menyambung dengan rancangan konten yang sudah dibuat.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "tk3a",
          headline: "Hanya berisi ajakan membeli",
          fields: {
            judul: "DISKON 70%",
            pendukung: "BURUAN SEBELUM KEHABISAN",
            cta: "BELI SEKARANG",
          },
          points: [
            "Tidak berhubungan dengan rancangan konten maupun objective {{objectiveKonten}}.",
            "Seluruh teks memakai huruf kapital sehingga sulit dibaca cepat.",
            "Desain terlihat seperti poster diskon, bukan konten brand.",
          ],
        },
        {
          id: "tk3b",
          headline: "Teks berisi klaim yang tidak benar",
          fields: {
            judul: "Bikin Badan Cepat Kurus",
            pendukung: "Pakai sebulan, berat badan turun sendiri.",
            cta: "Pesan sekarang",
          },
          points: [
            "Pakaian olahraga tidak menurunkan berat badan, jadi klaimnya menyesatkan.",
            "Berisiko melanggar ketentuan iklan.",
            "Kepercayaan audiens rusak begitu klaimnya tidak terbukti.",
          ],
        },
        {
          id: "tk3c",
          headline: "Teks tidak berhubungan dengan gambarnya",
          fields: {
            judul: "Selamat Hari Rabu",
            pendukung: "Semangat terus ya semuanya.",
            cta: "Follow untuk konten lainnya",
          },
          points: [
            "Tidak menyampaikan apa pun tentang konten yang sudah dirancang.",
            "Slot unggah terpakai untuk desain tanpa tujuan.",
            "Tidak ada kaitan dengan pilar {{pilarKonten}} maupun objective.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 5. SAFE ZONE — penempatan agar tidak tertutup antarmuka platform    */
/* ================================================================== */

const safeZone: ChoiceGroup = {
  id: "safeZone",
  label: "Safe Zone",
  question: "Penanganan safe zone pada desain",
  hint: "Safe zone menjaga unsur penting tidak tertutup tombol dan keterangan platform.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "sz1a",
          headline: "Margin aman 10 persen di semua sisi",
          fields: { margin: "10" },
          points: [
            "Seluruh teks dan CTA dijaga berada di dalam 10 persen dari tiap tepi.",
            "Angka 10 persen cukup untuk menghindari tombol dan keterangan platform.",
            "Latar berwarna tetap boleh sampai tepi, yang dijaga hanya unsur pentingnya.",
            "Batasnya sama di semua sisi sehingga mudah diingat tim.",
          ],
        },
        {
          id: "sz1b",
          headline: "Margin bawah diperlebar untuk tombol platform",
          fields: { margin: "12" },
          points: [
            "Bagian bawah paling sering tertutup tombol suka, komentar, dan bagikan.",
            "Margin diperlebar sehingga CTA tetap terlihat utuh.",
            "Bagian atas dijaga bebas dari teks karena tertimpa nama akun.",
            "Cocok untuk format vertikal yang antarmukanya paling padat.",
          ],
        },
        {
          id: "sz1c",
          headline: "Unsur penting dipusatkan di tengah kanvas",
          fields: { margin: "14" },
          points: [
            "Bagian tengah adalah area yang paling aman dari potongan platform mana pun.",
            "Desain tetap utuh saat dibagikan ulang ke format berbeda.",
            "Margin lebar membuat desain terasa lega, sejalan dengan prinsip white space.",
            "Cocok bila konten akan dipakai ulang di beberapa platform.",
          ],
        },
        {
          id: "sz1d",
          headline: "Margin 10 persen, dengan pemeriksaan pratinjau",
          fields: { margin: "10" },
          points: [
            "Margin dijaga 10 persen di semua sisi.",
            "Desain diperiksa ulang lewat pratinjau sebelum diunggah.",
            "Bagian yang keluar batas digeser, bukan diperkecil, supaya tetap terbaca.",
            "Pemeriksaan dilakukan sebelum berkas diekspor.",
          ],
        },
        {
          id: "sz1e",
          headline: "Margin mengikuti ukuran huruf terbesar",
          fields: { margin: "11" },
          points: [
            "Margin ditetapkan setara satu setengah kali tinggi huruf judul.",
            "Ukurannya ikut menyesuaikan bila judul diperbesar.",
            "Menjaga judul tidak pernah menempel ke tepi kanvas.",
            "Aturannya mudah diterapkan ulang pada konten berikutnya.",
          ],
        },
        {
          id: "sz1f",
          headline: "Margin lebar untuk konten yang dibagikan ulang",
          fields: { margin: "15" },
          points: [
            "Margin dibuat lebih lebar karena konten akan sering dibagikan ke Story.",
            "Saat dibagikan ulang, tepi desain biasanya tertimpa stiker dan keterangan.",
            "Bagian tengah tetap lapang sehingga pesannya utuh.",
            "Sedikit mengurangi ruang gambar, tetapi menjamin teks selalu terbaca.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "sz2a",
          headline: "Margin tipis 4 persen",
          fields: { margin: "4" },
          points: [
            "Sudah ada batas aman yang ditetapkan.",
            "Empat persen terlalu tipis, teks masih berisiko tertutup tombol platform.",
            "Bagian bawah paling rawan karena antarmukanya paling padat di sana.",
          ],
        },
        {
          id: "sz2b",
          headline: "Hanya sisi kiri dan kanan yang dijaga",
          fields: { margin: "8" },
          points: [
            "Sisi kiri dan kanan sudah aman dari potongan.",
            "Bagian atas dan bawah justru yang paling sering tertutup antarmuka.",
            "CTA di bawah tetap berisiko tidak terlihat.",
          ],
        },
        {
          id: "sz2c",
          headline: "Margin lebar tetapi CTA tetap di luar",
          fields: { margin: "12" },
          points: [
            "Margin utamanya sudah cukup lebar.",
            "CTA sengaja ditaruh di luar batas agar terlihat mencolok.",
            "Justru unsur itulah yang paling perlu dijaga tetap terlihat.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "sz3a",
          headline: "Tanpa margin, teks sampai ke tepi",
          fields: { margin: "0" },
          points: [
            "Teks menempel ke tepi kanvas sehingga pasti tertutup antarmuka platform.",
            "Konsep safe zone pada materi tidak diterapkan sama sekali.",
            "Desain terlihat sesak bahkan sebelum diunggah.",
          ],
        },
        {
          id: "sz3b",
          headline: "Semua unsur ditumpuk di pojok",
          fields: { margin: "2" },
          points: [
            "Menumpuk unsur di satu pojok membuat sisa kanvas terbuang.",
            "Pojok adalah area yang paling sering tertimpa keterangan platform.",
            "Hierarki visual ikut hilang karena semua berdesakan.",
          ],
        },
        {
          id: "sz3c",
          headline: "Margin diabaikan demi memuat lebih banyak teks",
          fields: { margin: "1" },
          points: [
            "Batas aman dikorbankan agar teks yang panjang tetap muat.",
            "Sebaiknya teksnya yang dipendekkan, bukan marginnya yang dihapus.",
            "Prinsip white space dan safe zone sama-sama terlanggar.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 6. FINALISASI — pemeriksaan sebelum diekspor                       */
/* ================================================================== */

const finalisasi: ChoiceGroup = {
  id: "finalisasi",
  label: "Finalisasi",
  question: "Pemeriksaan akhir sebelum desain diekspor",
  hint: "Tahap finalisasi meminta pemeriksaan konsistensi desain, kejelasan pesan, dan relevansi dengan objective.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "fn1a",
          headline: "Tiga pemeriksaan: konsistensi, kejelasan, relevansi",
          fields: {
            isi: "Konsistensi diperiksa dengan menyandingkan desain ini bersama konten sebelumnya di grid; kejelasan diperiksa dengan melihat desain pada ukuran kecil; relevansi diperiksa dengan menanyakan apakah desain mendorong objective {{objectiveKonten}}.",
          },
          points: [
            "Konsistensi: warna dan font disandingkan dengan konten sebelumnya di grid.",
            "Kejelasan: desain dilihat pada ukuran kecil untuk memastikan judul tetap terbaca.",
            "Relevansi: diperiksa apakah desain mendorong objective yang dikejar.",
            "Ketiganya dilakukan sebelum berkas diekspor, bukan sesudah.",
          ],
        },
        {
          id: "fn1b",
          headline: "Diuji dengan melihatnya sekilas selama tiga detik",
          fields: {
            isi: "Desain ditunjukkan kepada satu orang lain selama tiga detik, lalu ia ditanya pesan apa yang ditangkap. Bila jawabannya meleset, hierarki visualnya diperbaiki sebelum diekspor.",
          },
          points: [
            "Menguji desain pada kondisi yang menyerupai cara audiens melihat beranda.",
            "Jawaban yang meleset menandakan hierarki visualnya belum bekerja.",
            "Perbaikan dilakukan pada susunan, bukan dengan menambah teks.",
            "Pengujian dilakukan orang lain, bukan pembuat desainnya sendiri.",
          ],
        },
        {
          id: "fn1c",
          headline: "Dicek terhadap delapan prinsip desain content marketing",
          fields: {
            isi: "Desain diperiksa satu per satu terhadap delapan prinsip: konsistensi brand, satu post satu pesan, hierarki visual, white space, warna strategis, teks mudah dibaca, gambar berkualitas, dan CTA yang jelas.",
          },
          points: [
            "Kedelapan prinsip dijadikan daftar periksa, bukan sekadar diingat.",
            "Prinsip yang belum terpenuhi diperbaiki sebelum diekspor.",
            "Daftar yang sama dipakai ulang untuk konten berikutnya.",
            "Hasilnya bisa dibandingkan antarkonten.",
          ],
        },
        {
          id: "fn1d",
          headline: "Diperiksa pada ukuran tayang sebenarnya",
          fields: {
            isi: "Desain dilihat langsung di layar ponsel pada ukuran tayang sebenarnya, bukan diperbesar di layar komputer, untuk memastikan huruf terkecil masih terbaca dan tidak ada unsur yang tertutup antarmuka.",
          },
          points: [
            "Diperiksa pada perangkat dan ukuran yang benar-benar dipakai audiens.",
            "Huruf yang terbaca di layar besar sering tidak terbaca di ponsel.",
            "Sekaligus memastikan safe zone bekerja seperti yang direncanakan.",
            "Perbaikan dilakukan sebelum berkas final diekspor.",
          ],
        },
        {
          id: "fn1e",
          headline: "Disandingkan dengan rancangan konten TPM 3",
          fields: {
            isi: "Desain disandingkan dengan rancangan konten yang sudah dibuat: apakah hook-nya muncul, apakah pesan utamanya sama, dan apakah formatnya sesuai tipe visual yang direncanakan.",
          },
          points: [
            "Memastikan desain benar-benar menerjemahkan rancangan, bukan membuat yang baru.",
            "Hook yang sudah dirancang harus terlihat di desainnya.",
            "Format diperiksa terhadap tipe visual {{tipeKonten}}.",
            "Menjaga seluruh rangkaian tugas tetap menyambung.",
          ],
        },
        {
          id: "fn1f",
          headline: "Diperiksa berpasangan sebelum diekspor",
          fields: {
            isi: "Desain diperiksa satu anggota tim lain sebelum diekspor. Pemeriksa menandai bagian yang belum jelas atau keluar safe zone, lalu diperbaiki dan diperiksa ulang sekali lagi.",
          },
          points: [
            "Pemeriksaan dilakukan orang lain sehingga kesalahan lebih mudah tertangkap.",
            "Bagian yang bermasalah ditandai, bukan sekadar dikomentari.",
            "Ada pemeriksaan ulang setelah perbaikan.",
            "Baru setelah itu berkas diekspor sebagai PNG.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "fn2a",
          headline: "Hanya memeriksa tampilannya bagus atau tidak",
          fields: { isi: "Desain dilihat sekali lagi untuk memastikan tampilannya sudah bagus dan rapi." },
          points: [
            "Pemeriksaan tampilan memang perlu dilakukan.",
            "Bagus atau tidak adalah selera, bukan ukuran yang bisa diperiksa.",
            "Kejelasan pesan dan relevansi objective belum ikut diperiksa.",
          ],
        },
        {
          id: "fn2b",
          headline: "Memeriksa warna saja",
          fields: { isi: "Warna desain dicocokkan dengan Brand Guideline sebelum diekspor." },
          points: [
            "Pemeriksaan konsistensi warna sudah tepat dan penting.",
            "Hierarki visual, safe zone, dan CTA belum ikut diperiksa.",
            "Desain bisa saja konsisten warnanya tetapi pesannya tetap tidak terbaca.",
          ],
        },
        {
          id: "fn2c",
          headline: "Diperiksa setelah diunggah",
          fields: { isi: "Desain diunggah lebih dulu, lalu diperiksa dari tampilan akunnya." },
          points: [
            "Melihat hasil di tampilan akun memang cara yang paling nyata.",
            "Pemeriksaan setelah unggah berarti kesalahan sudah telanjur dilihat audiens.",
            "Tahap finalisasi seharusnya sebelum berkas diekspor dan diunggah.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "fn3a",
          headline: "Langsung ekspor tanpa diperiksa",
          fields: { isi: "Desain langsung diekspor supaya jadwal unggah tidak meleset." },
          points: [
            "Tahap finalisasi pada instruksi dilewati sepenuhnya.",
            "Kesalahan kecil seperti teks terpotong baru ketahuan setelah tayang.",
            "Menjaga jadwal tidak sepadan dengan menurunkan mutu konten.",
          ],
        },
        {
          id: "fn3b",
          headline: "Diukur dari jumlah suka setelah tayang",
          fields: { isi: "Kalau nanti banyak yang suka berarti desainnya sudah benar." },
          points: [
            "Jumlah suka dipengaruhi banyak hal di luar desain.",
            "Pemeriksaan baru dilakukan setelah tidak bisa diperbaiki lagi.",
            "Tidak menghasilkan pelajaran untuk konten berikutnya.",
          ],
        },
        {
          id: "fn3c",
          headline: "Mengubah rancangan supaya cocok dengan desainnya",
          fields: {
            isi: "Kalau desainnya tidak sesuai rancangan, rancangannya saja yang diubah mengikuti desain.",
          },
          points: [
            "Membalik urutan: desain seharusnya menerjemahkan rancangan, bukan sebaliknya.",
            "Seluruh perencanaan pada tugas sebelumnya jadi tidak berguna.",
            "Objective yang sudah ditetapkan ikut bergeser tanpa alasan.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */

export const tpm4Groups: ChoiceGroup[] = [format, tataLetak, warna, teks, safeZone, finalisasi];

export const bankTpm4 = { format, tataLetak, warna, teks, safeZone, finalisasi };
