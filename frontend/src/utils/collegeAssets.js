/**
 * Utility for generating college asset paths and handling fallbacks.
 */
import assetMap from './collegeAssetMap.json';

// Converts a college name or key into the standardized slug
export const getCollegeSlug = (identifier) => {
    if (!identifier) return '';
    let slug = identifier.toLowerCase().trim();
    
    // Normalize special cases like IIT (BHU)
    slug = slug.replace(/\(bhu\)/g, 'bhu');
    slug = slug.replace(/\(ism\)/g, 'ism');
    
    // Remove brackets characters entirely
    slug = slug.replace(/[()]/g, '');
    
    // Replace non-alphanumeric chars with underscore
    slug = slug.replace(/[^a-z0-9]+/g, '_');
    
    // Clean up leading and trailing underscores
    slug = slug.replace(/^_+|_+$/g, '');
    
    return slug;
};

export const getCollegeAssetPaths = (identifier) => {
    const slug = getCollegeSlug(identifier);
    if (!slug) {
        return {
            image: '/colleges/campus1.png',
            logo: null
        };
    }
    
    const logoFile = assetMap.logo[slug] || `${slug}.jpg`;
    const campusFile = assetMap.campus[slug] || `${slug}.jpg`;
    
    return {
        logo: encodeURI(`/COLLEGES LOGO/${logoFile}`),
        image: encodeURI(`/COLLEGES IMAGE/${campusFile}`)
    };
};

export const handleCampusError = (e) => {
    if (import.meta.env.DEV) {
        console.warn(`[Asset Missing] Could not load campus image:`, e.target.src);
    }
    // Fallback to one of the default campus palettes
    const fallbacks = ['/colleges/campus1.png', '/colleges/campus2.png', '/colleges/campus3.png', '/colleges/campus4.png'];
    const currentSrc = e.target.src;
    
    // Prevent infinite loop if fallback also fails
    if (!fallbacks.some(f => currentSrc.includes(f))) {
        e.target.src = fallbacks[0];
    }
};

export const handleLogoError = (fallbackText, bgColor = '#0462C3') => (e) => {
    if (import.meta.env.DEV) {
        console.warn(`[Asset Missing] Could not load logo image:`, e.target.src);
    }
    const target = e.target;
    target.style.display = 'none';
    
    const parent = target.parentElement;
    if (parent) {
        parent.style.backgroundColor = bgColor;
        parent.style.color = '#fff';
        parent.style.fontSize = '11px';
        parent.style.fontWeight = '700';
        parent.style.letterSpacing = '0.05em';
        parent.style.display = 'flex';
        parent.style.alignItems = 'center';
        parent.style.justifyContent = 'center';
        parent.style.padding = '0';
        parent.textContent = fallbackText || 'LOGO';
    }
};
