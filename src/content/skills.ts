import type { SkillGroup } from "./types";

/**
 * Grouped rather than a flat cloud, so a client can find the one thing
 * they came looking for. AI leads because that is what most enquiries
 * now open with.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "ai",
    title: "AI engineering",
    items: [
      "LLM integration",
      "RAG pipelines",
      "AI agents",
      "AI chatbots",
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "Stability AI",
      "IBM Watson APIs",
      "Prompt engineering",
      "Workflow automation",
      "n8n",
    ],
  },
  {
    id: "product",
    title: "Product & frontend",
    items: [
      "Next.js",
      "React",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux / Zustand",
      "Responsive design",
    ],
  },
  {
    id: "backend",
    title: "Backend & data",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "Firebase",
      "Prisma / Drizzle",
      "REST & GraphQL",
      "Socket.io",
      "WebRTC",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & payments",
    items: [
      "AWS Lambda",
      "SQS / SNS / EventBridge",
      "CloudFormation",
      "Azure Functions",
      "Vercel",
      "Docker",
      "GitHub Actions",
      "Stripe Connect",
      "Stripe Subscriptions",
    ],
  },
];
