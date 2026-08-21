# Generator Tugas Praktik Mandiri — Social Media Marketing

Website untuk membantu peserta pelatihan menyelesaikan Tugas Praktik Mandiri **tanpa mengetik dokumen sendiri**.
Peserta cukup memasukkan nama lengkap, lalu memilih jawaban dengan klik. Dokumen final langsung tersusun dan
dapat diunduh dengan nama file sesuai ketentuan — formatnya menyesuaikan tugasnya: **PDF**, **DOCX**,
**Excel**, atau **PNG**.

Seluruh data disimpan di **localStorage** peserta — tidak ada server, tidak ada pengiriman data ke mana pun.
Nama dan pilihan tetap ada setelah halaman di-reload, dan tersedia tombol **Reset** untuk mulai dari awal
serta tombol **Ubah nama** untuk memperbaiki salah ketik.

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Halaman utama otomatis diarahkan ke tugas pertama.

## Cara kerja bank jawaban

Setiap pertanyaan punya tiga kartu pilihan yang mewakili tiga tingkat kualitas:

| Kualitas | Arti |
| --- | --- |
| `tepat` | Sesuai ketentuan PDF |
| `sebagian` | Setengah benar, ada bagian yang kurang |
| `kurang` | Jauh dari yang diminta PDF |

Tiap tingkat kualitas berisi **banyak varian** jawaban. Setiap kali halaman dimuat, sistem membuat
satu *seed* acak baru. Seed itu menentukan:

1. varian mana yang muncul untuk setiap kartu,
2. urutan tampil ketiga kartu,
3. kalimat pembuka, pengantar tiap bagian, dan penutup dokumen.

Seed **tidak disimpan**, jadi setiap orang yang membuka halaman ini mendapat isi jawaban yang berbeda,
dan membuka ulang halaman pun menghasilkan susunan baru. Yang disimpan di localStorage hanya nama dan
pilihan peserta, sehingga progres tidak hilang saat halaman dimuat ulang meski kalimatnya berganti.

Hasilnya, dua peserta yang sama-sama memilih semua jawaban `tepat` tetap menghasilkan dokumen yang berbeda isinya.
Untuk TPM 1 tersedia lebih dari 6 miliar kombinasi dokumen "semua benar".

Tingkat kualitas **tidak pernah ditampilkan kepada peserta**. Ketiga kartu tampil sama saja,
tanpa penanda mana yang benar, sehingga pemilihannya tetap menjadi latihan.

## Kode nilai untuk pemeriksa

Setiap dokumen hasil unduhan memuat kode kecil di kaki halaman, contohnya `fyep-90`.

- `fyep` adalah kode program, sama untuk semua tugas. Diatur di `src/lib/scoring.ts`
  (bisa ditimpa per tugas lewat `programCode` pada definisi tugas).
- Angka setelahnya adalah nilai akhir peserta, 0-100.

Nilai dihitung dari pilihan peserta: jawaban `tepat` bernilai 100, `sebagian` bernilai 50,
`kurang` bernilai 0, lalu dirata-rata dari seluruh pertanyaan dan dibulatkan.
Untuk TPM 1 yang punya 14 pertanyaan, semua benar menghasilkan `fyep-100`,
satu jawaban salah menjadi `fyep-93`, dan seterusnya.

Kode dicetak dengan ukuran 5,5pt berwarna abu sangat muda di pojok kanan bawah setiap halaman:
terbaca bila dicari, tetapi tidak mencolok. Kode yang sama juga disalin ke metadata berkas
(properti *Keywords* pada PDF maupun DOCX), sehingga pemeriksa dapat membacanya secara massal
tanpa membuka satu per satu. Jalankan di folder berisi kumpulan berkas peserta:

```bash
for f in *.pdf; do printf '%s\t%s\n' "$(grep -a -o '/Keywords ([^)]*)' "$f" | head -1 | sed 's|/Keywords (||; s|)$||')" "$f"; done
```

Untuk DOCX:

```bash
for f in *.docx; do printf '%s\t%s\n' "$(unzip -p "$f" docProps/core.xml | sed -n 's|.*<cp:keywords>\([^<]*\)</cp:keywords>.*|\1|p')" "$f"; done
```

