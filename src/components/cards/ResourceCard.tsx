import type { Resource } from "@/content/mock";

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          {resource.title}
        </h3>
        <span aria-hidden="true" className="text-slate-400">
          ↗
        </span>
      </div>
      <p className="text-sm text-slate-600">{resource.description}</p>
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className="mt-auto text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
      >
        Visit resource
      </a>
    </article>
  );
}

