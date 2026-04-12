import { useState, useRef, useEffect } from 'react';
import { Quote, Star, BadgeCheck, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Rahul Sharma",
            rank: "AIR Range: 10k – 15k",
            college: "IIT Bhilai",
            branch: "Electrical Engineering",
            avatarType: "initial",
            initial: "R",
            avatarColor: "blue",
            image: "",
            quote: "I was really confused about which colleges I could get at my rank. My family was also unsure. Counselify helped me understand everything step by step. Finally I secured Electrical at IIT Bhilai. Their guidance was very clear and practical."
        },
        {
            id: 2,
            name: "Priya Singh",
            rank: "AIR Range: 18k – 22k",
            college: "NIT Raipur",
            branch: "Computer Science",
            avatarType: "initial",
            initial: "P",
            avatarColor: "teal",
            image: "",
            quote: "I was not targeting top IITs, but still wanted the best option. With their help I got NIT Raipur CSE. Totally worth it."
        },
        {
            id: 3,
            name: "Aman Verma",
            rank: "AIR Range: 15k – 20k",
            college: "IIIT Pune",
            branch: "Information Technology",
            avatarType: "initial",
            initial: "A",
            avatarColor: "green",
            image: "",
            quote: "Before JoSAA, I had no idea about choice filling. Counselify team helped me avoid mistakes. Because of that I got IIIT Pune IT."
        },
        {
            id: 4,
            name: "Rohit Yadav",
            rank: "AIR Range: 12k – 18k",
            college: "IIT Jammu",
            branch: "Mechanical Engineering",
            avatarType: "initial",
            initial: "R",
            avatarColor: "blue",
            image: "",
            quote: "The college predictor is actually very accurate. I tried multiple sources, but this felt the most reliable. It gave me a clear idea of safe and dream colleges."
        },
        {
            id: 5,
            name: "Sneha Patel",
            rank: "AIR Range: 8k – 14k",
            college: "IIT Dharwad",
            branch: "Civil Engineering",
            avatarType: "initial",
            initial: "S",
            avatarColor: "teal",
            image: "",
            quote: "I liked that everything was simple. No confusion. Even my parents understood the process after talking to them."
        }
    ];

    const getAvatarStyle = (color) => {
        switch(color) {
            case 'teal': return 'bg-gradient-to-br from-teal-400 to-teal-600 shadow-[0_4px_12px_rgba(45,212,191,0.2)]';
            case 'green': return 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_4px_12px_rgba(52,211,153,0.2)]';
            case 'blue': 
            default: return 'bg-gradient-to-br from-[#0462C3] to-blue-600 shadow-[0_4px_12px_rgba(4,98,195,0.2)]';
        }
    };

    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const checkScrollState = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 10);
            
            const maxScroll = scrollWidth - clientWidth;
            setCanScrollRight(Math.round(scrollLeft) < maxScroll - 10);
            
            const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
            setScrollProgress(Math.min(100, Math.max(0, progress)));

            // Update active dot index
            const cardWidth = clientWidth;
            const idx = Math.round(scrollLeft / cardWidth);
            setActiveIndex(Math.min(idx, testimonials.length - 1));
        }
    };

    useEffect(() => {
        const timer = setTimeout(checkScrollState, 100);
        window.addEventListener('resize', checkScrollState);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScrollState);
        };
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setStartScrollLeft(carouselRef.current.scrollLeft);
    };

    const onMouseLeave = () => setIsDragging(false);
    const onMouseUp = () => setIsDragging(false);

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed multiplier
        carouselRef.current.scrollLeft = startScrollLeft - walk;
    };

    return (
        <section id="testimonials" className="py-12 lg:py-28 bg-[#f8fafd] relative overflow-hidden">
            {/* Soft decorative background element */}
            <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-blue-100/30 -z-10 rounded-r-full blur-3xl opacity-50"></div>

            <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
                
                {/* Mobile Trust Headline */}
                <div className="md:hidden text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                        <div className="w-2 h-2 rounded-full bg-[#0462C3] animate-pulse"></div>
                        <span className="text-[11px] font-black text-[#0462C3] uppercase tracking-[0.2em]">Trusted by 40,000+ students across India</span>
                    </div>
                </div>

                {/* Header Block */}
                <div className="flex flex-col items-center justify-center text-center mb-20 max-w-2xl mx-auto">
                    <div className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mb-6">
                        <ShieldCheck size={16} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Based on real counselling experience</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                        Real Student Results, <br/>
                        <span className="text-[#0462C3]">Real Outcomes.</span>
                    </h2>
                    
                    <p className="text-base text-slate-500 font-medium leading-relaxed max-w-lg">
                        Guidance that helped students make the right decisions at the exact right time throughout their engineering journey.
                    </p>
                </div>

                {/* Horizontal Scroll Carousel */}
                <div className="relative mt-8 md:mt-12 w-full mx-auto group/carousel">
                    
                    {/* Nav Arrows — Desktop only */}
                    <button 
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`hidden md:flex absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/95 backdrop-blur-md rounded-full items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 transition-all duration-300 hover:bg-white hover:scale-110 disabled:opacity-0 disabled:translate-x-4 text-slate-800 ${canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>

                    <button 
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`hidden md:flex absolute right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/95 backdrop-blur-md rounded-full items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 transition-all duration-300 hover:bg-white hover:scale-110 disabled:opacity-0 disabled:-translate-x-4 text-[#0462C3] ${canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>

                    {/* Scroll Track */}
                    <div 
                        ref={carouselRef}
                        onScroll={checkScrollState}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        className={`flex gap-6 overflow-x-auto pb-12 pt-4 hide-scrollbar style-carousel px-1 md:px-0 ${isDragging ? 'cursor-grabbing' : 'snap-x snap-mandatory cursor-grab active:cursor-grabbing'}`}
                    >
                        {testimonials.map((testimonial) => (
                            <div 
                                key={testimonial.id} 
                                className="flex-none w-[90vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] group relative flex flex-col"
                            >
                                <Quote size={40} className="absolute top-6 right-6 text-blue-50 opacity-60 group-hover:text-blue-100 transition-colors" />
                                
                                {/* Stars */}
                                <div className="flex gap-1 mb-5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-[15px] font-medium text-slate-600 leading-relaxed mb-8 flex-grow">
                                    "{testimonial.quote}"
                                </p>

                                {/* Profile Block */}
                                <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-5">
                                    <div className="relative group/avatar cursor-default">
                                        {testimonial.avatarType === 'image' && testimonial.image ? (
                                            <img 
                                                src={testimonial.image} 
                                                alt={testimonial.name} 
                                                className="w-14 h-14 md:w-[60px] md:h-[60px] rounded-full object-cover border-[3px] border-white shadow-sm transition-transform duration-300 group-hover/avatar:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className={`w-14 h-14 md:w-[60px] md:h-[60px] rounded-full ${getAvatarStyle(testimonial.avatarColor)} flex items-center justify-center text-white text-[22px] font-black border-[3px] border-white transition-transform duration-300 group-hover/avatar:scale-[1.05] relative`}>
                                                {testimonial.initial}
                                            </div>
                                        )}
                                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-[2px] border-[2.5px] border-white z-10 hover:scale-110 transition-transform" title="Verified Student">
                                            <BadgeCheck size={14} strokeWidth={3} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] lg:text-[15px] font-bold text-slate-800 tracking-tight">{testimonial.name}</span>
                                        <div className="flex flex-col mt-0.5">
                                            <span className="text-[12px] font-bold text-[#0462C3] tracking-tight">{testimonial.college} <span className="font-medium text-slate-400 mx-1">•</span> <span className="text-slate-600 font-medium">{testimonial.branch}</span></span>
                                            {testimonial.rank && (
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 opacity-80">{testimonial.rank}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                
                    {/* Desktop Progress Bar */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-slate-200/50 rounded-full overflow-hidden hidden md:block">
                        <div 
                            className="h-full bg-gradient-to-r from-[#0462C3] to-blue-400 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${Math.max(scrollProgress, 5)}%` }}
                        />
                    </div>

                    {/* Mobile: Premium Progress Indicator */}
                    <div className="flex md:hidden items-center gap-3 mt-5 px-1">
                        {/* Counter */}
                        <span className="text-[12px] font-black text-[#0462C3] tabular-nums shrink-0">
                            {String(activeIndex + 1).padStart(2, '0')}
                            <span className="text-slate-300 font-medium"> / {String(testimonials.length).padStart(2, '0')}</span>
                        </span>

                        {/* Thin progress track */}
                        <div className="flex-1 h-[3px] bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#0462C3] rounded-full transition-all duration-400 ease-out"
                                style={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                            />
                        </div>

                        {/* Swipe hint */}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Swipe</span>
                    </div>
                </div>

            </div>
            
            <style jsx="true">{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @media (hover: hover) {
                    .style-carousel:hover {
                        cursor: grab;
                    }
                    .style-carousel:active {
                        cursor: grabbing;
                    }
                }
            `}</style>
        </section>
    );
};

export default TestimonialsSection;