Kode ini **tidak muncul di layar peserta** sama sekali, termasuk di pratinjau dokumen.
Periksa perhitungannya dengan:

```bash
npm run cek -- cek-nilai
```

## Struktur

```
src/
  tasks/
    types.ts        Tipe inti seluruh tugas
    registry.ts     Daftar tugas + jumlah slot navbar
    tpm-1/
      bank.ts       Bank jawaban (14 grup, semua varian per tingkat kualitas)
      index.ts      Studi kasus, instruksi, langkah, dan penyusun dokumen
    tpm-2/
      bank.ts       Bank jawaban (9 grup)
      index.ts      Penyusun dokumen PDF sekaligus lembar kerja Excel
    tpm-3/
      bank.ts       Bank jawaban (8 grup, satu di antaranya tanpa penilaian)
      index.ts      Melanjutkan content plan TPM 2 lewat dependsOn
    tpm-4/
      bank.ts       Bank jawaban (6 grup: format, layout, warna, teks, safe zone, finalisasi)
      index.ts      Pola desain ala unggahan media sosial + resep Canva, melanjutkan TPM 3
    tpm-7/
      bank.ts       Bank jawaban (9 grup, studi kasus berdiri sendiri)
      index.ts      Penghitung plotting budget 14 hari + penyusun PDF dan Excel
  lib/
    rng.ts          Pengacak deterministik berbasis seed
    resolve.ts      Menggabungkan pilihan peserta menjadi konteks dokumen
    storage.ts      Simpan/muat localStorage
    template.ts     Pengganti token {{brand}}, {{nama}}, {{kompetitor}}, dst.
    export/pdf.ts   Penulis PDF (jsPDF)
    export/docx.ts  Penulis DOCX (docx)
    export/xlsx.ts  Penulis Excel (exceljs)
    export/png.ts   Penggambar desain ke canvas, dipakai pratinjau dan unduhan
    export/assets.ts   Logo Plan dan potret audiens (base64, khusus ekspor)
    export/poppins.ts  Font Poppins subset Latin (base64, khusus PDF)
  components/       Navbar, kartu pilihan, pratinjau dokumen, pratinjau desain,
                    panel Brand Guideline, halaman tugas
```

Model dokumen (`DocBlock`) ditulis sekali, lalu dipakai tiga renderer sekaligus:
pratinjau di layar, PDF, dan DOCX. Menambah jenis blok baru cukup dilakukan di tiga tempat itu.

## Menambah Tugas 2 sampai 8

1. Salin folder `src/tasks/tpm-1` menjadi `src/tasks/tpm-2`.
2. Sesuaikan `index.ts`: `id`, `navLabel`, `code`, `title`, `meta`, `caseStudy`,
   `instructionSummary`, `submission.fileName`, `steps`, dan `buildDocument`.
3. Tulis ulang `bank.ts` dengan varian jawaban tugas baru. Usahakan minimal 4-6 varian
   untuk tiap tingkat kualitas agar hasil antar peserta tetap berbeda.
4. Daftarkan di `src/tasks/registry.ts`:

```ts
import tpm2 from "./tpm-2";
export const TASKS: TaskDefinition[] = [tpm1, tpm2];
```

Selesai. Navbar, penyimpanan localStorage, pratinjau, dan ekspor PDF/DOCX otomatis mengikuti.
Slot navbar yang belum terisi tampil sebagai "Tugas N" terkunci sampai tugasnya didaftarkan.

## Skrip pemeriksaan

```bash
npm run cek -- cek-variasi tpm-1 500     # cek keunikan dokumen antar peserta
npm run cek -- cek-nilai tpm-2           # cek perhitungan kode nilai
npm run cek -- render-pdf tpm-1 12345 "Putri Amalia" tepat out.pdf     # PDF contoh
npm run cek -- render-docx tpm-1 12345 "Putri Amalia" tepat out.docx   # DOCX contoh
npm run cek -- render-xlsx tpm-2 12345 "Putri Amalia" tepat out.xlsx   # Excel contoh
npm run cek -- render-halaman tpm-4 12345 "Putri Amalia" tepat hal     # pecah PDF per halaman
npm run cek -- cek-safezone                                            # cek batas aman desain TPM 4
npm run cek -- cek-budget 400                                          # cek aritmetika budget TPM 7
```

