import { Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface LanguageSelectionProps {
  onLanguageSelect: (language: Language) => void;
}

export function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  const t = translations.en.languageSelection;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
            <Globe className="w-12 h-12 text-teal-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {t.title}
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Select Your Language / మీ భాషను ఆయ్క చేయండి
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => onLanguageSelect('en')}
            className="bg-white hover:bg-blue-50 text-gray-800 font-bold text-2xl py-8 px-16 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-blue-900"
          >
            <span className="text-4xl mb-2 block">🇬🇧</span>
            {t.english}
          </button>

          <button
            onClick={() => onLanguageSelect('te')}
            className="bg-white hover:bg-blue-50 text-gray-800 font-bold text-2xl py-8 px-16 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-blue-900"
          >
            <span className="text-4xl mb-2 block">🇮🇳</span>
            {t.telugu}
          </button>
        </div>
      </div>
    </div>
  );
}
