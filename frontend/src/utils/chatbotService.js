/**
 * Counselify AI Chatbot Service
 * Mock AI response layer with keyword-based pattern matching.
 * Ready to swap with real API (OpenAI / Gemini) by uncommenting the fetch block.
 */

const API_URL = import.meta.env.VITE_API_URL;

// ── Page context helpers ─────────────────────────────────────────────
function getPageContext(currentPage) {
  if (!currentPage) return '';
  const p = currentPage.toLowerCase();
  if (p.includes('/college-predictor/josaa')) return 'JoSAA College Predictor';
  if (p.includes('/college-predictor/csab')) return 'CSAB College Predictor';
  if (p.includes('/college-predictor/jac-delhi')) return 'JAC Delhi Predictor';
  if (p.includes('/college-predictor')) return 'College Predictor Selection';
  if (p.includes('/colleges/iit')) return 'IIT Colleges';
  if (p.includes('/colleges/nit')) return 'NIT Colleges';
  if (p.includes('/colleges/iiit')) return 'IIIT Colleges';
  if (p.includes('/services')) return 'Services';
  if (p.includes('/news')) return 'News & Updates';
  if (p.includes('/resources')) return 'Resources';
  if (p.includes('/percentile-to-rank')) return 'Percentile to Rank Converter';
  if (p.includes('/contact')) return 'Contact';
  if (p.includes('/advisor')) return 'Advisor';
  return '';
}

