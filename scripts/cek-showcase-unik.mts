/**
 * Skrip pemeriksaan: mensimulasikan N peserta jalur mitra (grade "tepat"
 * semua) lalu menghitung keunikan visual (warna+latar+gaya tiap kartu
 * Individual Showcase) dan keunikan isi Visual Gallery, tanpa perlu browser.
 *
 * Pakai: npm run cek -- cek-showcase-unik [jumlah]
 */
import { buildContext, allGroups } from "../src/lib/resolve.ts";
import { getTask } from "../src/tasks/registry.ts";
import type { DesignLayer, Grade } from "../src/tasks/types.ts";

const N = Number(process.argv[2] ?? 50);
const task = getTask("capstone")!;

const selections: Record<string, Grade> = {};
for (const g of allGroups(task)) selections[g.id] = "tepat";

const fingerprints: string[] = [];
const galeriVariantIds: string[] = [];
const dokumenFingerprints: string[] = [];
const perPosisi: Record<number, Set<string>> = { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set() };

for (let i = 0; i < N; i++) {
  // Meniru createSeed(): tiap "peserta" mendapat seed acak independen,
  // sama seperti tiap kali seseorang membuka halaman di dunia nyata.
  const seed = Math.floor(Math.random() * 0xffffffff);
  const ctx = buildContext(task, `Peserta ${i + 1}`, seed, selections, undefined, {
    mode: "mitra",
    form: {},
  });

  galeriVariantIds.push(ctx.answers["galeri"]?.variant.id ?? "?");
  dokumenFingerprints.push(
    Object.keys(ctx.answers)
      .sort()
      .map((k) => ctx.answers[k].variant.id)
      .join(",")
  );

  const slides = task.buildSlides!(ctx);
  const showcase = slides.filter((s) => s.title.startsWith("Individual Showcase"));
  const fp: string[] = [];

  showcase.forEach((s, idx) => {
    const spec = s.visual;
    if (!spec) return;
    const latar = spec.background;
    const badge = spec.layers.find((l): l is Extract<DesignLayer, { type: "ellipse" }> => l.type === "ellipse");
    const aksen = badge?.fill ?? "?";
    const jumlahPil = spec.layers.filter((l) => l.type === "rect" && l.radius === 24).length;
    const gaya = jumlahPil >= 2 ? "tumpuk" : "alur";
    const tanda = `${latar}|${aksen}|${gaya}`;
    perPosisi[idx]?.add(tanda);
    fp.push(tanda);
  });

  fingerprints.push(fp.join(";"));
}

const uniqFull = new Set(fingerprints).size;
const uniqGaleri = new Set(galeriVariantIds).size;

console.log(`Peserta disimulasikan          : ${N}`);
console.log(`Variasi isi Visual Gallery ("tepat"): ${uniqGaleri} varian berbeda dipakai dari ${N} peserta`);
for (const [idx, set] of Object.entries(perPosisi)) {
  console.log(`Kombinasi warna+latar+gaya, kartu ke-${Number(idx) + 1}: ${set.size} kombinasi berbeda`);
}
console.log(`Kombinasi visual LENGKAP (4 kartu sekaligus) yang unik: ${uniqFull} dari ${N} peserta`);
console.log(`  -> peserta yang berbagi kombinasi visual lengkap identik dengan peserta lain: ${N - uniqFull}`);

const uniqDokumen = new Set(dokumenFingerprints).size;
console.log(`Kombinasi TEKS seluruh dokumen (9 bagian sekaligus) yang unik: ${uniqDokumen} dari ${N} peserta`);
console.log(`  -> peserta yang teks seluruh dokumennya identik dengan peserta lain: ${N - uniqDokumen}`);

process.exit(0);
