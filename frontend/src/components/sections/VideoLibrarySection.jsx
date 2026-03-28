import { PlayCircle, Eye, Clock, ExternalLink } from 'lucide-react';

const VideoLibrarySection = () => {
    const videos = [
        {
            videoId: "hDgHJ1HJIXc",
            thumbnail: "https://img.youtube.com/vi/hDgHJ1HJIXc/maxresdefault.jpg",
            duration: "08:45",
            title: "Marks Vs Percentile JEE Mains 2026 | Morning Shift Analysis",
            views: "64K",
            time: "2 days ago"
        },
        {
            videoId: "Yq1c_ONea58",
            thumbnail: "https://img.youtube.com/vi/Yq1c_ONea58/maxresdefault.jpg",
            duration: "11:45",
            title: "College Choice & Branch Selection Guide 2024",
            views: "38K",
            time: "2 weeks ago"
        },
        {
            videoId: "SmHbChsfaVk",
            thumbnail: "https://img.youtube.com/vi/SmHbChsfaVk/maxresdefault.jpg",
            duration: "13:10",
            title: "AI Probability & Rank Analysis Secrets",
            views: "29K",
            time: "3 weeks ago"
        }
    ];

    const openVideo = (id) => {
        window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
    };

    return (
        <section id="videos" className="py-32 bg-background relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-background -z-10"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
                    <div className="max-w-xl">
                        <div className="h-px w-20 bg-[#0462C3] mb-8"></div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            onClick={() => openVideo(video.videoId)}
                            className="bg-white rounded-2xl overflow-hidden group editorial-shadow cursor-pointer relative transition-transform duration-500 hover:-translate-y-2"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#0462C3]/20 transition-all duration-500 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                                        <PlayCircle size={32} className="text-[#0462C3] fill-[#0462C3]/10" />
                                    </div>
                                </div>
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[0.65rem] font-bold text-[#0462C3] uppercase tracking-widest z-10">
                                    {video.duration}
                                </div>
                            </div>

                            <div className="p-8 text-left">
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-outline mb-3 flex items-center gap-2">
                                    <Clock size={12} /> {video.time}
                                </p>
                                <h3 className="text-xl font-medium serif-font italic text-on-surface mb-6 group-hover:text-[#0462C3] transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                                <div className="flex items-center gap-2 text-outline text-xs font-bold uppercase tracking-widest">
                                    <Eye size={14} /> {video.views} Views
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoLibrarySection;
