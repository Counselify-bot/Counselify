import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../frontend/assets/csvjson.json');
const outputPath = path.join(__dirname, '../frontend/src/data/josaa_data.json');

const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const mapCategory = (rawCategory) => {
    // Current RankPredictor categories: 'General', 'OBC-NCL', 'SC', 'ST', 'EWS', 'General-PwD'
    const cat = rawCategory.trim();
    if (cat === 'OPEN') return 'General';
    if (cat === 'OPEN (PwD)') return 'General-PwD';
    if (cat === 'OBC-NCL') return 'OBC-NCL';
    if (cat === 'OBC-NCL (PwD)') return 'OBC-NCL-PwD';
    if (cat === 'SC') return 'SC';
    if (cat === 'SC (PwD)') return 'SC-PwD';
    if (cat === 'ST') return 'ST';
    if (cat === 'ST (PwD)') return 'ST-PwD';
    if (cat === 'EWS') return 'EWS';
    if (cat === 'EWS (PwD)') return 'EWS-PwD';
    return cat;
};

const mapGender = (rawGender) => {
    const g = rawGender.trim();
    if (g === 'Female-only (including Supernumerary)') return 'Female Only';
    if (g === 'Gender-Neutral') return 'Gender-Neutral';
    return g;
};

const determineInstituteType = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('indian institute of technology') || lowerName.includes('ism dhanbad') || lowerName.includes('iit ')) return 'IIT';
    if (lowerName.includes('national institute of technology') || lowerName.includes('nit ')) return 'NIT';
    if (lowerName.includes('indian institute of information technology') || lowerName.includes('iiit')) return 'IIIT';
    return 'GFTI';
};

const cleanedData = [];

for (const row of rawData) {
    const institute = row['Joint Seat Allocation Authority 2025']?.trim();
    const program = row['']?.trim();
    const quota = row['__1']?.trim();
    const seatType = row['__2']?.trim();
    const gender = row['__3']?.trim();
    let opening = row['__4'];
    let closing = row['__5'];
    
    // Skip empty lines or header rows
    if (!institute || !program || program === 'Academic Program Name' || program === 'Academic Program' || institute.includes('--Select--') || institute === 'Institute' || institute === 'Home' || institute === 'CSC Login' || institute === 'Opening and Closing Ranks') {
        continue;
    }

    if (typeof opening === 'string') opening = parseInt(opening.replace(/\\D/g, ''), 10);
    if (typeof closing === 'string') closing = parseInt(closing.replace(/\\D/g, ''), 10);
    
    if (isNaN(opening) || isNaN(closing)) continue;

    const mappedCat = mapCategory(seatType);
    const mappedGen = mapGender(gender);
    const instType = determineInstituteType(institute);

    cleanedData.push({
        college_name: institute,
        institute_type: instType,
        branch: program,
        category: mappedCat,
        gender: mappedGen,
        home_state: quota,
        opening_rank: opening,
        closing_rank: closing,
        year: 2024
    });
}

fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2));
console.log(`Cleaned data saved to ${outputPath}. Total records: ${cleanedData.length}`);
