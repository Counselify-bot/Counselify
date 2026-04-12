import { Award, Trophy, Clock, Building } from 'lucide-react';

const StatsStrip = () => {
    const stats = [
        {
            Icon: Award,
            number: "40K+",
            label: "Admissions Secured",
            description: "Students placed in top engineering colleges"
        },
        {
            Icon: Trophy,
            number: "98.4%",
            label: "Analytical Accuracy",
            description: "Prediction accuracy based on real JoSAA data"
        },
        {
            Icon: Clock,
            number: "7yr+",
            label: "Strategic Legacy",
            description: "Years of counselling expertise & proven results"
        },
        {
            Icon: Building,
            number: "50+",
            label: "Institutional Alliances",
            description: "Partner colleges across India's top institutions"
        }
    ];

    return (
        <section className="py-24 bg-background border-y border-outline-variant/30 relative">
            <div className="section-container">

                {/* Desktop Layout — unchanged */}
                <div className="hidden lg:grid grid-cols-4 gap-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center group cursor-default">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 editorial-shadow group-hover:-translate-y-2 transition-transform duration-700 border border-transparent text-[#0462C3]">
                                <stat.Icon size={24} />
                            </div>
                            <h3 className="text-6xl font-bold text-on-surface mb-3 tracking-tighter serif-font italic leading-none">
                                {stat.number}
                            </h3>
                            <p className="text-outline font-bold text-[11px] uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>



            </div>
        </section>
    );
};

export default StatsStrip;
