import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResourceCard } from "@/components/cards/ResourceCard";
import type { Resource } from "@/content/types";
import {
  getAllResources,
  type ResourceCMS,
} from "@/sanity/lib/queries/resources";

export const metadata: Metadata = {
  title: "Resources",
};

/** Revalidate at most every 60 seconds so Sanity edits show on Vercel. */
export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  ucsd: "UCSD Academic & Campus Resources",
  "industry-learning": "Industry Learning & Knowledge",
  "career-exploration": "Career Exploration Tools",
  "san-diego-biotech": "San Diego Biotech Ecosystem",
  other: "Other",
};

const CATEGORY_ORDER = [
  "ucsd",
  "industry-learning",
  "career-exploration",
  "san-diego-biotech",
  "other",
] as const;

function cmsToResource(r: ResourceCMS): Resource {
  return {
    id: r._id,
    title: r.title,
    description: r.description,
    url: r.url,
    category: r.category ?? "other",
    order: r.order ?? undefined,
  };
}

function groupByCategory(resources: Resource[]) {
  const groups: Record<string, Resource[]> = {};
  for (const r of resources) {
    const key = (r.category ?? "other").trim() || "other";
    groups[key] ??= [];
    groups[key].push(r);
  }

  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => {
      const ao = a.order ?? Number.POSITIVE_INFINITY;
      const bo = b.order ?? Number.POSITIVE_INFINITY;
      if (ao !== bo) return ao - bo;
      return a.title.localeCompare(b.title);
    });
  }

  const keys = Object.keys(groups).sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a as (typeof CATEGORY_ORDER)[number]);
    const bi = CATEGORY_ORDER.indexOf(b as (typeof CATEGORY_ORDER)[number]);
    const aRank = ai === -1 ? Number.POSITIVE_INFINITY : ai;
    const bRank = bi === -1 ? Number.POSITIVE_INFINITY : bi;
    if (aRank !== bRank) return aRank - bRank;
    return a.localeCompare(b);
  });

  return keys.map((key) => ({
    key,
    label: CATEGORY_LABELS[key] ?? key,
    items: groups[key],
  }));
}

export default async function ResourcesPage() {
  const cmsResources = await getAllResources();
  const resources = cmsResources.map(cmsToResource);
  const grouped = groupByCategory(resources);

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
            A curated set of starting points to help you explore careers and
            build knowledge in pharmaceutical engineering, biotech, and the
            broader life-science industry.
          </p>
        </header>

        {resources.length === 0 ? (
          <p className="text-sm text-slate-600">
            We don&apos;t have any resources to share yet. Check back soon—we&apos;ll
            keep this page updated as we add new recommendations.
          </p>
        ) : (
          <div className="space-y-10">
            {grouped.map((group) => (
              <section
                key={group.key}
                aria-labelledby={`resources-${group.key}`}
                className="space-y-6"
              >
                <SectionHeading
                  eyebrow="Resources"
                  title={group.label}
                  description="A few trusted links to get you oriented without overwhelming you."
                />
                <div
                  id={`resources-${group.key}`}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {group.items.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

