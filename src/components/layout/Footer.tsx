import { Container } from "@/components/ui/Container";
import { siteMetadata } from "@/content/mock";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <Container className="flex flex-col gap-8 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Left: logo placeholder, name, socials */}
        <div className="flex items-start gap-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/70 bg-slate-900 text-xs font-semibold text-sky-400"
            aria-hidden="true"
          >
            LOGO
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-100">ISPE UCSD</p>
            <div className="flex items-center gap-3">
              {siteMetadata.socials.website ? (
                <a
                  href={siteMetadata.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-sky-300"
                  aria-label="Website"
                >
                  <span aria-hidden="true">🌐</span>
                </a>
              ) : null}
              {siteMetadata.socials.linkedin ? (
                <a
                  href={siteMetadata.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-sky-300"
                  aria-label="LinkedIn"
                >
                  <span aria-hidden="true">in</span>
                </a>
              ) : null}
              {siteMetadata.socials.instagram ? (
                <a
                  href={siteMetadata.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-sky-300"
                  aria-label="Instagram"
                >
                  <span aria-hidden="true">⌾</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right: contact block */}
        <div className="space-y-1 text-sm sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-400">
            Contact Us
          </p>
          <p className="text-xs text-slate-400">
            For all inquiries, please contact us at{" "}
            <a
              href={`mailto:${siteMetadata.email}`}
              className="font-medium text-slate-100 underline-offset-2 hover:underline"
            >
              {siteMetadata.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}

