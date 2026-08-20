/** Nama file aman untuk semua sistem operasi, tanpa mengubah format yang diminta PDF. */
export function safeFileName(name: string): string {
  return name
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

export function downloadBlob(blob: Blob, filename: string): void {
  if (!blob || blob.size === 0) {
    throw new Error("Berkas yang dihasilkan kosong.");
  }

  // Edge/IE lama memakai jalur tersendiri.
  const nav = navigator as Navigator & {
    msSaveOrOpenBlob?: (b: Blob, n: string) => boolean;
  };
  if (typeof nav.msSaveOrOpenBlob === "function") {
    nav.msSaveOrOpenBlob(blob, filename);
    return;
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();

  // Sebagian browser masih menulis berkas beberapa detik setelah klik.
  // Melepas URL terlalu cepat membuat unduhan batal, jadi ditunda cukup lama.
  window.setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 60_000);
}
