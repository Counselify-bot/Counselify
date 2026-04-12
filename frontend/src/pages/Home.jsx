import HeroSection from '../components/sections/HeroSection';
import PercentileToRankSection from '../components/sections/PercentileToRankSection';
import ExpectedCutoffSection from '../components/sections/ExpectedCutoffSection';
import StatsStrip from '../components/sections/StatsStrip';
import LiveCountersSection from '../components/sections/LiveCountersSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import SocialProofSection from '../components/sections/SocialProofSection';
import VideoLibrarySection from '../components/sections/VideoLibrarySection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const Home = () => {
    return (
        <div className="w-full overflow-hidden flex flex-col">
            {/* order-1 through order-8 on mobile; lg:order-none resets desktop */}
            <div className="order-1 lg:order-none"><HeroSection /></div>
            <div className="order-2 lg:order-none"><PercentileToRankSection /></div>
            <div className="order-3 lg:order-none"><ExpectedCutoffSection /></div>
            <div className="order-4 lg:order-none"><StatsStrip /></div>
            <div className="order-5 lg:order-none"><LiveCountersSection /></div>
            <div className="order-7 lg:order-none"><SocialProofSection /></div>
            <div className="order-8 lg:order-none"><VideoLibrarySection /></div>
            <div className="order-9 lg:order-none"><TestimonialsSection /></div>
            {/* HowItWorksSection moved to LAST on mobile (order-10) with standardized padding */}
            <div className="order-10 lg:order-none"><HowItWorksSection /></div>
        </div>

    );
};

export default Home;