// ── Knowledge base responses ─────────────────────────────────────────
const responses = {
  josaa: {
    reply: `**JoSAA Counselling** mein yeh steps hote hain:\n\n1️⃣ **Registration** — JoSAA portal pe register karo\n2️⃣ **Choice Filling** — Apni preferred colleges & branches fill karo (order matters!)\n3️⃣ **Mock Allotment** — Ek trial round hota hai, isme changes kar sakte ho\n4️⃣ **Choice Locking** — Final list lock karo\n5️⃣ **Seat Allotment** — Rounds mein seats allot hoti hain\n6️⃣ **Reporting** — Allotted college mein report karo with documents\n\nKoi specific doubt hai JoSAA ke baare mein? 😊`,
    suggestedActions: [
      { label: 'Open JoSAA Predictor', route: '/college-predictor/josaa' },
      { label: 'Check Services', route: '/services' }
    ]
  },
  csab: {
    reply: `**CSAB Special Rounds** JoSAA ke baad hote hain, mainly NITs, IIITs aur GFTIs ke liye.\n\n🔹 Agar JoSAA mein seat nahi mili ya better option chahiye, toh CSAB mein participate karo\n🔹 Separate registration required hoti hai CSAB portal pe\n🔹 Usually 2 special rounds hote hain\n🔹 NIT+ system bhi include hota hai kuch seats ke liye\n\nApna rank batao toh main better guide kar sakta hoon! 💪`,
    suggestedActions: [
      { label: 'Open CSAB Predictor', route: '/college-predictor/csab' },
      { label: 'View NITs', route: '/colleges/nit' }
    ]
  },
  jac_delhi: {
    reply: `**JAC Delhi Counselling** specifically Delhi ke colleges ke liye hoti hai — like DTU, NSUT, IGDTUW, IIIT Delhi.\n\n🔹 JEE Main score ke basis pe hoti hai\n🔹 Delhi Home State quota ka major advantage milta hai\n🔹 Separate portal pe registration karni hoti hai\n🔹 Choice filling → Seat allotment → Reporting\n\nKya aap Delhi se ho? Home State quota se bahut farak padta hai! 🏠`,
    suggestedActions: [
      { label: 'Open JAC Delhi Predictor', route: '/college-predictor/jac-delhi' },
      { label: 'Check Services', route: '/services' }
    ]
  },
  freeze_float_slide: {
    reply: `**Freeze / Float / Slide** — yeh JoSAA seat acceptance options hain:\n\n❄️ **Freeze** — "Mujhe yahi seat chahiye, aur rounds mein participate nahi karunga"\n🔄 **Float** — "Yeh seat rakh lo, lekin agar higher preference mein better option mile toh upgrade karo"\n📈 **Slide** — "Same college mein better branch mile toh upgrade karo"\n\n💡 **Tip:** Agar aapko lagta hai better seat mil sakti hai, toh **Float** choose karo. Safe side pe rehna hai toh **Freeze**.\n\nKoi aur doubt? 😊`,
    suggestedActions: [
      { label: 'JoSAA Predictor', route: '/college-predictor/josaa' }
    ]
  },
  college_predict: {
    reply: `College prediction ke liye mujhe kuch details chahiye:\n\n1️⃣ **Counselling type?** — JoSAA / CSAB / JAC Delhi\n2️⃣ **Your rank?** (CRL / Category rank)\n3️⃣ **Category?** — General / OBC-NCL / SC / ST / EWS\n4️⃣ **Gender?**\n5️⃣ **Home State?**\n6️⃣ **Branch preference?** (CSE, ECE, Mechanical, etc.)\n\nYeh details do, main guide karunga! Ya phir directly predictor tool use karo 👇`,
    suggestedActions: [
      { label: 'JoSAA Predictor', route: '/college-predictor/josaa' },
      { label: 'CSAB Predictor', route: '/college-predictor/csab' },
      { label: 'JAC Delhi Predictor', route: '/college-predictor/jac-delhi' }
    ]
  },
  services: {
    reply: `Counselify pe kaafi useful **counselling plans** available hain:\n\n🥉 **Basic Plan** — Self-guided college predictor access\n🥈 **Standard Plan** — Predictor + expert choice filling guidance\n🥇 **Premium Plan** — Full mentorship, 1-on-1 advisor, choice filling support, allotment tracking\n\nHar plan ka pricing aur details Services page pe mil jaayega. Agar confuse ho toh advisor se baat karo — woh best plan suggest karenge! 🎯`,
    suggestedActions: [
      { label: 'View Services', route: '/services' },
      { label: 'Speak to Advisor', route: '/advisor' }
    ]
  },
  deadlines: {
    reply: `Deadlines ke liye **News section** check karo — wahan pe latest updates milte hain! 📅\n\n⚠️ **Important:** JoSAA, CSAB, aur JAC Delhi ki dates har saal change hoti hain, toh official website bhi verify karo.\n\nMain currently exact dates nahi de sakta, lekin latest updates ke liye 👇`,
    suggestedActions: [
      { label: 'Check News & Updates', route: '/news' },
      { label: 'View Resources', route: '/resources' }
    ]
  },
  documents: {
    reply: `**Counselling ke liye required documents:**\n\n📄 JEE Main / Advanced Scorecard\n📄 Class 10th & 12th Marksheet + Certificate\n📄 Category Certificate (if applicable)\n📄 Domicile / Home State Certificate\n📄 Aadhar Card\n📄 Passport size photos\n📄 Medical Fitness Certificate\n📄 Seat Acceptance Fee receipt\n📄 Character Certificate\n\n💡 **Tip:** Sab documents ka original + 2-3 photocopies le ke jaana reporting ke time! 📋`,
    suggestedActions: [
      { label: 'View Checklists', route: '/resources/checklists' }
    ]
  },
  seat_fee: {
    reply: `**Seat Acceptance Fee** ek refundable amount hota hai jo seat confirm karne ke liye dena padta hai.\n\n🔹 General/OBC: Usually ₹35,000 - ₹45,000\n🔹 SC/ST/PwD: Usually ₹15,000 - ₹20,000\n\n⚠️ Yeh fee har round ke allotment ke baad ek deadline ke andar pay karni hoti hai, warna seat cancel ho jaati hai.\n\n💡 Float/Slide karne pe bhi fee pay karni hoti hai!`,
    suggestedActions: [
      { label: 'JoSAA Help', route: '/college-predictor/josaa' }
    ]
  },
  quota: {
    reply: `**Home State vs Other State Quota:**\n\n🏠 **Home State (HS):** Agar aap usi state se ho jahan NIT hai, toh 50% seats HS quota mein milti hain — lower cutoff!\n🌍 **Other State (OS):** Baaki states ke students ke liye 50% seats reserved hain — slightly higher cutoff\n\n💡 IITs mein koi state quota nahi hota — sab All India rank pe hai.\n💡 NITs aur IIITs mein HS quota bahut important hai!\n\nApna home state batao toh main better guide kar sakta hoon 😊`,
    suggestedActions: [
      { label: 'View NITs', route: '/colleges/nit' },
      { label: 'Predict College', route: '/college-predictor' }
    ]
  },
  iit: {
    reply: `**IITs** — India ke top engineering institutes! 🏛️\n\nIITs mein admission **JEE Advanced rank** se hota hai, counselling **JoSAA** ke through hoti hai.\n\n🔹 Total 23 IITs hain across India\n🔹 Top branches: CSE, Electrical, Mechanical\n🔹 Placement record excellent hai — top IITs mein avg package 20-30 LPA+\n\nKisi specific IIT ke baare mein jaanna hai? IIT Bombay, Delhi, Madras, Kanpur? 🎓`,
    suggestedActions: [
      { label: 'Browse IITs', route: '/colleges/iit' },
      { label: 'JoSAA Predictor', route: '/college-predictor/josaa' }
    ]
  },
  nit: {
    reply: `**NITs** — National Institutes of Technology! 🏛️\n\nNITs mein admission **JEE Main rank** se hota hai. Counselling JoSAA + CSAB ke through.\n\n🔹 Total 31 NITs hain\n🔹 Home State quota se 50% seats milti hain\n🔹 Top NITs: NIT Trichy, Warangal, Surathkal, Allahabad\n🔹 Good placements — especially CSE and ECE branches\n\nApna rank aur home state batao toh NIT options suggest kar sakta hoon 💪`,
    suggestedActions: [
      { label: 'Browse NITs', route: '/colleges/nit' },
      { label: 'Predict College', route: '/college-predictor' }
    ]
  },
  percentile: {
    reply: `**Percentile to Rank conversion** bahut easy hai! 🔢\n\nFormula: **Rank = (100 - Percentile) × (Total Candidates / 100)**\n\nExample: Agar percentile 95 hai aur 12 lakh students ne diya:\nRank ≈ (100 - 95) × 12,00,000 / 100 = **60,000**\n\nExact conversion ke liye humara tool use karo 👇`,
    suggestedActions: [
      { label: 'Percentile to Rank Tool', route: '/percentile-to-rank' }
    ]
  },
  news: {
    reply: `Latest **news aur updates** ke liye humara News section check karo! 📰\n\nWahan pe milega:\n🔹 JoSAA / CSAB schedule updates\n🔹 Important deadlines\n🔹 New college announcements\n🔹 Cutoff trend updates\n\nRegularly check karte rehna — deadlines miss mat karna! ⚡`,
    suggestedActions: [
      { label: 'View News', route: '/news' },
      { label: 'Check Calendar', route: '/resources/calendar' }
    ]
  }
};