`render-halaman` ada karena `qlmanage` di macOS hanya merender halaman pertama sebuah PDF.
Skrip ini menulis `hal-1.pdf`, `hal-2.pdf`, dan seterusnya, sehingga tiap halaman bisa
diperiksa tampilannya satu per satu.

Argumen `tepat` bisa diganti `sebagian` atau `kurang` untuk memeriksa tampilan dokumen
ketika peserta memilih jawaban yang tidak sesuai.

## Format unduhan berbeda tiap tugas

Setiap tugas menentukan sendiri format berkasnya lewat `downloads` pada definisi tugas.
**Format pertama pada daftar adalah format pengumpulannya**, dipakai untuk contoh nama berkas
di layar dan tampil sebagai tombol utama.

| Tugas | `downloads` | Format pengumpulan |
| --- | --- | --- |
| TPM 1 | `["pdf", "docx"]` | PDF |
| TPM 2 | `["xlsx", "pdf"]` | Excel |
| TPM 3 | `["pdf", "docx"]` | PDF |
| TPM 4 | `["png", "pdf"]` | PNG |
| TPM 7 | `["pdf", "xlsx"]` | PDF |

Tugas yang menyertakan `"xlsx"` wajib punya `buildWorkbook`, yang menghasilkan `SheetSpec[]`
berisi nama sheet, lebar kolom, dan baris berisi sel bergaya. Warna gayanya diambil dari
`styles.xml` berkas template: biru `0072CE`, kuning `FFD500`, dan krem `FFF2CC`.

## Ketentuan TPM 2 yang dipenuhi

Mengikuti PDF *2.17 Praktik Mandiri 2 - Merancang Content Calendar & Content Plan* beserta
*Template Content Calendar dan Plan*. Studi kasusnya masih FitActive, tetapi masalahnya berbeda:
jadwal posting tidak konsisten dan jenis kontennya kurang bervariasi.

Berkas Excel hasil unduhan memuat dua sheet, sama seperti template:

1. **Content Calendar** — grid satu bulan (September 2025). Baris nama hari, tanggal, jam unggah,
   dan rencana konten. Sesuai instruksi, hanya minggu pertama (tanggal 1-7) yang terisi;
   sisa bulan dibiarkan kosong seperti template.
2. **Content Plan** — 13 kolom sesuai template, berisi 3 hari pertama (1-3 September 2025).

Sembilan pertanyaannya mengikuti unit yang diminta instruksi: marketing objective, content pillar,
jam unggah sepekan, rencana konten sepekan, tiga kartu content plan harian, pembagian PIC, dan
alur status konten.

Kolom yang berulang di content plan — Marketing Objective, Pilar Konten, PIC, Jam Posting, dan
Status Konten — diambil dari jawaban bagian lain lewat token, bukan diacak sendiri, sehingga
rencana harian tidak pernah bertentangan dengan objective dan jadwal yang sudah ditetapkan.

Kolom *Link Hasil Konten* berisi "Diisi setelah konten tayang", karena pada tahap perencanaan
kolom itu memang belum bisa diisi.

## Tugas yang melanjutkan tugas sebelumnya

TPM 3 mengembangkan salah satu konten dari content plan TPM 2, sesuai instruksinya. Rantai itu
diatur lewat `dependsOn` pada definisi tugas:

- `TaskDefinition.dependsOn` berisi id tugas prasyarat.
- Halaman tugas membaca jawaban tugas itu dari localStorage lalu membangun konteksnya, dan
  menyediakannya sebagai `ctx.sumber`. Jawaban di sana sudah terkunci lewat `variantId`, jadi
  isinya sama persis dengan yang dulu dilihat peserta.
- Selama tugas prasyarat belum lengkap, pertanyaannya tidak ditampilkan. Yang muncul hanya
  pemberitahuan beserta tautan menuju tugas itu.

Data localStorage tidak pernah dihapus kecuali peserta menekan tombol **Reset**, sehingga
jawaban TPM 2 tetap tersedia saat ia mengerjakan TPM 3 berhari-hari kemudian.

### Grup tanpa penilaian

