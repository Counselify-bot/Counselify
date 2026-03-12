const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeCollegePravesh(page, url, collegeName) {
    try {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        // Wait for the main content to load
        await page.waitForSelector('.entry-content', { timeout: 10000 }).catch(() => console.log('Timeout waiting for .entry-content'));

        const profile = await page.evaluate((name) => {
            const data = { name };
            const content = document.querySelector('.entry-content');
            if (!content) return null;

            // Get Overview
            const firstPara = content.querySelector('p');
            if (firstPara) data.overview = firstPara.innerText.trim();

            // Extract sections based on headings
            const headings = Array.from(content.querySelectorAll('h2, h3'));
            
            for (let i = 0; i < headings.length; i++) {
                const heading = headings[i];
                const headerText = heading.innerText.toLowerCase();
                let nextEl = heading.nextElementSibling;
                let sectionContent = '';
                
                // Get all siblings until the next heading
                while (nextEl && nextEl.tagName !== 'H2' && nextEl.tagName !== 'H3') {
                    if (nextEl.tagName === 'TABLE') {
                        // Serialize table
                        const rows = Array.from(nextEl.querySelectorAll('tr'));
                        const tableData = rows.map(row => {
                            const cols = Array.from(row.querySelectorAll('th, td'));
                            return cols.map(col => col.innerText.trim());
                        });
                        sectionContent += JSON.stringify(tableData) + '\n';
                    } else if (nextEl.tagName === 'UL' || nextEl.tagName === 'OL') {
                        // Serialize list
                        const items = Array.from(nextEl.querySelectorAll('li'));
                        sectionContent += items.map(li => '- ' + li.innerText.trim()).join('\n') + '\n';
                    } else {
                        sectionContent += nextEl.innerText.trim() + '\n';
                    }
                    nextEl = nextEl.nextElementSibling;
                }

                if (headerText.includes('courses') || headerText.includes('academic programs')) data.courses_raw = sectionContent;
                if (headerText.includes('fees') || headerText.includes('fee structure')) data.fees_raw = sectionContent;
                if (headerText.includes('placement') || headerText.includes('packages')) data.placements_raw = sectionContent;
                if (headerText.includes('cutoff') || headerText.includes('closing rank')) data.cutoff_raw = sectionContent;
                if (headerText.includes('ranking')) data.rankings_raw = sectionContent;
                if (headerText.includes('connectivity') || headerText.includes('how to reach')) data.connectivity_raw = sectionContent;
                if (headerText.includes('facilities')) data.facilities_raw = sectionContent;
            }

            return data;
        }, collegeName);

        return profile;
    } catch (error) {
        console.error(`Error scraping ${collegeName}:`, error.message);
        return null;
    }
}

async function main() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const targets = [
        { name: 'IIT Bombay', url: 'https://www.collegepravesh.com/engineering-colleges/iit-bombay/' },
        { name: 'IIT Delhi', url: 'https://www.collegepravesh.com/engineering-colleges/iit-delhi/' },
        { name: 'IIT Madras', url: 'https://www.collegepravesh.com/engineering-colleges/iit-madras/' },
        { name: 'IIT Kanpur', url: 'https://www.collegepravesh.com/engineering-colleges/iit-kanpur/' },
        { name: 'IIT Kharagpur', url: 'https://www.collegepravesh.com/engineering-colleges/iit-kharagpur/' }
    ];

    const results = {};
    for (const target of targets) {
        const data = await scrapeCollegePravesh(page, target.url, target.name);
        if (data) results[target.name] = data;
        await new Promise(r => setTimeout(r, 3000)); // Pause between requests
    }

    fs.writeFileSync('iit_scraped_data.json', JSON.stringify(results, null, 2));
    console.log('Scraping complete. Results saved to iit_scraped_data.json');
    
    await browser.close();
}

main().catch(console.error);
