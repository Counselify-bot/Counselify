import HeroSection from '../components/sections/HeroSection';
import PercentileToRankSection from '../components/sections/PercentileToRankSection';
import ExpectedCutoffSection from '../components/sections/ExpectedCutoffSection';
import StatsStrip from '../components/sections/StatsStrip';
import LiveCountersSection from '../components/sections/LiveCountersSection';
import ProblemSection from '../components/sections/ProblemSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import ServicesSection from '../components/sections/ServicesSection';
import SocialProofSection from '../components/sections/SocialProofSection';
import VideoLibrarySection from '../components/sections/VideoLibrarySection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const Home = () => {
    return (
        <div className="w-full overflow-hidden">
            <HeroSection />
            <PercentileToRankSection />
            <ExpectedCutoffSection />
            <StatsStrip />
            <LiveCountersSection />
            <ProblemSection />
            <HowItWorksSection />
            <ServicesSection />
            <SocialProofSection />
            <VideoLibrarySection />
            <TestimonialsSection />
        </div>
    );
};

export default Home;