Pertanyaan "pilih konten mana yang mau dikembangkan" tidak punya jawaban benar atau salah, jadi
grupnya ditandai `ungraded: true`. Grup seperti ini tetap wajib dijawab, tetapi tidak ikut
menghitung nilai, dan kartunya menampilkan **seluruh varian sekaligus** — bukan tiga tingkat
kualitas seperti grup biasa.

## Ketentuan TPM 3 yang dipenuhi

Mengikuti PDF *2.18 Praktik Mandiri 3 - Merancang Rencana Konten & Copywriting*. Tidak ada berkas
template untuk tugas ini, jadi dokumennya memakai tata letak yang sama dengan TPM 1 dan TPM 2:
A4 lanskap, font Poppins, logo Plan di pojok kanan atas, label biru di atas blok kuning.

Delapan pertanyaannya: pilih konten dari content plan, hook, visual hook, storytelling, UGC,
ide visual, caption beserta formulanya, dan pemeriksaan kesesuaian dengan objective.

Daftar pilih konten menampilkan ringkasannya saja — hari, tanggal, judul, pilar, tipe visual, dan
platform. Rincian lengkap content plan-nya dibuka lewat "Lihat detail", supaya daftarnya tetap
enak dibaca. Membuka detail tidak ikut memilih kartunya.

Setelah peserta memilih, seluruh pertanyaan berikutnya menyebut konten itu secara langsung, dan
jawaban yang tersedia merujuk pada pilar, tipe visual, serta objective yang sudah ia tetapkan
sendiri di tugas-tugas sebelumnya.

Caption ditulis memakai salah satu formula yang diminta instruksi: AIDA, FAB, PAS, atau ACCA.
Strukturnya sengaja ditulis eksplisit di dalam naskah supaya penerapan formulanya bisa diperiksa.

## Ketentuan TPM 7 yang dipenuhi

Mengikuti PDF *4.11 Praktik Mandiri 2 - Membuat Budgeting Campaign*, yang di halaman pertamanya
menyebut dirinya **Praktik Mandiri 7**, beserta berkas *Studi Kasus Budgeting Campaign* dan
*Template Budgeting Campaign*.

### Tugas ini sengaja tidak menyambung ke tugas sebelumnya

TPM 1 sampai TPM 4 memakai brand **FitActive** dan saling menyambung lewat `dependsOn`. TPM 7
tidak, karena studi kasusnya menetapkan brand yang berbeda — **HealthyBite**, brand makanan
sehat — lengkap dengan budget Rp10.000.000, durasi 14 hari, tiga objective, dan target audiens
sendiri. Instruksinya pun berbunyi "gunakan studi kasus berikut sebagai dasar".

Menyambungkan tugas ini ke content plan FitActive justru akan bertentangan dengan instruksinya,
jadi `dependsOn` sengaja dikosongkan dan banknya tidak memakai token dari tugas lain.

### Tabel plotting dihitung, bukan dipilih

Peserta tidak memilih 14 angka satu per satu. Yang dipilih adalah strateginya — persentase tiap
objective, jumlah hari fase testing, dan bentuk kurva belanja — lalu tabel 14 harinya dihitung
dari ketiga jawaban itu.

Urutan perhitungannya: kurva belanja harian dibuat lebih dahulu untuk seluruh durasi, lalu
hari-harinya dipotong menjadi tiga tahap. Pembagian hari antar tahap dicari menyeluruh dari
semua kemungkinan, dan yang dipilih adalah pembagian yang paling sedikit membuat belanja harian
turun. Tanpa pencarian itu, kurvanya berbentuk gergaji — naik lalu jatuh setiap pindah tahap —
dan itu bertentangan dengan alasan yang dipilih peserta sendiri.

Dua sifat yang dijaga sekaligus:

1. **Total selalu tepat Rp10.000.000** untuk 14 hari, dan total tiap objective persis sama
   dengan persentase yang tertulis di tabel strategi awal. Sisa pembulatan diletakkan pada hari
   terakhir tiap tahap.
2. **Kurva belanjanya tidak pernah turun tajam** pada pola yang menjanjikan kenaikan.

Keduanya diperiksa `npm run cek -- cek-budget`, untuk seluruh tingkat kualitas jawaban maupun
campurannya — bukan sekadar satu contoh. Dokumen budgeting yang angkanya tidak pas tidak ada
gunanya, jadi sifat ini diperlakukan sebagai syarat, bukan harapan.

