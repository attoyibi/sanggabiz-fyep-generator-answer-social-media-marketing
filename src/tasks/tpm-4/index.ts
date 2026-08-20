import {
  BRAND_WARNA,
  KODE_KELAS,
  type BuildContext,
  type DesignLayer,
  type DesignSpec,
  type DocBlock,
  type Rich,
  type TaskDefinition,
} from "../types";
import { tpm4Groups } from "./bank";

const BRAND = "FitActive";

const judulDokumen: Rich = [
  { text: "Desain Konten Visual " },
  { text: BRAND, italic: false },
];

/** Isi field sebuah grup pada tugas ini. */
function f(ctx: BuildContext, groupId: string, key: string, fallback = "Belum dijawab"): string {
  const v = ctx.answers[groupId]?.variant.fields?.[key];
  return v !== undefined ? ctx.fill(v) : fallback;
}

/** Jawaban lengkap sebuah grup: judul lalu poin-poinnya. */
function uraian(ctx: BuildContext, groupId: string): string {
  const a = ctx.answers[groupId];
  if (!a) return "Belum dijawab";
  const isi = a.variant.fields?.isi ? `${ctx.fill(a.variant.fields.isi)}\n` : "";
  return `${ctx.fill(a.variant.headline)}\n${isi}${a.variant.points.map((p) => `• ${ctx.fill(p)}`).join("\n")}`;
}

/** Mengubah nama warna Brand Guideline menjadi kode hex. */
function hex(nama: string): string {
  if (nama.startsWith("#")) return nama;
  return (BRAND_WARNA as Record<string, string>)[nama] ?? BRAND_WARNA.planBlue;
}

/* ------------------------------------------------------------------ */
/* Penyusun desain                                                     */
/* ------------------------------------------------------------------ */

/** Nama akun yang ditulis di kaki desain, seperti unggahan sungguhan. */
const HANDLE = "@fitactive";

/** Ukuran kanvas: mengikuti tipe visual rancangan, kecuali peserta memaksa lain. */
function ukuranKanvas(ctx: BuildContext): { w: number; h: number; nama: string; vertikal: boolean } {
  const mode = f(ctx, "format", "mode", "auto");
  if (mode === "persegi") return { w: 1080, h: 1080, nama: "Persegi 1:1", vertikal: false };
  if (mode === "vertikal") return { w: 1080, h: 1920, nama: "Vertikal 9:16", vertikal: true };
  const tipe = ctx.fill("{{tipeKonten}}").toLowerCase();
  return /reels|story|video|vertikal/.test(tipe)
    ? { w: 1080, h: 1920, nama: "Vertikal 9:16", vertikal: true }
    : { w: 1080, h: 1080, nama: "Persegi 1:1", vertikal: false };
}

/** Jumlah lembar: carousel mengikuti jumlah halaman pada rancangan TPM 3. */
function jumlahLembar(ctx: BuildContext): number {
  const tipe = ctx.fill("{{tipeKonten}}").toLowerCase();
  if (!tipe.includes("carousel")) return 1;
  const angka = tipe.match(/(\d+)\s*halaman/);
  // Dibatasi 6 supaya jumlah berkas unduhan tetap wajar.
  return angka ? Math.min(Math.max(Number(angka[1]), 2), 6) : 3;
}

/**
 * Bahan teks tiap lembar.
 *
 * Isi lembar tengah diambil dari caption yang peserta susun di TPM 3. Caption
 * itu ditulis mengikuti formula copywriting, satu bagian per paragraf dengan
 * label di depannya. Labelnya dibuang karena unggahan sungguhan tidak mencetak
 * kata "Attention" di atas gambar.
 */
