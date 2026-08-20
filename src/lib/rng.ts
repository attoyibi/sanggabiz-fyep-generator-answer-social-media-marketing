/**
 * PRNG deterministik. Seed disimpan di localStorage sehingga varian jawaban
 * seorang peserta tetap sama saat halaman di-reload, tapi berbeda antar peserta.
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

/** Seed baru yang benar-benar acak (dipakai saat peserta pertama kali mengisi nama). */
export function createSeed(nama: string): number {
  const entropy =
    typeof crypto !== "undefined" && "getRandomValues" in crypto
      ? crypto.getRandomValues(new Uint32Array(1))[0]
      : Math.floor(Math.random() * 0xffffffff);
  return (hashString(nama) ^ entropy ^ Date.now()) >>> 0;
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