### Format dokumen mengikuti template

Ketiga bagian template diikuti apa adanya: tabel *Strategi Budgeting Awal* berisi lima
pertanyaan yang sama persis kalimatnya, tabel *Plotting Budget Campaign* dengan empat kolom
berkepala biru dan 14 baris hari, lalu *Alasan Pemilihan Strategi* beserta kalimat pengantarnya.

Dua penambahan kecil pada mesin dokumen dipakai di sini:

- blok `note`, untuk kalimat pengantar biasa di antara label dan tabelnya;
- `labelWidth` pada `fieldTable`, karena lebar kolom label tiap template berbeda — template ini
  memakai 24,6% sedangkan template TPM 1 memakai 21,33%.

### Nomor tugas boleh melompat

TPM 5 dan TPM 6 belum ada, tetapi TPM 7 sudah. Navbar kini disusun menurut nomor tugas, bukan
urutan pendaftaran, sehingga slot 5 dan 6 tetap tampil sebagai "segera hadir" di tempatnya dan
TPM 7 duduk di slot ketujuh.

## Ketentuan TPM 4 yang dipenuhi

Mengikuti PDF *2.24 Praktik Mandiri 4 - Mendesain Konten Visual di Canva* beserta berkas
*Brand Guideline*. Tugas ini melanjutkan TPM 3 lewat `dependsOn`, jadi desainnya dibuat dari
konten yang peserta pilih dan kembangkan sendiri di tugas sebelumnya.

### Tata letak meniru unggahan sungguhan

Desainnya disusun dari pola yang biasa dipakai di beranda, bukan dari kotak dan teks polos:
label pilar berbentuk stiker di kiri atas, wordmark di kanan atas, judul dengan blok warna di
belakang tiap barisnya, tombol ajakan berbentuk pil, lalu kaki desain berisi nama akun dan
titik penanda halaman. Dua unsur terakhir itu yang paling membedakan tampilan unggahan dari
sekadar salindia.

Pertanyaan tata letak sengaja hanya menyediakan **enam pola**, bukan daftar panjang. Variasi
tampilannya datang dari tempat lain:

| Sumber variasi | Pengaruhnya pada desain |
| --- | --- |
| Jawaban tata letak peserta | Rupa sampul: judul disorot, blok warna bawah, atau kotak perbandingan |
| Tipe visual pada TPM 3 | Ukuran kanvas (1:1 atau 9:16) dan jumlah lembar carousel |
| Pilar, objective, dan tipe konten | Bentuk lembar isi carousel: kartu bernomor, daftar bertanda, atau kutipan |
| Caption yang disusun di TPM 3 | Naskah tiap lembar isi, satu bagian formula copywriting per lembar |

Karena itu dua peserta yang memilih tata letak sama tetap memperoleh carousel yang berbeda bila
konten yang mereka kembangkan di tugas sebelumnya berbeda.

Naskah lembar isi diambil dari caption TPM 3 dengan label formulanya dibuang lebih dulu:
unggahan sungguhan tidak mencetak kata "Attention" di atas gambar. Bila bagian captionnya lebih
sedikit daripada jumlah lembar, kalimat pada keterangan pendukung ikut dipakai supaya tidak ada
dua lembar yang isinya persis sama.

Ukuran huruf tidak dipatok tetap. Canvas baru bisa mengukur teks saat menggambar, sedangkan tata
letak harus ditentukan lebih awal, jadi tinggi tiap blok ditaksir lebih dulu — sengaja ditaksir
lebih lebar dari kenyataan — lalu ukurannya dikecilkan sampai muat. Naskah panjang mengecil
sendiri, bukan menabrak unsur di bawahnya.

Pada kanvas 9:16 batas amannya lebih dalam di atas dan bawah daripada di kiri-kanan, mengikuti
antarmuka Reels dan Story yang menutupi kedua ujung layar.

### Desain dibuat di sini, resep Canva tetap diberikan

Peserta tidak perlu keluar ke Canva: situs menggambar desainnya sendiri ke canvas lalu
mengunduhnya sebagai PNG pada ukuran tayang sebenarnya. Untuk carousel, jumlah lembarnya
mengikuti tipe visual pada rancangan TPM 3, dibatasi 2 sampai 6 lembar.

