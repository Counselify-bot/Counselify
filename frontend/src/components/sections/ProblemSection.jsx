import { AlertTriangle, MapPin, FileCheck, Target, ShieldQuestion } from 'lucide-react';

const ProblemSection = () => {
    const problems = [
        {
            icon: <MapPin />,
            text: "Don’t know which college you can get at your rank?"
        },
        {
            icon: <FileCheck />,
            text: "Confused about required documents?"
        },
        {
            icon: <Target />,
            text: "Don’t understand choice filling strategy?"
        },
        {
            icon: <AlertTriangle />,
            text: "Afraid of locking the wrong branch?"
        }
    ];

    return (
        <section className="py-32 bg-surface-container-low relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-fixed/20 -z-10 skew-x-[-12deg] translate-x-32 blur-3xl"></div>

            <div className="section-container relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">

                    {/* Left: Headline & Hook */}
                    <div className="w-full lg:w-1/2 space-y-10 text-left">
                        <div className="inline-flex items-center gap-3 group cursor-default">
                            <div className="w-1.5 h-6 bg-primary-container rounded-full"></div>
                            <span className="text-xs font-bold uppercase tracking-[0.4em] text-outline">Critical Analysis</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold text-on-surface leading-[0.95] tracking-tighter">
                            The Complexity of <br />
                            <span className="serif-font italic font-medium text-primary-container">Admission</span> Risk
                        </h2>

                        <p className="text-lg font-bold text-on-surface-variant italic leading-relaxed max-w-md">
                            One suboptimal choice in JoSAA/CSAB can diverge your engineering career for a lifetime.
                        </p>

                        <div className="pt-4 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full border border-primary-fixed flex items-center justify-center text-primary-container">
                                <ShieldQuestion size={20} />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-on-surface">Expert Oversight Required</p>
                        </div>
                    </div>

                    {/* Right: Problems Grid */}
                    <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {problems.map((prob, idx) => (
                            <div key={idx} className="glass-panel p-10 rounded-2xl border border-transparent editorial-shadow transition-transform duration-500 hover:-translate-y-2 text-left group">
                                <div className="w-14 h-14 bg-primary-fixed/30 text-primary-container rounded-2xl flex items-center justify-center mb-8 transition-colors group-hover:bg-[#0462C3] group-hover:text-white">
                                    {prob.icon}
                                </div>
                                <p className="text-xs font-bold text-on-surface-variant leading-relaxed uppercase tracking-[0.1em] group-hover:text-on-surface transition-colors italic">
                                    {prob.text}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
