/**
 * The shape of every piece of editable content on the site.
 *
 * Sections import from `@/content/*` and never hold copy of their own.
 * When the admin lands, these modules get swapped for database reads and
 * nothing in `components/` has to change — the types are the contract.
 */

export type ThemeName = "light" | "dark";

/** How prominently a project is shown. */
export type ProjectTier = "featured" | "product" | "client";

export interface Project {
  slug: string;
  title: string;
  /** One line for the grid, two or three sentences for a featured card. */
  blurb: string;
  url: string;
  /** Shown instead of the full URL. */
  domain: string;
  tier: ProjectTier;
  /** Only technologies that are actually confirmed — never guessed. */
  stack: readonly string[];
  /** Screenshot in public/img/work. Omit and the card falls back to type. */
  image?: string;
  /** Badges: what the build actually had to solve. */
  ai?: boolean;
  payments?: boolean;
  /** Sits behind a login, so the capture shows the sign-in screen. */
  gated?: boolean;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  /** The Upwork contract the feedback was left against. */
  project: string;
  /** Out of 5, as Upwork records it. */
  score: number;
  date: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Reason {
  id: string;
  title: string;
  body: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: readonly string[];
}

/**
 * A display heading, pre-split into the lines it should reveal on.
 * Line breaks are an editorial decision, so they live with the copy
 * rather than being guessed at render time.
 */
export type HeadingLines = readonly string[];
