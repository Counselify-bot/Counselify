import { Award, Trophy, Clock, Building } from 'lucide-react';

const StatsStrip = () => {
    const stats = [
        {
            icon: <Award size={24} />,
            number: "40K+",
            label: "Admissions Secured"
        },
        {
            icon: <Trophy size={24} />,
            number: "98.4%",
            label: "Analytical Accuracy"
        },
        {
            icon: <Clock size={24} />,
            number: "7yr+",
            label: "Strategic Legacy"
        },
        {
            icon: <Building size={24} />,
            number: "50+",
            label: "Institutional Alliances"
        }
    ];

    return (
        <section className="py-24 bg-transparent border-y border-brand-muted/50 relative">
            <div className="section-container">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center group cursor-default">
                            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-soft group-hover:-translate-y-2 transition-transform duration-700 border border-brand-muted text-brand-blue">
                                {stat.icon}
                            </div>
                            <h3 className="text-5xl lg:text-6xl font-black text-brand-dark mb-3 tracking-tighter serif-font italic leading-none">
                                {stat.number}
                            </h3>
                            <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsStrip;
