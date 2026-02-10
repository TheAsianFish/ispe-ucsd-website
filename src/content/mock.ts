export type NavItem = {
  label: string;
  href: string;
};

export type NavLink = {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
};

export type SiteMetadata = {
  name: string;
  tagline: string;
  email: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
};

export type HeroContent = {
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export type Event = {
  id: string;
  name: string;
  date: string; // ISO string
  location: string;
  description: string;
  rsvpUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type Program = {
  id: string;
  title: string;
  description: string;
};

export type Resource = {
  id: string;
  title: string;
  url: string;
  description: string;
};

export type MembershipContent = {
  heading: string;
  body: string;
  joinLink: string;
  mailingListLink: string;
};

export type BoardTeaser = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type BoardTerm = {
  slug: string;
  label: string;
  isCurrent?: boolean;
};

export type BoardMember = {
  name: string;
  role: string;
  major?: string;
  imageUrl?: string;
  linkedin?: string;
};

export const siteMetadata: SiteMetadata = {
  name: "ISPE UCSD Student Chapter",
  tagline: "Connecting students to the world of pharmaceutical engineering.",
  email: "ispe@ucsd.edu",
  socials: {
    instagram: "https://instagram.com/ispeucsd",
    linkedin: "https://linkedin.com/company/ispe-ucsd",
    website: "https://ispe.ucsd.edu",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
  { label: "Meet the Board", href: "/board" },
];

export const hero: HeroContent = {
  title: "Student chapter for future pharmaceutical engineers at UC San Diego.",
  subtitle:
    "We help students explore careers in pharma, biotech, and related industries through events, programs, and industry connections.",
  primaryCta: {
    label: "Join our chapter",
    href: "/membership",
  },
  secondaryCta: {
    label: "View upcoming events",
    href: "/events",
  },
};

export const events: { upcoming: Event[]; past: Event[] } = {
  upcoming: [
    {
      id: "upcoming-1",
      name: "Industry Panel: Careers in Pharmaceutical Engineering",
      date: "2026-03-15T18:00:00-08:00",
      location: "UCSD Campus – TBD",
      description:
        "Hear from professionals working in process development, quality, validation, and more. Learn how they navigated from UCSD to industry roles.",
      rsvpUrl: "https://example.com/rsvp-industry-panel",
      imageUrl: "/images/events/industry-panel-placeholder.jpg",
      imageAlt: "Students attending a professional panel discussion.",
    },
    {
      id: "upcoming-2",
      name: "Facility Tour: Local Biotech Company",
      date: "2026-04-02T16:00:00-08:00",
      location: "Off-campus – Transportation details TBD",
      description:
        "Small-group visit to a local biotech facility. Get a behind-the-scenes look at manufacturing and quality operations.",
      rsvpUrl: "https://example.com/rsvp-facility-tour",
      imageUrl: "/images/events/facility-tour-placeholder.jpg",
      imageAlt: "A group of students touring a biotech facility.",
    },
    {
      id: "upcoming-3",
      name: "Workshop: Intro to GxP & Regulatory Basics",
      date: "2026-04-20T17:00:00-08:00",
      location: "UCSD Campus – TBD",
      description:
        "Learn core concepts of Good Manufacturing Practice (GMP), Good Laboratory Practice (GLP), and other GxP frameworks used across pharma and biotech.",
      rsvpUrl: "https://example.com/rsvp-gxp-workshop",
      imageUrl: "/images/events/gxp-workshop-placeholder.jpg",
      imageAlt: "Students taking notes during a technical workshop.",
    },
  ],
  past: [
    {
      id: "past-1",
      name: "Fall Kickoff: Introduction to ISPE UCSD",
      date: "2025-10-05T18:00:00-07:00",
      location: "UCSD Campus",
      description:
        "Overview of the chapter, leadership team, and plans for the academic year with networking and Q&A.",
      rsvpUrl: "https://example.com/rsvp-fall-kickoff",
      imageUrl: "/images/events/fall-kickoff-placeholder.jpg",
      imageAlt: "Students gathered at an info session.",
    },
    {
      id: "past-2",
      name: "Resume & LinkedIn Workshop for Pharma Roles",
      date: "2025-11-12T17:30:00-08:00",
      location: "UCSD Campus",
      description:
        "Hands-on session focused on tailoring resumes and LinkedIn profiles for roles in pharma, biotech, and related industries.",
      rsvpUrl: "https://example.com/rsvp-resume-workshop",
      imageUrl: "/images/events/resume-workshop-placeholder.jpg",
      imageAlt: "Students working on laptops at a resume workshop.",
    },
    {
      id: "past-3",
      name: "Industry Coffee Chats",
      date: "2025-12-03T16:00:00-08:00",
      location: "Local cafe near UCSD",
      description:
        "Informal coffee chats with industry professionals to ask questions about day-to-day work and career paths.",
      rsvpUrl: "https://example.com/rsvp-coffee-chats",
      imageUrl: "/images/events/coffee-chats-placeholder.jpg",
      imageAlt: "Students talking with professionals over coffee.",
    },
  ],
};

export const programs: Program[] = [
  {
    id: "program-mentorship",
    title: "Mentorship & Peer Support",
    description:
      "Connect with peers and industry-aligned mentors who can share insights on coursework, recruiting, and navigating opportunities in pharma and biotech.",
  },
  {
    id: "program-professional-development",
    title: "Professional Development",
    description:
      "Workshops and panels on topics such as resumes, interviews, GMP/GxP basics, and transitioning from academia to industry roles.",
  },
  {
    id: "program-site-visits",
    title: "Facility Tours & Site Visits",
    description:
      "Experience real manufacturing and R&D environments through facility tours and visits to local biotech and pharma companies.",
  },
  {
    id: "program-community",
    title: "Community & Networking",
    description:
      "Meet other students interested in pharmaceutical engineering and build a community that supports your academic and career goals.",
  },
];

export const resources: Resource[] = [
  {
    id: "resource-ispe-global",
    title: "ISPE International",
    url: "https://ispe.org",
    description:
      "The global International Society for Pharmaceutical Engineering, offering guidance, publications, and events.",
  },
  {
    id: "resource-guidance",
    title: "Regulatory & Industry Guidance (placeholder)",
    url: "https://example.com/guidance",
    description:
      "High-level overviews of regulatory expectations and best practices in pharma and biotech. Replace with your preferred resources later.",
  },
  {
    id: "resource-ucsd-career",
    title: "UCSD Career Services (placeholder)",
    url: "https://career.ucsd.edu",
    description:
      "Support for resumes, interview prep, and navigating internships and full-time roles related to pharmaceutical engineering.",
  },
  {
    id: "resource-reading-list",
    title: "Intro Reading List for Pharma Engineering (placeholder)",
    url: "https://example.com/reading-list",
    description:
      "Curated articles, videos, and primers that help students get oriented to the pharma and biotech landscape.",
  },
];

export const membership: MembershipContent = {
  heading: "Become a member of ISPE UCSD.",
  body:
    "Membership is open to UC San Diego students from all majors who are interested in pharmaceutical engineering, biotech, or related fields. Joining helps you stay informed about events, site visits, and opportunities to get involved.",
  joinLink: "https://example.com/join-ispe-ucsd",
  mailingListLink: "https://example.com/ispe-ucsd-mailing-list",
};

export const boardTeaser: BoardTeaser = {
  heading: "Meet our board.",
  body:
    "Our student leadership team coordinates events, programs, and partnerships with industry. We will feature board profiles and history here once our CMS is in place.",
  ctaLabel: "Board details coming soon",
  ctaHref: "/about",
};

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [{ label: "Meet the Board", href: "/board" }],
  },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

export const boardTerms: BoardTerm[] = [
  {
    slug: "2024-2025",
    label: "2024–2025",
    isCurrent: true,
  },
  {
    slug: "2023-2024",
    label: "2023–2024",
  },
];

export const boardMembersByTerm: Record<string, BoardMember[]> = {
  "2024-2025": [
    {
      name: "Alex Chen",
      role: "President",
      major: "Chemical Engineering",
      linkedin: "https://linkedin.com/in/example",
    },
    {
      name: "Maria Lopez",
      role: "Vice President",
      major: "Bioengineering",
    },
    {
      name: "Jordan Patel",
      role: "Industry Relations Chair",
      major: "Chemical Engineering",
    },
    {
      name: "Sarah Kim",
      role: "Events Chair",
      major: "Pharmacological Chemistry",
    },
  ],
  "2023-2024": [
    {
      name: "Taylor Nguyen",
      role: "President",
      major: "Chemical Engineering",
    },
    {
      name: "Priya Singh",
      role: "Vice President",
      major: "Bioengineering",
    },
  ],
};

