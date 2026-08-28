import { ActivitiesGrid } from "@/components/activities-grid";
import { CareSection } from "@/components/care-section";
import { ConversionCta } from "@/components/conversion-cta";
import { DayTimeline } from "@/components/day-timeline";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import {
  SeasonPanel,
  StructuredData,
  Testimonials,
  TrustStrip,
} from "@/components/page-sections";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <TrustStrip />
        <DayTimeline />
        <ActivitiesGrid />
        <CareSection />
        <Testimonials />
        <SeasonPanel />
        <Faq />
        <ConversionCta />
      </main>
    </>
  );
}
