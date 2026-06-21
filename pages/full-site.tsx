import { SiteNav } from "../components/sections/site-nav";
import { HeroSection } from "../components/sections/hero-section";
import { AboutSection } from "../components/sections/about-section";
import { CampaignTimelineSection } from "../components/sections/campaign-timeline-section";
import { GetInvolvedSection } from "../components/sections/get-involved-section";
import { SiteFooter } from "../components/sections/site-footer";
import { ElectionCountdown } from "../components/election-countdown";

export function FullSitePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SiteNav />
      <HeroSection />
      <AboutSection />
      <CampaignTimelineSection />
      <GetInvolvedSection />
      <SiteFooter />
      <ElectionCountdown />
    </div>
  );
}
