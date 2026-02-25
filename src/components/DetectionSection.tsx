import { useState } from 'react';
import { Section, Language, RiskResult } from '../types';
import { translations } from '../translations';
import { ResultCard } from './ResultCard';
import { speakAlert } from '../voiceAlert';
import {
  detectUpiScam,
  detectSmsScam,
  detectJobScam,
  detectCustomerCareScam,
  detectWhatsAppLinkScam,
  detectUrlScam,
} from '../scamDetection';

interface DetectionSectionProps {
  section: Section;
  language: Language;
}

export function DetectionSection({ section, language }: DetectionSectionProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<RiskResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const t = translations[language].sections[section];

  const handleCheck = () => {
    if (!input.trim()) return;

    setIsChecking(true);

    setTimeout(() => {
      let detectionResult: RiskResult;

      switch (section) {
        case 'upi':
          detectionResult = detectUpiScam(input, language);
          break;
        case 'sms':
          detectionResult = detectSmsScam(input, language);
          break;
        case 'job':
          detectionResult = detectJobScam(input, language);
          break;
        case 'customercare':
          detectionResult = detectCustomerCareScam(input, language);
          break;
        case 'whatsapp':
          detectionResult = detectWhatsAppLinkScam(input, language);
          break;
        case 'url':
          detectionResult = detectUrlScam(input, language);
          break;
        default:
          detectionResult = {
            score: 0,
            classification: 'safe',
            message: 'No issues detected',
            reasons: [],
          };
      }

      setResult(detectionResult);
      setInput('');
      setIsChecking(false);

      if (detectionResult.classification !== 'safe') {
        speakAlert(detectionResult.message, language);
      }
    }, 800);
  };

  const handleReplay = () => {
    if (result) {
      speakAlert(result.message, language);
    }
  };

  const isTextarea = section === 'sms' || section === 'job';

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">{t.title}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {isTextarea ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-teal-500 resize-none"
                rows={8}
              />
            ) : (
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-teal-500"
              />
            )}

            <button
              onClick={handleCheck}
              disabled={!input.trim() || isChecking}
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xl py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking
                ? language === 'en'
                  ? 'Checking...'
                  : 'తనిఖీ చేస్తోంది...'
                : t.button}
            </button>
          </div>
        </div>

        <div>
          {result && <ResultCard result={result} language={language} onReplay={handleReplay} />}
        </div>
      </div>
    </div>
  );
}
