import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignClasses}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <div className="max-w-2xl text-sm text-slate-600 sm:text-base">
          {description}
        </div>
      ) : null}
    </div>
  );
}

