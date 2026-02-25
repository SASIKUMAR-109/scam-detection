import { RiskResult, Language } from './types';

const urgencyKeywords = [
  'urgent', 'immediately', 'act now', 'limited time', 'expire', 'suspend',
  'verify now', 'click here', 'confirm', 'update', 'blocked', 'locked',
  'तुरंत', 'జరగాలి', 'త్వరగా', 'నేటికే'
];

const threatPhrases = [
  'account will be closed', 'legal action', 'arrest warrant', 'police case',
  'fine', 'penalty', 'suspended', 'deactivated', 'security alert',
  'మీ ఖాతా మూసివేయబడుతుంది', 'చట్టపరమైన చర్య', 'అరెస్ట్ వారెంట్'
];

const suspiciousDomains = [
  '.xyz', '.tk', '.ml', '.ga', '.cf', '.ru', '.cn', '.top', '.pw', '.cc'
];

const shortenedUrlPatterns = [
  'bit.ly', 'tinyurl', 'goo.gl', 'ow.ly', 't.co', 'rebrand.ly', 'short.link'
];

const scamPatterns = [
  'lottery winner', 'won prize', 'claim reward', 'free gift', 'congratulations',
  'bank update', 'kyc update', 'pan card', 'aadhaar', 'refund', 'cashback',
  'earn money', 'work from home', 'investment opportunity', 'double your money',
  'లాటరీ గెలుపు', 'బహుమతి గెలుచుకున్నారు', 'ఉచిత బహుమతి'
];

const jobScamKeywords = [
  'earn lakhs', 'high salary', 'no experience', 'registration fee', 'security deposit',
  'pay first', 'guaranteed job', 'work from home', 'easy money', 'part time',
  'లక్షలు సంపాదించండి', 'అధిక జీతం', 'రిజిస్ట్రేషన్ రుసుము'
];

const suspiciousUpiHandles = [
  '@paytm', '@googlepay', '@phonepe', '@amazonpay', 'merchant', 'customer.care',
  'refund', 'cashback', 'prize', 'lottery'
];

export function detectUpiScam(upiId: string, language: Language): RiskResult {
  let score = 0;
  const reasons: string[] = [];
  const lowerUpi = upiId.toLowerCase().trim();

  // Validate UPI ID format: must be in the form username@handle
  // e.g. john@okicici, 9876543210@paytm, user.name@ybl
  if (!/^[\w.\-]+@[a-zA-Z]{2,}$/.test(upiId.trim())) {
    return {
      score: 0,
      classification: 'suspicious',
      message: language === 'en'
        ? '❌ Please enter a valid UPI ID (e.g. name@bank or 9876543210@paytm).'
        : '❌ దయచేసి చెల్లుబాటు అయ్యే UPI ID నమోదు చేయండి (ఉదా: name@bank లేదా 9876543210@paytm).',
      reasons: [language === 'en' ? 'Input is not a valid UPI ID format' : 'ఇన్‌పుట్ చెల్లుబాటు అయ్యే UPI ID ఆకృతిలో లేదు'],
    };
  }

  suspiciousUpiHandles.forEach(handle => {
    if (lowerUpi.includes(handle)) {
      score += 35;
      reasons.push(language === 'en'
        ? `Suspicious UPI handle detected: ${handle}`
        : `అనుమానాస్పద UPI హ్యాండిల్: ${handle}`);
    }
  });

  scamPatterns.forEach(pattern => {
    if (lowerUpi.includes(pattern.toLowerCase())) {
      score += 30;
      reasons.push(language === 'en'
        ? `Scam pattern detected: ${pattern}`
        : `స్కామ్ నమూనా కనుగొనబడింది: ${pattern}`);
    }
  });

  if (/\d{10,}/.test(lowerUpi)) {
    score += 20;
    reasons.push(language === 'en'
      ? 'Long number sequence detected'
      : 'పొడవైన సంఖ్య శ్రేణి కనుగొనబడింది');
  }

  return classifyRisk(score, reasons, language);
}


