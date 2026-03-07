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
        <section id="videos" className="py-32 bg-transparent relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-transparent -z-10"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
                    <div className="max-w-xl">
                        <div className="h-px w-20 bg-[#0462C3] mb-8"></div>
                        <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            Latest <span className="serif-font italic capitalize">Insights</span><br />
                            from our Channel
                        </h2>
                        <p className="text-lg text-slate-500 font-medium italic">
                            Stay updated with tactical admission strategies and campus reviews from JEC Experts.
                        </p>
                    </div>
                    <div>
                        <a
                            href="https://www.youtube.com/@counselify"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-12 py-5 border border-slate-200 text-slate-800 font-bold text-[13px] uppercase tracking-[0.2em] bg-white shadow-xl hover:bg-slate-50 transition-all flex items-center gap-3 group"
                        >
                            YouTube Channel <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100 shadow-2xl">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            onClick={() => openVideo(video.videoId)}
                            className="bg-white border-b md:border-b-0 md:border-r border-slate-100 transition-all duration-500 hover:bg-[#fcfdfe] group cursor-pointer relative last:border-r-0"
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
                                <div className="absolute bottom-4 right-4 bg-slate-900/90 text-white text-[11px] font-bold uppercase tracking-widest px-2 py-1 shadow-lg">
                                    {video.duration}
                                </div>
                            </div>

                            <div className="p-8 text-left">
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-3 flex items-center gap-2">
                                    <Clock size={12} /> {video.time}
                                </p>
                                <h3 className="text-xl font-medium serif-font italic text-slate-800 mb-6 group-hover:text-[#0462C3] transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    <Eye size={14} /> {video.views} Views
                                </div>
                            </div>

                            {/* Decorative line */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-[#0462C3] group-hover:w-full transition-all duration-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoLibrarySection;
