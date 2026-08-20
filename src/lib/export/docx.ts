import type { DocBlock } from "@/tasks/types";
import { downloadBlob, safeFileName } from "../download";

const NAVY = "0F2A54";
const BLUE = "1565D8";
const GREY = "5A6476";
const SOFT = "F0F5FD";
/** Abu sangat muda untuk kode penilaian di kaki halaman: terbaca bila dicari, tidak mencolok. */
const FAINT = "C6CDD8";

export async function exportDocx(
  blocks: DocBlock[],
  fileBaseName: string,
  /** Kode penilaian untuk pemeriksa, mis. "fyep-90". */
  kodeNilai?: string
): Promise<void> {
  const d = await import("docx");
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    Footer,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    ShadingType,
  } = d;

  const children: InstanceType<typeof Paragraph>[] | unknown[] = [];
  const push = (item: unknown) => (children as unknown[]).push(item);

  const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } as const;
  const thin = { style: BorderStyle.SINGLE, size: 4, color: "D6DDE8" } as const;

  /** Paragraf multi-baris: teks dengan \n dipecah agar tetap rapi di Word. */
  const runs = (text: string, opts: { bold?: boolean; italics?: boolean; color?: string; size?: number }) =>
    text.split("\n").flatMap((line, i) =>
      i === 0
        ? [new TextRun({ text: line, ...opts })]
        : [new TextRun({ text: line, break: 1, ...opts })]
    );

  for (const block of blocks) {
    switch (block.type) {
      case "title":
        push(
          new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: block.text, bold: true, size: 40, color: NAVY })],
          })
        );
        if (block.subtitle) {
          push(
            new Paragraph({
              spacing: { after: 200 },
              border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: BLUE } },
              children: [new TextRun({ text: block.subtitle, size: 21, color: GREY })],
            })
          );
        }
        break;

      case "meta":
        push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
              insideHorizontal: noBorder, insideVertical: noBorder,
            },
            rows: block.rows.map(
              ([k, v]) =>
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 26, type: WidthType.PERCENTAGE },
                      margins: { top: 40, bottom: 40, right: 120 },
                      children: [
                        new Paragraph({ children: [new TextRun({ text: k, bold: true, size: 20, color: GREY })] }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 74, type: WidthType.PERCENTAGE },
                      margins: { top: 40, bottom: 40 },
                      children: [new Paragraph({ children: runs(v, { size: 20, color: NAVY }) })],
                    }),
                  ],
                })
            ),
          })
        );
        push(new Paragraph({ text: "", spacing: { after: 120 } }));
        break;

      case "divider":
        push(
          new Paragraph({
            spacing: { before: 120, after: 160 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "D6DDE8" } },
            children: [],
          })
        );
        break;

      case "heading":
        push(
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 320, after: 140 },
            children: [
              new TextRun({
                text: (block.number ? `${block.number}. ${block.text}` : block.text).toUpperCase(),
                bold: true,
                size: 26,
                color: NAVY,
              }),
            ],
          })
        );
        break;

      case "subheading":
        push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: block.text, bold: true, size: 23, color: BLUE })],
          })
        );
        break;

      case "paragraph":
        push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 140, line: 320 },
            children: runs(block.text, { size: 21, color: NAVY }),
          })
        );
        break;

      case "bullets":
        for (const item of block.items) {
          push(
            new Paragraph({
              bullet: { level: 0 },
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 80, line: 300 },
              children: runs(item, { size: 21, color: NAVY }),
            })
          );
        }
        push(new Paragraph({ text: "", spacing: { after: 80 } }));
        break;

      case "quote":
        push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: noBorder, bottom: noBorder, right: noBorder,
              insideHorizontal: noBorder, insideVertical: noBorder,
              left: { style: BorderStyle.SINGLE, size: 18, color: BLUE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: SOFT },
                    margins: { top: 160, bottom: 160, left: 200, right: 200 },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: `“${block.text}”`, bold: true, italics: true, size: 24, color: NAVY })],
                      }),
                      ...(block.caption
                        ? [
                            new Paragraph({
                              spacing: { before: 80 },
                              children: [new TextRun({ text: block.caption, size: 18, color: GREY })],
                            }),
                          ]
                        : []),
                    ],
                  }),
                ],
              }),
            ],
          })
        );
        push(new Paragraph({ text: "", spacing: { after: 160 } }));
        break;

      case "table":
        push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: thin, bottom: thin, left: thin, right: thin,
              insideHorizontal: thin, insideVertical: thin,
            },
            rows: [
              new TableRow({
                tableHeader: true,
                children: block.head.map(
                  (h) =>
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: NAVY },
                      margins: { top: 100, bottom: 100, left: 120, right: 120 },
                      children: [
                        new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 19, color: "FFFFFF" })] }),
                      ],
                    })
                ),
              }),
              ...block.rows.map(
                (row, ri) =>
                  new TableRow({
                    children: row.map(
                      (cell, ci) =>
                        new TableCell({
                          shading:
                            ri % 2 === 1
                              ? { type: ShadingType.CLEAR, fill: "F8FAFE" }
                              : undefined,
                          margins: { top: 100, bottom: 100, left: 120, right: 120 },
                          children: [
                            new Paragraph({
                              children: runs(cell, {
                                size: 18,
                                bold: ci === 0,
                                color: ci === 0 ? BLUE : NAVY,
                              }),
                            }),
                          ],
                        })
                    ),
                  })
              ),
            ],
          })
        );
        if (block.caption) {
          push(
            new Paragraph({
              spacing: { before: 80, after: 160 },
              children: [new TextRun({ text: block.caption, italics: true, size: 17, color: GREY })],
            })
          );
        } else {
          push(new Paragraph({ text: "", spacing: { after: 160 } }));
        }
        break;

      case "flow":
        block.nodes.forEach((node, i) => {
          push(
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 6, color: BLUE },
                bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE },
                left: { style: BorderStyle.SINGLE, size: 6, color: BLUE },
                right: { style: BorderStyle.SINGLE, size: 6, color: BLUE },
                insideHorizontal: noBorder, insideVertical: noBorder,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { type: ShadingType.CLEAR, fill: SOFT },
                      margins: { top: 140, bottom: 140, left: 180, right: 180 },
                      children: [
                        new Paragraph({ children: [new TextRun({ text: node.label, bold: true, size: 21, color: BLUE })] }),
                        new Paragraph({ spacing: { before: 60 }, children: runs(node.caption, { size: 19, color: NAVY }) }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          );
          if (i < block.nodes.length - 1) {
            push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 60, after: 60 },
                children: [new TextRun({ text: "▼", bold: true, size: 24, color: BLUE })],
              })
            );
          }
        });
        push(new Paragraph({ text: "", spacing: { after: 160 } }));
        break;

      case "mindmap":
        push(
          new Paragraph({
            spacing: { after: 120 },
            children: [new TextRun({ text: `● ${block.root}`, bold: true, size: 26, color: NAVY })],
          })
        );
        for (const branch of block.branches) {
          push(
            new Paragraph({
              indent: { left: 360 },
              spacing: { before: 120, after: 60 },
              children: [new TextRun({ text: `├─ ${branch.label}`, bold: true, size: 22, color: BLUE })],
            })
          );
          branch.children.forEach((child, ci) => {
            const last = ci === branch.children.length - 1;
            push(
              new Paragraph({
                indent: { left: 900 },
                spacing: { after: 50, line: 280 },
                children: runs(`${last ? "└─" : "├─"} ${child}`, { size: 19, color: NAVY }),
              })
            );
          });
        }
        push(new Paragraph({ text: "", spacing: { after: 160 } }));
        break;
    }
  }

  // Kaki halaman berisi kode penilaian kecil di kanan, untuk pemeriksa.
  const footers = kodeNilai
    ? {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: kodeNilai, size: 11, color: FAINT })],
            }),
          ],
        }),
      }
    : undefined;

  const doc = new Document({
    creator: "Generator Tugas Praktik Mandiri",
    title: fileBaseName,
    description: "Tugas Praktik Mandiri",
    // Disalin juga ke metadata agar pemeriksa bisa membacanya secara massal.
    keywords: kodeNilai ?? "",
    styles: {
      default: {
        document: { run: { font: "Calibri", size: 21, color: NAVY } },
      },
    },
    sections: [
      {
        properties: {
          page: { margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 } },
        },
        footers,
        children: children as never,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `${safeFileName(fileBaseName)}.docx`);
}
