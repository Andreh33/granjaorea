import { CampCalculator } from "@/components/camp-calculator";
import { CareSection } from "@/components/care-section";
import { ConversionCta } from "@/components/conversion-cta";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { LocationMap } from "@/components/location-map";
import { PillarChapters } from "@/components/pillar-chapters";
import { PillarGateways } from "@/components/pillar-gateways";
import { PhotoGallery } from "@/components/photo-gallery";
import {
  StructuredData,
  Testimonials,
  TrustStrip,
} from "@/components/page-sections";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <PillarGateways />
        <PillarChapters />
        <TrustStrip />
        <PhotoGallery />
        <CareSection />
        <Testimonials />
        <CampCalculator />
        <LocationMap />
        <Faq />
        <ConversionCta />
      </main>
      <SiteFooter />
    </>
  );
}
