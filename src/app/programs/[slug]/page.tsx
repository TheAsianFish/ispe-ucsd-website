import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import {
  getProgramBySlug,
  getAllProgramSlugs,
} from "@/sanity/lib/queries/programs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Revalidate at most every 60s so Sanity edits show on Vercel. */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program" };
  return {
    title: program.title,
    description: program.shortDescription,
  };
}

function SectionList({
  title,
  items,
  id,
}: {
  title: string;
  items: string[] | null | undefined;
  id: string;
}) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby={id} className="space-y-4">
      <SectionHeading
        title={title}
        description={
          <ul className="list-inside list-disc space-y-1 text-slate-600">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        }
      />
    </section>
  );
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const hasCta =
    program.ctaLabel?.trim() && program.ctaUrl?.trim();

  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Program
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {program.title}
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            {program.shortDescription}
          </p>
        </header>

        {program.overview?.trim() ? (
          <section aria-labelledby="program-overview" className="space-y-2">
            <h2 id="program-overview" className="sr-only">
              Overview
            </h2>
            <p className="text-slate-600 sm:text-base">
              {program.overview.trim()}
            </p>
          </section>
        ) : null}

        <SectionList
          id="program-how-it-works"
          title="How it works"
          items={program.howItWorks}
        />

        <SectionList
          id="program-commitment"
          title="What to expect"
          items={program.commitment}
        />

        <SectionList
          id="program-benefits"
          title="Benefits"
          items={program.benefits}
        />

        {program.whoItsFor?.trim() ? (
          <section aria-labelledby="program-audience" className="space-y-4">
            <SectionHeading
              eyebrow="Who it’s for"
              title="Who it’s for"
              description={<p className="text-slate-600">{program.whoItsFor.trim()}</p>}
            />
          </section>
        ) : null}

        {hasCta ? (
          <section aria-labelledby="program-cta" className="space-y-4">
            <SectionHeading
              eyebrow="Get involved"
              title="How to get involved"
              description={
                <p className="text-slate-600">
                  Use the button below to sign up or learn more.
                </p>
              }
            />
            <ButtonLink href={program.ctaUrl!}>
              {program.ctaLabel}
            </ButtonLink>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
