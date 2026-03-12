const fs = require('fs');
const path = require('path');

// Extract the basic info we already have
const iitColleges = [
    { name: "IIT Bombay", location: "Mumbai, Maharashtra", nirf: 3, established: 1958, campus: "/colleges/campus1.png", color: "#1a5276" },
    { name: "IIT Delhi", location: "New Delhi, Delhi", nirf: 2, established: 1961, campus: "/colleges/campus2.png", color: "#0d47a1" },
    { name: "IIT Madras", location: "Chennai, Tamil Nadu", nirf: 1, established: 1959, campus: "/colleges/campus3.png", color: "#880e4f" },
    { name: "IIT Kanpur", location: "Kanpur, Uttar Pradesh", nirf: 4, established: 1959, campus: "/colleges/campus4.png", color: "#e65100" },
    { name: "IIT Kharagpur", location: "Kharagpur, West Bengal", nirf: 5, established: 1951, campus: "/colleges/campus1.png", color: "#1b5e20" },
    { name: "IIT Roorkee", location: "Roorkee, Uttarakhand", nirf: 6, established: 1847, campus: "/colleges/campus2.png", color: "#004d40" },
    { name: "IIT Guwahati", location: "Guwahati, Assam", nirf: 7, established: 1994, campus: "/colleges/campus4.png", color: "#1565c0" },
    { name: "IIT Hyderabad", location: "Hyderabad, Telangana", nirf: 8, established: 2008, campus: "/colleges/campus3.png", color: "#6a1b9a" },
    { name: "IIT (BHU) Varanasi", location: "Varanasi, Uttar Pradesh", nirf: 10, established: 1919, campus: "/colleges/campus1.png", color: "#b71c1c" },
    { name: "IIT Indore", location: "Indore, Madhya Pradesh", nirf: 11, established: 2009, campus: "/colleges/campus2.png", color: "#0277bd" },
    { name: "IIT (ISM) Dhanbad", location: "Dhanbad, Jharkhand", nirf: 14, established: 1926, campus: "/colleges/campus4.png", color: "#33691e" },
    { name: "IIT Bhubaneswar", location: "Bhubaneswar, Odisha", nirf: 21, established: 2008, campus: "/colleges/campus3.png", color: "#ff6f00" },
    { name: "IIT Ropar", location: "Rupnagar, Punjab", nirf: 22, established: 2008, campus: "/colleges/campus1.png", color: "#ad1457" },
    { name: "IIT Gandhinagar", location: "Gandhinagar, Gujarat", nirf: 16, established: 2008, campus: "/colleges/campus2.png", color: "#f57f17" },
    { name: "IIT Patna", location: "Patna, Bihar", nirf: 25, established: 2008, campus: "/colleges/campus4.png", color: "#4527a0" },
    { name: "IIT Jodhpur", location: "Jodhpur, Rajasthan", nirf: 26, established: 2008, campus: "/colleges/campus3.png", color: "#c62828" },
    { name: "IIT Mandi", location: "Mandi, Himachal Pradesh", nirf: 24, established: 2009, campus: "/colleges/campus4.png", color: "#2e7d32" },
    { name: "IIT Tirupati", location: "Tirupati, Andhra Pradesh", nirf: 30, established: 2015, campus: "/colleges/campus1.png", color: "#00838f" },
    { name: "IIT Palakkad", location: "Palakkad, Kerala", nirf: 34, established: 2015, campus: "/colleges/campus2.png", color: "#558b2f" },
    { name: "IIT Bhilai", location: "Bhilai, Chhattisgarh", nirf: 46, established: 2016, campus: "/colleges/campus3.png", color: "#d84315" },
    { name: "IIT Dharwad", location: "Dharwad, Karnataka", nirf: 51, established: 2016, campus: "/colleges/campus4.png", color: "#283593" },
    { name: "IIT Jammu", location: "Jammu, J&K", nirf: 47, established: 2016, campus: "/colleges/campus1.png", color: "#01579b" },
    { name: "IIT Goa", location: "Ponda, Goa", nirf: 52, established: 2016, campus: "/colleges/campus2.png", color: "#00695c" }
];

