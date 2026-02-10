import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { resources } from "@/content/mock";

export const metadata: Metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Resources
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Resources for students.
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            These links are placeholders to show how the page is structured. In
            the future, you can replace them with the reading lists, videos,
            tools, and guides you actually recommend.
          </p>
        </header>

        <section aria-labelledby="resources-list" className="space-y-6">
          <SectionHeading
            eyebrow="Links"
            title="Curated starting points."
            description="Group similar resources together or separate them into categories once you know what students find most helpful."
          />
          <div
            id="resources-list"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}