// ── Keyword matching ─────────────────────────────────────────────────
function matchIntent(message) {
  const msg = message.toLowerCase();

  if (/freeze|float|slide/.test(msg)) return 'freeze_float_slide';
  if (/seat\s*(acceptance)?\s*fee/.test(msg)) return 'seat_fee';
  if (/home\s*state|other\s*state|quota/.test(msg)) return 'quota';
  if (/document|documents|required\s*doc/.test(msg)) return 'documents';
  if (/predict|prediction|college.*rank|rank.*college|kaunsa\s*college|which\s*college|college\s*milega/.test(msg)) return 'college_predict';
  if (/jac\s*delhi|jac-delhi|dtu|nsut|igdtuw/.test(msg)) return 'jac_delhi';
  if (/csab|special\s*round/.test(msg)) return 'csab';
  if (/josaa|jo\s*saa|choice\s*fill|allotment/.test(msg)) return 'josaa';
  if (/service|plan|pricing|package|counselling\s*plan/.test(msg)) return 'services';
  if (/deadline|date|schedule|kab\s*hai|when/.test(msg)) return 'deadlines';
  if (/percentile|rank\s*convert|convert\s*percentile/.test(msg)) return 'percentile';
  if (/news|update|latest/.test(msg)) return 'news';
  if (/\biit\b|iit\s/.test(msg) && !/iiit|nit/.test(msg)) return 'iit';
  if (/\bnit\b|nit\s/.test(msg) && !/iiit/.test(msg)) return 'nit';
  if (/iiit/.test(msg)) return 'nit'; // reuse NIT-like response

  return null;
}

