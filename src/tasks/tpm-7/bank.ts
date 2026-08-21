import type { ChoiceGroup } from "../types";

/**
 * BANK JAWABAN TPM 7 — Menentukan Budgeting Iklan di Meta Ads.
 *
 * Studi kasusnya berdiri sendiri: brand "HealthyBite" dengan budget
 * Rp10.000.000 untuk 14 hari, bukan lanjutan dari tugas sebelumnya. Karena itu
 * bank ini tidak memakai token dari tugas lain.
 *
 * Angka pada jawaban dipakai langsung untuk menghitung tabel plotting 14 hari,
 * jadi persentasenya harus selalu berjumlah 100.
 *
 * Token: {{nama}}, {{brand}}, {{totalBudget}}, {{durasi}}.
 */

/* ================================================================== */
/* 1. ALOKASI BUDGET PER OBJECTIVE                                    */
/* ================================================================== */

const alokasi: ChoiceGroup = {
  id: "alokasi",
  label: "Alokasi Budget",
  question: "Pembagian persentase budget untuk Awareness, Consideration, dan Conversion",
  hint: "Satu kartu berisi ketiga persentasenya sekaligus supaya jumlahnya selalu 100%. Angka ini langsung dipakai menghitung tabel 14 hari.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "al1a",
          headline: "Awareness 40% · Consideration 30% · Conversion 30%",
          fields: { aw: "40", co: "30", cv: "30", pola: "berimbang menuju konversi" },
          points: [
            "Awareness paling besar karena {{brand}} belum dikenal dan funnel-nya masih kosong.",
            "Consideration cukup 30% karena audiens yang lolos dari tahap awareness sudah lebih sempit.",
            "Conversion 30% tetap disiapkan agar pembelian pertama benar-benar bisa terjadi.",
            "Pembagian ini menyisakan ruang untuk fase testing di hari-hari awal.",
          ],
        },
        {
          id: "al1b",
          headline: "Awareness 35% · Consideration 25% · Conversion 40%",
          fields: { aw: "35", co: "25", cv: "40", pola: "berat di konversi" },
          points: [
            "Conversion diberi porsi terbesar karena tujuan akhirnya pembelian pertama lewat website.",
            "Awareness 35% masih cukup untuk mengumpulkan audiens baru selama fase testing.",
            "Consideration ditekan karena retargeting biasanya lebih murah daripada menjangkau audiens dingin.",
            "Cocok bila website {{brand}} sudah siap menerima trafik dan proses belinya mudah.",
          ],
        },
        {
          id: "al1c",
          headline: "Awareness 45% · Consideration 25% · Conversion 30%",
          fields: { aw: "45", co: "25", cv: "30", pola: "berat di awareness" },
          points: [
            "Audiens {{brand}} masih dingin, jadi bagian atas funnel perlu diisi lebih dahulu.",
            "Interest yang dibidik cukup luas, sehingga menjangkau audiens baru butuh porsi besar.",
            "Consideration dan Conversion mengambil audiens hasil awareness, bukan audiens baru.",
            "Risikonya pembelian baru muncul di paruh kedua campaign, dan itu memang disengaja.",
          ],
        },
        {
          id: "al1d",
          headline: "Awareness 30% · Consideration 30% · Conversion 40%",
          fields: { aw: "30", co: "30", cv: "40", pola: "cepat menuju penjualan" },
          points: [
            "Durasi 14 hari cukup pendek, jadi budget digeser lebih cepat ke tahap pembelian.",
            "Awareness 30% dipakai habis pada fase testing untuk mencari kombinasi audiens terbaik.",
            "Consideration menjaga audiens tetap hangat sebelum ditawari pembelian.",
            "Conversion 40% memberi ruang menaikkan budget pada ad set yang terbukti menjual.",
          ],
        },
        {
          id: "al1e",
          headline: "Awareness 40% · Consideration 25% · Conversion 35%",
          fields: { aw: "40", co: "25", cv: "35", pola: "berimbang" },
          points: [
            "Awareness dan Conversion dijaga hampir seimbang karena keduanya sama-sama tujuan campaign.",
            "Consideration dibuat paling kecil karena perannya hanya menjembatani dua tahap lain.",
            "Pembagian ini mudah dijelaskan ke atasan: mengenalkan, mengingatkan, lalu menjual.",
            "Jumlahnya tetap 100% dari Rp10.000.000, tidak ada sisa yang menggantung.",
          ],
        },
        {
          id: "al1f",
          headline: "Awareness 35% · Consideration 30% · Conversion 35%",
          fields: { aw: "35", co: "30", cv: "35", pola: "hampir merata" },
          points: [
            "Ketiga objective dianggap sama penting karena campaign ini yang pertama untuk {{brand}}.",
            "Data dari ketiga tahap sama-sama dibutuhkan sebagai bahan campaign berikutnya.",
            "Consideration sedikit lebih kecil karena audiensnya paling sempit.",
            "Pembagian seperti ini aman ketika belum ada data historis sama sekali.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "al2a",
          headline: "Awareness 60% · Consideration 20% · Conversion 20%",
          fields: { aw: "60", co: "20", cv: "20", pola: "sangat berat di awareness" },
          points: [
            "Awareness sebesar ini memang membuat jangkauan {{brand}} naik cepat.",
            "Jangkauan besar tidak otomatis berubah menjadi pembelian dalam 14 hari.",
            "Conversion hanya kebagian Rp2.000.000, terlalu kecil untuk mengejar pembelian pertama.",
            "Lebih cocok untuk campaign perkenalan yang durasinya panjang, bukan campaign 14 hari.",
          ],
        },
        {
          id: "al2b",
          headline: "Awareness 25% · Consideration 25% · Conversion 50%",
          fields: { aw: "25", co: "25", cv: "50", pola: "sangat berat di konversi" },
          points: [
            "Porsi conversion besar masuk akal bila audiensnya sudah hangat.",
            "{{brand}} belum punya audiens hangat, jadi iklan konversi akan menyasar orang yang belum kenal.",
            "Biaya per pembelian biasanya melonjak ketika funnel bagian atas belum terisi.",
            "Strateginya benar untuk brand lama, tetapi belum pas untuk campaign pertama.",
          ],
        },
        {
          id: "al2c",
          headline: "Awareness 50% · Consideration 30% · Conversion 20%",
          fields: { aw: "50", co: "30", cv: "20", pola: "berat di dua tahap awal" },
          points: [
            "Dua tahap awal dibiayai kuat sehingga funnel terisi rapi.",
            "Conversion hanya 20%, padahal pembelian pertama adalah tujuan yang diminta.",
            "Audiens yang sudah dikumpulkan berisiko tidak sempat ditawari produk.",
            "Akan lebih pas bila sebagian budget awareness digeser ke conversion.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "al3a",
          headline: "Awareness 100% · Consideration 0% · Conversion 0%",
          fields: { aw: "100", co: "0", cv: "0", pola: "hanya awareness" },
          points: [
            "Seluruh budget dipakai menjangkau audiens sebanyak-banyaknya.",
            "Dua dari tiga tujuan campaign tidak dibiayai sama sekali.",
            "Tidak ada iklan yang mengarahkan audiens ke website maupun ke pembelian.",
            "Hasilnya tidak bisa diukur terhadap tujuan yang ditetapkan perusahaan.",
          ],
        },
        {
          id: "al3b",
          headline: "Awareness 0% · Consideration 0% · Conversion 100%",
          fields: { aw: "0", co: "0", cv: "100", pola: "hanya konversi" },
          points: [
            "Seluruh budget langsung diarahkan ke pembelian.",
            "Audiens {{brand}} masih dingin, sehingga iklan konversi menyasar orang yang belum mengenal produk.",
            "Tanpa tahap awareness, algoritma tidak punya bahan untuk mencari calon pembeli.",
            "Biaya per pembelian hampir pasti jauh lebih mahal daripada seharusnya.",
          ],
        },
        {
          id: "al3c",
          headline: "Awareness 34% · Consideration 33% · Conversion 33%",
          fields: { aw: "34", co: "33", cv: "33", pola: "dibagi rata tanpa pertimbangan" },
          points: [
            "Dibagi hampir rata supaya terlihat adil untuk ketiga objective.",
            "Keadilan antar-objective bukan pertimbangan dalam budgeting iklan.",
            "Pembagian ini tidak menjawab kondisi {{brand}} yang audiensnya masih dingin.",
            "Tidak ada alasan strategis yang bisa dijelaskan selain karena angkanya rapi.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 2. DAILY ATAU LIFETIME BUDGET                                      */
/* ================================================================== */

const tipeBudget: ChoiceGroup = {
  id: "tipeBudget",
  label: "Tipe Budget",
  question: "Menggunakan lifetime budget atau daily budget?",
  hint: "Pilihan ini menentukan bagaimana Meta membelanjakan Rp10.000.000 selama 14 hari.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "tb1a",
          headline: "Daily budget, supaya belanja harian terkendali",
          fields: {
            tipe: "Daily budget",
            alasan: "Belanja harian dikunci sehingga fase testing tidak menghabiskan budget di awal.",
          },
          points: [
            "Studi kasus meminta fase testing di awal lalu scaling, dan keduanya butuh angka harian yang berbeda.",
            "Daily budget membuat setiap kenaikan budget menjadi keputusan yang disengaja.",
            "Belanja per hari mudah dibandingkan dengan hasilnya pada hari yang sama.",
            "Bila satu ad set jelek, budget hariannya bisa dipangkas tanpa mengganggu ad set lain.",
          ],
        },
        {
          id: "tb1b",
          headline: "Daily budget, agar kenaikan saat scaling bisa bertahap",
          fields: {
            tipe: "Daily budget",
            alasan: "Kenaikan budget saat scaling dilakukan bertahap agar fase belajar iklan tidak terulang.",
          },
          points: [
            "Menaikkan budget terlalu drastis membuat iklan kembali ke fase belajar dan biayanya naik.",
            "Dengan daily budget, kenaikan bisa diatur sedikit demi sedikit tiap hari.",
            "Angka hariannya langsung terbaca pada tabel plotting, jadi mudah diperiksa.",
            "Cocok untuk campaign pendek yang perlu dipantau setiap hari.",
          ],
        },
        {
          id: "tb1d",
          headline: "Daily budget, supaya sisa budget selalu terhitung",
          fields: {
            tipe: "Daily budget",
            alasan: "Sisa budget bisa dihitung kapan saja karena angka hariannya tetap.",
          },
          points: [
            "Sisa budget cukup dihitung dari jumlah hari yang belum berjalan.",
            "Perhitungan yang mudah menutup risiko under budget di tengah campaign.",
            "Bila ada hari yang belanjanya meleset, selisihnya langsung kelihatan.",
            "Laporan ke atasan bisa disusun tanpa menunggu campaign selesai.",
          ],
        },
        {
          id: "tb1e",
          headline: "Daily budget, agar tiap ad set punya batas jelas",
          fields: {
            tipe: "Daily budget",
            alasan: "Setiap ad set mendapat batas belanja harian yang tidak saling mengambil.",
          },
          points: [
            "Batas harian per ad set mencegah satu ad set menghabiskan jatah ad set lain.",
            "Pada fase testing, batas yang sama membuat perbandingannya jujur.",
            "Ad set yang kalah bisa dihentikan tanpa mengubah rencana ad set lain.",
            "Cocok dipadukan dengan pengaturan budget di level ad set.",
          ],
        },
        {
          id: "tb1c",
          headline: "Daily budget, karena hasil dipantau harian",
          fields: {
            tipe: "Daily budget",
            alasan: "Campaign hanya berjalan 14 hari, sehingga keputusan harus diambil harian.",
          },
          points: [
            "Durasi 14 hari terlalu pendek untuk menunggu laporan mingguan.",
            "Belanja harian yang tetap membuat perbandingan antar hari menjadi setara.",
            "Perpindahan dari testing ke scaling bisa dilakukan tepat pada harinya.",
            "Sisa budget mudah dihitung kapan saja karena angkanya tetap.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "tb2a",
          headline: "Lifetime budget untuk seluruh 14 hari",
          fields: {
            tipe: "Lifetime budget",
            alasan: "Meta membagi sendiri Rp10.000.000 selama 14 hari menurut peluang harian.",
          },
          points: [
            "Lifetime budget menjamin total belanja berhenti tepat di Rp10.000.000.",
            "Meta boleh membelanjakan lebih banyak pada hari yang dianggap ramai.",
            "Akibatnya belanja fase testing bisa membengkak sebelum pemenangnya ketahuan.",
            "Pilihan ini lebih cocok bila strateginya tidak memisahkan testing dan scaling.",
          ],
        },
        {
          id: "tb2b",
          headline: "Lifetime budget dengan penjadwalan iklan",
          fields: {
            tipe: "Lifetime budget",
            alasan: "Lifetime budget dipakai bersama jadwal tayang pada jam tertentu.",
          },
          points: [
            "Penjadwalan per jam memang hanya tersedia pada lifetime budget.",
            "Jam tayang bukan masalah utama pada studi kasus ini.",
            "Kendali harian yang dibutuhkan fase testing justru hilang.",
            "Manfaatnya nyata, tetapi tidak menjawab kebutuhan yang diminta studi kasus.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "tb3a",
          headline: "Daily budget yang diubah manual setiap hari",
          fields: {
            tipe: "Daily budget diubah tiap hari",
            alasan: "Angka harian diganti setiap hari mengikuti hasil kemarin.",
          },
          points: [
            "Mengubah budget mengikuti hasil terbaru terasa paling responsif.",
            "Setiap perubahan besar mengembalikan iklan ke fase belajar.",
            "Data tiap hari jadi tidak bisa dibandingkan karena belanjanya berbeda-beda.",
            "Tabel plotting kehilangan gunanya karena rencananya diubah terus.",
          ],
        },
        {
          id: "tb3b",
          headline: "Mencampur lifetime dan daily di satu campaign",
          fields: {
            tipe: "Campuran lifetime dan daily",
            alasan: "Sebagian ad set memakai lifetime, sebagian lagi daily.",
          },
          points: [
            "Campuran terlihat fleksibel karena tiap ad set bisa diatur berbeda.",
            "Total belanja campaign menjadi sulit dihitung di muka.",
            "Perbandingan antar ad set tidak setara karena cara belanjanya berbeda.",
            "Risiko melewati Rp10.000.000 menjadi besar.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3. LEVEL BUDGET: CBO ATAU ABO                                      */
/* ================================================================== */

const levelBudget: ChoiceGroup = {
  id: "levelBudget",
  label: "Level Budget",
  question: "Budget diatur di level Campaign (CBO) atau Ad Set (ABO)?",
  hint: "CBO membiarkan Meta membagi budget antar ad set; ABO mengunci budget tiap ad set.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "lb1a",
          headline: "ABO saat testing, lalu CBO saat scaling",
          fields: {
            level: "ABO saat testing, CBO saat scaling",
            alasan: "Testing butuh porsi yang setara, scaling butuh pembagian otomatis.",
          },
          points: [
            "Pada fase testing tiap ad set diberi budget sama besar agar perbandingannya adil.",
            "Tanpa porsi yang setara, ad set yang kebagian sedikit budget terlihat jelek padahal belum teruji.",
            "Setelah pemenangnya ketahuan, CBO membiarkan Meta menambah belanja ke ad set terbaik.",
            "Urutan ini persis mengikuti catatan studi kasus: testing dahulu, baru scaling.",
          ],
        },
        {
          id: "lb1b",
          headline: "ABO saat testing, CBO setelah ada pemenang",
          fields: {
            level: "ABO lalu CBO",
            alasan: "Perpindahan dilakukan setelah ada ad set yang jelas paling murah hasilnya.",
          },
          points: [
            "Perpindahan tidak dilakukan pada hari tertentu, melainkan setelah datanya cukup.",
            "ABO memastikan tiap kombinasi audiens dan konten mendapat kesempatan yang sama.",
            "CBO menghemat waktu pengelolaan pada paruh kedua campaign.",
            "Keputusan pindah bisa dijelaskan dengan angka, bukan perasaan.",
          ],
        },
        {
          id: "lb1d",
          headline: "ABO untuk audiens dingin, CBO untuk audiens hangat",
          fields: {
            level: "ABO audiens dingin, CBO audiens hangat",
            alasan: "Audiens dingin diuji satu per satu, audiens hangat dibiarkan dibagi otomatis.",
          },
          points: [
            "Audiens dingin masih perlu dibandingkan satu per satu, jadi budgetnya dikunci.",
            "Audiens hangat jumlahnya sedikit sehingga pembagian otomatis lebih hemat waktu.",
            "Pemisahan ini mengikuti tahap funnel, bukan sekadar mengikuti hari.",
            "Keduanya berjalan bersamaan tanpa saling mengambil budget.",
          ],
        },
        {
          id: "lb1e",
          headline: "CBO setelah tiga ad set terbukti stabil",
          fields: {
            level: "ABO lalu CBO bersyarat",
            alasan: "Perpindahan ke CBO dilakukan setelah minimal tiga ad set keluar dari fase belajar.",
          },
          points: [
            "Syarat perpindahan ditulis di muka sehingga keputusannya tidak mendadak.",
            "CBO baru berguna ketika ada beberapa ad set yang layak dibandingkan.",
            "Sebelum syarat itu terpenuhi, budget tetap dikunci di tiap ad set.",
            "Cara ini menghindari CBO menumpuk belanja pada ad set yang kebetulan menang di awal.",
          ],
        },
        {
          id: "lb1c",
          headline: "ABO penuh, dengan penyesuaian manual saat scaling",
          fields: {
            level: "ABO dengan penyesuaian manual",
            alasan: "Budget tiap ad set tetap dikunci, kenaikan saat scaling dilakukan sendiri.",
          },
          points: [
            "Kendali penuh ada di tangan pengelola, cocok untuk budget yang tidak besar.",
            "Ad set yang kalah bisa dimatikan tanpa menunggu keputusan algoritma.",
            "Kenaikan budget dilakukan bertahap agar fase belajar tidak terulang.",
            "Menuntut pemeriksaan rutin, tetapi masih wajar untuk campaign 14 hari.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "lb2a",
          headline: "CBO sejak hari pertama",
          fields: {
            level: "CBO sejak awal",
            alasan: "Meta membagi budget ke ad set yang paling menjanjikan sejak awal.",
          },
          points: [
            "CBO memang menghemat waktu dan biasanya menekan biaya per hasil.",
            "Pada fase testing, Meta cenderung menumpuk budget di satu ad set lebih dahulu.",
            "Ad set lain hampir tidak kebagian belanja, sehingga hasil testing tidak lengkap.",
            "Pilihan ini lebih baik dipakai setelah kombinasi pemenangnya diketahui.",
          ],
        },
        {
          id: "lb2b",
          headline: "CBO dengan batas belanja minimum tiap ad set",
          fields: {
            level: "CBO dengan batas minimum",
            alasan: "Batas minimum dipasang agar tiap ad set tetap kebagian belanja.",
          },
          points: [
            "Batas minimum menutup kelemahan utama CBO pada fase testing.",
            "Pengaturannya cukup rumit untuk campaign sekecil ini.",
            "Meta tetap punya keleluasaan memindahkan sisa budget lebih cepat.",
            "Hasil testingnya lebih baik daripada CBO polos, tetapi masih di bawah ABO.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "lb3a",
          headline: "ABO sepanjang campaign tanpa pernah scaling",
          fields: {
            level: "ABO tanpa scaling",
            alasan: "Budget tiap ad set dikunci sama besar sampai hari ke-14.",
          },
          points: [
            "Semua ad set diperlakukan sama sehingga pengelolaannya sederhana.",
            "Ad set yang terbukti paling murah hasilnya tidak pernah dinaikkan.",
            "Budget tetap mengalir ke ad set yang sudah jelas kalah.",
            "Catatan studi kasus yang meminta scaling tidak dijalankan sama sekali.",
          ],
        },
        {
          id: "lb3b",
          headline: "Berganti-ganti CBO dan ABO setiap beberapa hari",
          fields: {
            level: "Berganti-ganti CBO dan ABO",
            alasan: "Level budget diubah mengikuti hasil terbaru.",
          },
          points: [
            "Mengganti level terasa seperti mencari pengaturan yang paling cocok.",
            "Setiap pergantian membuat iklan mengulang fase belajar.",
            "Data sebelum dan sesudah pergantian tidak bisa dibandingkan.",
            "Biaya per hasil justru naik karena iklan tidak pernah stabil.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 4. FASE TESTING                                                    */
/* ================================================================== */

const fase: ChoiceGroup = {
  id: "fase",
  label: "Fase Testing",
  question: "Berapa hari pertama dipakai sebagai fase testing?",
  hint: "Jumlah hari ini menentukan kolom “Testing atau Scaling” pada tabel plotting 14 hari.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "fs1a",
          headline: "4 hari testing, 10 hari scaling",
          fields: { hari: "4", ringkas: "Hari 1-4 testing, hari 5-14 scaling" },
          points: [
            "Empat hari cukup untuk mengumpulkan data awal tanpa menghabiskan terlalu banyak budget.",
            "Masih ada sepuluh hari untuk menaikkan belanja pada kombinasi yang menang.",
            "Berada di rentang 3-5 hari yang diminta catatan studi kasus.",
            "Angka genap memudahkan pembagian budget harian pada fase testing.",
          ],
        },
        {
          id: "fs1b",
          headline: "3 hari testing, 11 hari scaling",
          fields: { hari: "3", ringkas: "Hari 1-3 testing, hari 4-14 scaling" },
          points: [
            "Testing dipersingkat supaya fase scaling mendapat waktu paling panjang.",
            "Tiga hari adalah batas bawah yang disebut catatan studi kasus.",
            "Cocok bila jumlah kombinasi audiens dan konten yang diuji tidak banyak.",
            "Risikonya data yang terkumpul lebih tipis, jadi keputusannya harus hati-hati.",
          ],
        },
        {
          id: "fs1d",
          headline: "4 hari testing, dengan pemeriksaan di hari ke-2",
          fields: { hari: "4", ringkas: "Hari 1-4 testing, diperiksa di hari ke-2" },
          points: [
            "Pemeriksaan di tengah fase testing mencegah budget habis di kombinasi yang jelas gagal.",
            "Ad set yang biayanya sangat mahal bisa dihentikan lebih awal.",
            "Empat hari tetap dipertahankan agar datanya cukup untuk keputusan akhir.",
            "Masih di dalam rentang 3-5 hari yang diminta studi kasus.",
          ],
        },
        {
          id: "fs1e",
          headline: "3 hari testing, langsung disusul scaling bertahap",
          fields: { hari: "3", ringkas: "Hari 1-3 testing, scaling bertahap sejak hari ke-4" },
          points: [
            "Testing singkat dipilih karena jumlah kombinasi yang diuji sedikit.",
            "Scaling dimulai pelan supaya kesalahan penilaian masih bisa diperbaiki.",
            "Sebelas hari scaling memberi ruang menaikkan belanja beberapa kali.",
            "Sesuai batas bawah rentang testing pada studi kasus.",
          ],
        },
        {
          id: "fs1c",
          headline: "5 hari testing, 9 hari scaling",
          fields: { hari: "5", ringkas: "Hari 1-5 testing, hari 6-14 scaling" },
          points: [
            "Lima hari memberi data paling lengkap di antara rentang yang diminta.",
            "Cocok bila kombinasi audiens dan kontennya cukup banyak untuk diuji.",
            "Fase scaling masih sembilan hari, cukup untuk menaikkan belanja bertahap.",
            "Keputusan scaling diambil dengan keyakinan yang lebih tinggi.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "fs2a",
          headline: "7 hari testing, 7 hari scaling",
          fields: { hari: "7", ringkas: "Hari 1-7 testing, hari 8-14 scaling" },
          points: [
            "Data yang terkumpul sangat lengkap karena testing berjalan sepekan penuh.",
            "Setengah durasi campaign habis sebelum belanja diarahkan ke pemenangnya.",
            "Melewati rentang 3-5 hari yang diminta catatan studi kasus.",
            "Waktu untuk mengejar pembelian pertama tinggal separuh.",
          ],
        },
        {
          id: "fs2b",
          headline: "2 hari testing, 12 hari scaling",
          fields: { hari: "2", ringkas: "Hari 1-2 testing, hari 3-14 scaling" },
          points: [
            "Fase scaling menjadi sangat panjang, bagus untuk mengejar hasil.",
            "Dua hari biasanya belum cukup untuk keluar dari fase belajar iklan.",
            "Keputusan pemenang diambil dari data yang masih goyah.",
            "Kurang dari batas bawah 3 hari yang disebut studi kasus.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "fs3a",
          headline: "Tanpa fase testing, langsung scaling sejak hari pertama",
          fields: { hari: "0", ringkas: "Seluruh 14 hari dianggap scaling" },
          points: [
            "Seluruh budget langsung dipakai mengejar hasil sejak hari pertama.",
            "Tidak ada dasar data untuk menentukan kombinasi mana yang dinaikkan.",
            "Catatan studi kasus yang meminta fase testing tidak dijalankan.",
            "Bila tebakannya meleset, budget sudah terlanjur habis di kombinasi yang salah.",
          ],
        },
        {
          id: "fs3b",
          headline: "12 hari testing, 2 hari scaling",
          fields: { hari: "12", ringkas: "Hari 1-12 testing, hari 13-14 scaling" },
          points: [
            "Hampir seluruh campaign dipakai untuk mengumpulkan data.",
            "Kesimpulan baru didapat ketika campaign hampir selesai.",
            "Hanya tersisa dua hari untuk memanfaatkan kombinasi yang menang.",
            "Tujuan pembelian pertama praktis tidak sempat dikejar.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 5. POLA BUDGET HARIAN                                              */
/* ================================================================== */

const polaHarian: ChoiceGroup = {
  id: "polaHarian",
  label: "Pola Budget Harian",
  question: "Bagaimana bentuk belanja harian di dalam tiap tahap objective?",
  hint: "Pola ini yang menentukan naik-turunnya angka pada kolom Budget Harian.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "ph1a",
          headline: "Naik bertahap di dalam tiap tahap",
          fields: { pola: "naik", ringkas: "Belanja harian naik sedikit demi sedikit" },
          points: [
            "Hari-hari awal tiap tahap dipakai untuk memastikan iklannya berjalan wajar.",
            "Kenaikan kecil tiap hari menjaga iklan tidak kembali ke fase belajar.",
            "Belanja terbesar jatuh pada hari ketika datanya sudah paling meyakinkan.",
            "Bentuk ini paling sesuai dengan alur testing lalu scaling.",
          ],
        },
        {
          id: "ph1b",
          headline: "Dua tingkat: tenang dahulu, lalu dinaikkan",
          fields: { pola: "dua", ringkas: "Separuh awal lebih kecil, separuh akhir lebih besar" },
          points: [
            "Angka hariannya hanya punya dua tingkat, jadi mudah dijalankan dan diperiksa.",
            "Kenaikan dilakukan sekali saja pada titik yang sudah direncanakan.",
            "Belanja fase testing tetap kecil sehingga risikonya terjaga.",
            "Cocok untuk tim yang tidak bisa memantau iklan setiap hari.",
          ],
        },
        {
          id: "ph1d",
          headline: "Naik bertahap dengan kenaikan kecil tiap hari",
          fields: { pola: "naik", ringkas: "Kenaikan kecil dan tetap setiap hari" },
          points: [
            "Kenaikan yang kecil menjaga iklan tetap keluar dari fase belajar.",
            "Belanja hari terakhir tiap tahap kira-kira dua kali hari pertamanya.",
            "Perubahan yang halus membuat biaya per hasil lebih stabil.",
            "Angka hariannya tetap mudah dihitung karena kenaikannya seragam.",
          ],
        },
        {
          id: "ph1e",
          headline: "Dua tingkat, dengan tingkat kedua hampir dua kali lipat",
          fields: { pola: "dua", ringkas: "Dua tingkat belanja, naik sekali di tengah tahap" },
          points: [
            "Hanya ada satu titik kenaikan, jadi sebab akibatnya mudah dibaca.",
            "Tingkat pertama dipakai memastikan iklan berjalan wajar.",
            "Tingkat kedua dipakai setelah ad set terbukti stabil.",
            "Cocok bila iklan tidak bisa diperiksa setiap hari.",
          ],
        },
        {
          id: "ph1c",
          headline: "Rata saat testing, naik bertahap saat scaling",
          fields: { pola: "rata-naik", ringkas: "Testing rata, scaling menanjak" },
          points: [
            "Belanja rata saat testing membuat perbandingan antar hari menjadi setara.",
            "Setelah pemenangnya ketahuan, belanja dinaikkan bertahap.",
            "Bentuk ini memisahkan dengan tegas tugas kedua fase.",
            "Paling mudah dijelaskan ketika hasilnya dilaporkan.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "ph2a",
          headline: "Rata sepanjang 14 hari",
          fields: { pola: "rata", ringkas: "Angka harian sama besar setiap hari" },
          points: [
            "Belanja yang sama tiap hari membuat pembukuan sangat sederhana.",
            "Perbandingan antar hari menjadi setara sepanjang campaign.",
            "Fase scaling tidak mendapat tambahan belanja apa pun.",
            "Kombinasi yang menang diperlakukan sama dengan yang kalah.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "ph3a",
          headline: "Belanja besar di depan, lalu mengecil",
          fields: { pola: "depan", ringkas: "Hari-hari awal paling besar" },
          points: [
            "Belanja besar di awal membuat hasil cepat terlihat.",
            "Budget habis banyak justru ketika datanya belum ada.",
            "Fase scaling kebagian sisa yang kecil, padahal di situlah pemenangnya dinaikkan.",
            "Inilah pola over budget di awal yang disebut sebagai masalah pada tugas ini.",
          ],
        },
        {
          id: "ph3b",
          headline: "Hampir seluruh budget ditumpuk di hari-hari terakhir",
          fields: { pola: "belakang", ringkas: "Belanja menumpuk di ujung campaign" },
          points: [
            "Menahan budget di awal membuat sisa belanja terasa aman.",
            "Iklan tidak sempat keluar dari fase belajar sebelum campaign berakhir.",
            "Kenaikan mendadak di hari terakhir membuat biaya per hasil melonjak.",
            "Fase testing kehilangan gunanya karena belanjanya terlalu kecil untuk menghasilkan data.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 6. PERTIMBANGAN UTAMA                                              */
/* ================================================================== */

const pertimbangan: ChoiceGroup = {
  id: "pertimbangan",
  label: "Pertimbangan Utama",
  question: "Pertimbangan apa yang paling menentukan strategi budgeting ini?",
  hint: "Instruksi meminta alasan yang menyebut fokus objective, ukuran audiens, fase campaign, serta testing dan scaling.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pt1a",
          headline: "Ukuran audiens dan fase campaign",
          fields: {
            isi: "Audiens {{brand}} di Jakarta, Bandung, dan Surabaya cukup besar untuk fase awareness, tetapi menyempit di tahap consideration dan conversion. Karena itu belanja terbesar ditaruh pada tahap yang audiensnya paling luas, lalu diturunkan mengikuti penyempitan audiens di tiap tahap berikutnya.",
          },
          points: [
            "Menyebut ukuran audiens sebagai dasar pembagian, sesuai yang diminta instruksi.",
            "Menghubungkan penyempitan audiens dengan penurunan porsi budget.",
            "Menyebut kota yang ada pada studi kasus, bukan audiens karangan.",
            "Alasannya bisa diperiksa ulang lewat perkiraan jangkauan di Meta Ads Manager.",
          ],
        },
        {
          id: "pt1b",
          headline: "Durasi 14 hari dan kebutuhan data",
          fields: {
            isi: "Durasi 14 hari terlalu pendek untuk mengulang kesalahan, jadi hari-hari awal dipakai mengumpulkan data dengan belanja kecil. Setelah kombinasi audiens dan konten terbaik ketahuan, sisa budget dinaikkan pada kombinasi itu supaya waktu yang tersisa dipakai sebaik mungkin.",
          },
          points: [
            "Menjadikan durasi campaign sebagai batas yang nyata, bukan sekadar keterangan.",
            "Menjelaskan kenapa belanja awal sengaja dibuat kecil.",
            "Menyambungkan hasil testing dengan keputusan scaling.",
            "Sesuai dengan catatan studi kasus tentang fase testing dan optimasi.",
          ],
        },
        {
          id: "pt1c",
          headline: "Tujuan bisnis pembelian pertama",
          fields: {
            isi: "Tujuan akhir campaign ini adalah pembelian pertama lewat website, jadi tahap conversion harus benar-benar kebagian budget dan tidak boleh hanya menerima sisa. Tahap awareness dan consideration diperlakukan sebagai pemasok audiens untuk tahap terakhir, bukan sebagai tujuan tersendiri.",
          },
          points: [
            "Menempatkan tujuan bisnis sebagai penentu, sesuai permintaan instruksi.",
            "Menjelaskan peran dua tahap awal sebagai pemasok audiens.",
            "Menegaskan conversion tidak boleh hanya menerima sisa budget.",
            "Mudah diperiksa: cukup lihat apakah porsi conversion memang memadai.",
          ],
        },
        {
          id: "pt1d",
          headline: "Testing lebih dahulu, baru menaikkan belanja",
          fields: {
            isi: "Belanja hari-hari awal dijaga kecil karena pada saat itu belum ada satu pun data yang bisa dipercaya. Kenaikan belanja hanya dilakukan pada ad set yang biaya hasilnya paling murah selama fase testing, dan kenaikannya bertahap supaya iklan tidak kembali ke fase belajar.",
          },
          points: [
            "Menyebut testing dan scaling sebagai dua fase dengan aturan belanja berbeda.",
            "Memberi syarat yang jelas untuk menaikkan budget, yaitu biaya hasil paling murah.",
            "Menjelaskan alasan kenaikan dilakukan bertahap.",
            "Menutup kemungkinan budget naik hanya karena perasaan.",
          ],
        },
        {
          id: "pt1e",
          headline: "Menjaga campaign tidak kehabisan budget di tengah jalan",
          fields: {
            isi: "Masalah yang sering terjadi adalah budget habis di awal sehingga campaign berhenti sebelum waktunya. Karena itu belanja tiap hari dikunci lebih dahulu dalam tabel plotting, dan totalnya dipastikan tepat Rp10.000.000 untuk 14 hari, tidak lebih dan tidak kurang.",
          },
          points: [
            "Menjawab langsung masalah over budget dan under budget yang disebut instruksi.",
            "Menjadikan tabel plotting sebagai alat kendali, bukan sekadar lampiran.",
            "Menyebut total budget dan durasi apa adanya sesuai studi kasus.",
            "Mudah diperiksa karena jumlah kolom budget harian harus pas.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pt2a",
          headline: "Mengikuti kebiasaan campaign sebelumnya",
          fields: {
            isi: "Pembagian budget mengikuti pola campaign yang sudah pernah dijalankan sebelumnya karena hasilnya waktu itu dianggap cukup baik. Pola yang sudah terbukti dipakai lagi supaya tim tidak perlu menyusun perhitungan dari awal.",
          },
          points: [
            "Belajar dari campaign sebelumnya memang kebiasaan yang baik.",
            "Studi kasus ini campaign pertama {{brand}}, jadi belum ada pola sebelumnya.",
            "Alasannya tidak menyebut ukuran audiens maupun fase campaign.",
            "Perlu ditambah pertimbangan yang berasal dari data studi kasus ini sendiri.",
          ],
        },
        {
          id: "pt2b",
          headline: "Membagi sesuai jumlah tahap funnel",
          fields: {
            isi: "Karena funnel-nya terdiri dari tiga tahap, budget dibagi mengikuti jumlah tahap tersebut agar tidak ada tahap yang terlewat. Dengan begitu setiap tahap tetap berjalan sepanjang campaign.",
          },
          points: [
            "Memastikan tidak ada tahap funnel yang terlewat.",
            "Jumlah tahap bukan ukuran seberapa besar biaya yang dibutuhkan tiap tahap.",
            "Tidak menyebut ukuran audiens yang berbeda-beda di tiap tahap.",
            "Alasannya benar secara struktur, tetapi belum menjawab kondisi studi kasus.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pt3a",
          headline: "Karena angkanya mudah dibagi",
          fields: {
            isi: "Pembagian dipilih karena angkanya bulat dan mudah dihitung, sehingga laporan belanja harian gampang disusun. Angka yang rapi juga memudahkan saat menjelaskan ke tim.",
          },
          points: [
            "Angka yang rapi memang memudahkan pembukuan.",
            "Kemudahan menghitung bukan pertimbangan strategi budgeting.",
            "Tidak ada hubungannya dengan objective maupun audiens.",
            "Instruksi meminta alasan berdasarkan fokus objective, audiens, dan fase campaign.",
          ],
        },
        {
          id: "pt3b",
          headline: "Mengikuti anjuran umum di internet",
          fields: {
            isi: "Pembagian ini diambil dari anjuran yang banyak beredar di internet tentang cara membagi budget iklan. Anjuran tersebut dipakai apa adanya tanpa penyesuaian.",
          },
          points: [
            "Mencari rujukan sebelum memutuskan adalah langkah yang wajar.",
            "Anjuran umum tidak mengetahui budget, durasi, dan audiens studi kasus ini.",
            "Dipakai apa adanya berarti tidak ada penyesuaian sama sekali.",
            "Alasan seperti ini tidak bisa dipertanggungjawabkan ketika hasilnya ditanya.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 7. JUSTIFIKASI PLOTTING                                            */
/* ================================================================== */

const justifikasi: ChoiceGroup = {
  id: "justifikasi",
  label: "Justifikasi Plotting",
  question: "Alasan di balik bentuk plotting budget harian yang kamu susun",
  hint: "Bagian ini mengisi kolom “Alasan Pemilihan Strategi” pada template.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "js1a",
          headline: "Belanja mengikuti keyakinan terhadap data",
          fields: {
            isi: "Besar belanja tiap hari mengikuti seberapa yakin saya terhadap data yang sudah terkumpul. Selama fase testing keyakinannya masih rendah, jadi belanjanya kecil dan setara antar hari supaya hasilnya bisa dibandingkan. Setelah fase testing selesai, belanja dinaikkan bertahap pada tahap berikutnya karena keputusan sudah punya dasar.",
          },
          points: [
            "Memberi satu aturan yang berlaku untuk seluruh 14 hari.",
            "Menjelaskan kenapa belanja fase testing sengaja dibuat setara.",
            "Menghubungkan kenaikan belanja dengan bertambahnya data.",
            "Aturannya bisa dipakai lagi pada campaign berikutnya.",
          ],
        },
        {
          id: "js1b",
          headline: "Tiap tahap funnel diberi jatah hari sendiri",
          fields: {
            isi: "Jumlah hari untuk tiap tahap dihitung dari jatah budget tahap itu dibagi belanja hariannya, bukan disamakan begitu saja. Karena belanja harian naik sepanjang campaign, tahap yang jatahnya sama bisa memakan jumlah hari berbeda, dan justru begitulah belanja harian tidak melonjak tajam saat pindah tahap.",
          },
          points: [
            "Menjelaskan cara jumlah hari tiap tahap dihitung, bukan sekadar menyebut hasilnya.",
            "Menjaga belanja harian tidak melonjak saat pindah tahap.",
            "Memudahkan penilaian hasil karena tiap tahap punya rentang harinya sendiri.",
            "Sejalan dengan persentase yang sudah ditetapkan di strategi awal.",
          ],
        },
        {
          id: "js1c",
          headline: "Total dikunci lebih dahulu, baru dibagi ke hari",
          fields: {
            isi: "Perhitungan dimulai dari total Rp10.000.000 yang dibagi ke tiap objective menurut persentasenya, baru kemudian dipecah ke hari-hari di dalam tahap tersebut. Dengan urutan ini total belanja tidak mungkin melewati budget, dan sisa pembulatan diletakkan pada hari terakhir tiap tahap.",
          },
          points: [
            "Menjelaskan urutan perhitungan dari total menuju angka harian.",
            "Menutup risiko over budget sejak tahap perencanaan.",
            "Menyebut cara menangani sisa pembulatan secara terbuka.",
            "Angkanya bisa diperiksa ulang dengan menjumlahkan kolom budget harian.",
          ],
        },
        {
          id: "js1d",
          headline: "Hari-hari awal dijaga murah supaya kesalahan tidak mahal",
          fields: {
            isi: "Hari-hari pertama adalah saat kemungkinan salah paling besar, jadi belanjanya sengaja ditahan agar kesalahan tidak menjadi mahal. Belanja baru dinaikkan setelah ada bukti kombinasi mana yang paling murah biayanya, dan kenaikannya dibuat bertahap agar iklan tidak kembali ke fase belajar.",
          },
          points: [
            "Menyebut risiko kesalahan di awal sebagai alasan menahan belanja.",
            "Menetapkan bukti sebagai syarat menaikkan belanja.",
            "Menjelaskan kenapa kenaikannya bertahap, bukan sekaligus.",
            "Menjawab masalah over budget di awal yang disebut pada instruksi.",
          ],
        },
        {
          id: "js1e",
          headline: "Plotting disusun agar mudah diperiksa harian",
          fields: {
            isi: "Tabel plotting disusun supaya setiap hari bisa diperiksa terhadap rencananya: satu objective, satu angka belanja, dan satu keterangan fase. Bila belanja sebenarnya meleset dari rencana, selisihnya langsung terlihat pada hari itu juga dan bisa diperbaiki keesokan harinya.",
          },
          points: [
            "Menjadikan tabel plotting alat pemeriksaan harian, bukan sekadar lampiran.",
            "Menyebut tiga hal yang diperiksa tiap hari secara tegas.",
            "Memberi jalan keluar ketika belanja meleset dari rencana.",
            "Sesuai bentuk tabel yang diminta template.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "js2a",
          headline: "Dibagi rata supaya aman",
          fields: {
            isi: "Budget dibagi merata ke seluruh hari supaya campaign pasti berjalan sampai hari ke-14 dan tidak berhenti di tengah jalan. Dengan angka yang sama tiap hari, belanja juga lebih mudah dipantau.",
          },
          points: [
            "Benar bahwa pembagian rata menjamin campaign berjalan penuh.",
            "Pemantauan memang menjadi lebih sederhana.",
            "Hasil fase testing tidak dipakai untuk apa pun.",
            "Kombinasi yang menang tidak pernah mendapat tambahan belanja.",
          ],
        },
        {
          id: "js2b",
          headline: "Mengikuti hari ramai belanja online",
          fields: {
            isi: "Belanja dinaikkan pada akhir pekan dan tanggal muda karena pada waktu itu orang biasanya lebih banyak berbelanja. Hari lain diberi belanja lebih kecil agar total budgetnya tetap terjaga.",
          },
          points: [
            "Pola belanja audiens memang layak dipertimbangkan.",
            "Pertimbangan ini belum menjawab kebutuhan fase testing dan scaling.",
            "Studi kasus tidak menyebutkan data hari ramai untuk {{brand}}.",
            "Sebaiknya dipakai sebagai penyesuaian tambahan, bukan dasar utama.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "js3a",
          headline: "Menghabiskan budget secepatnya",
          fields: {
            isi: "Budget dipakai sebanyak mungkin di hari-hari awal supaya hasilnya cepat kelihatan dan laporan bisa segera dibuat. Bila budget habis lebih cepat, campaign dianggap sudah selesai.",
          },
          points: [
            "Hasil memang lebih cepat terlihat ketika belanja dibesarkan di awal.",
            "Campaign berhenti sebelum 14 hari, padahal durasinya sudah ditetapkan.",
            "Keputusan diambil sebelum ada data yang cukup.",
            "Ini persis masalah over budget di awal yang disebut pada instruksi.",
          ],
        },
        {
          id: "js3b",
          headline: "Menunggu sampai ada waktu mengurus iklannya",
          fields: {
            isi: "Belanja dibuat sangat kecil di awal karena iklannya belum sempat diurus, lalu sisa budget dihabiskan pada hari-hari terakhir setelah ada waktu. Yang penting seluruh budget terpakai sebelum campaign berakhir.",
          },
          points: [
            "Menghabiskan seluruh budget memang salah satu ukuran yang sering dipakai.",
            "Belanja diatur mengikuti kesibukan tim, bukan mengikuti data.",
            "Iklan tidak sempat keluar dari fase belajar sebelum campaign berakhir.",
            "Fase testing kehilangan gunanya karena belanjanya terlalu kecil.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 8. STRUKTUR AD SET SAAT TESTING                                    */
/* ================================================================== */

const struktur: ChoiceGroup = {
  id: "struktur",
  label: "Struktur Ad Set",
  question: "Bagaimana ad set fase testing dibagi, dan atas dasar apa?",
  hint: "Instruksi meminta pertimbangan ukuran audiens. Jumlah ad set menentukan seberapa besar budget yang diterima masing-masing.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "st1a",
          headline: "3 ad set dibedakan berdasarkan interest",
          fields: {
            isi: "Fase testing memakai tiga ad set yang dibedakan menurut interest: healthy lifestyle, gym dan diet, serta meal prep dan snack sehat. Ketiganya mendapat budget harian sama besar agar perbandingan biaya per hasilnya jujur.",
          },
          points: [
            "Interest yang diuji diambil apa adanya dari studi kasus, bukan karangan.",
            "Tiga ad set masih memberi tiap ad set budget yang cukup untuk keluar dari fase belajar.",
            "Budget yang sama besar membuat perbandingannya setara.",
            "Hasilnya langsung bisa dipakai memilih interest mana yang dinaikkan saat scaling.",
          ],
        },
        {
          id: "st1b",
          headline: "3 ad set dibedakan berdasarkan kota",
          fields: {
            isi: "Fase testing memakai tiga ad set yang masing-masing menyasar satu kota: Jakarta, Bandung, dan Surabaya. Pembagian ini memperlihatkan kota mana yang biaya hasilnya paling murah sebelum budget dinaikkan.",
          },
          points: [
            "Ketiga kota sudah disebut pada studi kasus sebagai target lokasi.",
            "Biaya iklan antar kota bisa berbeda jauh, jadi layak diuji terpisah.",
            "Tiga ad set menjaga budget harian tiap ad set tetap memadai.",
            "Kota yang kalah bisa dihentikan tanpa mengubah ad set lain.",
          ],
        },
        {
          id: "st1c",
          headline: "2 ad set dibedakan berdasarkan rentang usia",
          fields: {
            isi: "Fase testing memakai dua ad set: usia 18-25 tahun dan 26-35 tahun. Dua kelompok ini biasanya berbeda cara belanjanya, dan jumlah ad set yang sedikit membuat budget harian tiap ad set tetap besar.",
          },
          points: [
            "Rentang usianya memecah target 18-35 tahun pada studi kasus menjadi dua kelompok wajar.",
            "Hanya dua ad set, sehingga tiap ad set cepat keluar dari fase belajar.",
            "Cocok ketika budget hariannya tidak besar.",
            "Perbedaan cara belanja antar usia langsung terlihat dari hasilnya.",
          ],
        },
        {
          id: "st1d",
          headline: "4 ad set: tiga interest dan satu audiens luas",
          fields: {
            isi: "Fase testing memakai empat ad set: tiga berdasarkan interest dari studi kasus, ditambah satu ad set audiens luas tanpa interest sebagai pembanding. Ad set pembanding dipakai untuk mengetahui apakah penyempitan interest benar-benar membantu.",
          },
          points: [
            "Ad set audiens luas berfungsi sebagai pembanding, bukan sekadar tambahan.",
            "Kadang audiens luas justru lebih murah karena algoritma bebas mencari.",
            "Empat ad set masih wajar untuk budget fase testing pada campaign ini.",
            "Hasilnya menjawab pertanyaan apakah interest perlu dipakai sama sekali.",
          ],
        },
        {
          id: "st1e",
          headline: "3 ad set dengan konten berbeda, audiens sama",
          fields: {
            isi: "Fase testing menahan audiensnya tetap sama dan justru membedakan kontennya menjadi tiga: foto produk, video singkat, dan ulasan pemakai. Dengan begitu yang diuji benar-benar kontennya, bukan audiensnya.",
          },
          points: [
            "Hanya satu hal yang diubah, sehingga sebab perbedaan hasilnya jelas.",
            "Studi kasus meminta kombinasi audiens dan konten terbaik, dan ini menguji sisi kontennya.",
            "Konten pemenang bisa dipakai ulang pada tahap consideration dan conversion.",
            "Audiens yang sama membuat biaya per tayang antar ad set sebanding.",
          ],
        },
        {
          id: "st1f",
          headline: "2 ad set interest, masing-masing 2 konten",
          fields: {
            isi: "Fase testing memakai dua ad set berdasarkan interest, dan di dalam tiap ad set dipasang dua konten berbeda. Susunan ini menguji audiens dan konten sekaligus tanpa memecah budget ke terlalu banyak ad set.",
          },
          points: [
            "Menguji dua hal sekaligus, persis yang diminta catatan studi kasus.",
            "Jumlah ad set tetap dua sehingga budget hariannya tidak terlalu terpecah.",
            "Perbandingan konten terjadi di dalam ad set, bukan antar ad set.",
            "Kombinasi pemenangnya bisa langsung dipakai pada fase scaling.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "st2a",
          headline: "8 ad set untuk menguji sebanyak mungkin kombinasi",
          fields: {
            isi: "Fase testing memakai delapan ad set supaya semua kombinasi interest, kota, dan usia bisa diuji sekaligus. Semakin banyak kombinasi yang diuji, semakin lengkap datanya.",
          },
          points: [
            "Datanya memang paling lengkap bila semua kombinasi diuji.",
            "Budget fase testing terbagi ke delapan ad set sehingga tiap ad set kebagian sedikit.",
            "Ad set dengan belanja terlalu kecil sulit keluar dari fase belajar.",
            "Hasil dari data yang tipis mudah menyesatkan.",
          ],
        },
        {
          id: "st2b",
          headline: "1 ad set berisi semua audiens sekaligus",
          fields: {
            isi: "Fase testing memakai satu ad set yang menggabungkan seluruh interest, kota, dan rentang usia. Dengan satu ad set, seluruh budget harian terkumpul di satu tempat sehingga cepat keluar dari fase belajar.",
          },
          points: [
            "Benar bahwa satu ad set paling cepat keluar dari fase belajar.",
            "Tidak ada yang bisa dibandingkan karena hanya ada satu kelompok.",
            "Kombinasi audiens terbaik tetap tidak diketahui setelah testing selesai.",
            "Fase testing berjalan, tetapi tidak menghasilkan keputusan.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "st3a",
          headline: "Ad set dibuat mengikuti jumlah konten yang tersedia",
          fields: {
            isi: "Jumlah ad set ditentukan dari banyaknya konten yang sudah jadi, jadi berapa pun konten yang tersedia akan dibuatkan ad set sendiri. Dengan begitu tidak ada konten yang menganggur.",
          },
          points: [
            "Semua konten memang terpakai dengan cara ini.",
            "Jumlah ad set jadi ditentukan stok konten, bukan pertimbangan audiens.",
            "Budget harian tiap ad set berubah-ubah tanpa alasan yang bisa dijelaskan.",
            "Ukuran audiens sama sekali tidak dipertimbangkan.",
          ],
        },
        {
          id: "st3b",
          headline: "Ad set ditambah setiap hari selama testing",
          fields: {
            isi: "Ad set baru ditambahkan setiap hari selama fase testing agar semakin banyak pilihan yang bisa dibandingkan. Ad set lama tetap dibiarkan berjalan.",
          },
          points: [
            "Pilihan yang dibandingkan memang bertambah tiap hari.",
            "Ad set yang usianya berbeda tidak bisa dibandingkan secara adil.",
            "Budget harian terpecah semakin kecil setiap harinya.",
            "Fase testing berakhir tanpa satu pun ad set yang datanya matang.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 9. INDIKATOR KEPUTUSAN SCALING                                     */
/* ================================================================== */

const indikator: ChoiceGroup = {
  id: "indikator",
  label: "Indikator Scaling",
  question: "Indikator apa yang dipakai memutuskan ad set mana yang dinaikkan budgetnya?",
  hint: "Studi kasus meminta budget dioptimasi ke performa terbaik. Bagian ini menetapkan ukuran “terbaik” itu.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "in1a",
          headline: "Biaya per hasil sesuai objective tiap tahap",
          fields: {
            isi: "Ad set dinilai memakai biaya per hasil yang sesuai objective tahapnya: biaya per seribu tayang untuk awareness, biaya per klik ke website untuk consideration, dan biaya per pembelian untuk conversion. Ad set dengan biaya paling murah pada tahapnya yang dinaikkan budgetnya.",
          },
          points: [
            "Setiap tahap dinilai dengan ukuran yang memang menjadi tujuannya.",
            "Menghindari kesalahan menilai iklan awareness dengan ukuran penjualan.",
            "Ukurannya berupa biaya, jadi langsung terhubung dengan keputusan budget.",
            "Ketiga ukuran ini tersedia langsung di Meta Ads Manager.",
          ],
        },
        {
          id: "in1b",
          headline: "Biaya per pembelian sebagai penentu akhir",
          fields: {
            isi: "Semua tahap tetap dipantau, tetapi keputusan menaikkan budget ditentukan oleh biaya per pembelian karena itulah tujuan akhir campaign. Ad set yang tayangannya murah tetapi tidak menghasilkan pembelian tidak dinaikkan.",
          },
          points: [
            "Menempatkan tujuan bisnis sebagai penentu akhir keputusan.",
            "Menutup kemungkinan budget naik hanya karena tayangannya murah.",
            "Tetap memantau tahap lain sebagai bahan pertimbangan.",
            "Cocok untuk campaign yang tujuan akhirnya pembelian pertama.",
          ],
        },
        {
          id: "in1c",
          headline: "Biaya per klik dan rasio klik dibaca bersamaan",
          fields: {
            isi: "Keputusan diambil dengan membaca biaya per klik bersama rasio kliknya, supaya ad set yang murah karena tayangannya tidak relevan bisa dikenali. Ad set yang biayanya murah sekaligus rasio kliknya tinggi yang dinaikkan.",
          },
          points: [
            "Dua ukuran dibaca bersamaan sehingga saling menutup kelemahan.",
            "Rasio klik menandakan iklannya benar-benar relevan bagi audiens.",
            "Menghindari salah pilih ad set yang murah tetapi tidak diminati.",
            "Keduanya sudah tersedia sejak hari pertama campaign.",
          ],
        },
        {
          id: "in1d",
          headline: "Ambang batas ditetapkan sebelum campaign berjalan",
          fields: {
            isi: "Sebelum campaign dimulai, ditetapkan angka batas untuk biaya per hasil tiap tahap. Ad set yang biayanya di bawah batas dinaikkan budgetnya, dan yang di atas batas dihentikan, sehingga keputusannya tidak bergantung pada perasaan saat melihat laporan.",
          },
          points: [
            "Batasnya ditulis di muka sehingga keputusan tidak berubah-ubah.",
            "Ad set yang dihentikan punya alasan yang bisa ditunjukkan.",
            "Memudahkan orang lain melanjutkan pengelolaan campaign.",
            "Batas ini juga bisa dipakai menilai campaign berikutnya.",
          ],
        },
        {
          id: "in1e",
          headline: "Jumlah hasil minimum sebelum ad set dinilai",
          fields: {
            isi: "Ad set baru boleh dinilai setelah mengumpulkan sejumlah hasil minimum, misalnya lima puluh klik atau lima pembelian. Sebelum jumlah itu tercapai, biaya per hasilnya dianggap belum bisa dipercaya dan budgetnya tidak diubah.",
          },
          points: [
            "Menghindari keputusan yang diambil dari data terlalu sedikit.",
            "Jumlah minimumnya ditetapkan di muka sehingga bisa diperiksa.",
            "Menjelaskan mengapa fase testing perlu beberapa hari.",
            "Mencegah ad set bagus dimatikan hanya karena hasil hari pertama jelek.",
          ],
        },
        {
          id: "in1f",
          headline: "Biaya per hasil dibandingkan dengan rata-rata campaign",
          fields: {
            isi: "Tiap ad set dibandingkan dengan biaya rata-rata seluruh campaign pada tahap yang sama. Ad set yang biayanya di bawah rata-rata dinaikkan, sedangkan yang jauh di atas rata-rata dihentikan lebih awal.",
          },
          points: [
            "Pembandingnya berasal dari campaign itu sendiri, bukan angka dari luar.",
            "Berguna ketika belum ada data historis untuk menetapkan batas.",
            "Batasnya ikut menyesuaikan bila biaya iklan sedang naik.",
            "Perhitungannya sederhana dan bisa diulang setiap hari.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "in2a",
          headline: "Jumlah tayangan dan jangkauan",
          fields: {
            isi: "Ad set dengan jumlah tayangan dan jangkauan paling besar yang dinaikkan budgetnya, karena berarti iklannya paling banyak dilihat orang. Semakin banyak yang melihat, semakin besar peluang terjadi pembelian.",
          },
          points: [
            "Tayangan dan jangkauan memang ukuran yang sah untuk tahap awareness.",
            "Keduanya tidak menunjukkan apakah audiens tertarik atau membeli.",
            "Ad set yang murah tayangannya belum tentu menghasilkan pembelian.",
            "Perlu dipadukan dengan ukuran biaya per hasil pada tahap berikutnya.",
          ],
        },
        {
          id: "in2b",
          headline: "Jumlah suka dan komentar pada iklannya",
          fields: {
            isi: "Ad set yang paling banyak mendapat suka dan komentar dianggap paling disukai audiens, sehingga budgetnya yang dinaikkan. Tanggapan audiens dipakai sebagai tanda kontennya cocok.",
          },
          points: [
            "Tanggapan audiens memang tanda kontennya menarik perhatian.",
            "Suka dan komentar tidak selalu berujung pada kunjungan website.",
            "Iklan bisa ramai dibicarakan tanpa menghasilkan satu pun pembelian.",
            "Lebih tepat dipakai sebagai bahan memilih konten, bukan menaikkan budget.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "in3a",
          headline: "Ad set yang hasilnya terlihat paling bagus hari itu",
          fields: {
            isi: "Setiap pagi laporan dibuka, lalu ad set yang angkanya terlihat paling bagus hari itu dinaikkan budgetnya. Keputusan diambil cepat supaya tidak kehilangan peluang.",
          },
          points: [
            "Keputusan cepat terasa lebih tanggap terhadap perubahan.",
            "Hasil satu hari sangat mudah berubah dan tidak bisa dijadikan dasar.",
            "Ad set yang kemarin dinaikkan bisa diturunkan lagi keesokan harinya.",
            "Iklan tidak pernah stabil karena budgetnya berubah terus.",
          ],
        },
        {
          id: "in3b",
          headline: "Ad set yang kontennya paling disukai tim",
          fields: {
            isi: "Ad set yang kontennya paling disukai tim internal yang dinaikkan budgetnya, karena tim paling paham brand-nya sendiri. Selera tim dianggap mewakili selera audiens.",
          },
          points: [
            "Tim memang paling paham pesan yang ingin disampaikan brand.",
            "Selera tim belum tentu sama dengan selera audiens 18-35 tahun.",
            "Data hasil fase testing tidak dipakai sama sekali.",
            "Keputusan seperti ini tidak bisa dijelaskan dengan angka.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */

export const tpm7Groups: ChoiceGroup[] = [
  alokasi,
  tipeBudget,
  levelBudget,
  struktur,
  fase,
  polaHarian,
  indikator,
  pertimbangan,
  justifikasi,
];

export const bankTpm7 = {
  alokasi,
  tipeBudget,
  levelBudget,
  struktur,
  fase,
  polaHarian,
  indikator,
  pertimbangan,
  justifikasi,
};
