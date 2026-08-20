"use client";

import type { ChoiceGroup, Grade } from "@/tasks/types";
import { optionOrder, variantFor } from "@/lib/resolve";

interface Props {
  group: ChoiceGroup;
  taskId: string;
  seed: number;
  selected?: Grade;
  index: number;
  onSelect: (groupId: string, grade: Grade) => void;
  fill: (text: string) => string;
}

/**
 * Kartu pilihan jawaban. Tingkat kualitas tiap opsi sengaja tidak pernah
 * ditampilkan ke peserta; penilaian hanya tercermin pada kode di kaki dokumen.
 */
export default function ChoiceGroupCard({
  group,
  taskId,
  seed,
  selected,
  index,
  onSelect,
  fill,
}: Props) {
  const order = optionOrder(seed, taskId, group);

  return (
    <section
      id={`grup-${group.id}`}
      className="card overflow-hidden"
      aria-labelledby={`label-${group.id}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line bg-surface-soft px-4 py-3 sm:px-5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
          {index}
        </span>
        <h3 id={`label-${group.id}`} className="text-[0.95rem] font-bold">
          {group.question}
        </h3>
        {selected ? (
          <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
            Terisi
          </span>
        ) : (
          <span className="ml-auto rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft ring-1 ring-line">
            Belum dipilih
          </span>
        )}
      </div>

      <div className="px-4 py-4 sm:px-5">
        {group.hint && <p className="mb-3 text-[0.8rem] text-ink-soft">{group.hint}</p>}

        <div role="radiogroup" aria-labelledby={`label-${group.id}`} className="grid gap-2.5">
          {order.map((grade) => {
            const variant = variantFor(seed, taskId, group, grade);
            if (!variant) return null;
            const isSelected = selected === grade;

            return (
              <button
                key={grade}
                type="button"
                role="radio"
                aria-checked={isSelected}
                data-selected={isSelected}
                className="opt"
                onClick={() => onSelect(group.id, grade)}
              >
                <span className="block text-[0.9rem] font-semibold leading-snug">
                  {fill(variant.headline)}
                </span>
                <ul className="mt-1.5 space-y-1">
                  {variant.points.map((point, i) => (
                    <li
                      key={i}
                      className="relative pl-3 text-[0.8rem] leading-relaxed text-ink-soft before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-ink-soft/50"
                    >
                      {fill(point)}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
