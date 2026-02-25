import { Shield } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectionProps {
  onLanguageSelect: (language: Language) => void;
}

export function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="flex justify-end mb-4">
          <div className="space-x-3">
            <button
              onClick={() => onLanguageSelect('en')}
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              English
            </button>

            <button
              onClick={() => onLanguageSelect('te')}
              className="inline-flex items-center gap-2 bg-white border border-blue-100 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              తెలుగు
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-12 md:p-20">
          <div className="text-center">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              <span>AI-Powered </span>
              <span className="text-blue-500">Scam Detection</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Protect yourself from online fraud before it's too late. Analyze SMS, messages, and links instantly with our intelligent AI system.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="bg-white rounded-full px-6 py-4 shadow-md flex flex-col items-center">
                <div className="text-sm text-gray-500">Detection Rate</div>
                <div className="text-xl font-bold text-gray-900">98.5%</div>
              </div>

              <div className="bg-white rounded-full px-6 py-4 shadow-md flex flex-col items-center">
                <div className="text-sm text-gray-500">Scams Prevented</div>
                <div className="text-xl font-bold text-gray-900">10,000+</div>
              </div>

              <div className="bg-white rounded-full px-6 py-4 shadow-md flex flex-col items-center">
                <div className="text-sm text-gray-500">Response Time</div>
                <div className="text-xl font-bold text-gray-900">&lt;1 sec</div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4 items-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> UPI Scams
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> Phishing Links
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> Fake Jobs
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> Prize Scams
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
