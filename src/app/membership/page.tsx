import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { membership } from "@/content/mock";

export const metadata: Metadata = {
  title: "Membership",
};

export default function MembershipPage() {
  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Membership
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {membership.heading}
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            {membership.body}
          </p>
        </header>

        <section aria-labelledby="membership-how-it-works" className="space-y-4">
          <SectionHeading
            eyebrow="How it works"
            title="Simple steps to join."
            description="These steps are placeholders. Adjust them to match how you actually collect membership sign-ups and dues, if any."
          />
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Confirm that ISPE UCSD is the right fit for your interests.</li>
            <li>Fill out the membership or interest form linked below.</li>
            <li>
              Keep an eye on your email and social channels for event
              announcements and ways to participate.
            </li>
          </ol>
        </section>

        <section aria-labelledby="membership-actions" className="space-y-4">
          <SectionHeading
            eyebrow="Actions"
            title="Join and stay informed."
          />
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={membership.joinLink}>Join the chapter</ButtonLink>
            <ButtonLink
              href={membership.mailingListLink}
              variant="secondary"
            >
              Join mailing list
            </ButtonLink>
          </div>
        </section>

        <section
          aria-labelledby="membership-mailing-list-embed"
          className="space-y-3"
        >
          <SectionHeading
            eyebrow="Mailing list"
            title="Mailing list form placeholder."
            description="This section is reserved for a mailing list embed (Google Forms, Tally, Formspree, or another tool). Replace this box with an actual embed when you are ready."
          />
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            <p>
              Placeholder: mailing list form goes here. Once you choose a
              service, drop the embed code or link in this section so students
              can easily subscribe.
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}

