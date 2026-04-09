import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('./frontend/src/data/college_profiles.json', 'utf-8'));

// Map scraped data key -> old profile slug
const mapping = {
    'iit_bombay': 'iit-bombay',
    'iit_delhi': 'iit-delhi'
};

function convertScrapedToProfile(scraped, existingProfile) {
    const inst = scraped.institute;
    const loc = inst.location.split(', ');

    // Parse fees
    const instFee = scraped.fees.institute_fee;
    const hostelFee = scraped.fees.hostel_fee;
    const tuitionPerSem = instFee.tuition_fee_per_semester;
    const hostelTotal = hostelFee.hostel_seat_rent_per_semester || 0;
    const messTotal = hostelFee.mess_advance_per_semester || 0;
    const otherInst = (instFee.other_fees_per_semester || 0);
    const otherHostel = (hostelFee.other_fees_per_semester || 0) +
                        (hostelFee.electricity_and_water_charges_per_semester || 0);
    const oneTimeInst = (instFee.one_time_fees || 0) + (instFee.caution_money_one_time_refundable || 0);
    const oneTimeHostel = (hostelFee.one_time_fees || 0) +
                          (hostelFee.hostel_caution_money_one_time_refundable || 0) +
                          (hostelFee.mess_caution_money_one_time_refundable || 0);
    const totalPerSem = tuitionPerSem + (instFee.other_fees_per_semester || 0) + 
                        hostelTotal + messTotal + otherHostel;

    // Parse placements
    const pl = scraped.placements_2024;
    const avgCTC = pl.average_ctc_overall_btech_lpa;
    const medCTC = pl.median_ctc_overall_btech_lpa;
    const maxCTC = pl.max_ctc_overall_btech_lpa;
    const placedPct = pl.overall_btech_placed_percent;

    // Find highest CTC from branch data if overall not available
    let highestCTC = maxCTC;
    if (!highestCTC && pl.max_ctc_lpa && Array.isArray(pl.max_ctc_lpa)) {
        highestCTC = Math.max(...pl.max_ctc_lpa.map(b => b.value));
    }
    if (!highestCTC && pl.chart_data && pl.chart_data.length > 0) {
        // Try to find from any available data
        highestCTC = null;
    }

    // Parse courses
    const courses = scraped.courses_offered.branches.map(branch => ({
        name: branch,
        degree: scraped.courses_offered.program === 'B.E./B.Tech.' ? 'B.Tech' : scraped.courses_offered.program,
        duration: `${scraped.courses_offered.duration_years} Years`
    }));

    // Parse rankings - find NIRF Engineering rank
    const nirfEng = scraped.rankings.national.find(r => r.category.includes('NIRF Engineering'));
    const nirfRankStr = nirfEng ? nirfEng.latest : null;
    const nirfRank = nirfRankStr ? parseInt(nirfRankStr.match(/\d+/)?.[0]) : existingProfile.rankings.current;
    
    // Build ranking history from NIRF Engineering
    const nirfEngPrev = nirfEng?.previous;
    const prevRank = nirfEngPrev ? parseInt(nirfEngPrev.match(/\d+/)?.[0]) : null;
    
    const history = [];
    if (nirfRankStr) {
        const year = parseInt(nirfRankStr.match(/\((\d+)\)/)?.[1]) || 2025;
        history.push({ year, rank: nirfRank });
    }
    if (nirfEngPrev && nirfEngPrev !== '--') {
        const year = parseInt(nirfEngPrev.match(/\((\d+)\)/)?.[1]) || 2024;
        history.push({ year, rank: prevRank });
    }
    // Add one more year from existing if we have it
    if (existingProfile.rankings.history.length > 2) {
        history.push(existingProfile.rankings.history[2]);
    } else if (history.length === 2) {
        history.push({ year: history[1].year - 1, rank: history[1].rank });
    }

    // Format currency
    const fmt = (val) => {
        if (!val) return 'N/A';
        if (val >= 100) return `₹${val.toFixed(2)} LPA`;
        return `₹${val} LPA`;
    };
    const fmtFee = (val) => {
        if (!val) return 'N/A';
        return `₹${val.toLocaleString('en-IN')} / semester`;
    };
    const fmtOneTime = (val) => {
        if (!val) return 'N/A';
        return `₹${val.toLocaleString('en-IN')} (one-time)`;
    };

    return {
        name: inst.name.replace(/, /g, ' '),
        shortName: inst.also_known_as_short ? `IIT ${loc[0]}` : existingProfile.shortName,
        slug: existingProfile.slug,
        tagline: existingProfile.tagline,
        type: 'IIT',
        established: inst.established,
        location: {
            city: loc[0] || existingProfile.location.city,
            state: loc[1] || existingProfile.location.state,
            country: 'India'
        },
        campusSize: existingProfile.campusSize,
        campus: existingProfile.campus,
        color: existingProfile.color,
        overview: existingProfile.overview,
        address: {
            full: inst.address,
            airport: {
                name: inst.nearest_airport.name,
                distance: `${inst.nearest_airport.distance_km} km`
            },
            railway: {
                name: inst.nearest_railway_station.name,
                distance: `${inst.nearest_railway_station.distance_km} km`
            },
            bus: existingProfile.address.bus
        },
        rankings: {
            current: nirfRank,
            history: history,
            category: `Engineering: Rank ${nirfRank}`
        },
        courses: courses,
        fees: {
            tuition: fmtFee(tuitionPerSem),
            hostel: fmtFee(hostelTotal + otherHostel),
            mess: fmtFee(messTotal),
            admission: fmtOneTime(oneTimeInst + oneTimeHostel),
            totalYearly: `~ ${fmtFee(totalPerSem)}`
        },
        placements: {
            highest: highestCTC ? fmt(highestCTC) : existingProfile.placements.highest,
            average: avgCTC ? fmt(avgCTC) : existingProfile.placements.average,
            median: medCTC ? fmt(medCTC) : existingProfile.placements.median,
            percentage: placedPct ? `${placedPct}%` : existingProfile.placements.percentage
        },
        recruiters: existingProfile.recruiters,
        whyChoose: existingProfile.whyChoose
    };
}

