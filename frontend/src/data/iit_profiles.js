// Common data shared across IITs
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

    "iit-bombay": {
        name: "Indian Institute of Technology Bombay",
        shortName: "IIT Bombay",
        slug: "iit-bombay",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1958,
        location: { city: "Mumbai", state: "Maharashtra", country: "India" },
        campusSize: "582 Acres",
        campus: "/colleges/campus1.png",
        color: "#1a5276",
        overview: "IIT Bombay is one of the premier engineering and research institutes in India. Established in 1958, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Bombay, Mumbai, Maharashtra, India",
            airport: { name: "Mumbai International Airport", distance: "22 km" },
            railway: { name: "Mumbai Railway Station", distance: "6 km" },
            bus: { name: "Mumbai Inter-State Bus Terminal", distance: "3 km" }
        },
        rankings: { current: 3, history: [{ year: 2024, rank: 3 }, { year: 2023, rank: 4 }, { year: 2022, rank: 2 }], category: "Engineering: Rank 3" },
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
            { course: "Computer Science & Engg.", y2024: 200, y2023: 190, y2022: 180 },
            { course: "Electrical Engineering", y2024: 550, y2023: 530, y2022: 520 },
            { course: "Mechanical Engineering", y2024: 950, y2023: 930, y2022: 900 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.5 Cr / year", average: "₹15.5 LPA", median: "₹12.0 LPA", percentage: "92%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-delhi": {
        name: "Indian Institute of Technology Delhi",
        shortName: "IIT Delhi",
        slug: "iit-delhi",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1961,
        location: { city: "New Delhi", state: "Delhi", country: "India" },
        campusSize: "574 Acres",
        campus: "/colleges/campus2.png",
        color: "#0d47a1",
        overview: "IIT Delhi is one of the premier engineering and research institutes in India. Established in 1961, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Delhi, New Delhi, Delhi, India",
            airport: { name: "New Delhi International Airport", distance: "22 km" },
            railway: { name: "New Delhi Railway Station", distance: "3 km" },
            bus: { name: "New Delhi Inter-State Bus Terminal", distance: "8 km" }
        },
        rankings: { current: 2, history: [{ year: 2024, rank: 2 }, { year: 2023, rank: 3 }, { year: 2022, rank: 2 }], category: "Engineering: Rank 2" },
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
            { course: "Computer Science & Engg.", y2024: 150, y2023: 140, y2022: 130 },
            { course: "Electrical Engineering", y2024: 400, y2023: 380, y2022: 370 },
            { course: "Mechanical Engineering", y2024: 700, y2023: 680, y2022: 650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.5 Cr / year", average: "₹15.5 LPA", median: "₹19.0 LPA", percentage: "90%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-madras": {
        name: "Indian Institute of Technology Madras",
        shortName: "IIT Madras",
        slug: "iit-madras",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1959,
        location: { city: "Chennai", state: "Tamil Nadu", country: "India" },
        campusSize: "375 Acres",
        campus: "/colleges/campus3.png",
        color: "#880e4f",
        overview: "IIT Madras is one of the premier engineering and research institutes in India. Established in 1959, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Madras, Chennai, Tamil Nadu, India",
            airport: { name: "Chennai International Airport", distance: "24 km" },
            railway: { name: "Chennai Railway Station", distance: "6 km" },
            bus: { name: "Chennai Inter-State Bus Terminal", distance: "5 km" }
        },
        rankings: { current: 1, history: [{ year: 2024, rank: 1 }, { year: 2023, rank: 1 }, { year: 2022, rank: 1 }], category: "Engineering: Rank 1" },
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
            { course: "Computer Science & Engg.", y2024: 100, y2023: 90, y2022: 80 },
            { course: "Electrical Engineering", y2024: 250, y2023: 230, y2022: 220 },
            { course: "Mechanical Engineering", y2024: 450, y2023: 430, y2022: 400 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹18.5 LPA", median: "₹15.0 LPA", percentage: "87%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-kanpur": {
        name: "Indian Institute of Technology Kanpur",
        shortName: "IIT Kanpur",
        slug: "iit-kanpur",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1959,
        location: { city: "Kanpur", state: "Uttar Pradesh", country: "India" },
        campusSize: "309 Acres",
        campus: "/colleges/campus4.png",
        color: "#e65100",
        overview: "IIT Kanpur is one of the premier engineering and research institutes in India. Established in 1959, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Kanpur, Kanpur, Uttar Pradesh, India",
            airport: { name: "Kanpur International Airport", distance: "13 km" },
            railway: { name: "Kanpur Railway Station", distance: "6 km" },
            bus: { name: "Kanpur Inter-State Bus Terminal", distance: "8 km" }
        },
        rankings: { current: 4, history: [{ year: 2024, rank: 4 }, { year: 2023, rank: 5 }, { year: 2022, rank: 3 }], category: "Engineering: Rank 4" },
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
            { course: "Computer Science & Engg.", y2024: 250, y2023: 240, y2022: 230 },
            { course: "Electrical Engineering", y2024: 700, y2023: 680, y2022: 670 },
            { course: "Mechanical Engineering", y2024: 1200, y2023: 1180, y2022: 1150 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹17.5 LPA", median: "₹18.0 LPA", percentage: "89%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-kharagpur": {
        name: "Indian Institute of Technology Kharagpur",
        shortName: "IIT Kharagpur",
        slug: "iit-kharagpur",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1951,
        location: { city: "Kharagpur", state: "West Bengal", country: "India" },
        campusSize: "454 Acres",
        campus: "/colleges/campus1.png",
        color: "#1b5e20",
        overview: "IIT Kharagpur is one of the premier engineering and research institutes in India. Established in 1951, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Kharagpur, Kharagpur, West Bengal, India",
            airport: { name: "Kharagpur International Airport", distance: "17 km" },
            railway: { name: "Kharagpur Railway Station", distance: "8 km" },
            bus: { name: "Kharagpur Inter-State Bus Terminal", distance: "7 km" }
        },
        rankings: { current: 5, history: [{ year: 2024, rank: 5 }, { year: 2023, rank: 5 }, { year: 2022, rank: 4 }], category: "Engineering: Rank 5" },
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
            { course: "Computer Science & Engg.", y2024: 300, y2023: 290, y2022: 280 },
            { course: "Electrical Engineering", y2024: 850, y2023: 830, y2022: 820 },
            { course: "Mechanical Engineering", y2024: 1450, y2023: 1430, y2022: 1400 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.5 Cr / year", average: "₹21.5 LPA", median: "₹15.0 LPA", percentage: "86%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-roorkee": {
        name: "Indian Institute of Technology Roorkee",
        shortName: "IIT Roorkee",
        slug: "iit-roorkee",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1847,
        location: { city: "Roorkee", state: "Uttarakhand", country: "India" },
        campusSize: "582 Acres",
        campus: "/colleges/campus2.png",
        color: "#004d40",
        overview: "IIT Roorkee is one of the premier engineering and research institutes in India. Established in 1847, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Roorkee, Roorkee, Uttarakhand, India",
            airport: { name: "Roorkee International Airport", distance: "10 km" },
            railway: { name: "Roorkee Railway Station", distance: "4 km" },
            bus: { name: "Roorkee Inter-State Bus Terminal", distance: "2 km" }
        },
        rankings: { current: 6, history: [{ year: 2024, rank: 6 }, { year: 2023, rank: 5 }, { year: 2022, rank: 6 }], category: "Engineering: Rank 6" },
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
            { course: "Computer Science & Engg.", y2024: 350, y2023: 340, y2022: 330 },
            { course: "Electrical Engineering", y2024: 1000, y2023: 980, y2022: 970 },
            { course: "Mechanical Engineering", y2024: 1700, y2023: 1680, y2022: 1650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.5 Cr / year", average: "₹21.5 LPA", median: "₹13.0 LPA", percentage: "93%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-guwahati": {
        name: "Indian Institute of Technology Guwahati",
        shortName: "IIT Guwahati",
        slug: "iit-guwahati",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1994,
        location: { city: "Guwahati", state: "Assam", country: "India" },
        campusSize: "468 Acres",
        campus: "/colleges/campus4.png",
        color: "#1565c0",
        overview: "IIT Guwahati is one of the premier engineering and research institutes in India. Established in 1994, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Guwahati, Guwahati, Assam, India",
            airport: { name: "Guwahati International Airport", distance: "10 km" },
            railway: { name: "Guwahati Railway Station", distance: "3 km" },
            bus: { name: "Guwahati Inter-State Bus Terminal", distance: "5 km" }
        },
        rankings: { current: 7, history: [{ year: 2024, rank: 7 }, { year: 2023, rank: 7 }, { year: 2022, rank: 5 }], category: "Engineering: Rank 7" },
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
            { course: "Computer Science & Engg.", y2024: 400, y2023: 390, y2022: 380 },
            { course: "Electrical Engineering", y2024: 1150, y2023: 1130, y2022: 1120 },
            { course: "Mechanical Engineering", y2024: 1950, y2023: 1930, y2022: 1900 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.5 Cr / year", average: "₹20.5 LPA", median: "₹19.0 LPA", percentage: "86%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-hyderabad": {
        name: "Indian Institute of Technology Hyderabad",
        shortName: "IIT Hyderabad",
        slug: "iit-hyderabad",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2008,
        location: { city: "Hyderabad", state: "Telangana", country: "India" },
        campusSize: "530 Acres",
        campus: "/colleges/campus3.png",
        color: "#6a1b9a",
        overview: "IIT Hyderabad is one of the premier engineering and research institutes in India. Established in 2008, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Hyderabad, Hyderabad, Telangana, India",
            airport: { name: "Hyderabad International Airport", distance: "13 km" },
            railway: { name: "Hyderabad Railway Station", distance: "9 km" },
            bus: { name: "Hyderabad Inter-State Bus Terminal", distance: "7 km" }
        },
        rankings: { current: 8, history: [{ year: 2024, rank: 8 }, { year: 2023, rank: 7 }, { year: 2022, rank: 9 }], category: "Engineering: Rank 8" },
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
            { course: "Computer Science & Engg.", y2024: 450, y2023: 440, y2022: 430 },
            { course: "Electrical Engineering", y2024: 1300, y2023: 1280, y2022: 1270 },
            { course: "Mechanical Engineering", y2024: 2200, y2023: 2180, y2022: 2150 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.4 Cr / year", average: "₹22.5 LPA", median: "₹14.0 LPA", percentage: "88%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-bhu-varanasi": {
        name: "Indian Institute of Technology (BHU) Varanasi",
        shortName: "IIT (BHU) Varanasi",
        slug: "iit-bhu-varanasi",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1919,
        location: { city: "Varanasi", state: "Uttar Pradesh", country: "India" },
        campusSize: "391 Acres",
        campus: "/colleges/campus1.png",
        color: "#b71c1c",
        overview: "IIT (BHU) Varanasi is one of the premier engineering and research institutes in India. Established in 1919, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT (BHU) Varanasi, Varanasi, Uttar Pradesh, India",
            airport: { name: "Varanasi International Airport", distance: "12 km" },
            railway: { name: "Varanasi Railway Station", distance: "9 km" },
            bus: { name: "Varanasi Inter-State Bus Terminal", distance: "6 km" }
        },
        rankings: { current: 10, history: [{ year: 2024, rank: 10 }, { year: 2023, rank: 10 }, { year: 2022, rank: 8 }], category: "Engineering: Rank 10" },
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
            { course: "Computer Science & Engg.", y2024: 550, y2023: 540, y2022: 530 },
            { course: "Electrical Engineering", y2024: 1600, y2023: 1580, y2022: 1570 },
            { course: "Mechanical Engineering", y2024: 2700, y2023: 2680, y2022: 2650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.6 Cr / year", average: "₹18.5 LPA", median: "₹15.0 LPA", percentage: "88%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-indore": {
        name: "Indian Institute of Technology Indore",
        shortName: "IIT Indore",
        slug: "iit-indore",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2009,
        location: { city: "Indore", state: "Madhya Pradesh", country: "India" },
        campusSize: "393 Acres",
        campus: "/colleges/campus2.png",
        color: "#0277bd",
        overview: "IIT Indore is one of the premier engineering and research institutes in India. Established in 2009, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Indore, Indore, Madhya Pradesh, India",
            airport: { name: "Indore International Airport", distance: "21 km" },
            railway: { name: "Indore Railway Station", distance: "10 km" },
            bus: { name: "Indore Inter-State Bus Terminal", distance: "2 km" }
        },
        rankings: { current: 11, history: [{ year: 2024, rank: 11 }, { year: 2023, rank: 12 }, { year: 2022, rank: 11 }], category: "Engineering: Rank 11" },
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
            { course: "Computer Science & Engg.", y2024: 600, y2023: 590, y2022: 580 },
            { course: "Electrical Engineering", y2024: 1750, y2023: 1730, y2022: 1720 },
            { course: "Mechanical Engineering", y2024: 2950, y2023: 2930, y2022: 2900 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.6 Cr / year", average: "₹14.5 LPA", median: "₹13.0 LPA", percentage: "89%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-ism-dhanbad": {
        name: "Indian Institute of Technology (ISM) Dhanbad",
        shortName: "IIT (ISM) Dhanbad",
        slug: "iit-ism-dhanbad",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 1926,
        location: { city: "Dhanbad", state: "Jharkhand", country: "India" },
        campusSize: "446 Acres",
        campus: "/colleges/campus4.png",
        color: "#33691e",
        overview: "IIT (ISM) Dhanbad is one of the premier engineering and research institutes in India. Established in 1926, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT (ISM) Dhanbad, Dhanbad, Jharkhand, India",
            airport: { name: "Dhanbad International Airport", distance: "12 km" },
            railway: { name: "Dhanbad Railway Station", distance: "10 km" },
            bus: { name: "Dhanbad Inter-State Bus Terminal", distance: "2 km" }
        },
        rankings: { current: 14, history: [{ year: 2024, rank: 14 }, { year: 2023, rank: 15 }, { year: 2022, rank: 12 }], category: "Engineering: Rank 14" },
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
            { course: "Computer Science & Engg.", y2024: 750, y2023: 740, y2022: 730 },
            { course: "Electrical Engineering", y2024: 2200, y2023: 2180, y2022: 2170 },
            { course: "Mechanical Engineering", y2024: 3700, y2023: 3680, y2022: 3650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹14.5 LPA", median: "₹16.0 LPA", percentage: "93%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-bhubaneswar": {
        name: "Indian Institute of Technology Bhubaneswar",
        shortName: "IIT Bhubaneswar",
        slug: "iit-bhubaneswar",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2008,
        location: { city: "Bhubaneswar", state: "Odisha", country: "India" },
        campusSize: "581 Acres",
        campus: "/colleges/campus3.png",
        color: "#ff6f00",
        overview: "IIT Bhubaneswar is one of the premier engineering and research institutes in India. Established in 2008, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Bhubaneswar, Bhubaneswar, Odisha, India",
            airport: { name: "Bhubaneswar International Airport", distance: "8 km" },
            railway: { name: "Bhubaneswar Railway Station", distance: "9 km" },
            bus: { name: "Bhubaneswar Inter-State Bus Terminal", distance: "8 km" }
        },
        rankings: { current: 21, history: [{ year: 2024, rank: 21 }, { year: 2023, rank: 22 }, { year: 2022, rank: 19 }], category: "Engineering: Rank 21" },
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
            { course: "Computer Science & Engg.", y2024: 1100, y2023: 1090, y2022: 1080 },
            { course: "Electrical Engineering", y2024: 3250, y2023: 3230, y2022: 3220 },
            { course: "Mechanical Engineering", y2024: 5450, y2023: 5430, y2022: 5400 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.3 Cr / year", average: "₹23.5 LPA", median: "₹14.0 LPA", percentage: "94%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-ropar": {
        name: "Indian Institute of Technology Ropar",
        shortName: "IIT Ropar",
        slug: "iit-ropar",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2008,
        location: { city: "Rupnagar", state: "Punjab", country: "India" },
        campusSize: "371 Acres",
        campus: "/colleges/campus1.png",
        color: "#ad1457",
        overview: "IIT Ropar is one of the premier engineering and research institutes in India. Established in 2008, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Ropar, Rupnagar, Punjab, India",
            airport: { name: "Rupnagar International Airport", distance: "23 km" },
            railway: { name: "Rupnagar Railway Station", distance: "7 km" },
            bus: { name: "Rupnagar Inter-State Bus Terminal", distance: "8 km" }
        },
        rankings: { current: 22, history: [{ year: 2024, rank: 22 }, { year: 2023, rank: 21 }, { year: 2022, rank: 23 }], category: "Engineering: Rank 22" },
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
            { course: "Computer Science & Engg.", y2024: 1150, y2023: 1140, y2022: 1130 },
            { course: "Electrical Engineering", y2024: 3400, y2023: 3380, y2022: 3370 },
            { course: "Mechanical Engineering", y2024: 5700, y2023: 5680, y2022: 5650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.5 Cr / year", average: "₹21.5 LPA", median: "₹13.0 LPA", percentage: "94%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-gandhinagar": {
        name: "Indian Institute of Technology Gandhinagar",
        shortName: "IIT Gandhinagar",
        slug: "iit-gandhinagar",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2008,
        location: { city: "Gandhinagar", state: "Gujarat", country: "India" },
        campusSize: "364 Acres",
        campus: "/colleges/campus2.png",
        color: "#f57f17",
        overview: "IIT Gandhinagar is one of the premier engineering and research institutes in India. Established in 2008, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Gandhinagar, Gandhinagar, Gujarat, India",
            airport: { name: "Gandhinagar International Airport", distance: "9 km" },
            railway: { name: "Gandhinagar Railway Station", distance: "3 km" },
            bus: { name: "Gandhinagar Inter-State Bus Terminal", distance: "6 km" }
        },
        rankings: { current: 16, history: [{ year: 2024, rank: 16 }, { year: 2023, rank: 16 }, { year: 2022, rank: 14 }], category: "Engineering: Rank 16" },
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
            { course: "Computer Science & Engg.", y2024: 850, y2023: 840, y2022: 830 },
            { course: "Electrical Engineering", y2024: 2500, y2023: 2480, y2022: 2470 },
            { course: "Mechanical Engineering", y2024: 4200, y2023: 4180, y2022: 4150 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹14.5 LPA", median: "₹16.0 LPA", percentage: "93%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-patna": {
        name: "Indian Institute of Technology Patna",
        shortName: "IIT Patna",
        slug: "iit-patna",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2008,
        location: { city: "Patna", state: "Bihar", country: "India" },
        campusSize: "417 Acres",
        campus: "/colleges/campus4.png",
        color: "#4527a0",
        overview: "IIT Patna is one of the premier engineering and research institutes in India. Established in 2008, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Patna, Patna, Bihar, India",
            airport: { name: "Patna International Airport", distance: "11 km" },
            railway: { name: "Patna Railway Station", distance: "4 km" },
            bus: { name: "Patna Inter-State Bus Terminal", distance: "5 km" }
        },
        rankings: { current: 25, history: [{ year: 2024, rank: 25 }, { year: 2023, rank: 25 }, { year: 2022, rank: 23 }], category: "Engineering: Rank 25" },
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
            { course: "Computer Science & Engg.", y2024: 1300, y2023: 1290, y2022: 1280 },
            { course: "Electrical Engineering", y2024: 3850, y2023: 3830, y2022: 3820 },
            { course: "Mechanical Engineering", y2024: 6450, y2023: 6430, y2022: 6400 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹17.5 LPA", median: "₹12.0 LPA", percentage: "92%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-jodhpur": {
        name: "Indian Institute of Technology Jodhpur",
        shortName: "IIT Jodhpur",
        slug: "iit-jodhpur",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2008,
        location: { city: "Jodhpur", state: "Rajasthan", country: "India" },
        campusSize: "434 Acres",
        campus: "/colleges/campus3.png",
        color: "#c62828",
        overview: "IIT Jodhpur is one of the premier engineering and research institutes in India. Established in 2008, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Jodhpur, Jodhpur, Rajasthan, India",
            airport: { name: "Jodhpur International Airport", distance: "5 km" },
            railway: { name: "Jodhpur Railway Station", distance: "7 km" },
            bus: { name: "Jodhpur Inter-State Bus Terminal", distance: "7 km" }
        },
        rankings: { current: 26, history: [{ year: 2024, rank: 26 }, { year: 2023, rank: 25 }, { year: 2022, rank: 27 }], category: "Engineering: Rank 26" },
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
            { course: "Computer Science & Engg.", y2024: 1350, y2023: 1340, y2022: 1330 },
            { course: "Electrical Engineering", y2024: 4000, y2023: 3980, y2022: 3970 },
            { course: "Mechanical Engineering", y2024: 6700, y2023: 6680, y2022: 6650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.6 Cr / year", average: "₹20.5 LPA", median: "₹19.0 LPA", percentage: "91%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-mandi": {
        name: "Indian Institute of Technology Mandi",
        shortName: "IIT Mandi",
        slug: "iit-mandi",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2009,
        location: { city: "Mandi", state: "Himachal Pradesh", country: "India" },
        campusSize: "348 Acres",
        campus: "/colleges/campus4.png",
        color: "#2e7d32",
        overview: "IIT Mandi is one of the premier engineering and research institutes in India. Established in 2009, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Mandi, Mandi, Himachal Pradesh, India",
            airport: { name: "Mandi International Airport", distance: "18 km" },
            railway: { name: "Mandi Railway Station", distance: "4 km" },
            bus: { name: "Mandi Inter-State Bus Terminal", distance: "4 km" }
        },
        rankings: { current: 24, history: [{ year: 2024, rank: 24 }, { year: 2023, rank: 23 }, { year: 2022, rank: 22 }], category: "Engineering: Rank 24" },
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
            { course: "Computer Science & Engg.", y2024: 1250, y2023: 1240, y2022: 1230 },
            { course: "Electrical Engineering", y2024: 3700, y2023: 3680, y2022: 3670 },
            { course: "Mechanical Engineering", y2024: 6200, y2023: 6180, y2022: 6150 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹23.5 LPA", median: "₹18.0 LPA", percentage: "89%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-tirupati": {
        name: "Indian Institute of Technology Tirupati",
        shortName: "IIT Tirupati",
        slug: "iit-tirupati",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2015,
        location: { city: "Tirupati", state: "Andhra Pradesh", country: "India" },
        campusSize: "476 Acres",
        campus: "/colleges/campus1.png",
        color: "#00838f",
        overview: "IIT Tirupati is one of the premier engineering and research institutes in India. Established in 2015, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Tirupati, Tirupati, Andhra Pradesh, India",
            airport: { name: "Tirupati International Airport", distance: "9 km" },
            railway: { name: "Tirupati Railway Station", distance: "7 km" },
            bus: { name: "Tirupati Inter-State Bus Terminal", distance: "6 km" }
        },
        rankings: { current: 30, history: [{ year: 2024, rank: 30 }, { year: 2023, rank: 31 }, { year: 2022, rank: 28 }], category: "Engineering: Rank 30" },
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
            { course: "Computer Science & Engg.", y2024: 1550, y2023: 1540, y2022: 1530 },
            { course: "Electrical Engineering", y2024: 4600, y2023: 4580, y2022: 4570 },
            { course: "Mechanical Engineering", y2024: 7700, y2023: 7680, y2022: 7650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.6 Cr / year", average: "₹22.5 LPA", median: "₹15.0 LPA", percentage: "93%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-palakkad": {
        name: "Indian Institute of Technology Palakkad",
        shortName: "IIT Palakkad",
        slug: "iit-palakkad",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2015,
        location: { city: "Palakkad", state: "Kerala", country: "India" },
        campusSize: "305 Acres",
        campus: "/colleges/campus2.png",
        color: "#558b2f",
        overview: "IIT Palakkad is one of the premier engineering and research institutes in India. Established in 2015, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Palakkad, Palakkad, Kerala, India",
            airport: { name: "Palakkad International Airport", distance: "22 km" },
            railway: { name: "Palakkad Railway Station", distance: "8 km" },
            bus: { name: "Palakkad Inter-State Bus Terminal", distance: "4 km" }
        },
        rankings: { current: 34, history: [{ year: 2024, rank: 34 }, { year: 2023, rank: 33 }, { year: 2022, rank: 33 }], category: "Engineering: Rank 34" },
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
            { course: "Computer Science & Engg.", y2024: 1750, y2023: 1740, y2022: 1730 },
            { course: "Electrical Engineering", y2024: 5200, y2023: 5180, y2022: 5170 },
            { course: "Mechanical Engineering", y2024: 8700, y2023: 8680, y2022: 8650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹16.5 LPA", median: "₹15.0 LPA", percentage: "92%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-bhilai": {
        name: "Indian Institute of Technology Bhilai",
        shortName: "IIT Bhilai",
        slug: "iit-bhilai",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2016,
        location: { city: "Bhilai", state: "Chhattisgarh", country: "India" },
        campusSize: "305 Acres",
        campus: "/colleges/campus3.png",
        color: "#d84315",
        overview: "IIT Bhilai is one of the premier engineering and research institutes in India. Established in 2016, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Bhilai, Bhilai, Chhattisgarh, India",
            airport: { name: "Bhilai International Airport", distance: "22 km" },
            railway: { name: "Bhilai Railway Station", distance: "5 km" },
            bus: { name: "Bhilai Inter-State Bus Terminal", distance: "6 km" }
        },
        rankings: { current: 46, history: [{ year: 2024, rank: 46 }, { year: 2023, rank: 46 }, { year: 2022, rank: 46 }], category: "Engineering: Rank 46" },
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
            { course: "Computer Science & Engg.", y2024: 2350, y2023: 2340, y2022: 2330 },
            { course: "Electrical Engineering", y2024: 7000, y2023: 6980, y2022: 6970 },
            { course: "Mechanical Engineering", y2024: 11700, y2023: 11680, y2022: 11650 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹23.5 LPA", median: "₹19.0 LPA", percentage: "88%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-dharwad": {
        name: "Indian Institute of Technology Dharwad",
        shortName: "IIT Dharwad",
        slug: "iit-dharwad",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2016,
        location: { city: "Dharwad", state: "Karnataka", country: "India" },
        campusSize: "429 Acres",
        campus: "/colleges/campus4.png",
        color: "#283593",
        overview: "IIT Dharwad is one of the premier engineering and research institutes in India. Established in 2016, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Dharwad, Dharwad, Karnataka, India",
            airport: { name: "Dharwad International Airport", distance: "10 km" },
            railway: { name: "Dharwad Railway Station", distance: "10 km" },
            bus: { name: "Dharwad Inter-State Bus Terminal", distance: "3 km" }
        },
        rankings: { current: 51, history: [{ year: 2024, rank: 51 }, { year: 2023, rank: 52 }, { year: 2022, rank: 49 }], category: "Engineering: Rank 51" },
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
            { course: "Computer Science & Engg.", y2024: 2600, y2023: 2590, y2022: 2580 },
            { course: "Electrical Engineering", y2024: 7750, y2023: 7730, y2022: 7720 },
            { course: "Mechanical Engineering", y2024: 12950, y2023: 12930, y2022: 12900 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.3 Cr / year", average: "₹23.5 LPA", median: "₹16.0 LPA", percentage: "92%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-jammu": {
        name: "Indian Institute of Technology Jammu",
        shortName: "IIT Jammu",
        slug: "iit-jammu",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2016,
        location: { city: "Jammu", state: "J&K", country: "India" },
        campusSize: "396 Acres",
        campus: "/colleges/campus1.png",
        color: "#01579b",
        overview: "IIT Jammu is one of the premier engineering and research institutes in India. Established in 2016, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Jammu, Jammu, J&K, India",
            airport: { name: "Jammu International Airport", distance: "7 km" },
            railway: { name: "Jammu Railway Station", distance: "4 km" },
            bus: { name: "Jammu Inter-State Bus Terminal", distance: "7 km" }
        },
        rankings: { current: 47, history: [{ year: 2024, rank: 47 }, { year: 2023, rank: 46 }, { year: 2022, rank: 45 }], category: "Engineering: Rank 47" },
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
            { course: "Computer Science & Engg.", y2024: 2400, y2023: 2390, y2022: 2380 },
            { course: "Electrical Engineering", y2024: 7150, y2023: 7130, y2022: 7120 },
            { course: "Mechanical Engineering", y2024: 11950, y2023: 11930, y2022: 11900 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.4 Cr / year", average: "₹14.5 LPA", median: "₹17.0 LPA", percentage: "85%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    },

    "iit-goa": {
        name: "Indian Institute of Technology Goa",
        shortName: "IIT Goa",
        slug: "iit-goa",
        tagline: "Excellence in Engineering and Innovation",
        type: "IIT",
        established: 2016,
        location: { city: "Ponda", state: "Goa", country: "India" },
        campusSize: "356 Acres",
        campus: "/colleges/campus2.png",
        color: "#00695c",
        overview: "IIT Goa is one of the premier engineering and research institutes in India. Established in 2016, it has been consistently ranked among the top engineering colleges due to its rigorous academic curriculum, state-of-the-art facilities, and strong industry partnerships. The institute offers a vibrant campus life and produces graduates who go on to lead major technology organizations globally.",
        address: {
            full: "IIT Goa, Ponda, Goa, India",
            airport: { name: "Ponda International Airport", distance: "5 km" },
            railway: { name: "Ponda Railway Station", distance: "6 km" },
            bus: { name: "Ponda Inter-State Bus Terminal", distance: "4 km" }
        },
        rankings: { current: 52, history: [{ year: 2024, rank: 52 }, { year: 2023, rank: 52 }, { year: 2022, rank: 51 }], category: "Engineering: Rank 52" },
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
            { course: "Computer Science & Engg.", y2024: 2650, y2023: 2640, y2022: 2630 },
            { course: "Electrical Engineering", y2024: 7900, y2023: 7880, y2022: 7870 },
            { course: "Mechanical Engineering", y2024: 13200, y2023: 13180, y2022: 13150 }
        ],
        fees: { tuition: "₹1,00,000 / semester", hostel: "₹15,000 / semester", mess: "₹20,000 / semester", admission: "₹5,000 (one-time)", totalYearly: "~ ₹2,80,000 / year" },
        placements: { highest: "₹1.2 Cr / year", average: "₹18.5 LPA", median: "₹15.0 LPA", percentage: "90%" },
        recruiters: ["Google", "Microsoft", "Amazon", "Apple", "Adobe", "Qualcomm", "Intel", "Goldman Sachs"],
        whyChoose: [
            "Top-tier engineering institute with strong academic foundation",
            "Excellent campus placements in leading multinational companies",
            "Cutting-edge research facilities and laboratories",
            "Diverse student community and vibrant campus life",
            "Strong alumni network globally"
        ]
    }
};

export { commonFacilities, commonEligibility, commonAdmission, commonScholarships };
export default iitProfiles;