PDF pendampingnya berisi **Resep Canva**: sepuluh langkah lengkap dengan ukuran kanvas, kode
hex, ukuran font, dan posisi x/y tiap unsur. Angka-angka pada resep itu **dibaca balik dari
lembar yang benar-benar digambar**, bukan ditulis ulang secara terpisah, jadi resep dan
gambarnya tidak mungkin berbeda meskipun pola tata letaknya berubah. Langkah ajakan bahkan
dibaca dari lembar penutup carousel, bukan dari sampulnya.

Perlu dicatat: salah satu capaian yang dinilai instruksi aslinya adalah "mengoperasikan tools
desain dan fitur-fitur Canva". Menggambar di situs ini melewati capaian tersebut. Berkas yang
dikumpulkan sendiri sama saja, karena instruksinya hanya meminta ekspor PNG — resep Canva
disediakan supaya peserta yang mau tetap bisa melatih fiturnya sendiri.

### Brand Guideline tampil di layar

Palet resmi beserta kode hex-nya dan pasangan fontnya (judul Poppins, teks Arial) ditampilkan
sebagai panel tersendiri sebelum daftar pertanyaan, lewat `brandGuide` pada definisi tugas.
Seluruh pilihan warna pada bank jawaban hanya memakai warna dari palet itu.

Semua kombinasi warna pada jawaban tingkat **tepat** punya rasio kontras teks minimal 4,5:1.
Kombinasi pada tingkat *sebagian* dan *kurang* sengaja lebih rendah — itulah yang membedakan
tingkatannya — dan hasilnya digambar apa adanya supaya peserta melihat sendiri akibatnya.

### Wordmark dan safe zone

Setiap lembar membawa wordmark FitActive di sudut kanan atas, menyeimbangkan label pilar di
kiri. Pratinjau di layar bisa menampilkan garis putus-putus safe zone, dan persentasenya
mengikuti jawaban peserta.

Brand FitActive tidak punya berkas logo, jadi wordmark-nya ditulis sebagai teks Poppins Bold.

## Ketentuan TPM 1 yang dipenuhi

Tugas ini mengikuti PDF *1.8 Praktik Mandiri 1 - Merancang Strategi Marketing (Target Audiens &
Kompetitor)* dengan studi kasus brand pakaian olahraga lokal **FitActive**, beserta dua template
yang dibagikan ke peserta: *Template Profil Audiens* dan *Template Riset Kompetitor*.

### Format dokumen mengikuti template resmi

Dokumen hasil unduhan dibuat semirip mungkin dengan template Plan International:

| Unsur | Nilai, diambil langsung dari berkas template |
| --- | --- |
| Ukuran halaman | A4 **lanskap**, margin 1 inci (sesuai `sectPr` template) |
| Font | **Poppins**, disematkan ke PDF dari `@fontsource/poppins` (SIL OFL) |
| Biru | `#0072CE` — garis tabel, kepala tabel, teks label |
| Kuning | `#FFD500` — blok di belakang label bagian |
| Hijau / salem / langit | `#D6D839`, `#F47A68`, `#58CAE8` — tiga blok pada kartu profil |
| Abu | `#999999` — baris nama peserta |
| Logo | Logo Plan International asli dari template, di pojok kanan atas tiap halaman |
| Potret audiens | Foto dari Unsplash, lisensinya bebas dipakai tanpa atribusi |

Susunan dokumen mengikuti urutan template: judul rata tengah dengan kata *Brand* dicetak miring,
label bagian di atas blok kuning, lalu tabel bergaris biru. Halaman pertama memuat Segmentasi
Audiens dan kartu Profil Audiens; halaman berikutnya memuat Riset Kompetitor Langkah 1 sampai 4.

Nama peserta dicetak sebagai satu baris kecil abu di bawah judul, karena template tidak
menyediakan kolomnya. Kode nilai `fyep-NN` tetap tercetak sangat kecil di kaki tiap halaman dan
disalin ke metadata berkas.

### Bagian screenshot pada template

