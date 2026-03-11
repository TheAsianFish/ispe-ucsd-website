import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/cards/ProgramCard";
import type { Program } from "@/content/types";
import {
  getAllPrograms,
  type ProgramCMSSummary,
} from "@/sanity/lib/queries/programs";

export const metadata: Metadata = {
  title: "Programs",
};

/** Revalidate at most every 60s so Sanity edits show on Vercel. */
export const revalidate = 60;

function cmsToProgram(p: ProgramCMSSummary): Program {
  return {
    id: p._id,
    slug: p.slug ?? undefined,
    title: p.title,
    description: p.shortDescription,
  };
}

export default async function ProgramsPage() {
  const cmsPrograms = await getAllPrograms();
  const programs = cmsPrograms.map(cmsToProgram);

  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Programs
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Programs offered through ISPE UCSD.
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            From mentorship to site visits, our programs are designed to make
            the path into pharma and biotech more approachable. Click a program
            to learn more.
          </p>
        </header>

        <section aria-labelledby="programs-list" className="space-y-6">
          <SectionHeading
            eyebrow="Overview"
            title="Ways students can get involved."
            description="Each program is intentionally lightweight so it can evolve over time without requiring a rebuild of the site."
          />
          {programs.length === 0 ? (
          <p className="text-sm text-slate-600">
            We don&apos;t have any programs to show yet. Stay tuned—we&apos;ll
            add them here soon.
          </p>
          ) : (
            <div
              id="programs-list"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
