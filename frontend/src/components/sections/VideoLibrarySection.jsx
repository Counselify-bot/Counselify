import { PlayCircle, Eye, Clock, ExternalLink, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

// Hardcoded fallback videos in case API fails
const fallbackVideos = [
    {
        videoId: "hDgHJ1HJIXc",
        thumbnail: "https://img.youtube.com/vi/hDgHJ1HJIXc/maxresdefault.jpg",
        title: "Marks Vs Percentile JEE Mains 2026 | Morning Shift Analysis",
        published: ""
    },
    {
        videoId: "Yq1c_ONea58",
        thumbnail: "https://img.youtube.com/vi/Yq1c_ONea58/maxresdefault.jpg",
        title: "College Choice & Branch Selection Guide 2024",
        published: ""
    },
    {
        videoId: "SmHbChsfaVk",
        thumbnail: "https://img.youtube.com/vi/SmHbChsfaVk/maxresdefault.jpg",
        title: "AI Probability & Rank Analysis Secrets",
        published: ""
    }
];

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        const now = new Date();
        const diffMs = now - d;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return ''; }
};

const VideoLibrarySection = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/youtube-videos`);
            const data = await res.json();
            if (data.success && data.videos && data.videos.length > 0) {
                setVideos(data.videos.slice(0, 3));
            } else {
                setVideos(fallbackVideos);
            }
        } catch (err) {
            console.warn('YouTube API unavailable, using fallback videos', err);
            setVideos(fallbackVideos);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
        const intervalId = setInterval(fetchVideos, 5 * 60 * 1000);
        const handleFocus = () => fetchVideos();
        window.addEventListener('focus', handleFocus);
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    const openVideo = (id) => {
        window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
    };

    return (
        <section id="videos" className="py-12 lg:py-32 bg-background relative overflow-hidden">
            <div className="section-container relative z-10">
                
                {/* Desktop Header Layout */}
                <div className="hidden lg:flex lg:flex-row items-end justify-between mb-24 gap-8">
                    <div className="max-w-xl text-left">
                        <div className="h-[2px] w-12 bg-[#0462C3] mb-8 rounded-full"></div>
                        <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            Latest <span className="serif-font italic capitalize">Insights</span><br />
                            from our Channel
                        </h2>
                        <p className="text-lg text-on-surface-variant font-medium italic">
                            Stay updated with tactical admission strategies and campus reviews from JEC Experts.
                        </p>
                    </div>
                    <div>
                        <a
                            href="https://www.youtube.com/@counselify"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-4 bg-[#FF0000] text-white font-bold text-[13px] uppercase tracking-[0.15em] rounded-full shadow-lg hover:bg-[#cc0000] hover:shadow-xl transition-all flex items-center gap-3 group"
                        >
                            <svg viewBox="0 0 28 20" className="w-7 h-5 fill-white shrink-0">
                                <path d="M27.4 3.1c-.3-1.2-1.2-2.1-2.4-2.4C22.8 0 14 0 14 0S5.2 0 3 .7C1.8 1 .9 1.9.6 3.1 0 5.3 0 10 0 10s0 4.7.6 6.9c.3 1.2 1.2 2.1 2.4 2.4C5.2 20 14 20 14 20s8.8 0 11-.7c1.2-.3 2.1-1.2 2.4-2.4.6-2.2.6-6.9.6-6.9s0-4.7-.6-6.9zM11.2 14.3V5.7L18.5 10l-7.3 4.3z"/>
                            </svg>
                            YouTube Channel
                        </a>
                    </div>
                </div>

                {/* Mobile Header Layout (Premium Redesign) */}
                <div className="flex lg:hidden flex-col items-center justify-center text-center mb-10 space-y-4 px-4">
                    {/* YouTube Branded Eyebrow */}
                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-red-50 border border-red-100/50 rounded-full mx-auto shadow-[0_2px_12px_rgba(255,0,0,0.04)] mb-2">
                        <div className="w-5 h-5 bg-[#FF0000] rounded-md flex items-center justify-center shadow-[0_2px_8px_rgba(255,0,0,0.3)]">
                            <Play size={10} className="text-white fill-white ml-0.5" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#FF0000]">Official Channel</span>
                    </div>

                    <div className="text-center">
                        <h2 className="text-[34px] font-black text-slate-900 leading-[1.05] tracking-tight mb-2">
                             Latest <span className="text-[#0462C3] italic serif-font font-medium">Insights</span><br />
                            <span className="text-[14px] text-slate-400 font-black uppercase tracking-[0.25em]">From our Channel</span>
                        </h2>
                        <p className="text-[13px] text-slate-500 font-medium leading-relaxed max-w-[280px] mx-auto opacity-80 mt-4">
                            Stay updated with tactical admission strategies and campus reviews from JEC Experts.
                        </p>
                    </div>
                </div>

                {loading && videos.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin border-4 border-slate-200 border-t-[#0462C3] rounded-full w-12 h-12"></div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-8 px-2">
                        {videos.map((video, index) => (
                            <div
                                key={video.videoId || index}
                                onClick={() => openVideo(video.videoId)}
                                className="bg-white rounded-[24px] overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 cursor-pointer relative transition-all duration-500 hover:-translate-y-2 flex flex-col"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Thumbnail Gradient Overlay */}
                                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                                    
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transform scale-100 lg:scale-0 lg:group-hover:scale-100 transition-all duration-500 border border-white">
                                            <Play size={24} className="text-[#0462C3] fill-[#0462C3] ml-1" />
                                        </div>
                                    </div>

                                    {/* Mobile Duration/Date Badge */}
                                    {video.published && (
                                        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/10">
                                            <Clock size={10} /> {formatDate(video.published)}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 text-left flex-1 flex flex-col">
                                    <h3 className="text-[17px] font-extrabold text-slate-800 leading-tight mb-4 line-clamp-2 pr-4">
                                        {video.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[#0462C3] text-[11px] font-black uppercase tracking-widest">
                                            <ExternalLink size={14} strokeWidth={2.5} /> Watch Now
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-300 text-[10px] font-bold">
                                            <Eye size={12} />
                                            <span>Tutorial</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Brand Blue Premium CTA Button for Mobile */}
                <div className="mt-10 lg:hidden px-4">
                    <a
                        href="https://www.youtube.com/@counselify"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-5 bg-gradient-to-r from-[#0462C3] to-blue-600 shadow-[0_8px_24px_rgba(4,98,195,0.3)] font-black text-[12px] uppercase tracking-[0.2em] text-white rounded-full flex justify-center items-center gap-3 active:scale-[0.98] transition-all relative overflow-hidden group"
                    >
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"></div>
                        Explore Videos on YouTube
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default VideoLibrarySection;