export function detectSmsScam(text: string, language: Language): RiskResult {
  let score = 0;
  const reasons: string[] = [];
  const lowerText = text.toLowerCase();

  urgencyKeywords.forEach(keyword => {
    if (lowerText.includes(keyword.toLowerCase())) {
      score += 20;
      reasons.push(language === 'en'
        ? `Urgency keyword found: "${keyword}"`
        : `తొందరపాటు పదం కనుగొనబడింది: "${keyword}"`);
    }
  });

  threatPhrases.forEach(phrase => {
    if (lowerText.includes(phrase.toLowerCase())) {
      score += 30;
      reasons.push(language === 'en'
        ? `Threat phrase detected: "${phrase}"`
        : `బెదిరింపు పదబంధం కనుగొనబడింది: "${phrase}"`);
    }
  });

  scamPatterns.forEach(pattern => {
    if (lowerText.includes(pattern.toLowerCase())) {
      score += 25;
      reasons.push(language === 'en'
        ? `Scam pattern found: "${pattern}"`
        : `స్కామ్ నమూనా కనుగొనబడింది: "${pattern}"`);
    }
  });

  if (/http[s]?:\/\//.test(text)) {
    score += 15;
    reasons.push(language === 'en'
      ? 'Contains URL link'
      : 'URL లింక్ ఉంది');
  }

  if (/\d{10,}/.test(text)) {
    score += 10;
    reasons.push(language === 'en'
      ? 'Contains phone number'
      : 'ఫోన్ నంబర్ ఉంది');
  }

  return classifyRisk(score, reasons, language);
}

export function detectJobScam(text: string, language: Language): RiskResult {
  let score = 0;
  const reasons: string[] = [];
  const lowerText = text.toLowerCase();

  jobScamKeywords.forEach(keyword => {
    if (lowerText.includes(keyword.toLowerCase())) {
      score += 35;
      reasons.push(language === 'en'
        ? `Job scam indicator: "${keyword}"`
        : `ఉద్యోగ స్కామ్ సూచిక: "${keyword}"`);
    }
  });

  if (/registration fee|security deposit|pay.*first/i.test(text)) {
    score += 40;
    reasons.push(language === 'en'
      ? 'Requests upfront payment - major red flag!'
      : 'ముందుగా చెల్లింపు అడుగుతోంది - ప్రధాన హెచ్చరిక!');
  }

  if (/earn.*lakhs|₹.*lakh|high salary/i.test(text)) {
    score += 30;
    reasons.push(language === 'en'
      ? 'Unrealistic salary promises'
      : 'అవాస్తవ జీతం వాగ్దానాలు');
  }

  urgencyKeywords.forEach(keyword => {
    if (lowerText.includes(keyword.toLowerCase())) {
      score += 15;
      reasons.push(language === 'en'
        ? 'Creates false urgency'
        : 'తప్పుడు తొందరను సృష్టిస్తుంది');
    }
  });

  return classifyRisk(score, reasons, language);
}

