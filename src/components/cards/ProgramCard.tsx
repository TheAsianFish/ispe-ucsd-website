import Link from "next/link";

import type { Program } from "@/content/types";

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  const content = (
    <>
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
        {program.title}
      </h3>
      <p className="text-sm text-slate-600">{program.description}</p>
    </>
  );

  const cardClasses =
    "flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

  if (program.slug) {
    return (
      <Link
        href={`/programs/${program.slug}`}
        className={`block ${cardClasses} transition hover:border-sky-200 hover:shadow-md`}
      >
        <article>{content}</article>
      </Link>
    );
  }

  return <article className={cardClasses}>{content}</article>;
}