// Update IIT Bombay and IIT Delhi
for (const [scrapedKey, profileSlug] of Object.entries(mapping)) {
    const scraped = data[scrapedKey];
    const existing = data.profiles[profileSlug];
    
    if (!scraped || !existing) {
        console.log(`Skipping ${scrapedKey}: scraped=${!!scraped}, existing=${!!existing}`);
        continue;
    }
    
    const updated = convertScrapedToProfile(scraped, existing);
    data.profiles[profileSlug] = updated;
    console.log(`✅ Updated ${profileSlug}:`);
    console.log(`   Name: ${updated.name}`);
    console.log(`   Established: ${updated.established}`);
    console.log(`   NIRF Rank: ${updated.rankings.current}`);
    console.log(`   Courses: ${updated.courses.length} branches`);
    console.log(`   Fees: ${updated.fees.tuition}`);
    console.log(`   Placements: avg=${updated.placements.average}, highest=${updated.placements.highest}`);
    console.log(`   Address: ${updated.address.full}`);
    console.log(`   Airport: ${updated.address.airport.name} (${updated.address.airport.distance})`);
}

// Remove the top-level scraped data keys (keep only the original structure)
const cleanKeys = ['commonFacilities', 'commonEligibility', 'commonAdmission', 'commonScholarships', 'profiles'];
const cleanData = {};
for (const key of cleanKeys) {
    cleanData[key] = data[key];
}

writeFileSync('./frontend/src/data/college_profiles.json', JSON.stringify(cleanData, null, 4), 'utf-8');
console.log('\n✅ File saved. Scraped top-level keys removed, profiles updated.');
console.log(`Total profiles: ${Object.keys(cleanData.profiles).length}`);
