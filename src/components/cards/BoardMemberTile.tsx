import Image from "next/image";

import type { BoardMember } from "@/content/mock";

type BoardMemberTileProps = {
  member: BoardMember;
};

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (
    parts[0]!.charAt(0).toUpperCase() +
    parts[parts.length - 1]!.charAt(0).toUpperCase()
  );
}

export function BoardMemberTile({ member }: BoardMemberTileProps) {
  const hasPhoto = Boolean(member.photo);

  return (
    <article className="flex flex-col items-center">
      <div className="relative mb-3 w-full max-w-xs overflow-hidden rounded-lg bg-slate-200 aspect-[4/3]">
        {hasPhoto ? (
          <Image
            src={member.photo as string}
            alt={member.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-150 ease-out hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-500">
            <span aria-hidden="true">{getInitials(member.name)}</span>
          </div>
        )}
      </div>
      <div className="text-center text-sm">
        <p className="text-base font-medium text-sky-700 transition-colors duration-150 ease-out hover:underline">
          {member.name}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          {member.role}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {member.major} &middot; {member.classYear}
        </p>
        {member.linkedin ? (
          <p className="mt-2 text-xs">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sky-700 underline-offset-2 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
}

