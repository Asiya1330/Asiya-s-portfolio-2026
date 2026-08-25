import type { Faq } from "./types";

/**
 * Seven, deliberately. A long list reads as a support page; these are
 * the questions that actually decide whether someone gets in touch.
 */
export const faqs: readonly Faq[] = [
  {
    id: "timeline",
    question: "What does a typical timeline look like?",
    answer:
      "A focused feature build runs one to two weeks. A full SaaS MVP is usually four to ten. You get a scoped estimate after the first call, not a guess.",
  },
  {
    id: "rates",
    question: "How do you charge?",
    answer:
      "Hourly for open-ended work, fixed price for a scoped build. I will tell you which one fits your project rather than defaulting to whichever suits me.",
  },
  {
    id: "ai-existing",
    question: "Can you add AI to a product that already exists?",
    answer:
      "Yes, and that is most of the work. Document intelligence, retrieval over your own data, agents, chat — dropped into a live codebase without a rewrite.",
  },
  {
    id: "which-model",
    question: "Which AI models do you work with?",
    answer:
      "OpenAI, Anthropic Claude, Google Gemini and Stability AI in production, plus IBM APIs for document work. Model choice should follow the task and the budget, so I usually benchmark two before committing — and every call gets retries, a timeout and a fallback, because they will fail and it should not take the product down with them.",
  },
  {
    id: "timezones",
    question: "How do you handle the time-zone gap?",
    answer:
      "I am UTC+5, which overlaps the US and European morning. Written updates cover everything outside that window. Six years of US and EU clients — the rhythm is worked out.",
  },
  {
    id: "handover",
    question: "What happens when the project ends?",
    answer:
      "You own the repository, the infrastructure and the accounts throughout — nothing is hosted on anything of mine. Handover is documentation plus a walkthrough, and I stay reachable for questions afterwards.",
  },
  {
    id: "maintenance",
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes, on a retainer once a build ships. Several clients have kept me on for more than a year for exactly this.",
  },
];
