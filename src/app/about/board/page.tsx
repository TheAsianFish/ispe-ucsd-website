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
import { BoardMemberTile } from "@/components/cards/BoardMemberTile";

function getInitialTerm(terms: BoardTerm[]): BoardTerm | undefined {
  return terms.find((t) => t.isCurrent) ?? terms[0];
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
            <div className="grid gap-8 sm:grid-cols-2">
              {members.map((member) => (
                <BoardMemberTile
                  key={member.name + member.role}
                  member={member}
                />
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}

