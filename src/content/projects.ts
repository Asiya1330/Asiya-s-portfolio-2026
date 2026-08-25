import type { Project } from "./types";

/**
 * Screenshots are captured from the live sites by
 * `tools/capture-projects.mjs` — re-run it when a client redesigns.
 *
 * `stack` only lists technologies confirmed by the CV or stated
 * outright. Anything uncertain is left out rather than guessed: a wrong
 * framework on a portfolio is worse than a short list.
 */
export const projects: readonly Project[] = [
  // ---------------------------------------------------------- featured
  {
    slug: "acudocx",
    title: "AcudocX",
    blurb:
      "Document-intelligence SaaS for certified translation. Automated parsing, classification and data extraction on a multi-tenant AWS serverless backend, with Stripe Connect marketplace billing across five subscription tiers.",
    url: "https://acudocx.com/",
    domain: "acudocx.com",
    tier: "featured",
    stack: ["Next.js", "Vue 3", "AWS Lambda", "Stripe Connect", "OpenAI", "PostgreSQL"],
    image: "/img/work/acudocx.webp",
    ai: true,
    payments: true,
  },
  {
    slug: "probya",
    title: "Probya",
    blurb:
      "AI health platform that scores intimate-care products against published research. I built the barcode-scanning API and the ingredient-matching algorithm behind the score.",
    url: "https://www.probya.app/",
    domain: "probya.app",
    tier: "featured",
    stack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Drizzle"],
    image: "/img/work/probya.webp",
    ai: true,
  },
  {
    slug: "custom-canvas",
    title: "Custom Canvas",
    blurb:
      "AI art e-commerce. Generates personalised artwork with Stability AI, then carries it through customisation, checkout and print fulfilment.",
    url: "https://custom-canvas-art.vercel.app/",
    domain: "custom-canvas-art.vercel.app",
    tier: "featured",
    stack: ["Next.js", "Stability AI", "Stripe", "Firebase"],
    image: "/img/work/custom-canvas.webp",
    ai: true,
    payments: true,
  },
  {
    slug: "hyfn",
    title: "HYFN",
    blurb:
      "FinOps for AI work. Turns coding-agent sessions into billable items with evidence, invoices and webhooks.",
    url: "https://hyfn.ai/",
    domain: "hyfn.ai",
    tier: "featured",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/img/work/hyfn.webp",
    ai: true,
  },

  // ---------------------------------------------------------- products
  {
    slug: "probya-admin",
    title: "Probya Admin",
    blurb:
      "The internal console behind Probya: products, ingredients, submissions, scoring rules and role-based access.",
    url: "https://admin-probya.vercel.app/",
    domain: "admin-probya.vercel.app",
    tier: "product",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Drizzle"],
    image: "/img/work/probya-admin.webp",
    ai: true,
    gated: true,
  },
  {
    slug: "trusthold",
    title: "TrustHold",
    blurb:
      "Real-estate development group — project portfolio, investment opportunities and enquiry flows.",
    url: "https://trusthold.netlify.app/",
    domain: "trusthold.netlify.app",
    tier: "product",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    image: "/img/work/trusthold.webp",
  },
  {
    slug: "one-survey",
    title: "One Survey",
    blurb:
      "Survey platform with dynamic question building, participant entry by ID and structured response collection.",
    url: "https://one-survey.netlify.app/",
    domain: "one-survey.netlify.app",
    tier: "product",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    image: "/img/work/one-survey.webp",
  },
  {
    slug: "lease-calculator",
    title: "Lease Finance Calculator",
    blurb:
      "Lease-versus-finance calculator for a dealership: residuals, money factor, tax and monthly payment, side by side.",
    url: "https://lease-finance-calculator.netlify.app/",
    domain: "lease-finance-calculator.netlify.app",
    tier: "product",
    stack: [],
    image: "/img/work/lease-calculator.webp",
    gated: true,
  },

  // ------------------------------------------------------ client sites
  {
    slug: "summit-property",
    title: "Summit Property Group",
    blurb: "Integrated facility solutions across Canada.",
    url: "https://summitpropertygroup.ca/",
    domain: "summitpropertygroup.ca",
    tier: "client",
    stack: [],
    image: "/img/work/summit-property.webp",
  },
  {
    slug: "umbrella-home-care",
    title: "Umbrella Home Care",
    blurb: "Home healthcare in Edmonton and Calgary.",
    url: "https://umbrellahomecare.ca/",
    domain: "umbrellahomecare.ca",
    tier: "client",
    stack: [],
    image: "/img/work/umbrella-home-care.webp",
  },
  {
    slug: "lakeview-dental",
    title: "Lakeview Dental Centre",
    blurb: "Family and general dentistry, SW Calgary.",
    url: "https://lakeviewdentalcentre.com/",
    domain: "lakeviewdentalcentre.com",
    tier: "client",
    stack: [],
    image: "/img/work/lakeview-dental.webp",
  },
  {
    slug: "dr-schlee",
    title: "Dr. Schlee",
    blurb: "Naturopathic practice and treatment information.",
    url: "https://drschlee.ca/",
    domain: "drschlee.ca",
    tier: "client",
    stack: [],
    image: "/img/work/dr-schlee.webp",
  },
  {
    slug: "brooks-metals",
    title: "Brooks Industrial Metals",
    blurb: "One-stop steel shop — products, services and quotes.",
    url: "https://brooksindustrialmetals.com/",
    domain: "brooksindustrialmetals.com",
    tier: "client",
    stack: [],
    image: "/img/work/brooks-metals.webp",
  },
  {
    slug: "iniskim",
    title: "Iniskim International",
    blurb: "Ammolite gemstone retail and wholesale.",
    url: "https://iniskim.com/",
    domain: "iniskim.com",
    tier: "client",
    stack: [],
    image: "/img/work/iniskim.webp",
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const productProjects = projects.filter((p) => p.tier === "product");
export const clientProjects = projects.filter((p) => p.tier === "client");

/** Confirmed by the CV for the client-site group as a whole. */
export const clientSiteStack = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Responsive Design",
] as const;
