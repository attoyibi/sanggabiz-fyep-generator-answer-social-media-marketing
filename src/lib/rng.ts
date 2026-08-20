/**
 * PRNG deterministik. Seed dibuat ulang setiap halaman dimuat, lalu dipakai
 * konsisten selama halaman terbuka: varian jawaban dan urutan kartu stabil saat
 * peserta mengerjakan, tetapi berbeda bagi setiap orang yang membuka halaman.
 */

export function hashString(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Seed acak baru. Dipanggil sekali setiap halaman dimuat, sehingga dua orang
 * yang membuka halaman ini — bahkan orang yang sama membukanya dua kali —
 * mendapat varian jawaban yang berbeda.
 *
 * Sengaja tidak diturunkan dari nama peserta: dua peserta bernama sama pun
 * harus tetap memperoleh isi jawaban yang berbeda.
 */
export function createSeed(): number {
  const entropy =
    typeof crypto !== "undefined" && "getRandomValues" in crypto
      ? crypto.getRandomValues(new Uint32Array(1))[0]
      : Math.floor(Math.random() * 0xffffffff);
  return (entropy ^ Math.imul(Date.now() >>> 0, 2654435761)) >>> 0;
}

/**
 * Pengambil elemen deterministik: hasil hanya bergantung pada (seed, bucket),
 * bukan pada urutan pemanggilan. Aman dipakai di render React.
 */
export function makePicker(seed: number) {
  return function pick<T>(bucket: string, items: T[]): T {
    if (items.length === 0) throw new Error(`Bank jawaban kosong untuk "${bucket}"`);
    const rand = mulberry32((seed ^ hashString(bucket)) >>> 0);
    // buang dua nilai pertama supaya bucket dengan hash berdekatan tidak berkorelasi
    rand();
    rand();
    return items[Math.floor(rand() * items.length) % items.length];
  };
}

/** Pengacak urutan deterministik (Fisher-Yates) untuk urutan tampil kartu pilihan. */
export function shuffleWithSeed<T>(items: T[], seed: number, bucket: string): T[] {
  const rand = mulberry32((seed ^ hashString(bucket)) >>> 0);
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
