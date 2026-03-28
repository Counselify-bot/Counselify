import { Link } from 'react-router-dom';
import { FileBox, Youtube, BookOpen, Calendar, HelpCircle, FileCheck, ArrowRight } from 'lucide-react';

const Resources = () => {
    const categories = [
        { icon: <BookOpen />, title: "Strategy eBooks", desc: "Easy-to-understand guides explaining JoSAA, CSAB and counselling strategies step-by-step.", path: "/resources/ebooks", color: "text-primary-container", buttonText: "Download Guide" },
        { icon: <Youtube />, title: "Strategy Walkthrough Videos", desc: "Short expert videos explaining rank strategy, college selection and smart choice filling methods.", path: "/resources/videos", buttonText: "Watch Videos" },
        { icon: <FileCheck />, title: "Opening & Closing Rank Data", desc: "Analyze previous year opening and closing ranks to understand where your rank can realistically get admission.", path: "/resources/cutoff-data", buttonText: "View Cutoff Data" },
        { icon: <FileBox />, title: "Counselling Document Kit", desc: "Complete checklist of documents required during JoSAA, CSAB and college reporting.", path: "/resources/checklists", buttonText: "Download Checklist" },
        { icon: <Calendar />, title: "Counselling Timeline", desc: "Important JoSAA, CSAB and admission deadlines so you never miss a critical step.", path: "/resources/calendar", buttonText: "View Timeline" },
        { icon: <HelpCircle />, title: "Counselling FAQs", desc: "Answers to the most common doubts students have about JoSAA, CSAB, refunds, choice filling and admission process.", path: "/resources/faq", buttonText: "Read FAQs" }
    ];

    return (
        <div className="pt-48 pb-40 mesh-gradient-hero min-h-screen">
            <div className="section-container">
                {/* Header */}
                <div className="flex flex-col lg:flex-row items-center justify-between mb-32 gap-16">
                    {/* Left Text */}
                    <div className="text-left w-full lg:w-1/2 space-y-10">
                        <div className="inline-flex items-center gap-3 mb-4 group cursor-default">
                            <div className="h-px w-12 bg-primary-container"></div>
                            <span className="text-xs uppercase tracking-[0.4em] font-bold text-primary-container/70">JEE Counselling Resource Hub</span>
                        </div>
                        <h1 className="text-6xl md:text-[80px] font-bold leading-[0.85] text-on-surface tracking-tighter">
                            Counselling <br />
                            <span className="serif-font italic font-medium text-primary-container">Resource Hub</span>
                        </h1>
                        <p className="text-lg md:text-xl font-bold text-on-surface-variant italic leading-relaxed max-w-xl">
                            A centralized intelligence hub designed to help JEE aspirants make smarter counselling decisions through data, strategy and expert insights.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 w-full lg:w-1/2 relative">
                        <div className="relative rounded-[48px] overflow-hidden border-8 border-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                                alt="Students collaborating"
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="absolute inset-0 bg-[#0462C3]/10 mix-blend-multiply transition-opacity hover:opacity-0 duration-700"></div>
                        </div>

                        {/* Decorative Stat Box */}
                        <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white px-8 py-5 rounded-[32px] shadow-2xl flex items-center gap-5 z-20 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-14 h-14 bg-[#0462C3]/10 rounded-2xl flex items-center justify-center text-[#0462C3] border border-[#0462C3]/20">
                                <FileCheck size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-[#0462C3] leading-none mb-1 shadow-sm">Verified Data</p>
                                <p className="text-sm font-bold text-on-surface italic">100% Authentic</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            to={cat.path}
                            className="bg-white p-14 rounded-2xl border border-transparent editorial-shadow group hover:border-[#0462C3]/30 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden text-left flex flex-col h-full"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-fixed/20 rounded-full -mr-24 -mt-24 transition-all duration-700 group-hover:scale-150 group-hover:bg-[#0462C3]/5"></div>

                            <div className="w-16 h-16 bg-[#0462C3]/10 rounded-2xl flex items-center justify-center p-3 mb-12 text-[#0462C3] group-hover:bg-[#0462C3] group-hover:text-white transition-all transform group-hover:-rotate-6">
                                {cat.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-on-surface mb-5 tracking-tighter">{cat.title}</h3>
                            <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-outline group-hover:text-on-surface-variant transition-colors italic leading-relaxed mb-6">
                                {cat.desc}
                            </p>

                            <div className="mt-auto flex items-center gap-4 text-primary-container font-bold text-[11px] uppercase tracking-[0.25em] group-hover:gap-6 transition-all">
                                {cat.buttonText} <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;
