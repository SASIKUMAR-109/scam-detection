import { Shield, AlertTriangle, Lock } from 'lucide-react';
import { Language } from '../types';

interface HomeHeroProps {
  language: Language;
  onGetStarted: () => void;
}

export default function HomeHero({ language, onGetStarted }: HomeHeroProps) {
  const isEn = language === 'en';

  const stats = [
    {
      icon: <Shield className="w-6 h-6 text-teal-500" />,
      label: isEn ? 'Detection Rate' : 'డిటెక్షన్ రేట్',
      value: '98.5%',
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      label: isEn ? 'Scams Prevented' : 'నిరోధించిన స్కామ్‌లు',
      value: '10,000+',
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      label: isEn ? 'Response Time' : 'స్పందన సమయం',
      value: '<1 sec',
    },
  ];

  const tags = [
    isEn ? 'UPI Scams' : 'UPI స్కామ్‌లు',
    isEn ? 'Phishing Links' : 'ఫిషింగ్ లింకులు',
    isEn ? 'Fake Jobs' : 'నకిలీ ఉద్యోగాలు',
    isEn ? 'Prize Scams' : 'బహుమతి స్కామ్‌లు',
  ];

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #e8f4fd 0%, #f0f7ff 40%, #ffffff 100%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
      className="w-full py-20 px-4"
    >
      <div className="max-w-4xl mx-auto w-full text-center">

        {/* Shield icon with glow */}
        <div className="flex justify-center mb-8">
          <div
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 60%, transparent 80%)',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield
              className="w-16 h-16"
              style={{ color: '#3b82f6', filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.5))' }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5 leading-tight">
          {isEn ? (
            <>
              AI-Powered{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Scam Detection
              </span>
            </>
          ) : (
            <>
              AI-పవర్డ్{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                స్కామ్ డిటెక్షన్
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          {isEn
            ? "Protect yourself from online fraud before it's too late. Analyze SMS, messages, and links instantly with our intelligent AI system."
            : 'ఆన్లైన్ మోసాల నుండి మిమ్మల్ని రక్షించుకోండి. మా తెలివైన AI సిస్టమ్‌తో SMS, సందేశాలు మరియు లింక్‌లను తక్షణమే విశ్లేషించండి.'}
        </p>

        {/* Stats Cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-md"
              style={{ minWidth: '170px', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div
                className="rounded-xl p-2"
                style={{ background: 'rgba(59,130,246,0.08)' }}
              >
                {stat.icon}
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all text-lg"
            style={{ background: 'linear-gradient(90deg, #2563eb, #06b6d4)' }}
          >
            {isEn ? 'Get Started →' : 'ప్రారంభించండి →'}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          {tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