export function detectCustomerCareScam(phoneNumber: string, language: Language): RiskResult {
  let score = 0;
  const reasons: string[] = [];

  // Reject non-numeric input (e.g., plain names or random text)
  const stripped = phoneNumber.replace(/[\s\-+]/g, '');
  if (!/^\d+$/.test(stripped)) {
    return {
      score: 0,
      classification: 'suspicious',
      message: language === 'en'
        ? '❌ Please enter a valid phone number (digits only).'
        : '❌ దయచేసి చెల్లుబాటు అయ్యే ఫోన్ నంబర్ నమోదు చేయండి (కేవలం అంకెలు మాత్రమే).',
      reasons: [language === 'en' ? 'Input is not a phone number' : 'ఇన్‌పుట్ ఫోన్ నంబర్ కాదు'],
    };
  }

  if (!/^\+?[0-9]{10,15}$/.test(phoneNumber.replace(/[\s-]/g, ''))) {
    score += 20;
    reasons.push(language === 'en'
      ? 'Invalid phone number format'
      : 'చెల్లని ఫోన్ నంబర్ ఫార్మాట్');
  }

  if (/^[0-9]{5,8}$/.test(phoneNumber.replace(/[\s-]/g, ''))) {
    score += 40;
    reasons.push(language === 'en'
      ? 'Suspicious short number - likely fake customer care'
      : 'అనుమానాస్పద చిన్న నంబర్ - నకిలీ కస్టమర్ కేర్ కావచ్చు');
  }

  if (/^140/.test(phoneNumber.replace(/[\s-]/g, ''))) {
    score -= 30;
    reasons.push(language === 'en'
      ? 'Legitimate TRAI approved number starting with 140'
      : 'చట్టబద్ధమైన TRAI ఆమోదించిన 140తో ప్రారంభమయ్యే నంబర్');
  }

  if (/toll.?free|customer.?care/i.test(phoneNumber)) {
    score += 25;
    reasons.push(language === 'en'
      ? 'Claims to be customer care - verify from official website'
      : 'కస్టమర్ కేర్ అని చెప్పుకుంటోంది - అధికారిక వెబ్‌సైట్ నుండి ధృవీకరించండి');
  }
  // Baseline: always advise user to verify — no unverified number should be "safe"
  score += 35;
  reasons.push(language === 'en'
    ? 'Always verify this number from the official website or app before calling'
    : 'కాల్ చేయడానికి ముందు ఈ నంబర్‌ను అధికారిక వెబ్‌సైట్ లేదా యాప్ నుండి ధృవీకరించండి');

  return classifyRisk(Math.max(0, score), reasons, language);
}

export function detectWhatsAppLinkScam(url: string, language: Language): RiskResult {
  let score = 0;
  const reasons: string[] = [];
  const lowerUrl = url.toLowerCase();

  // Reject input that is not a URL (must contain a dot and either start with http/https or look like a domain)
  const looksLikeUrl = /^https?:\/\//i.test(url) || /^www\./i.test(url) || /\.[a-z]{2,}([\/\?#]|$)/i.test(url);
  if (!looksLikeUrl) {
    return {
      score: 0,
      classification: 'suspicious',
      message: language === 'en'
        ? '❌ Please enter a valid URL (e.g. https://example.com).'
        : '❌ దయచేసి చెల్లుబాటు అయ్యే URL నమోదు చేయండి (ఉదా: https://example.com).',
      reasons: [language === 'en' ? 'Input is not a valid URL' : 'ఇన్‌పుట్ చెల్లుబాటు అయ్యే URL కాదు'],
    };
  }

  suspiciousDomains.forEach(domain => {
    if (lowerUrl.includes(domain)) {
      score += 40;
      reasons.push(language === 'en'
        ? `Suspicious domain detected: ${domain}`
        : `అనుమానాస్పద డొమైన్ కనుగొనబడింది: ${domain}`);
    }
  });

  shortenedUrlPatterns.forEach(pattern => {
    if (lowerUrl.includes(pattern)) {
      score += 25;
      reasons.push(language === 'en'
        ? `Shortened URL detected: ${pattern} - could hide malicious site`
        : `సంక్షిప్త URL కనుగొనబడింది: ${pattern} - హానికరమైన సైట్‌ను దాచవచ్చు`);
    }
  });

  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
    score += 45;
    reasons.push(language === 'en'
      ? 'IP address instead of domain name - major red flag!'
      : 'డొమైన్ పేరు కాకుండా IP చిరునామా - ప్రధాన హెచ్చరిక!');
  }

  if (!/^https:\/\//i.test(url) && /^http:\/\//i.test(url)) {
    score += 20;
    reasons.push(language === 'en'
      ? 'Not using secure HTTPS connection'
      : 'సురక్షిత HTTPS కనెక్షన్ ఉపయోగించడం లేదు');
  }

  scamPatterns.forEach(pattern => {
    if (lowerUrl.includes(pattern.toLowerCase().replace(/\s/g, ''))) {
      score += 30;
      reasons.push(language === 'en'
        ? `Scam keyword in URL: "${pattern}"`
        : `URL లో స్కామ్ పదం: "${pattern}"`);
    }
  });

  if (lowerUrl.includes('whatsapp') && !lowerUrl.includes('wa.me') && !lowerUrl.includes('whatsapp.com')) {
    score += 35;
    reasons.push(language === 'en'
      ? 'Fake WhatsApp domain - not official wa.me or whatsapp.com'
      : 'నకిలీ WhatsApp డొమైన్ - అధికారిక wa.me లేదా whatsapp.com కాదు');
  }

  return classifyRisk(score, reasons, language);
}

