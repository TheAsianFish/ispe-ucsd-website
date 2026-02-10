import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { siteMetadata } from "@/content/mock";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            About
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            About the ISPE UCSD Student Chapter.
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            This page is a placeholder for your official description of the
            chapter. Future officers can update the text below with current
            mission, initiatives, and chapter history.
          </p>
        </header>

        <section aria-labelledby="about-mission">
          <SectionHeading
            eyebrow="Mission"
            title="Supporting students interested in pharmaceutical engineering."
            description={
              <p>
                Use this section to describe your mission in your own words. For
                now, this mock copy explains the intent of the site: helping
                students connect with opportunities, people, and knowledge in
                pharma, biotech, and related industries.
              </p>
            }
          />
        </section>

        <section aria-labelledby="about-what-is-ispe" className="space-y-4">
          <SectionHeading
            eyebrow="What is ISPE?"
            title="International Society for Pharmaceutical Engineering (placeholder copy)."
            description={
              <>
                <p className="mb-3">
                  ISPE, the International Society for Pharmaceutical
                  Engineering, is the world&apos;s largest not-for-profit
                  association dedicated to educating and advancing
                  pharmaceutical manufacturing professionals and their industry.
                  Founded in 1980, today ISPE serves 25,000 members in 90
                  countries.
                </p>
                <p className="mb-3">
                  ISPE is an independent organization led by leading
                  pharmaceutical manufacturing professionals. It provides an
                  inviting and neutral environment for experts, technologists,
                  regulators, consultants, and students to exchange ideas and
                  practical experience. As a vibrant community, ISPE members
                  work together to improve the industry while helping each other
                  make more informed decisions.
                </p>
                <p className="mb-3">
                  ISPE has been recognized by government leaders and regulatory
                  bodies for its contributions to the industry.
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
            }
          />
          <p className="text-sm text-slate-600">
            You might want to mention topics like manufacturing, quality,
            validation, and regulatory expectations that ISPE covers, and how
            those tie into coursework or interests at UCSD.
          </p>
        </section>

        <section aria-labelledby="about-contact" className="space-y-4">
          <SectionHeading
            eyebrow="Stay in touch"
            title="Questions about the chapter?"
            description={
              <p>
                If students or partners want to reach out about collaboration,
                sponsorship, or getting involved, direct them to your preferred
                contact channel. For now, this uses a generic email link.
              </p>
            }
          />
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact">Contact page</ButtonLink>
            <a
              href={`mailto:${siteMetadata.email}`}
              className="text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
            >
              Email the board
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}

