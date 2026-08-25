import { Cursor } from "@/components/chrome/Cursor";
import { Nav } from "@/components/chrome/Nav";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { ThemeFlipper } from "@/components/chrome/ThemeFlipper";
import {
  About,
  Contact,
  Faq,
  Hero,
  Marquee,
  Plate,
  Reviews,
  SiteFooter,
  Statement,
  WhyMe,
  Work,
} from "@/components/sections";

/**
 * A server component. Only the pieces that actually animate cross into
 * the client, so copy and markup ship as static HTML.
 *
 * Section order is the narrative, and the light/dark alternation is
 * deliberate — the theme flip between them is itself one of the
 * transitions.
 */
export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Cursor />
      <ThemeFlipper />
      <Nav />

      <main id="top">
        <Hero />
        <Marquee />
        <Statement />
        <Work />
        <Plate />
        <About />
        <WhyMe />
        <Reviews />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />
    </SmoothScroll>
  );
}
