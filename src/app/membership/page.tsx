import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMembershipPage } from "@/sanity/lib/queries/membershipPage";
import { siteMetadata } from "@/content/mock";

export const metadata: Metadata = {
  title: "Membership",
};

const DEFAULTS = {
  title: "Membership",
  intro:
    "Information about chapter and national membership for the ISPE UCSD Student Chapter.",
  quickLinks: {
    discordUrl: siteMetadata.socials.discord ?? "#",
    instagramUrl: siteMetadata.socials.instagram ?? "#",
    emailListUrl: "#",
    contactEmail: siteMetadata.email,
  },
  chapterVsNational: {
    sectionTitle: "Chapter vs. National Membership",
    chapterTitle: "ISPE UCSD Chapter",
    chapterBullets: [
      "Free student chapter membership",
      "Local events, site visits, and networking",
      "Discord and email updates",
    ],
    nationalTitle: "National ISPE",
    nationalBullets: [
      "Optional paid membership to ISPE International",
      "Additional resources and global community",
    ],
    nationalFeeText: "$29/year (student rate)",
    nationalJoinUrl: "https://ispe.org",
  },
  faq: [
    {
      question: "Is chapter membership free?",
      answer:
        "Yes. Joining the ISPE UCSD Student Chapter is free. You can sign up via our Discord, email list, or contact the board.",
    },
    {
      question: "Do I need to join National ISPE?",
      answer:
        "No. National ISPE membership is optional. Most students start with chapter membership only.",
    },
  ],
};

export default async function MembershipPage() {
  const cms = await getMembershipPage();

  const title = cms?.title ?? DEFAULTS.title;
  const intro =
    cms?.heroSubheadline?.trim() ?? DEFAULTS.intro;
  const quickLinks = cms?.quickLinks ?? DEFAULTS.quickLinks;
  const discordUrl = quickLinks.discordUrl ?? DEFAULTS.quickLinks.discordUrl;
  const instagramUrl =
    quickLinks.instagramUrl ?? DEFAULTS.quickLinks.instagramUrl;
  const emailListUrl =
    quickLinks.emailListUrl ?? DEFAULTS.quickLinks.emailListUrl;
  const contactEmail =
    quickLinks.contactEmail ?? DEFAULTS.quickLinks.contactEmail;
  const chapterVsNational = cms?.chapterVsNational ?? DEFAULTS.chapterVsNational;
  const faq = cms?.faq?.length ? cms.faq : DEFAULTS.faq;

  return (
    <div className="space-y-12 py-10 sm:py-12 lg:space-y-16 lg:py-16">
      <header className="border-b border-slate-200 pb-8">
        <Container>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            {intro}
          </p>
        </Container>
      </header>

      <section aria-labelledby="chapter-vs-national">
        <Container className="space-y-6">
          <SectionHeading
            title={
              chapterVsNational.sectionTitle ??
              DEFAULTS.chapterVsNational.sectionTitle
            }
            description="Chapter membership is free. National ISPE is optional."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                {chapterVsNational.chapterTitle ??
                  DEFAULTS.chapterVsNational.chapterTitle}
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {(chapterVsNational.chapterBullets ?? []).map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-sky-600" aria-hidden>
                      •
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                {chapterVsNational.nationalTitle ??
                  DEFAULTS.chapterVsNational.nationalTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Optional — for students who want more.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {(chapterVsNational.nationalBullets ?? []).map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-sky-600" aria-hidden>
                      •
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {chapterVsNational.nationalFeeText ??
                  DEFAULTS.chapterVsNational.nationalFeeText}
              </p>
              {chapterVsNational.nationalJoinUrl && (
                <p className="mt-2">
                  <a
                    href={chapterVsNational.nationalJoinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm font-medium text-sky-700 underline-offset-2 hover:underline"
                  >
                    Join National ISPE
                  </a>
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="membership-faq">
        <Container className="space-y-6">
          <SectionHeading title="Frequently asked questions" />
          <div className="space-y-2">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <summary className="cursor-pointer list-none px-4 py-3 text-left font-medium text-slate-900 transition-colors hover:bg-slate-50 sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {item.question ?? "Question"}
                    <span
                      className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                      aria-hidden
                    >
                      ▾
                    </span>
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600 sm:px-5 sm:py-4">
                  {item.answer ?? ""}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="membership-links">
        <Container>
          <h2 id="membership-links" className="sr-only">
            How to join or get in touch
          </h2>
          <p className="text-sm text-slate-600">
            To join the chapter or stay updated:{" "}
            {[
              discordUrl && { label: "Discord", href: discordUrl, external: true },
              instagramUrl && {
                label: "Instagram",
                href: instagramUrl,
                external: true,
              },
              emailListUrl && {
                label: "email list",
                href: emailListUrl,
                external: true,
              },
              contactEmail && {
                label: "contact the board",
                href: `mailto:${contactEmail}`,
                external: false,
              },
            ]
              .filter(
                (x): x is { label: string; href: string; external: boolean } =>
                  Boolean(x),
              )
              .map((item, i) => (
                <span key={i}>
                  {i > 0 && ", "}
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer noopener" : undefined}
                    className="font-medium text-sky-700 underline-offset-2 hover:underline"
                  >
                    {item.label}
                  </a>
                </span>
              ))}
            .
          </p>
        </Container>
      </section>
    </div>
  );
}
