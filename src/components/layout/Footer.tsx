import { Container } from "@/components/ui/Container";
import { siteMetadata } from "@/content/mock";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <Container className="flex flex-col gap-10 py-12 text-base sm:flex-row sm:items-center sm:justify-between">
        {/* Left: logo placeholder, name, socials */}
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/70 bg-slate-900 text-sm font-semibold text-sky-400"
            aria-hidden="true"
          >
            LOGO
          </div>
          <div className="space-y-3">
            <p className="text-base font-semibold text-slate-100">ISPE UCSD</p>
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
                  <img
                    src="/icons/linkedin-svgrepo-com.svg"
                    alt=""
                    className="size-5"
                    aria-hidden
                  />
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
                  <img
                    src="/icons/Instagram_logo_2016.svg"
                    alt=""
                    className="size-5"
                    aria-hidden
                  />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right: contact block */}
        <div className="space-y-2 text-base sm:text-right">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
            Contact Us
          </p>
          <p className="text-sm text-slate-300">
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

