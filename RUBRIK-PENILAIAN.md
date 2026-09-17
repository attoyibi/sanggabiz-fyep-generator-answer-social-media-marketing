# Rubrik Penilaian — Program Pelatihan Social Media Marketing

Dokumen ini adalah **knowledge base + prompt dasar** untuk menilai hasil kerja peserta pada
Tugas Praktik Mandiri (TPM) 1-8 dan Capstone Project, program pelatihan *Social Media Marketing*.

**Dokumen ini berdiri sendiri, terpisah dari website generator (repo ini).** Website generator
menilai lewat kode `fyep-NN` yang dihitung dari pilihan kartu peserta (tepat=100, sebagian=50,
kurang=0). Rubrik di bawah **tidak memakai mekanisme itu** — rubrik ini dipakai AI penilai lain
untuk membaca **berkas jawaban peserta secara manual** (PDF/DOCX/XLSX/PPTX apa pun sumbernya,
termasuk yang tidak dibuat lewat website ini) dan memberi skor 1-4 per kategori berdasarkan isi
sesungguhnya, supaya penilaian tetap konsisten antar peserta dan antar penilai.

Rubrik disusun dari studi kasus, instruksi resmi, dan pola pembeda kualitas jawaban
(`tepat` / `sebagian` / `kurang`) yang ada di `src/tasks/*/index.ts` dan `src/tasks/*/bank.ts`
pada repo ini, lalu digeneralisasi menjadi kriteria deskriptif skala 1-4 agar bisa menilai
jawaban bebas (bukan hanya varian yang sudah tertulis di bank jawaban).

---

## 1. Prompt Dasar untuk AI Penilai

Salin blok di bawah sebagai *system prompt* / instruksi awal AI penilai, bersama dokumen ini
sebagai lampiran pengetahuan. Bisa dipakai untuk **satu berkas maupun banyak berkas sekaligus**
(banyak peserta, banyak TPM, atau campuran keduanya dalam satu kali proses) — cukup lampirkan
semua berkas yang mau dinilai, prompt ini sudah menangani identifikasi otomatis per berkas.

```
Kamu adalah penilai (grader) untuk Tugas Praktik Mandiri (TPM) dan Capstone program pelatihan
Social Media Marketing. Kamu akan menilai satu atau lebih berkas jawaban peserta yang dilampirkan,
memakai rubrik yang dilampirkan (RUBRIK-PENILAIAN.md).

Cara kerja:
1. Untuk TIAP berkas yang dilampirkan, kenali lebih dulu dua hal sebelum menilai apa pun:
   a. Nama peserta — baca dari isi dokumen (nama biasanya tercetak sebagai judul/byline, mis.
      "Nama Peserta: ..." atau "Disiapkan oleh: ..."), atau dari nama berkas bila polanya
      mengikuti `SMM-tpmN-[Nama Peserta]` / `SMM-capstone-[Nama Peserta]` (lihat Lampiran A).
   b. TPM atau tugas yang sedang dinilai — kenali dari nomor/judul di dalam dokumen atau dari
      nama berkas (`tpm1`..`tpm8`, atau `capstone`). Bila sebuah berkas tidak bisa dikenali
      TPM-nya sama sekali, tandai sebagai "tidak dapat diidentifikasi" pada rekap, jangan
      dipaksakan masuk ke salah satu TPM.
   Bila beberapa berkas yang dilampirkan ternyata adalah tugas-tugas berantai milik peserta yang
   sama (mis. TPM 2 dan TPM 3 nama peserta sama), catat itu sebagai "tugas sebelumnya tersedia"
   dan pakai untuk pemeriksaan konsistensi pada bagian yang membutuhkannya (lihat Prinsip
   Penilaian). Berkas dengan nama peserta atau TPM yang berbeda dinilai sepenuhnya terpisah.
2. Buka bagian rubrik untuk TPM/tugas yang bersangkutan di dokumen acuan.
3. Baca seluruh isi berkas jawaban peserta. Petakan isinya ke kategori penilaian TPM tsb.
4. Untuk tiap kategori, bandingkan isi jawaban dengan checkpoint dan deskriptor level 1-4 pada
   rubrik. Pilih satu level (1, 2, 3, atau 4) yang paling sesuai. Jangan memberi angka pecahan.
5. Kutip atau parafrasekan 1 potongan singkat dari jawaban peserta sebagai bukti tiap skor.
6. Hitung Nilai Akhir = jumlah (Bobot kategori x Nilai kategori), dengan Bobot dalam desimal
   (mis. 35% = 0,35). Karena total bobot selalu 100%, hasilnya otomatis berskala 1-4.
7. Sajikan hasil detail tiap berkas memakai format tabel yang sudah disediakan tiap TPM pada
   dokumen ini (jangan ubah nama kategori maupun urutannya), lalu tambahkan catatan kualitatif
   ringkas per kategori.
8. Setelah SELURUH berkas yang dilampirkan selesai dinilai satu per satu, tutup dengan satu
   tabel rekapitulasi memakai format pada Bagian 4 dokumen ini, supaya nama peserta, tugas yang
   dinilai, dan nilai akhirnya terlihat sekaligus dalam satu pandangan — terutama penting saat
   berkas yang dilampirkan lebih dari satu.

Prinsip penilaian:
- Berbasis bukti. Jangan menebak maksud peserta; jika suatu bagian tidak dijawab atau kosong,
  beri nilai 1 pada kategori itu dan tulis "tidak dijawab" sebagai catatan.
- Konsisten antar peserta: pakai definisi level yang sama persis untuk semua peserta pada TPM
  yang sama, jangan menyesuaikan standar per individu, termasuk saat menilai banyak peserta
  sekaligus dalam satu proses.
- Untuk TPM yang melanjutkan tugas sebelumnya (TPM 3 melanjutkan TPM 2, TPM 4 melanjutkan TPM 3,
  TPM 5 dan TPM 6 melanjutkan TPM 2-4), periksa konsistensi dengan tugas sebelumnya SELAMA
  berkas tugas sebelumnya turut dilampirkan. Bila tidak dilampirkan, nilai kategori itu berdiri
  sendiri dan tulis "konsistensi dengan tugas sebelumnya tidak dapat diperiksa" pada catatan.
- Jangan pernah mengarang data (angka followers, engagement rate, dsb.) sebagai pembanding. Utk
  TPM 8, gunakan hanya angka pada Lampiran Data TikTok Insight di dokumen ini sebagai acuan benar.
- Jangan tentukan status lulus/tidak lulus. Ambang kelulusan ditetapkan penyelenggara program,
  bukan oleh rubrik ini. Cukup sajikan Nilai Akhir dan kualifikasinya (lihat Bagian 3).
- Tulis seluruh keluaran dalam Bahasa Indonesia.

Keluaran wajib, dalam urutan ini:
1. Untuk TIAP berkas: judul kecil berisi Nama Peserta dan TPM/tugas yang dinilai, lalu tabel
   skor sesuai format TPM terkait (Bobot, Nilai 1-4, Nilai Akhir), lalu catatan kualitatif per
   kategori (2-4 kalimat: kekuatan, kekurangan, bukti kutipan), lalu ringkasan saran perbaikan
   (maksimal 3 poin, paling actionable dan paling berdampak dulu).
2. Di akhir, SATU tabel rekapitulasi mencakup seluruh berkas yang baru dinilai (format Bagian 4).
   Lewati langkah ini hanya bila yang dilampirkan memang cuma satu berkas.
```

