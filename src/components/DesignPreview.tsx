"use client";

import { useEffect, useRef, useState } from "react";
import type { DesignSpec } from "@/tasks/types";
import { gambarDesain } from "@/lib/export/png";

/**
 * Pratinjau desain visual di layar. Menggambar spesifikasi yang sama persis
 * dengan yang dipakai saat mengunduh PNG, jadi apa yang terlihat di sini
 * adalah apa yang akan terunduh.
 */
export default function DesignPreview({ designs }: { designs: DesignSpec[] }) {
  const [tampilSafeZone, setTampilSafeZone] = useState(true);

  return (
    <div>
      <label className="mb-3 flex items-center gap-2 text-[0.8rem] text-ink-soft">
        <input
          type="checkbox"
          checked={tampilSafeZone}
          onChange={(e) => setTampilSafeZone(e.target.checked)}
          className="h-3.5 w-3.5 accent-brand"
        />
        Tampilkan batas <em>safe zone</em> (garis putus-putus, tidak ikut terunduh)
      </label>

      <div className="flex flex-wrap gap-4">
        {designs.map((spec) => (
          <Kanvas key={spec.name} spec={spec} tampilSafeZone={tampilSafeZone} />
        ))}
      </div>
    </div>
  );
}

function Kanvas({ spec, tampilSafeZone }: { spec: DesignSpec; tampilSafeZone: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let batal = false;
    // Poppins dimuat sebagai font web, jadi gambar diulang setelah fontnya siap
    // supaya pratinjau tidak memakai font pengganti.
    const gambar = () => {
      if (!batal && ref.current) gambarDesain(ref.current, spec);
    };
    gambar();
    document.fonts?.ready.then(gambar).catch(() => {});
    return () => {
      batal = true;
    };
  }, [spec]);

  // Lebar tampil dibatasi supaya desain 1080px tetap muat di layar.
  const lebarTampil = spec.width >= spec.height ? 260 : 190;
  const skala = lebarTampil / spec.width;

  return (
    <figure className="m-0">
      <div
        className="relative overflow-hidden rounded-lg ring-1 ring-line"
        style={{ width: lebarTampil, height: spec.height * skala }}
      >
        <canvas
          ref={ref}
          style={{
            width: lebarTampil,
            height: spec.height * skala,
            display: "block",
          }}
        />
        {tampilSafeZone && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute border border-dashed border-rose-500/70"
            style={{
              left: spec.safeZone.left * skala,
              top: spec.safeZone.top * skala,
              right: spec.safeZone.right * skala,
              bottom: spec.safeZone.bottom * skala,
            }}
          />
        )}
      </div>
      <figcaption className="mt-1.5 text-[0.72rem] text-ink-soft">
        {spec.label} · {spec.width}×{spec.height}px
      </figcaption>
    </figure>
  );
}
