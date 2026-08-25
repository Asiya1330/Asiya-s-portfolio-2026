/**
 * Captures a hero screenshot of every live project into public/img/work.
 *
 * Uses the headless Chrome already on the machine rather than pulling in
 * Playwright — nothing to install, and the render is a real browser.
 *
 * Shots are taken tall and then cropped to the top band: cookie bars and
 * chat bubbles are bottom-fixed, so cropping removes them and leaves the
 * hero, which is what a portfolio card wants anyway.
 *
 *   node tools/capture-projects.mjs            # all
 *   node tools/capture-projects.mjs acudocx    # one, by slug
 */
import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, ".capture");
const WIDTH = 1440;
const TALL = 1500; // capture tall, crop to the top band

export const TARGETS = [
  { slug: "acudocx", url: "https://acudocx.com/" },
  { slug: "probya", url: "https://www.probya.app/" },
  { slug: "custom-canvas", url: "https://custom-canvas-art.vercel.app/" },
  { slug: "hyfn", url: "https://hyfn.ai/" },
  { slug: "probya-admin", url: "https://admin-probya.vercel.app/" },
  { slug: "trusthold", url: "https://trusthold.netlify.app/" },
  { slug: "one-survey", url: "https://one-survey.netlify.app/" },
  { slug: "lease-calculator", url: "https://lease-finance-calculator.netlify.app/" },
  { slug: "summit-property", url: "https://summitpropertygroup.ca/" },
  { slug: "umbrella-home-care", url: "https://umbrellahomecare.ca/" },
  { slug: "lakeview-dental", url: "https://lakeviewdentalcentre.com/" },
  { slug: "dr-schlee", url: "https://drschlee.ca/" },
  { slug: "brooks-metals", url: "https://brooksindustrialmetals.com/" },
  { slug: "iniskim", url: "https://iniskim.com/" },
];

async function capture({ slug, url }) {
  const out = path.join(RAW, `${slug}.png`);
  await run(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--force-device-scale-factor=1",
      `--window-size=${WIDTH},${TALL}`,
      "--virtual-time-budget=12000",
      `--screenshot=${out}`,
      url,
    ],
    { timeout: 90_000 },
  );
  return out;
}

const only = process.argv[2];
const targets = only ? TARGETS.filter((t) => t.slug === only) : TARGETS;

await rm(RAW, { recursive: true, force: true });
await mkdir(RAW, { recursive: true });

for (const target of targets) {
  try {
    await capture(target);
    console.log(`  ok    ${target.slug}`);
  } catch (error) {
    console.log(`  FAIL  ${target.slug}  ${(error.message ?? "").slice(0, 80)}`);
  }
}

console.log(`\nraw shots in ${RAW} — run tools/process-shots.py to finish`);
