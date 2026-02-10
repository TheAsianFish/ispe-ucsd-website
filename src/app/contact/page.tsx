import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { siteMetadata } from "@/content/mock";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Contact
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Contact the ISPE UCSD board.
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Use this page to centralize how students, partners, and alumni
            should reach you. For now, it lists email and social links, plus a
            placeholder for a future contact form.
          </p>
        </header>

        <section aria-labelledby="contact-details" className="space-y-4">
          <SectionHeading
            eyebrow="Details"
            title="How to reach us."
          />
          <dl className="grid gap-4 text-sm text-slate-700 md:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-900">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${siteMetadata.email}`}
                  className="text-sky-700 underline-offset-2 hover:underline"
                >
                  {siteMetadata.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">Socials</dt>
              <dd className="mt-1 space-x-3">
                {siteMetadata.socials.instagram ? (
                  <a
                    href={siteMetadata.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-700 underline-offset-2 hover:underline"
                  >
                    Instagram
                  </a>
                ) : null}
                {siteMetadata.socials.linkedin ? (
                  <a
                    href={siteMetadata.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-700 underline-offset-2 hover:underline"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </dd>
            </div>
          </dl>
        </section>

        <section
          aria-labelledby="contact-form-placeholder"
          className="space-y-4"
        >
          <SectionHeading
            eyebrow="Form"
            title="Contact form placeholder."
            description="This section is reserved for a simple form powered by Google Forms, Tally, Formspree, or another service. Replace this box with your embed or link when you decide on a solution."
          />
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            <p>
              Placeholder: contact form goes here. In the meantime, email is the
              best way to get in touch with the board.
            </p>
            <div className="mt-4">
              <ButtonLink href={`mailto:${siteMetadata.email}`}>
                Email the board
              </ButtonLink>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

