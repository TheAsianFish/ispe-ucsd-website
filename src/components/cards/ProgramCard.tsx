import type { Program } from "@/content/mock";

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
        {program.title}
      </h3>
      <p className="text-sm text-slate-600">{program.description}</p>
    </article>
  );
}

