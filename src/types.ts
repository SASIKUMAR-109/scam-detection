export type Language = 'en' | 'te';

export type Section = 'upi' | 'sms' | 'job' | 'customercare' | 'whatsapp';

export interface RiskResult {
  score: number;
  classification: 'safe' | 'suspicious' | 'scam';
  message: string;
  reasons: string[];
}

export interface Translations {
  languageSelection: {
    title: string;
    english: string;
    telugu: string;
  };
  navbar: {
    upi: string;
    sms: string;
    job: string;
    customercare: string;
    whatsapp: string;
  };
  sections: {
    upi: {
      title: string;
      placeholder: string;
      button: string;
    };
    sms: {
      title: string;
      placeholder: string;
      button: string;
    };
    job: {
      title: string;
      placeholder: string;
      button: string;
    };
    customercare: {
      title: string;
      placeholder: string;
      button: string;
    };
    whatsapp: {
      title: string;
      placeholder: string;
      button: string;
    };
  };
  results: {
    safe: string;
    suspicious: string;
    scam: string;
    riskScore: string;
    replay: string;
  };
  footer: {
    reportButton: string;
    tipsTitle: string;
  };
}
