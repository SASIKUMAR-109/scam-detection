import { Translations } from './types';

export const translations: Record<string, Translations> = {
  en: {
    languageSelection: {
      title: 'Select Your Language',
      english: 'English',
      telugu: 'తెలుగు (Telugu)',
    },
    navbar: {
      upi: 'UPI Payment Scams',
      sms: 'Phishing SMS & Emails',
      job: 'Fake Job Offers',
      customercare: 'Fake Customer Care',
      whatsapp: 'Fraud WhatsApp Links',
      url: 'URL Safety Check',
    },
    sections: {
      upi: {
        title: 'Check UPI Payment Scams',
        placeholder: 'Enter UPI ID (e.g., fraudster@paytm)',
        button: 'Check Risk',
      },
      sms: {
        title: 'Check Phishing SMS & Emails',
        placeholder: 'Paste the SMS or email content here...',
        button: 'Check Risk',
      },
      job: {
        title: 'Check Fake Job Offers',
        placeholder: 'Paste the job offer message here...',
        button: 'Check Risk',
      },
      customercare: {
        title: 'Check Fake Customer Care Numbers',
        placeholder: 'Enter phone number (e.g., +91 9876543210)',
        button: 'Check Risk',
      },
      whatsapp: {
        title: 'Check Fraud WhatsApp Links',
        placeholder: 'Enter WhatsApp link or URL...',
        button: 'Check Risk',
      },
      url: {
        title: 'Check URL Safety',
        placeholder: 'Enter any URL to check (e.g. https://example.com)',
        button: 'Analyse URL',
      },
    },
    results: {
      safe: 'Safe',
      suspicious: 'Suspicious',
      scam: 'Scam Alert',
      riskScore: 'Risk Score',
      replay: 'Replay Alert',
    },
    footer: {
      reportButton: 'Report to Cyber Crime',
      tipsTitle: 'Safety Tips',
    },
  },
  te: {
    languageSelection: {
      title: 'మీ భాషను ఎంచుకోండి',
      english: 'English',
      telugu: 'తెలుగు (Telugu)',
    },
    navbar: {
      upi: 'UPI చెల్లింపు స్కామ్‌లు',
      sms: 'ఫిషింగ్ SMS & ఈమెయిల్స్',
      job: 'నకిలీ ఉద్యోగ ఆఫర్లు',
      customercare: 'నకిలీ కస్టమర్ కేర్',
      whatsapp: 'మోసపూరిత WhatsApp లింక్‌లు',
      url: 'URL సురక్షితత తనిఖీ',
    },
    sections: {
      upi: {
        title: 'UPI చెల్లింపు స్కామ్‌లను తనిఖీ చేయండి',
        placeholder: 'UPI ID ఎంటర్ చేయండి (ఉదా: fraudster@paytm)',
        button: 'రిస్క్ తనిఖీ చేయండి',
      },
      sms: {
        title: 'ఫిషింగ్ SMS & ఈమెయిల్స్ తనిఖీ చేయండి',
        placeholder: 'SMS లేదా ఈమెయిల్ కంటెంట్‌ను ఇక్కడ పేస్ట్ చేయండి...',
        button: 'రిస్క్ తనిఖీ చేయండి',
      },
      job: {
        title: 'నకిలీ ఉద్యోగ ఆఫర్లను తనిఖీ చేయండి',
        placeholder: 'ఉద్యోగ ఆఫర్ సందేశాన్ని ఇక్కడ పేస్ట్ చేయండి...',
        button: 'రిస్క్ తనిఖీ చేయండి',
      },
      customercare: {
        title: 'నకిలీ కస్టమర్ కేర్ నంబర్లను తనిఖీ చేయండి',
        placeholder: 'ఫోన్ నంబర్ ఎంటర్ చేయండి (ఉదా: +91 9876543210)',
        button: 'రిస్క్ తనిఖీ చేయండి',
      },
      whatsapp: {
        title: 'మోసపూరిత WhatsApp లింక్‌లను తనిఖీ చేయండి',
        placeholder: 'WhatsApp లింక్ లేదా URL ఎంటర్ చేయండి...',
        button: 'రిస్క్ తనిఖీ చేయండి',
      },
      url: {
        title: 'URL సురక్షితత తనిఖీ చేయండి',
        placeholder: 'తనిఖీ చేయడానికి URL ఎంటర్ చేయండి (ఉదా: https://example.com)',
        button: 'URL విశ్లేషించండి',
      },
    },
    results: {
      safe: 'సురక్షితం',
      suspicious: 'అనుమానాస్పదం',
      scam: 'స్కామ్ హెచ్చరిక',
      riskScore: 'రిస్క్ స్కోర్',
      replay: 'హెచ్చరిక రీప్లే చేయండి',
    },
    footer: {
      reportButton: 'సైబర్ క్రైమ్‌కు నివేదించండి',
      tipsTitle: 'భద్రతా చిట్కాలు',
    },
  },
};
