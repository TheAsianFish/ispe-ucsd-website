import { Container } from "@/components/ui/Container";
import { siteMetadata } from "@/content/mock";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col gap-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-slate-700">
            {siteMetadata.name.split(" Student Chapter")[0]}
          </p>
          <p className="text-xs text-slate-500">
            UC San Diego Student Chapter of the International Society for
            Pharmaceutical Engineering.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <a
            href={`mailto:${siteMetadata.email}`}
            className="hover:text-slate-700"
          >
            {siteMetadata.email}
          </a>
          {siteMetadata.socials.instagram ? (
            <a
              href={siteMetadata.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-700"
            >
              Instagram
            </a>
          ) : null}
          {siteMetadata.socials.linkedin ? (
            <a
              href={siteMetadata.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-700"
            >
              LinkedIn
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

