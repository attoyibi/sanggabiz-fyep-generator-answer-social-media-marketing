"use client";

import type { DocBlock } from "@/tasks/types";

/** Menampilkan model dokumen yang sama persis dengan yang diekspor ke PDF/DOCX. */
export default function DocumentPreview({ blocks }: { blocks: DocBlock[] }) {
  return (
    <article className="doc-sheet">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </article>
  );
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "title":
      return (
        <div className="mb-5 border-b-[3px] border-brand pb-3">
          <h1>{block.text}</h1>
          {block.subtitle && <p className="!mb-0 !text-left text-ink-soft">{block.subtitle}</p>}
        </div>
      );

    case "meta":
      return (
        <dl className="mb-5 grid grid-cols-[minmax(0,7.5rem)_1fr] gap-x-3 gap-y-1.5 text-[0.85rem]">
          {block.rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-semibold text-ink-soft">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      );

    case "divider":
      return <hr className="my-5 border-line" />;

    case "heading":
      return <h2>{block.number ? `${block.number}. ${block.text}` : block.text}</h2>;

    case "subheading":
      return <h3>{block.text}</h3>;

    case "paragraph":
      return <p>{block.text}</p>;

    case "bullets":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <figure className="my-3 rounded-r-lg border-l-[3px] border-brand bg-brand-soft px-4 py-3">
          <blockquote className="text-[0.95rem] font-bold italic leading-snug">
            “{block.text}”
          </blockquote>
          {block.caption && (
            <figcaption className="mt-1.5 text-[0.75rem] text-ink-soft">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div className="my-2 overflow-x-auto">
          <table>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <p className="!mb-3 !text-left text-[0.75rem] italic text-ink-soft">{block.caption}</p>
          )}
        </div>
      );

    case "flow":
      return (
        <div className="my-3 space-y-0">
          {block.nodes.map((node, i) => (
            <div key={i}>
              <div className="rounded-lg border-2 border-brand bg-brand-soft px-4 py-3">
                <p className="!mb-1 !text-left text-[0.85rem] font-bold text-brand">{node.label}</p>
                <p className="!mb-0 !text-left whitespace-pre-line text-[0.82rem]">{node.caption}</p>
              </div>
              {i < block.nodes.length - 1 && (
                <div className="flex justify-center py-1.5 text-brand" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 4v16m0 0 6-6m-6 6-6-6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "mindmap":
      return (
        <div className="my-3">
          <div className="inline-block rounded-lg bg-ink px-4 py-2 text-[0.95rem] font-bold text-white">
            {block.root}
          </div>
          <div className="mt-2 space-y-3 border-l-2 border-brand pl-4">
            {block.branches.map((branch) => (
              <div key={branch.label}>
                <div className="relative">
                  <span
                    className="absolute -left-4 top-1/2 h-0.5 w-3 bg-brand"
                    aria-hidden="true"
                  />
                  <span className="inline-block rounded-md bg-brand px-3 py-1 text-[0.8rem] font-bold text-white">
                    {branch.label}
                  </span>
                </div>
                <ul className="mt-1.5 ml-3 border-l border-line pl-3">
                  {branch.children.map((child, i) => (
                    <li key={i} className="!pl-3 text-[0.82rem]">
                      {child}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}
