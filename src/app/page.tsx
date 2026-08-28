import { ActivitiesGrid } from "@/components/activities-grid";
import { CareSection } from "@/components/care-section";
import { DayTimeline } from "@/components/day-timeline";
import { Hero } from "@/components/hero";
import {
  SeasonPanel,
  StructuredData,
  Testimonials,
  TrustStrip,
} from "@/components/page-sections";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <main id="contenido">
        <Hero />
        <TrustStrip />
        <DayTimeline />
        <ActivitiesGrid />
        <CareSection />
        <Testimonials />
        <SeasonPanel />
      </main>
    </>
  );
}
