import { Volume2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { RiskResult, Language } from '../types';
import { translations } from '../translations';

interface ResultCardProps {
  result: RiskResult;
  language: Language;
  onReplay: () => void;
}

export function ResultCard({ result, language, onReplay }: ResultCardProps) {
  const t = translations[language].results;

  const getClassificationColor = () => {
    switch (result.classification) {
      case 'safe':
        return {
          bg: 'bg-green-50',
          border: 'border-green-600',
          text: 'text-green-700',
          icon: CheckCircle,
          label: t.safe,
        };
      case 'suspicious':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-600',
          text: 'text-orange-700',
          icon: AlertTriangle,
          label: t.suspicious,
        };
      case 'scam':
        return {
          bg: 'bg-red-50',
          border: 'border-red-600',
          text: 'text-red-700',
          icon: XCircle,
          label: t.scam,
        };
    }
  };

  const { bg, border, text, icon: Icon, label } = getClassificationColor();

  return (
    <div className={`${bg} border-2 ${border} rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-8 h-8 ${text}`} />
          <h3 className={`text-2xl font-bold ${text}`}>{label}</h3>
        </div>
        <button
          onClick={onReplay}
          className={`${text} hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-white/50`}
          title={t.replay}
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-700">{t.riskScore}</span>
          <span className={`text-2xl font-bold ${text}`}>{result.score}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              result.classification === 'safe'
                ? 'bg-green-600'
                : result.classification === 'suspicious'
                ? 'bg-orange-600'
                : 'bg-red-600'
            }`}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      <p className="text-lg text-gray-800 mb-4 font-medium">{result.message}</p>

      {result.reasons.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-lg">
            {language === 'en' ? 'Detected Issues:' : 'కనుగొనబడిన సమస్యలు:'}
          </h4>
          <ul className="space-y-2">
            {result.reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className={`${text} mt-1`}>•</span>
                <span className="text-base">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