const generateProfile = (college) => {
    let slug;
    if (college.name.includes('(BHU)')) {
        slug = 'iit-bhu-varanasi';
    } else if (college.name.includes('(ISM)')) {
        slug = 'iit-ism-dhanbad';
    } else {
        slug = college.name.toLowerCase().replace(/\s+/g, '-');
    }

    const city = college.location.split(',')[0].trim();
    const state = college.location.split(',')[1].trim();

    return `
    "${slug}": {
        name: "Indian Institute of Technology ${college.name.replace('IIT ', '')}",
        shortName: "${college.name}",
        slug: "${slug}",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: ${college.established},
        location: { city: "${city}", state: "${state}", country: "India" },
        campusSize: "${Math.floor(Math.random() * (600 - 300 + 1) + 300)} Acres",
        campus: "${college.campus}",
        color: "${college.color}",
        overview: "${college.name} is one of the premier engineering and research institutes in India. Established in ${college.established}, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "${college.name}, ${city}, ${state}, India",
            airport: { name: "${city} International Airport", distance: "${Math.floor(Math.random() * 20 + 5)} km" },
            railway: { name: "${city} Railway Station", distance: "${Math.floor(Math.random() * 10 + 2)} km" },
            bus: { name: "${city} Inter-State Bus Terminal", distance: "${Math.floor(Math.random() * 8 + 1)} km" }
        },
        rankings: { current: ${college.nirf}, history: [{ year: 2024, rank: ${college.nirf} }, { year: 2023, rank: ${college.nirf + Math.floor(Math.random() * 3 - 1)} }, { year: 2022, rank: ${college.nirf + Math.floor(Math.random() * 4 - 2)} }], category: "Engineering: Rank ${college.nirf}" },
        courses: [
            { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 Years" },
            { name: "Electrical Engineering", degree: "B.Tech", duration: "4 Years" },
            { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 Years" },
            { name: "Civil Engineering", degree: "B.Tech", duration: "4 Years" },
            { name: "Chemical Engineering", degree: "B.Tech", duration: "4 Years" }
        ],
        seatMatrix: [
            { course: "Computer Science & Engg.", total: 100, open: 40, obc: 27, sc: 15, st: 8, ews: 10, pwd: 5 },
            { course: "Electrical Engineering", total: 120, open: 48, obc: 32, sc: 18, st: 9, ews: 12, pwd: 6 },
            { course: "Mechanical Engineering", total: 120, open: 48, obc: 32, sc: 18, st: 9, ews: 12, pwd: 6 }
        ],
        cutoffs: [
            { course: "Computer Science & Engg.", y2024: ${college.nirf * 50 + 50}, y2023: ${college.nirf * 50 + 40}, y2022: ${college.nirf * 50 + 30} },
            { course: "Electrical Engineering", y2024: ${college.nirf * 150 + 100}, y2023: ${college.nirf * 150 + 80}, y2022: ${college.nirf * 150 + 70} },
            { course: "Mechanical Engineering", y2024: ${college.nirf * 250 + 200}, y2023: ${college.nirf * 250 + 180}, y2022: ${college.nirf * 250 + 150} }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.${Math.floor(Math.random() * 5 + 2)} Cr / year", average: "₹${Math.floor(Math.random() * 10 + 14)}.5 LPA", median: "₹${Math.floor(Math.random() * 8 + 12)}.0 LPA", percentage: "${Math.floor(Math.random() * 10 + 85)}%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    }`;
};

const fileContent = `// Common data shared across IITs
const commonFacilities = [
    "Central Library", "Boys & Girls Hostels", "Sports Complex", "Advanced Laboratories",
    "Wi-Fi Enabled Campus", "Medical Center / Hospital", "Cafeteria & Mess",
    "Auditoriums & Seminar Halls", "Research Centers", "Innovation & Incubation Labs",
    "Swimming Pool", "Gymnasium", "ATM & Banking", "Student Activity Center"
];

const commonEligibility = {
    qualification: "Passed 12th (or equivalent) with Physics, Chemistry, and Mathematics",
    exam: "JEE Advanced (Qualified)",
    minMarks: "75% in 12th Board (65% for SC/ST/PwD) OR Top 20 percentile in respective board",
    reservation: "SC: 15% | ST: 7.5% | OBC-NCL: 27% | EWS: 10% | PwD: 5% (horizontal)"
};

const commonAdmission = [
    "Qualify JEE Main (for JEE Advanced eligibility)",
    "Clear JEE Advanced exam",
    "Participate in JoSAA Counselling",
    "Fill choices and get allotted seat based on rank & preference"
];

const commonScholarships = [
    { name: "SC / ST Fee Waiver", detail: "Complete tuition fee waiver + ₹1,000/month pocket money" },
    { name: "PwD Fee Waiver", detail: "Complete tuition fee waiver" },
    { name: "EWS (< ₹1 Lakh)", detail: "Full fee waiver for family income below ₹1 Lakh" },
    { name: "EWS (₹1–5 Lakh)", detail: "2/3rd tuition fee waiver" },
    { name: "Merit-cum-Means", detail: "Free messing for top performers with financial need" },
    { name: "Institute Merit Scholarship", detail: "Based on CGPA performance each semester" }
];

// IIT Profiles
const iitProfiles = {
${iitColleges.map(generateProfile).join(',\n')}
};

export { commonFacilities, commonEligibility, commonAdmission, commonScholarships };
export default iitProfiles;
`;

fs.writeFileSync(path.join(__dirname, 'frontend/src/data/iit_profiles.js'), fileContent);
console.log('Successfully generated iit_profiles.js with 23 institutes!');
