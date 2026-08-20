"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getNavItems } from "@/tasks/registry";

export default function Navbar({ activeId }: { activeId: string }) {
  const items = getNavItems();
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  // Geser navbar supaya tugas yang sedang dibuka selalu terlihat.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeId]);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="mb-2.5 flex items-baseline gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            Generator Tugas
          </span>
          <span className="text-[11px] text-ink-soft">Praktik Mandiri</span>
        </div>

        <nav
          aria-label="Daftar tugas praktik mandiri"
          className="nav-scroll -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1"
        >
          {items.map((item) => {
            const isActive = item.id === activeId;
            if (!item.available) {
              return (
                <span
                  key={item.id}
                  aria-disabled="true"
                  title="Tugas ini belum tersedia"
                  className="flex shrink-0 snap-start items-center gap-1.5 rounded-full border border-dashed border-line bg-surface-soft px-3.5 py-2 text-[13px] font-medium text-ink-soft/60"
                >
                  <LockIcon />
                  {item.label}
                </span>
              );
            }
            return (
              <Link
                key={item.id}
                href={`/tugas/${item.id}`}
                ref={isActive ? activeRef : undefined}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "shrink-0 snap-start rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white shadow-sm"
                    : "shrink-0 snap-start rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