---

## 2. Skala Penilaian Umum (1-4)

Dipakai sebagai patokan dasar tiap kategori, sebelum ditajamkan dengan checkpoint spesifik per
TPM di bawah. Skala ini menggantikan tiga tingkat `tepat/sebagian/kurang` pada bank jawaban
website dengan empat tingkat yang lebih halus, supaya jawaban bebas peserta (bukan hanya kartu
pilihan) tetap bisa dipetakan secara adil.

| Level | Label | Arti Umum |
| --- | --- | --- |
| **4** | Sangat Baik | Spesifik, akurat, konsisten dengan studi kasus dan tugas-tugas sebelumnya, disertai alasan yang jelas dan bisa langsung dieksekusi. Memenuhi seluruh unsur yang diminta instruksi. |
| **3** | Baik | Arahnya sudah tepat dan sebagian besar unsur terpenuhi, tetapi ada satu unsur kecil yang kurang detail, kurang spesifik, atau alasannya belum sepenuhnya kuat. |
| **2** | Cukup | Menyentuh topik yang benar tetapi generik atau dangkal, kehilangan salah satu unsur wajib, atau konsistensinya dengan bagian lain lemah. |
| **1** | Kurang | Tidak sesuai instruksi, klise/generik di seluruh bagian, bertentangan dengan studi kasus atau data, atau tidak menjawab pertanyaan sama sekali. |

**Ciri umum yang menurunkan level** (berlaku lintas TPM, dipakai bila rubrik spesifik tidak
menyebutnya): jawaban bisa dipakai untuk brand siapa pun ("copy-paste template"); menyebut
angka yang tidak berdasar data yang diberikan; bertentangan dengan jawaban peserta sendiri di
bagian/tugas lain; hanya mengulang pertanyaan tanpa menjawab; melebihi lingkup yang diminta
instruksi sehingga tidak fokus.

---

## 3. Formula Nilai Akhir dan Kualifikasi

```
Nilai Akhir = Σ (Bobot_kategori × Nilai_kategori)     — bobot dalam desimal, hasil berskala 1-4
```

Kualifikasi deskriptif (bukan status lulus/tidak lulus — itu wewenang penyelenggara):

| Rentang Nilai Akhir | Kualifikasi |
| --- | --- |
| 3,50 – 4,00 | Sangat Baik |
| 2,50 – 3,49 | Baik |
| 1,50 – 2,49 | Cukup |
| 1,00 – 1,49 | Kurang |

Bila instansi memerlukan skala 0-100 untuk dibandingkan dengan sistem lain, kalikan Nilai Akhir
dengan 25 (skala 1-4 → 25-100). Ini murni konversi tampilan, bukan bagian dari kode `fyep-NN`
milik website generator.

---

## 4. Format Keluaran untuk Banyak Berkas (Rekapitulasi)

Dipakai setiap kali lebih dari satu berkas dinilai dalam satu proses — banyak peserta pada TPM
yang sama, satu peserta dengan banyak TPM, atau kombinasi keduanya. Tabel detail per kategori
(Bagian TPM masing-masing) **tetap wajib dibuat untuk tiap berkas**; rekap ini hanya lapisan
ringkasan di paling akhir supaya nama, tugas yang dinilai, dan nilai akhirnya langsung terlihat
tanpa harus membuka satu per satu.

| No | Nama Peserta | Tugas yang Dinilai | Nilai Akhir | Kualifikasi | Catatan |
| --- | --- | --- | --- | --- | --- |
| 1 | ... | TPM 1 | 3,20 | Baik | ... |
| 2 | ... | TPM 2 | 2,80 | Baik | ... |
| 3 | ... | Capstone | 1,90 | Cukup | Jalur: sendiri |
| ... | ... | ... | ... | ... | ... |

Ketentuan pengisian rekap:
- **Tugas yang Dinilai** diisi persis nama TPM/tugasnya (`TPM 1`, `TPM 2`, ..., `TPM 8`,
  `Capstone`) — satu baris per kombinasi peserta + tugas, bukan digabung.
- Urutkan baris per peserta dulu (semua tugas peserta A berurutan), baru peserta berikutnya,
  supaya rekap tetap terbaca kalau satu peserta mengumpulkan beberapa TPM sekaligus.
