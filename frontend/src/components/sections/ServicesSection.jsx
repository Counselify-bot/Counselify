import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BarChart3, ListChecks, Users, Plus, Minus } from 'lucide-react';

const ServiceCard = ({ service, isExpanded }) => {
    const summary = service.description.split('\n\n')[0];

    return (
        <div className="bg-white p-14 border-b md:border-b-0 md:border-r border-brand-muted transition-all duration-700 hover:bg-brand-muted/10 group relative last:border-r-0 h-full flex flex-col items-start">
            <div className="absolute top-0 left-0 w-1.5 h-0 bg-brand-blue group-hover:h-full transition-all duration-700"></div>

            <div className="w-16 h-16 bg-brand-muted/30 rounded-2xl flex items-center justify-center mb-12 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-700 shadow-sm border border-brand-muted/20">
                {service.icon}
            </div>

            <h3 className="text-2xl font-black text-brand-dark mb-6 tracking-tighter">
                {service.title}
            </h3>

            <div className="flex-grow">
                <p className="text-slate-500 leading-relaxed mb-6 text-[13px] font-medium whitespace-pre-line pr-2 text-left">
                    {isExpanded ? service.description : summary}
                </p>
            </div>
        </div>
    );
};

const ServicesSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const services = [
        {
            icon: <GraduationCap size={28} />,
            title: "Rank & College Analysis",
            description: "We analyse your JEE rank, category, state quota, and preferences to identify realistic college options.\n\nYou will get:\n• Safe colleges\n• Moderate options\n• Dream options\n• Branch comparison guidance\n\nBased on previous year official cutoff data.",
            link: "#",
            buttonText: "View Rank Analysis"
        },
        {
            icon: <BarChart3 size={28} />,
            title: "College Predictor Tool",
            description: "Enter your rank and get instant college suggestions based on JoSAA and CSAB trends.\n\nThis tool helps you understand:\n• Admission probability\n• Cutoff trends\n• Category-wise comparison\n• Previous year closing ranks",
            link: "/rank-predictor",
            buttonText: "Try College Predictor"
        },
        {
            icon: <ListChecks size={28} />,
            title: "Branch Selection Guidance",
            description: "Confused between CSE, ECE, Mechanical, Civil, or new-age branches?\n\nWe help you compare:\n• Placement trends\n• Career scope\n• Higher studies options\n• Interest vs future demand\n\nSo you choose the right branch — not just the popular one.",
            link: "#",
            buttonText: "Compare Branches"
        },
        {
            icon: <Users size={28} />,
            title: "Personal Counselling Support",
            description: "Get 1-on-1 guidance during JoSAA and CSAB rounds.\n\nWe help you with:\n• Choice filling order\n• Freeze / Float / Slide decision\n• Backup strategy\n• CSAB special rounds planning\n• Final seat confirmation steps\n\nWe stay with you until your admission is secure.",
            link: "/advisor",
            buttonText: "Speak to an Advisor"
        }
    ];

    return (
        <section id="services" className="py-40 bg-transparent relative">
            <div className="section-container">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12 text-left">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 mb-10 group cursor-default">
                            <div className="h-px w-12 bg-brand-blue"></div>
                            <span className="text-xs uppercase tracking-[0.4em] font-black text-brand-blue/60">Our Counselling Services</span>
                        </div>
                        <h2 className="text-5xl md:text-[80px] font-black leading-[0.9] mb-8 text-brand-dark tracking-tighter">
                            Complete <span className="italic font-medium serif-font text-brand-blue">Guidance</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-bold italic max-w-lg leading-relaxed">
                            Complete guidance for JoSAA & CSAB counselling — from rank analysis to final seat confirmation.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[48px] overflow-hidden border border-brand-muted shadow-soft flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                        {services.map((service, index) => (
                            <ServiceCard key={index} service={service} isExpanded={isExpanded} />
                        ))}
                    </div>

                    <div className="p-8 pb-10 border-t border-brand-muted/20 flex justify-center w-full z-10 bg-white relative">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-3 px-8 py-3 bg-brand-muted/20 text-brand-blue font-black text-[12px] uppercase tracking-[0.25em] hover:bg-brand-blue hover:text-white rounded-full transition-all"
                        >
                            {isExpanded ? 'Show Less Details' : 'Read Full Details'}
                            {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                    </div>
                </div>

                <div className="mt-16 flex justify-center w-full">
                    <Link
                        to="/advisor"
                        className="px-10 py-5 bg-[#0462C3] text-white rounded-full font-black text-[13px] uppercase tracking-[0.2em] hover:bg-[#005536] transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-4 group"
                    >
                        Speak to an Advisor
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
