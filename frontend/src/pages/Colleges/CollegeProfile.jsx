import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Calendar, Award, BookOpen, GraduationCap,
    Clock, Banknote, Users, Building, Laptop, HeartPulse, Bus, Plane, Train
} from 'lucide-react';
import iitProfiles, {
    commonFacilities, commonEligibility, commonAdmission, commonScholarships
} from '../../data/iit_profiles';

const CollegeProfile = () => {
    const { slug } = useParams();
    const college = iitProfiles[slug];

    if (!college) {
        return (
            <div className="pt-48 pb-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-black text-slate-800 mb-4">College Not Found</h1>
                <p className="text-slate-500 mb-8">We couldn't find the details for this institute.</p>
                <Link to="/colleges/iit" className="btn-primary">
                    View All IITs
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-32 bg-transparent min-h-screen">
            {/* 1. Header Section */}
            <div className="relative w-full h-[45vh] min-h-[400px]">
                {/* Background Banner */}
                <div className="absolute inset-0">
                    <img src={college.campus} alt={`${college.name} Campus`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/70 to-transparent" />
                </div>

                {/* Header Content */}
                <div className="absolute inset-0 flex flex-col justify-end pb-16">
                    <div className="section-container w-full">
                        <Link to="/colleges/iit" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors mb-8">
                            <ArrowLeft size={16} />
                            Back to IITs
                        </Link>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
                            {/* Logo */}
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white/20 shadow-2xl flex items-center justify-center text-white font-black text-2xl md:text-3xl tracking-wider backdrop-blur-md shrink-0" 
                                 style={{ backgroundColor: college.color }}>
                                {college.shortName.replace('IIT ', '').substring(0, 3).toUpperCase()}
                            </div>
                            
                            {/* Title & Info */}
                            <div className="text-white space-y-4">
                                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                    {college.type} Institute • Est. {college.established}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
                                    {college.name}
                                </h1>
                                <p className="text-lg md:text-xl text-white/80 font-medium italic serif-font">
                                    "{college.tagline}"
                                </p>
                                <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/90 pt-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-brand-accent" />
                                        <span>{college.location.city}, {college.location.state}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Building size={16} className="text-brand-accent" />
                                        <span>{college.campusSize}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-container mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content - Left Column (2/3 width) */}
                <div className="lg:col-span-2 space-y-16">
                    
                    {/* 2. Institute Overview */}
                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-6 flex items-center gap-3">
                            <BookOpen className="text-brand-blue" />
                            Institute Overview
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-[15px] font-medium">
                            {college.overview}
                        </p>
                    </section>

                    {/* 4. Campus Facilities */}
                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-6 flex items-center gap-3">
                            <Building className="text-brand-blue" />
                            Campus Facilities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {commonFacilities.map((facility, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                                    <span className="text-sm font-bold text-slate-700">{facility}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 6 & 7. Admission & Eligibility */}
                    <section className="grid md:grid-cols-2 gap-8">
                        <div className="bg-brand-muted/30 p-8 rounded-[32px] border border-brand-blue/10">
                            <h2 className="text-xl font-black text-brand-dark mb-6 flex items-center gap-3">
                                <GraduationCap className="text-brand-blue" />
                                Mode of Admission
                            </h2>
                            <ol className="space-y-4">
                                {commonAdmission.map((step, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <span className="text-sm text-slate-700 font-medium leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        
                        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-soft">
                            <h2 className="text-xl font-black text-brand-dark mb-6 flex items-center gap-3">
                                <Award className="text-brand-blue" />
                                Eligibility Criteria
                            </h2>
                            <ul className="space-y-5">
                                <li>
                                    <span className="block text-xs font-black uppercase text-slate-400 mb-1">Qualification</span>
                                    <span className="text-sm font-bold text-slate-700">{commonEligibility.qualification}</span>
                                </li>
                                <li>
                                    <span className="block text-xs font-black uppercase text-slate-400 mb-1">Required Exam</span>
                                    <span className="text-sm font-bold text-slate-700">{commonEligibility.exam}</span>
                                </li>
                                <li>
                                    <span className="block text-xs font-black uppercase text-slate-400 mb-1">Minimum Marks</span>
                                    <span className="text-sm font-bold text-slate-700">{commonEligibility.minMarks}</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 8. Courses Offered */}
                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-6 flex items-center gap-3">
                            <Laptop className="text-brand-blue" />
                            Courses Offered
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b-2 border-slate-200">
                                        <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 rounded-tl-2xl">Course Name</th>
                                        <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Degree</th>
                                        <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 rounded-tr-2xl">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {college.courses.map((course, idx) => (
                                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 text-sm font-bold text-slate-700">{course.name}</td>
                                            <td className="py-4 px-6 text-sm text-slate-600 font-medium">{course.degree}</td>
                                            <td className="py-4 px-6 text-sm text-slate-600 font-medium">{course.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 9. Seat Matrix */}
                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-6 flex items-center gap-3">
                            <Users className="text-brand-blue" />
                            Seat Matrix (Category-wise)
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr className="bg-brand-dark text-white">
                                        <th className="py-4 px-6 text-xs font-black uppercase tracking-widest rounded-tl-2xl">Course</th>
                                        <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-center">Total</th>
                                        <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-center text-white/70">Open</th>
                                        <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-center text-white/70">OBC</th>
                                        <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-center text-white/70">SC</th>
                                        <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-center text-white/70">ST</th>
                                        <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-center text-white/70">EWS</th>
                                        <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-center text-white/70 rounded-tr-2xl">PwD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {college.seatMatrix.map((seat, idx) => (
                                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 text-sm font-bold text-slate-700">{seat.course}</td>
                                            <td className="py-4 px-4 text-sm font-black text-[#0462C3] text-center">{seat.total}</td>
                                            <td className="py-4 px-4 text-sm text-slate-600 font-medium text-center">{seat.open}</td>
                                            <td className="py-4 px-4 text-sm text-slate-600 font-medium text-center">{seat.obc}</td>
                                            <td className="py-4 px-4 text-sm text-slate-600 font-medium text-center">{seat.sc}</td>
                                            <td className="py-4 px-4 text-sm text-slate-600 font-medium text-center">{seat.st}</td>
                                            <td className="py-4 px-4 text-sm text-slate-600 font-medium text-center">{seat.ews}</td>
                                            <td className="py-4 px-4 text-sm text-slate-600 font-medium text-center">{seat.pwd}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 10. Cutoffs */}
                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-6 flex items-center gap-3">
                            <Award className="text-brand-blue" />
                            Previous Year Cutoffs (Closing Ranks)
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b-2 border-slate-200">
                                        <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 rounded-tl-2xl">Course</th>
                                        <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-[#0462C3] text-center">2024</th>
                                        <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 text-center">2023</th>
                                        <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 text-center rounded-tr-2xl">2022</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {college.cutoffs.map((cutoff, idx) => (
                                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 text-sm font-bold text-slate-700">{cutoff.course}</td>
                                            <td className="py-4 px-6 text-sm font-black text-brand-dark text-center">{cutoff.y2024}</td>
                                            <td className="py-4 px-6 text-sm text-slate-500 font-medium text-center">{cutoff.y2023}</td>
                                            <td className="py-4 px-6 text-sm text-slate-500 font-medium text-center">{cutoff.y2022}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-400 font-medium mt-3 italic">* Displayed cutoffs are for General (Open) Category, Gender-Neutral.</p>
                    </section>
                </div>

                {/* Sidebar - Right Column (1/3 width) */}
                <div className="space-y-8">
                    
                    {/* 16. Quick Summary Card */}
                    <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -z-0"></div>
                        <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-6 relative z-10">Quick Summary</h3>
                        
                        <div className="space-y-6 relative z-10">
                            <div>
                                <span className="text-xs font-bold text-slate-400 block mb-1">NIRF Ranking (2024)</span>
                                <span className="text-3xl font-black text-brand-dark">#{college.rankings.current}</span>
                                <span className="text-sm font-bold text-brand-blue ml-2 italic serif-font">in Engineering</span>
                            </div>
                            
                            <div className="h-px bg-slate-100 w-full" />
                            
                            <div>
                                <span className="text-xs font-bold text-slate-400 block mb-1">Average Package</span>
                                <span className="text-xl font-black text-slate-800">{college.placements.average}</span>
                            </div>
                            
                            <div>
                                <span className="text-xs font-bold text-slate-400 block mb-1">Highest Package</span>
                                <span className="text-xl font-black text-emerald-600">{college.placements.highest}</span>
                            </div>
                        </div>
                    </div>

                    {/* 11 & 12. Fees & Scholarships */}
                    <div className="bg-brand-muted/30 rounded-[32px] p-8 border border-brand-blue/10">
                        <h3 className="text-lg font-black text-brand-dark mb-6 flex items-center gap-2">
                            <Banknote size={20} className="text-brand-blue" />
                            Fee Structure
                        </h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 font-medium">Tuition Fee</span>
                                <span className="font-bold text-slate-800">{college.fees.tuition}</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 font-medium">Hostel Fee</span>
                                <span className="font-bold text-slate-800">{college.fees.hostel}</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 font-medium">Mess Charges</span>
                                <span className="font-bold text-slate-800">{college.fees.mess}</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 font-medium">Admission Fee</span>
                                <span className="font-bold text-slate-800">{college.fees.admission}</span>
                            </li>
                            <li className="flex justify-between items-center pt-4 border-t border-brand-blue/10">
                                <span className="text-sm font-black text-brand-dark">Est. Yearly Cost</span>
                                <span className="text-lg font-black text-[#0462C3]">{college.fees.totalYearly}</span>
                            </li>
                        </ul>

                        <h3 className="text-md font-black text-brand-dark mb-4">Waivers & Scholarships</h3>
                        <div className="space-y-3">
                            {commonScholarships.map((schol, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                    <span className="block text-xs font-black text-slate-800 mb-0.5">{schol.name}</span>
                                    <span className="text-[11px] text-slate-500 font-medium leading-tight block">{schol.detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Address & Connectivity */}
                    <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-soft">
                        <h3 className="text-lg font-black text-brand-dark mb-6 flex items-center gap-2">
                            <MapPin size={20} className="text-brand-blue" />
                            Connectivity
                        </h3>
                        
                        <p className="text-sm font-medium text-slate-600 mb-6 leading-relaxed">
                            {college.address.full}
                        </p>

                        <div className="space-y-5">
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                    <Plane size={14} className="text-slate-500" />
                                </div>
                                <div>
                                    <span className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Nearest Airport</span>
                                    <span className="text-sm font-bold text-slate-700 block">{college.address.airport.name}</span>
                                    <span className="text-xs text-brand-blue font-bold">{college.address.airport.distance}</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                    <Train size={14} className="text-slate-500" />
                                </div>
                                <div>
                                    <span className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Railway Station</span>
                                    <span className="text-sm font-bold text-slate-700 block">{college.address.railway.name}</span>
                                    <span className="text-xs text-brand-blue font-bold">{college.address.railway.distance}</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                    <Bus size={14} className="text-slate-500" />
                                </div>
                                <div>
                                    <span className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Bus Stand</span>
                                    <span className="text-sm font-bold text-slate-700 block">{college.address.bus.name}</span>
                                    <span className="text-xs text-brand-blue font-bold">{college.address.bus.distance}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 13 & 14. Placements & Recruiters */}
                    <div className="bg-brand-dark rounded-[32px] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0"></div>
                        <h3 className="text-lg font-black mb-6 relative z-10 flex items-center gap-2">
                            <Banknote size={20} className="text-brand-accent" />
                            Placement Stats
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <span className="block text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Placement %</span>
                                <span className="text-xl font-black">{college.placements.percentage}</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <span className="block text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Median CTC</span>
                                <span className="text-xl font-black">{college.placements.median}</span>
                            </div>
                        </div>

                        <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 relative z-10">Top Recruiters</h4>
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {college.recruiters.map((recruiter, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-white/80">
                                    {recruiter}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 15. Why Choose */}
                    <div className="bg-emerald-50 rounded-[32px] p-8 border border-emerald-100">
                        <h3 className="text-lg font-black text-emerald-900 mb-6 flex items-center gap-2">
                            <HeartPulse size={20} className="text-emerald-600" />
                            Why Choose {college.shortName}?
                        </h3>
                        <ul className="space-y-4">
                            {college.whyChoose.map((point, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></div>
                                    <span className="text-sm font-medium text-emerald-800 leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeProfile;
