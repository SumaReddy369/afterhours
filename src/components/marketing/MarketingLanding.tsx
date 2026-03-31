import { MarketingNav } from "./MarketingNav";
import { HeroSection } from "./HeroSection";
import { ImpactStatementSection } from "./ImpactStatementSection";
import { PodFormationDemo } from "./PodFormationDemo";
import { HowItWorksSection } from "./HowItWorksSection";
import { SeasonProgressionSection } from "./SeasonProgressionSection";
import { TrustSafetyInlineSection } from "./TrustSafetyInlineSection";
import { OrganizerlessSection } from "./OrganizerlessSection";
import { ComparisonSection } from "./ComparisonSection";
import { PodPreviewSection } from "./PodPreviewSection";
import { CaseStudySection } from "./CaseStudySection";
import { WaitlistFinalSection } from "./WaitlistFinalSection";
import { MarketingFooter } from "./MarketingFooter";

export function MarketingLanding() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <MarketingNav />
      <main id="main" className="marketing-grain min-h-screen">
        <HeroSection />
        <ImpactStatementSection />
        <PodFormationDemo />
        <HowItWorksSection />
        <SeasonProgressionSection />
        <TrustSafetyInlineSection />
        <OrganizerlessSection />
        <ComparisonSection />
        <PodPreviewSection />
        <CaseStudySection />
        <WaitlistFinalSection />
      </main>
      <MarketingFooter />
    </>
  );
}