function naskah(ctx: BuildContext) {
  const judul = f(ctx, "teks", "judul", "");
  const pendukung = f(ctx, "teks", "pendukung", "");
  const cta = f(ctx, "teks", "cta", "");
  const pilar = ctx.fill("{{pilarKonten}}");
  const captionIsi = ctx.sumber?.answers["caption"]?.variant.fields?.isi;
  const sumberPotongan = captionIsi && ctx.sumber ? ctx.sumber.fill(captionIsi) : pendukung;
  const potongan = sumberPotongan
    .split(/\n{2,}/)
    .map((t) => t.replace(/^[A-Za-z][A-Za-z ]{2,22}:\s*/, "").trim())
    .filter(Boolean);

  // Bila bagian captionnya lebih sedikit daripada jumlah lembar, kalimat pada
  // keterangan pendukung ikut dipakai supaya tidak ada lembar yang isinya persis
  // sama dengan lembar lain.
  const tambahan = pendukung
    .split(/(?<=\.)\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
  const kumpulan = [...new Set([...potongan, ...tambahan])].filter(Boolean);

  return { judul, pendukung, cta, pilar, potongan: kumpulan.length ? kumpulan : [pendukung] };
}

/** Papan gambar satu lembar beserta warna dan ukuran yang sudah dihitung. */
interface Papan {
  w: number;
  h: number;
  m: number;
  isi: number;
  vertikal: boolean;
  atasAman: number;
  bawahAman: number;
  latar: string;
  warnaJudul: string;
  aksen: string;
  teksAksen: string;
  layers: DesignLayer[];
  S: (bagian: number) => number;
}

/* ---- Penaksir ukuran teks ---- */

/**
 * Lebar rata-rata satu huruf sebagai kelipatan ukuran font.
 *
 * Sengaja ditaksir lebih lebar dari kenyataan: taksiran yang kelewat optimistis
 * membuat blok teks menabrak unsur di bawahnya, sedangkan taksiran yang longgar
 * paling banter menyisakan ruang kosong sedikit lebih banyak.
 */
const LEBAR_HURUF = { judul: 0.63, teks: 0.56 } as const;

/** Perkiraan jumlah baris setelah teks dibungkus selebar kotaknya. */
function perkiraanBaris(teks: string, size: number, lebar: number, font: "judul" | "teks"): number {
  const perBaris = Math.max(6, Math.floor(lebar / (size * LEBAR_HURUF[font])));
  return teks
    .split("\n")
    .reduce((jml, paragraf) => jml + Math.max(1, Math.ceil(paragraf.length / perBaris)), 0);
}

/**
 * Ukuran font terbesar yang masih muat dalam jumlah baris yang diizinkan.
 *
 * Canvas baru bisa mengukur teks saat menggambar, sedangkan tata letak harus
 * ditentukan lebih awal. Taksiran ini dipakai supaya blok teks yang panjang
 * mengecil sendiri, bukan menabrak unsur di bawahnya.
 */
function ukuranMuat(
  teks: string,
  awal: number,
  lebar: number,
  maksBaris: number,
  font: "judul" | "teks"
): number {
  let size = awal;
  const paling_kecil = Math.round(awal * 0.55);
  while (size > paling_kecil && perkiraanBaris(teks, size, lebar, font) > maksBaris) {
    size = Math.round(size * 0.93);
  }
  return size;
}

/** Tinggi blok teks menurut taksiran barisnya. */
function tinggiBlok(teks: string, size: number, lebar: number, font: "judul" | "teks", leading: number): number {
  return Math.round(perkiraanBaris(teks, size, lebar, font) * size * leading);
}

/** Ukuran font terbesar yang blok teksnya masih muat pada tinggi yang tersedia. */
function ukuranMuatTinggi(
  teks: string,
  awal: number,
  lebar: number,
  tinggiTersedia: number,
  font: "judul" | "teks",
  leading: number
): number {
  let size = awal;
  const palingKecil = Math.max(12, Math.round(awal * 0.5));
  while (size > palingKecil && tinggiBlok(teks, size, lebar, font, leading) > tinggiTersedia) {
    size = Math.round(size * 0.92);
  }
  return size;
}

/* ---- Perabot yang membuat desain terlihat seperti unggahan sungguhan ---- */

/** Label kecil di atas judul, dibungkus blok warna seperti stiker. */
function chip(p: Papan, teks: string, y: number): number {
  const size = p.S(0.024);
  p.layers.push({
    type: "text",
    x: p.m,
    y,
    w: p.isi,
    text: teks.toUpperCase(),
    size,
    color: p.teksAksen,
    font: "judul",
    weight: "bold",
    highlight: { fill: p.aksen, radius: Math.round(size * 0.9) },
  });
  return y + Math.round(size * 2.1);
}

/** Garis tebal pendek sebagai penanda pembuka. */
function garisAksen(p: Papan, y: number): number {
  const tebal = Math.max(6, p.S(0.008));
  p.layers.push({
    type: "line",
    x1: p.m,
    y1: y,
    x2: p.m + p.S(0.11),
    y2: y,
    color: p.aksen,
    width: tebal,
  });
  return y + Math.round(tebal * 3);
}

/**
 * Tombol ajakan berbentuk pil, seperti tombol pada unggahan promosi.
 *
 * Saat tombolnya berdiri di atas bidang aksen, warnanya dibalik. Tanpa itu
 * tombol berwarna aksen akan lenyap di atas bidang yang warnanya sama.
 */
function tombol(p: Papan, teks: string, y: number, diAksen = false): void {
  if (!teks) return;
  const isiPil = diAksen ? p.teksAksen : p.aksen;
  const warnaTeks = diAksen ? p.aksen : p.teksAksen;
  const size = p.S(0.03);
  const tinggi = Math.round(size * 2.4);
  const lebar = Math.min(p.isi, Math.round(teks.length * size * 0.62 + size * 3));
  p.layers.push({
    type: "rect",
    x: p.m,
    y,
    w: lebar,
    h: tinggi,
    fill: isiPil,
    radius: Math.round(tinggi / 2),
  });
  p.layers.push({
    type: "text",
    x: p.m,
    y: y + Math.round((tinggi - size * 1.16) / 2),
    w: lebar,
    text: teks,
    size,
    color: warnaTeks,
    font: "judul",
    weight: "bold",
    align: "center",
  });
}

/**
 * Kaki desain: nama akun di kiri, penanda halaman di kanan.
 *
 * Dua hal ini yang paling membedakan tampilan unggahan sungguhan dari sekadar
 * salindia: pembaca selalu tahu ini akun siapa dan sudah sampai halaman berapa.
 */
function kaki(p: Papan, ke: number, total: number, geser: boolean, diAksen = false): void {
  const size = p.S(0.022);
  const warna = diAksen ? p.teksAksen : p.warnaJudul;
  const warnaTitikAktif = diAksen ? p.latar : p.aksen;
  const y = p.h - p.bawahAman + Math.round(size * 0.2);
  p.layers.push({
    type: "text",
    x: p.m,
    y,
    w: p.isi,
    text: HANDLE,
    size,
    color: warna,
    font: "judul",
    weight: "bold",
  });

  if (total > 1) {
    // Titik halaman, seperti penanda carousel di aplikasinya.
    const r = Math.max(5, Math.round(size * 0.22));
    const jarak = r * 4;
    const kananTitik = p.w - p.m;
    const cy = y + Math.round(size * 0.58);
    for (let i = 0; i < total; i++) {
      const cx = kananTitik - (total - 1 - i) * jarak;
      p.layers.push({
        type: "ellipse",
        cx,
        cy,
        rx: i === ke ? r * 1.25 : r,
        ry: i === ke ? r * 1.25 : r,
        fill: i === ke ? warnaTitikAktif : warna,
      });
    }
  }

  if (geser) {
    p.layers.push({
      type: "text",
      x: p.m,
      y: y - Math.round(size * 1.9),
      w: p.isi,
      text: "Geser  →",
      size,
      color: diAksen ? p.teksAksen : p.aksen,
      font: "judul",
      weight: "bold",
      align: "center",
    });
  }
}

/* ---------------------------- Pola lembar ---------------------------- */

/** Sampul dengan judul disorot blok warna, pola paling umum di beranda. */
function sampulSorot(p: Papan, n: ReturnType<typeof naskah>, tunggal: boolean): void {
  chip(p, n.pilar, p.atasAman);
  const lebar = Math.round(p.isi * 0.94);
  const size = ukuranMuat(n.judul, p.S(0.084), lebar, 4, "judul");
  const tinggi = tinggiBlok(n.judul, size, lebar, "judul", 1.34);
  // Judul ditambatkan ke bagian bawah-tengah, seperti sampul carousel pada umumnya.
  const y = Math.max(p.atasAman + p.S(0.12), Math.round(p.h * 0.62) - tinggi);
  p.layers.push({
    type: "text",
    x: p.m,
    y,
    w: lebar,
    text: n.judul,
    size,
    color: p.warnaJudul,
    font: "judul",
    weight: "bold",
    leading: 1.34,
    highlight: { fill: p.latar === p.aksen ? p.warnaJudul : p.aksen, radius: 8 },
  });
  if (tunggal) sisipanTunggal(p, n, y + tinggi + p.S(0.03));
}

/**
 * Tambahan untuk unggahan satu lembar: keterangan pendukung dan tombol ajakan.
 *
 * Pada carousel keduanya punya lembar sendiri, tetapi unggahan tunggal harus
 * memuat semuanya dalam satu gambar.
 */
function sisipanTunggal(p: Papan, n: ReturnType<typeof naskah>, y: number): void {
  const batasBawah = p.h - p.bawahAman - p.S(0.13);
  const lebar = p.isi;
  const size = ukuranMuat(n.pendukung, p.S(0.03), lebar, 3, "teks");
  const tinggi = tinggiBlok(n.pendukung, size, lebar, "teks", 1.45);
  const yTeks = Math.min(y, batasBawah - tinggi);
  if (yTeks > p.atasAman) {
    p.layers.push({
      type: "text",
      x: p.m,
      y: yTeks,
      w: lebar,
      text: n.pendukung,
      size,
      color: p.warnaJudul,
      font: "teks",
      leading: 1.45,
    });
  }
  tombol(p, n.cta, p.h - p.bawahAman - p.S(0.115));
}

/** Sampul dengan blok warna di bawah, judul di atas blok. */
function sampulBlok(p: Papan, n: ReturnType<typeof naskah>, tunggal: boolean): void {
  const batas = Math.round(p.h * 0.56);
  p.layers.push({ type: "rect", x: 0, y: batas, w: p.w, h: p.h - batas, fill: p.aksen });
  const yChip = chip(p, n.pilar, p.atasAman);
  const ruangJudul = batas - yChip - p.S(0.05);
  const size = ukuranMuatTinggi(n.judul, p.S(0.08), p.isi, ruangJudul, "judul", 1.2);
  const tinggi = tinggiBlok(n.judul, size, p.isi, "judul", 1.2);
  p.layers.push({
    type: "text",
    x: p.m,
    y: yChip + Math.max(p.S(0.02), ruangJudul - tinggi),
    w: p.isi,
    text: n.judul,
    size,
    color: p.warnaJudul,
    font: "judul",
    weight: "bold",
    leading: 1.2,
  });
  const atasTeks = batas + p.S(0.05);
  const batasBawahTeks = p.h - p.bawahAman - p.S(tunggal ? 0.15 : 0.05);
  const sizeTeks = ukuranMuatTinggi(n.pendukung, p.S(0.031), p.isi, batasBawahTeks - atasTeks, "teks", 1.45);
  // Keterangan ditambatkan ke bawah blok: naskah pendek jadi rapat dengan tombol,
  // naskah panjang tetap mulai dari puncak blok.
  const yTeks = Math.max(
    atasTeks,
    batasBawahTeks - tinggiBlok(n.pendukung, sizeTeks, p.isi, "teks", 1.45)
  );
  p.layers.push({
    type: "text",
    x: p.m,
    y: yTeks,
    w: p.isi,
    text: n.pendukung,
    size: sizeTeks,
    color: p.teksAksen,
    font: "teks",
    leading: 1.45,
  });
  if (tunggal) tombol(p, n.cta, p.h - p.bawahAman - p.S(0.115), true);
}

/** Sampul perbandingan: dua kotak bertumpuk, yang keliru di atas, yang tepat di bawah. */
function sampulBanding(p: Papan, n: ReturnType<typeof naskah>, tunggal: boolean): void {
  const y = chip(p, n.pilar, p.atasAman) + p.S(0.02);
  const sizeJudul = ukuranMuatTinggi(n.judul, p.S(0.064), p.isi, p.S(0.2), "judul", 1.18);
  p.layers.push({
    type: "text",
    x: p.m,
    y,
    w: p.isi,
    text: n.judul,
    size: sizeJudul,
    color: p.warnaJudul,
    font: "judul",
    weight: "bold",
    leading: 1.18,
  });

  // Kotak dimulai tepat di bawah judul, bukan pada tinggi tetap, supaya tidak
  // ada lubang kosong ketika judulnya pendek.
  const atasBlok = y + tinggiBlok(n.judul, sizeJudul, p.isi, "judul", 1.18) + p.S(0.04);
  const bawahBlok = p.h - p.bawahAman - p.S(tunggal ? 0.13 : 0.05);
  const jarak = p.S(0.025);
  const tinggiKotak = Math.round((bawahBlok - atasBlok - jarak) / 2);
  const label = ["Sering keliru", "Lebih tepat"];
  const isiBlok = [n.potongan[0] ?? n.pendukung, n.potongan[1] ?? n.pendukung];

  for (let i = 0; i < 2; i++) {
    const by = atasBlok + i * (tinggiKotak + jarak);
    p.layers.push({
      type: "rect",
      x: p.m,
      y: by,
      w: p.isi,
      h: tinggiKotak,
      fill: i === 0 ? p.warnaJudul : p.aksen,
      radius: p.S(0.02),
    });
    const lebarBlok = p.isi - p.S(0.06);
    p.layers.push({
      type: "text",
      x: p.m + p.S(0.03),
      y: by + p.S(0.025),
      w: lebarBlok,
      text: label[i].toUpperCase(),
      size: p.S(0.02),
      color: i === 0 ? p.latar : p.teksAksen,
      font: "judul",
      weight: "bold",
    });
    const atasIsi = by + p.S(0.062);
    p.layers.push({
      type: "text",
      x: p.m + p.S(0.03),
      y: atasIsi,
      w: lebarBlok,
      text: isiBlok[i],
      size: ukuranMuatTinggi(
        isiBlok[i],
        p.S(0.03),
        lebarBlok,
        by + tinggiKotak - p.S(0.022) - atasIsi,
        "teks",
        1.4
      ),
      color: i === 0 ? p.latar : p.teksAksen,
      font: "teks",
      leading: 1.4,
    });
  }

  if (tunggal) tombol(p, n.cta, p.h - p.bawahAman - p.S(0.115));
}

/** Lembar isi bernomor, pola carousel yang paling sering dipakai. */
function kartuAngka(p: Papan, teks: string, nomor: number): void {
  const angka = String(nomor).padStart(2, "0");
  p.layers.push({
    type: "text",
    x: p.m,
    y: p.atasAman,
    w: p.isi,
    text: angka,
    size: p.S(0.16),
    color: p.aksen,
    font: "judul",
    weight: "bold",
  });
  const y = p.atasAman + p.S(0.19);
  p.layers.push({ type: "line", x1: p.m, y1: y, x2: p.w - p.m, y2: y, color: p.aksen, width: 3 });
  const yTeks = y + p.S(0.045);
  p.layers.push({
    type: "text",
    x: p.m,
    y: yTeks,
    w: p.isi,
    text: teks,
    size: ukuranMuatTinggi(teks, p.S(0.042), p.isi, p.h - p.bawahAman - p.S(0.05) - yTeks, "judul", 1.32),
    color: p.warnaJudul,
    font: "judul",
    weight: "bold",
    leading: 1.32,
  });
}

/** Memecah satu paragraf menjadi kalimat-kalimat pendek. */
function pecahKalimat(teks: string): string[] {
  return teks
    .split(/(?<=\.)\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);
}

/** Lembar isi berbentuk daftar bertanda, untuk poin yang setara. */
function kartuDaftar(p: Papan, teks: string, judulKartu: string): void {
  let y = garisAksen(p, p.atasAman + p.S(0.01));

  // Satu kalimat menjadi satu baris daftar, seperti poin-poin pada unggahan tips.
  const baris = pecahKalimat(teks);

  const ruangTotal = p.h - p.bawahAman - p.S(0.05) - y;
  const sizeJudul = ukuranMuatTinggi(judulKartu, p.S(0.045), p.isi, ruangTotal * 0.34, "judul", 1.24);
  p.layers.push({
    type: "text",
    x: p.m,
    y,
    w: p.isi,
    text: judulKartu,
    size: sizeJudul,
    color: p.warnaJudul,
    font: "judul",
    weight: "bold",
    leading: 1.24,
  });
  y += tinggiBlok(judulKartu, sizeJudul, p.isi, "judul", 1.24) + p.S(0.035);

  const kotak = Math.round(p.S(0.028) * 0.7);
  const lebarBaris = p.isi - kotak * 2;
  const sisa = p.h - p.bawahAman - p.S(0.05) - y;
  // Semua baris dihitung sekaligus supaya seluruh daftar muat, bukan hanya baris pertama.
  const gabungan = baris.join("\n");
  const size = ukuranMuatTinggi(gabungan, p.S(0.028), lebarBaris, sisa - baris.length * p.S(0.012), "teks", 1.4);
  for (const b of baris) {
    const sisiKotak = Math.round(size * 0.7);
    p.layers.push({
      type: "rect",
      x: p.m,
      y: y + Math.round(size * 0.24),
      w: sisiKotak,
      h: sisiKotak,
      fill: p.aksen,
      radius: Math.round(sisiKotak / 4),
    });
    p.layers.push({
      type: "text",
      x: p.m + sisiKotak * 2,
      y,
      w: p.isi - sisiKotak * 2,
      text: b,
      size,
      color: p.warnaJudul,
      font: "teks",
      leading: 1.4,
    });
    y += tinggiBlok(b, size, p.isi - sisiKotak * 2, "teks", 1.4) + p.S(0.012);
  }
}

/** Lembar isi berbentuk kutipan, cocok untuk cerita atau ulasan pemakai. */
function kartuKutipan(p: Papan, teks: string): void {
  p.layers.push({
    type: "text",
    x: p.m,
    y: p.atasAman,
    w: p.isi,
    text: "“",
    size: p.S(0.2),
    color: p.aksen,
    font: "judul",
    weight: "bold",
  });
  const yKutipan = p.atasAman + p.S(0.16);
  p.layers.push({
    type: "text",
    x: p.m,
    y: yKutipan,
    w: p.isi,
    text: teks,
    size: ukuranMuatTinggi(teks, p.S(0.038), p.isi, p.h - p.bawahAman - p.S(0.05) - yKutipan, "judul", 1.38),
    color: p.warnaJudul,
    font: "judul",
    weight: "bold",
    leading: 1.38,
  });
}

/** Lembar penutup: satu ajakan, satu tombol. */
function kartuPenutup(p: Papan, n: ReturnType<typeof naskah>): void {
  let y = garisAksen(p, p.atasAman + p.S(0.02));
  y += p.S(0.02);
  p.layers.push({
    type: "text",
    x: p.m,
    y,
    w: p.isi,
    text: n.cta || "Simpan konten ini",
    size: p.S(0.07),
    color: p.warnaJudul,
    font: "judul",
    weight: "bold",
    leading: 1.2,
  });
  tombol(p, n.cta ? "Simpan & bagikan" : "Ikuti akunnya", p.h - p.bawahAman - p.S(0.14));
}

/* -------- Pola dari jawaban yang keliru, digambar apa adanya -------- */

/** Semua rata tengah, ukurannya seragam sehingga tidak ada yang menonjol. */
function polaRata(p: Papan, n: ReturnType<typeof naskah>): void {
  const size = p.S(0.036);
  p.layers.push({
    type: "text", x: p.m, y: p.S(0.22), w: p.isi, text: n.judul,
    size, color: p.warnaJudul, font: "judul", weight: "bold", align: "center", leading: 1.4,
  });
  p.layers.push({
    type: "text", x: p.m, y: p.S(0.48), w: p.isi, text: n.pendukung,
    size, color: p.warnaJudul, font: "teks", align: "center", leading: 1.4,
  });
  p.layers.push({
    type: "text", x: p.m, y: p.S(0.74), w: p.isi, text: n.cta,
    size, color: p.warnaJudul, font: "teks", align: "center", leading: 1.4,
  });
}

/** Teks menempel ke tepi kanvas, bagian tepinya terpotong antarmuka platform. */
function polaTepi(p: Papan, n: ReturnType<typeof naskah>): void {
  p.layers.push({
    type: "text", x: 4, y: 4, w: p.w - 8, text: n.judul,
    size: p.S(0.07), color: p.warnaJudul, font: "judul", weight: "bold", leading: 1.1,
  });
  p.layers.push({
    type: "text", x: 4, y: p.h - p.S(0.05), w: p.w - 8, text: n.cta,
    size: p.S(0.032), color: p.aksen, font: "judul", weight: "bold",
  });
  p.layers.push({
    type: "text", x: 4, y: p.S(0.5), w: p.w - 8, text: n.pendukung,
    size: p.S(0.028), color: p.warnaJudul, font: "teks", leading: 1.3,
  });
}

/** Semua teks ditumpuk di satu titik sehingga saling bertindihan. */
function polaTumpuk(p: Papan, n: ReturnType<typeof naskah>): void {
  p.layers.push({
    type: "text", x: p.m, y: p.S(0.34), w: p.isi, text: n.judul,
    size: p.S(0.075), color: p.warnaJudul, font: "judul", weight: "bold", leading: 1.05,
  });
  p.layers.push({
    type: "text", x: p.m, y: p.S(0.42), w: p.isi, text: n.pendukung,
    size: p.S(0.032), color: p.latar, font: "teks", leading: 1.2,
  });
  p.layers.push({
    type: "text", x: p.m, y: p.S(0.5), w: p.isi, text: n.cta,
    size: p.S(0.05), color: p.latar, font: "judul", weight: "bold",
  });
}

/* --------------------------------------------------------------------- */

/** Pola isi carousel yang tersedia, dipilih menurut pilihan peserta sebelumnya. */
const POLA_ISI = ["angka", "daftar", "kutipan"] as const;

/**
 * Memilih pola lembar isi dari jawaban peserta di tugas sebelumnya.
 *
 * Dua peserta yang memilih tata letak sama tetap mendapat carousel yang
 * berbeda bila pilar, objective, atau tipe kontennya berbeda.
 */
function polaIsi(ctx: BuildContext, ke: number): (typeof POLA_ISI)[number] {
  const kunci = `${ctx.fill("{{pilarKonten}}")}|${ctx.fill("{{objectiveKonten}}")}|${ctx.fill("{{tipeKonten}}")}`;
  let jumlah = 0;
  for (let i = 0; i < kunci.length; i++) jumlah = (jumlah * 31 + kunci.charCodeAt(i)) % 9973;
  return POLA_ISI[(jumlah + ke) % POLA_ISI.length];
}

/**
 * Menyusun satu lembar desain.
 *
 * Bentuknya ditentukan dua hal: pilihan tata letak peserta menentukan rupa
 * sampulnya, sedangkan lembar isi carousel mengikuti konten yang ia kembangkan
 * di TPM 3. Pola dari jawaban yang keliru sengaja digambar apa adanya, supaya
 * peserta melihat sendiri akibatnya pada desain.
 */
function susunLembar(ctx: BuildContext, ke: number, total: number): DesignSpec {
  const { w, h, nama: namaUkuran, vertikal } = ukuranKanvas(ctx);
  const pola = f(ctx, "layout", "pola", "sorot");
  const persen = Number(f(ctx, "safeZone", "margin", "10")) || 0;
  const m = Math.round((Math.min(w, h) * persen) / 100);

  // Pada kanvas vertikal, antarmuka Reels dan Story menutupi bagian atas dan
  // bawah layar, jadi batas amannya lebih dalam daripada sisi kiri-kanan.
  const tepiVertikal = vertikal ? Math.max(m, Math.round(h * 0.12)) : m;
  const safeZone = { top: tepiVertikal, bottom: tepiVertikal, left: m, right: m };

  const p: Papan = {
    w,
    h,
    m,
    isi: w - m * 2,
    vertikal,
    atasAman: tepiVertikal,
    bawahAman: tepiVertikal,
    latar: hex(f(ctx, "warna", "latar", "planBlue")),
    warnaJudul: hex(f(ctx, "warna", "judul", "white")),
    aksen: hex(f(ctx, "warna", "aksen", "yellow")),
    teksAksen: hex(f(ctx, "warna", "teksAksen", "black")),
    layers: [],
    S: (bagian: number) => Math.round(h * bagian),
  };

  const n = naskah(ctx);
  const polaKeliru = ["rata", "tepi", "tumpuk"].includes(pola);
  const sampul = ke === 0;
  const penutup = total > 1 && ke === total - 1;

  if (vertikal) {
    // Batang kemajuan di puncak layar, seperti Story yang sedang berjalan.
    const tinggi = Math.max(6, p.S(0.005));
    const lebarBatang = Math.round((w - m * 2 - 16) / 3);
    for (let i = 0; i < 3; i++) {
      p.layers.push({
        type: "rect",
        x: m + i * (lebarBatang + 8),
        y: Math.round(h * 0.045),
        w: lebarBatang,
        h: tinggi,
        fill: i === 0 ? p.aksen : p.warnaJudul,
        radius: Math.round(tinggi / 2),
      });
    }
  }

  if (polaKeliru) {
    if (pola === "rata") polaRata(p, n);
    else if (pola === "tepi") polaTepi(p, n);
    else polaTumpuk(p, n);
  } else if (penutup) {
    kartuPenutup(p, n);
  } else if (sampul) {
    const tunggal = total === 1;
    if (pola === "blok") sampulBlok(p, n, tunggal);
    else if (pola === "banding") sampulBanding(p, n, tunggal);
    else sampulSorot(p, n, tunggal);
  } else {
    // Lembar isi: teksnya dari caption TPM 3, satu bagian per lembar. Pola
    // perbandingan sudah memakai dua bagian pertama di sampulnya, jadi lembar
    // isinya mulai dari bagian berikutnya.
    const geser = pola === "banding" ? 2 : 0;
    const teks = n.potongan[(ke - 1 + geser) % n.potongan.length];
    let bentuk = polaIsi(ctx, ke);
    // Daftar dengan satu butir terlihat seperti salah cetak, jadi naskah yang
    // tidak bisa dipecah dialihkan ke bentuk lain.
    if (bentuk === "daftar" && pecahKalimat(teks).length < 2) bentuk = "angka";
    if (bentuk === "angka") kartuAngka(p, teks, ke);
    else if (bentuk === "daftar") kartuDaftar(p, teks, n.judul);
    else kartuKutipan(p, teks);
  }

  if (!polaKeliru) {
    // Pada pola blok, kaki desain berdiri di dalam blok warna aksen.
    kaki(p, ke, total, total > 1 && sampul, pola === "blok" && sampul);

    // Pola yang benar wajib menghormati batas aman yang dipilih peserta.
    for (const l of p.layers) {
      if (l.type !== "text") continue;
      l.x = Math.max(l.x, m);
      l.y = Math.max(l.y, safeZone.top);
      l.w = Math.min(l.w, w - m - l.x);
    }
  }

  // Wordmark brand. Setiap lembar wajib membawa identitas merek sesuai Brand
  // Guideline, jadi yang menyesuaikan adalah posisinya, bukan ada-tidaknya.
  p.layers.push({
    type: "text",
    x: polaKeliru && pola === "tepi" ? 4 : m,
    y: polaKeliru ? p.S(0.86) : safeZone.top,
    w: p.isi,
    text: BRAND,
    size: p.S(0.026),
    color: p.warnaJudul,
    font: "judul",
    weight: "bold",
    // Di sudut kanan atas, menyeimbangkan label pilar di kiri.
    align: polaKeliru ? "left" : "right",
  });

  return {
    name: total > 1 ? `lembar-${ke + 1}` : "desain",
    label: total > 1 ? `Lembar ${ke + 1} dari ${total} · ${namaUkuran}` : namaUkuran,
    width: w,
    height: h,
    background: p.latar,
    layers: p.layers,
    safeZone,
  };
}

/* ------------------------------------------------------------------ */

const tpm4: TaskDefinition = {
  id: "tpm-4",
  navLabel: "Tugas 4",
  code: "TPM 4",
  title: "Mendesain Konten Visual",
  subtitle: "Format, tata letak, warna Brand Guideline, safe zone, dan ekspor PNG",
  available: true,
  dependsOn: "tpm-3",
  meta: {
    judulPelatihan: "Social Media Marketing",
    chapter: "Mendesain Konten Visual di Canva",
    tujuan:
      "Peserta mampu menerjemahkan rancangan konten menjadi konten visual, menyelaraskan desain dengan objective dan strategi konten, mengoperasikan tools desain, serta menerapkan prinsip desain content marketing, format konten, dan safe zone.",
  },
  caseStudy: {
    title: "Studi Kasus",
    paragraphs: [
      "Kamu adalah seorang Social Media Specialist di sebuah perusahaan bernama “FitActive”. Setelah menyusun content plan dan merancang ide konten secara detail, perusahaan ingin memastikan konten tersebut dapat diwujudkan dalam bentuk desain visual yang siap dipublikasikan.",
      "Sebagai bagian dari tim Social Media Specialist, kamu ditugaskan untuk menggunakan rancangan konten yang sudah dibuat pada praktik sebelumnya, lalu mendesain konten visualnya sesuai rancangan itu.",
      "Desain harus mengikuti Brand Guideline: warna dari palet resmi, judul memakai font Poppins, dan teks memakai font Arial.",
    ],
  },
  brandGuide: {
    judul: "Brand Guideline",
    pengantar:
      "Semua desain pada tugas ini mengikuti panduan merek berikut. Warna diambil dari palet resmi, judul memakai Poppins, dan teks isi memakai Arial. Pilihan yang kamu ambil di bawah akan langsung memakai warna dan font ini.",
    warna: [
      { kunci: "planBlue", nama: "Plan Blue" },
      { kunci: "lightBlue", nama: "Light Blue" },
      { kunci: "darkBlue", nama: "Dark Blue" },
      { kunci: "orange", nama: "Orange" },
      { kunci: "yellow", nama: "Yellow" },
      { kunci: "magenta", nama: "Magenta" },
      { kunci: "purple", nama: "Purple" },
      { kunci: "green", nama: "Green" },
      { kunci: "red", nama: "Red" },
      { kunci: "black", nama: "Black" },
      { kunci: "white", nama: "White" },
      { kunci: "lightGrey", nama: "Light Grey" },
    ],
    font: [
      { peran: "Judul", nama: "Poppins Bold", contoh: "Bahan yang bikin gerah" },
      { peran: "Teks isi", nama: "Arial Regular", contoh: "Pilih bahan yang benar-benar menyerap keringat." },
    ],
    catatan: [
      "Warna latar dan warna teks harus cukup kontras. Teks terang di atas latar gelap, atau sebaliknya.",
      "Pakai satu warna aksen saja per desain, untuk menandai bagian yang paling penting.",
      "Merah dan hijau dipakai terbatas, karena keduanya membawa arti peringatan dan keberhasilan.",
      "Wordmark FitActive selalu ikut tampil di setiap lembar desain.",
    ],
  },
  instructionSummary: [
    "Terjemahkan rancangan konten menjadi desain visual dengan menerapkan prinsip desain content marketing.",
    "Perhatikan format konten dan safe zone agar desain tampil optimal dan tidak tertutup antarmuka platform.",
    "Periksa konsistensi desain, kejelasan pesan, dan relevansinya dengan objective, lalu ekspor sebagai PNG.",
  ],
  submission: {
    fileNamePattern: `${KODE_KELAS}-tpm4-[Nama Lengkap Peserta]`,
    fileName: (nama) => `${KODE_KELAS}-tpm4-${nama}`,
    notes: [
      "Serahkan hasil desain dalam format PNG. Untuk konten carousel, kumpulkan seluruh lembarnya.",
      `Nama file ditulis dengan format ${KODE_KELAS}-tpm4-[Nama Lengkap Peserta]. Contoh: ${KODE_KELAS}-tpm4-Putri Amalia.png`,
      "Berkas PDF berisi spesifikasi desain dan resep Canva, untuk membuat ulang desain yang sama di Canva.",
    ],
  },

  /**
   * Token diambil dari TPM 3 lewat ctx.sumber. Karena TPM 3 sendiri memakai
   * TPM 2, memanggil fill() miliknya sudah menghasilkan nilai yang tersambung
   * sampai content plan.
   */
  tokens: (ctx) => {
    const dari = (t: string, fallback: string) => {
      const v = ctx.sumber?.fill(t);
      return v && !v.includes("{{") ? v : fallback;
    };
    const hookIsi = ctx.sumber?.answers["hook"]?.variant.fields?.isi;
    return {
      nama: ctx.nama,
      brand: BRAND,
      judulKonten: dari("{{judulKonten}}", "konten yang dipilih"),
      pilarKonten: dari("{{pilarKonten}}", "-"),
      tipeKonten: dari("{{tipeKonten}}", "Feed"),
      platformKonten: dari("{{platformKonten}}", "Instagram"),
      objectiveKonten: dari("{{objectiveKonten}}", "objective yang ditetapkan"),
      hookKonten: hookIsi && ctx.sumber ? ctx.sumber.fill(hookIsi) : "Hook dari rancangan konten",
    };
  },

  downloads: ["png", "pdf"],

  steps: [
    {
      id: "step-1",
      number: 1,
      title: "Tentukan Format dan Tata Letak",
      brief: [
        "Tentukan format dan ukuran kanvas sesuai tipe visual pada rancanganmu.",
        "Pilih susunan tata letak yang membuat hierarki visualnya jelas.",
      ],
      groups: tpm4Groups.slice(0, 2),
    },
    {
      id: "step-2",
      number: 2,
      title: "Tentukan Warna dan Teks Desain",
      brief: [
        "Pilih kombinasi warna dari Brand Guideline: Plan Blue, Light Blue, Orange, Yellow, Purple, Magenta, Dark Blue, Green, Red, serta netral hitam, putih, dan Light Grey.",
        "Tentukan teks yang tampil di desain. Naskah panjang tempatnya di caption, bukan di gambar.",
      ],
      groups: tpm4Groups.slice(2, 4),
    },
    {
      id: "step-3",
      number: 3,
      title: "Safe Zone dan Finalisasi",
      brief: [
        "Tentukan batas aman agar unsur penting tidak tertutup antarmuka platform.",
        "Periksa konsistensi desain, kejelasan pesan, dan relevansinya dengan objective sebelum diekspor.",
      ],
      groups: tpm4Groups.slice(4, 6),
    },
  ],

  buildDesigns: (ctx) => {
    const total = jumlahLembar(ctx);
    return Array.from({ length: total }, (_, i) => susunLembar(ctx, i, total));
  },

  buildDocument: (ctx) => {
    const b: DocBlock[] = [];
    const { w, h, nama: namaUkuran } = ukuranKanvas(ctx);
    const total = jumlahLembar(ctx);
    const persen = f(ctx, "safeZone", "margin", "10");
    const m = Math.round((Math.min(w, h) * Number(persen)) / 100);
    const isiLebar = w - m * 2;

    const namaWarna = (kunci: string, bawaan: string) => {
      const v = f(ctx, "warna", kunci, bawaan);
      return `${v} (${hex(v)})`;
    };

    b.push({ type: "title", text: judulDokumen });
    b.push({ type: "byline", text: `Nama Peserta: ${ctx.nama}` });

    b.push({ type: "label", text: "Konten yang Didesain" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        { label: "Judul Konten", value: ctx.fill("{{judulKonten}}") },
        { label: "Pilar Konten", value: ctx.fill("{{pilarKonten}}") },
        { label: "Tipe Visual pada Rancangan", value: ctx.fill("{{tipeKonten}}") },
        { label: "Platform", value: ctx.fill("{{platformKonten}}") },
        { label: "Marketing Objective", value: ctx.fill("{{objectiveKonten}}") },
        { label: "Hook pada Rancangan", value: ctx.fill("{{hookKonten}}") },
      ],
    });

    /* ---- Resep Canva: cukup rinci untuk membuat ulang desain yang sama ---- */
    // Angka pada resep dibaca balik dari lembar yang benar-benar digambar, jadi
    // resep dan gambarnya tidak mungkin berbeda meski pola tata letaknya berubah.
    const n = naskah(ctx);
    const lembarSampul = susunLembar(ctx, 0, total);
    const lembarAjakan = total > 1 ? susunLembar(ctx, total - 1, total) : lembarSampul;
    const teksDari = (spec: DesignSpec) =>
      spec.layers.filter((l): l is Extract<DesignLayer, { type: "text" }> => l.type === "text");
    const teksSampul = teksDari(lembarSampul);
    const cari = (isi: string, dari = teksSampul) =>
      isi ? dari.find((l) => l.text === isi) : undefined;

    const lChip = teksSampul.find((l) => l.highlight && l.text === n.pilar.toUpperCase());
    const lJudul =
      cari(n.judul) ??
      teksSampul.find((l) => l.font === "judul" && l.weight === "bold" && l.text !== BRAND);
    const lPendukung = cari(n.pendukung) ?? teksSampul.find((l) => l.font === "teks");
    const lHandle = cari(HANDLE);
    const lWordmark = cari(BRAND);

    const teksAjakan = teksDari(lembarAjakan);
    const pilAjakan = lembarAjakan.layers.find(
      (l): l is Extract<DesignLayer, { type: "rect" }> => l.type === "rect" && Boolean(l.radius)
    );
    const lAjakan = teksAjakan.find(
      (l) => l.align === "center" && l.font === "judul" && l.text !== BRAND
    );

    const posisi = (l?: { x: number; y: number }) =>
      l ? `di posisi x ${l.x} px, y ${l.y} px` : "di dalam garis bantu";
    const dimana = total > 1 ? `lembar ${total}` : "lembar yang sama";
    /** Membungkus naskah dengan tanda kutip, tanpa menggandakan yang sudah ada. */
    const kutip = (t: string) => `“${t.replace(/^[“"']+|[”"']+$/g, "")}”`;

    // Pola perbandingan tidak menaruh keterangan pendukung di sampulnya,
    // melainkan dua kotak berisi naskah. Resepnya menyebut kotak itu apa adanya.
    const kotakBanding = lembarSampul.layers.filter(
      (l): l is Extract<DesignLayer, { type: "rect" }> =>
        l.type === "rect" && Boolean(l.radius) && l.w === lembarSampul.width - m * 2
    );
    const teksKotak = teksSampul.filter((l) => l.font === "teks" && l.x > m);

    const langkahAjakan = pilAjakan && lAjakan
      ? `Pada ${dimana}, tambahkan rectangle sudut membulat ${pilAjakan.w} x ${pilAjakan.h} px, ` +
        `warna ${pilAjakan.fill}, di posisi x ${pilAjakan.x} px, y ${pilAjakan.y} px. Teks di dalamnya ` +
        `rata tengah, Poppins Bold ${lAjakan.size} px, warna ${lAjakan.color}, berbunyi ${kutip(lAjakan.text)}.` +
        (total > 1 ? ` Judul besar lembar itu memakai ajakanmu: ${kutip(n.cta)}.` : "")
      : `Tulis ajakan ${kutip(n.cta)} pada ${dimana} dengan Poppins Bold, warna ${hex(f(ctx, "warna", "aksen", "yellow"))}.`;

    const langkahKaki = lHandle
      ? `Tulis ${HANDLE} dengan Poppins Bold ${lHandle.size} px, warna ${lHandle.color}, ` +
        `${posisi(lHandle)}.` +
        (total > 1
          ? ` Sejajar di kanannya, susun ${total} titik penanda halaman; titik halaman aktif dibuat lebih besar dan berwarna aksen.`
          : "")
      : "Lewati langkah ini pada tata letak yang dipilih.";

    b.push({ type: "pageBreak" });
    b.push({ type: "label", text: "Resep Canva — Membuat Ulang Desain Ini" });
    b.push({
      type: "grid",
      head: ["Langkah", "Yang Dilakukan di Canva"],
      widths: [1, 3],
      rows: [
        [
          "1. Buat kanvas",
          `Custom size ${w} x ${h} px (${namaUkuran}).` +
            (total > 1 ? ` Buat ${total} halaman dengan ukuran yang sama.` : ""),
        ],
        [
          "2. Warna latar",
          `Klik latar, pilih warna kustom, masukkan kode ${hex(f(ctx, "warna", "latar", "planBlue"))}. Kode ini diambil dari Brand Guideline.`,
        ],
        [
          "3. Pasang garis bantu",
          `File > Settings > Show rulers and guides, lalu tarik garis bantu ${m} px dari tepi kiri dan kanan` +
            (lembarSampul.safeZone && lembarSampul.safeZone.top !== m
              ? `, dan ${lembarSampul.safeZone.top} px dari atas dan bawah karena antarmuka Reels menutupi kedua ujung layar.`
              : ", atas, dan bawah.") +
            " Semua unsur penting harus di dalamnya.",
        ],
        lChip
          ? [
              "4. Label pilar",
              `Tambahkan teks “${lChip.text}” dengan Poppins Bold ${lChip.size} px, warna ${lChip.color}, ` +
                `lalu beri kotak sudut membulat berwarna ${lChip.highlight?.fill} di belakangnya, ${posisi(lChip)}.`,
            ]
          : ["4. Label pilar", "Tata letak yang dipilih tidak memakai label pilar di atas judul."],
        [
          "5. Teks judul",
          `Tambahkan teks, font Poppins Bold, ukuran ${lJudul?.size ?? Math.round(h * 0.08)} px, ` +
            `warna ${lJudul?.color ?? hex(f(ctx, "warna", "judul", "white"))}, lebar kotak teks ${lJudul?.w ?? isiLebar} px, ` +
            `${posisi(lJudul)}. Isi: ${kutip(n.judul)}` +
            (lJudul?.highlight
              ? `. Beri blok warna ${lJudul.highlight.fill} di belakang tiap barisnya, seperti stabilo.`
              : "."),
        ],
        [
          "6. Teks pendukung",
          kotakBanding.length === 2
            ? `Sampul ini memakai dua kotak perbandingan selebar ${kotakBanding[0].w} px, tinggi ${kotakBanding[0].h} px, ` +
              `sudut membulat ${kotakBanding[0].radius} px, di posisi y ${kotakBanding[0].y} px dan y ${kotakBanding[1].y} px. ` +
              `Kotak atas berwarna ${kotakBanding[0].fill} berlabel “SERING KELIRU”, kotak bawah ${kotakBanding[1].fill} berlabel “LEBIH TEPAT”. ` +
              `Naskah di dalamnya memakai Arial ${teksKotak[0]?.size ?? Math.round(h * 0.03)} px.`
            : lPendukung
              ? `Tambahkan teks kedua, font Arial, ukuran ${lPendukung.size} px, warna ${lPendukung.color}, ` +
                `lebar kotak teks ${lPendukung.w} px, ${posisi(lPendukung)}. Isi: ${kutip(lPendukung.text)}`
              : `Pada carousel, keterangan pendukung tidak ditaruh di sampul melainkan dipecah ke lembar 2 sampai ${total - 1}, satu bagian caption per lembar.`,
        ],
        ["7. Ajakan (CTA)", langkahAjakan],
        ["8. Kaki desain", langkahKaki],
        [
          "9. Wordmark brand",
          `Tambahkan teks “${BRAND}” dengan font Poppins Bold ukuran ${lWordmark?.size ?? Math.round(h * 0.026)} px, ` +
            `warna ${lWordmark?.color ?? hex(f(ctx, "warna", "judul", "white"))}, ${posisi(lWordmark)}. ` +
            "Wordmark ikut tampil di setiap lembar.",
        ],
        [
          "10. Ekspor",
          "Share > Download > pilih PNG, lalu unduh." +
            (total > 1 ? " Untuk carousel, unduh seluruh halaman." : ""),
        ],
      ],
      caption:
        "Ikuti langkah ini di Canva bila kamu ingin melatih fitur-fiturnya sendiri. Hasilnya sama dengan PNG yang bisa langsung diunduh dari halaman ini.",
    });
    b.push({ type: "pageBreak" });
    b.push({ type: "label", text: "Spesifikasi Desain" });
    b.push({
      type: "fieldTable",
      labelAlign: "left",
      rows: [
        { label: "Ukuran Kanvas", value: `${w} x ${h} px · ${namaUkuran} · ${total} lembar · format PNG` },
        {
          label: "Warna",
          value: [
            `Latar: ${namaWarna("latar", "planBlue")}`,
            `Judul: ${namaWarna("judul", "white")}`,
            `Aksen: ${namaWarna("aksen", "yellow")}`,
            `Teks di atas aksen: ${namaWarna("teksAksen", "black")}`,
          ].join("\n"),
        },
        { label: "Font", value: "Judul: Poppins (Bold)\nTeks: Arial" },
        { label: "Safe Zone", value: `${persen}% dari tiap tepi, setara ${m} px` },
        {
          label: "Teks pada Desain",
          value: [
            `Judul: ${f(ctx, "teks", "judul", "")}`,
            `Pendukung: ${f(ctx, "teks", "pendukung", "")}`,
            `CTA: ${f(ctx, "teks", "cta", "") || "(tidak ada)"}`,
          ].join("\n"),
        },
      ],
    });

    b.push({ type: "label", text: "Alasan Pilihan Desain" });
    b.push({
      type: "analysis",
      observation: {
        title: [{ text: "Rancangan Sumber" }],
        lines: [
          ctx.fill("{{judulKonten}}"),
          "",
          `Pilar: ${ctx.fill("{{pilarKonten}}")}`,
          `Tipe visual: ${ctx.fill("{{tipeKonten}}")}`,
          `Objective: ${ctx.fill("{{objectiveKonten}}")}`,
        ],
      },
      rows: [
        { label: "Format Konten", value: uraian(ctx, "format") },
        { label: "Tata Letak", value: uraian(ctx, "layout") },
        { label: "Warna", value: uraian(ctx, "warna") },
        { label: "Teks", value: uraian(ctx, "teks") },
        { label: "Safe Zone", value: uraian(ctx, "safeZone") },
        { label: "Finalisasi", value: uraian(ctx, "finalisasi") },
      ],
    });

    return b;
  },
};

export default tpm4;
