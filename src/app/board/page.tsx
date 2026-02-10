"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  boardMembersByTerm,
  boardTerms,
  type BoardMember,
  type BoardTerm,
} from "@/content/mock";

function getInitialTerm(terms: BoardTerm[]): BoardTerm | undefined {
  return terms.find((t) => t.isCurrent) ?? terms[0];
}

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (
    parts[0]!.charAt(0).toUpperCase() + parts[parts.length - 1]!.charAt(0).toUpperCase()
  );
}

export default function BoardPage() {
  const initialTerm = getInitialTerm(boardTerms);
  const [activeTermSlug, setActiveTermSlug] = useState(
    initialTerm?.slug ?? boardTerms[0]?.slug ?? "",
  );

  const activeTerm =
    boardTerms.find((term) => term.slug === activeTermSlug) ?? initialTerm;

  const members: BoardMember[] =
    (activeTerm && boardMembersByTerm[activeTerm.slug]) || [];

  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Leadership
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Meet the Board
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            The ISPE UCSD Student Chapter board helps plan programs, events, and
            partnerships that support students each year. Use the term selector
            to view current and past leadership teams.
          </p>
        </header>

        {/* Term switcher */}
        <section aria-label="Board terms" className="space-y-3">
          {/* Mobile select */}
          <div className="sm:hidden">
            <label
              htmlFor="board-term"
              className="mb-1 block text-xs font-medium text-slate-700"
            >
              Select board term
            </label>
            <select
              id="board-term"
              className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={activeTermSlug}
              onChange={(event) => setActiveTermSlug(event.target.value)}
            >
              {boardTerms.map((term) => (
                <option key={term.slug} value={term.slug}>
                  {term.label}
                  {term.isCurrent ? " (current)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop pill nav */}
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 p-1 text-sm sm:flex">
            {boardTerms.map((term) => {
              const isActive = term.slug === activeTermSlug;
              return (
                <button
                  key={term.slug}
                  type="button"
                  className={`rounded-full px-4 py-1.5 transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-white"
                  }`}
                  onClick={() => setActiveTermSlug(term.slug)}
                  aria-pressed={isActive}
                >
                  {term.label}
                  {term.isCurrent ? " • Current" : ""}
                </button>
              );
            })}
          </div>
        </section>

        {/* Board members */}
        <section
          aria-labelledby="board-members-heading"
          className="space-y-5 sm:space-y-6"
        >
          <SectionHeading
            eyebrow={activeTerm?.label}
            title="Board members"
            description={
              <p>
                All names, roles, and majors here are placeholders. Future
                officers can update this data or connect it to a CMS to keep
                each term&apos;s board history accurate.
              </p>
            }
          />

          {members.length === 0 ? (
            <p className="text-sm text-slate-600">
              There are no board members listed for this term yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <article
                  key={member.name + member.role}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-800">
                    {member.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <span aria-hidden="true">{getInitials(member.name)}</span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <h2 className="font-semibold text-slate-900">
                      {member.name}
                    </h2>
                    <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
                      {member.role}
                    </p>
                    {member.major ? (
                      <p className="text-xs text-slate-500">{member.major}</p>
                    ) : null}
                    {member.linkedin ? (
                      <p className="pt-1 text-xs">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-sky-700 underline-offset-2 hover:underline"
                        >
                          View LinkedIn
                        </a>
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}

