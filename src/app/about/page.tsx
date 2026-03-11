import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { siteMetadata } from "@/content/mock";
import { getAboutPage } from "@/sanity/lib/queries/aboutPage";

export const metadata: Metadata = {
  title: "About",
};

/** Revalidate this page at most every 60 seconds so Sanity edits show on Vercel. */
export const revalidate = 60;

const DEFAULTS = {
  title: "About the ISPE UCSD Student Chapter.",
  intro:
    "This page is a placeholder for your official description of the chapter. Future officers can update the text below with current mission, initiatives, and chapter history.",
  missionHeading: "Supporting students interested in pharmaceutical engineering.",
  missionBody:
    "Use this section to describe your mission in your own words. For now, this mock copy explains the intent of the site: helping students connect with opportunities, people, and knowledge in pharma, biotech, and related industries.",
  whatIsHeading:
    "International Society for Pharmaceutical Engineering (placeholder copy).",
  whatIsBody: (
    <>
      <p className="mb-3">
        ISPE, the International Society for Pharmaceutical Engineering, is the
        world&apos;s largest not-for-profit association dedicated to educating
        and advancing pharmaceutical manufacturing professionals and their
        industry. Founded in 1980, today ISPE serves 25,000 members in 90
        countries.
      </p>
      <p className="mb-3">
        ISPE is an independent organization led by leading pharmaceutical
        manufacturing professionals. It provides an inviting and neutral
        environment for experts, technologists, regulators, consultants, and
        students to exchange ideas and practical experience. As a vibrant
        community, ISPE members work together to improve the industry while
        helping each other make more informed decisions.
      </p>
      <p className="mb-3">
        ISPE has been recognized by government leaders and regulatory bodies
        for its contributions to the industry.
      </p>
      <p className="mb-0">
        To visit ISPE International, please see{" "}
        <a
          href="https://ispe.org"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          ispe.org
        </a>
        .
      </p>
    </>
  ),
  contactCtaHeading: "Questions about the chapter?",
  contactCtaBody:
    "If students or partners want to reach out about collaboration, sponsorship, or getting involved, direct them to your preferred contact channel. For now, this uses a generic email link.",
  contactPrimaryLabel: "Contact page",
  contactPrimaryHref: "/contact",
  contactSecondaryLabel: "Email the board",
  contactSecondaryHref: `mailto:${siteMetadata.email}`,
};

function whatIsBodyFromText(text: string | null) {
  if (!text?.trim()) return null;
  const paragraphs = text.split(/\n\n+/).filter((s) => s.trim());
  if (paragraphs.length === 0) return <p>{text}</p>;
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} className={i < paragraphs.length - 1 ? "mb-3" : "mb-0"}>
          {para.trim()}
        </p>
      ))}
    </>
  );
}

export default async function AboutPage() {
  const cms = await getAboutPage();

  const title = cms?.title ?? DEFAULTS.title;
  const intro = cms?.intro?.trim() ?? DEFAULTS.intro;
  const missionHeading = cms?.missionHeading ?? DEFAULTS.missionHeading;
  const missionBody = cms?.missionBody?.trim() ?? DEFAULTS.missionBody;
  const whatIsHeading = cms?.whatIsHeading ?? DEFAULTS.whatIsHeading;
  const whatIsBodyContent = cms?.whatIsBody?.trim()
    ? whatIsBodyFromText(cms.whatIsBody)
    : null;
  const whatIsBody = whatIsBodyContent ?? DEFAULTS.whatIsBody;
  const contactCtaHeading =
    cms?.contactCtaHeading ?? DEFAULTS.contactCtaHeading;
  const contactCtaBody =
    cms?.contactCtaBody?.trim() ?? DEFAULTS.contactCtaBody;
  const contactPrimaryLabel =
    cms?.contactPrimaryLabel ?? DEFAULTS.contactPrimaryLabel;
  const contactPrimaryHref =
    cms?.contactPrimaryHref ?? DEFAULTS.contactPrimaryHref;
  const contactSecondaryLabel =
    cms?.contactSecondaryLabel ?? DEFAULTS.contactSecondaryLabel;
  const contactSecondaryHref =
    cms?.contactSecondaryHref ?? DEFAULTS.contactSecondaryHref;

  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            About
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            {intro}
          </p>
        </header>

        <section aria-labelledby="about-mission">
          <SectionHeading
            eyebrow="Mission"
            title={missionHeading}
            description={<p>{missionBody}</p>}
          />
        </section>

        <section aria-labelledby="about-what-is-ispe" className="space-y-4">
          <SectionHeading
            eyebrow="What is ISPE?"
            title={whatIsHeading}
            description={whatIsBody}
          />
          {!cms?.whatIsBody?.trim() && (
            <p className="text-sm text-slate-600">
              You might want to mention topics like manufacturing, quality,
              validation, and regulatory expectations that ISPE covers, and how
              those tie into coursework or interests at UCSD.
            </p>
          )}
        </section>

        <section aria-labelledby="about-contact" className="space-y-4">
          <SectionHeading
            eyebrow="Stay in touch"
            title={contactCtaHeading}
            description={<p>{contactCtaBody}</p>}
          />
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href={contactPrimaryHref}>
              {contactPrimaryLabel}
            </ButtonLink>
            <a
              href={contactSecondaryHref}
              className="text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
            >
              {contactSecondaryLabel}
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
