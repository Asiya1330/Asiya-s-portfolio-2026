import type { NavLink, Stat } from "./types";

export const site = {
  name: "Asiya Batool",
  role: "Full-stack & AI Engineer",
  email: "asiya.batool987@gmail.com",
  location: "Lahore, Pakistan",
  timezone: "UTC+5 · overlaps US & EU mornings",
  eyebrow: "Lahore, PK — working US & EU hours",
  description:
    "Full-stack engineer building AI-powered, cloud-native products for founders in the US and Europe. Top Rated Plus on Upwork.",
  cv: "/cv/asiya-batool-cv.pdf",
} as const;

/**
 * Availability, in plain language.
 *
 * Deliberately not phrased as a quarter: "Q1" means nothing to half of
 * the people reading it, and a hard-coded quarter silently goes stale
 * the moment it passes. Say what is true and easy to check instead.
 */
export const availability = {
  short: "Available for new work",
  long: "Taking on one new project at a time",
  detail: "Currently booking — reply within one business day",
} as const;

export const navLinks: readonly NavLink[] = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const heroHeading = [
  "Full-stack",
  "Engineer &",
  "AI Developer", // rendered as the accent line
  "building cloud-native",
  "products",
] as const;

/** Index of the hero line that gets the italic violet treatment. */
export const heroAccentLine = 2;

/**
 * Figures taken from the public Upwork profile so every number on the
 * page is one a client can verify for themselves.
 */
export const stats: readonly Stat[] = [
  { value: "44", label: "Jobs on Upwork" },
  { value: "4.9", label: "Rating over 28 reviews" },
  { value: "3.4K", label: "Hours delivered" },
  { value: "100%", label: "Job success score" },
];

export const marqueeItems: readonly string[] = [
  "Next.js",
  "AWS Serverless",
  "OpenAI",
  "RAG",
  "AI Agents",
  "TypeScript",
  "Stripe",
  "Supabase",
  "Real-time",
  "Postgres",
];

export const statement =
  "I build the unglamorous half — the auth, the billing, the queues, the model calls that have to not fall over at 3am. Design gets the applause. I make sure there is something to applaud.";

export const about = {
  heading: ["Engineering with", "intent, not just", "output"],
  paragraphs: [
    "Based in Lahore, working with founders and teams across the US and Europe. I take a product from the first architecture call through to the thing running in production with paying users on it.",
    "Top Rated Plus on Upwork — the top 1%, with a 100% job success score across 44 contracts and 3,400 hours. Six years of it, mostly SaaS, AI integration and e-commerce.",
  ],
} as const;

export const socials: readonly NavLink[] = [
  {
    href: "https://www.linkedin.com/in/asiya-batool-101b59188/",
    label: "LinkedIn",
  },
  { href: "https://www.upwork.com/freelancers/asiyab3", label: "Upwork" },
  { href: "https://github.com/asiya1330", label: "GitHub" },
];

/**
 * Calendly.
 *
 * The free plan covers one event type with unlimited bookings, which is
 * all an intro call needs. Set the URL below to the event's public link
 * and the embed switches itself on; leave it empty and the section
 * falls back to email, so the page never ships a dead widget.
 */
export const calendly = {
  /** e.g. "https://calendly.com/asiya-batool/intro-call" */
  url: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  label: "Book a 30-minute intro call",
  note: "Free, no obligation — we talk through scope and I tell you if I am the wrong person for it.",
} as const;
