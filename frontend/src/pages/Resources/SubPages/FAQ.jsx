import { ArrowLeft, Plus, Minus, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            q: "What is JoSAA?",
            a: "JoSAA (Joint Seat Allocation Authority) is the main counselling process for admission into IITs, NITs, IIITs, and GFTIs after JEE Main and JEE Advanced. If you want admission in these colleges, you must participate in JoSAA counselling."
        },
        {
            q: "What is CSAB?",
            a: "CSAB (Central Seat Allocation Board) conducts special rounds after JoSAA. It fills the vacant seats in NITs, IIITs, and GFTIs. If you did not get a seat in JoSAA or want another chance, you can apply in CSAB."
        },
        {
            q: "What is the difference between JoSAA and CSAB?",
            a: "JoSAA is the main counselling process, while CSAB is the special round after JoSAA. IMPORTANT: IIT seats are only through JoSAA. CSAB does not include IITs."
        },
        {
            q: "What is Freeze, Float, and Slide?",
            a: "Freeze – You accept the seat and do not want any upgrade. Float – You accept the seat but want a better college in the next round. Slide – You accept the seat but want a better branch in the same college."
        },
        {
            q: "What documents are required during counselling?",
            a: "Usually, you need: JEE Admit Card, JEE Scorecard, Class 10/12 Marksheets, Category/EWS Certificate (if applicable), Passport-size photos, and Seat allotment letter. Exact documents may change according to official guidelines."
        },
        {
            q: "Can I participate in counselling if I did not qualify JEE Advanced?",
            a: "Yes. You can participate in JoSAA for NITs, IIITs, and GFTIs if you qualified JEE Main. But for admission to IITs, you must qualify JEE Advanced."
        },
        {
            q: "How should I fill my choices?",
            a: "You should fill choices in this order: Dream colleges first, Realistic options in the middle, and Safe backup options at the end. Choice order is critical as a wrong sequence can cost you a better seat."
        },
        {
            q: "What happens if I do not pay the seat acceptance fee?",
            a: "If you do not pay the seat acceptance fee on time, your seat will be cancelled, and you may lose your chance in further rounds."
        },
        {
            q: "Can I change my choices after locking?",
            a: "No. After the deadline and locking, you cannot change your choices. Always check double-check before final locking."
        },
        {
            q: "What if I do not get any seat in JoSAA?",
            a: "You can apply for CSAB special rounds. Additionally, you can participate in state counselling and private college admissions."
        },
        {
            q: "What is Home State Quota?",
            a: "In NITs, approximately 50% of seats are reserved for students from the same state where the NIT is located. If your home state matches, your admission chances significantly increase."
        },
        {
            q: "What is Other State Quota?",
            a: "If you are applying to an NIT outside your home state, you will compete under the Other State (OS) quota."
        },
        {
            q: "What is a counselling round?",
            a: "Counselling happens in multiple rounds. In each round, seats are allotted, some students upgrade, and others withdraw. Your seat can change depending on these upgrades."
        },
        {
            q: "What is seat withdrawal?",
            a: "Seat withdrawal means you cancel your allotted seat before final admission. Note that refund rules depend on the official authority's guidelines."
        },
        {
            q: "Is the counselling fee refundable?",
            a: "The seat acceptance fee may be partially refundable (with processing deductions). Always verify official rules before withdrawing."
        },
        {
            q: "Can I participate in both JoSAA and State counselling?",
            a: "Yes. You can apply in multiple counselling processes simultaneously. However, you can ultimately confirm only one seat for admission."
        },
        {
            q: "Do private colleges accept JEE Main rank?",
            a: "Yes. Many top private colleges accept JEE Main scores. Some may also conduct their own separate entrance exams."
        },
        {
            q: "What is a spot round?",
            a: "A spot round is conducted locally by institutes or authorities to fill remaining vacant seats after regular counselling is over. It's a final chance but can be risky."
        },
        {
            q: "Is CSAB risky?",
            a: "CSAB is risky only if you leave a confirmed seat hoping for a better one without a backup. For those without a seat in JoSAA, it is a massive opportunity."
        },
        {
            q: "Why should I take Counselify guidance?",
            a: "Counselling requires strategy, not just filling forms. Counselify provides Rank analysis, Smart choice filling, National vs State comparisons, and dedicated support until your admission is secured."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="pt-24 pb-32 bg-surface-container-low min-h-screen text-left">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link to="/resources" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-outline hover:text-[#0462C3] transition-colors mb-12">
                    <ArrowLeft size={16} /> Back to Hub
                </Link>

                <div className="mb-16 space-y-4">
                    <div className="w-12 h-12 bg-[#0462C3] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-6">
                        <HelpCircle size={24} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#0462C3]">Counselify Support</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mt-4 serif-font italic tracking-tighter">Everything You Need <br /> To Know.</h1>
                    <p className="text-on-surface-variant font-bold italic max-w-lg">
                        We've answered the most critical questions to help you navigate the complex world of engineering admissions.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-[32px] border transition-all duration-500 overflow-hidden ${activeIndex === idx ? 'border-[#0462C3] shadow-2xl shadow-blue-50' : 'border-outline-variant/20 hover:border-slate-300'}`}
                        >
                            <button
                                onClick={() => toggleAccordion(idx)}
                                className="w-full p-8 md:p-10 flex items-center justify-between gap-6 text-left"
                            >
                                <h3 className={`text-lg md:text-xl font-bold transition-colors ${activeIndex === idx ? 'text-[#0462C3]' : 'text-on-surface'}`}>
                                    {idx + 1}. {faq.q}
                                </h3>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeIndex === idx ? 'bg-[#0462C3] text-white rotate-180' : 'bg-surface-container-low text-outline'}`}>
                                    {activeIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            <div className={`transition-all duration-500 ease-in-out px-8 md:px-10 overflow-hidden ${activeIndex === idx ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 md:p-8 bg-surface-container-low rounded-[24px] border border-outline-variant/20">
                                    <p className="text-on-surface-variant font-bold italic leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-12 bg-white rounded-[48px] shadow-2xl border border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="space-y-4 text-center md:text-left">
                        <h4 className="text-2xl font-bold text-slate-900">Still have questions?</h4>
                        <p className="text-on-surface-variant font-bold italic">Our IIT/NIT alumni mentors are ready to help you personally.</p>
                    </div>
                    <button className="px-12 py-6 bg-[#0462C3] text-white rounded-[28px] font-bold text-[13px] uppercase tracking-[0.2em] shadow-xl hover:bg-[#0351a1] shadow-primary-fixed flex items-center gap-4 transition-all hover:scale-105 active:scale-95">
                        <MessageCircle size={20} /> Talk to Mentor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
