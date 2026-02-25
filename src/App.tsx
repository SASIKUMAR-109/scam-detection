import { useState, useEffect } from 'react';
import { Shield, Languages, ExternalLink, Lightbulb } from 'lucide-react';
import { Language, Section } from './types';
import { translations } from './translations';
import { LanguageSelection } from './components/LanguageSelection';
import { DetectionSection } from './components/DetectionSection';
import HomeHero from './components/HomeHero';

const LANGUAGE_KEY = 'scam-detector-language';

function App() {
  const [language, setLanguage] = useState<Language | null>('en');
  const [activeSection, setActiveSection] = useState<Section>('whatsapp');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'te')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Sync active section with URL hash so each section behaves like a separate page
  useEffect(() => {
    const getSectionFromHash = (): Section => {
      const h = (window.location.hash || '').replace('#', '');
      if (h === 'upi' || h === 'sms' || h === 'job' || h === 'customercare' || h === 'whatsapp' || h === 'url') return h;
      return 'whatsapp';
    };

    const init = () => {
      const sec = getSectionFromHash();
      setActiveSection(sec);
      // showHome only when hash is empty
      setShowHome(!window.location.hash);
    };

    init();

    const onHash = () => {
      const sec = getSectionFromHash();
      setActiveSection(sec);
      setShowHome(!window.location.hash);
    };

    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'te' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  if (!language) {
    return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
  }

  const t = translations[language];
  const sections: Section[] = ['upi', 'sms', 'job', 'customercare', 'whatsapp', 'url'];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-teal-500" />
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {language === 'en' ? 'Scam Detector' : 'స్కామ్ డిటెక్టర్'}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Languages className="w-5 h-5" />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'తెలుగు' : 'English'}
                </span>
              </button>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className={`${showMobileMenu ? 'block' : 'hidden'} md:block pb-4`}>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              <button
                onClick={() => {
                  // navigate to home (clear hash) and show hero
                  history.replaceState(null, '', window.location.pathname + window.location.search);
                  setShowHome(true);
                  setShowMobileMenu(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-left md:text-center ${showHome ? 'bg-white text-blue-600' : 'bg-blue-800 text-white hover:bg-blue-700'
                  }`}
              >
                {language === 'en' ? 'Home' : 'హోమ్'}
              </button>
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    // update the URL so each section is its own page
                    window.location.hash = section;
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-left md:text-center ${activeSection === section
                    ? 'bg-teal-500 text-white'
                    : 'bg-blue-800 text-white hover:bg-blue-700'
                    }`}
                >
                  {t.navbar[section]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {showHome && (
          <HomeHero
            language={language}
            onGetStarted={() => {
              // navigate to whatsapp section and hide hero
              window.location.hash = 'whatsapp';
              setShowHome(false);
              setActiveSection('whatsapp');
            }}
          />
        )}

        {!showHome && <DetectionSection section={activeSection} language={language} />}
      </main>

      <footer className="bg-white shadow-lg mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-orange-500" />
                {t.footer.tipsTitle}
              </h3>
              <ul className="space-y-2 text-gray-700 text-lg">
                {language === 'en' ? (
                  <>
                    <li>• Never share OTP, PIN, or CVV with anyone</li>
                    <li>• Banks never ask for passwords over call/SMS</li>
                    <li>• Verify sender before clicking links</li>
                    <li>• Report suspicious activity immediately</li>
                    <li>• Double-check URLs before entering details</li>
                  </>
                ) : (
                  <>
                    <li>• OTP, PIN లేదా CVV ఎవరితోనూ పంచుకోవద్దు</li>
                    <li>• బ్యాంకులు కాల్/SMS ద్వారా పాస్‌వర్డ్‌లను అడగవు</li>
                    <li>• లింక్‌లను క్లిక్ చేసే ముందు పంపినవారిని ధృవీకరించండి</li>
                    <li>• అనుమానాస్పద కార్యకలాపాలను వెంటనే నివేదించండి</li>
                    <li>• వివరాలను నమోదు చేసే ముందు URL లను రెండుసార్లు తనిఖీ చేయండి</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <ExternalLink className="w-6 h-6" />
                {t.footer.reportButton}
              </a>

              <p className="mt-4 text-gray-600 text-lg">
                {language === 'en'
                  ? 'Report cybercrime to the National Cyber Crime Reporting Portal'
                  : 'నేషనల్ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్‌కు సైబర్ నేరాలను నివేదించండి'}
              </p>

              <p className="mt-6 text-gray-500 text-sm">
                {language === 'en'
                  ? 'Helpline: 1930 (National Cybercrime Helpline)'
                  : 'హెల్ప్‌లైన్: 1930 (నేషనల్ సైబర్ క్రైమ్ హెల్ప్‌లైన్)'}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
