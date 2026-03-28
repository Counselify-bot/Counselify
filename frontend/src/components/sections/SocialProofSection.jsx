const SocialProofSection = () => {
    const stats = [
        {
            value: "98%",
            label: "Success Rate"
        },
        {
            value: "40k+",
            label: "Students Guided"
        },
        {
            value: "50+",
            label: "IIT / NIT Mentors"
        }
    ];

    return (
        <section className="py-24 bg-slate-900 relative border-t border-slate-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/4 h-full bg-[#0462C3]/[0.05] rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 relative">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center group cursor-default">
                            <h4 className="text-6xl md:text-8xl font-bold text-white italic serif-font tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-700">
                                {stat.value}
                            </h4>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0462C3]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProofSection;
