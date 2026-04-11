import React, { useState, useEffect } from 'react';
import { Calendar, Star, Clock, AlertCircle, ExternalLink, Youtube } from 'lucide-react';
import { isPushSupported, ensurePermission, subscribeToPush, unsubscribeFromPush, getStarredItems, getItemReminderPrefs, getGlobalVideoAlerts } from '../../utils/pushNotifications';
import ToastContainer, { useToast } from '../../components/ui/Toast';
import ReminderModal from '../../components/ui/ReminderModal';

const formatVideoDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return ''; }
};

const News = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [videos, setVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [starred, setStarred] = useState(new Set());
    const { toasts, show: showToast } = useToast();

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => { setStarred(getStarredItems()); }, []);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Only set loading if it's strictly empty so we don't flash UI on bg refresh
                if (videos.length === 0) setLoadingVideos(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/youtube-videos`);
                const data = await res.json();
                if (data.success && data.videos) {
                    setVideos(data.videos);
                }
            } catch {
                console.warn('YouTube feed fetch failed');
            } finally {
                setLoadingVideos(false);
            }
        };

        fetchVideos();
        const intervalId = setInterval(fetchVideos, 5 * 60 * 1000); // 5 mins
        
        const handleFocus = () => fetchVideos();
        window.addEventListener('focus', handleFocus);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    const handleStarClick = async (item) => {
        if (!isPushSupported()) {
            showToast('Push notifications are not supported in this browser.', 'error');
            return;
        }
        // If already starred, open modal to update/remove
        if (starred.has(String(item.id))) {
            setModalItem(item);
            setModalOpen(true);
            return;
        }
        // Not starred yet — ask permission first
        const granted = await ensurePermission();
        if (!granted) {
            showToast('Please enable browser notifications to receive reminders.', 'error');
            return;
        }
        // Permission granted — open modal
        setModalItem(item);
        setModalOpen(true);
    };

    const handleModalSave = async (selectedTypes, globalVideoAlert) => {
        if (!modalItem) return;
        const result = await subscribeToPush(String(modalItem.id), selectedTypes, globalVideoAlert);
        if (result.success) {
            setStarred(prev => {
                const next = new Set(prev);
                next.add(String(modalItem.id));
                return next;
            });
            const wasStarred = starred.has(String(modalItem.id));
            showToast(wasStarred ? 'Reminder updated successfully.' : 'Reminder saved successfully.', 'success');
        } else {
            showToast('Could not set reminder. Please try again.', 'error');
        }
        setModalOpen(false);
        setModalItem(null);
    };

    const handleModalRemove = async () => {
        if (!modalItem) return;
        await unsubscribeFromPush(String(modalItem.id));
        setStarred(prev => {
            const next = new Set(prev);
            next.delete(String(modalItem.id));
            return next;
        });
        showToast('Reminder removed.', 'info');
        setModalOpen(false);
        setModalItem(null);
    };

    const updates = [
        { id: 1, title: "JEE Main Session 2 Exam", date: "April 2 – April 9, 2026", tag: "Exam", tagColor: "blue", desc: "JEE Main Session 2 will be conducted during this period.", hasEndDate: true },
        { id: 2, title: "JEE Main Session 2 Result", date: "April 19, 2026", tag: "Result", tagColor: "green", desc: "Official result announcement.", hasEndDate: false },
        { id: 3, title: "JEE Advanced Registration", date: "April 23 – May 4, 2026", tag: "Registration", tagColor: "orange", desc: "Registration window for JEE Advanced.", hasEndDate: true },
        { id: 4, title: "JEE Advanced Admit Card", date: "May 11 – May 17, 2026", tag: "Admit Card", tagColor: "orange", desc: "Admit cards will be available in this range.", hasEndDate: true },
        { id: 5, title: "JEE Advanced Exam", date: "May 17, 2026", tag: "Exam", tagColor: "blue", desc: "JEE Advanced exam will be conducted.", hasEndDate: false },
        { id: 6, title: "JEE Advanced Answer Key & Result", date: "Provisional: May (TBD) | Final: June 1, 2026", tag: "Result", tagColor: "green", desc: "Official results and key disclosures.", hasEndDate: false },
        { id: 7, title: "JoSAA Counselling Registration", date: "June 2, 2026", tag: "Counselling", tagColor: "purple", desc: "Registration begins for JoSAA.", hasEndDate: false },
        { id: 8, title: "BITSAT 2026 Sessions", date: "Session 1: Apr 15 – 17 | Session 2: May 24 – 26", tag: "Exam", tagColor: "blue", desc: "Dates for both BITSAT sessions.", hasEndDate: false },
        { id: 9, title: "BITSAT Session 2 Registration", date: "April 20 – May 2, 2026", tag: "Registration", tagColor: "orange", desc: "Online registration for the second session.", hasEndDate: true },
        { id: 10, title: "JAC Delhi Counselling", date: "Expected Late May 2026", tag: "Counselling", tagColor: "purple", desc: "Usually starts in the 3rd or 4th week of May.", hasEndDate: false }
    ];

    const getTagStyles = (color) => {
        const styles = {
            blue: "bg-blue-50 text-blue-600 border-blue-200",
            green: "bg-emerald-50 text-emerald-600 border-emerald-200",
            orange: "bg-orange-50 text-orange-600 border-orange-200",
            purple: "bg-purple-50 text-purple-600 border-purple-200",
            red: "bg-red-50 text-red-600 border-red-200"
        };
        return styles[color] || "bg-slate-50 text-slate-600 border-slate-200";
    };

    const getBorderAccent = (color) => {
        const styles = {
            blue: "border-l-blue-500",
            green: "border-l-emerald-500",
            orange: "border-l-orange-500",
            purple: "border-l-purple-500",
            red: "border-l-red-500"
        };
        return styles[color] || "border-l-slate-300";
    };

    const filters = ['All', 'Exam', 'Result', 'Registration', 'Counselling', 'Videos'];

    const videoNotifications = videos.map((v) => ({
        id: `yt-${v.videoId}`,
        title: v.title,
        date: formatVideoDate(v.published),
        tag: "Video",
        tagColor: "red",
        desc: "New video uploaded on YouTube",
        source: "From YouTube",
        url: v.url || `https://www.youtube.com/watch?v=${v.videoId}`,
        hasEndDate: false
    }));

    let displayItems = [];
    if (activeFilter === 'Videos') {
        displayItems = videoNotifications;
    } else {
        displayItems = updates.filter(u => activeFilter === 'All' || u.tag === activeFilter);
    }

    return (
        <section className="bg-[#f8fafd] min-h-screen pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <div className="inline-flex items-center justify-center gap-3 mb-6 group cursor-default">
                        <div className="h-px w-8 bg-blue-500/50"></div>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#0462C3] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 flex items-center gap-2 shadow-sm">
                            <span className="w-1.5 h-1.5 bg-[#0462C3] rounded-full animate-ping absolute"></span>
                            <span className="w-1.5 h-1.5 bg-[#0462C3] rounded-full relative"></span>
                            LIVE TRACKER
                        </span>
                        <div className="h-px w-8 bg-blue-500/50"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5">Latest Updates & Deadlines</h1>
                    <p className="text-[14px] font-medium text-slate-500 max-w-xl leading-relaxed mx-auto md:mx-0">Stay completely updated with all upcoming JEE, JoSAA, BITSAT, and critical counselling events ensuring ZERO missed deadlines.</p>
                </div>

                {/* Sticky Filter */}
                <div className="sticky top-[80px] z-30 bg-[#f8fafd]/95 backdrop-blur-md py-4 mb-8 -mx-4 px-4 overflow-x-auto flex gap-2 hide-scrollbar border-b border-slate-200/50">
                    {filters.map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm border flex items-center gap-2 ${
                                activeFilter === filter 
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105' 
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                        >
                            {filter === 'Videos' && <Youtube size={12} />}
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Feed Items */}
                <div className="flex flex-col gap-6">
                    {/* Videos Tab Fallbacks */}
                    {activeFilter === 'Videos' && loadingVideos && videos.length === 0 && (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin border-4 border-slate-200 border-t-red-500 rounded-full w-12 h-12"></div>
                        </div>
                    )}
                    
                    {activeFilter === 'Videos' && !loadingVideos && videos.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <Youtube size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-700">Videos temporarily unavailable</h3>
                            <p className="text-slate-500 mt-2">We are currently fetching the latest videos. Please check back later.</p>
                        </div>
                    )}

                    {displayItems.map((item) => {
                        const isStarred = starred.has(String(item.id));
                        return (
                            <div key={item.id} className={`group relative bg-white rounded-[16px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.03)] border border-slate-100 border-l-[6px] ${getBorderAccent(item.tagColor)} transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1`}>
                                
                                {/* Top row */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-[0.15em] border ${getTagStyles(item.tagColor)}`}>
                                        {item.tag === 'Video' && <Youtube size={10} />}
                                        {item.tag}
                                    </span>
                                    
                                    <div className="flex items-center gap-3">
                                        {item.source && (
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.source}</span>
                                        )}
                                        <button 
                                            onClick={() => handleStarClick(item)}
                                            className={`transition-all cursor-pointer hover:scale-110 ${
                                                isStarred 
                                                    ? 'text-yellow-400 drop-shadow-sm' 
                                                    : 'text-slate-300 hover:text-yellow-400'
                                            }`}
                                            title={isStarred ? 'Edit reminder' : 'Set reminder'}
                                        >
                                            <Star size={18} fill={isStarred ? 'currentColor' : 'none'} strokeWidth={isStarred ? 1 : 1.5} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <h2 className="text-[18px] md:text-[20px] font-extrabold text-slate-800 mb-2 leading-snug group-hover:text-[#0462C3] transition-colors line-clamp-2">{item.title}</h2>
                                <p className="text-[13px] font-medium text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                                
                                {/* Bottom row */}
                                <div className="flex items-center justify-between gap-4 flex-wrap">
                                    <div className="flex items-center gap-2 text-slate-400 bg-[#f8fafd] px-4 py-3 rounded-lg border border-slate-100">
                                        <Clock size={14} className="text-slate-400" />
                                        <span className="text-[12px] font-bold text-slate-600 tracking-wide">{item.date}</span>
                                    </div>
                                    
                                    {item.url && (
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-full hover:bg-red-700 shadow-sm hover:shadow-md transition-all"
                                        >
                                            Watch on YouTube
                                            <ExternalLink size={11} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {displayItems.length === 0 && activeFilter !== 'Videos' && (
                    <div className="text-center py-20">
                        <AlertCircle size={40} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-600">No updates found</h3>
                        <p className="text-sm text-slate-400 mt-1">Try selecting a different category filter</p>
                    </div>
                )}
            </div>

            {/* Reminder Modal */}
            <ReminderModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setModalItem(null); }}
                item={modalItem}
                onSave={handleModalSave}
                onRemove={handleModalRemove}
                existingPrefs={modalItem ? getItemReminderPrefs(modalItem.id) : []}
                isAlreadyStarred={modalItem ? starred.has(String(modalItem.id)) : false}
            />

            {/* Toast Notifications */}
            <ToastContainer toasts={toasts} />
        </section>
    );
};

export default News;
