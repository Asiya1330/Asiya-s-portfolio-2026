import type { Review } from "./types";

/**
 * Real feedback, read from the public Upwork profile.
 *
 * A snapshot, not a live feed: Upwork's public profile has no feed to
 * subscribe to, and their API needs an approved OAuth app. Refresh by
 * re-reading the profile when it changes.
 *
 * Upwork does not publish client avatars or per-review permalinks on a
 * public profile, so each quote links back to the profile itself, which
 * is where a client would go to verify it anyway.
 */
export const upworkProfile = "https://www.upwork.com/freelancers/asiyab3";

export const upworkSummary = {
  rating: 4.9,
  reviewCount: 28,
  jobSuccess: "100%",
  badge: "Top Rated Plus",
} as const;

export const reviews: readonly Review[] = [
  {
    id: "rami-s",
    quote:
      "They built my website from scratch, incorporating every change I requested without a single complaint. When we hit an issue with our hosting platform not supporting Next.js and TypeScript, they quickly adapted and redesigned the entire website in PHP. Responsive, professional, and highly skilled.",
    author: "Rami S.",
    project: "Website build and platform migration",
    score: 5,
    date: "2024-07-26",
  },
  {
    id: "samira-m",
    quote:
      "Asiya is trustworthy and hardworking. She has helped immensely with our business needs.",
    author: "Samira M.",
    project: "Barcode scanner & ingredient-matching API — Probya",
    score: 5,
    date: "2026-08-18",
  },
  {
    id: "nabil-a",
    quote:
      "Asiya is very good at CSS, and I am very happy I hired her for my project. She delivered in an excellent way and I will hire her again.",
    author: "Nabil A.",
    project: "Custom CSS for a WordPress plugin",
    score: 5,
    date: "2025-01-19",
  },
  {
    id: "devworks",
    quote:
      "Asiya is an excellent developer who showed initiative and was enjoyable to work with.",
    author: "Devworks.io",
    project: "Full-stack — Node, React and Supabase",
    score: 4.8,
    date: "2025-06-07",
  },
];
