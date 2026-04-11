import { Link } from 'react-router-dom';
import { FileBox, BookOpen, Calendar, HelpCircle, FileCheck, ArrowRight, PlayCircle, ExternalLink, Youtube, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return ''; }
};

const Resources = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/youtube-videos`);
                const data = await res.json();
                if (data.success && data.videos?.length) {
                    setVideos(data.videos);
                }
            } catch (err) {
                console.warn('YouTube API unavailable');
            }
        };
        fetchVideos();
    }, []);

    const categories = [
        { icon: <BookOpen />, title: "Strategy eBooks", desc: "Easy-to-understand guides explaining JoSAA, CSAB and counselling strategies step-by-step.", path: "/resources/ebooks", color: "text-primary-container", buttonText: "Download Guide" },
        { icon: <FileCheck />, title: "Opening & Closing Rank Data", desc: "Analyze previous year opening and closing ranks to understand where your rank can realistically get admission.", path: "/resources/cutoff-data", buttonText: "View Cutoff Data" },
        { icon: <FileBox />, title: "Counselling Document Kit", desc: "Complete checklist of documents required during JoSAA, CSAB and college reporting.", path: "/resources/checklists", buttonText: "Download Checklist" },
        { icon: <Calendar />, title: "Counselling Timeline", desc: "Important JoSAA, CSAB and admission deadlines so you never miss a critical step.", path: "/resources/calendar", buttonText: "View Timeline" },
        { icon: <HelpCircle />, title: "Counselling FAQs", desc: "Answers to the most common doubts students have about JoSAA, CSAB, refunds, choice filling and admission process.", path: "/resources/faq", buttonText: "Read FAQs" }
    ];

    return (
        <div className="pt-48 pb-40 mesh-gradient-hero min-h-screen">
            <div className="section-container">
                {/* Hero Header */}
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
                                src="/resources-team.jpg"
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

                {/* ═══════════════════════════════════════════════════ */}
                {/* Latest Strategy Videos Section                      */}
                {/* ═══════════════════════════════════════════════════ */}
                {videos.length > 0 && (
                    <div className="mb-28">
                        {/* Section Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
                            <div className="max-w-xl">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="h-px w-12 bg-red-500/40"></div>
                                    <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 flex items-center gap-2">
                                        <Youtube size={12} />
                                        From Our Channel
                                    </span>
                                    <div className="h-px w-12 bg-red-500/40"></div>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-[0.95] tracking-tighter">
                                    Latest <span className="serif-font italic font-medium text-primary-container">Strategy</span> Videos
                                </h2>
                                <p className="text-base md:text-lg font-bold text-on-surface-variant italic leading-relaxed">
                                    Watch latest counselling guidance, rank strategy, cutoff analysis and admission insights from our official YouTube channel.
                                </p>
                            </div>
                            <div className="shrink-0">
                                <a
                                    href="https://www.youtube.com/@counselify"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3.5 bg-[#FF0000] text-white font-bold text-[12px] uppercase tracking-[0.15em] rounded-full shadow-lg shadow-red-500/20 hover:bg-[#cc0000] hover:shadow-xl transition-all flex items-center gap-3"
                                >
                                    <Youtube size={16} />
                                    YouTube Channel
                                </a>
                            </div>
                        </div>

                        {/* Video Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {videos.slice(0, 6).map((video) => (
                                <a
                                    key={video.videoId}
                                    href={video.url || `https://www.youtube.com/watch?v=${video.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white rounded-2xl overflow-hidden group editorial-shadow cursor-pointer block hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-[#0462C3]/20"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-[#0462C3]/20 transition-all duration-500 flex items-center justify-center">
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                                                <PlayCircle size={32} className="text-[#0462C3] fill-[#0462C3]/10" />
                                            </div>
                                        </div>
                                        {/* YouTube badge */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[0.65rem] font-bold text-red-600 uppercase tracking-widest z-10 flex items-center gap-1.5">
                                            <Youtube size={10} /> Latest Video
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-8 text-left">
                                        {video.published && (
                                            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-outline mb-3 flex items-center gap-2">
                                                <Clock size={12} /> {formatDate(video.published)}
                                            </p>
                                        )}
                                        <h3 className="text-xl font-medium serif-font italic text-on-surface mb-5 group-hover:text-[#0462C3] transition-colors line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[#0462C3] text-xs font-bold uppercase tracking-widest">
                                            <ExternalLink size={14} /> Watch on YouTube
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Resource Categories Grid (5 cards — no walkthrough videos) */}
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
