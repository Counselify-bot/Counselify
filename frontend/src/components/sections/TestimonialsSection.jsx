import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Rahul Sharma",
            rank: "AIR 247",
            college: "IIT Bombay CSE",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
            quote: "The counseling sessions were transformative. Their AI rank predictor provided a level of precision I hadn't seen elsewhere, guiding me to my first choice: Computer Science at IIT Bombay. Truly a world-class experience."
        },
        {
            id: 2,
            name: "Sneha Patel",
            rank: "AIR 1052",
            college: "IIT Delhi EE",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000",
            quote: "Navigating branch selection was complex until I spoke with their advisors. They provided realistic placement metrics and academic reviews that made my decision for Electrical Engineering at IIT Delhi clear and confident."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="py-32 bg-surface-container-low relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-background -z-10 skew-x-[12deg] translate-x-32 border-l border-outline-variant/20"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
                    <div className="max-w-xl">
                        <div className="h-px w-20 bg-[#0462C3] mb-8"></div>
                        <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            Candidate <span className="serif-font italic capitalize">success</span><br />
                            and Achievements
                        </h2>
                        <p className="text-lg text-on-surface-variant font-medium italic">
                            Honest feedback from students who successfully secured admissions to India's premier institutes.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="glass-panel rounded-2xl editorial-shadow flex flex-col md:flex-row border-t-4 border-[#0462C3] relative min-h-[500px]">
                        {/* Image Column */}
                        <div className="md:w-[45%] relative overflow-hidden group">
                            <img
                                src={currentTestimonial.image}
                                alt={currentTestimonial.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-background transition-colors duration-500"></div>

                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 glass-panel p-6 rounded-2xl editorial-shadow border-l-4 border-[#0462C3]">
                                <h4 className="text-2xl font-medium serif-font italic text-slate-900">{currentTestimonial.name}</h4>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0462C3] mt-2">
                                    {currentTestimonial.rank} | {currentTestimonial.college}
                                </p>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="md:w-[55%] p-12 md:p-20 flex flex-col justify-center relative bg-white">
                            <Quote size={80} className="text-slate-50 absolute top-10 right-10 -z-0" />

                            <div className="flex gap-1 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-[#0462C3] text-[#0462C3]" />
                                ))}
                            </div>

                            <p className="text-on-surface-variant text-xl font-medium italic serif-font leading-relaxed mb-12 relative z-10">
                                "{currentTestimonial.quote}"
                            </p>

                            <div className="flex gap-4 mt-auto">
                                <button
                                    onClick={handlePrev}
                                    className="w-14 h-14 border border-outline-variant/30 text-outline flex items-center justify-center hover:bg-[#0462C3] hover:text-white hover:border-[#0462C3] transition-all duration-300"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-14 h-14 border border-outline-variant/30 text-outline flex items-center justify-center hover:bg-[#0462C3] hover:text-white hover:border-[#0462C3] transition-all duration-300"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Index Indicator */}
                    <div className="flex justify-end mt-8 gap-4 items-center">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-outline-variant">Case {currentIndex + 1} of {testimonials.length}</span>
                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 transition-all duration-500 ${currentIndex === idx ? 'bg-[#0462C3] w-12' : 'bg-surface-container-low w-6'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
