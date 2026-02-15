import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteMetadata } from "@/content/mock";

const ISPE_LOGO_PATH = "/icons/idgyckcusI_1771114222524.svg";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <Container className="flex flex-col gap-10 py-12 text-base sm:flex-row sm:items-center sm:justify-between">
        {/* Left: logo, name, socials */}
        <div className="flex items-start gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
            aria-label="ISPE UCSD – Home"
          >
            <img
              src={ISPE_LOGO_PATH}
              alt=""
              width={258}
              height={83}
              className="h-14 w-auto sm:h-16"
            />
          </Link>
          <div className="space-y-3">
            <p className="text-base font-semibold text-slate-100">ISPE UCSD</p>
            <div className="flex items-center gap-3">
              {siteMetadata.socials.discord ? (
                <a
                  href={siteMetadata.socials.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-sky-300"
                  aria-label="Discord"
                >
                  <img
                    src="/icons/discord-icon-svgrepo-com.svg"
                    alt=""
                    className="size-5"
                    aria-hidden
                  />
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