Template Riset Kompetitor meminta empat gambar: logo brand, tangkapan layar halaman depan akun
Instagram, dan tangkapan layar cuplikan konten feed di tiga langkah. Bagian itu **tidak bisa
diselesaikan dengan klik**, sementara aturan generator ini adalah peserta tidak menyiapkan apa pun
selain nama. Baris gambar diganti catatan pengamatan berbentuk teks pada posisi kolom yang sama:

| Baris asli di template | Diganti menjadi |
| --- | --- |
| Logo *Brand* Kompetitor | Baris "Identitas Visual *Brand* Kompetitor" |
| *Screenshot* halaman depan akun | Baris "Pengamatan Halaman Depan Akun": kategori, isi bio, sorotan, kesan grid |
| *Screenshot* cuplikan konten feed | Kolom "Pengamatan Beberapa Konten *Feed*": daftar konten beserta format, tema, pesan, dan CTA |

Kolom pengamatan mengalir antarhalaman bila isinya panjang, jadi tidak ada teks yang terpotong.

### Pertanyaan mengikuti unit visual pada template

Setiap bagian yang di template tampil sebagai **satu unit visual** dijadikan **satu pilihan**,
bukan beberapa pertanyaan terpisah:

| Bagian template | Jumlah pertanyaan |
| --- | --- |
| Segmentasi Audiens (tabel 5 baris) | 5 |
| Profil Audiens (satu kartu) | 1 |
| Langkah 1: identifikasi kompetitor | 1 |
| Langkah 2: analisis konten (5 elemen) | 5 |
| Langkah 3: kekuatan + kelemahan (satu tabel) | 1 |
| Langkah 4: peluang + inspirasi (satu tabel) | 1 |

Totalnya 14 pertanyaan. Kartu Profil Audiens memuat potret, description, key demographic, key
psychographic, customer pain points, dan key communication channel sekaligus. Kartu Langkah 3 dan
4 memuat dua blok berlabel dalam satu kartu.

Penggabungan mengurangi jumlah kombinasi, jadi jumlah varian pada grup gabungan dibuat lebih
banyak. Uji `cek-variasi 500` tetap menghasilkan 100% dokumen unik.

### Potret audiens

Enam potret pada kartu profil diunduh dari **Unsplash**, yang lisensinya membebaskan pemakaian
termasuk untuk keperluan komersial tanpa kewajiban atribusi. Fotonya dipotong persegi pada wajah,
diperkecil ke 320px, dan disimpan sebagai JPEG di `public/plan/foto-a1.jpg` sampai `foto-a6.jpg`.
Ganti berkas itu bila ingin memakai foto sendiri; nama berkasnya yang dipakai kode, bukan isinya.

### Konsistensi profil audiens dengan segmentasi

`Key Demographic` dan `Key Psychographic` tidak diacak sendiri, melainkan mengambil nilainya dari
jawaban segmen `demographic` dan `psychographic` lewat token (`{{age}}`, `{{gender}}`,
`{{education}}`, `{{income}}`, `{{values}}`, `{{interest}}`, `{{opinions}}`). Tanpa ini, profil
audiens bisa menyebut "karyawan 24-32 tahun" padahal segmentasinya menyebut "mahasiswa 18-28
tahun" — pertentangan yang mudah terlihat pemeriksa.

### Kompetitor pada bank jawaban

Varian `tepat` memakai brand pakaian olahraga lokal yang benar-benar ada beserta akun Instagram
resminya: CoreNation Activewear (`@corenationactive`), Ortuseight (`@ortuseight`), League Indonesia
(`@league_world`), Specs Indonesia (`@specs_indonesia`), dan Aruna Sportswear (`@arunasportswear`).

Analisisnya sengaja dibuat kualitatif. **Tidak ada angka followers, likes, atau engagement rate**
di dalam bank jawaban, karena angka semacam itu akan menjadi klaim karangan tentang perusahaan
nyata dan cepat basi.

### Catatan ukuran teks

Isi jawaban jauh lebih panjang daripada teks contoh `[Tulis jawaban kamu di sini]` pada template.
Judul, label, dan kepala tabel memakai ukuran yang sama persis dengan template, sedangkan isi
jawaban dirapatkan (10-11pt) agar dokumen tidak membengkak menjadi puluhan halaman. Dokumen
"semua tepat" berakhir sekitar 9 halaman.
