import { Hero } from "@/components/hero";
import {
  SeasonPanel,
  StructuredData,
  TrustStrip,
} from "@/components/page-sections";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <main id="contenido">
        <Hero />
        <TrustStrip />
        <SeasonPanel />
      </main>
    </>
  );
}