- **Catatan** diisi singkat bila relevan (mis. "tidak dapat diidentifikasi TPM-nya", "jalur
  capstone: mitra/sendiri", "tugas sebelumnya tidak dilampirkan sehingga konsistensi tidak
  diperiksa"). Kosongkan bila tidak ada yang perlu disebut.
- Bila satu peserta mengumpulkan banyak TPM dan instansi ingin satu angka gabungan per peserta,
  itu adalah keputusan penyelenggara (mis. rata-rata semua TPM) — **jangan menghitungnya sendiri**
  kecuali diminta eksplisit, karena bobot antar-TPM dalam penilaian keseluruhan pelatihan tidak
  diatur oleh rubrik ini.

---

## 5. Catatan Penyesuaian dari Tabel Acuan

Dua penyesuaian dibuat agar rubrik konsisten dengan isi tugas yang sebenarnya:

- **TPM 5** (video CapCut) memakai nama kategori yang sama dengan TPM 4 — *Kesesuaian Content
  Plan* dan *Kualitas Desain Visual* — karena keduanya sama-sama menilai "menerjemahkan rancangan
  konten jadi output visual", hanya beda medianya (gambar vs video). Deskriptor level 1-4 di
  bawah sudah disesuaikan ke konteks video, bukan disalin mentah dari TPM 4.
- **TPM 7** kategori kedua ditulis sebagai *Alasan Strategi Budgeting*, dengan **Indikator
  Scaling** sebagai salah satu unsur yang dinilai di dalamnya (bukan kategori terpisah).

---

## TPM 1 — Riset Target Audiens dan Konten Kompetitor

**Brand:** FitActive (pakaian olahraga lokal). **Masalah:** followers naik tapi engagement
rendah; brand belum tahu siapa target audiensnya dan konten seperti apa yang relevan.
**Berkas yang dinilai:** PDF (`SMM-tpm1-[Nama Peserta]`), berisi riset target audiens dan riset
konten kompetitor.

| Kategori | Segmentasi Audiens | Profil Audiens | Riset Konten Kompetitor | Nilai Akhir |
| --- | --- | --- | --- | --- |
| Bobot | 35% | 15% | 50% | 100% |
| Nilai (1-4) | … | … | … | *(dihitung)* |

### A. Segmentasi Audiens (35%)
Cakupan: Geographic, Sociographic, Demographic, Behavioral, Psychographic (5 unsur, semua wajib
ada).

Checkpoint tiap unsur: menyebut hal **spesifik** (wilayah/kota, status sosial-ekonomi, angka usia
dan pendapatan, kebiasaan olahraga/belanja, nilai dan minat hidup), dan **beralasan** — dikaitkan
ke keunggulan FitActive (desain fungsional, bahan breathable, harga terjangkau) atau ke masalah
engagement pada studi kasus.

- **4**: Kelima unsur terisi spesifik dan tiap unsur disertai alasan yang mengaitkannya ke
  FitActive atau ke masalah studi kasus. Tidak ada unsur yang kosong atau asal.
- **3**: 4-5 unsur relevan dan cukup spesifik, tetapi satu unsur kurang detail atau alasannya
  lemah (mis. tidak menyebut kota/wilayah tertentu, hanya "kota besar").
- **2**: Sebagian unsur (2-3) relevan tapi dangkal ("olahraga rutin", "kota besar" tanpa detail),
  unsur lain kosong atau tidak nyambung ke brand.
- **1**: Segmentasi sangat umum di seluruh unsur (mis. "seluruh Indonesia", "siapa saja yang
  suka olahraga"), keliru total (menyebut syarat teknis seperti "yang punya internet" sebagai
  segmen geografis), atau ditunda tanpa keputusan ("ditentukan menyusul").

### B. Profil Audiens (15%)
Cakupan: satu profil (description, key demographic, key psychographic, customer pain points,
key communication channel).

Checkpoint utama — **konsistensi**: usia/gender/pendidikan/pendapatan pada profil harus sama
dengan jawaban Demographic; nilai/minat/opini harus sama dengan jawaban Psychographic. Pain
points harus spesifik dan bisa dijawab produk FitActive. Channel komunikasi disebut jelas.

- **4**: Profil lengkap, 100% konsisten dengan segmentasi Demographic/Psychographic, pain point
  spesifik dan relevan dengan produk, channel disebut jelas.
- **3**: Profil lengkap, konsistensinya baik tetapi ada satu detail kecil yang berbeda dari
  segmentasi, atau pain point agak generik.
- **2**: Profil ada tetapi tidak sinkron dengan segmentasi (angka/karakteristik berbeda dari
  bagian sebelumnya), atau satu unsur wajib (pain point/channel) kosong.
- **1**: Profil tidak dibuat, sangat tidak lengkap, atau bertentangan jelas dengan segmentasi
  yang ditulis peserta sendiri di bagian A.

### C. Riset Konten Kompetitor (50%)
Cakupan: Langkah 1 (identifikasi 1 kompetitor + akun Instagram + pengamatan halaman depan),
Langkah 2 (analisis 5 elemen — visual, pesan utama, CTA, promo, engagement — pada beberapa
contoh konten feed), Langkah 3 (kekuatan & kelemahan kompetitor), Langkah 4 (peluang & ancaman
yang jadi inspirasi bagi FitActive).

- **4**: Kompetitor relevan (brand pakaian olahraga lokal yang masuk akal) dan spesifik; kelima
  elemen dianalisis dengan detail konkret dari beberapa contoh konten; kekuatan/kelemahan
  spesifik dan berimbang; peluang & inspirasi actionable dan jelas ditujukan ke FitActive; tidak
  ada angka followers/engagement rate yang dikarang sebagai klaim pasti.
- **3**: Kompetitor relevan; 4-5 dari 5 elemen dianalisis cukup detail, satu elemen agak dangkal;
  kekuatan/kelemahan/peluang ada tetapi salah satu kurang spesifik atau kurang actionable.
- **2**: Kompetitor kurang relevan atau lebih dari separuh elemen dianalisis dangkal/generik;
  kekuatan/kelemahan/peluang bersifat template umum, tidak spesifik ke kompetitor yang disebut.
- **1**: Kompetitor tidak disebut/tidak relevan sama sekali, elemen analisis kosong atau asal,
  mengarang angka followers/engagement sebagai fakta, atau peluang tidak berkaitan dengan
  FitActive.

---

## TPM 2 — Merancang Content Calendar dan Content Plan

**Brand:** FitActive. **Masalah:** jadwal posting tidak konsisten, jenis konten kurang variasi.
**Berkas yang dinilai:** Excel/Spreadsheet (`SMM-tpm2-[Nama Peserta]`) berisi 2 sheet: Content
Calendar (1 minggu, 1-7 September 2025) dan Content Plan (3 hari pertama, 13 kolom).

| Kategori | Penyusunan Content Calendar | Penyusunan Content Plan | Nilai Akhir |
| --- | --- | --- | --- |
| Bobot | 45% | 55% | 100% |
| Nilai (1-4) | … | … | *(dihitung)* |

### A. Penyusunan Content Calendar (45%)
Cakupan: Marketing Objective, Content Pillar, pola hari/jam unggah 1 minggu, rencana konten
umum 1 minggu.

Checkpoint: objective harus **menjawab masalah studi kasus** (konsistensi jadwal + variasi
konten), bukan objective generik. Content pillar 3-4 tema berbeda yang tidak tumpang tindih.
Jam unggah **berpola tetap dan bisa diulang** (bukan asal-asalan) — studi kasus eksplisit
menyebut jadwal tidak konsisten sebagai masalah. Rencana konten mingguan memakai pilar dan jenis
konten yang **bervariasi** antarhari, bukan diulang sama setiap hari.

- **4**: Objective spesifik dan langsung menjawab masalah studi kasus; 3-4 pillar berbeda jelas
  perannya; jam unggah konsisten & masuk akal (waktu audiens aktif); rencana 1 minggu bervariasi
  pilar/jenis konten tanpa pengulangan yang membosankan.
- **3**: Objective dan pillar relevan; jam unggah cukup konsisten tetapi alasannya tidak
  dijelaskan; variasi rencana mingguan ada tetapi 1-2 hari terasa mirip.
- **2**: Objective terlalu umum ("meningkatkan engagement" tanpa kaitan ke masalah spesifik);
  pillar kurang dari 3 atau tumpang tindih; jam unggah tidak konsisten/berubah-ubah; rencana
  mingguan minim variasi.
- **1**: Objective tidak ada/tidak nyambung ke studi kasus; pillar tidak dibuat; jam unggah
  asal/acak (justru mengulangi masalah yang ingin diselesaikan); rencana mingguan kosong atau
  seluruh hari isinya sama.

### B. Penyusunan Content Plan (55%)
Cakupan: 3 hari pertama, 13 kolom (tanggal, objective, pilar, tipe visual, judul, copywriting,
platform, PIC, referensi, hasil konten, jam posting, status konten, notes).

Checkpoint: seluruh 13 kolom terisi untuk ketiga hari; **konsisten** dengan objective/pillar/jam
posting/PIC/status yang sudah ditetapkan di bagian A (tidak boleh bertentangan); tipe visual dan
platform **bervariasi** antarhari; copywriting singkat tapi relevan dengan pilar; catatan
produksi masuk akal untuk dieksekusi.

- **4**: 13 kolom lengkap untuk 3 hari, seluruhnya konsisten dengan bagian A, tipe visual/
  platform/pilar bervariasi antarhari, judul dan copywriting relevan serta bisa langsung
  dieksekusi tim produksi.
- **3**: Kolom lengkap dan sebagian besar konsisten, tetapi ada 1 ketidaksesuaian kecil dengan
  bagian A, atau variasi antarhari kurang menonjol.
- **2**: Ada kolom yang kosong atau ada ketidaksesuaian nyata dengan objective/pillar/jam/PIC/
  status yang ditetapkan sebelumnya; tipe visual dan platform ketiga hari sama semua.
- **1**: Sebagian besar kolom kosong/generik, isinya bertentangan dengan bagian A, atau ketiga
  hari tidak bisa dibedakan sama sekali (copy-paste satu sama lain).

---

## TPM 3 — Merancang Rencana Konten dan Copywriting

Melanjutkan **TPM 2**. Peserta memilih 1 konten dari content plan-nya, mengembangkannya dengan
hook, visual hook, storytelling, UGC, dan ide visual, lalu menulis caption dengan satu formula
copywriting. **Berkas yang dinilai:** PDF (`SMM-tpm3-[Nama Peserta]`).

> Catatan: pemilihan konten dari content plan bersifat *ungraded* (semua pilihan sama-sama
> benar) — jangan menilai konten mana yang dipilih, nilai bagaimana konten itu dikembangkan.

| Kategori | Penyusunan Detail Content Plan | Penyusunan Caption Konten | Nilai Akhir |
| --- | --- | --- | --- |
| Bobot | 60% | 40% | 100% |
| Nilai (1-4) | … | … | *(dihitung)* |

### A. Penyusunan Detail Content Plan (60%)
Cakupan: Hook, Visual Hook, Storytelling, UGC, Ide Visual — semuanya untuk 1 konten yang sama.

Checkpoint per unsur:
- **Hook**: kalimat pembuka yang menahan perhatian di detik pertama, biasanya lewat masalah yang
  relatable, angka, pertanyaan, atau pernyataan berlawanan dengan anggapan umum. **Skor turun**
  bila hook berupa sapaan basa-basi, langsung berjualan/CTA, atau klaim yang tidak berhubungan
  dengan isi konten.
- **Visual Hook**: gambaran konkret 3 detik pertama secara visual (bukan hanya deskripsi
  umum "gambar menarik").
- **Storytelling**: ada struktur cerita yang jelas (mis. masalah → proses → hasil), bukan sekadar
  daftar informasi produk.
- **UGC**: penerapannya masuk akal untuk brand dan konten yang dipilih, bukan ditempel paksa.
- **Ide Visual**: cukup rinci untuk langsung dieksekusi tim produksi/di TPM 4-5 (menyebut
  elemen visual, bukan hanya tema).

Seluruh unsur harus **konsisten** dengan pilar, tipe visual, platform, dan objective konten yang
dipilih dari TPM 2.

- **4**: Kelima unsur (hook, visual hook, storytelling, UGC, ide visual) spesifik, saling
  mendukung satu sama lain, dan konsisten dengan pilar/objective dari TPM 2.
- **3**: 4-5 unsur baik dan konsisten, tetapi satu unsur kurang detail atau kurang related dengan
  konten yang dipilih.
- **2**: Sebagian unsur dangkal/generik (bisa dipakai untuk konten apa saja), atau ada unsur yang
  tidak konsisten dengan pilar/objective TPM 2.
- **1**: Sebagian besar unsur kosong, hook berupa ajakan membeli langsung atau klaim yang tidak
  berhubungan dengan konten, atau seluruh detail bertentangan dengan rencana TPM 2.

### B. Penyusunan Caption Konten (40%)
Cakupan: naskah caption + formula copywriting (AIDA/FAB/PAS/ACCA) + pemeriksaan kesesuaian
dengan objective.

Checkpoint: formula harus **terlihat strukturnya** di naskah (mis. untuk AIDA, ada bagian yang
jelas menarik Attention, membangun Interest, Desire, lalu Action) — bukan hanya menyebut nama
formula tanpa penerapan. Pemeriksaan kesesuaian harus menjelaskan **bagaimana caranya**
konten+caption ini menjawab objective, bukan sekadar klaim "sudah sesuai".

- **4**: Satu formula diterapkan dengan struktur yang jelas terlihat di naskah caption; caption
  relevan dengan hook dan storytelling di kategori A; kesesuaian dengan objective dijelaskan
  dengan alasan konkret.
- **3**: Formula disebut dan diterapkan, strukturnya cukup terlihat tetapi satu bagian formula
  lemah; kesesuaian dengan objective disebut tetapi alasannya tipis.
- **2**: Formula disebut namanya tetapi penerapannya tidak jelas terlihat di naskah, atau caption
  tidak nyambung dengan hook/storytelling; kesesuaian dengan objective hanya diklaim tanpa
  penjelasan.
- **1**: Tidak memakai formula copywriting yang diakui (AIDA/FAB/PAS/ACCA), caption generik yang
  bisa dipakai brand apa saja, atau kesesuaian dengan objective tidak dibahas sama sekali.

---

## TPM 4 — Mendesain Konten Visual

Melanjutkan **TPM 3**. Mengikuti Brand Guideline FitActive (palet resmi, judul Poppins, teks
Arial). **Berkas yang dinilai:** PNG (`SMM-tpm4-[Nama Peserta]`, seluruh lembar bila carousel),
didukung PDF spesifikasi desain.

| Kategori | Kesesuaian Content Plan | Kualitas Desain Visual | Nilai Akhir |
| --- | --- | --- | --- |
| Bobot | 40% | 60% | 100% |
| Nilai (1-4) | … | … | *(dihitung)* |

### A. Kesesuaian Content Plan (40%)
Cakupan: format/ukuran kanvas dan tata letak (hierarki visual).

Checkpoint: ukuran kanvas (1:1 / 9:16) dan jumlah lembar carousel harus sesuai tipe visual yang
ditetapkan di TPM 3; tata letak menempatkan judul/headline paling menonjol sesuai hook, lalu CTA
terlihat jelas, sesuai pilar dan objective konten.

- **4**: Format/ukuran kanvas persis sesuai tipe visual TPM 3; tata letak membuat hierarki
  (judul → isi → CTA) langsung terbaca dalam sekali lihat.
- **3**: Format sesuai, tetapi hierarki tata letak kurang tegas (mis. CTA kurang menonjol).
- **2**: Format kurang sesuai dengan tipe visual TPM 3 (mis. rencana carousel tapi hanya 1
  lembar), atau tata letak membingungkan mana yang harus dibaca lebih dulu.
- **1**: Format tidak berhubungan dengan rancangan TPM 3 sama sekali, atau tata letak tidak
  menunjukkan hierarki apa pun (semua elemen terlihat sama pentingnya).

### B. Kualitas Desain Visual (60%)
Cakupan: warna, teks desain, safe zone, finalisasi (konsistensi, kejelasan pesan, relevansi
objective).

Checkpoint: warna dari palet resmi Brand Guideline **dengan kontras cukup** (teks terbaca jelas
di atas latar, rasio kontras minimal setara 4,5:1); satu warna aksen per desain; teks di desain
**ringkas** (naskah panjang semestinya ada di caption, bukan di gambar); font judul Poppins,
teks isi Arial; wordmark FitActive tampil di tiap lembar; safe zone dijaga (elemen penting tidak
mepet tepi, terutama untuk kanvas 9:16 yang tertutup UI Reels/Story di atas dan bawah); untuk
carousel, seluruh lembar konsisten gaya dan pesannya jelas serta relevan dengan objective.

- **4**: Warna dan font sepenuhnya sesuai Brand Guideline dengan kontras baik; teks ringkas dan
  jelas; safe zone terjaga di semua lembar; carousel (bila ada) konsisten gaya dan pesannya
  jelas; wordmark ada.
- **3**: Sebagian besar unsur terpenuhi, tetapi ada satu kekurangan kecil (mis. satu lembar
  carousel kurang konsisten, atau teks sedikit terlalu panjang).
- **2**: Warna dipakai dari luar palet resmi atau kontrasnya rendah; teks di desain terlalu
  panjang; safe zone dilanggar (elemen penting mepet tepi); atau carousel tidak konsisten
  antarlembar.
- **1**: Tidak mengikuti Brand Guideline sama sekali (warna/font sembarangan), teks tidak
  terbaca karena kontras buruk, atau elemen penting jelas tertutup/terlalu mepet tepi kanvas.

---

## TPM 5 — Membuat Konten Video di CapCut

Melanjutkan **TPM 2-4**. Tidak ada bank jawaban di website — hasilnya video MP4 yang dikerjakan
langsung di CapCut. **Berkas yang dinilai:** MP4 (`SMM-tpm5-[Nama Peserta]`).

> Lihat [Catatan Penyesuaian](#5-catatan-penyesuaian-dari-tabel-acuan): kategori memakai nama
> yang sama dengan TPM 4, tetapi deskriptornya disesuaikan untuk video.

| Kategori | Kesesuaian Content Plan | Kualitas Desain Visual | Nilai Akhir |
| --- | --- | --- | --- |
| Bobot | 40% | 60% | 100% |
| Nilai (1-4) | … | … | *(dihitung)* |

### A. Kesesuaian Content Plan (40%)
Video harus mengikuti konten yang sama yang dipilih dan dikembangkan di TPM 3 (topik, pilar,
objective) — bukan ide baru yang tidak berhubungan dengan rancangan sebelumnya.

- **4**: Video jelas mengeksekusi konten yang sama dari TPM 3: topik, pesan, dan objective
  konsisten sepenuhnya.
- **3**: Video mengangkat topik yang sama tetapi ada penyesuaian kecil pada pesan/objective yang
  tidak dijelaskan alasannya.
- **2**: Video hanya sebagian nyambung dengan rancangan TPM 3 (mis. pilar sama tapi pesan
  berbeda arah).
- **1**: Video tidak berhubungan dengan rancangan TPM 2-3 sama sekali, atau topiknya baru tanpa
  penjelasan.

### B. Kualitas Desain Visual — Produksi Video (60%)
Checkpoint: struktur video short-form (hook di detik awal, value di tengah, CTA di penutup);
mengikuti Brand Guideline (warna/font teks overlay); teks dan elemen penting berada di dalam
safe zone (tidak tertutup UI Reels/Story/TikTok); durasi dan rasio sesuai platform tujuan;
kualitas audio-visual jernih dan transisi rapi; pesan akhir sesuai objective.

- **4**: Struktur hook-value-CTA jelas dan efektif; brand guideline diikuti; safe zone terjaga;
  audio-visual jernih, rasio dan durasi sesuai platform; pesan konsisten dengan objective.
- **3**: Struktur dan kualitas produksi baik, tetapi satu unsur kurang (mis. CTA kurang tegas,
  atau satu teks overlay agak mepet tepi layar).
- **2**: Struktur short-form tidak lengkap (mis. tidak ada hook/CTA yang jelas), atau kualitas
  audio-visual mengganggu (buram/pecah suara), atau ada teks penting yang tertutup UI platform.
- **1**: Tidak menerapkan struktur short-form sama sekali, kualitas produksi sangat rendah
  sehingga pesan tidak tersampaikan, atau rasio/durasi tidak sesuai platform yang dituju.

---

## TPM 6 — Setting Up Iklan di Meta Ads

Tidak ada bank jawaban — hasilnya tangkapan layar Meta Ads Manager. **Berkas yang dinilai:** PDF
berisi screenshot (`SMM-tpm6-[Nama Peserta]`).

**Syarat wajib sebelum dinilai (bukan bagian skala 1-4, tapi gugurkan/catat bila dilanggar):**
iklan **berhenti di tahap draft** — tidak dipublish dan tidak dialokasikan budget sungguhan.
Bila screenshot menunjukkan iklan sudah aktif/live, catat sebagai pelanggaran instruksi terlepas
dari skor kategori.

| Kategori | Setting Level Campaign dan Ad Set | Setting Level Ad | Nilai Akhir |
| --- | --- | --- | --- |
| Bobot | 60% | 40% | 100% |
| Nilai (1-4) | … | … | *(dihitung)* |

### A. Setting Level Campaign dan Ad Set (60%)
Checkpoint: nama campaign dan objective jelas serta sesuai dengan konten/copywriting yang dipakai
dari tugas sebelumnya; Ad Set menunjukkan sistem budgeting/bidding, target audience (demografi,
minat, perilaku, atau lokasi) yang **spesifik dan relevan** dengan riset audiens TPM 1, serta
placement yang sesuai platform/tipe konten (mis. Instagram Feed untuk konten feed, Stories untuk
konten vertikal).

- **4**: Objective campaign logis dan konsisten dengan tujuan bisnis; Ad Set lengkap (budgeting/
  bidding, target audience spesifik selaras riset TPM 1, placement sesuai konten); seluruh
  tahapan terlihat jelas di screenshot.
- **3**: Objective dan Ad Set lengkap dan masuk akal, tetapi target audience kurang spesifik atau
  placement kurang dijelaskan alasannya.
- **2**: Objective campaign tidak jelas alasannya, atau salah satu unsur Ad Set (budgeting/
  bidding/target audience/placement) tidak terlihat/tidak diisi di screenshot.
- **1**: Screenshot tidak menunjukkan pengaturan Campaign maupun Ad Set secara memadai, atau
  objective/target audience tidak berhubungan dengan konten dan riset audiens sebelumnya.

### B. Setting Level Ad (40%)
Checkpoint: materi kreatif (gambar/video) sesuai desain TPM 4 atau video TPM 5; copywriting/teks
utama sesuai caption TPM 3; tombol CTA sesuai objective campaign yang dipilih.

- **4**: Materi kreatif, copywriting, dan CTA seluruhnya konsisten dengan tugas-tugas sebelumnya
  dan sesuai objective campaign.
- **3**: Materi dan copywriting terpasang dan relevan, tetapi CTA kurang sesuai objective atau
  ada elemen kecil yang tidak konsisten dengan tugas sebelumnya.
- **2**: Materi kreatif atau copywriting yang dipasang tidak berhubungan dengan hasil tugas
  sebelumnya, atau CTA tidak sesuai objective.
- **1**: Bagian Ad tidak terlihat/tidak diisi di screenshot, atau materi kreatifnya asal
  (tidak berhubungan dengan brand/konten apa pun).

---

## TPM 7 — Menentukan Budgeting Iklan di Meta Ads

**Brand:** HealthyBite (makanan sehat). Total budget **Rp10.000.000**, durasi **14 hari**, tiga
objective (Awareness, Consideration, Conversion). Tugas ini **berdiri sendiri**, tidak
menyambung ke FitActive. **Berkas yang dinilai:** PDF (`SMM-tpm7-[Nama Peserta]`), didukung
Excel penghitung.

| Kategori | Strategi dan Plotting Budget Campaign | Alasan Strategi Budgeting | Nilai Akhir |
| --- | --- | --- | --- |
| Bobot | 65% | 35% | 100% |
| Nilai (1-4) | … | … | *(dihitung)* |

### A. Strategi dan Plotting Budget Campaign (65%)
Cakupan: persentase budget tiap objective, daily/lifetime budget, level CBO/ABO, struktur ad set
testing, jumlah hari fase testing, pola belanja harian, tabel plotting 14 hari.

**Pemeriksaan wajib (aritmetika, bukan opini):** total seluruh 14 hari harus tepat
**Rp10.000.000**, dan total tiap objective harus sesuai persentase yang dituliskan peserta di
bagian alokasi. Bila tidak sama, ini kekeliruan faktual yang menurunkan skor terlepas dari
kualitas narasinya.

Checkpoint kualitatif: alokasi % antar-objective proporsional dengan prioritas bisnis di studi
kasus; pilihan daily/lifetime budget dan CBO/ABO konsisten dengan strategi yang dijelaskan;
jumlah hari testing proporsional (biasanya sekitar seperempat sampai sepertiga durasi, cukup
untuk mengumpulkan data tanpa menyisakan sedikit waktu untuk scaling); pola belanja harian **naik
bertahap atau bertingkat dari testing ke scaling** — bentuk yang tepat bergerak naik seiring
data terkumpul. Pola yang **besar di depan lalu mengecil**, atau **menumpuk di hari-hari
terakhir**, bertentangan dengan alasan uji-lalu-optimasi yang diminta studi kasus dan merupakan
pola yang secara eksplisit disebut sebagai masalah (over budget di awal / under budget saat
scaling).

- **4**: Total 14 hari tepat Rp10.000.000 dan sesuai persentase per objective; fase testing
  proporsional; pola belanja naik bertahap/bertingkat mengikuti alur testing→scaling; struktur
  ad set testing punya dasar pembagian (mis. ukuran audiens) yang dijelaskan.
- **3**: Total dan persentase benar; pola belanja pada dasarnya naik, tetapi penjelasan proporsi
  hari testing atau struktur ad set kurang detail.
- **2**: Total 14 hari sedikit meleset dari Rp10.000.000 atau tidak sesuai persentase yang
  ditulis sendiri; atau pola belanja tidak jelas arahnya (rata saja tanpa alasan).
- **1**: Total tidak sama dengan Rp10.000.000, atau pola belanja justru besar di depan lalu
  mengecil / menumpuk di akhir — bentuk yang bertentangan dengan strategi testing-scaling yang
  diminta studi kasus.

### B. Alasan Strategi Budgeting (35%)
Cakupan: pertimbangan utama strategi, **indikator** yang dipakai memutuskan ad set mana yang
budgetnya dinaikkan (indikator scaling), dan justifikasi bentuk plotting.

Checkpoint: pertimbangan utama menyebut fokus objective, ukuran audiens, fase campaign, serta
testing dan scaling — bukan hanya satu dari empat itu. Indikator scaling harus **terukur dan
spesifik** (mis. CPA, CTR, CPM, cost per hasil) — bukan "yang performanya paling bagus" tanpa
metrik. Justifikasi plotting harus **konsisten** dengan pola belanja yang dipilih di kategori A
(mis. bila alasan menyebut "hati-hati dulu di awal", pola belanjanya harus memang dimulai rendah,
bukan besar di depan).

- **4**: Pertimbangan mencakup keempat aspek (objective, ukuran audiens, fase, testing-scaling);
  indikator scaling spesifik dan terukur; justifikasi selaras penuh dengan pola plotting di
  kategori A.
- **3**: Pertimbangan mencakup sebagian besar aspek; indikator scaling disebut tetapi kurang
  spesifik (mis. "yang engagement-nya tinggi" tanpa angka acuan); justifikasi cukup selaras
  dengan plotting.
- **2**: Pertimbangan hanya menyebut 1-2 aspek; indikator scaling tidak terukur; atau justifikasi
  sedikit bertentangan dengan bentuk plotting yang sebenarnya dibuat.
- **1**: Tidak ada pertimbangan/indikator yang jelas, atau justifikasi jelas bertentangan dengan
  pola plotting di kategori A (mis. mengklaim "bertahap" padahal tabelnya besar di depan).

---

## TPM 8 — Membaca & Menganalisis TikTok Insight

Data: TikTok Insight periode **4-10 Agustus 2025**, satu video edukasi berdurasi 15,18 detik.
Tugas ini **berdiri sendiri**. **Berkas yang dinilai:** PDF/DOCX potret (`SMM-tpm8-[Nama
Peserta]`). Lihat [Lampiran B](#lampiran-b--data-tiktok-insight-tpm-8) untuk angka acuan.

| Kategori | Analisis Metrics | Strategi Optimasi | Nilai Akhir |
| --- | --- | --- | --- |
| Bobot | 65% | 35% | 100% |
| Nilai (1-4) | … | … | *(dihitung)* |

### A. Analisis Metrics (65%)
Cakupan: pembacaan data (engagement, followers, performa video), identifikasi metrics yang
sudah baik dan yang perlu ditingkatkan, analisis lanjutan yang menghubungkan data dengan
perilaku audiens (jam aktif, gender, lokasi).

**Pemeriksaan wajib (akurasi angka):** angka yang disebut peserta harus benar-benar ada pada
data di [Lampiran B](#lampiran-b--data-tiktok-insight-tpm-8), termasuk angka turunan sederhana
(mis. persentase like/komentar/share terhadap views). **Jebakan umum**: video views 7 hari pada
overview (79,7K) dan video views satu postingan (137,4K) berasal dari cakupan waktu berbeda dan
**tidak boleh dijumlahkan** — bila peserta menjumlahkannya sebagai satu angka, ini kekeliruan
faktual.

Checkpoint kualitatif: pembacaan menyebut **angka konkret**, bukan kesan umum ("bagus",
"meningkat" tanpa angka); analisis lanjutan benar-benar **menghubungkan** metrik dengan perilaku
audiens (mis. jam aktif pukul 8 malam dikaitkan dengan waktu unggah, gender 67,9% perempuan
dikaitkan dengan gaya konten), bukan sekadar menyebutkan ulang data secara terpisah.

- **4**: Ketiga bagian data dibaca dengan angka konkret dan akurat; kekuatan dan kelemahan
  didukung angka dan alasan; analisis lanjutan menghubungkan metrik dengan perilaku audiens
  secara eksplisit dan masuk akal; tidak ada angka yang keliru atau dijumlahkan secara salah.
- **3**: Pembacaan data akurat dan cukup lengkap, tetapi analisis lanjutan hanya menyebutkan
  ulang data tanpa menghubungkannya dengan jelas ke perilaku audiens.
- **2**: Sebagian pembacaan data berupa kesan umum tanpa angka, atau salah satu dari tiga bagian
  data (engagement/followers/video) tidak dibahas.
- **1**: Angka yang disebut tidak sesuai data (termasuk menjumlahkan video views 7-hari dengan
  video views satu postingan), atau seluruh analisis berupa opini tanpa rujukan angka sama
  sekali.

### B. Strategi Optimasi (35%)
Cakupan: minimal 3 strategi, **mencakup aspek distribusi, konten, dan engagement** (ketiganya
wajib ada, ini persyaratan eksplisit instruksi tugas).

Checkpoint: tiap strategi **actionable** dan **bersandar pada angka spesifik** dari data (mis.
memakai jam aktif 8 malam, watch time 10,3 detik, rasio komentar 0,12% dari views), bukan
strategi generik yang bisa berlaku untuk akun mana pun. Strategi tidak boleh bertentangan dengan
temuan analisis (mis. menyarankan sesuatu yang mengabaikan bahwa konversi profil-ke-follower
sudah sangat tinggi di 92,6%, sehingga hambatan sebenarnya ada di jumlah orang yang membuka
profil, bukan di profilnya).

- **4**: Tiga strategi lengkap mencakup distribusi, konten, dan engagement; masing-masing
  bersandar pada angka spesifik dari data dan actionable; tidak bertentangan dengan temuan
  analisis di kategori A.
- **3**: Tiga strategi mencakup ketiga aspek, tetapi satu strategi kurang bersandar pada data
  spesifik (lebih ke saran umum).
- **2**: Kurang dari 3 strategi, atau salah satu aspek (distribusi/konten/engagement) tidak
  dibahas sama sekali, atau strategi generik tanpa rujukan angka.
- **1**: Strategi tidak berdasarkan analisis data apa pun, atau bertentangan dengan temuan
  (mis. mengabaikan kelemahan yang sudah teridentifikasi jelas di kategori A).

---

## Capstone Project

Sintesis TPM 1-8 menjadi dua berkas: **A3 Summary Report** (PDF satu halaman) dan **Deck PPT**
(`SMM-capstone-[Nama Peserta]`). Peserta memilih salah satu jalur — **mitra** (UMKM yang sudah
disiapkan, Sanggabiz) atau **sendiri** (UMKM pilihan peserta via formulir) — **rubrik berlaku
sama** untuk kedua jalur, karena struktur akhirnya identik.

Untuk jalur **sendiri**, isian bertanda wajib (Profil UMKM, Target Audiens, Strategy Highlights,
minimal 2 konten Visual Gallery, Impact, Hire Me) harus lengkap sebagai syarat sebelum menilai
kualitas isinya — isian wajib yang kosong otomatis membatasi skor kategori terkait ke level 1-2.

| Kategori | Business Context & Strategy Highlights | Technical Skill Evidence | Visual Gallery | Impact, Closure & Kelengkapan | Nilai Akhir |
| --- | --- | --- | --- | --- | --- |
| Bobot | 35% | 25% | 15% | 25% | 100% |
| Nilai (1-4) | … | … | … | … | *(dihitung)* |

### A. Business Context & Strategy Highlights (35%)
Cakupan: ringkasan profil UMKM/mitra, target audiens beserta pain point, pilar konten, ritme
unggahan beserta alasannya.

Checkpoint: profil UMKM spesifik (model bisnis, keunggulan, bukan sekadar nama); target audiens
spesifik dengan pain point yang benar-benar bisa dijawab usaha ini (bukan rentang usia generik);
3-4 pilar konten dengan **peran berbeda** satu sama lain; ritme unggahan disertai **alasan**
yang mengaitkan ke kebiasaan audiens (hari/jam tertentu).

- **4**: Profil dan audiens spesifik serta saling berkaitan (masalah audiens memang dijawab
  profil usaha); pilar-pilar punya peran jelas berbeda; ritme unggahan beralasan dan masuk akal.
- **3**: Profil dan audiens relevan, pilar cukup berbeda, tetapi ritme unggahan kurang dijelaskan
  alasannya, atau satu pilar terasa mirip pilar lain.
- **2**: Profil atau audiens masih generik (bisa berlaku usaha apa saja); pilar konten kurang
  dari 3 atau tumpang tindih; ritme unggahan tidak beralasan.
- **1**: Business Context tidak diisi memadai, atau pilar/ritme tidak disusun sama sekali.

### B. Technical Skill Evidence (25%)
Cakupan: visual hook beserta alasannya, formula copywriting yang dipakai (dan storytelling bila
diisi).

Checkpoint: visual hook dijelaskan **konkret** (apa yang tampil di detik/bingkai pertama) disertai
**alasan mengapa** itu menahan perhatian audiens yang spesifik pada bagian A — bukan sekadar
deskripsi visual tanpa alasan. Formula copywriting disebut namanya **dan** terlihat cara kerjanya
diterapkan pada konten mitra/UMKM ini.

- **4**: Visual hook konkret dan alasannya terhubung jelas ke audiens spesifik; formula
  copywriting disebut dan cara penerapannya dijelaskan dengan contoh nyata dari konten.
- **3**: Visual hook dan formula disebut dengan benar, tetapi alasan/penerapannya kurang detail.
- **2**: Visual hook hanya deskripsi umum tanpa alasan, atau formula disebut namanya saja tanpa
  bukti penerapan.
- **1**: Tidak ada visual hook atau formula copywriting yang jelas disebutkan.

### C. Visual Gallery (15%)
Cakupan: minimal 2 (idealnya 4) konten yang ditampilkan sebagai bukti karya.

Checkpoint: konten-konten yang ditampilkan punya **format/kanal berbeda** satu sama lain (mis.
Reels, carousel, poster tunggal, story berseri) dan masing-masing punya **peran berbeda** dalam
strategi (bukan 4 konten yang isinya serupa).

- **4**: Minimal 2 konten wajib terisi dengan format/kanal yang bervariasi, dan peran tiap konten
  dalam strategi jelas berbeda.
- **3**: Konten wajib terisi dan cukup bervariasi, tetapi peran salah satu konten kurang jelas
  dibedakan dari konten lain.
- **2**: Konten yang ditampilkan format/kanalnya seragam (mis. semua Reels), atau perannya tidak
  dijelaskan.
- **1**: Konten wajib (minimal 2) tidak lengkap, atau seluruh konten terasa sama isinya.

### D. Impact, Closure & Kelengkapan (25%)
Cakupan: analisis dampak bagi UMKM, penutup Hire Me, kelengkapan dokumen (kode QR portofolio,
Profile Card di slide penutup, dua berkas — A3 PDF dan PPTX — diserahkan).

Checkpoint: analisis dampak menyebut **metrik yang dipantau**, **target angka**, dan **jangka
waktu** — bukan harapan samar. Penutup Hire Me menyebut **bukti keterampilan konkret** dari
proyek ini (bukan pernyataan siap kerja generik). Kelengkapan dokumen: tautan/kode QR portofolio
terisi, Profile Card berisi foto profesional dan tautan LinkedIn, kedua berkas (A3 dan PPTX)
diserahkan.

- **4**: Analisis dampak menyebut metrik+target+jangka waktu yang jelas; penutup Hire Me
  menyebut bukti konkret dari proyek; dokumen lengkap (QR, Profile Card, dua berkas).
- **3**: Analisis dampak dan penutup baik, tetapi satu dari dua kurang spesifik, atau satu unsur
  kelengkapan dokumen (mis. QR code) belum diisi.
- **2**: Analisis dampak berupa harapan umum tanpa angka/tenggat; penutup Hire Me generik; atau
  lebih dari satu unsur kelengkapan dokumen belum ada.
- **1**: Analisis dampak dan penutup tidak diisi memadai, dan/atau salah satu dari dua berkas
  (A3 atau PPTX) tidak diserahkan.

---

## Lampiran A — Kelengkapan Administratif per TPM

Periksa sebelum menilai isi. Ketidaksesuaian nama/format file dicatat sebagai catatan, bukan
pengurang skor kategori (kecuali instansi menentukan lain).

| TPM | Nama file (`SMM-` = `KODE_KELAS`) | Format pengumpulan |
| --- | --- | --- |
| TPM 1 | `SMM-tpm1-[Nama Lengkap Peserta]` | PDF |
| TPM 2 | `SMM-tpm2-[Nama Lengkap Peserta]` | Excel/Spreadsheet |
| TPM 3 | `SMM-tpm3-[Nama Lengkap Peserta]` | PDF |
| TPM 4 | `SMM-tpm4-[Nama Lengkap Peserta]` | PNG (semua lembar bila carousel) |
| TPM 5 | `SMM-tpm5-[Nama Lengkap Peserta]` | MP4 |
| TPM 6 | `SMM-tpm6-[Nama Lengkap Peserta]` | PDF berisi screenshot |
| TPM 7 | `SMM-tpm7-[Nama Lengkap Peserta]` | PDF |
| TPM 8 | `SMM-tpm8-[Nama Lengkap Peserta]` | PDF/DOCX |
| Capstone | `SMM-capstone-[Nama Lengkap Peserta]` | PDF (A3) + PPTX |

---

## Lampiran B — Data TikTok Insight (TPM 8)

Periode: **4–10 Agustus 2025**. Satu video edukasi, durasi 15,18 detik. Gunakan angka ini sebagai
satu-satunya acuan benar saat memeriksa klaim numerik peserta.

**Overview Engagement**
| Metrik | Nilai |
| --- | --- |
| Video Views | 79,7K (+145,97%) |
| Profile Views | 1.774 (+152,35%) |
| Likes | 6.860 (+154,45%) |
| Comments | 60 (+650%) |
| Shares | 714 (+146,21%) |

**Followers**
| Metrik | Nilai |
| --- | --- |
| Total Followers | 74.029 |
| New Followers | +1.643 |
| Growth Rate | +2,35% |
| Gender | 67,9% Female, 32,1% Male |
| Top Territories | 98% Indonesia |
| Follower Activity | Puncak jam aktif pukul 8 malam |

**Postingan Video (durasi 15,18 detik)**
| Metrik | Nilai |
| --- | --- |
| Video Views | 137,4K |
| Likes | 24K |
| Comments | 169 |
| Shares | 410 |
| Reached Audience | 124.010 |
| Average Watch Time | 10,3 detik |
| Watched Full Video | 34,62% |
| Video Views by Section | 86% For You Page, 5% Profile, 4% Following |

**Angka turunan yang sah dipakai peserta** (dan berarti mereka menghitung sendiri, bukan
mengarang):

| Turunan | Perhitungan | Hasil |
| --- | --- | --- |
| Likes per views video | 24.000 / 137.400 | 17,5% |
| Komentar per views video | 169 / 137.400 | 0,12% |
| Shares per views video | 410 / 137.400 | 0,3% |
| Watch time terhadap durasi | 10,3 / 15,18 detik | 67,9% |
| Views per orang terjangkau | 137.400 / 124.010 | 1,1 kali |
| Profile views per video views | 1.774 / 79.700 | 2,2% |
| Followers baru per pengunjung profil | 1.643 / 1.774 | 92,6% |

**Jebakan yang harus diwaspadai:** Video Views 79,7K (overview 7 hari) dan Video Views 137,4K
(satu postingan) berasal dari cakupan waktu berbeda — **tidak boleh dijumlahkan atau
dipertukarkan** sebagai angka yang sama.

---

## Lampiran C — Studi Kasus per TPM (Ringkas)

| TPM | Brand | Ringkasan Masalah |
| --- | --- | --- |
| 1-6 | FitActive (pakaian olahraga lokal) | Followers naik, engagement rendah; lanjut ke jadwal tidak konsisten dan konten kurang variasi |
| 7 | HealthyBite (makanan sehat) | Budgeting iklan tidak terencana: over budget di awal, under budget saat scaling |
| 8 | Brand TikTok (tidak disebut namanya) | Satu video edukasi 15 detik, perlu dibaca insight-nya untuk strategi optimasi |
| Capstone | Sanggabiz (jalur mitra) atau UMKM pilihan peserta (jalur sendiri) | Menyusun portofolio Social Media Specialist dari nol memakai satu mitra usaha |

FitActive: brand pakaian olahraga lokal berdiri 2020, fokus gaya hidup aktif & sehat masyarakat
urban. Keunggulan: desain fungsional, bahan breathable berkualitas, harga terjangkau.

HealthyBite: brand makanan sehat lokal (granola, overnight oats, snack rendah kalori), target
usia 18-35 tahun perkotaan, aktif Instagram & Facebook. Total budget campaign Rp10.000.000/14
hari, tiga objective (Awareness, Consideration, Conversion), target audiens di Jakarta, Bandung,
Surabaya, interest healthy lifestyle/diet/gym/snack sehat/meal prep.

Sanggabiz: AI-Tech Consulting berbasis Yogyakarta, model *virtual business partner* berbasis
Department-as-a-Service (Dashboard, SanggaChat, AI Virtual Consulting, SanggaFinance, SanggaHR).
Dipimpin perempuan, program *SanggaTech for Her* menyasar UMKM perempuan, wirausaha muda, dan
penyandang disabilitas. Tantangan: layanan tidak kasatmata, ~9.000 followers Instagram belum
jadi alasan orang menghubungi.
