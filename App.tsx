
import React, { useState, useEffect } from 'react';
import { AirdropCard } from './components/AirdropCard';
import { BrutalButton } from './components/BrutalButton';
import { GeminiScanner } from './components/GeminiScanner';
import { Ticker } from './components/Ticker';
import { LearnView } from './components/LearnView';
import { GuidesView } from './components/GuidesView';
import { ConceptsView } from './components/ConceptsView';
import { ThemeToggle } from './components/ThemeToggle';
import { AirdropDetailModal } from './components/AirdropDetailModal';
import { WalletModal } from './components/WalletModal';
import { getAirdropsData, getMarqueeText } from './constants';
import { FilterType, Airdrop, Language } from './types';
import { 
  Menu, 
  Target, 
  ArrowRight,
  Radio,
  BookOpen,
  MousePointerClick,
  Zap,
  Wallet,
  LogOut,
  Search
} from 'lucide-react';

type ViewState = 'home' | 'learn' | 'guides' | 'concepts';

interface ConnectedWallet {
  name: string;
  address: string;
}

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [scannerQuery, setScannerQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);
  
  // Translation Popup State
  const [showTranslatePopup, setShowTranslatePopup] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Wallet States
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);

  const airdropsData = getAirdropsData(language);
  const marqueeText = getMarqueeText(language);

  // Update DOM class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Trigger Translation Popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTranslatePopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(6);
  }, [filter, searchQuery]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredAirdrops = airdropsData.filter(drop => {
    // 1. Check Category Filter
    let matchesFilter = false;
    if (filter === FilterType.ALL) matchesFilter = true;
    else if (filter === FilterType.LIVE) matchesFilter = drop.status === 'Live';
    else if (filter === FilterType.UPCOMING) matchesFilter = drop.status === 'Upcoming' || drop.status === 'Rumored';
    else if (filter === FilterType.HIGH_POTENTIAL) matchesFilter = drop.potential === '$$$$';
    else matchesFilter = true;

    // 2. Check Search Query
    const matchesSearch = 
      drop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      drop.ticker.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const displayedAirdrops = filteredAirdrops.slice(0, visibleCount);

  const handleAnalyze = (name: string) => {
    const prompt = language === 'id' 
      ? `Analisis strategi airdrop untuk ${name}. Apakah worth it?` 
      : `Analyze the airdrop strategy for ${name}. Is it worth it?`;
    setScannerQuery(prompt);
    setShowScanner(true);
    // Scroll to scanner if on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('scanner-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleViewDetails = (drop: Airdrop) => {
    setSelectedAirdrop(drop);
  };

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      // Wait for render cycle to switch views before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const handleConnectWallet = (name: string, address: string) => {
    setConnectedWallet({ name, address });
    setWalletModalOpen(false);
    setMobileMenuOpen(false);
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleTranslateOk = () => {
    setLanguage('id');
    setShowTranslatePopup(false);
  }

  // --- TRANSLATION MAP FOR UI ---
  const t = {
      about: language === 'id' ? "Tentang" : "About",
      drops: language === 'id' ? "Drops" : "Drops",
      learn: language === 'id' ? "Belajar" : "Learn",
      dictionary: language === 'id' ? "Kamus" : "Dictionary",
      strategy: language === 'id' ? "Strategi" : "Strategy",
      connect: language === 'id' ? "Hubungkan Dompet" : "Connect Wallet",
      proUpgrade: language === 'id' ? "Upgrade Sekarang" : "Upgrade Now",
      searchPlaceholder: language === 'id' ? "Cari proyek..." : "Search project...",
      filters: language === 'id' ? "FILTER" : "FILTERS",
      allProtocols: language === 'id' ? "Semua Protokol" : "All Protocols",
      liveNow: language === 'id' ? "Live Sekarang" : "Live Now",
      upcoming: language === 'id' ? "Mendatang" : "Upcoming",
      highPotential: language === 'id' ? "Potensi Besar" : "High Potential",
      dropsList: language === 'id' ? "DAFTAR DROP" : "DROPS LIST",
      detected: language === 'id' ? "TERDETEKSI" : "DETECTED",
      noDrops: language === 'id' ? "Tidak Ada Drop" : "No Drops Found",
      noDropsDesc: language === 'id' ? "Coba sesuaikan filter atau pencarian." : "Try adjusting your filters or search query.",
      loadMore: language === 'id' ? "Muat Lebih Banyak" : "Load More Protocols",
      aiOffline: language === 'id' ? "Analis AI Offline" : "AI Analyst Offline",
      aiActivate: language === 'id' ? "Klik untuk aktifkan Gemini Neural Link" : "Click to activate Gemini Neural Link",
      heroTitle: language === 'id' ? <>Jangan Lewatkan <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#EBF400] drop-shadow-[1px_1px_0_rgba(0,0,0,1)] dark:drop-shadow-[1px_1px_0_rgba(255,255,255,1)] lg:drop-shadow-[2px_2px_0_rgba(0,0,0,1)] lg:dark:drop-shadow-[2px_2px_0_rgba(255,255,255,1)] [-webkit-text-stroke:1px_black] dark:[-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_black] md:dark:[-webkit-text-stroke:2px_white] lg:[-webkit-text-stroke:3px_black] lg:dark:[-webkit-text-stroke:3px_white]">Drop Besar</span><br/> Berikutnya</> : <>Don't Miss <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#EBF400] drop-shadow-[1px_1px_0_rgba(0,0,0,1)] dark:drop-shadow-[1px_1px_0_rgba(255,255,255,1)] lg:drop-shadow-[2px_2px_0_rgba(0,0,0,1)] lg:dark:drop-shadow-[2px_2px_0_rgba(255,255,255,1)] [-webkit-text-stroke:1px_black] dark:[-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_black] md:dark:[-webkit-text-stroke:2px_white] lg:[-webkit-text-stroke:3px_black] lg:dark:[-webkit-text-stroke:3px_white]">The Next Big</span><br/> Drop</>,
      heroDesc: language === 'id' ? "Agregator airdrop brutalis. Analisis bertenaga AI. Dipilih langsung oleh Mystic." : "The brutalist airdrop aggregator. AI-powered analysis. Handpicked by Mystic.",
      heroBtnLearn: language === 'id' ? "Pelajari Dulu" : "Learn It First",
      heroBtnStart: language === 'id' ? "Mulai Berburu" : "Start Catching",
      aboutTitle: language === 'id' ? <>Mereka Drop.<br/> Kita Tangkap.</> : <>They Drop.<br/> We Catch.</>,
      aboutDesc1: language === 'id' ? <>CATCH THE DROPS membuat <span className="bg-black text-white px-1">penangkap-airdrop</span> lebih mudah untuk semua. Kami menyaring penipuan, tugas tak berguna, dan proyek kualitas rendah. Jadi Anda tidak buang waktu.</> : <>CATCH THE DROPS makes <span className="bg-black text-white px-1">airdrop-catcher</span> easier for everyone. We filter out scams, useless tasks, and low-quality projects. So you don’t waste time.</>,
      aboutDesc2: language === 'id' ? "Dengan wawasan bertenaga AI, kami menjelaskan protokol, menyoroti risiko, dan menunjukkan potensi reward dengan cara yang mudah dipahami." : "With AI-powered insights, we explain protocols, highlight risks, and show potential rewards in a way anyone can understand.",
      curated: language === 'id' ? "Daftar Terkurasi" : "Curated Lists",
      aiAnalysis: language === 'id' ? "Analisis AI" : "AI Analysis",
      strategyGuides: language === 'id' ? "Panduan Strategi" : "Strategy Guides",
      footerTitle: language === 'id' ? "Catch The Drops" : "Catch The Drops",
      footerDesc: language === 'id' ? "Dashboard brutalis utama untuk berburu airdrop kripto. Didukung oleh AI canggih untuk membantu Anda menemukan sinyal di tengah kebisingan." : "The premier brutalist airdrop hunting dashboard. Powered by advanced AI to help you find signal in the noise.",
      footerLinks: language === 'id' ? "Tautan" : "Links",
      footerEducation: language === 'id' ? "Edukasi" : "Education",
      footerDictionary: language === 'id' ? "Kamus Kripto" : "Crypto Dictionary",
      footerSocial: language === 'id' ? "Sosial" : "Social",
      proAccess: language === 'id' ? "Akses Pro" : "Pro Access",
      proDesc: language === 'id' ? "Buka script hunting otomatis dan clustering wallet." : "Unlock automated hunting scripts and wallet clustering."
  }

  return (
    // Added overflow-x-hidden and w-full to prevent horizontal scroll issues on mobile
    // Added pt-[62px] to compensate for the fixed header height
    // Updated min-h-screen to min-h-dvh md:min-h-screen for mobile browser fix
    <div className="min-h-dvh md:min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col relative transition-colors duration-300 pt-[62px]">
      
      {/* --- TRANSLATION POPUP NOTIFICATION --- */}
      <div 
        className={`fixed top-[80px] left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showTranslatePopup ? 'translate-y-0 opacity-100' : '-translate-y-[250px] opacity-0 pointer-events-none'}`}
      >
         <div className="w-[300px] md:w-[350px] bg-white dark:bg-[#121212] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative">
            {/* Window Header */}
            <div className="bg-[#3B82F6] p-2 border-b-4 border-black dark:border-white flex justify-between items-center cursor-default select-none">
               <div className="flex gap-2">
                  <div className="w-3 h-3 bg-white border border-black"></div>
                  <div className="w-3 h-3 bg-white border border-black"></div>
               </div>
               <span className="font-mono font-bold text-white text-xs uppercase tracking-widest">System Message</span>
               <button 
                 onClick={() => setShowTranslatePopup(false)} 
                 className="bg-[#FF4D4D] border-2 border-black w-6 h-6 flex items-center justify-center font-bold hover:bg-red-400 text-black text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
               >
                 X
               </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center">
               <h3 className="text-2xl font-black uppercase mb-3 text-black dark:text-white leading-none">
                 TRANSLATE TO INDONESIA?
               </h3>
               <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-6 bg-gray-100 dark:bg-gray-800 p-2 border border-dashed border-gray-400">
                 Refresh the website to revert
               </p>

               <button
                 onClick={handleTranslateOk}
                 className="w-full bg-[#EBF400] border-2 border-black dark:border-white p-3 font-bold uppercase hover:bg-[#d7df00] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-black text-lg tracking-wider"
               >
                 OKE
               </button>
            </div>
         </div>
      </div>

      {/* Detail Modal */}
      {selectedAirdrop && (
        <AirdropDetailModal 
          data={selectedAirdrop} 
          onClose={() => setSelectedAirdrop(null)} 
          language={language}
        />
      )}

      {/* Wallet Modal */}
      {walletModalOpen && (
        <WalletModal 
          onClose={() => setWalletModalOpen(false)}
          onConnect={handleConnectWallet}
          language={language}
        />
      )}

      {/* Fixed Navbar - Explicit height 62px */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-2 border-black dark:border-white h-[62px] brutal-shadow-sm transition-colors flex items-center">
        {/* Container ensures alignment matches the body content */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center w-full">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden">
               <img 
                  src="https://github.com/rey-mystic/official-image/blob/main/Blue%20and%20White%20Modern%20Drop%20Typography%20Logo%20(1).png?raw=true" 
                  alt="Catch The Drops Logo" 
                  className="w-full h-full object-contain"
               />
            </div>
            {/* Fixed header text cutoff issues: Removed truncate, added whitespace-nowrap, adjusted responsive font sizing */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tighter block text-black dark:text-white whitespace-nowrap">
              Catch<span className="text-[#3B82F6]">The</span>Drops
            </h1>
          </div>

          {/* Desktop Menu - Hidden on Tablet (md), Visible on Large (lg) */}
          <div className="hidden lg:flex gap-4 items-center">
            <BrutalButton variant="outline" className="py-1 px-4 text-sm" onClick={() => handleNavClick('about-section')}>{t.about}</BrutalButton>
            <BrutalButton variant="outline" className="py-1 px-4 text-sm" onClick={() => handleNavClick('feed-section')}>{t.drops}</BrutalButton>
            <BrutalButton variant="outline" className="py-1 px-4 text-sm" onClick={() => navigateTo('learn')}>{t.learn}</BrutalButton>
            <BrutalButton variant="outline" className="py-1 px-4 text-sm" onClick={() => navigateTo('concepts')}>{t.dictionary}</BrutalButton>
            <BrutalButton variant="outline" className="py-1 px-4 text-sm" onClick={() => navigateTo('guides')}>{t.strategy}</BrutalButton>
            
            {connectedWallet ? (
              <div className="flex items-center gap-2">
                 <div className="bg-black dark:bg-white text-white dark:text-black font-mono font-bold px-3 py-1.5 border-2 border-black dark:border-white text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                    {connectedWallet.address}
                 </div>
                 <button 
                    onClick={handleDisconnect}
                    className="p-1.5 border-2 border-black dark:border-white bg-red-500 text-white hover:bg-red-600 transition-colors"
                    title="Disconnect"
                 >
                    <LogOut size={16} />
                 </button>
              </div>
            ) : (
              <BrutalButton 
                variant="primary" 
                className="py-1 px-4 text-sm flex items-center gap-2"
                onClick={() => setWalletModalOpen(true)}
              >
                {t.connect} <Wallet size={16} />
              </BrutalButton>
            )}

            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} className="ml-2" />
          </div>

          {/* Tablet & Mobile Menu Button - Visible on md, Hidden on lg */}
          <div className="flex gap-2 lg:hidden">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <button 
              className={`
                relative overflow-hidden p-2 border-2 border-black dark:border-white 
                bg-white dark:bg-black 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                transition-all duration-300 brutal-shadow-sm 
                w-10 h-10 flex items-center justify-center 
                active:scale-90 active:rotate-12
                group text-black dark:text-white
              `}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile/Tablet Menu Dropdown - Fixed positioning matching nav height */}
      {mobileMenuOpen && (
        <div className="fixed top-[62px] left-0 right-0 lg:hidden bg-[#3B82F6] border-b-2 border-black dark:border-white p-4 flex flex-col gap-2 z-40 shadow-xl">
           <BrutalButton variant="outline" fullWidth onClick={() => handleNavClick('about-section')}>{t.about}</BrutalButton>
           <BrutalButton variant="outline" fullWidth onClick={() => handleNavClick('feed-section')}>{t.drops}</BrutalButton>
           <BrutalButton variant="outline" fullWidth onClick={() => navigateTo('learn')}>{t.learn}</BrutalButton>
           <BrutalButton variant="outline" fullWidth onClick={() => navigateTo('concepts')}>{t.dictionary}</BrutalButton>
           <BrutalButton variant="outline" fullWidth onClick={() => navigateTo('guides')}>{t.strategy}</BrutalButton>
           
           {connectedWallet ? (
              <div className="flex items-center justify-between bg-black text-white p-3 font-mono font-bold border-2 border-white">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"/>
                    {connectedWallet.address}
                 </div>
                 <button onClick={handleDisconnect} className="text-red-500">
                    <LogOut size={20} />
                 </button>
              </div>
           ) : (
              <BrutalButton variant="secondary" fullWidth onClick={() => setWalletModalOpen(true)}>
                 {t.connect}
              </BrutalButton>
           )}
        </div>
      )}

      {/* VIEW: HOME */}
      {currentView === 'home' && (
        <>
          {/* Hero Section */}
          {/* CHANGED: min-h-[calc(100dvh-62px)] to min-h-[calc(100svh-62px)] to fix scroll jitter on mobile */}
          <header className="bg-white dark:bg-black relative overflow-hidden transition-colors min-h-[calc(100svh-62px)] md:min-h-[calc(100vh-62px)] w-full flex flex-col justify-center items-center py-[clamp(2rem,5vh,4rem)]">
            
            {/* Background Animations Omitted for Brevity - Keeping same as original */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
               {/* Celestial Arc & Stars code same as before */}
                <div className="absolute top-[8%] left-0 z-10 w-[clamp(100px,15vw,224px)] h-[clamp(100px,15vw,224px)] flex items-center justify-center">
                   <div className={`absolute inset-0 flex items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${!darkMode ? 'translate-y-0 translate-x-[30%] opacity-100 rotate-0' : 'translate-y-[200%] translate-x-[30%] opacity-0 rotate-45'}`}>
                      <div className="w-[80%] h-[80%] bg-[#EBF400] rounded-full shadow-[0_0_80px_20px_rgba(235,244,0,0.6)]"></div>
                   </div>
                   <div className={`absolute inset-0 flex items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${darkMode ? 'translate-y-0 translate-x-[30%] opacity-100 rotate-0' : '-translate-y-[200%] translate-x-[30%] opacity-0 -rotate-45'}`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[80%] h-[80%] text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.9)]" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                   </div>
                </div>
                <div className={`absolute inset-0 transition-all duration-1000 ${darkMode ? 'opacity-100' : 'opacity-0 translate-y-[-20px]'}`}>
                   {[
                     { t: '10%', l: '80%', s: 'w-6 h-6', d: '0s' }, { t: '20%', l: '90%', s: 'w-4 h-4', d: '1.5s' }, { t: '5%', l: '60%', s: 'w-3 h-3', d: '0.5s' },
                     { t: '15%', l: '10%', s: 'w-4 h-4', d: '2s' }, { t: '25%', l: '25%', s: 'w-5 h-5', d: '0.8s' }, { t: '70%', l: '15%', s: 'w-8 h-8', d: '1.2s' },
                     { t: '80%', l: '5%', s: 'w-4 h-4', d: '0.3s' }, { t: '60%', l: '10%', s: 'w-3 h-3', d: '1.8s' }, { t: '65%', l: '85%', s: 'w-6 h-6', d: '0.7s' },
                     { t: '85%', l: '75%', s: 'w-5 h-5', d: '1.1s' }, { t: '75%', l: '95%', s: 'w-4 h-4', d: '2.2s' }, { t: '40%', l: '40%', s: 'w-4 h-4', d: '1.6s' },
                     { t: '50%', l: '90%', s: 'w-3 h-3', d: '0.4s' }, { t: '30%', l: '50%', s: 'w-5 h-5', d: '2.5s' }, { t: '55%', l: '20%', s: 'w-3 h-3', d: '0.9s' },
                   ].map((star, i) => (<div key={i} className="absolute text-white animate-pulse" style={{ top: star.t, left: star.l, animationDelay: star.d }}><svg viewBox="0 0 24 24" fill="currentColor" className={`${star.s} drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`}><path d="M12 0C13.5 7 17 10.5 24 12C17 13.5 13.5 17 12 24C10.5 17 7 13.5 0 12C7 10.5 10.5 7 12 0Z" /></svg></div>))}
                </div>
            </div>

            <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none z-0" style={{backgroundImage: `linear-gradient(${darkMode ? '#fff' : '#000'} 2px, transparent 2px), linear-gradient(90deg, ${darkMode ? '#fff' : '#000'} 2px, transparent 2px)`, backgroundSize: '40px 40px' }}></div>

            <div className="w-full max-w-[1440px] px-[clamp(1rem,5vw,3rem)] relative z-20 flex flex-col items-center justify-center">
              <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center">
                
                <div className="inline-block bg-[#FF4D4D] text-white px-3 py-1 mb-[clamp(1.5rem,3vh,2rem)] border-2 border-black dark:border-white font-mono font-bold transform -rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                  BETA V.1.0
                </div>

                <h1 className="font-black mb-[clamp(1.5rem,3vh,2.5rem)] uppercase tracking-tight leading-[0.9] text-black dark:text-white text-[clamp(3rem,8vw,7.5rem)]">
                  {t.heroTitle}
                </h1>

                <p className="font-bold font-mono mb-[clamp(2rem,4vh,3rem)] max-w-2xl mx-auto text-black dark:text-gray-300 leading-normal text-[clamp(1rem,2.5vw,1.5rem)]">
                  {t.heroDesc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                  <BrutalButton 
                    variant="outline" 
                    className="w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-2"
                    onClick={() => navigateTo('learn')}
                  >
                      {t.heroBtnLearn} <BookOpen />
                  </BrutalButton>
                  <BrutalButton 
                    className="w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-2 border-black dark:border-white"
                    onClick={() => handleNavClick('feed-section')}
                  >
                      {t.heroBtnStart} <Target />
                  </BrutalButton>
                </div>
              </div>
            </div>

            {/* Ocean Waves */}
            <div className="absolute bottom-0 left-0 w-full h-[clamp(80px,12vh,200px)] overflow-hidden z-10 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave-slow">
                  <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#60A5FA" fillOpacity="1" d="M0,220 C350,150 500,300 720,270 C950,240 1150,150 1440,220 V320 H0 Z"></path>
                  </svg>
                  <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#60A5FA" fillOpacity="1" d="M0,220 C350,150 500,300 720,270 C950,240 1150,150 1440,220 V320 H0 Z"></path>
                  </svg>
              </div>

              <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave z-10">
                  <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#3B82F6" fillOpacity="1" d="M0,256 C300,350 500,150 720,200 C950,250 1200,350 1440,256 V320 H0 Z"></path>
                  </svg>
                  <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#3B82F6" fillOpacity="1" d="M0,256 C300,350 500,150 720,200 C950,250 1200,350 1440,256 V320 H0 Z"></path>
                  </svg>
              </div>
            </div>
          </header>

          {/* About Section */}
          <section id="about-section" className="bg-[#EBF400] text-black border-b-2 border-black dark:border-white py-16">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 flex flex-col items-center text-center">
                     <div className="w-28 h-28 mb-6">
                        <img 
                          src="https://github.com/rey-mystic/official-image/blob/main/Blue%20and%20White%20Modern%20Drop%20Typography%20Logo%20(1).png?raw=true" 
                          alt="Catch The Drops" 
                          className="w-full h-full object-contain"
                        />
                     </div>
                     <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4 leading-none">
                        {t.aboutTitle}
                     </h2>
                     <div className="w-24 h-2 bg-black mb-6"></div>
                  </div>
                  <div className="lg:col-span-7 font-mono text-lg md:text-xl font-bold leading-relaxed">
                     <p className="mb-6">
                        {t.aboutDesc1}
                     </p>
                     <p className="mb-8">
                        {t.aboutDesc2}
                     </p>
                     <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                        <div className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-white">
                           <MousePointerClick size={16} /> {t.curated}
                        </div>
                        <div className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-white">
                           <Zap size={16} /> {t.aiAnalysis}
                        </div>
                        <div className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-white">
                           <Target size={16} /> {t.strategyGuides}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          <Ticker />

          {/* Main Content Grid */}
          <main className="flex-grow container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20" id="feed-section">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sidebar Filters */}
              <aside className="lg:col-span-3">
                <div className="sticky top-20">
                  <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-4 brutal-shadow mb-8 transition-colors">
                    <h3 className="font-bold text-xl mb-4 border-b-2 border-black dark:border-white pb-2 flex items-center gap-2 text-black dark:text-white">
                      <Radio className="animate-pulse text-red-500"/> {t.filters}
                    </h3>
                    <div className="space-y-2">
                      {[
                        { label: t.allProtocols, type: FilterType.ALL },
                        { label: t.liveNow, type: FilterType.LIVE },
                        { label: t.upcoming, type: FilterType.UPCOMING },
                        { label: t.highPotential, type: FilterType.HIGH_POTENTIAL },
                      ].map((f) => (
                        <button
                          key={f.type}
                          onClick={() => setFilter(f.type)}
                          className={`
                            w-full text-left font-mono font-bold p-2 border-2 transition-all
                            ${filter === f.type 
                              ? 'bg-[#121212] text-white border-black dark:border-white translate-x-1 translate-y-1' 
                              : 'bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1 hover:translate-y-1'}
                          `}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Box */}
                  <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-4 brutal-shadow mb-8 transition-colors">
                     <h3 className="font-bold text-xl mb-4 border-b-2 border-black dark:border-white pb-2 flex items-center gap-2 text-black dark:text-white">
                        <Search size={20} className="text-[#3B82F6]" /> SEARCH
                     </h3>
                     <div className="relative">
                        <input 
                           type="text" 
                           placeholder={t.searchPlaceholder}
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white p-2 pl-2 font-mono text-sm focus:outline-none focus:bg-white dark:focus:bg-black transition-colors text-black dark:text-white placeholder-gray-500"
                        />
                     </div>
                  </div>

                  {/* Promo Box */}
                  <div className="bg-[#EBF400] border-2 border-black dark:border-white p-4 text-black brutal-shadow">
                    <h3 className="font-bold text-2xl uppercase mb-2">{t.proAccess}</h3>
                    <p className="font-mono text-sm mb-4">{t.proDesc}</p>
                    <BrutalButton variant="outline" fullWidth className="text-black dark:text-white dark:bg-black dark:border-white">{t.proUpgrade}</BrutalButton>
                  </div>
                </div>
              </aside>

              {/* Feed */}
              <section className="lg:col-span-6 space-y-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b-2 border-black dark:border-white pb-2 gap-2">
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-black dark:text-white">{t.dropsList}</h2>
                    <span className="font-mono font-bold bg-[#3B82F6] text-white px-2 border-2 border-black dark:border-white w-fit">{filteredAirdrops.length} {t.detected}</span>
                </div>

                {displayedAirdrops.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedAirdrops.map((drop) => (
                      <AirdropCard 
                        key={drop.id} 
                        data={drop}
                        onAnalyze={handleAnalyze} 
                        onDetails={handleViewDetails}
                        language={language}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-black dark:border-white bg-white dark:bg-gray-900 brutal-shadow">
                     <h3 className="text-xl font-bold uppercase mb-2 text-black dark:text-white">{t.noDrops}</h3>
                     <p className="font-mono text-gray-500">{t.noDropsDesc}</p>
                  </div>
                )}
                
                {filteredAirdrops.length > visibleCount && (
                  <div className="flex justify-center pt-8">
                    <BrutalButton variant="outline" className="gap-2 flex items-center" onClick={handleLoadMore}>
                      {t.loadMore} <ArrowRight />
                    </BrutalButton>
                  </div>
                )}
              </section>

              {/* Right Panel / Scanner */}
              <aside className="lg:col-span-3" id="scanner-section">
                <div className={`sticky top-20 transition-all duration-500 h-[600px] ${showScanner ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-50'}`}>
                    {showScanner ? (
                      <GeminiScanner initialQuery={scannerQuery} onClose={() => setShowScanner(false)} language={language} />
                    ) : (
                      <div 
                        className="bg-[#121212] border-2 border-black dark:border-white h-full flex flex-col items-center justify-center text-white cursor-pointer hover:bg-[#222] transition-colors brutal-shadow p-6 text-center"
                        onClick={() => setShowScanner(true)}
                      >
                        <Target size={64} className="mb-4 text-[#3B82F6]" />
                        <h3 className="text-2xl font-bold uppercase mb-2">{t.aiOffline}</h3>
                        <p className="font-mono text-sm text-gray-400">{t.aiActivate}</p>
                      </div>
                    )}
                </div>
              </aside>

            </div>
          </main>
        </>
      )}

      {/* VIEW: LEARN */}
      {currentView === 'learn' && (
        <LearnView 
            onNavigate={navigateTo} 
            language={language} 
        />
      )}

      {/* VIEW: GUIDES */}
      {currentView === 'guides' && (
        <GuidesView onNavigate={navigateTo} language={language} />
      )}
      
      {/* VIEW: CONCEPTS (New) */}
      {currentView === 'concepts' && (
        <ConceptsView onNavigate={navigateTo} language={language} />
      )}

      {/* Footer */}
      <footer className="bg-black text-white border-t-2 border-white py-12 mt-auto">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black uppercase mb-4 text-[#3B82F6]">{t.footerTitle}</h2>
            <p className="font-mono text-sm text-gray-400 max-w-md">
              {t.footerDesc}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl uppercase mb-4 border-b-2 border-white inline-block">{t.footerLinks}</h4>
            <ul className="space-y-2 font-mono text-sm">
              <li><button onClick={() => navigateTo('learn')} className="hover:text-[#3B82F6]">{t.footerEducation}</button></li>
              <li><button onClick={() => navigateTo('guides')} className="hover:text-[#3B82F6]">{t.strategyGuides}</button></li>
              <li><button onClick={() => navigateTo('concepts')} className="hover:text-[#3B82F6]">{t.footerDictionary}</button></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-xl uppercase mb-4 border-b-2 border-white inline-block">{t.footerSocial}</h4>
             <div className="flex gap-4">
                {/* X (Twitter) */}
                <a href="https://x.com/remisolasi_" target="_blank" rel="noopener noreferrer" 
                    className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center hover:bg-[#3B82F6] hover:text-white hover:border-white transition-all text-black">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>

                {/* Telegram */}
                <a href="https://t.me/catchsomedrop" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center hover:bg-[#3B82F6] hover:text-white hover:border-white transition-all text-black">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.293-.605.293l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                </a>

                {/* Discord */}
                <a href="https://discord.gg/NJ45EV4xka" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center hover:bg-[#3B82F6] hover:text-white hover:border-white transition-all text-black">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                </a>
             </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-12 pt-8 border-t border-gray-800 text-center font-mono text-xs text-gray-500">
           © 2025 CATCH THE DROPS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default App;
