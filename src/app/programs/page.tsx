import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { programs } from "@/content/mock";

export const metadata: Metadata = {
  title: "Programs",
};

export default function ProgramsPage() {
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
            The programs below are mock examples. Future officers can update
            titles and descriptions to match what the chapter is actually
            running in a given year.
          </p>
        </header>

        <section aria-labelledby="programs-list" className="space-y-6">
          <SectionHeading
            eyebrow="Overview"
            title="Ways students can get involved."
            description="Each program is intentionally lightweight so it can evolve over time without requiring a rebuild of the site."
          />
          <div
            id="programs-list"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}

