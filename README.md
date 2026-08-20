# Generator Tugas Praktik Mandiri

Website untuk membantu peserta pelatihan menyelesaikan Tugas Praktik Mandiri **tanpa mengetik dokumen sendiri**.
Peserta cukup memasukkan nama lengkap, lalu memilih jawaban dengan klik. Dokumen final langsung tersusun dan
dapat diunduh sebagai **PDF** dan **DOCX** dengan nama file sesuai ketentuan.

Seluruh data disimpan di **localStorage** peserta — tidak ada server, tidak ada pengiriman data ke mana pun.
Progres tetap ada setelah halaman di-reload, dan tersedia tombol **Reset** untuk mulai dari awal.

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

Tiap tingkat kualitas berisi **banyak varian** jawaban. Saat peserta pertama kali memasukkan namanya,
sistem membuat satu *seed* acak yang disimpan di localStorage. Seed itu menentukan:

1. varian mana yang muncul untuk setiap kartu,
2. urutan tampil ketiga kartu,
3. kalimat pembuka, pengantar tiap bagian, dan penutup dokumen.

Hasilnya, dua peserta yang sama-sama memilih semua jawaban `tepat` tetap menghasilkan dokumen yang berbeda isinya.
Untuk TPM 1 tersedia lebih dari 900.000 kombinasi dokumen "semua benar".

Peserta juga bisa menekan **Acak ulang isi** bila ingin kalimat yang berbeda tanpa kehilangan pilihannya.

Tingkat kualitas **tidak pernah ditampilkan kepada peserta**. Ketiga kartu tampil sama saja,
tanpa penanda mana yang benar, sehingga pemilihannya tetap menjadi latihan.

## Kode nilai untuk pemeriksa

Setiap dokumen hasil unduhan memuat kode kecil di kaki halaman, contohnya `fyep-90`.

- `fyep` adalah kode program, sama untuk semua tugas. Diatur di `src/lib/scoring.ts`
  (bisa ditimpa per tugas lewat `programCode` pada definisi tugas).
- Angka setelahnya adalah nilai akhir peserta, 0-100.

Nilai dihitung dari pilihan peserta: jawaban `tepat` bernilai 100, `sebagian` bernilai 50,
`kurang` bernilai 0, lalu dirata-rata dari seluruh pertanyaan dan dibulatkan.
Untuk TPM 1 yang punya 8 pertanyaan, semua benar menghasilkan `fyep-100`,
satu jawaban salah menjadi `fyep-88`, dan seterusnya.

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
      bank.ts       Bank jawaban (semua varian per tingkat kualitas)
      index.ts      Studi kasus, instruksi, langkah, dan penyusun dokumen
  lib/
    rng.ts          Pengacak deterministik berbasis seed
    resolve.ts      Menggabungkan pilihan peserta menjadi konteks dokumen
    storage.ts      Simpan/muat localStorage
    template.ts     Pengganti token {{seg1}}, {{nama}}, dst.
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

- Empat bagian sesuai PDF: Segmentation (minimal 3 segmen berikut kriteria, karakteristik,
  dan kebutuhan utama), Targeting (1 target utama + alasan), Positioning (strategi +
  positioning statement), dan Visualisasi Strategi (tabel / diagram alur / mind map).
- Nama file mengikuti format `TPM 1 - [Nama Lengkap Peserta]`.
- Ukuran file jauh di bawah batas 10MB (sekitar 15KB untuk PDF).
