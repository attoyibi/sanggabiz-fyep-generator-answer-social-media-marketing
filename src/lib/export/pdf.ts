import type { DocBlock } from "@/tasks/types";
import { downloadBlob, safeFileName } from "../download";

/** Helvetica bawaan jsPDF hanya mendukung Latin-1, jadi tanda kutip melengkung diluruskan. */
function ascii(text: string): string {
  return text
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/ /g, " ");
}

const MARGIN = 18;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN * 2;
/** Selisih kecil metrik font antara jsPDF dan pembaca PDF; dipotong agar teks pasti di dalam margin. */
const WRAP_SLACK = 1.5;

const NAVY: [number, number, number] = [15, 42, 84];
const BLUE: [number, number, number] = [21, 101, 216];
const GREY: [number, number, number] = [90, 100, 118];
const LINE: [number, number, number] = [214, 221, 232];
const SOFT: [number, number, number] = [240, 245, 253];
/** Abu sangat muda untuk kode penilaian di kaki halaman: terbaca bila dicari, tidak mencolok. */
const FAINT: [number, number, number] = [198, 205, 216];

export async function exportPdf(
  blocks: DocBlock[],
  fileBaseName: string,
  /** Kode penilaian untuk pemeriksa, mis. "fyep-90". */
  kodeNilai?: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });

  let y = MARGIN;

  const ensure = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const text = (
    value: string,
    opts: {
      size?: number;
      style?: "normal" | "bold" | "italic";
      color?: [number, number, number];
      x?: number;
      width?: number;
      lineGap?: number;
    } = {}
  ) => {
    const size = opts.size ?? 10.5;
    const x = opts.x ?? MARGIN;
    const width = opts.width ?? CONTENT_W;
    const gap = opts.lineGap ?? 1.45;
    doc.setFont("helvetica", opts.style ?? "normal");
    doc.setFontSize(size);
    doc.setTextColor(...(opts.color ?? NAVY));
    const lines = doc.splitTextToSize(ascii(value), width - WRAP_SLACK) as string[];
    const lh = (size * gap) / 2.83465;
    for (const line of lines) {
      ensure(lh + 1);
      doc.text(line, x, y + lh * 0.75);
      y += lh;
    }
  };

  const measure = (value: string, size: number, width: number, gap = 1.45) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(ascii(value), width - WRAP_SLACK) as string[];
    return { lines, height: (lines.length * (size * gap)) / 2.83465 };
  };

  for (const block of blocks) {
    switch (block.type) {
      case "title": {
        ensure(30);
        doc.setFillColor(...NAVY);
        doc.rect(MARGIN, y, CONTENT_W, 0.9, "F");
        y += 6;
        text(block.text, { size: 19, style: "bold", lineGap: 1.25 });
        if (block.subtitle) {
          y += 1;
          text(block.subtitle, { size: 10.5, color: GREY });
        }
        y += 2;
        doc.setFillColor(...BLUE);
        doc.rect(MARGIN, y, 28, 1.2, "F");
        y += 6;
        break;
      }

      case "meta": {
        const labelW = 42;
        for (const [k, v] of block.rows) {
          const m = measure(v, 10, CONTENT_W - labelW - 4);
          ensure(m.height + 2);
          const rowTop = y;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(...GREY);
          doc.text(ascii(k), MARGIN, y + 3.4);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(...NAVY);
          let ly = y;
          for (const line of m.lines) {
            doc.text(line, MARGIN + labelW, ly + 3.4);
            ly += (10 * 1.45) / 2.83465;
          }
          y = rowTop + m.height + 1.6;
        }
        y += 2;
        break;
      }

      case "divider": {
        ensure(6);
        doc.setDrawColor(...LINE);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, y + 1, PAGE_W - MARGIN, y + 1);
        y += 6;
        break;
      }

      case "heading": {
        ensure(16);
        y += 3;
        const label = block.number ? `${block.number}. ${block.text}` : block.text;
        doc.setFillColor(...BLUE);
        doc.rect(MARGIN, y, 2.2, 6.4, "F");
        text(label.toUpperCase(), { size: 12.5, style: "bold", x: MARGIN + 5.5, width: CONTENT_W - 5.5 });
        y += 3.5;
        break;
      }

      case "subheading": {
        ensure(10);
        y += 1.5;
        text(block.text, { size: 11, style: "bold", color: BLUE });
        y += 1.2;
        break;
      }

      case "paragraph": {
        text(block.text, { size: 10.5, lineGap: 1.55 });
        y += 2.6;
        break;
      }

      case "bullets": {
        for (const item of block.items) {
          const m = measure(item, 10.5, CONTENT_W - 6, 1.5);
          ensure(m.height + 1);
          doc.setFillColor(...BLUE);
          doc.circle(MARGIN + 1.6, y + 2.5, 0.85, "F");
          let ly = y;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10.5);
          doc.setTextColor(...NAVY);
          for (const line of m.lines) {
            doc.text(line, MARGIN + 6, ly + 3.5);
            ly += (10.5 * 1.5) / 2.83465;
          }
          y += m.height + 1.4;
        }
        y += 2;
        break;
      }

      case "quote": {
        const m = measure(block.text, 12, CONTENT_W - 14, 1.4);
        const capH = block.caption ? measure(block.caption, 9, CONTENT_W - 14, 1.4).height : 0;
        const boxH = m.height + capH + (block.caption ? 10 : 7);
        ensure(boxH + 4);
        doc.setFillColor(...SOFT);
        doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 2, 2, "F");
        doc.setFillColor(...BLUE);
        doc.rect(MARGIN, y, 2.2, boxH, "F");
        let ly = y + 3;
        doc.setFont("helvetica", "bolditalic");
        doc.setFontSize(12);
        doc.setTextColor(...NAVY);
        for (const line of m.lines) {
          doc.text(`${line}`, MARGIN + 8, ly + 4);
          ly += (12 * 1.4) / 2.83465;
        }
        if (block.caption) {
          const cm = measure(block.caption, 9, CONTENT_W - 14, 1.4);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(...GREY);
          ly += 1;
          for (const line of cm.lines) {
            doc.text(line, MARGIN + 8, ly + 4);
            ly += (9 * 1.4) / 2.83465;
          }
        }
        y += boxH + 5;
        break;
      }

      case "table": {
        const cols = block.head.length;
        const widths =
          cols === 3 ? [CONTENT_W * 0.24, CONTENT_W * 0.34, CONTENT_W * 0.42] : Array(cols).fill(CONTENT_W / cols);
        const cellPad = 2.2;

        const drawHead = () => {
          ensure(11);
          doc.setFillColor(...NAVY);
          doc.rect(MARGIN, y, CONTENT_W, 8.5, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.5);
          doc.setTextColor(255, 255, 255);
          let x = MARGIN;
          block.head.forEach((h, i) => {
            doc.text(ascii(h), x + cellPad, y + 5.6);
            x += widths[i];
          });
          y += 8.5;
        };

        drawHead();

        block.rows.forEach((row, ri) => {
          const cellLines = row.map((cell, i) => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            return doc.splitTextToSize(ascii(cell), widths[i] - cellPad * 2 - WRAP_SLACK) as string[];
          });
          const maxLines = Math.max(...cellLines.map((l) => l.length));
          const lh = (9 * 1.45) / 2.83465;
          const rowH = maxLines * lh + cellPad * 2;

          if (y + rowH > PAGE_H - MARGIN) {
            doc.addPage();
            y = MARGIN;
            drawHead();
          }

          if (ri % 2 === 1) {
            doc.setFillColor(248, 250, 254);
            doc.rect(MARGIN, y, CONTENT_W, rowH, "F");
          }
          doc.setDrawColor(...LINE);
          doc.setLineWidth(0.2);
          doc.line(MARGIN, y + rowH, PAGE_W - MARGIN, y + rowH);

          let x = MARGIN;
          cellLines.forEach((lines, i) => {
            doc.setFont("helvetica", i === 0 ? "bold" : "normal");
            doc.setFontSize(9);
            doc.setTextColor(...(i === 0 ? BLUE : NAVY));
            let ly = y + cellPad;
            for (const line of lines) {
              doc.text(line, x + cellPad, ly + 3.1);
              ly += lh;
            }
            x += widths[i];
          });
          y += rowH;
        });

        if (block.caption) {
          y += 2;
          text(block.caption, { size: 8.5, style: "italic", color: GREY });
        }
        y += 5;
        break;
      }

      case "flow": {
        for (let i = 0; i < block.nodes.length; i++) {
          const node = block.nodes[i];
          const cm = measure(node.caption, 9, CONTENT_W - 16, 1.45);
          const boxH = cm.height + 12;
          ensure(boxH + 12);
          doc.setFillColor(...SOFT);
          doc.setDrawColor(...BLUE);
          doc.setLineWidth(0.4);
          doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 2.5, 2.5, "FD");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(...BLUE);
          doc.text(ascii(node.label), MARGIN + 6, y + 6.5);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(...NAVY);
          let ly = y + 8.5;
          for (const line of cm.lines) {
            doc.text(line, MARGIN + 6, ly + 3.1);
            ly += (9 * 1.45) / 2.83465;
          }
          y += boxH;

          if (i < block.nodes.length - 1) {
            const cx = PAGE_W / 2;
            doc.setDrawColor(...BLUE);
            doc.setLineWidth(0.6);
            doc.line(cx, y + 1.5, cx, y + 7);
            doc.setFillColor(...BLUE);
            doc.triangle(cx - 1.8, y + 6.4, cx + 1.8, y + 6.4, cx, y + 9, "F");
            y += 10.5;
          }
        }
        y += 5;
        break;
      }

      case "mindmap": {
        ensure(20);
        const rootW = 52;
        doc.setFillColor(...NAVY);
        doc.roundedRect(MARGIN, y, rootW, 9, 2, 2, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.text(ascii(block.root), MARGIN + 5, y + 6);
        const rootCenterY = y + 4.5;
        y += 12;

        const trunkX = MARGIN + 10;
        const startY = rootCenterY;

        for (const branch of block.branches) {
          ensure(14);
          const branchY = y + 3.5;
          doc.setDrawColor(...BLUE);
          doc.setLineWidth(0.5);
          doc.line(trunkX, y - 2.5, trunkX, branchY);
          doc.line(trunkX, branchY, trunkX + 8, branchY);
          doc.setFillColor(...BLUE);
          doc.roundedRect(trunkX + 8, y, 44, 7, 1.6, 1.6, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.5);
          doc.setTextColor(255, 255, 255);
          doc.text(ascii(branch.label), trunkX + 12, y + 4.8);
          y += 9;

          for (const child of branch.children) {
            const cm = measure(child, 9, CONTENT_W - 40, 1.45);
            ensure(cm.height + 3);
            const childX = trunkX + 22;
            doc.setDrawColor(...LINE);
            doc.setLineWidth(0.4);
            doc.line(childX - 6, y - 1, childX - 6, y + 3);
            doc.line(childX - 6, y + 3, childX - 2, y + 3);
            doc.setFillColor(...BLUE);
            doc.circle(childX, y + 3, 0.9, "F");
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(...NAVY);
            let ly = y;
            for (const line of cm.lines) {
              doc.text(line, childX + 3.5, ly + 4.1);
              ly += (9 * 1.45) / 2.83465;
            }
            y += cm.height + 2;
          }
          y += 2.5;
        }
        void startY;
        y += 4;
        break;
      }
    }
  }

  // Kaki halaman: nomor halaman di tengah, kode penilaian kecil di kanan.
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GREY);
    doc.text(`Halaman ${p} dari ${total}`, PAGE_W / 2, PAGE_H - 9, { align: "center" });

    if (kodeNilai) {
      doc.setFontSize(5.5);
      doc.setTextColor(...FAINT);
      doc.text(kodeNilai, PAGE_W - MARGIN, PAGE_H - 9, { align: "right" });
    }
  }

  doc.setProperties({
    title: fileBaseName,
    subject: "Tugas Praktik Mandiri",
    creator: "Generator Tugas Praktik Mandiri",
    // Disalin juga ke metadata agar pemeriksa bisa membacanya secara massal.
    keywords: kodeNilai ?? "",
  });
  const blob = doc.output("blob");
  downloadBlob(blob, `${safeFileName(fileBaseName)}.pdf`);
}
