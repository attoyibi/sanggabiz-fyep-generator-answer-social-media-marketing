import type { ChoiceGroup } from "../types";

/**
 * BANK JAWABAN TPM 8 — Membaca & Menganalisis TikTok Insight.
 *
 * Studi kasusnya berdiri sendiri: satu berkas data TikTok Insight periode
 * 4-10 Agustus 2025, bukan lanjutan tugas sebelumnya.
 *
 * Seluruh angka pada jawaban diambil apa adanya dari berkas data itu, termasuk
 * angka turunannya. Beberapa yang sering dipakai:
 *   likes/views video 17,5%   komentar/views 0,12%   shares/views 0,3%
 *   watch time 10,3 dari 15,18 detik (67,9%)   tuntas 34,62%
 *   profile views 1.774 dari 79,7K views (2,2%)   follow/profil 92,6%
 *
 * Token: {{nama}}, {{periode}}.
 */

/* ================================================================== */
/* 1. PERFORMA ENGAGEMENT                                             */
/* ================================================================== */

const engagement: ChoiceGroup = {
  id: "engagement",
  label: "Data Engagement",
  question: "Bagaimana performa data engagement-nya?",
  hint: "Bacalah angkanya apa adanya: mana yang naik, seberapa besar, dan apa artinya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "en1a",
          headline: "Naik menyeluruh, tetapi komentar tertinggal jauh",
          fields: {
            isi: "Seluruh metrik engagement naik lebih dari 145% dibanding periode sebelumnya: video views 79,7K (+145,97%), likes 6.860 (+154,45%), shares 714 (+146,21%), dan profile views 1.774 (+152,35%). Comments memang naik paling tinggi (+650%), tetapi angkanya hanya 60 — sekitar 0,87% dari jumlah likes. Jadi kenaikannya menyeluruh, dengan komentar sebagai satu-satunya metrik yang besarnya masih tertinggal.",
          },
          points: [
            "Menyebut angka dan persentase apa adanya dari data, bukan kesan umum.",
            "Membedakan kenaikan persentase yang besar dari angka mutlak yang masih kecil.",
            "Membandingkan komentar dengan likes sehingga ketertinggalannya terukur.",
            "Kesimpulannya bisa langsung dipakai pada bagian kekuatan dan kelemahan.",
          ],
        },
        {
          id: "en1b",
          headline: "Lonjakan komentar 650% berasal dari basis yang sangat kecil",
          fields: {
            isi: "Comments tercatat naik +650%, jauh melebihi metrik lain yang naik di kisaran 146-155%. Namun angka akhirnya hanya 60 komentar, artinya periode sebelumnya hanya sekitar 8 komentar. Persentase sebesar itu wajar terjadi ketika basisnya kecil, sehingga yang lebih layak dibaca adalah angka mutlaknya, bukan persentasenya.",
          },
          points: [
            "Menghitung balik basis periode sebelumnya dari persentase kenaikannya.",
            "Menjelaskan kenapa persentase besar pada angka kecil mudah menyesatkan.",
            "Menahan diri menyimpulkan komentar sebagai kekuatan hanya karena persentasenya.",
            "Menyarankan angka mutlak sebagai dasar pembacaan yang lebih jujur.",
          ],
        },
        {
          id: "en1c",
          headline: "Profile views naik, dan hampir semuanya berubah jadi followers",
          fields: {
            isi: "Profile views mencapai 1.774 (+152,35%) pada periode yang sama dengan penambahan 1.643 followers baru. Artinya sekitar 92,6% orang yang membuka profil memutuskan mengikuti akun. Angka engagement lain juga naik di kisaran 146-155%, tetapi hubungan profile views dengan followers inilah yang paling menonjol.",
          },
          points: [
            "Menghubungkan dua metrik dari bagian berbeda, bukan membaca satu per satu.",
            "Menghitung rasio konversinya sehingga temuan itu terukur.",
            "Menunjukkan profil akun sudah meyakinkan bagi yang sempat membukanya.",
            "Menyiapkan dasar untuk strategi mengarahkan penonton ke profil.",
          ],
        },
        {
          id: "en1d",
          headline: "Kenaikan serentak menandakan satu konten yang menembus FYP",
          fields: {
            isi: "Video views, likes, shares, dan profile views naik hampir bersamaan pada kisaran 146-155%. Pola kenaikan yang serentak seperti ini biasanya berasal dari satu konten yang terdistribusi luas, bukan dari perbaikan merata di semua konten. Dugaan itu cocok dengan data video yang 86% penayangannya berasal dari For You Page.",
          },
          points: [
            "Membaca pola kenaikan, bukan hanya besarnya masing-masing angka.",
            "Mengaitkan pembacaan engagement dengan data distribusi videonya.",
            "Menahan kesimpulan bahwa seluruh konten membaik.",
            "Dugaannya bisa diperiksa lewat data per konten pada periode berikutnya.",
          ],
        },
        {
          id: "en1e",
          headline: "Likes memimpin, shares dan komentar jauh di bawahnya",
          fields: {
            isi: "Dari sisi jumlah, likes 6.860 jauh melampaui shares 714 dan comments 60. Susunan seperti ini wajar karena likes paling mudah dilakukan, tetapi jarak antara likes dan shares yang mencapai sembilan kali lipat menunjukkan audiens menikmati kontennya tanpa merasa perlu meneruskannya ke orang lain.",
          },
          points: [
            "Menyusun metrik menurut besarnya sehingga urutannya terbaca.",
            "Menjelaskan alasan wajar di balik susunan itu sebelum menilainya.",
            "Menghitung jaraknya sehingga penilaiannya tidak sekadar perasaan.",
            "Menunjuk shares sebagai metrik yang layak dikejar berikutnya.",
          ],
        },
        {
          id: "en1f",
          headline: "Periode overview dan periode video tidak boleh dijumlahkan",
          fields: {
            isi: "Overview engagement mencatat video views 79,7K untuk periode 4-10 Agustus 2025, sedangkan satu postingan video tercatat 137,4K views. Angka video lebih besar karena dihitung sepanjang umur postingannya, bukan hanya di dalam periode tujuh hari itu. Keduanya perlu dibaca terpisah dan tidak dijumlahkan.",
          },
          points: [
            "Menyadari kedua angka berasal dari cakupan waktu yang berbeda.",
            "Mencegah kesalahan menjumlahkan data yang tidak setara.",
            "Menjelaskan sebabnya, bukan sekadar menyebut angkanya berbeda.",
            "Menjaga seluruh analisis berikutnya memakai pembanding yang tepat.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "en2a",
          headline: "Semua metrik naik, jadi engagement sudah baik",
          fields: {
            isi: "Semua metrik engagement naik di atas 145% dan comments bahkan naik 650%. Dengan kenaikan sebesar itu di seluruh metrik, performa engagement periode ini bisa disebut sudah baik dan tidak ada yang perlu dikhawatirkan.",
          },
          points: [
            "Benar bahwa seluruh metrik memang naik dibanding periode sebelumnya.",
            "Persentase kenaikan tidak memperlihatkan besar angka sebenarnya.",
            "Comments 60 tetap kecil meskipun persentasenya paling tinggi.",
            "Kesimpulan tanpa kelemahan membuat bagian berikutnya kehilangan bahan.",
          ],
        },
        {
          id: "en2b",
          headline: "Comments paling menonjol karena kenaikannya terbesar",
          fields: {
            isi: "Comments adalah metrik dengan kenaikan terbesar, yaitu 650%, jauh melebihi metrik lain yang hanya naik sekitar 150%. Karena itu komentar bisa disebut sebagai metrik terkuat pada periode ini.",
          },
          points: [
            "Benar bahwa 650% adalah kenaikan terbesar di antara semua metrik.",
            "Angkanya hanya 60, terkecil di antara seluruh metrik engagement.",
            "Persentase dari basis kecil tidak sebanding dengan persentase dari basis besar.",
            "Menyebutnya terkuat akan menyesatkan penyusunan strategi berikutnya.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "en3a",
          headline: "Engagement bagus karena angkanya besar semua",
          fields: {
            isi: "Angka engagement periode ini terlihat besar, mulai dari puluhan ribu views sampai ribuan likes, sehingga performanya bisa dibilang bagus. Konten seperti ini tinggal dilanjutkan saja pada periode berikutnya.",
          },
          points: [
            "Angka yang besar memang terlihat menyenangkan pada laporan.",
            "Besar kecilnya angka tidak berarti apa-apa tanpa pembanding.",
            "Tidak ada satu pun angka yang dikutip dari data.",
            "Instruksi meminta pembacaan metrics, bukan kesan umum.",
          ],
        },
        {
          id: "en3b",
          headline: "Engagement kurang karena komentarnya cuma 60",
          fields: {
            isi: "Komentar hanya 60 selama tujuh hari, jadi performa engagement periode ini kurang baik. Audiens jelas tidak tertarik dengan konten yang diunggah.",
          },
          points: [
            "Benar bahwa 60 komentar tergolong kecil.",
            "Satu metrik dipakai menilai seluruh performa engagement.",
            "Likes 6.860 dan shares 714 yang sama-sama naik diabaikan.",
            "Kesimpulan audiens tidak tertarik bertentangan dengan datanya sendiri.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 2. PERFORMA FOLLOWERS                                              */
/* ================================================================== */

const followers: ChoiceGroup = {
  id: "followers",
  label: "Data Followers",
  question: "Bagaimana performa data followers-nya?",
  hint: "Selain jumlahnya, data followers memuat gender, lokasi, dan jam aktif.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "fo1a",
          headline: "Tumbuh 2,35% dalam sepekan dengan konversi profil sangat tinggi",
          fields: {
            isi: "Followers bertambah 1.643 menjadi 74.029, setara pertumbuhan 2,35% dalam sepekan. Pada periode yang sama profile views tercatat 1.774, artinya sekitar 92,6% pengunjung profil berakhir menjadi followers. Pertumbuhannya sehat, dan hambatannya bukan pada profil melainkan pada sedikitnya orang yang sampai membuka profil.",
          },
          points: [
            "Menyebut angka pertumbuhan sekaligus jumlah akhirnya.",
            "Menghubungkan followers baru dengan profile views, bukan membacanya sendiri.",
            "Menunjukkan letak hambatan sebenarnya secara terukur.",
            "Temuannya langsung bisa diubah menjadi strategi.",
          ],
        },
        {
          id: "fo1b",
          headline: "Audiens terpusat: 67,9% perempuan dan 98% Indonesia",
          fields: {
            isi: "Komposisi followers sangat terpusat, yaitu 67,9% perempuan berbanding 32,1% laki-laki, dengan 98% berada di Indonesia. Audiens yang seragam seperti ini memudahkan penentuan sudut pandang konten dan bahasa, karena tidak perlu melayani banyak kelompok sekaligus.",
          },
          points: [
            "Membaca komposisi, bukan hanya jumlah followers.",
            "Menyebut kedua angka apa adanya dari data.",
            "Menjelaskan keuntungan praktis dari audiens yang terpusat.",
            "Menjadi dasar untuk analisis perilaku audiens di bagian berikutnya.",
          ],
        },
        {
          id: "fo1c",
          headline: "Jam aktif memuncak pukul 8 malam",
          fields: {
            isi: "Follower activity menunjukkan puncak jam aktif pada pukul 8 malam. Data ini penting karena menentukan kapan konten sebaiknya diunggah agar sinyal awalnya terkumpul saat audiens paling banyak sedang membuka aplikasi. Pertumbuhan followers sendiri tercatat 2,35% dengan tambahan 1.643 orang.",
          },
          points: [
            "Mengangkat jam aktif sebagai data yang bisa langsung ditindaklanjuti.",
            "Menjelaskan kenapa jam aktif berpengaruh pada penyebaran konten.",
            "Tetap menyebut angka pertumbuhan followers sebagai konteks.",
            "Menyiapkan dasar untuk strategi jadwal unggah.",
          ],
        },
        {
          id: "fo1d",
          headline: "Followers baru setara 1,3% dari orang yang terjangkau",
          fields: {
            isi: "Video menjangkau 124.010 orang, sementara followers bertambah 1.643. Artinya sekitar 1,3% dari orang yang terjangkau berubah menjadi followers. Angka ini wajar untuk konten yang tersebar lewat For You Page, tetapi memperlihatkan bahwa sebagian besar penonton menonton tanpa meninggalkan jejak apa pun pada akun.",
          },
          points: [
            "Membandingkan followers baru dengan jangkauan, bukan dengan views.",
            "Menyebut angkanya sehingga besarannya terukur.",
            "Memberi penilaian yang berimbang, bukan sekadar menyebut kecil.",
            "Menunjuk peluang mengubah penonton lewat menjadi pengikut.",
          ],
        },
        {
          id: "fo1e",
          headline: "Pertumbuhan didorong satu konten, bukan kebiasaan harian",
          fields: {
            isi: "Tambahan 1.643 followers muncul pada periode yang sama dengan lonjakan seluruh metrik engagement di atas 145%. Pola ini menunjukkan pertumbuhan berasal dari satu konten yang tersebar luas, bukan dari kenaikan harian yang bertahap. Karena itu pertumbuhan seperti ini belum tentu berulang bila kontennya tidak dijaga.",
          },
          points: [
            "Menghubungkan pertumbuhan followers dengan lonjakan engagement.",
            "Membedakan pertumbuhan sesaat dari pertumbuhan yang bertahan.",
            "Memberi peringatan yang beralasan, bukan menakut-nakuti.",
            "Mengarahkan pada perlunya menjaga konsistensi konten.",
          ],
        },
        {
          id: "fo1f",
          headline: "Basis 74.029 membuat pertumbuhan 2,35% cukup berarti",
          fields: {
            isi: "Dengan basis 74.029 followers, pertumbuhan 2,35% berarti tambahan 1.643 orang dalam sepekan. Pada akun yang basisnya sudah besar, persentase sekecil itu tetap menghasilkan angka mutlak yang besar, sehingga pertumbuhannya layak disebut sehat dan bukan sekadar riak biasa.",
          },
          points: [
            "Membaca persentase bersama basisnya, bukan sendirian.",
            "Menjelaskan kenapa persentase kecil pada basis besar tetap berarti.",
            "Angkanya konsisten dengan data yang diberikan.",
            "Menghindari kesalahan menganggap 2,35% sebagai pertumbuhan yang lemah.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "fo2a",
          headline: "Followers naik 1.643, berarti performanya bagus",
          fields: {
            isi: "Followers bertambah 1.643 orang dalam sepekan sehingga total menjadi 74.029. Penambahan sebanyak itu menunjukkan performa akun sedang bagus dan strategi kontennya sudah tepat.",
          },
          points: [
            "Angka yang disebut sudah sesuai dengan data.",
            "Data gender, lokasi, dan jam aktif tidak ikut dibaca sama sekali.",
            "Tidak ada pembanding, sehingga sulit menilai bagus terhadap apa.",
            "Instruksi meminta pembacaan seluruh data followers, bukan jumlahnya saja.",
          ],
        },
        {
          id: "fo2b",
          headline: "Karena mayoritas perempuan, konten harus serba feminin",
          fields: {
            isi: "Sebanyak 67,9% followers adalah perempuan, jadi seluruh konten berikutnya sebaiknya dibuat dengan warna, gaya, dan tema yang feminin agar cocok dengan mayoritas audiens.",
          },
          points: [
            "Benar bahwa mayoritas followers adalah perempuan.",
            "Gender tidak menentukan selera visual sesederhana itu.",
            "Sepertiga audiens laki-laki ikut tersingkir tanpa alasan data.",
            "Data jam aktif dan lokasi yang lebih bisa ditindaklanjuti justru dilewati.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "fo3a",
          headline: "Followers sudah 74 ribu, jadi tidak perlu dianalisis",
          fields: {
            isi: "Jumlah followers sudah mencapai 74.029 orang, angka yang besar untuk sebuah akun brand. Dengan jumlah sebesar itu, data followers tidak perlu dianalisis lebih jauh.",
          },
          points: [
            "Jumlah followers memang sudah besar.",
            "Besarnya jumlah tidak menghentikan kebutuhan menganalisis pertumbuhannya.",
            "Data gender, lokasi, dan jam aktif dibiarkan tidak terpakai.",
            "Bertentangan langsung dengan tugas yang diberikan.",
          ],
        },
        {
          id: "fo3b",
          headline: "Pertumbuhan 2,35% terlalu kecil, akun ini gagal",
          fields: {
            isi: "Pertumbuhan followers hanya 2,35% dalam sepekan, angka yang sangat kecil. Akun ini bisa dibilang gagal menarik audiens baru dan perlu diulang dari awal.",
          },
          points: [
            "Benar bahwa 2,35% terdengar kecil bila dibaca sendirian.",
            "Pada basis 74.029, angka itu berarti 1.643 orang baru.",
            "Tidak ada pembanding yang dipakai untuk menyebutnya gagal.",
            "Kesimpulannya bertentangan dengan seluruh metrik yang naik di atas 145%.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 3. PERFORMA POSTINGAN VIDEO                                        */
/* ================================================================== */

const video: ChoiceGroup = {
  id: "video",
  label: "Data Postingan Video",
  question: "Bagaimana performa data postingan videonya?",
  hint: "Video berdurasi 15,18 detik. Perhatikan watch time, penonton yang tuntas, dan asal penayangannya.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "vi1a",
          headline: "Distribusi kuat lewat FYP, tetapi dua dari tiga penonton berhenti",
          fields: {
            isi: "Video meraih 137,4K views dengan 86% penayangan berasal dari For You Page, tanda distribusi organiknya sangat sehat. Namun hanya 34,62% penonton menyelesaikan video, sehingga sekitar dua dari tiga orang berhenti sebelum detik ke-15,18. Rata-rata waktu tonton 10,3 detik atau 67,9% dari durasinya.",
          },
          points: [
            "Memisahkan penilaian distribusi dari penilaian daya tahan tontonan.",
            "Mengubah 34,62% menjadi perbandingan yang mudah dibayangkan.",
            "Menghitung watch time sebagai persentase durasi, bukan detik saja.",
            "Kedua temuan langsung terpakai di bagian kekuatan dan kelemahan.",
          ],
        },
        {
          id: "vi1b",
          headline: "Likes 17,5% dari views, tetapi komentar hanya 0,12%",
          fields: {
            isi: "Dari 137,4K views, video mendapat 24K likes atau sekitar 17,5% — angka yang tinggi untuk ukuran TikTok. Sebaliknya komentar hanya 169 atau sekitar 0,12% dari views, dan shares 410 atau 0,3%. Audiens menyukai kontennya, tetapi hampir tidak ada yang terdorong menulis atau membagikannya.",
          },
          points: [
            "Mengubah angka mutlak menjadi rasio terhadap views agar sebanding.",
            "Menilai tinggi rendahnya dengan menyebut angkanya, bukan perasaan.",
            "Menemukan pola yang jelas: menikmati tanpa berinteraksi lebih jauh.",
            "Menyiapkan sasaran perbaikan yang spesifik.",
          ],
        },
        {
          id: "vi1c",
          headline: "Watch time 10,3 detik menunjukkan penonton bertahan sampai dua pertiga",
          fields: {
            isi: "Rata-rata waktu tonton 10,3 detik dari durasi 15,18 detik, artinya penonton bertahan sampai sekitar 67,9% bagian video. Angka ini tergolong baik, tetapi selisih dengan penonton yang tuntas — hanya 34,62% — menunjukkan banyak orang berhenti justru di sepertiga terakhir.",
          },
          points: [
            "Menghitung watch time terhadap durasi, bukan membacanya sebagai detik lepas.",
            "Membandingkan watch time dengan angka tuntas sehingga letak masalahnya terlihat.",
            "Menunjuk bagian video yang perlu diperbaiki, bukan videonya secara umum.",
            "Semua angkanya bisa diperiksa ulang pada data.",
          ],
        },
        {
          id: "vi1d",
          headline: "124.010 orang terjangkau, ditonton rata-rata 1,1 kali",
          fields: {
            isi: "Video menjangkau 124.010 orang dan menghasilkan 137,4K views, artinya rata-rata setiap orang menonton sekitar 1,1 kali. Pengulangan sebesar itu tergolong rendah, sehingga tambahan views hampir seluruhnya berasal dari orang baru, bukan dari orang yang sama menonton berulang.",
          },
          points: [
            "Membandingkan views dengan reach, dua angka yang sering tertukar.",
            "Menyimpulkan sumber pertumbuhan views secara terukur.",
            "Menunjukkan pengulangan tontonan sebagai peluang yang belum tergarap.",
            "Perhitungannya sederhana dan bisa diulang untuk konten lain.",
          ],
        },
        {
          id: "vi1e",
          headline: "Hanya 5% penayangan dari profil, 4% dari following",
          fields: {
            isi: "Penayangan video berasal 86% dari For You Page, 5% dari profil, dan 4% dari tab Following. Artinya konten ini hampir seluruhnya ditemukan orang baru, sementara followers yang sudah ada justru jarang melihatnya. Ketergantungan pada FYP sebesar ini membuat performa konten berikutnya sangat bergantung pada algoritma.",
          },
          points: [
            "Membaca ketiga sumber penayangan, bukan hanya angka FYP yang paling besar.",
            "Menemukan bahwa followers lama jarang melihat kontennya sendiri.",
            "Menyebut risiko ketergantungan pada FYP dengan alasan yang jelas.",
            "Menjadi dasar strategi menjaga audiens lama tetap terhubung.",
          ],
        },
        {
          id: "vi1f",
          headline: "Durasi 15,18 detik sudah pas dengan pola tontonan audiens",
          fields: {
            isi: "Dengan durasi 15,18 detik dan rata-rata tonton 10,3 detik, video ini sudah mendekati batas perhatian audiensnya. Angka tuntas 34,62% menunjukkan sepertiga terakhir masih kehilangan penonton, sehingga yang perlu diperbaiki bukan panjangnya secara keseluruhan melainkan bagian penutupnya.",
          },
          points: [
            "Menilai durasi dengan membandingkannya pada watch time nyata.",
            "Menunjuk bagian video yang bermasalah, bukan menyalahkan durasi secara umum.",
            "Kesimpulannya menahan diri dari saran memotong durasi tanpa dasar.",
            "Memberi arah perbaikan yang bisa langsung dikerjakan.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "vi2a",
          headline: "137,4K views dan 24K likes, videonya sangat berhasil",
          fields: {
            isi: "Video ini meraih 137,4K views dengan 24K likes, angka yang sangat besar untuk satu postingan. Dengan hasil sebesar itu, video ini bisa disebut sangat berhasil dan polanya tinggal diulang.",
          },
          points: [
            "Angka views dan likes yang disebut sudah sesuai data.",
            "Watch time dan angka tuntas 34,62% tidak ikut dibaca.",
            "Komentar 169 yang sangat kecil dibanding views juga terlewat.",
            "Kesimpulan tanpa kelemahan menyulitkan penyusunan strategi optimasi.",
          ],
        },
        {
          id: "vi2b",
          headline: "34,62% tuntas berarti videonya kepanjangan",
          fields: {
            isi: "Hanya 34,62% penonton yang menyelesaikan video, jadi durasinya terlalu panjang. Video berikutnya sebaiknya dibuat jauh lebih pendek agar semua orang menontonnya sampai habis.",
          },
          points: [
            "Benar bahwa angka tuntas 34,62% memang perlu diperhatikan.",
            "Durasi 15,18 detik sudah tergolong pendek untuk TikTok.",
            "Watch time 10,3 detik justru menunjukkan penonton bertahan cukup lama.",
            "Penyebabnya bisa jadi bagian penutup, bukan panjang videonya.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "vi3a",
          headline: "Videonya viral, tidak ada yang perlu diperbaiki",
          fields: {
            isi: "Views video menembus ratusan ribu dan likes-nya puluhan ribu, jadi video ini sudah viral. Konten yang sudah viral tidak perlu dianalisis lagi, cukup diulang persis seperti ini.",
          },
          points: [
            "Jangkauan videonya memang jauh di atas rata-rata akun.",
            "Tidak satu pun angka watch time atau retensi disinggung.",
            "Menyebut sesuatu viral bukan hasil analisis metrics.",
            "Tugas ini justru meminta kekuatan sekaligus kelemahannya.",
          ],
        },
        {
          id: "vi3b",
          headline: "Komentarnya cuma 169, videonya gagal",
          fields: {
            isi: "Komentar video hanya 169 padahal ditonton 137,4K kali, jadi video ini gagal menarik audiens. Sebaiknya konten seperti ini tidak diulang lagi.",
          },
          points: [
            "Benar bahwa 169 komentar sangat kecil dibanding jumlah views.",
            "Likes 24K dan distribusi FYP 86% justru menunjukkan sebaliknya.",
            "Satu metrik dipakai menghapus seluruh temuan lain.",
            "Saran menghentikan konten bertentangan dengan datanya sendiri.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 4. METRICS YANG SUDAH BAIK                                         */
/* ================================================================== */

const kekuatan: ChoiceGroup = {
  id: "kekuatan",
  label: "Metrics yang Sudah Baik",
  question: "Metrics apa yang sudah baik?",
  hint: "Sebutkan metriknya beserta angkanya, dan jelaskan kenapa disebut baik.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "ke1a",
          headline: "Distribusi FYP 86% dan likes 17,5% dari views",
          fields: {
            isi: "Dua metrik paling kuat adalah distribusi dan likes. Sebanyak 86% penayangan datang dari For You Page, tanda algoritma mendorong konten ini ke audiens baru. Likes 24K dari 137,4K views setara 17,5%, jauh di atas kebiasaan umum. Keduanya menunjukkan konten sudah menarik sejak detik-detik awal.",
          },
          points: [
            "Menyebut dua metrik dengan angkanya, bukan daftar tanpa ukuran.",
            "Menjelaskan arti tiap angka, bukan sekadar menyatakan baik.",
            "Keduanya berasal dari bagian data yang berbeda.",
            "Menjadi dasar mempertahankan pola konten yang sudah berhasil.",
          ],
        },
        {
          id: "ke1b",
          headline: "Konversi profil ke followers 92,6%",
          fields: {
            isi: "Dari 1.774 profile views, sebanyak 1.643 berubah menjadi followers baru, setara sekitar 92,6%. Angka setinggi ini berarti halaman profil dan isi akunnya sudah meyakinkan, sehingga hampir semua orang yang mampir memutuskan mengikuti.",
          },
          points: [
            "Menghitung rasio dari dua angka yang tersedia di data.",
            "Menjelaskan apa yang sebenarnya diukur rasio itu.",
            "Menunjuk kekuatan yang letaknya di luar konten, yaitu profil akun.",
            "Menyiapkan alasan untuk strategi mengarahkan orang ke profil.",
          ],
        },
        {
          id: "ke1c",
          headline: "Watch time 10,3 detik atau 67,9% durasi",
          fields: {
            isi: "Rata-rata waktu tonton 10,3 detik dari durasi 15,18 detik berarti penonton bertahan sampai sekitar 67,9% bagian video. Untuk konten edukasi singkat, bertahan sampai dua pertiga bagian menandakan pembukaan dan bagian tengahnya sudah bekerja dengan baik.",
          },
          points: [
            "Mengubah detik menjadi persentase durasi agar bisa dinilai.",
            "Mengaitkan angka itu dengan bagian video yang mana yang berhasil.",
            "Menyebut jenis kontennya sebagai konteks penilaian.",
            "Menahan diri mengklaim seluruh video sudah baik.",
          ],
        },
        {
          id: "ke1d",
          headline: "Seluruh metrik engagement naik di atas 145%",
          fields: {
            isi: "Video views naik 145,97%, profile views 152,35%, likes 154,45%, dan shares 146,21% dibanding periode sebelumnya. Kenaikan yang menyeluruh seperti ini menunjukkan perbaikan performa akun secara keseluruhan, bukan keberhasilan satu metrik saja.",
          },
          points: [
            "Menyebut keempat persentase apa adanya dari data.",
            "Menyimpulkan pola dari kesamaan besaran kenaikannya.",
            "Membedakan perbaikan menyeluruh dari keberhasilan satu metrik.",
            "Pembandingnya jelas, yaitu periode sebelumnya.",
          ],
        },
        {
          id: "ke1e",
          headline: "Pertumbuhan followers 2,35% dari basis 74 ribu",
          fields: {
            isi: "Followers tumbuh 2,35% dalam sepekan, setara tambahan 1.643 orang di atas basis 74.029. Pada akun yang basisnya sudah besar, pertumbuhan sebesar ini dalam tujuh hari tergolong sehat karena angka mutlaknya tetap besar.",
          },
          points: [
            "Membaca persentase bersama basisnya agar penilaiannya adil.",
            "Menyebut rentang waktunya sehingga angkanya punya konteks.",
            "Menjelaskan alasan menyebutnya sehat, bukan sekadar menyatakan.",
            "Konsisten dengan angka pada bagian data followers.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "ke2a",
          headline: "Views dan likes sudah baik",
          fields: {
            isi: "Video views dan likes adalah dua metrik yang sudah baik pada periode ini karena angkanya paling besar di antara metrik lain. Keduanya menunjukkan konten diterima audiens.",
          },
          points: [
            "Kedua metrik itu memang termasuk yang terkuat.",
            "Tidak ada angka yang dikutip untuk mendukungnya.",
            "Views dan likes selalu paling besar, jadi bukan temuan yang membedakan.",
            "Rubrik meminta analisis yang berdasar data, bukan penyebutan metrik.",
          ],
        },
        {
          id: "ke2b",
          headline: "Comments naik 650%, jadi termasuk yang sudah baik",
          fields: {
            isi: "Comments naik 650% dibanding periode sebelumnya, kenaikan terbesar di antara seluruh metrik. Karena itu komentar layak dimasukkan sebagai metrik yang sudah baik.",
          },
          points: [
            "Benar bahwa persentase kenaikannya paling besar.",
            "Angka mutlaknya hanya 60, terkecil di antara metrik engagement.",
            "Kenaikan besar dari basis kecil belum menunjukkan kekuatan.",
            "Memasukkannya sebagai kekuatan akan menutupi kelemahan yang nyata.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "ke3a",
          headline: "Semua metrics sudah baik karena naik semua",
          fields: {
            isi: "Seluruh metrik pada periode ini naik dibanding periode sebelumnya, jadi semuanya bisa dimasukkan sebagai metrik yang sudah baik. Tidak ada yang perlu disebut lemah.",
          },
          points: [
            "Benar bahwa semua metrik memang naik.",
            "Menyebut semuanya baik membuat bagian ini kehilangan gunanya.",
            "Template menyediakan kolom kelemahan yang jadi tidak terisi.",
            "Rubrik meminta analisis yang unggul sekaligus yang perlu ditingkatkan.",
          ],
        },
        {
          id: "ke3b",
          headline: "Jumlah followers 74 ribu adalah metrik terbaiknya",
          fields: {
            isi: "Metrik terbaik akun ini adalah jumlah followers yang sudah mencapai 74.029 orang. Angka sebesar itu jelas menjadi kekuatan utama dibanding metrik lainnya.",
          },
          points: [
            "Jumlah followers memang besar untuk sebuah akun brand.",
            "Jumlah followers adalah hasil akumulasi, bukan performa periode ini.",
            "Metrik yang dianalisis seharusnya yang bergerak pada periode 4-10 Agustus.",
            "Tidak membantu menyusun strategi untuk konten berikutnya.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 5. METRICS YANG PERLU DITINGKATKAN                                 */
/* ================================================================== */

const kelemahan: ChoiceGroup = {
  id: "kelemahan",
  label: "Metrics yang Perlu Ditingkatkan",
  question: "Metrics apa yang perlu ditingkatkan?",
  hint: "Sebutkan angkanya dan jelaskan kenapa metrik itu tergolong lemah.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "kl1a",
          headline: "Komentar 0,12% dari views, terendah di antara semua interaksi",
          fields: {
            isi: "Video mendapat 169 komentar dari 137,4K views, setara 0,12%. Dibandingkan likes yang mencapai 17,5%, komentar tertinggal lebih dari seratus kali lipat. Konten berhasil membuat orang menyukai tetapi belum memberi alasan untuk menulis sesuatu.",
          },
          points: [
            "Menyebut rasio, bukan hanya angka mutlaknya.",
            "Membandingkan dengan likes sehingga ketertinggalannya terukur.",
            "Menjelaskan sebab yang masuk akal dari pola tersebut.",
            "Menunjuk sasaran perbaikan yang jelas untuk strategi berikutnya.",
          ],
        },
        {
          id: "kl1b",
          headline: "Hanya 34,62% penonton menyelesaikan video",
          fields: {
            isi: "Penonton yang menyelesaikan video hanya 34,62%, berarti sekitar dua dari tiga orang berhenti sebelum detik ke-15,18. Padahal rata-rata waktu tonton sudah mencapai 10,3 detik, sehingga kehilangan penonton terjadi terutama di sepertiga terakhir video.",
          },
          points: [
            "Menerjemahkan persentase menjadi perbandingan yang mudah dibayangkan.",
            "Memakai watch time untuk menunjuk bagian video yang bermasalah.",
            "Tidak langsung menyalahkan durasi tanpa dasar.",
            "Perbaikannya bisa diarahkan ke bagian tertentu, bukan seluruh video.",
          ],
        },
        {
          id: "kl1c",
          headline: "Profile views hanya 2,2% dari video views",
          fields: {
            isi: "Profile views tercatat 1.774 dari 79,7K video views pada periode yang sama, setara sekitar 2,2%. Karena hampir semua pengunjung profil berakhir menjadi followers, sedikitnya orang yang mampir ke profil menjadi penghambat utama pertumbuhan akun.",
          },
          points: [
            "Menghitung rasio dari dua angka pada bagian data yang berbeda.",
            "Menghubungkannya dengan konversi profil yang sudah sangat tinggi.",
            "Menunjukkan letak hambatan pertumbuhan secara tepat.",
            "Kelemahannya bisa diperbaiki tanpa mengubah kontennya sendiri.",
          ],
        },
        {
          id: "kl1d",
          headline: "Shares 0,3% dari views, konten jarang diteruskan",
          fields: {
            isi: "Shares tercatat 410 dari 137,4K views, setara 0,3%. Angka ini rendah untuk konten edukasi yang biasanya dibagikan ketika terasa berguna. Artinya isi videonya menarik untuk ditonton, tetapi belum cukup memberi alasan bagi audiens untuk meneruskannya ke orang lain.",
          },
          points: [
            "Menghitung rasio shares terhadap views, bukan menilai angka mutlaknya.",
            "Menyebut jenis kontennya sebagai pembanding yang wajar.",
            "Membedakan konten yang enak ditonton dari konten yang layak dibagikan.",
            "Memberi arah perbaikan yang spesifik.",
          ],
        },
        {
          id: "kl1e",
          headline: "Hanya 4% penayangan datang dari tab Following",
          fields: {
            isi: "Penayangan dari tab Following hanya 4%, sementara 86% berasal dari For You Page. Artinya 74.029 followers yang sudah ada hampir tidak melihat konten ini di beranda mereka. Akun jadi sangat bergantung pada algoritma untuk menjangkau audiensnya sendiri.",
          },
          points: [
            "Membaca sumber penayangan yang paling kecil, bukan hanya yang terbesar.",
            "Menghubungkannya dengan jumlah followers yang sudah dimiliki.",
            "Menyebut risikonya secara jelas, yaitu ketergantungan pada algoritma.",
            "Kelemahan ini jarang terlihat bila hanya membaca views.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "kl2a",
          headline: "Comments perlu ditingkatkan karena angkanya paling kecil",
          fields: {
            isi: "Comments hanya 60 pada overview dan 169 pada video, angka terkecil di antara seluruh metrik engagement. Karena paling kecil, komentar adalah metrik yang perlu ditingkatkan.",
          },
          points: [
            "Benar bahwa komentar adalah metrik dengan angka terkecil.",
            "Komentar memang hampir selalu lebih kecil daripada likes.",
            "Tanpa rasio terhadap views, kecilnya angka belum membuktikan kelemahan.",
            "Perlu ditambah pembanding agar analisisnya berdiri di atas data.",
          ],
        },
        {
          id: "kl2b",
          headline: "Semua metrik perlu ditingkatkan supaya terus naik",
          fields: {
            isi: "Semua metrik masih bisa ditingkatkan karena tidak ada angka yang sempurna. Target periode berikutnya adalah menaikkan seluruh metrik agar performanya terus tumbuh.",
          },
          points: [
            "Benar bahwa semua metrik selalu punya ruang perbaikan.",
            "Tidak menunjuk metrik mana pun secara khusus.",
            "Tanpa prioritas, strategi optimasi jadi tidak punya sasaran.",
            "Rubrik meminta metrik yang unggul dan yang perlu ditingkatkan dibedakan.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "kl3a",
          headline: "Tidak ada metrik yang lemah karena semuanya naik",
          fields: {
            isi: "Seluruh metrik naik dibanding periode sebelumnya, bahkan komentar naik 650%. Karena tidak ada yang turun, tidak ada metrik yang perlu ditingkatkan.",
          },
          points: [
            "Benar bahwa tidak ada metrik yang turun pada periode ini.",
            "Naik dibanding periode lalu tidak berarti angkanya sudah memadai.",
            "Komentar 0,12% dari views tetap tertinggal jauh meski naik.",
            "Kolom ini menjadi kosong dan strategi optimasi kehilangan dasarnya.",
          ],
        },
        {
          id: "kl3b",
          headline: "Jumlah followers perlu ditingkatkan sampai 100 ribu",
          fields: {
            isi: "Followers baru mencapai 74.029, masih jauh dari 100.000. Metrik inilah yang perlu ditingkatkan agar akun terlihat lebih besar.",
          },
          points: [
            "Menaikkan followers memang tujuan yang wajar bagi sebuah akun.",
            "Angka 100.000 tidak berasal dari data mana pun.",
            "Jumlah followers adalah akibat, bukan metrik yang bisa langsung diperbaiki.",
            "Tidak menunjuk penyebab yang bisa ditindaklanjuti pada konten.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 6. ANALISIS PERILAKU AUDIENS                                       */
/* ================================================================== */

const perilaku: ChoiceGroup = {
  id: "perilaku",
  label: "Analisis Lebih Lanjut",
  question: "Hubungkan data metrics dengan perilaku audiens: jam aktif, gender, dan lokasi",
  hint: "Bagian ini yang membedakan pembacaan angka dari analisis. Kaitkan datanya, jangan sebutkan satu per satu.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "pe1a",
          headline: "Jam aktif 8 malam menjelaskan cepatnya sebaran lewat FYP",
          fields: {
            isi: "Puncak jam aktif followers berada di pukul 8 malam, dan 86% penayangan video datang dari For You Page. Konten yang diunggah menjelang jam itu punya peluang lebih besar mengumpulkan sinyal awal — tontonan, likes, dan shares — dalam waktu singkat, dan sinyal awal itulah yang biasanya menentukan apakah TikTok meneruskan konten ke audiens yang lebih luas. Dengan 98% followers berada di Indonesia, seluruh audiens berada di rentang waktu yang berdekatan sehingga jam unggah cukup ditentukan sekali.",
          },
          points: [
            "Menghubungkan jam aktif, distribusi FYP, dan lokasi menjadi satu penjelasan.",
            "Menjelaskan mekanismenya, bukan sekadar menyebut jam aktif itu penting.",
            "Memanfaatkan data lokasi untuk menyederhanakan keputusan jadwal.",
            "Kesimpulannya langsung bisa diubah menjadi strategi jam posting.",
          ],
        },
        {
          id: "pe1b",
          headline: "Audiens perempuan Indonesia yang seragam memudahkan penajaman konten",
          fields: {
            isi: "Sebanyak 67,9% followers perempuan dan 98% berada di Indonesia, sementara video menjangkau 124.010 orang dengan 86% dari For You Page. Audiens yang seragam seperti ini berarti konten tidak perlu melayani banyak kelompok sekaligus: satu bahasa, satu konteks budaya, dan satu rentang waktu aktif. Tingginya likes 17,5% menunjukkan penajaman itu sudah berjalan, sedangkan komentar 0,12% menunjukkan penajaman belum sampai pada ajakan berinteraksi.",
          },
          points: [
            "Memakai gender dan lokasi sebagai penjelas, bukan sebagai daftar.",
            "Menghubungkan keseragaman audiens dengan tingginya rasio likes.",
            "Menunjukkan batas keberhasilan itu lewat rasio komentar.",
            "Analisisnya runtut dari komposisi audiens menuju perilakunya.",
          ],
        },
        {
          id: "pe1c",
          headline: "Penonton FYP belum mengenal brand, karena itu jarang berkomentar",
          fields: {
            isi: "Sebanyak 86% penayangan datang dari For You Page dan hanya 4% dari tab Following, artinya sebagian besar penonton belum mengikuti akun ini. Orang yang baru pertama melihat sebuah akun cenderung menyukai tanpa berkomentar, dan itu cocok dengan likes 17,5% berbanding komentar 0,12%. Sementara 92,6% pengunjung profil berakhir menjadi followers, jadi begitu mereka mengenal akunnya, ketertarikannya justru tinggi.",
          },
          points: [
            "Menjelaskan rendahnya komentar lewat komposisi penontonnya.",
            "Memakai tiga angka dari bagian data yang berbeda dalam satu alur.",
            "Menyimpulkan bahwa masalahnya pengenalan, bukan mutu konten.",
            "Mengarahkan perbaikan pada mengubah penonton menjadi pengikut.",
          ],
        },
        {
          id: "pe1d",
          headline: "Followers lama nyaris tidak melihat kontennya sendiri",
          fields: {
            isi: "Akun memiliki 74.029 followers, tetapi hanya 4% penayangan video datang dari tab Following. Artinya audiens yang sudah dikumpulkan hampir tidak tersentuh oleh konten ini, dan pertumbuhan 1.643 followers baru sepenuhnya bergantung pada audiens baru dari For You Page. Karena puncak aktivitas mereka jelas di pukul 8 malam, mengunggah pada jam itu adalah cara paling langsung menjangkau kembali followers lama.",
          },
          points: [
            "Menemukan ketimpangan antara jumlah followers dan penayangan Following.",
            "Menghubungkannya dengan sumber pertumbuhan followers baru.",
            "Memakai data jam aktif sebagai jalan keluar yang masuk akal.",
            "Temuan ini tidak terlihat bila metrik dibaca satu per satu.",
          ],
        },
        {
          id: "pe1e",
          headline: "Watch time dan jam aktif menunjuk pada konten malam yang ringkas",
          fields: {
            isi: "Rata-rata tonton 10,3 detik dari durasi 15,18 detik, dengan puncak aktivitas audiens pukul 8 malam. Pada jam itu orang umumnya menonton sambil beristirahat dan berpindah konten dengan cepat, sehingga video yang inti pesannya berada di bawah sepuluh detik akan lebih sering tertonton utuh. Angka tuntas 34,62% menguatkan dugaan itu: bagian akhir video kehilangan penonton justru ketika perhatian sedang paling mudah teralih.",
          },
          points: [
            "Menghubungkan watch time dengan konteks jam menonton audiens.",
            "Memberi penjelasan perilaku, bukan sekadar menyebut angka retensi.",
            "Memakai angka tuntas untuk menguji dugaannya sendiri.",
            "Kesimpulannya mengarah pada perubahan susunan isi video.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "pe2a",
          headline: "Audiens 67,9% perempuan, 98% Indonesia, aktif jam 8 malam",
          fields: {
            isi: "Data menunjukkan followers terdiri dari 67,9% perempuan dan 32,1% laki-laki, dengan 98% berada di Indonesia, serta puncak jam aktif pada pukul 8 malam. Ketiga data ini menggambarkan siapa audiens akun ini.",
          },
          points: [
            "Ketiga angkanya dikutip dengan benar dari data.",
            "Ketiganya hanya disebutkan ulang, belum dihubungkan satu sama lain.",
            "Tidak ada metrik performa yang dikaitkan dengan data audiens ini.",
            "Instruksi meminta menghubungkan data, bukan mendaftarnya kembali.",
          ],
        },
        {
          id: "pe2b",
          headline: "Karena audiens aktif malam, sebaiknya posting malam hari",
          fields: {
            isi: "Puncak jam aktif followers ada di pukul 8 malam, jadi konten sebaiknya diunggah pada malam hari agar lebih banyak yang melihat. Dengan begitu jangkauan konten bisa lebih besar.",
          },
          points: [
            "Kesimpulan jam unggahnya sudah mengarah ke tempat yang benar.",
            "Data gender dan lokasi sama sekali tidak dipakai.",
            "Tidak dijelaskan hubungannya dengan distribusi FYP maupun watch time.",
            "Analisisnya berhenti pada satu data, padahal tersedia tiga.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "pe3a",
          headline: "Audiensnya perempuan Indonesia, jadi kontennya sudah cocok",
          fields: {
            isi: "Mayoritas followers adalah perempuan Indonesia, dan konten yang diunggah juga berbahasa Indonesia. Karena sudah cocok, tidak ada yang perlu dianalisis lebih jauh dari perilaku audiensnya.",
          },
          points: [
            "Benar bahwa bahasa konten sudah sesuai dengan lokasi audiens.",
            "Kecocokan bahasa bukan hasil analisis perilaku.",
            "Data jam aktif tidak dipakai sama sekali.",
            "Menutup analisis justru pada bagian yang paling diminta instruksi.",
          ],
        },
        {
          id: "pe3b",
          headline: "Perilaku audiens tidak bisa disimpulkan dari angka",
          fields: {
            isi: "Data yang tersedia hanya berupa angka, sedangkan perilaku audiens perlu ditanyakan langsung lewat survei. Karena itu bagian ini belum bisa dianalisis dari data insight saja.",
          },
          points: [
            "Survei memang bisa melengkapi pemahaman tentang audiens.",
            "Jam aktif, gender, dan lokasi justru data perilaku yang tersedia.",
            "Instruksi meminta analisis dari data yang ada, bukan data baru.",
            "Menolak menganalisis membuat bagian ini tidak terisi sama sekali.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 7. STRATEGI OPTIMASI — DISTRIBUSI                                  */
/* ================================================================== */

const strategiDistribusi: ChoiceGroup = {
  id: "strategiDistribusi",
  label: "Strategi 1: Distribusi",
  question: "Strategi optimasi dari sisi distribusi dan jadwal unggah",
  hint: "Rubrik meminta optimasi mencakup aspek distribusi. Strategi harus bersandar pada angka pada data.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "sd1a",
          headline: "Unggah pukul 18.30-19.00, satu jam sebelum puncak aktivitas",
          fields: {
            isi: "Unggah konten pada pukul 18.30-19.00, sekitar satu jam sebelum puncak aktivitas followers di pukul 8 malam. Jeda itu memberi waktu bagi video mengumpulkan sinyal awal, sehingga saat trafik memuncak video sudah punya cukup bukti performa untuk didorong lebih luas ke For You Page yang menyumbang 86% penayangan.",
          },
          points: [
            "Jam unggahnya diturunkan dari data follower activity, bukan kebiasaan umum.",
            "Menjelaskan alasan mengunggah lebih awal, bukan tepat di jam puncak.",
            "Mengaitkan jadwal dengan distribusi FYP yang menjadi kekuatan akun.",
            "Bisa langsung dijalankan tanpa perlu data tambahan.",
          ],
        },
        {
          id: "sd1b",
          headline: "Uji dua jam unggah selama dua pekan, lalu kunci yang menang",
          fields: {
            isi: "Selama dua pekan, unggah bergantian pada pukul 18.30 dan pukul 20.00, lalu bandingkan views 24 jam pertama masing-masing. Jam yang secara konsisten menghasilkan views awal lebih tinggi dipakai sebagai jadwal tetap. Cara ini menguji dugaan tentang jam puncak dengan data akun sendiri, bukan anjuran umum.",
          },
          points: [
            "Menjadikan jam unggah sesuatu yang diuji, bukan diasumsikan.",
            "Menyebut ukuran pembanding yang jelas, yaitu views 24 jam pertama.",
            "Rentang dua pekan cukup untuk mengurangi pengaruh kebetulan.",
            "Hasilnya berupa keputusan tetap, bukan percobaan tanpa ujung.",
          ],
        },
        {
          id: "sd1c",
          headline: "Perkuat tiga detik pertama untuk menjaga dorongan FYP",
          fields: {
            isi: "Karena 86% penayangan bergantung pada For You Page, tiga detik pertama video perlu langsung menyampaikan inti masalahnya tanpa pembukaan basa-basi. Watch time saat ini 10,3 detik dari 15,18 detik, jadi menahan penonton di awal akan menaikkan rata-rata itu sekaligus memperbesar peluang video terus didorong algoritma.",
          },
          points: [
            "Strateginya menyasar sumber penayangan terbesar akun ini.",
            "Perbaikan diarahkan ke bagian video yang paling menentukan.",
            "Dampaknya dihubungkan dengan angka watch time yang sudah ada.",
            "Mencakup aspek distribusi seperti yang diminta rubrik.",
          ],
        },
        {
          id: "sd1d",
          headline: "Terbitkan konten lanjutan dalam 48 jam selagi masih terdorong",
          fields: {
            isi: "Selagi satu konten masih tersebar luas lewat For You Page, terbitkan konten lanjutan dengan tema serupa dalam 48 jam berikutnya. Penonton yang baru menemukan akun lewat video pertama berpeluang melihat konten kedua, dan itu memperbesar kemungkinan mereka membuka profil — jalan yang selama ini terbukti mengubah 92,6% pengunjung menjadi followers.",
          },
          points: [
            "Memanfaatkan momentum distribusi yang sedang berjalan.",
            "Menghubungkan strategi dengan rasio konversi profil yang tinggi.",
            "Rentang waktunya konkret sehingga mudah dijalankan.",
            "Menyasar hambatan pertumbuhan yang sudah ditemukan pada analisis.",
          ],
        },
        {
          id: "sd1e",
          headline: "Jaga followers lama tetap terhubung lewat unggahan rutin di jam yang sama",
          fields: {
            isi: "Hanya 4% penayangan datang dari tab Following, padahal akun punya 74.029 followers. Unggah secara rutin pada jam yang sama setiap kali agar followers lama terbiasa menemukan konten pada waktu tersebut, dan gunakan pukul 8 malam sesuai puncak aktivitas mereka. Tujuannya mengurangi ketergantungan pada For You Page.",
          },
          points: [
            "Menyasar kelemahan tab Following yang jarang diperhatikan.",
            "Keteraturan jam unggah dijelaskan alasannya, bukan sekadar disarankan.",
            "Memakai data jam aktif sebagai penentu waktunya.",
            "Menjawab risiko ketergantungan pada algoritma.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "sd2a",
          headline: "Posting lebih sering supaya jangkauannya naik",
          fields: {
            isi: "Tambah jumlah unggahan menjadi setiap hari agar konten lebih sering muncul dan jangkauannya bertambah. Semakin banyak konten yang diunggah, semakin besar peluang salah satunya tersebar luas.",
          },
          points: [
            "Menambah frekuensi memang memperbesar peluang konten tersebar.",
            "Tidak memakai data jam aktif yang sudah tersedia.",
            "Menambah jumlah tanpa memperbaiki mutu berisiko menurunkan rata-rata performa.",
            "Rubrik meminta strategi yang bersandar pada hasil analisis metrics.",
          ],
        },
        {
          id: "sd2b",
          headline: "Pakai hashtag yang sedang ramai",
          fields: {
            isi: "Gunakan hashtag yang sedang ramai pada setiap unggahan agar konten ikut terbawa ke audiens yang lebih luas. Hashtag populer bisa membantu konten masuk ke halaman For You Page.",
          },
          points: [
            "Hashtag memang salah satu cara memperluas jangkauan.",
            "Tidak ada data hashtag pada insight yang diberikan.",
            "Hashtag ramai sering tidak relevan dengan audiens perempuan Indonesia akun ini.",
            "Strateginya tidak berangkat dari kelemahan yang ditemukan pada analisis.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "sd3a",
          headline: "Pasang iklan supaya jangkauannya pasti besar",
          fields: {
            isi: "Gunakan iklan berbayar agar jangkauan konten pasti besar tanpa bergantung pada algoritma. Dengan iklan, jumlah penonton bisa ditentukan sejak awal.",
          },
          points: [
            "Iklan memang membuat jangkauan lebih mudah diperkirakan.",
            "Tugas ini meminta optimasi berdasarkan hasil analisis insight organik.",
            "Distribusi FYP 86% yang sudah kuat justru tidak dimanfaatkan.",
            "Tidak menjawab satu pun kelemahan yang ditemukan pada data.",
          ],
        },
        {
          id: "sd3b",
          headline: "Unggah kapan saja, yang penting kontennya bagus",
          fields: {
            isi: "Jam unggah tidak terlalu berpengaruh karena algoritma akan tetap menyebarkan konten yang bagus. Yang penting fokus pada mutu konten, bukan waktunya.",
          },
          points: [
            "Mutu konten memang tetap menjadi faktor utama.",
            "Data follower activity yang menunjukkan puncak pukul 8 malam diabaikan.",
            "Sinyal awal yang menentukan sebaran justru dipengaruhi jam unggah.",
            "Bukan strategi, melainkan alasan untuk tidak mengubah apa pun.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 8. STRATEGI OPTIMASI — KONTEN DAN RETENSI                          */
/* ================================================================== */

const strategiKonten: ChoiceGroup = {
  id: "strategiKonten",
  label: "Strategi 2: Konten",
  question: "Strategi optimasi dari sisi durasi, susunan, dan daya tahan tontonan",
  hint: "Sandarkan pada watch time 10,3 detik dan angka tuntas 34,62%.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "sk1a",
          headline: "Pindahkan kesimpulan ke sebelum detik ke-10",
          fields: {
            isi: "Rata-rata penonton berhenti di detik 10,3, sedangkan video berdurasi 15,18 detik. Susun ulang isi video agar kesimpulan atau bagian paling berguna muncul sebelum detik ke-10, sehingga mayoritas penonton tetap menerima inti pesannya meski tidak menonton sampai habis.",
          },
          points: [
            "Titik potongnya diambil langsung dari angka watch time.",
            "Memperbaiki susunan isi, bukan sekadar memendekkan video.",
            "Menjamin pesan tersampaikan meski retensi belum membaik.",
            "Bisa diterapkan pada konten berikutnya tanpa biaya tambahan.",
          ],
        },
        {
          id: "sk1b",
          headline: "Uji durasi 10-12 detik untuk menaikkan angka tuntas",
          fields: {
            isi: "Angka tuntas saat ini 34,62% pada durasi 15,18 detik, sementara rata-rata tonton berhenti di 10,3 detik. Coba buat beberapa konten berdurasi 10-12 detik, lalu bandingkan angka tuntasnya. Bila naik, artinya durasi memang penyebabnya; bila tidak, penyebabnya ada pada isi bagian akhir.",
          },
          points: [
            "Durasi barunya diturunkan dari watch time, bukan angka sembarang.",
            "Perubahan diperlakukan sebagai pengujian dengan ukuran yang jelas.",
            "Menyiapkan tafsir untuk kedua kemungkinan hasilnya.",
            "Menghindari kesimpulan tergesa bahwa durasi selalu penyebabnya.",
          ],
        },
        {
          id: "sk1c",
          headline: "Tutup video dengan potongan yang mengundang tonton ulang",
          fields: {
            isi: "Views 137,4K berbanding reach 124.010 berarti setiap orang menonton rata-rata hanya 1,1 kali. Buat bagian penutup yang menyambung kembali ke pembukaan, sehingga penonton terdorong mengulang. Tontonan ulang menaikkan watch time sekaligus angka tuntas tanpa perlu menambah jumlah penonton baru.",
          },
          points: [
            "Memakai perbandingan views dan reach yang jarang diperhatikan.",
            "Menjelaskan mekanisme kenaikan dua metrik sekaligus.",
            "Menyasar penonton yang sudah ada, bukan hanya mengejar yang baru.",
            "Perubahannya terbatas pada bagian penutup sehingga mudah dijalankan.",
          ],
        },
        {
          id: "sk1d",
          headline: "Pertahankan tema edukasi singkat yang sudah menghasilkan likes 17,5%",
          fields: {
            isi: "Likes mencapai 17,5% dari views, angka yang jauh di atas kebiasaan umum, jadi tema edukasi singkat ini terbukti cocok bagi audiensnya. Pertahankan temanya dan ubah hanya susunan penyampaiannya, agar kekuatan yang sudah ada tidak ikut hilang saat memperbaiki retensi.",
          },
          points: [
            "Menyebut angka yang menjadi alasan mempertahankan tema.",
            "Membedakan apa yang perlu diubah dari apa yang perlu dijaga.",
            "Menghindari perubahan menyeluruh yang berisiko menghapus keberhasilan.",
            "Sesuai dengan temuan pada bagian kekuatan.",
          ],
        },
        {
          id: "sk1e",
          headline: "Tambahkan teks layar agar pesan tetap terbaca tanpa suara",
          fields: {
            isi: "Puncak aktivitas audiens pukul 8 malam, waktu ketika banyak orang menonton tanpa menyalakan suara. Tambahkan teks layar yang memuat inti pesan pada tiap bagian video, sehingga penonton tetap menangkap isinya. Ini menyasar langsung angka tuntas 34,62% yang masih rendah.",
          },
          points: [
            "Menghubungkan kebiasaan menonton pada jam tertentu dengan bentuk kontennya.",
            "Perbaikannya menyasar angka retensi yang sudah ditemukan lemah.",
            "Bisa diterapkan tanpa mengubah tema maupun durasi.",
            "Alasannya berasal dari data jam aktif, bukan dugaan umum.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "sk2a",
          headline: "Perpendek semua video menjadi 7 detik",
          fields: {
            isi: "Karena hanya 34,62% penonton yang menyelesaikan video, perpendek seluruh konten menjadi sekitar 7 detik agar semua orang bisa menontonnya sampai habis. Video yang lebih pendek pasti lebih banyak diselesaikan.",
          },
          points: [
            "Benar bahwa video lebih pendek biasanya lebih banyak diselesaikan.",
            "Durasi 7 detik tidak diturunkan dari data mana pun.",
            "Watch time 10,3 detik menunjukkan penonton sanggup bertahan lebih lama.",
            "Memotong terlalu jauh berisiko membuang isi yang justru berguna.",
          ],
        },
        {
          id: "sk2b",
          headline: "Buat konten yang lebih menarik supaya ditonton sampai habis",
          fields: {
            isi: "Angka tuntas masih rendah, jadi konten berikutnya perlu dibuat lebih menarik agar penonton bertahan sampai akhir. Konten yang menarik akan meningkatkan retensi dengan sendirinya.",
          },
          points: [
            "Benar bahwa daya tarik konten memengaruhi retensi.",
            "Kata menarik tidak menjelaskan apa yang harus diubah.",
            "Tidak ada angka yang dipakai sebagai dasar maupun sasaran.",
            "Rubrik meminta strategi yang aplikatif dan bisa dikerjakan.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "sk3a",
          headline: "Ikuti saja konten yang sedang ramai di FYP",
          fields: {
            isi: "Tiru format konten yang sedang ramai di halaman For You Page agar performanya ikut naik. Konten yang sedang tren pasti lebih mudah tersebar.",
          },
          points: [
            "Mengikuti tren memang kadang menaikkan jangkauan sesaat.",
            "Tema edukasi singkat yang sudah menghasilkan likes 17,5% ditinggalkan.",
            "Tidak ada satu pun angka insight yang dipakai.",
            "Strateginya tidak menjawab kelemahan retensi maupun komentar.",
          ],
        },
        {
          id: "sk3b",
          headline: "Perpanjang durasi supaya watch time-nya naik",
          fields: {
            isi: "Perpanjang durasi video menjadi satu menit agar total waktu tonton bertambah. Semakin panjang videonya, semakin besar angka watch time yang tercatat.",
          },
          points: [
            "Durasi yang lebih panjang memang bisa menambah total waktu tonton.",
            "Angka tuntas 34,62% justru akan turun lebih jauh.",
            "Penonton sudah berhenti di detik 10,3 pada durasi 15,18 detik.",
            "Strateginya bertentangan dengan data retensi yang ada.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */
/* 9. STRATEGI OPTIMASI — ENGAGEMENT                                  */
/* ================================================================== */

const strategiEngagement: ChoiceGroup = {
  id: "strategiEngagement",
  label: "Strategi 3: Engagement",
  question: "Strategi optimasi untuk menaikkan interaksi, terutama komentar",
  hint: "Rubrik meminta optimasi mencakup aspek engagement. Komentar 0,12% dari views adalah sasaran paling jelas.",
  options: [
    {
      grade: "tepat",
      variants: [
        {
          id: "sg1a",
          headline: "Tutup video dengan satu pertanyaan yang mudah dijawab",
          fields: {
            isi: "Komentar hanya 0,12% dari views, sementara likes mencapai 17,5%. Tutup setiap video dengan satu pertanyaan pendek yang bisa dijawab satu kata, misalnya meminta audiens menyebut pilihannya. Pertanyaan yang murah dijawab menurunkan hambatan berkomentar, dan sasarannya menaikkan rasio komentar mendekati rasio shares yang kini 0,3%.",
          },
          points: [
            "Menyebut rasio saat ini sekaligus sasaran yang ingin dicapai.",
            "Bentuk pertanyaannya dijelaskan, bukan sekadar menyuruh bertanya.",
            "Alasan pemilihannya masuk akal, yaitu menurunkan hambatan menjawab.",
            "Mencakup aspek engagement seperti yang diminta rubrik.",
          ],
        },
        {
          id: "sg1b",
          headline: "Pin satu komentar pembuka pada tiap unggahan",
          fields: {
            isi: "Segera setelah unggah, tulis satu komentar dari akun brand yang memancing tanggapan, lalu sematkan di posisi teratas. Kolom komentar yang sudah terisi lebih mudah diikuti daripada kolom kosong, dan ini menyasar langsung komentar yang baru 169 dari 137,4K views.",
          },
          points: [
            "Langkahnya konkret dan bisa dikerjakan dalam hitungan menit.",
            "Menjelaskan alasan perilakunya, bukan sekadar menyebut cara.",
            "Menyebut angka yang menjadi sasaran perbaikan.",
            "Tidak memerlukan perubahan pada kontennya sendiri.",
          ],
        },
        {
          id: "sg1c",
          headline: "Balas komentar dalam satu jam pertama",
          fields: {
            isi: "Balas seluruh komentar yang masuk pada satu jam pertama setelah unggah, terutama karena unggahan direncanakan menjelang puncak aktivitas pukul 8 malam. Balasan cepat mendorong percakapan lanjutan dan menambah jumlah komentar, yang saat ini baru 0,12% dari views.",
          },
          points: [
            "Menghubungkan waktu membalas dengan jam aktif audiens.",
            "Menjelaskan bagaimana balasan menambah jumlah komentar.",
            "Rentang waktunya jelas sehingga bisa dijadikan kebiasaan tim.",
            "Menyasar metrik yang sudah terbukti paling lemah.",
          ],
        },
        {
          id: "sg1d",
          headline: "Ajak audiens membuka profil untuk memanfaatkan konversi 92,6%",
          fields: {
            isi: "Sebanyak 92,6% pengunjung profil berakhir menjadi followers, tetapi profile views baru 2,2% dari video views. Tambahkan ajakan singkat menuju profil pada bagian penutup video dan pada caption, misalnya menyebut ada seri lanjutan di profil. Menaikkan jumlah pengunjung profil adalah cara tercepat menambah followers karena konversinya sudah sangat tinggi.",
          },
          points: [
            "Menemukan bahwa hambatannya di jumlah pengunjung, bukan di konversi.",
            "Menyebut kedua angka yang mendasari kesimpulan itu.",
            "Ajakannya konkret dan diletakkan di tempat yang jelas.",
            "Mencakup aspek engagement sekaligus pertumbuhan akun.",
          ],
        },
        {
          id: "sg1e",
          headline: "Buat konten yang layak dibagikan untuk menaikkan shares 0,3%",
          fields: {
            isi: "Shares baru 410 dari 137,4K views atau 0,3%. Susun konten edukasi yang berbentuk daftar langkah atau catatan singkat yang berguna disimpan, karena bentuk seperti itu lebih sering diteruskan ke orang lain. Shares penting karena membawa audiens baru tanpa bergantung sepenuhnya pada For You Page.",
          },
          points: [
            "Menyebut rasio shares saat ini sebagai titik berangkat.",
            "Menjelaskan bentuk konten yang biasanya dibagikan.",
            "Menghubungkan shares dengan pengurangan ketergantungan pada FYP.",
            "Sesuai dengan tema edukasi yang sudah terbukti cocok.",
          ],
        },
      ],
    },
    {
      grade: "sebagian",
      variants: [
        {
          id: "sg2a",
          headline: "Tambahkan ajakan berkomentar di caption",
          fields: {
            isi: "Tulis ajakan berkomentar pada caption setiap unggahan agar audiens terdorong menulis tanggapan. Dengan ajakan yang jelas, jumlah komentar bisa bertambah.",
          },
          points: [
            "Ajakan yang jelas memang membantu menaikkan komentar.",
            "Tidak dijelaskan ajakan seperti apa yang mudah dijawab.",
            "Tidak ada angka yang dipakai sebagai dasar maupun sasaran.",
            "Caption jarang terbaca bila ajakannya tidak muncul di video.",
          ],
        },
        {
          id: "sg2b",
          headline: "Adakan giveaway supaya komentarnya banyak",
          fields: {
            isi: "Adakan giveaway dengan syarat berkomentar agar jumlah komentar naik tajam dalam waktu singkat. Cara ini terbukti cepat menaikkan angka interaksi.",
          },
          points: [
            "Giveaway memang menaikkan jumlah komentar dengan cepat.",
            "Komentar yang masuk umumnya tidak berhubungan dengan isi konten.",
            "Kenaikannya berhenti begitu giveaway selesai.",
            "Tidak memperbaiki sebab rendahnya komentar pada konten biasa.",
          ],
        },
      ],
    },
    {
      grade: "kurang",
      variants: [
        {
          id: "sg3a",
          headline: "Biarkan saja, komentar akan naik sendiri seiring followers",
          fields: {
            isi: "Komentar akan bertambah dengan sendirinya seiring bertambahnya followers, jadi tidak perlu strategi khusus. Cukup fokus menambah followers dan interaksi akan mengikuti.",
          },
          points: [
            "Akun yang lebih besar memang cenderung mendapat lebih banyak komentar.",
            "Rasio komentar 0,12% tidak berubah hanya karena jumlah penonton naik.",
            "Kelemahan yang sudah ditemukan justru dibiarkan.",
            "Instruksi meminta strategi optimasi, bukan menunggu.",
          ],
        },
        {
          id: "sg3b",
          headline: "Beli komentar agar terlihat ramai",
          fields: {
            isi: "Gunakan jasa penambah komentar agar kolom komentar terlihat ramai sehingga audiens lain ikut tertarik menulis. Kolom yang ramai memberi kesan konten sedang dibicarakan.",
          },
          points: [
            "Kolom komentar yang ramai memang memengaruhi kesan pertama.",
            "Komentar yang dibeli tidak berasal dari audiens sebenarnya.",
            "Angka insight menjadi tidak bisa dipakai menilai performa konten.",
            "Cara ini melanggar ketentuan platform dan berisiko bagi akun brand.",
          ],
        },
      ],
    },
  ],
};

/* ================================================================== */

export const tpm8Groups: ChoiceGroup[] = [
  engagement,
  followers,
  video,
  kekuatan,
  kelemahan,
  perilaku,
  strategiDistribusi,
  strategiKonten,
  strategiEngagement,
];

export const bankTpm8 = {
  engagement,
  followers,
  video,
  kekuatan,
  kelemahan,
  perilaku,
  strategiDistribusi,
  strategiKonten,
  strategiEngagement,
};
