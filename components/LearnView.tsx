
import React, { useState } from 'react';
import { BrutalButton } from './BrutalButton';
import { Gift, Target, Users, Zap, HelpCircle, ArrowRight, MessageSquare, Smartphone, Wifi, Mail, Wallet, Share2, CreditCard, LayoutTemplate, Bot, Video, Mic, ExternalLink, Image, Layers, Server, Book, Sparkles, Globe, ChevronUp, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { GeminiScanner } from './GeminiScanner';

interface LearnViewProps {
  onNavigate: (view: 'home' | 'learn' | 'guides' | 'concepts') => void;
  language?: Language;
}

export const LearnView: React.FC<LearnViewProps> = ({ onNavigate, language = 'en' }) => {
  // Independent state for concept accordion only
  const [openConcepts, setOpenConcepts] = useState<number[]>([]);
  
  // Toggle functions (Click interaction - Toggles open/close, preserves others)
  const toggleConcept = (index: number) => {
    setOpenConcepts(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  
  // Data Logic
  const isId = language === 'id';

  const t = {
      academyTitle: isId ? "Akademi Airdrop 101" : "Airdrop Academy 101",
      titleMain: isId ? <>APA Itu <span className="text-[#3B82F6] underline decoration-4 decoration-black dark:decoration-white underline-offset-8">Airdrop?</span></> : <>WHAT Is An <span className="text-[#3B82F6] underline decoration-4 decoration-black dark:decoration-white underline-offset-8">Airdrop?</span></>,
      descMain: isId ? <>Uang gratis? Trik marketing? Mekanisme desentralisasi? <br/> <span className="font-bold bg-black text-white dark:bg-white dark:text-black px-1">Ya.</span></> : <>Free money? Marketing stunt? Decentralization mechanism? <br/><span className="font-bold bg-black text-white dark:bg-white dark:text-black px-1">Yes.</span></>,
      definitionTitle: isId ? "Definisi" : "The Definition",
      definitionText: isId ? "Airdrop adalah distribusi token gratis dari proyek kripto kepada pengguna yang berpartisipasi dalam aktivitas awal—seperti menguji produk, memberi feedback, melakukan transaksi on-chain, bergabung dengan komunitas, atau berkontribusi secara bermakna. Ini biasanya melibatkan aktivitas seperti partisipasi testnet, bridging, staking, menyediakan likuiditas, menjalankan node/validator, berinteraksi di platform seperti X (Kaito, Cookie, dll), atau mendapatkan role tertentu di komunitas Discord proyek." : "An airdrop is the free distribution of tokens from a crypto project to users who participate in early activities—such as testing their product, providing feedback, performing on-chain transactions, joining the community, or contributing in meaningful ways. It typically involves activities such as testnet participation, bridging, staking, providing liquidity, running nodes or validators, engaging on platforms like X (Kaito, Cookie, etc.), or obtaining specific roles in the project's Discord community.",
      objectiveTitle: isId ? "Tujuannya" : "The Objective",
      obj1Title: isId ? "Perluas Adopsi User" : "Expand User Adoption",
      obj1Desc: isId ? "Menarik pengguna baru dan meningkatkan aktivitas on-chain." : "Attract new users and increase on-chain activity.",
      obj2Title: isId ? "Perkuat Ekosistem" : "Solidify Ecosystem",
      obj2Desc: isId ? "Memperkenalkan produk secara luas dan memperkuat ekosistem sebelum peluncuran token." : "Introduce the product broadly and solidify the ecosystem ahead of the token launch.",
      obj3Title: isId ? "Reward Pendukung" : "Reward Supporters",
      obj3Desc: isId ? "Mengapresiasi kontributor komunitas yang membantu menumbuhkan ekosistem." : "Appreciate community contributors who help grow the ecosystem.",
      knowDrops: isId ? <>Kenali <span className="bg-[#EBF400] text-black px-2">Drops</span> Anda</> : <>Know Your <span className="bg-[#EBF400] text-black px-2">Drops</span></>,
      beforeStart: isId ? <>Sebelum<br/>Mulai</> : <>Before<br/>You Start</>,
      prepLabel: isId ? "PERSIAPAN" : "PREPARATION",
      setupAccount: isId ? "SIAPKAN AKUN ANDA" : "SET UP YOUR ACCOUNT",
      setupSub: isId ? "Ikuti langkah ini untuk memulai perjalananmu" : "Follow these steps to start your journey",
      keyConcepts: isId ? <>Konsep<br/>Kunci</> : <>Key<br/>Concepts</>,
      zeroHero: isId ? "DARI NOL KE PRO" : "FROM ZERO TO HERO",
      fullDict: isId ? "LIHAT KAMUS LENGKAP" : "VIEW FULL DICTIONARY",
      ctaTitle: isId ? "Siap masuk lebih dalam?" : "Ready to go deeper?",
      ctaDesc: isId ? "Memahami dasar hanyalah langkah pertama. Pelajari strategi lanjutan untuk berburu secara efisien dan hindari terdeteksi Sybil." : "Understanding the basics is just step one. Learn the advanced strategies to hunt efficiently and avoid getting Sybil flagged.",
      ctaBtn: isId ? "Pelajari Lagi!" : "Learn It More!",
      proTip: isId ? "Pro Tip:" : "Pro Tip:",
      proTipPrep: isId ? "Siapkan item ini sekali, gunakan untuk setiap drop." : "Prepare these items once, use them for every drop."
  }

  const prepItems = isId ? [
    {
      icon: <Smartphone size={20} />,
      bg: "bg-black text-white dark:bg-white dark:text-black",
      title: "Perangkat Utama",
      desc: "Smartphone (praktis) dan Laptop/PC (lebih nyaman untuk multitasking)."
    },
    {
      icon: <Wifi size={20} />,
      bg: "bg-[#3B82F6] text-white",
      title: "Internet",
      desc: "Koneksi internet stabil."
    },
    {
      icon: <Mail size={20} />,
      bg: "bg-[#EBF400] text-black",
      title: "Email",
      desc: "Akun email aktif (diutamakan Gmail)."
    },
    {
      icon: <Share2 size={20} />,
      bg: "bg-white border-2 border-black text-black",
      title: "Akun Sosial",
      desc: "Discord, Telegram, Twitter/X."
    },
    {
      icon: <Wallet size={20} />,
      bg: "bg-[#FF4D4D] text-white",
      title: "Wallet Web3",
      desc: "Wallet Kripto/Web3 seperti Metamask, Rabby Wallet, OKX Wallet, dll. (Instal ekstensi browser jika pakai PC/laptop. Di HP, unduh dari Play Store/App Store.)"
    },
    {
      icon: <Globe size={20} />,
      bg: "bg-green-600 text-white",
      title: "Akun CEX Global",
      desc: "Platform seperti Binance, OKX, Bybit, KuCoin, atau MEXC. Digunakan untuk beli kripto untuk aktivitas airdrop (ETH, BNB, dll) atau untuk mencairkan airdrop nantinya."
    },
    {
      icon: <CreditCard size={20} />,
      bg: "bg-green-600 text-white",
      title: "Akun CEX Lokal",
      desc: "Platform seperti Pintu, Bittime, Tokocrypto, atau Reku. Digunakan untuk deposit Rupiah awal atau menarik profit ke rekening bank Indonesia."
    }
  ] : [
    {
      icon: <Smartphone size={20} />,
      bg: "bg-black text-white dark:bg-white dark:text-black",
      title: "Main Devices",
      desc: "A smartphone (practical) and a laptop/PC (more comfortable for multitasking)."
    },
    {
      icon: <Wifi size={20} />,
      bg: "bg-[#3B82F6] text-white",
      title: "Internet",
      desc: "Stable internet connection."
    },
    {
      icon: <Mail size={20} />,
      bg: "bg-[#EBF400] text-black",
      title: "Email",
      desc: "Active email account (preferably Gmail)."
    },
    {
      icon: <Share2 size={20} />,
      bg: "bg-white border-2 border-black text-black",
      title: "Social Accounts",
      desc: "Discord, Telegram, Twitter/X."
    },
    {
      icon: <Wallet size={20} />,
      bg: "bg-[#FF4D4D] text-white",
      title: "Web3 Wallet",
      desc: "Crypto/Web3 wallet such as Metamask, Rabby Wallet, OKX Wallet, etc. (Install the browser extension if using a PC/laptop. On mobile, download it from the Play Store or App Store.)"
    },
    {
      icon: <Globe size={20} />,
      bg: "bg-green-600 text-white",
      title: "Global CEX Account",
      desc: "Platforms such as Binance, OKX, Bybit, KuCoin, or MEXC. These are primarily used to buy crypto needed for airdrop activities, such as ETH, BNB, MATIC, USDT, or other gas-fee tokens. You will also use global CEXs to send tokens to your Web3 wallet for bridging, swapping, providing liquidity, or other on-chain tasks. Later, when you receive an airdrop and the token lists on an exchange, global CEXs are also used to sell or withdraw your airdrop rewards."
    },
    {
      icon: <CreditCard size={20} />,
      bg: "bg-green-600 text-white",
      title: "Local CEX Account",
      desc: "Platforms such as Pintu, Bittime, Tokocrypto, or Reku. These are used for initial IDR (Rupiah) deposits, which can be transferred to a global CEX or directly to your Web3 wallet after conversion. Local CEXs are also needed when you want to withdraw profits back to your Indonesian bank account or e-wallet after selling your airdrop tokens on global exchanges."
    }
  ];

  const tutorialSteps = isId ? [
    {
        title: "Membuat Wallet Kripto/Web3",
        icon: <Wallet size={24} />,
        iconBg: "bg-[#FF4D4D]",
        content: (
            <>
                <p className="font-bold mb-4 text-lg text-black dark:text-white">Contoh: Metamask</p>
                <ol className="list-decimal pl-6 space-y-3 font-mono text-base text-gray-800 dark:text-gray-200 mb-6 marker:font-bold marker:text-black dark:marker:text-white">
                    <li><span className="font-bold">Unduh Metamask</span> dari Play Store/App Store (pastikan sumber resmi). Unduh ekstensi browser untuk pengguna PC.</li>
                    <li>Buka aplikasi → pilih <span className="font-bold">Create New Wallet</span>.</li>
                    <li>Buat password lokal untuk membuka aplikasi.</li>
                    <li><span className="bg-[#FF4D4D] text-white px-2 py-0.5 font-bold">KRITIS:</span> Catat 12 kata Seed Phrase di kertas dan simpan aman.</li>
                    <li>Pilih jaringan yang sesuai (Ethereum, BNB Chain, Polygon, dll).</li>
                </ol>
                <div className="bg-[#EBF400]/20 border-l-4 border-[#EBF400] p-5 text-base font-mono text-gray-800 dark:text-gray-200">
                    <span className="block font-bold mb-1 text-lg">Pro Tip:</span>
                    Gunakan <span className="font-bold">wallet baru khusus airdrop</span> agar aman dari risiko hack.
                </div>
            </>
        )
    },
    {
        title: "Membuat Akun CEX Global",
        icon: <Globe size={24} />,
        iconBg: "bg-[#3B82F6]",
        content: (
            <>
                <p className="font-bold mb-4 text-lg text-black dark:text-white">Opsi CEX Global:</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {['Binance', 'Bybit', 'OKX', 'KuCoin', 'MEXC', 'Bitget'].map(cex => (
                        <span key={cex} className="bg-gray-100 dark:bg-gray-800 border border-black dark:border-white px-3 py-1 text-sm font-mono font-bold">{cex}</span>
                    ))}
                </div>
                <ol className="list-decimal pl-6 space-y-3 font-mono text-base text-gray-800 dark:text-gray-200 mb-6 marker:font-bold marker:text-black dark:marker:text-white">
                    <li>Buka website resmi atau unduh aplikasi.</li>
                    <li>Klik <strong>“Register”</strong>. Daftar dengan email atau nomor HP.</li>
                    <li><strong>Verifikasi Email / HP</strong> dengan kode OTP.</li>
                    <li><strong>Lakukan KYC</strong> (Upload KTP & Selfie).</li>
                    <li><strong>Aktifkan Keamanan Ekstra:</strong> Google Authenticator (2FA).</li>
                </ol>
            </>
        )
    },
    {
        title: "Membuat Akun CEX Lokal",
        icon: <CreditCard size={24} />,
        iconBg: "bg-green-600",
        content: (
            <>
                <p className="font-bold mb-4 text-lg text-black dark:text-white">Contoh: Pintu (pintu.co.id)</p>
                <ol className="list-decimal pl-6 space-y-3 font-mono text-base text-gray-800 dark:text-gray-200 mb-6 marker:font-bold marker:text-black dark:marker:text-white">
                    <li>Unduh Pintu dari Play Store/App Store.</li>
                    <li>Klik Daftar → masukkan email & password.</li>
                    <li>Verifikasi email & nomor HP.</li>
                    <li>KYC → upload KTP & selfie.</li>
                    <li>Deposit/tarik rupiah via transfer bank & e-wallet.</li>
                </ol>
            </>
        )
    },
    {
        title: "Setup Identitas Sosial",
        icon: <Share2 size={24} />,
        iconBg: "bg-purple-600",
        content: (
            <>
                <div className="mb-8">
                    <h4 className="font-bold text-xl uppercase mb-3 flex items-center gap-2"><Target size={20}/> Buat Akun Galxe</h4>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-3">Buka galxe.com, connect wallet, dan lengkapi profil. Banyak kampanye airdrop ada di sini.</p>
                </div>

                <div className="mb-8">
                    <h4 className="font-bold text-xl uppercase mb-3 flex items-center gap-2"><MessageSquare size={20}/> Buat Akun Discord</h4>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-3">Wajib untuk bergabung dengan server proyek dan mendapatkan role.</p>
                </div>

                <div>
                    <h4 className="font-bold text-xl uppercase mb-3 flex items-center gap-2"><Globe size={20}/> Buat Akun Twitter/X</h4>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-3">Wajib untuk tugas follow/retweet dan memantau update.</p>
                </div>
            </>
        )
    },
    {
        title: "Platform Pendukung Lain",
        icon: <LayoutTemplate size={24} />,
        iconBg: "bg-gray-800",
        content: (
            <>
                <div className="flex gap-4 flex-wrap">
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-2 border-black dark:border-white font-mono font-bold text-base">Zealy.io</div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-2 border-black dark:border-white font-mono font-bold text-base">Guild.xyz</div>
                </div>
                <p className="mt-4 font-mono text-base text-gray-700 dark:text-gray-300">Digunakan untuk misi komunitas. Biasanya interaksi web, tanpa download.</p>
            </>
        )
    },
    {
        title: "Alat AI untuk Berburu Airdrop",
        icon: <Bot size={24} />,
        iconBg: "bg-pink-600",
        content: (
            <div className="space-y-6 font-mono text-base">
                <div>
                    <strong className="block mb-2 flex items-center gap-2 text-lg"><Bot size={18}/> AI Universal:</strong>
                    <p className="text-gray-800 dark:text-gray-200">ChatGPT, Gemini, DeepSeek, Grok</p>
                </div>
                <div>
                    <strong className="block mb-2 flex items-center gap-2 text-lg"><Video size={18}/> Gambar & Video:</strong>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        <a href="https://www.krea.ai/" className="hover:underline text-[#3B82F6] font-bold">Krea</a>, <a href="https://runwayml.com/" className="hover:underline text-[#3B82F6] font-bold">Runwayml</a>, <a href="https://dreamina.capcut.com/" className="hover:underline text-[#3B82F6] font-bold">Dreamina</a>, <a href="https://www.recraft.ai/" className="hover:underline text-[#3B82F6] font-bold">Recraft</a>, <a href="https://app.leonardo.ai/" className="hover:underline text-[#3B82F6] font-bold">Leonardo</a>, <a href="https://www.canva.com/" className="hover:underline text-[#3B82F6] font-bold">Canva</a>
                    </p>
                </div>
                <div>
                    <strong className="block mb-2 flex items-center gap-2 text-lg"><Mic size={18}/> Voice/Dubbing:</strong>
                    <p className="text-gray-800 dark:text-gray-200">
                        <a href="https://elevenlabs.io/" className="hover:underline text-[#3B82F6] font-bold">ElevenLabs</a>
                    </p>
                </div>
            </div>
        )
    }
  ] : [
    {
        title: "Creating a Crypto/Web3 Wallet",
        icon: <Wallet size={24} />,
        iconBg: "bg-[#FF4D4D]",
        content: (
            <>
                <p className="font-bold mb-4 text-lg text-black dark:text-white">Example: Metamask</p>
                <ol className="list-decimal pl-6 space-y-3 font-mono text-base text-gray-800 dark:text-gray-200 mb-6 marker:font-bold marker:text-black dark:marker:text-white">
                    <li><span className="font-bold">Download Metamask</span> from the smartphone Play Store/App Store (ensure it is the official source). Download from the web for computer users.</li>
                    <li>Open app → select <span className="font-bold">Create New Wallet</span>.</li>
                    <li>Create a local password to open the application.</li>
                    <li><span className="bg-[#FF4D4D] text-white px-2 py-0.5 font-bold">CRITICAL:</span> Write down the 12-word Seed Phrase in a note or somewhere safe.</li>
                    <li>Select the network suitable for the airdrop (Ethereum, BNB Chain, Polygon, etc.) → add RPC if necessary.</li>
                </ol>
                <div className="bg-[#EBF400]/20 border-l-4 border-[#EBF400] p-5 text-base font-mono text-gray-800 dark:text-gray-200">
                    <span className="block font-bold mb-1 text-lg">Pro Tip:</span>
                    Use a <span className="font-bold">new wallet specifically for airdrops</span> to be safe from hack/compromised/drain risks. Use other wallets as needed such as OKX wallet, Rabby wallet, Phantom wallet, etc.
                </div>
            </>
        )
    },
    {
        title: "Creating a Global CEX Account",
        icon: <Globe size={24} />,
        iconBg: "bg-[#3B82F6]",
        content: (
            <>
                <p className="font-bold mb-4 text-lg text-black dark:text-white">Global/International CEX Options:</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {['Binance', 'Bybit', 'OKX', 'KuCoin', 'MEXC', 'Bitget'].map(cex => (
                        <span key={cex} className="bg-gray-100 dark:bg-gray-800 border border-black dark:border-white px-3 py-1 text-sm font-mono font-bold">{cex}</span>
                    ))}
                </div>
                <ol className="list-decimal pl-6 space-y-3 font-mono text-base text-gray-800 dark:text-gray-200 mb-6 marker:font-bold marker:text-black dark:marker:text-white">
                    <li>Open the official website or download the application.</li>
                    <li>Click <strong>“Register”</strong> or <strong>“Sign Up”</strong>. Register with email or phone number. Create a strong password.</li>
                    <li><strong>Verify Email / Phone Number</strong> by entering the OTP code sent.</li>
                    <li><strong>Perform KYC</strong> for official verification. One person = one account. Upload ID Card/Passport and take a selfie.</li>
                    <li><strong>Activate Extra Security:</strong> Google Authenticator (2FA) or SMS OTP.</li>
                    <li><strong>Deposit & Withdrawal:</strong>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>To deposit crypto → use wallet address from “Deposit” menu.</li>
                            <li>To deposit fiat → use available payment methods.</li>
                            <li>To withdraw → enter external wallet address, ensure the selected chain network is correct.</li>
                        </ul>
                    </li>
                </ol>
                <div className="bg-[#EBF400]/20 border-l-4 border-[#EBF400] p-5 text-base font-mono text-gray-800 dark:text-gray-200">
                    <span className="block font-bold mb-1 text-lg">Pro Tip:</span>
                    Use Global CEX to buy/sell, convert tokens, or withdraw to Local CEX.
                </div>
            </>
        )
    },
    {
        title: "Creating a Local Indonesian CEX Account",
        icon: <CreditCard size={24} />,
        iconBg: "bg-green-600",
        content: (
            <>
                <p className="font-bold mb-4 text-lg text-black dark:text-white">Example: Pintu App (pintu.co.id)</p>
                <ol className="list-decimal pl-6 space-y-3 font-mono text-base text-gray-800 dark:text-gray-200 mb-6 marker:font-bold marker:text-black dark:marker:text-white">
                    <li>Download Pintu from Play Store/App Store.</li>
                    <li>Click Register → enter email & password.</li>
                    <li>Verify email & phone number.</li>
                    <li>KYC → upload KTP & selfie.</li>
                    <li>Activate 2FA.</li>
                    <li>Deposit/withdraw rupiah via bank transfer & e-wallets (OVO, Dana, etc).</li>
                </ol>
                <div className="bg-[#EBF400]/20 border-l-4 border-[#EBF400] p-5 text-base font-mono text-gray-800 dark:text-gray-200">
                    <span className="block font-bold mb-1 text-lg">Pro Tip:</span>
                    Simple UI, suitable for beginners. Used for initial IDR deposits or withdrawing profits to bank accounts.
                </div>
            </>
        )
    },
    {
        title: "Social Identity Setup",
        icon: <Share2 size={24} />,
        iconBg: "bg-purple-600",
        content: (
            <>
                {/* Galxe */}
                <div className="mb-8">
                    <h4 className="font-bold text-xl uppercase mb-3 flex items-center gap-2"><Target size={20}/> Creating a Galxe Account</h4>
                    <ol className="list-decimal pl-6 space-y-2 font-mono text-base text-gray-800 dark:text-gray-200 mb-3">
                        <li>Open <strong>galxe.com</strong>.</li>
                        <li>Click Sign In → select Connect Wallet. Connect with Metamask.</li>
                        <li>Grant permission (sign message, not a paid transaction).</li>
                        <li>Complete profile → set username.</li>
                    </ol>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 italic">Optional, but campaigns often ask to verify X, Discord, or email here.</p>
                </div>

                {/* Discord */}
                <div className="mb-8">
                    <h4 className="font-bold text-xl uppercase mb-3 flex items-center gap-2"><MessageSquare size={20}/> Creating a Discord Account</h4>
                    <ol className="list-decimal pl-6 space-y-2 font-mono text-base text-gray-800 dark:text-gray-200 mb-3">
                        <li>Download Discord or open discord.com.</li>
                        <li>Click Sign Up → enter email, username, and password.</li>
                        <li>Verify email and Phone Number.</li>
                        <li>Click Join Server → enter project invitation link.</li>
                    </ol>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 italic">Some servers have captchas or initial verification tasks.</p>
                </div>

                {/* Twitter/X */}
                <div>
                    <h4 className="font-bold text-xl uppercase mb-3 flex items-center gap-2"><Globe size={20}/> Creating a Twitter/X Account</h4>
                    <ol className="list-decimal pl-6 space-y-2 font-mono text-base text-gray-800 dark:text-gray-200 mb-3">
                        <li>Download X (Twitter).</li>
                        <li>Register using email/phone number.</li>
                        <li>Create a unique but professional username.</li>
                        <li>Set profile photo & simple bio.</li>
                    </ol>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 italic">Many airdrops require retweet, follow, and mention tasks.</p>
                </div>
            </>
        )
    },
    {
        title: "Other Supporting Platforms",
        icon: <LayoutTemplate size={24} />,
        iconBg: "bg-gray-800",
        content: (
            <>
                <div className="flex gap-4 flex-wrap">
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-2 border-black dark:border-white font-mono font-bold text-base">Zealy.io</div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-2 border-black dark:border-white font-mono font-bold text-base">Guild.xyz</div>
                </div>
                <p className="mt-4 font-mono text-base text-gray-700 dark:text-gray-300">Used for community missions. Usually just web interactions, no download required.</p>
            </>
        )
    },
    {
        title: "AI Tools for Airdrop Hunting",
        icon: <Bot size={24} />,
        iconBg: "bg-pink-600",
        content: (
            <div className="space-y-6 font-mono text-base">
                <div>
                    <strong className="block mb-2 flex items-center gap-2 text-lg"><Bot size={18}/> Universal AI:</strong>
                    <p className="text-gray-800 dark:text-gray-200">ChatGPT, Gemini, DeepSeek, Grok</p>
                </div>
                <div>
                    <strong className="block mb-2 flex items-center gap-2 text-lg"><Video size={18}/> Image & Video:</strong>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        <a href="https://www.krea.ai/" className="hover:underline text-[#3B82F6] font-bold">Krea</a>, <a href="https://runwayml.com/" className="hover:underline text-[#3B82F6] font-bold">Runwayml</a>, <a href="https://dreamina.capcut.com/" className="hover:underline text-[#3B82F6] font-bold">Dreamina</a>, <a href="https://www.recraft.ai/" className="hover:underline text-[#3B82F6] font-bold">Recraft</a>, <a href="https://app.leonardo.ai/" className="hover:underline text-[#3B82F6] font-bold">Leonardo</a>, <a href="https://www.canva.com/" className="hover:underline text-[#3B82F6] font-bold">Canva</a>
                    </p>
                </div>
                <div>
                    <strong className="block mb-2 flex items-center gap-2 text-lg"><Mic size={18}/> Voice/Dubbing:</strong>
                    <p className="text-gray-800 dark:text-gray-200">
                        <a href="https://elevenlabs.io/" className="hover:underline text-[#3B82F6] font-bold">ElevenLabs</a>
                    </p>
                </div>
            </div>
        )
    }
  ];

  const airdropTypes = isId ? [
    { 
      title: 'Airdrop Testnet', 
      desc: 'Reward diberikan untuk menguji proyek di testnet menggunakan token faucet gratis. Tidak melibatkan uang sungguhan.', 
      icon: <Zap size={32} /> 
    },
    { 
      title: 'Airdrop Mainnet', 
      desc: 'Reward didapat dari aktivitas di blockchain asli proyek dengan aset nyata. Sering melibatkan swap, bridge, atau staking.', 
      icon: <Target size={32} /> 
    },
    {
      title: 'Airdrop Role Komunitas', 
      desc: 'Diberikan kepada pengguna yang mendapatkan role Discord khusus (OG, Early, Contributor) dengan aktif membantu.', 
      icon: <Users size={32} /> 
    },
    { 
      title: 'Airdrop Node/Validator', 
      desc: 'Untuk pengguna yang menjalankan node atau berkontribusi pada infrastruktur jaringan. Biasanya butuh setup teknis.', 
      icon: <Server size={32} /> 
    },
    { 
      title: 'Airdrop NFT', 
      desc: 'Diberikan kepada pemegang NFT tertentu. NFT bertindak sebagai "tiket" atau bukti dukungan awal.', 
      icon: <Image size={32} /> 
    },
    { 
      title: 'Airdrop Yapper (Sosial)', 
      desc: 'Reward untuk memposting konten berkualitas di X/Twitter. Proyek melacak engagement via platform seperti Kaito/Cookies.', 
      icon: <MessageSquare size={32} /> 
    }
  ] : [
    { 
      title: 'Testnet Airdrop', 
      desc: 'Rewards given for testing a project on a testnet using free faucet tokens. No real money involved; used to help the team test features before mainnet launch.', 
      icon: <Zap size={32} /> 
    },
    { 
      title: 'Mainnet Airdrop', 
      desc: 'Rewards earned by doing activities on the project’s real blockchain with real assets. Often includes tasks like swapping, bridging, staking, or providing liquidity.', 
      icon: <Target size={32} /> 
    },
    {
      title: 'Community Role Airdrop', 
      desc: 'Airdrops given to users who earn special Discord roles (OG, Early, Contributor, Helper, etc.) by being active, helpful, or supporting the project early.', 
      icon: <Users size={32} /> 
    },
    { 
      title: 'Node/Validator Airdrop', 
      desc: 'Airdrops for users who run a node, validator, or contribute to network infrastructure. Usually requires technical setup or staking tokens.', 
      icon: <Server size={32} /> 
    },
    { 
      title: 'NFT-based Airdrop', 
      desc: 'Airdrops given to holders of specific NFTs. The NFT acts as a “ticket” or proof of early support, granting access to token rewards.', 
      icon: <Image size={32} /> 
    },
    { 
      title: 'Yapper Airdrop (Kaito/Cookies)', 
      desc: 'Rewards given for posting high-quality content on X/Twitter. Projects track engagement and influence through platforms like Kaito or Cookies. Targets active content creators.', 
      icon: <MessageSquare size={32} /> 
    }
  ];

  const cryptoFundamentals = isId ? [
    // --- PRE-CRYPTO ---
    {
      title: "0. FUNDAMENTAL DASAR",
      subtitle: "Basics Pra-Kripto",
      color: "bg-gray-400",
      items: [
        { q: "Apa itu Uang?", a: "Penyimpan nilai, alat tukar, dan unit hitung." },
        { q: "Apa itu Uang Fiat?", a: "Mata uang terbitan pemerintah (USD, IDR) yang dipengaruhi inflasi." },
        { q: "Sistem Perbankan", a: "Bank sentral menerbitkan uang; bank komersial meminjamkannya." },
        { q: "Inflasi & Deflasi", a: "Inflasi = nilai uang turun. Deflasi = nilai uang naik." }
      ]
    },
    {
      title: "1. FONDASI KRIPTO",
      subtitle: "Dasar-Dasar",
      color: "bg-[#4ADE80]", // Green
      items: [
        { q: "Apa itu Cryptocurrency?", a: "Uang digital yang diamankan dengan kriptografi." },
        { q: "Apa itu Aset Digital?", a: "Penyimpan nilai digital apa pun (Koin, Token, NFT)." },
        { q: "Koin vs Token", a: "Koin = Native di blockchain (ETH). Token = Dibangun di atasnya (USDT di ETH)." },
        { q: "Apa itu Stablecoin?", a: "Kripto yang dipatok ke aset stabil seperti USD (USDT, USDC)." },
        { q: "Market Cap", a: "Harga Saat Ini × Suplai Beredar." }
      ]
    },
    {
      title: "2. GENERASI WEB & CORE WEB3",
      subtitle: "Memahami Pergeseran",
      color: "bg-[#60A5FA]", // Blue
      items: [
        { q: "Web1 vs Web2 vs Web3", a: "Web1: Baca-saja. Web2: Baca-Tulis (Sosial). Web3: Baca-Tulis-Miliki." },
        { q: "Sentralisasi vs Desentralisasi", a: "Sentralisasi: Satu pengendali (Bank). Desentralisasi: Jaringan terkontrol (Bitcoin)." },
        { q: "Permissionless", a: "Siapapun bisa menggunakannya tanpa izin." },
        { q: "Custodial vs Non-Custodial", a: "Custodial: Bursa pegang kunci. Non-Custodial: Anda pegang kunci." }
      ]
    },
    {
      title: "3. BLOCKCHAIN & ARSITEKTUR JARINGAN",
      subtitle: "Cara Kerjanya",
      color: "bg-[#FACC15]", // Yellow
      items: [
        { q: "Blockchain", a: "Buku besar publik terdistribusi dari semua transaksi." },
        { q: "Node & Validator", a: "Komputer yang mengamankan jaringan dan memverifikasi transaksi." },
        { q: "Konsensus (PoW vs PoS)", a: "PoW: Mining (Energi). PoS: Staking (Modal)." },
        { q: "Mainnet vs Testnet", a: "Mainnet: Uang asli. Testnet: Uang palsu untuk tes." },
        { q: "Layer 1 (L1)", a: "Jaringan dasar (Ethereum, Solana, Avalanche)." },
        { q: "Layer 2 (L2)", a: "Layer penskalaan di atas L1 (Arbitrum, Base, Optimism)." }
      ]
    },
    {
      title: "4. WALLET & KEAMANAN",
      subtitle: "Melindungi Aset Anda",
      color: "bg-[#FB923C]", // Orange
      items: [
        { q: "Wallet Web3", a: "Gerbang Anda ke aplikasi kripto (Metamask, Rabby)." },
        { q: "Public Address", a: "Nomor rekening Anda untuk menerima dana." },
        { q: "Private Key", a: "Password rahasia ke alamat Anda. JANGAN BAGIKAN." },
        { q: "Seed Phrase", a: "Kunci backup master 12-24 kata. JANGAN BAGIKAN." },
        { q: "Hot vs Cold Wallet", a: "Hot: Terkoneksi internet. Cold: Hardware offline (paling aman)." },
        { q: "Approval & Revoke", a: "Memberi izin aplikasi membelanjakan token. Harus revoke rutin." }
      ]
    },
    {
      title: "5. TRANSAKSI & SMART CONTRACT",
      subtitle: "Berinteraksi On-Chain",
      color: "bg-[#C084FC]", // Purple
      items: [
        { q: "Gas Fee", a: "Biaya untuk memproses transaksi." },
        { q: "Gas Token", a: "Token yang dipakai bayar gas (ETH di Ethereum, SOL di Solana)." },
        { q: "Smart Contract", a: "Kode otomatis yang menjalankan dApps." },
        { q: "dApp", a: "Aplikasi Terdesentralisasi (Uniswap, OpenSea)." },
        { q: "Slippage", a: "Perbedaan harga yang ditoleransi saat trade." },
        { q: "MEV", a: "Bot yang mendahului trade Anda untuk profit." }
      ]
    },
    {
      title: "6. TOKENS, NFT & KEPEMILIKAN DIGITAL",
      subtitle: "Tipe Aset",
      color: "bg-[#8D6E63]", // Brown
      items: [
        { q: "Fungible Token (ERC-20)", a: "Token yang bisa ditukar (USDC, UNI)." },
        { q: "NFT (ERC-721)", a: "Aset digital unik, satu-satunya." },
        { q: "Soulbound Token (SBT)", a: "Token identitas yang tidak bisa dipindah." },
        { q: "Governance Token", a: "Token yang memberi hak suara." },
        { q: "Utility Token", a: "Token yang dipakai untuk menggunakan produk/layanan." }
      ]
    }
  ] : [
    // --- PRE-CRYPTO ---
    {
      title: "0. BASIC FUNDAMENTALS",
      subtitle: "Pre-Crypto Basics",
      color: "bg-gray-400",
      items: [
        { q: "What is Money?", a: "Store of value, medium of exchange, and unit of account." },
        { q: "What is Fiat Money?", a: "Government-issued currency (USD, IDR) affected by inflation." },
        { q: "Banking System", a: "Central banks issue money; commercial banks lend it." },
        { q: "Inflation & Deflation", a: "Inflation = money loses value. Deflation = money gains value." }
      ]
    },
    // --- CRYPTO FOUNDATIONS ---
    {
      title: "1. CRYPTO FOUNDATIONS",
      subtitle: "The Basics",
      color: "bg-[#4ADE80]", // Green
      items: [
        { q: "What is Cryptocurrency?", a: "Digital money secured by cryptography." },
        { q: "What is a Digital Asset?", a: "Any digital store of value (Coin, Token, NFT)." },
        { q: "Coin vs Token", a: "Coin = Native to blockchain (ETH). Token = Built on top (USDT on ETH)." },
        { q: "What is a Stablecoin?", a: "Crypto pegged to a stable asset like USD (USDT, USDC)." },
        { q: "Market Cap", a: "Current Price × Circulating Supply." }
      ]
    },
    {
      title: "2. WEB GENERATIONS & WEB3 CORE",
      subtitle: "Understanding the Shift",
      color: "bg-[#60A5FA]", // Blue
      items: [
        { q: "Web1 vs Web2 vs Web3", a: "Web1: Read-only. Web2: Read-Write (Social). Web3: Read-Write-Own." },
        { q: "Centralized vs Decentralized", a: "Centralized: One controller (Bank). Decentralized: Network controlled (Bitcoin)." },
        { q: "Permissionless", a: "Anyone can use it without asking for access." },
        { q: "Custodial vs Non-Custodial", a: "Custodial: Exchange holds keys. Non-Custodial: You hold keys." }
      ]
    },
    {
      title: "3. BLOCKCHAIN & NETWORK ARCHITECTURE",
      subtitle: "How It Works",
      color: "bg-[#FACC15]", // Yellow
      items: [
        { q: "Blockchain", a: "A distributed public ledger of all transactions." },
        { q: "Nodes & Validators", a: "Computers that secure the network and verify transactions." },
        { q: "Consensus (PoW vs PoS)", a: "PoW: Mining (Energy). PoS: Staking (Capital)." },
        { q: "Mainnet vs Testnet", a: "Mainnet: Real money. Testnet: Fake money for testing." },
        { q: "Layer 1 (L1)", a: "Base networks (Ethereum, Solana, Avalanche)." },
        { q: "Layer 2 (L2)", a: "Scaling layers on top of L1 (Arbitrum, Base, Optimism)." }
      ]
    },
    // --- WALLETS & SECURITY ---
    {
      title: "4. WALLETS & SECURITY",
      subtitle: "Protecting Your Assets",
      color: "bg-[#FB923C]", // Orange
      items: [
        { q: "Web3 Wallet", a: "Your gateway to crypto apps (Metamask, Rabby)." },
        { q: "Public Address", a: "Your account number to receive funds." },
        { q: "Private Key", a: "The secret password to your address. NEVER SHARE." },
        { q: "Seed Phrase", a: "The 12-24 word master backup key. NEVER SHARE." },
        { q: "Hot vs Cold Wallet", a: "Hot: Connected to internet. Cold: Offline hardware (safest)." },
        { q: "Approvals & Revoke", a: "Giving apps permission to spend tokens. Must revoke regularly." }
      ]
    },
    // --- TRANSLATION ---
    {
      title: "5. TRANSACTIONS & SMART CONTRACTS",
      subtitle: "Interacting on Chain",
      color: "bg-[#C084FC]", // Purple
      items: [
        { q: "Gas Fee", a: "The cost to process a transaction." },
        { q: "Gas Token", a: "The token used to pay gas (ETH on Ethereum, SOL on Solana)." },
        { q: "Smart Contract", a: "Auto-executing code that powers dApps." },
        { q: "dApp", a: "Decentralized Application (Uniswap, OpenSea)." },
        { q: "Slippage", a: "Price difference allowed during a trade." },
        { q: "MEV", a: "Bots front-running your trade for profit." }
      ]
    },
    // --- TOKENS ---
    {
      title: "6. TOKENS, NFT & DIGITAL OWNERSHIP",
      subtitle: "Asset Types",
      color: "bg-[#8D6E63]", // Brown
      items: [
        { q: "Fungible Token (ERC-20)", a: "Interchangeable tokens (USDC, UNI)." },
        { q: "NFT (ERC-721)", a: "Unique, one-of-a-kind digital assets." },
        { q: "Soulbound Token (SBT)", a: "Non-transferable identity tokens." },
        { q: "Governance Token", a: "Token that gives voting power." },
        { q: "Utility Token", a: "Token used to use a product/service." }
      ]
    }
  ];

  const airdropFundamentals = isId ? [
    {
      title: "7. FUNDAMENTAL AIRDROP",
      subtitle: "Mekanisme Uang Gratis",
      color: "bg-[#F472B6]", // Pink
      items: [
        { q: "Apa itu Airdrop", a: "Distribusi token gratis ke pengguna." },
        { q: "Eligibility", a: "Syarat untuk memenuhi kualifikasi." },
        { q: "Snapshot", a: "Detik spesifik saat mereka mengecek aktivitas Anda." },
        { q: "Airdrop Retroaktif", a: "Reward untuk aktivitas MASA LALU." },
        { q: "Airdrop Testnet vs Mainnet", a: "Reward testing vs Reward penggunaan asli." },
        { q: "Sistem Poin", a: "Mengumpulkan poin untuk ditukar token nanti." }
      ]
    },
    {
      title: "8. SKORING & MULTIPLIER",
      subtitle: "Cara Memaksimalkan",
      color: "bg-[#EC4899]", // Pink Dark
      items: [
        { q: "Aktivitas Terbobot", a: "Kualitas > Kuantitas. LP bernilai lebih dari Swap." },
        { q: "Multiplier / Boost", a: "Bonus untuk Role, Referral, atau Staking." },
        { q: "Alokasi Berbasis Role", a: "OG Discord dapat lebih banyak." },
        { q: "Airdrop Yapper", a: "Reward untuk influencer Twitter (Kaito)." }
      ]
    },
    {
      title: "9. SYBIL & RISIKO",
      subtitle: "Jangan Kena Ban",
      color: "bg-[#EF4444]", // Red Dark
      items: [
        { q: "Serangan Sybil", a: "Satu orang pura-pura jadi 100 orang." },
        { q: "Penyaringan Sybil", a: "Proyek menghapus pengguna palsu." },
        { q: "Clustering Wallet", a: "Menghubungkan wallet yang saling kirim uang." },
        { q: "Perilaku Farming", a: "Pola robotik yang jelas (Swap-Swap-Swap dlm 1 menit)." }
      ]
    },
    {
      title: "10. NODE & INFRA",
      subtitle: "Farming Teknis",
      color: "bg-[#64748B]", // Slate
      items: [
        { q: "Node", a: "Komputer penyimpan data blockchain." },
        { q: "Validator", a: "Node yang mengusulkan blok." },
        { q: "Delegasi", a: "Staking token Anda ke Validator." },
        { q: "DePIN", a: "Infrastruktur Fisik Terdesentralisasi (Helium, Grass)." }
      ]
    }
  ] : [
    // --- AIRDROP BASICS ---
    {
      title: "7. AIRDROP FUNDAMENTALS",
      subtitle: "Free Money Mechanics",
      color: "bg-[#F472B6]", // Pink
      items: [
        { q: "What is Airdrop", a: "Free token distribution to users." },
        { q: "Eligibility", a: "The rules to qualify." },
        { q: "Snapshot", a: "The specific second they check your activity." },
        { q: "Retroactive Airdrop", a: "Reward for PAST activity." },
        { q: "Testnet vs Mainnet Airdrop", a: "Reward for testing vs Reward for real usage." },
        { q: "Points System", a: "Collecting points to convert to tokens later." }
      ]
    },
    // --- ADVANCED ---
    {
      title: "8. SCORING & MULTIPLIERS",
      subtitle: "How to Maximize",
      color: "bg-[#EC4899]", // Pink Dark
      items: [
        { q: "Weighted Activity", a: "Quality > Quantity. LP is worth more than Swaps." },
        { q: "Multipliers / Boosts", a: "Bonuses for Roles, Referrals, or Staking." },
        { q: "Role-Based Allocation", a: "Discord OGs get more." },
        { q: "Yapper Airdrop", a: "Rewards for Twitter influencers (Kaito)." }
      ]
    },
    {
      title: "9. SYBIL & RISK",
      subtitle: "Don't Get Banned",
      color: "bg-[#EF4444]", // Red Dark
      items: [
        { q: "Sybil Attack", a: "One person pretending to be 100 people." },
        { q: "Sybil Filtering", a: "Projects removing fake users." },
        { q: "Wallet Clustering", a: "Connecting wallets that send money to each other." },
        { q: "Farming Behavior", a: "Obvious robotic patterns (Swap-Swap-Swap in 1 min)." }
      ]
    },
    {
      title: "10. NODES & INFRA",
      subtitle: "Technical Farming",
      color: "bg-[#64748B]", // Slate
      items: [
        { q: "Node", a: "Computer storing blockchain data." },
        { q: "Validator", a: "Node that proposes blocks." },
        { q: "Delegation", a: "Staking your tokens with a Validator." },
        { q: "DePIN", a: "Decentralized Physical Infrastructure (Helium, Grass)." }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[85dvh] md:min-h-[85vh]">
      {/* Header */}
      <div className="mb-12 md:mb-16 text-center">
        <div className="inline-block bg-[#EBF400] px-4 py-2 border-2 border-black dark:border-white mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
           <span className="font-mono font-bold uppercase text-black">{t.academyTitle}</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-black dark:text-white mb-6 leading-tight">
          {t.titleMain}
        </h1>
        <p className="text-xl md:text-2xl font-mono max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          {t.descMain}
        </p>
      </div>

      {/* Definition & Objectives Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
        {/* Definition Card */}
        <div className="bg-white dark:bg-[#121212] border-2 border-black dark:border-white p-8 lg:p-12 brutal-shadow relative overflow-hidden group">
           <HelpCircle className="absolute -right-4 -bottom-4 w-32 h-32 text-gray-100 dark:text-gray-800 transform rotate-12 group-hover:rotate-0 transition-transform duration-500" />
           <h2 className="text-3xl font-black uppercase mb-4 relative z-10 text-black dark:text-white">{t.definitionTitle}</h2>
           <p className="font-mono text-base md:text-lg leading-relaxed relative z-10 text-gray-800 dark:text-gray-200">
             {t.definitionText}
           </p>
        </div>
        
        {/* Objective Card */}
        <div className="bg-[#3B82F6] border-2 border-black dark:border-white p-8 lg:p-12 brutal-shadow flex flex-col justify-center text-white">
           <h2 className="text-3xl font-black uppercase mb-6 border-b-2 border-black inline-block w-fit">{t.objectiveTitle}</h2>
           <div className="space-y-6">
             <div className="relative">
                <h3 className="text-xl font-black uppercase text-black mb-1 flex items-center gap-2">
                   <Target size={24} className="shrink-0" /> {t.obj1Title}
                </h3>
                <p className="font-mono text-base md:text-lg pl-8 font-medium opacity-90">
                   {t.obj1Desc}
                </p>
             </div>
             
             {/* Middle Item */}
             <div className="relative">
                <h3 className="text-xl font-black uppercase text-black mb-1 flex items-center gap-2">
                   <Layers size={24} className="shrink-0" /> {t.obj2Title}
                </h3>
                <p className="font-mono text-base md:text-lg pl-8 font-medium opacity-90">
                   {t.obj2Desc}
                </p>
             </div>

             <div className="relative">
                <h3 className="text-xl font-black uppercase text-black mb-1 flex items-center gap-2">
                   <Users size={24} className="shrink-0" /> {t.obj3Title}
                </h3>
                <p className="font-mono text-base md:text-lg pl-8 font-medium opacity-90">
                   {t.obj3Desc}
                </p>
             </div>
           </div>
        </div>
      </div>

      {/* Types Grid */}
      <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-10 text-black dark:text-white">
        {t.knowDrops}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {airdropTypes.map((item, i) => (
          <div key={i} className={`bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6 brutal-shadow hover:-translate-y-2 transition-transform h-full flex flex-col`}>
            <div className="mb-4 text-[#3B82F6]">
                {item.icon}
            </div>
            <h3 className="text-xl font-black uppercase mb-3 text-black dark:text-white leading-tight min-h-[3rem] flex items-center">{item.title}</h3>
            <p className="font-mono text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT GRID (3 Columns: Left, Center, Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        
        {/* LEFT COLUMN: Before You Start (STATIC - NO ACCORDION) */}
        <aside className="lg:col-span-3">
           <div className="sticky top-24">
              <h2 className="text-3xl font-black uppercase mb-2 text-black dark:text-white border-b-4 border-black dark:border-white pb-2">
                 {t.beforeStart}
              </h2>
              <div className="mb-6">
                 <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 text-xs font-bold uppercase font-mono">
                    {t.prepLabel}
                 </span>
              </div>
           
              <div className="space-y-4">
                 {prepItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-[#121212] border-2 border-black dark:border-white brutal-shadow group transition-all"
                    >
                       {/* Static Header */}
                       <div className="w-full flex items-center justify-between p-4 text-left relative z-10 bg-white dark:bg-[#121212]">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center border-2 border-black ${item.bg}`}>
                                  {item.icon}
                              </div>
                              <h4 className="font-bold uppercase text-lg md:text-xl text-black dark:text-white leading-tight">{item.title}</h4>
                           </div>
                       </div>

                       {/* Always Visible Content */}
                       <div className="overflow-hidden bg-white dark:bg-[#1a1a1a]">
                          <div className="p-4 pt-4 border-t-2 border-black dark:border-white">
                              <p className="font-mono text-sm md:text-base text-gray-700 dark:text-gray-300 leading-snug">
                                  {item.desc}
                              </p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Mobile Note */}
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white font-mono text-sm text-gray-600 dark:text-gray-400">
                 <strong className="block text-black dark:text-white uppercase mb-1">{t.proTip}</strong>
                 {t.proTipPrep}
              </div>
           </div>
        </aside>

        {/* CENTER COLUMN: Complete Tutorial Feed (STATIC - NO ACCORDION) */}
        <section className="lg:col-span-6 space-y-8">
           <div className="bg-[#3B82F6] text-white p-6 border-2 border-black dark:border-white mb-8 shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]">
              <h2 className="text-3xl md:text-4xl font-black uppercase text-center">{t.setupAccount}</h2>
              <p className="font-mono text-center text-[#000000] text-base mt-2">{t.setupSub}</p>
           </div>

           <div className="space-y-6">
                {tutorialSteps.map((step, idx) => (
                    <article 
                      key={idx} 
                      className="bg-white dark:bg-[#121212] border-2 border-black dark:border-white brutal-shadow transition-all"
                    >
                        {/* Static Header */}
                        <div className="w-full flex items-center justify-between p-4 md:p-6 text-left relative z-10 bg-white dark:bg-[#121212] border-b-2 border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 md:w-12 md:h-12 ${step.iconBg} text-white flex items-center justify-center border-2 border-black shrink-0`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-lg md:text-2xl font-black uppercase text-black dark:text-white leading-tight">
                                    {step.title}
                                </h3>
                            </div>
                        </div>

                        {/* Always Visible Content */}
                        <div className="overflow-hidden">
                            <div className="p-6 md:p-8 pt-6">
                                {step.content}
                            </div>
                        </div>
                    </article>
                ))}
           </div>
        </section>

        {/* RIGHT COLUMN: Key Concepts (ACCORDION KEPT AS IS) */}
        <aside className="lg:col-span-3">
           <div className="sticky top-24">
              <h2 className="text-3xl font-black uppercase mb-2 text-black dark:text-white border-b-4 border-black dark:border-white pb-2 flex items-center gap-2">
                {t.keyConcepts}
              </h2>
              <div className="mb-6">
                 <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 text-xs font-bold uppercase font-mono">
                    {t.zeroHero}
                 </span>
              </div>
              
              <div className="space-y-6">
                  
                  {/* BLOCK 1: CRYPTO FUNDAMENTALS */}
                  <div>
                      <h3 className="bg-black text-white dark:bg-white dark:text-black px-3 py-2 font-black uppercase text-sm mb-4 inline-block border-2 border-black dark:border-white">
                        Crypto Fundamentals
                      </h3>
                      <div className="space-y-2">
                        {cryptoFundamentals.map((level, i) => {
                            const actualIdx = i; // unique index 0-6
                            return (
                                <div 
                                    key={`crypto-${actualIdx}`} 
                                    className="border-2 border-black dark:border-white brutal-shadow group bg-white dark:bg-[#121212]"
                                >
                                    <button 
                                        onClick={() => toggleConcept(actualIdx)}
                                        className={`w-full p-3 text-left font-black uppercase flex items-center justify-between border-b-2 border-black dark:border-white transition-colors text-black text-sm relative z-10 ${level.color} hover:brightness-110`}
                                    >
                                        <div>
                                            <span className="block leading-tight">{level.title}</span>
                                            <span className="block text-[10px] font-mono normal-case opacity-80 mt-1">{level.subtitle}</span>
                                        </div>
                                        {openConcepts.includes(actualIdx) ? <ChevronUp size={20} className="shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
                                    </button>
                                    
                                    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${openConcepts.includes(actualIdx) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden bg-white dark:bg-[#1a1a1a]">
                                            <div className="p-4 space-y-4">
                                                {level.items.map((item, k) => (
                                                    <div key={k} className="border-l-4 border-gray-300 dark:border-gray-600 pl-3">
                                                        <h4 className="font-bold text-black dark:text-white text-sm mb-1">{item.q}</h4>
                                                        <p className="font-mono text-xs text-gray-700 dark:text-gray-300 leading-snug">{item.a}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                      </div>
                  </div>

                  {/* BLOCK 2: AIRDROP FUNDAMENTALS */}
                  <div>
                      <h3 className="bg-black text-white dark:bg-white dark:text-black px-3 py-2 font-black uppercase text-sm mb-4 inline-block border-2 border-black dark:border-white">
                        Airdrop Fundamentals
                      </h3>
                      <div className="space-y-2">
                        {airdropFundamentals.map((level, i) => {
                            const actualIdx = i + 100; // offset index to avoid collision
                            return (
                                <div 
                                    key={`airdrop-${actualIdx}`} 
                                    className="border-2 border-black dark:border-white brutal-shadow group bg-white dark:bg-[#121212]"
                                >
                                    <button 
                                        onClick={() => toggleConcept(actualIdx)}
                                        className={`w-full p-3 text-left font-black uppercase flex items-center justify-between border-b-2 border-black dark:border-white transition-colors text-black text-sm relative z-10 ${level.color} hover:brightness-110`}
                                    >
                                        <div>
                                            <span className="block leading-tight">{level.title}</span>
                                            <span className="block text-[10px] font-mono normal-case opacity-80 mt-1">{level.subtitle}</span>
                                        </div>
                                        {openConcepts.includes(actualIdx) ? <ChevronUp size={20} className="shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
                                    </button>
                                    
                                    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${openConcepts.includes(actualIdx) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden bg-white dark:bg-[#1a1a1a]">
                                            <div className="p-4 space-y-4">
                                                {level.items.map((item, k) => (
                                                    <div key={k} className="border-l-4 border-gray-300 dark:border-gray-600 pl-3">
                                                        <h4 className="font-bold text-black dark:text-white text-sm mb-1">{item.q}</h4>
                                                        <p className="font-mono text-xs text-gray-700 dark:text-gray-300 leading-snug">{item.a}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                      </div>
                  </div>

                  {/* BUTTON FOR FULL DICTIONARY */}
                  <button 
                    onClick={() => onNavigate('concepts')}
                    className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase py-4 border-2 border-black dark:border-white brutal-shadow hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 transition-all flex flex-col items-center justify-center gap-1 mt-6"
                  >
                    <span>{t.fullDict}</span>
                    <span className="text-xs font-mono opacity-70">(LEVELS 0 - 19)</span>
                    <ArrowRight size={20} className="mt-1" />
                  </button>

                  {/* NEW AI ASSISTANT PANEL (Embedded Scanner) */}
                  <div className="mt-8 pt-6 border-t-2 border-black dark:border-white">
                     <div className="h-[500px] w-full relative">
                        <GeminiScanner language={language} />
                     </div>
                  </div>
              </div>
           </div>
        </aside>

      </div>

      {/* CTA */}
      <div className="bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white p-8 md:p-16 text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">{t.ctaTitle}</h2>
          <p className="font-mono text-lg mb-8 max-w-xl mx-auto">
            {t.ctaDesc}
          </p>
          <BrutalButton 
            variant="secondary" 
            className="text-xl px-12 py-4 flex items-center gap-3 animate-pulse"
            onClick={() => onNavigate('guides')}
          >
            {t.ctaBtn} <ArrowRight strokeWidth={3} />
          </BrutalButton>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{backgroundImage: 'repeating-linear-gradient(45deg, #333 0, #333 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px'}}>
        </div>
      </div>
    </div>
  );
};
