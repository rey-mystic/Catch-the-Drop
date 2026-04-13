import React from 'react';
import { BrutalButton } from './BrutalButton';
import { ArrowLeft, Lock, Activity, Search, AlertTriangle, Wallet, ShieldAlert, Megaphone, Users, Radio, Cpu, Coins, CheckCircle, TrendingUp, X } from 'lucide-react';
import { Language } from '../types';

interface GuidesViewProps {
  onNavigate: (view: 'home' | 'learn' | 'guides') => void;
  language?: Language;
}

export const GuidesView: React.FC<GuidesViewProps> = ({ onNavigate, language = 'en' }) => {
  const isId = language === 'id';

  const t = {
      manualTitle: isId ? <>Manual <span className="text-[#3B82F6]">Pemburu</span></> : <>Catcher's <span className="text-[#3B82F6]">Manual</span></>,
      jpStrategy: isId ? "Strategi Jackpot Airdrop 2025-2026" : "2025-2026 Airdrop Jackpot Strategy",
      update: isId ? "Update Terbaru • Masterclass" : "Latest Update • Masterclass",
      step1Title: isId ? "Pilih Proyek Potensial" : "Select Potential Projects",
      step1Desc: isId ? "Ikuti Smart Money. Cari proyek yang didukung oleh VC Tier-1:" : "Follow Smart Money. Find projects backed by Tier-1 VCs:",
      warning: isId ? "PERINGATAN: Pendanaan besar bukan jaminan. Terlalu hype = kompetisi tinggi. Jadilah user awal paling aktif untuk menang." : "WARNING: Big funding isn't a guarantee. Too much hype = high competition. Be the most active early user to win.",
      step2Title: isId ? "Dapatkan Role Discord" : "Obtain Discord Roles",
      usuallyFree: isId ? "BIASANYA GRATIS TAPI HARUS RAJIN" : "USUALLY FREE TO DO BUT IT TAKES SOME EFFORT",
      step2List: isId ? [
          "Klaim role **OG/Early Supporter, dll.** saat peluncuran (jika ada).",
          "Aktif di-chat dan bantu member lain (Jangan Spam).",
          "Ikut segala aktivitas (Online meeting, games, dll.).",
          "Ikut kontes jika hadiahnya role bagus.",
          "Rajin bikin konten yang berkualitas."
      ] : [
          "Claim **OG/Early Supporter, etc.** roles at early launch (if available).",
          "Active and help members (No Spam).",
          "Join in every activity (AMA, games, etc.)",
          "Participate in contest if its a good roles reward.",
          "Make some HQ content."
      ],
      step2Key: isId ? "🔑 Semakin langka role, semakin besar alokasi airdrop." : "🔑 The rarer the role, the bigger the airdrop allocation.",
      step3Title: isId ? <>Jadilah Influencer <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#EBF400]">"Yapper"</span></> : <>Become a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#EBF400]">"Yapper"</span> Influencer</>,
      step3Desc: isId ? "Akhir-akhir ini, proyek punya alokasi khusus untuk Konten Kreator. Kompetisi ketat; Anda perlu jadi mikro-influencer." : "At this circumstance, projects have specific allocations for Content Creators. Competition is tight; you need to become a micro-influencer.",
      trackerTool: isId ? "Alat pelacak yang dipakai proyek untuk menilai aktivitas Twitter Anda." : "Tracker tools used by projects to score your Twitter activity.",
      taskList: isId ? "// DAFTAR TUGAS ANDA:" : "// YOUR TASK LIST:",
      taskItems: isId ? [
          "Buat Thread edukatif/menarik.",
          "Engagement Organik (Like/Reply).",
          "Dapatkan 'Smart Followers' (Mutualan dengan influencer di X dan Katio/Cookie)."
      ] : [
          "Create educational/engaging Threads.",
          "Organic Engagement (Like/Reply).",
          "Get 'Smart Followers' (Mutuals with influencer on X and Kaito/Cookie)."
      ],
      yappingQuote: isId ? "\"Yapping awal bisa cetak poin besar di Kaito.\"" : "\"Early yapping can score huge points on Kaito.\"",
      step4Title: isId ? "Testnet (Gratis)" : "Testnet (Free)",
      step4Desc: isId ? "Tes produk pakai token palsu (faucet)." : "Test products using fake tokens (faucet).",
      step4Items: isId ? ["• Interaksi Smart Contract", "• Mint NFT (Biaya Faucet)", "• Jalankan ekstensi DePIN"] : ["• Interact with Smart Contracts", "• Mint NFT (Faucet fee)", "• Run DePIN extensions"],
      step4Note: isId ? "Reward seringkali kecil karena terlalu ramai, tapi wajib sebagai syarat dasar." : "Rewards are often small/diluted due to overcrowding, but mandatory as a baseline requirement.",
      step5Title: isId ? "Mainnet (Uang Asli)" : "Mainnet (Real Money)",
      step5Desc: isId ? "Interaksi pakai dana riil. Risiko Tinggi, Reward Tinggi." : "Interaction using real funds. High Risk, High Reward.",
      step5Items: isId ? ["• Swap / Bridge / Liquidity", "• Hold Token & Staking", "• Jalankan Node (VPS)"] : ["• Swap / Bridge / Liquidity", "• Hold Tokens & Staking", "• Run Node (VPS)"],
      step5Note: isId ? "Butuh modal. Pastikan manajemen risiko baik." : "Capital required. Ensure good risk management.",
      summaryTitle: isId ? "RINGKASAN: RUMUS MENANG" : "SUMMARY: THE WINNING FORMULA",
      summaryItems: isId ? ["Kontributor Awal (Role Discord)", "Tugas/Event Aktif", "Yapping di X (Kaito/Cookies)", "Jejak On-Chain (Mainnet)"] : ["Early Contributor (Discord Role)", "Active Task/Event", "Yapping on X (Kaito/Cookies)", "On-Chain Footprint (Mainnet)"],
      checkTitle: isId ? "Cek Cepat" : "Quick Check",
      needScripts: isId ? "Butuh Script?" : "Need Scripts?",
      getRepo: isId ? "Buka Github Repo" : "Get Github Repo",
      returnDash: isId ? "Kembali ke Dashboard" : "Return to Dashboard"
  }

  const guides = isId ? [
    {
      title: "Kebersihan Wallet 101",
      desc: "Jangan pernah gunakan wallet holding utama untuk berburu airdrop. Buat wallet khusus 'Burner'. Revoke approval secara rutin menggunakan Revoke.cash untuk mencegah drain.",
      tags: ["Keamanan", "Setup"],
      difficulty: "Esensial",
      icon: <Wallet className="text-[#3B82F6]" size={32} />
    },
    {
      title: "Pertahanan Sybil",
      desc: "Protokol membenci bot. Hindari deteksi 'Sybil' dengan memvariasikan jumlah transaksi, hari aktivitas, dan hindari mengirim dana antar wallet pemburu Anda sendiri.",
      tags: ["Strategi", "Keamanan"],
      difficulty: "Advanced",
      icon: <Lock className="text-[#EBF400]" size={32} />
    },
    {
      title: "Volume & Frekuensi",
      desc: "Kebanyakan drop retroaktif atau mainnet punya tingkatan. Volume lebih besar dan hari/bulan aktif unik lebih banyak adalah batas umum. Jangan cuma swap sekali lalu pergi.",
      tags: ["Hunting", "Kriteria"],
      difficulty: "Medium",
      icon: <Activity className="text-[#FF4D4D]" size={32} />
    },
    {
      title: "Mencari Alpha",
      desc: "Jangan tunggu influencer. Cek bagian 'Raises' di DefiLlama untuk melihat protokol mana yang dapat uang VC tapi belum punya token. Itu target list Anda.",
      tags: ["Riset", "Alpha"],
      difficulty: "Hard",
      icon: <Search className="text-[#3B82F6]" size={32} />
    },
    {
      title: "AWAS SCAM!",
      desc: "Jangan pernah bagikan seed phrase wallet Anda kepada siapapun. Abaikan DM 'admin' palsu; admin atau moderator asli tidak akan pernah DM duluan. Selalu cek ulang link.",
      tags: ["Keamanan", "Peringatan"],
      difficulty: "KRITIS",
      icon: <ShieldAlert className="text-[#FF4D4D]" size={32} />
    }
  ] : [
    {
      title: "Wallet Hygiene 101",
      desc: "Never use your main holding wallet for airdrop hunting. Create specialized 'Burner' wallets. Revoke approvals regularly using Revoke.cash to prevent drains.",
      tags: ["Security", "Setup"],
      difficulty: "Essential",
      icon: <Wallet className="text-[#3B82F6]" size={32} />
    },
    {
      title: "The Sybil Defense",
      desc: "Protocols hate bots. Avoid 'Sybil' detection by varying your transaction amounts, days of activity, and avoiding sending funds between your own hunting wallets.",
      tags: ["Strategy", "Safety"],
      difficulty: "Advanced",
      icon: <Lock className="text-[#EBF400]" size={32} />
    },
    {
      title: "Volume & Frequency",
      desc: "Most retroactive or mainnet drops have tiers. more volume and more unique active days/months are common cutoffs. Don't just swap once and leave.",
      tags: ["Hunting", "Criteria"],
      difficulty: "Medium",
      icon: <Activity className="text-[#FF4D4D]" size={32} />
    },
    {
      title: "Finding Alpha",
      desc: "Don't wait for influencers. Check DefiLlama 'Raises' section to see which protocols raised VC money but don't have a token yet. That is your target list.",
      tags: ["Research", "Alpha"],
      difficulty: "Hard",
      icon: <Search className="text-[#3B82F6]" size={32} />
    },
    {
      title: "SCAM ALERT!",
      desc: "Never share your wallet’s seed phrase with anyone, it gives full access to your wallet. Ignore fake “admin” DMs; real admins or moderators will never message you first. Always double-check links.",
      tags: ["Security", "Warning"],
      difficulty: "CRITICAL",
      icon: <ShieldAlert className="text-[#FF4D4D]" size={32} />
    }
  ];

  const checklistItems = isId ? [
    "Sudah revoke kontrak lama bulan ini?",
    "Saldo ETH > 0.01 di mainnet? (Filter Sybil)",
    "Sudah vote di proposal governance Snapshot?",
    "Pakai VPN untuk drop yang diblokir geo?"
  ] : [
    "Have you revoked old contracts this month?",
    "Is your ETH balance > 0.01 on mainnet? (Sybil filter)",
    "Did you vote on Snapshot governance proposals?",
    "Are you using a VPN for geo-blocked drops?"
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20 animate-in slide-in-from-right-8 duration-500 min-h-[85dvh] md:min-h-[85vh]">
      
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <button 
          onClick={() => onNavigate('learn')} 
          className="bg-white dark:bg-black border-2 border-black dark:border-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={24} className="text-black dark:text-white" />
        </button>
        <h1 className="text-3xl md:text-5xl font-black uppercase text-black dark:text-white">
          {t.manualTitle}
        </h1>
      </div>

      {/* --- NEW SECTION: STRATEGI JP 2025 --- */}
      <section className="mb-24 relative">
        <div className="bg-black text-[#EBF400] inline-block px-4 py-2 border-2 border-[#EBF400] transform -rotate-2 mb-6 shadow-[4px_4px_0px_0px_#EBF400]">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{t.jpStrategy}</h2>
            <span className="font-mono text-sm text-white">{t.update}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* 1. VC Selection (Wide) */}
            {/* FORCE TEXT-BLACK to prevent white text in dark mode on yellow background */}
            <div className="md:col-span-8 bg-[#EBF400] border-4 border-black p-6 md:p-8 brutal-shadow relative group hover:translate-y-[-4px] transition-transform text-black">
                <div className="absolute -top-4 -right-4 bg-black text-white w-12 h-12 flex items-center justify-center font-black border-2 border-white rounded-full z-10 text-xl">1</div>
                <h3 className="text-2xl font-black uppercase mb-4 text-black flex items-center gap-2">
                    <TrendingUp className="text-black" /> {t.step1Title}
                </h3>
                <p className="font-mono font-bold mb-4 text-black">{t.step1Desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {['Pantera Capital', 'Paradigm', 'Coinbase Ventures', 'Animoca Brands', 'Multicoin', 'Binance Labs', 'Dragonfly', 'Sequoia'].map(vc => (
                        <span key={vc} className="bg-white border-2 border-black px-3 py-1 font-bold text-sm uppercase transform hover:scale-105 transition-transform cursor-default text-black">{vc}</span>
                    ))}
                    <a 
                      href="https://cryptorank.io/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-black text-white px-3 py-1 font-bold text-sm uppercase cursor-pointer hover:underline decoration-[#EBF400]"
                    >
                      Check CryptoRank.io ↗
                    </a>
                </div>
                <div className="bg-black/10 border-2 border-black p-4 flex items-start gap-3">
                    <AlertTriangle className="shrink-0 text-black" />
                    <p className="font-mono text-xs md:text-sm font-bold text-black leading-tight">
                        {t.warning}
                    </p>
                </div>
            </div>

            {/* 2. Discord Roles (Tall) */}
            <div className="md:col-span-4 bg-[#3B82F6] border-4 border-black p-6 md:p-8 brutal-shadow text-white relative group hover:translate-y-[-4px] transition-transform">
                <div className="absolute -top-4 -left-4 bg-white text-black w-12 h-12 flex items-center justify-center font-black border-2 border-black rounded-full z-10 text-xl">2</div>
                <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                    <Users className="text-white" /> {t.step2Title}
                </h3>
                <div className="font-mono text-sm space-y-3">
                    <p className="bg-black/20 p-2 border border-white/50">{t.usuallyFree}</p>
                    <ul className="space-y-2 list-disc pl-4">
                        {isId 
                            ? t.step2List.map((item, i) => <li key={i} dangerouslySetInnerHTML={{__html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />)
                            : t.step2List.map((item, i) => <li key={i} dangerouslySetInnerHTML={{__html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />)
                        }
                    </ul>
                    <p className="font-bold border-t border-white pt-2 mt-2">
                        {t.step2Key}
                    </p>
                </div>
            </div>

            {/* 3. On-Chain Testnet (Split) - MOVED & RENUMBERED TO 3 */}
            <div className="md:col-span-6 bg-white dark:bg-[#121212] border-4 border-black dark:border-white p-6 md:p-8 brutal-shadow relative">
                 <div className="absolute -top-4 -left-4 bg-gray-200 text-black w-10 h-10 flex items-center justify-center font-black border-2 border-black rounded-full z-10">3</div>
                 <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2 text-black dark:text-white">
                    <Cpu /> {t.step4Title}
                 </h3>
                 <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t.step4Desc}
                 </p>
                 <ul className="font-mono text-sm space-y-2 text-black dark:text-white font-bold">
                    {t.step4Items.map((item, i) => <li key={i}>{item}</li>)}
                 </ul>
                 <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-2 text-xs font-mono border-l-4 border-gray-400 text-black dark:text-gray-300">
                    {t.step4Note}
                 </div>
            </div>

            {/* 4. On-Chain Mainnet (Split) - MOVED & RENUMBERED TO 4 */}
            <div className="md:col-span-6 bg-white dark:bg-[#121212] border-4 border-black dark:border-white p-6 md:p-8 brutal-shadow relative">
                 <div className="absolute -top-4 -left-4 bg-[#FF4D4D] text-white w-10 h-10 flex items-center justify-center font-black border-2 border-black rounded-full z-10">4</div>
                 <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2 text-black dark:text-white">
                    <Coins className="text-[#FF4D4D]" /> {t.step5Title}
                 </h3>
                 <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t.step5Desc}
                 </p>
                 <ul className="font-mono text-sm space-y-2 text-black dark:text-white font-bold">
                    {t.step5Items.map((item, i) => <li key={i}>{item}</li>)}
                 </ul>
                 <div className="mt-4 bg-red-50 dark:bg-red-900/20 p-2 text-xs font-mono border-l-4 border-[#FF4D4D] text-black dark:text-gray-300">
                    {t.step5Note}
                 </div>
            </div>

            {/* 5. Social / Yapping (Wide Center) - MOVED & RENUMBERED TO 5 */}
            <div className="md:col-span-12 bg-black text-white border-4 border-white p-6 md:p-8 brutal-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 bg-[#FF4D4D] text-black font-black uppercase text-xs border-l-2 border-b-2 border-white">Hot Trend 2025</div>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                             <div className="bg-white text-black w-10 h-10 flex items-center justify-center font-black border-2 border-white rounded-full text-lg shrink-0">5</div>
                             <h3 className="text-3xl md:text-4xl font-black uppercase leading-none">
                                {t.step3Title}
                             </h3>
                        </div>
                        <p className="font-mono text-gray-300 mb-4">
                            {t.step3Desc}
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <div className="border border-white p-3">
                                <h4 className="font-bold text-[#3B82F6] mb-1">KAITO AI / COOKIES</h4>
                                <p className="text-xs font-mono text-gray-400">{t.trackerTool}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full bg-[#1a1a1a] border-2 border-dashed border-gray-600 p-4 font-mono text-sm">
                        <p className="text-[#FF4D4D] mb-2 font-bold">{t.taskList}</p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex gap-2"><Megaphone size={16}/> {t.taskItems[0]}</li>
                            <li className="flex gap-2"><Activity size={16}/> {t.taskItems[1]}</li>
                            <li className="flex gap-2"><Users size={16}/> {t.taskItems[2]}</li>
                        </ul>
                        <p className="mt-4 text-xs text-gray-500 italic">{t.yappingQuote}</p>
                    </div>
                </div>
            </div>

            {/* 6. Conclusion Banner */}
            <div className="md:col-span-12 bg-[#4ADE80] border-4 border-black p-6 relative brutal-shadow">
                <h3 className="text-2xl font-black uppercase mb-4 text-black text-center border-b-4 border-black pb-2">
                    {t.summaryTitle}
                </h3>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-mono font-bold text-black text-sm md:text-base">
                    {t.summaryItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2"><CheckCircle className="fill-black text-[#4ADE80]"/> {item}</div>
                    ))}
                </div>
            </div>

        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content: Guides List */}
        <div className="md:col-span-2 space-y-6">
          {guides.map((guide, idx) => (
            <div key={idx} className={`bg-white dark:bg-[#121212] border-l-8 ${guide.difficulty === 'CRITICAL' ? 'border-l-[#FF4D4D]' : 'border-l-[#3B82F6]'} border-y-2 border-r-2 border-black dark:border-white p-6 md:p-8 brutal-shadow hover:translate-x-2 transition-transform`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-black dark:bg-white p-2 border-2 border-black dark:border-white">{guide.icon}</div>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-black dark:text-white">{guide.title}</h3>
                </div>
                <span className={`font-mono text-xs font-bold px-2 py-1 uppercase text-black dark:text-white border-2 border-black dark:border-white ${guide.difficulty === 'CRITICAL' ? 'bg-[#FF4D4D] text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  {guide.difficulty}
                </span>
              </div>
              <p className="font-mono text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {guide.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                {guide.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase bg-[#EBF400] text-black px-2 py-1 border border-black">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: Checklist */}
        <div className="md:col-span-1">
          <div className="sticky top-20 bg-[#EBF400] border-2 border-black dark:border-white p-6 brutal-shadow">
            <h3 className="text-xl md:text-2xl font-black uppercase mb-4 flex items-center gap-2 text-black">
              <AlertTriangle className="text-black" />
              {t.checkTitle}
            </h3>
            <div className="space-y-4 font-mono text-sm text-black">
              {checklistItems.map((item, i) => (
                  <label key={i} className="flex items-start gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                    <input type="checkbox" className="mt-1 w-4 h-4 border-2 border-black shrink-0" />
                    <span>{item}</span>
                  </label>
              ))}
            </div>
            
            <div className="mt-8 border-t-2 border-black pt-4">
              <p className="font-bold uppercase mb-2 text-black">{t.needScripts}</p>
              <BrutalButton fullWidth variant="primary" className="text-sm">
                {t.getRepo}
              </BrutalButton>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <BrutalButton variant="outline" className="px-8 py-4" onClick={() => onNavigate('home')}>
          {t.returnDash}
        </BrutalButton>
      </div>
    </div>
  );
};