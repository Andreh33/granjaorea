import { CampCalculator } from "@/components/camp-calculator";
import { CareSection } from "@/components/care-section";
import { ConversionCta } from "@/components/conversion-cta";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { LocationMap } from "@/components/location-map";
import { PhotoGallery } from "@/components/photo-gallery";
import {
  StructuredData,
  Testimonials,
  TrustStrip,
} from "@/components/page-sections";
import { SiteHeader } from "@/components/site-header";
import { YearRoundExperiences } from "@/components/year-round-experiences";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <TrustStrip />
        <YearRoundExperiences />
        <PhotoGallery />
        <CareSection />
        <Testimonials />
        <CampCalculator />
        <LocationMap />
        <Faq />
        <ConversionCta />
      </main>
    </>
  );
}