export function detectUrlScam(url: string, language: Language): RiskResult {
  let score = 0;
  const reasons: string[] = [];
  const lowerUrl = url.toLowerCase().trim();

  // --- Input validation: must look like a URL ---
  const looksLikeUrl =
    /^https?:\/\//i.test(url) ||
    /^www\./i.test(url) ||
    /\.[a-z]{2,}([\/\?#]|$)/i.test(url);

  if (!looksLikeUrl) {
    return {
      score: 0,
      classification: 'suspicious',
      message:
        language === 'en'
          ? '❌ Please enter a valid URL (e.g. https://example.com).'
          : '❌ దయచేసి చెల్లుబాటు అయ్యే URL నమోదు చేయండి (ఉదా: https://example.com).',
      reasons: [
        language === 'en'
          ? 'Input is not a recognisable URL'
          : 'ఇన్‌పుట్ గుర్తించదగిన URL కాదు',
      ],
    };
  }

  // Normalise: add https:// if missing so we can parse it
  const fullUrl = /^https?:\/\//i.test(url) ? url : 'https://' + url;
  let hostname = '';
  try {
    hostname = new URL(fullUrl).hostname.toLowerCase();
  } catch {
    hostname = lowerUrl.replace(/^https?:\/\//i, '').split('/')[0];
  }

  // 1. Suspicious TLDs
  const badTlds = ['.xyz', '.tk', '.ml', '.ga', '.cf', '.ru', '.cn', '.top', '.pw', '.cc', '.gq', '.work', '.click', '.link', '.surf'];
  badTlds.forEach((tld) => {
    if (hostname.endsWith(tld)) {
      score += 30;
      reasons.push(
        language === 'en'
          ? `High-risk TLD detected: "${tld}"`
          : `అధిక-ప్రమాద TLD కనుగొనబడింది: "${tld}"`
      );
    }
  });

  // 2. IP address used as domain (major red flag)
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    score += 50;
    reasons.push(
      language === 'en'
        ? 'IP address used instead of domain name — very suspicious!'
        : 'డొమైన్ పేరు కాకుండా IP చిరునామా వాడబడింది — చాలా అనుమానాస్పదం!'
    );
  }

  // 3. Not HTTPS (HTTP only)
  if (/^http:\/\//i.test(url)) {
    score += 20;
    reasons.push(
      language === 'en'
        ? 'Not using secure HTTPS connection'
        : 'సురక్షిత HTTPS కనెక్షన్ ఉపయోగించడం లేదు'
    );
  }

  // 4. URL shorteners (hides real destination)
  const shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 'ow.ly', 't.co', 'rebrand.ly', 'short.link', 'cutt.ly', 'is.gd', 'buff.ly'];
  shorteners.forEach((s) => {
    if (hostname.includes(s)) {
      score += 25;
      reasons.push(
        language === 'en'
          ? `URL shortener detected: "${s}" — hides real destination`
          : `URL షార్ట్‌నర్ కనుగొనబడింది: "${s}" — అసలు గమ్యస్థానాన్ని దాచిపెడుతుంది`
      );
    }
  });

  // 5. Brand impersonation via subdomain trick (e.g. paypal.evil.com)
  const trustedBrands = ['paypal', 'google', 'facebook', 'amazon', 'apple', 'microsoft', 'netflix', 'sbi', 'hdfc', 'icici', 'paytm', 'phonepe'];
  const parts = hostname.split('.');
  const registeredDomain = parts.slice(-2).join('.');
  trustedBrands.forEach((brand) => {
    if (hostname.includes(brand) && !registeredDomain.startsWith(brand)) {
      score += 45;
      reasons.push(
        language === 'en'
          ? `Brand impersonation detected: "${brand}" appears in subdomain — likely phishing!`
          : `బ్రాండ్ మోసం కనుగొనబడింది: "${brand}" సబ్‌డొమైన్‌లో కనిపిస్తోంది — ఫిషింగ్ కావచ్చు!`
      );
    }
  });

  // 6. Scam/phishing keywords in URL path
  const scamWords = ['login', 'signin', 'verify', 'account', 'secure', 'update', 'confirm', 'prize', 'winner', 'claim', 'free', 'reward', 'kyc', 'otp', 'refund'];
  scamWords.forEach((word) => {
    if (lowerUrl.includes(word)) {
      score += 10;
      reasons.push(
        language === 'en'
          ? `Phishing keyword in URL: "${word}"`
          : `URL లో ఫిషింగ్ పదం: "${word}"`
      );
    }
  });

  // 7. Excessive subdomains (e.g. a.b.c.d.evil.com)
  if (parts.length > 4) {
    score += 20;
    reasons.push(
      language === 'en'
        ? 'Unusually deep subdomain structure — common in phishing'
        : 'అసాధారణంగా లోతైన సబ్‌డొమైన్ నిర్మాణం — ఫిషింగ్‌లో సాధారణం'
    );
  }

  // 8. Excessively long URL (obfuscation)
  if (url.length > 100) {
    score += 15;
    reasons.push(
      language === 'en'
        ? 'Unusually long URL — may be hiding the real destination'
        : 'అసాధారణంగా పొడవైన URL — అసలు గమ్యస్థానాన్ని దాచవచ్చు'
    );
  }

  // 9. Scam patterns in full URL
  const scamPatternList = ['lottery', 'casino', 'win-cash', 'earn-money', 'double-money', 'investment', 'bitcoin', 'crypto'];
  scamPatternList.forEach((p) => {
    if (lowerUrl.includes(p)) {
      score += 20;
      reasons.push(
        language === 'en'
          ? `Scam-related term in URL: "${p}"`
          : `URL లో స్కామ్-సంబంధిత పదం: "${p}"`
      );
    }
  });

  return classifyRisk(score, reasons, language);
}

function classifyRisk(score: number, reasons: string[], language: Language): RiskResult {
  let classification: 'safe' | 'suspicious' | 'scam';
  let message: string;

  if (score <= 30) {
    classification = 'safe';
    message = language === 'en'
      ? 'This appears to be safe. However, always stay vigilant!'
      : 'ఇది సురక్షితంగా కనిపిస్తోంది. అయినప్పటికీ, ఎల్లప్పుడూ అప్రమత్తంగా ఉండండి!';
  } else if (score <= 60) {
    classification = 'suspicious';
    message = language === 'en'
      ? '⚠️ This looks suspicious! Be very careful and verify before taking any action.'
      : '⚠️ ఇది అనుమానాస్పదంగా ఉంది! చాలా జాగ్రత్తగా ఉండండి మరియు ఏదైనా చర్య తీసుకునే ముందు ధృవీకరించండి.';
  } else {
    classification = 'scam';
    message = language === 'en'
      ? '🚨 HIGH RISK SCAM ALERT! Do not proceed. Do not share any personal information or money.'
      : '🚨 అధిక ప్రమాద స్కామ్ హెచ్చరిక! కొనసాగించవద్దు. ఎటువంటి వ్యక్తిగత సమాచారం లేదా డబ్బు పంచుకోవద్దు.';
  }

  return {
    score: Math.min(100, score),
    classification,
    message,
    reasons: reasons.length > 0 ? reasons : [
      language === 'en'
        ? 'No suspicious patterns detected'
        : 'అనుమానాస్పద నమూనాలు కనుగొనబడలేదు'
    ],
  };
}
