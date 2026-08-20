# Generator Tugas Praktik Mandiri — Social Media Marketing

Website untuk membantu peserta pelatihan menyelesaikan Tugas Praktik Mandiri **tanpa mengetik dokumen sendiri**.
Peserta cukup memasukkan nama lengkap, lalu memilih jawaban dengan klik. Dokumen final langsung tersusun dan
dapat diunduh sebagai **PDF** dan **DOCX** dengan nama file sesuai ketentuan.

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
Untuk TPM 1 tersedia lebih dari 34 triliun kombinasi dokumen "semua benar", belum termasuk variasi
kalimat pembuka, pengantar tiap bagian, dan penutup.

Tingkat kualitas **tidak pernah ditampilkan kepada peserta**. Ketiga kartu tampil sama saja,
tanpa penanda mana yang benar, sehingga pemilihannya tetap menjadi latihan.

## Kode nilai untuk pemeriksa

Setiap dokumen hasil unduhan memuat kode kecil di kaki halaman, contohnya `fyep-90`.

- `fyep` adalah kode program, sama untuk semua tugas. Diatur di `src/lib/scoring.ts`
  (bisa ditimpa per tugas lewat `programCode` pada definisi tugas).
- Angka setelahnya adalah nilai akhir peserta, 0-100.

Nilai dihitung dari pilihan peserta: jawaban `tepat` bernilai 100, `sebagian` bernilai 50,
`kurang` bernilai 0, lalu dirata-rata dari seluruh pertanyaan dan dibulatkan.
Untuk TPM 1 yang punya 20 pertanyaan, semua benar menghasilkan `fyep-100`,
satu jawaban salah menjadi `fyep-95`, dan seterusnya.

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
      bank.ts       Bank jawaban (20 grup, semua varian per tingkat kualitas)
      index.ts      Studi kasus, instruksi, langkah, dan penyusun dokumen
  lib/
    rng.ts          Pengacak deterministik berbasis seed
    resolve.ts      Menggabungkan pilihan peserta menjadi konteks dokumen
    storage.ts      Simpan/muat localStorage
    template.ts     Pengganti token {{brand}}, {{nama}}, {{kompetitor}}, dst.
    export/pdf.ts   Penulis PDF (jsPDF)
    export/docx.ts  Penulis DOCX (docx)
  components/       Navbar, kartu pilihan, pratinjau dokumen, halaman tugas
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
npm run cek -- cek-variasi 500                              # cek keunikan dokumen antar peserta
npm run cek -- cek-nilai                                    # cek perhitungan kode nilai
npm run cek -- render-pdf 12345 "Putri Amalia" tepat out.pdf   # buat PDF contoh
npm run cek -- render-docx 12345 "Putri Amalia" tepat out.docx # buat DOCX contoh
```

Argumen `tepat` bisa diganti `sebagian` atau `kurang` untuk memeriksa tampilan dokumen
ketika peserta memilih jawaban yang tidak sesuai.

## Ketentuan TPM 1 yang dipenuhi

Tugas ini mengikuti PDF *1.8 Praktik Mandiri 1 - Merancang Strategi Marketing (Target Audiens &
Kompetitor)* dengan studi kasus brand pakaian olahraga lokal **FitActive**, beserta dua template
yang dibagikan ke peserta: *Template Profil Audiens* dan *Template Riset Kompetitor*.

Dokumen hasil unduhan memuat, berurutan:

1. **Segmentasi Audiens** — lima kriteria sesuai template: `geographic`, `sociographic`,
   `demographic`, `behavioral`, dan `psychographic`.
2. **Profil Audiens** — `description`, `key demographic` (Age, Gender, Education, Income),
   `key psychographic` (Values, Interest, Opinions), `customer pain points`, dan
   `key communication channel`.
3. **Riset Konten Kompetitor** — empat langkah: identifikasi kompetitor utama; analisis konten
   pada lima elemen (Elemen Visual, Pesan Utama, Call to Action, Diskon atau Promo, Engagement);
   identifikasi kekuatan dan kelemahan; serta peluang dan ancaman yang menjadi inspirasi.

Nama file mengikuti format `TPM 1 - [Nama Lengkap Peserta]`.

### Bagian screenshot pada template

Template Riset Kompetitor meminta empat gambar: logo brand, tangkapan layar halaman depan akun
Instagram, dan tangkapan layar cuplikan konten feed di tiga langkah. Bagian itu **tidak bisa
diselesaikan dengan klik**, sementara aturan generator ini adalah peserta tidak mengetik atau
menyiapkan apa pun selain nama.

Karena itu baris gambar diganti menjadi tabel hasil pengamatan berbentuk teks:

| Baris asli di template | Diganti menjadi |
| --- | --- |
| Logo Brand Kompetitor | Baris "Identitas Visual Brand" |
| Screenshot halaman depan akun | Tabel berisi isi bio, sorotan, dan kesan tampilan grid |
| Screenshot cuplikan konten feed | Tabel "Konten Feed yang Diamati" (format, tema, pesan, CTA) |

Tabel-tabel itu diberi keterangan *"dicatat dalam bentuk uraian"*, jadi dokumen tidak mengaku
memuat tangkapan layar. Tidak ada tipe blok baru yang ditambahkan — semuanya memakai blok `table`
yang sudah ada, sehingga renderer PDF, DOCX, dan pratinjau tidak perlu diubah.

### Kompetitor pada bank jawaban

Varian `tepat` memakai brand pakaian olahraga lokal yang benar-benar ada beserta akun Instagram
resminya: CoreNation Activewear (`@corenationactive`), Ortuseight (`@ortuseight`), League Indonesia
(`@league_world`), Specs Indonesia (`@specs_indonesia`), dan Aruna Sportswear (`@arunasportswear`).

Analisisnya sengaja dibuat kualitatif. **Tidak ada angka followers, likes, atau engagement rate**
di dalam bank jawaban, karena angka semacam itu akan menjadi klaim karangan tentang perusahaan
nyata dan cepat basi.

### Konsistensi profil audiens dengan segmentasi

`Key Demographic` dan `Key Psychographic` pada profil audiens tidak diacak sendiri, melainkan
mengambil nilainya dari jawaban segmen `demographic` dan `psychographic` lewat token
(`{{age}}`, `{{gender}}`, `{{education}}`, `{{income}}`, `{{values}}`, `{{interest}}`,
`{{opinions}}`). Tanpa ini, profil audiens bisa menyebut "karyawan 24-32 tahun" padahal
segmentasinya menyebut "mahasiswa 18-28 tahun" — pertentangan yang mudah terlihat pemeriksa.