// ── Context-aware greeting ───────────────────────────────────────────
function getContextGreeting(currentPage) {
  const ctx = getPageContext(currentPage);
  if (!ctx) return null;

  const greetings = {
    'JoSAA College Predictor': "I see you're using the **JoSAA Predictor**! Need help understanding the results or the counselling process?",
    'CSAB College Predictor': "You're on the **CSAB Predictor** — great choice for special round planning! Any doubts?",
    'JAC Delhi Predictor': "Using the **JAC Delhi Predictor**! I can help with DTU, NSUT, IGDTUW queries 🏛️",
    'College Predictor Selection': "Choosing a predictor? I can help you pick the right one based on your exam and goals! 🎯",
    'IIT Colleges': "Browsing **IITs**! I can help with specific IIT info, placements, fees, or admission process 🎓",
    'NIT Colleges': "Looking at **NITs**! Want to know about placements, cutoffs, or home state advantage?",
    'IIIT Colleges': "Exploring **IIITs**! These are great for CS-focused students. Need guidance?",
    'Services': "On the **Services** page! I can help you compare plans and find the best fit for your needs 💼",
    'News & Updates': "Checking **News & Updates** — smart move! Ask me if you have deadline queries 📅",
    'Resources': "On **Resources** — lots of useful tools here! Need help finding something specific?",
    'Percentile to Rank Converter': "Using the **Percentile to Rank** tool! I can explain how the conversion works 🔢",
  };

  return greetings[ctx] || null;
}

// ── Main service function ────────────────────────────────────────────
export async function sendChatMessage(message, currentPage = '', conversationHistory = []) {
  // Simulate network delay for natural feel
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 900));

  /* ── Uncomment below to use real backend API ──
  try {
    const res = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ message, currentPage, conversationHistory })
    });
    const data = await res.json();
    return { reply: data.reply, suggestedActions: data.suggestedActions || [] };
  } catch (err) {
    return { reply: 'Sorry, I'm having trouble connecting right now. Please try again in a moment! 🙏', suggestedActions: [] };
  }
  */

  // ── Mock AI logic ──
  const intent = matchIntent(message);

  if (intent && responses[intent]) {
    return {
      reply: responses[intent].reply,
      suggestedActions: responses[intent].suggestedActions || []
    };
  }

  // Greeting detection
  if (/^(hi|hello|hey|hii|helo|namaste|hola|yo)\b/i.test(message.trim())) {
    const contextGreeting = getContextGreeting(currentPage);
    const greeting = contextGreeting
      ? `Hi! 👋 ${contextGreeting}\n\nFeel free to ask anything about JEE counselling!`
      : `Hi there! 👋 Main Counselify AI Assistant hoon.\n\nMain help kar sakta hoon:\n• College prediction guidance\n• JoSAA / CSAB / JAC Delhi doubts\n• Counselling process\n• Services & plans\n\nApna question puchho ya quick options use karo! 😊`;

    return {
      reply: greeting,
      suggestedActions: [
        { label: 'Predict my college', route: '/college-predictor' },
        { label: 'View Services', route: '/services' }
      ]
    };
  }

  // Thank you detection
  if (/thank|thanks|dhanyawad|shukriya/i.test(message)) {
    return {
      reply: "You're welcome! 😊 Agar aur koi doubt ho toh zaroor puchho. Best of luck for your admissions! 🎉",
      suggestedActions: []
    };
  }

  // Fallback
  return {
    reply: `Hmm, I'm not 100% sure about this one. But here's what I suggest:\n\n🔹 Check the **News section** for latest updates\n🔹 Visit **Services** for expert counselling plans\n🔹 **Speak to an Advisor** for personalized guidance\n\nMain JEE counselling, college prediction, JoSAA/CSAB/JAC Delhi questions mein best help kar sakta hoon! Try asking about those 😊`,
    suggestedActions: [
      { label: 'Check News', route: '/news' },
      { label: 'View Services', route: '/services' },
      { label: 'Speak to Advisor', route: '/advisor' }
    ]
  };
}

export function getWelcomeMessage(currentPage = '') {
  const contextGreeting = getContextGreeting(currentPage);

  let welcomeText = `Hi! I'm **Counselify AI Assistant** 👋\n\nI can help you with:\n• JEE college guidance\n• JoSAA / CSAB / JAC Delhi doubts\n• Counselling process explained simply\n• Services and latest updates`;

  if (contextGreeting) {
    welcomeText += `\n\n📍 ${contextGreeting}`;
  }

  welcomeText += `\n\nStart by typing your question, or tap a quick option below!`;

  return {
    reply: welcomeText,
    suggestedActions: []
  };
}

export { getPageContext };
