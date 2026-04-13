
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronUp, Book } from 'lucide-react';
import { BrutalButton } from './BrutalButton';
import { Language } from '../types';

interface ConceptsViewProps {
  onNavigate: (view: 'home' | 'learn' | 'guides' | 'concepts') => void;
  language?: Language;
}

export const ConceptsView: React.FC<ConceptsViewProps> = ({ onNavigate, language = 'en' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const isId = language === 'id';

  const t = {
      title: isId ? <>Kamus <span className="text-[#3B82F6]">Kripto</span></> : <>Crypto <span className="text-[#3B82F6]">Dictionary</span></>,
      subtitle: isId ? "Kurikulum Lengkap A-Z (Standar Industri)" : "Complete Curriculum A-Z (Industry Standard)",
      searchPlaceholder: isId ? "Cari konsep..." : "Search concepts...",
      notFound: isId ? "Istilah tidak ditemukan." : "Term not found.",
      clearSearch: isId ? "Hapus Pencarian" : "Clear Search",
      returnLearn: isId ? "Kembali ke Belajar" : "Return to Learn"
  }

  // --- DATA CURRICULUM (INDONESIAN - STANDARD DETAIL) ---
  const fullCurriculumID = [
    {
      title: "0. FUNDAMENTAL DASAR (SEBELUM CRYPTO)",
      color: "bg-gray-300",
      items: [
        { q: "What is Money", a: "Uang adalah segala sesuatu yang diterima secara umum sebagai pembayaran untuk barang dan jasa serta pembayaran utang. Uang memiliki tiga fungsi utama: sebagai alat tukar (medium of exchange), satuan hitung (unit of account), dan penyimpan nilai (store of value)." },
        { q: "Fiat Money", a: "Mata uang yang diterbitkan oleh pemerintah dan tidak didukung oleh komoditas fisik seperti emas atau perak. Nilai uang fiat berasal dari kepercayaan publik terhadap stabilitas ekonomi pemerintah penerbit (contoh: IDR, USD)." },
        { q: "Banking System", a: "Sistem keuangan terpusat di mana Bank Sentral mengontrol suplai uang, dan Bank Komersial bertindak sebagai perantara yang memfasilitasi transaksi, pinjaman, dan penyimpanan dana nasabah menggunakan sistem cadangan fraksional." },
        { q: "Inflation & Deflation", a: "Inflasi adalah penurunan daya beli mata uang yang menyebabkan kenaikan harga barang secara umum. Deflasi adalah peningkatan daya beli mata uang yang menyebabkan penurunan harga barang." },
        { q: "Interest Rate (Suku Bunga)", a: "Biaya yang dikenakan atas penggunaan uang pinjaman atau imbalan atas penyimpanan uang. Suku bunga ditentukan oleh Bank Sentral sebagai alat utama untuk mengendalikan inflasi dan pertumbuhan ekonomi." },
        { q: "Risk vs Reward", a: "Prinsip investasi yang menyatakan bahwa potensi keuntungan (return) berbanding lurus dengan tingkat risiko. Aset dengan potensi keuntungan tinggi biasanya memiliki risiko kerugian yang tinggi pula." },
        { q: "Time Preference", a: "Konsep ekonomi yang menggambarkan preferensi seseorang untuk menerima nilai saat ini dibandingkan di masa depan. 'Low time preference' (kesabaran) berkorelasi dengan akumulasi modal jangka panjang." }
      ]
    },
    {
      title: "1. CRYPTO FOUNDATIONS",
      color: "bg-[#4ADE80]",
      items: [
        { q: "Cryptocurrency", a: "Mata uang digital atau virtual yang menggunakan kriptografi untuk keamanan dan beroperasi di jaringan terdesentralisasi (blockchain), sehingga tidak bergantung pada otoritas pusat seperti bank atau pemerintah." },
        { q: "Digital Asset", a: "Aset dalam format biner yang memiliki hak kepemilikan. Berbeda dengan data digital biasa yang bisa disalin, aset digital berbasis blockchain memiliki properti kelangkaan dan kepemilikan yang dapat diverifikasi." },
        { q: "Coin vs Token", a: "Coin adalah aset native yang berjalan di blockchainnya sendiri (contoh: BTC, ETH). Token adalah aset digital yang dibangun di atas blockchain orang lain menggunakan standar smart contract tertentu (contoh: USDT di Ethereum)." },
        { q: "Stablecoin", a: "Cryptocurrency yang nilainya dipatok (pegged) ke aset stabil, biasanya mata uang fiat seperti USD, untuk meminimalisir volatilitas harga (contoh: USDT, USDC)." },
        { q: "Market Cap", a: "Nilai pasar total dari sebuah cryptocurrency. Dihitung dengan mengalikan harga saat ini dengan jumlah koin yang beredar (Circulating Supply). Indikator utama ukuran sebuah proyek." },
        { q: "FDV (Fully Diluted Valuation)", a: "Total nilai pasar proyek jika seluruh suplai token (termasuk yang masih terkunci atau belum dicetak) sudah beredar di pasar pada harga saat ini." },
        { q: "Circulating vs Total vs Max Supply", a: "Circulating: Jumlah koin yang aktif beredar di pasar. Total: Jumlah koin yang sudah ada (termasuk yang terkunci). Max: Batas maksimum koin yang akan pernah ada (hard cap)." },
        { q: "Liquidity", a: "Kemudahan sebuah aset untuk dikonversi menjadi uang tunai tanpa mempengaruhi harga pasar secara signifikan. Likuiditas tinggi berarti aset mudah diperjualbelikan." },
        { q: "Volume", a: "Jumlah total nilai aset yang diperdagangkan dalam periode waktu tertentu (biasanya 24 jam). Volume menunjukkan tingkat aktivitas dan minat pasar." },
        { q: "Volatility", a: "Ukuran variasi harga aset dari waktu ke waktu. Cryptocurrency dikenal memiliki volatilitas tinggi, yang berarti harganya bisa naik atau turun drastis dalam waktu singkat." }
      ]
    },
    {
      title: "2. WEB GENERATIONS & WEB3 CORE",
      color: "bg-[#60A5FA]",
      items: [
        { q: "Web1 (Read)", a: "Era awal internet yang statis (Information Economy). Pengguna hanya bisa mengonsumsi konten yang dibuat oleh penerbit. Sifatnya satu arah." },
        { q: "Web2 (Read + Write)", a: "Era internet interaktif (Platform Economy). Pengguna bisa membuat konten (UGC), namun data dan monetisasi dikuasai oleh perusahaan platform terpusat (contoh: Facebook, Google)." },
        { q: "Web3 (Read + Write + Own)", a: "Era internet terdesentralisasi (Token Economy). Pengguna tidak hanya membuat konten tetapi juga memiliki data, identitas, dan aset digital mereka sendiri melalui teknologi blockchain." },
        { q: "What is Web3", a: "Visi internet masa depan yang dibangun di atas jaringan blockchain terbuka, tanpa izin (permissionless), dan tanpa perantara terpercaya (trustless)." },
        { q: "Centralized vs Decentralized", a: "Sentralisasi: Kontrol dan data dipegang oleh satu entitas pusat. Desentralisasi: Kontrol dan data didistribusikan ke banyak partisipan jaringan, menghilangkan titik kegagalan tunggal." },
        { q: "Permissionless", a: "Sifat jaringan publik di mana siapa saja dapat berpartisipasi (menggunakan, memvalidasi, membangun) tanpa perlu meminta izin dari otoritas pengontrol." },
        { q: "Trust vs Trustless", a: "Sistem tradisional berbasis 'Trust' (percaya pada pihak ketiga). Blockchain berbasis 'Trustless' (tidak perlu percaya pada entitas, cukup percaya pada kode dan matematika yang dapat diverifikasi)." },
        { q: "Custodial vs Non-Custodial", a: "Custodial: Pihak ketiga memegang kunci privat aset Anda (seperti Bank/CEX). Non-Custodial: Anda memegang kendali penuh atas kunci privat aset Anda sendiri." },
        { q: "Open Source", a: "Perangkat lunak yang kode sumbernya tersedia secara bebas untuk dipelajari, dimodifikasi, dan didistribusikan. Transparansi ini krusial dalam keamanan kripto." },
        { q: "P2P (Peer to Peer)", a: "Interaksi atau transaksi langsung antara dua pihak tanpa perantara. Dalam kripto, ini berarti mengirim aset langsung dari satu dompet ke dompet lain." },
        { q: "Interoperability", a: "Kemampuan sistem blockchain yang berbeda untuk berkomunikasi, bertukar data, dan mentransfer aset satu sama lain." },
        { q: "On-chain Identity", a: "Identitas digital yang terbentuk dari riwayat aktivitas transaksi di blockchain. Ini bisa bersifat anonim atau terhubung dengan reputasi tertentu." },
        { q: "ENS (Ethereum Name Service)", a: "Sistem penamaan terdistribusi yang memetakan alamat wallet yang kompleks (hexadecimal) menjadi nama yang mudah dibaca manusia (contoh: nama.eth)." },
        { q: "Blockchain Explorer", a: "Alat pencarian dan analitik yang memungkinkan pengguna untuk melihat detail blok, transaksi, dan saldo alamat di blockchain secara transparan." }
      ]
    },
    {
      title: "3. BLOCKCHAIN & ARSITEKTUR JARINGAN",
      color: "bg-[#FACC15]",
      items: [
        { q: "Blockchain", a: "Buku besar digital (ledger) terdistribusi yang mencatat transaksi dalam blok-blok yang saling terhubung secara kriptografis, sehingga data yang sudah dicatat tidak dapat diubah (immutable)." },
        { q: "Blocks & Transactions", a: "Block adalah wadah data yang berisi kumpulan transaksi valid. Setiap blok memiliki timestamp dan link ke blok sebelumnya, membentuk rantai (chain)." },
        { q: "Nodes", a: "Komputer yang terhubung ke jaringan blockchain dan menyimpan salinan buku besar serta memvalidasi aturan protokol." },
        { q: "Validators", a: "Node khusus yang bertanggung jawab memverifikasi transaksi baru dan mengusulkan blok baru ke jaringan, seringkali dengan insentif ekonomi." },
        { q: "Full node vs Light client", a: "Full Node menyimpan seluruh riwayat blockchain. Light Client hanya menyimpan header blok untuk verifikasi sederhana tanpa memakan banyak penyimpanan." },
        { q: "Consensus Mechanisms", a: "Protokol yang digunakan oleh node dalam jaringan terdistribusi untuk mencapai kesepakatan mengenai status valid dari buku besar (ledger)." },
        { q: "PoW (Proof of Work)", a: "Mekanisme konsensus di mana partisipan (miner) bersaing memecahkan teka-teki matematika kompleks menggunakan daya komputasi untuk mengamankan jaringan." },
        { q: "PoS (Proof of Stake)", a: "Mekanisme konsensus di mana validator dipilih untuk membuat blok baru berdasarkan jumlah aset kripto yang mereka kunci (stake) sebagai jaminan." },
        { q: "DPoS (Delegated Proof of Stake)", a: "Variasi PoS di mana pemegang token memberikan suara (vote) untuk memilih sejumlah kecil delegasi yang bertugas memvalidasi transaksi." },
        { q: "PoA (Proof of Authority)", a: "Mekanisme konsensus berbasis reputasi di mana validator adalah entitas yang telah diaudit dan diizinkan, biasanya digunakan pada blockchain privat." },
        { q: "Mainnet vs Testnet vs Devnet", a: "Mainnet: Jaringan utama yang operasional dengan nilai aset nyata. Testnet: Jaringan simulasi untuk uji coba dengan aset tanpa nilai. Devnet: Lingkungan pengembangan." },
        { q: "Layer 1 (L1)", a: "Jaringan blockchain dasar (base layer) tempat transaksi diselesaikan secara final (contoh: Bitcoin, Ethereum, Solana)." },
        { q: "Layer 2 (L2)", a: "Protokol sekunder yang dibangun di atas L1 untuk meningkatkan skalabilitas dan kecepatan transaksi, dengan tetap mewarisi keamanan L1." },
        { q: "Rollups (Optimistic / ZK)", a: "Teknologi L2 yang memproses transaksi di luar rantai utama (off-chain) dan mengirimkan data ringkasannya kembali ke L1." },
        { q: "Sharding", a: "Teknik partisi database yang memecah blockchain menjadi bagian-bagian lebih kecil (shard) untuk diproses secara paralel guna meningkatkan skalabilitas." },
        { q: "Data Availability (DA)", a: "Jaminan bahwa data transaksi yang diperlukan untuk memverifikasi blok tersedia bagi semua partisipan jaringan." },
        { q: "Finality", a: "Kondisi di mana transaksi yang telah dikonfirmasi tidak dapat dibatalkan atau diubah lagi. Waktu finalitas bervariasi antar blockchain." }
      ]
    },
    {
      title: "4. WALLETS & KEAMANAN",
      color: "bg-[#FB923C]",
      items: [
        { q: "Web3 Wallet", a: "Perangkat lunak atau keras yang menyimpan kunci kriptografi (Private & Public Keys) untuk berinteraksi dengan jaringan blockchain." },
        { q: "Public Address", a: "Alamat alfanumerik yang diturunkan dari Public Key, digunakan sebagai tujuan penerimaan aset. Aman untuk dibagikan." },
        { q: "Private Key", a: "Kunci rahasia yang memberikan kontrol penuh atas aset di alamat terkait. Digunakan untuk menandatangani transaksi. Harus dijaga kerahasiaannya." },
        { q: "Seed Phrase (Recovery Phrase)", a: "Kumpulan 12-24 kata acak yang berfungsi sebagai kunci utama untuk memulihkan akses ke wallet dan seluruh private key di dalamnya." },
        { q: "Hot vs Cold Wallet", a: "Hot Wallet: Terhubung ke internet (nyaman tapi kurang aman). Cold Wallet: Penyimpanan offline (sangat aman, contoh: Hardware Wallet)." },
        { q: "Self-Custody", a: "Praktik memegang dan mengelola kunci privat aset kripto sendiri tanpa bergantung pada pihak ketiga (exchange)." },
        { q: "Multi-sig Wallet", a: "Wallet yang memerlukan tanda tangan dari beberapa kunci privat berbeda (m dari n) untuk mengotorisasi transaksi, meningkatkan keamanan." },
        { q: "MPC / TSS Wallet", a: "Teknologi komputasi di mana kunci privat dipecah menjadi beberapa bagian (shares) dan tidak pernah digabungkan sepenuhnya saat penandatanganan." },
        { q: "Wallet Signature", a: "Bukti kriptografis yang dihasilkan oleh private key untuk memverifikasi keaslian permintaan atau kepemilikan akun tanpa perlu biaya gas." },
        { q: "Allowance / Approvals", a: "Izin yang diberikan pengguna kepada smart contract untuk membelanjakan token dalam jumlah tertentu dari wallet mereka." },
        { q: "Revoke", a: "Tindakan membatalkan izin (allowance) smart contract yang sebelumnya diberikan untuk mencegah risiko eksploitasi." },
        { q: "Phishing", a: "Upaya penipuan di mana pelaku menyamar sebagai entitas terpercaya untuk mencuri kredensial sensitif seperti Private Key atau Seed Phrase." },
        { q: "Scams: Rug pull", a: "Penipuan di mana pengembang meninggalkan proyek dan melarikan dana investor setelah mempromosikannya." },
        { q: "Scams: Honeypot", a: "Kontrak pintar berbahaya yang memungkinkan pengguna membeli token tetapi mencegah mereka menjualnya kembali." },
        { q: "Scams: Fake airdrop", a: "Distribusi token palsu ke wallet pengguna yang bertujuan mengarahkan mereka ke situs phishing saat mencoba mengklaim atau menjualnya." },
        { q: "Scams: Fake support", a: "Penipu yang menyamar sebagai staf pendukung (CS) di media sosial untuk menipu pengguna agar memberikan informasi rahasia wallet." },
        { q: "Wallet Drainers", a: "Skrip berbahaya pada situs web phishing yang secara otomatis mentransfer semua aset dari wallet korban segera setelah mereka menandatangani transaksi." },
        { q: "Wallet Age", a: "Metrik yang menunjukkan berapa lama sebuah alamat wallet telah aktif sejak transaksi pertamanya." }
      ]
    },
    {
      title: "5. TRANSAKSI & SMART CONTRACT",
      color: "bg-[#C084FC]",
      items: [
        { q: "Transaction (TX)", a: "Perubahan status pada blockchain yang diinisiasi oleh akun eksternal, seperti transfer nilai atau eksekusi fungsi kontrak." },
        { q: "Gas Fee", a: "Biaya komputasi yang dibayarkan kepada jaringan (miner/validator) untuk memproses dan memvalidasi transaksi." },
        { q: "Gas Token", a: "Aset native dari sebuah blockchain yang digunakan untuk membayar gas fee (contoh: ETH di Ethereum)." },
        { q: "Gas Limit & Gas Price", a: "Gas Limit: Batas maksimum unit gas yang diizinkan untuk transaksi. Gas Price: Harga per unit gas yang bersedia dibayar." },
        { q: "Nonce", a: "Angka unik yang digunakan sekali (number used once) untuk mengurutkan transaksi dari satu akun dan mencegah serangan replay." },
        { q: "Reverted TX / Failed TX", a: "Transaksi yang gagal dieksekusi (misal karena saldo kurang atau error kontrak), namun tetap dikenakan biaya gas karena komputasi telah dilakukan." },
        { q: "Smart Contract", a: "Program komputer yang berjalan di atas blockchain yang secara otomatis mengeksekusi tindakan sesuai dengan ketentuan yang telah diprogram." },
        { q: "dApp (Decentralized App)", a: "Aplikasi yang backend-nya berjalan di jaringan desentralisasi (blockchain), bukan pada server terpusat." },
        { q: "ABI (Application Binary Interface)", a: "Antarmuka standar yang memungkinkan interaksi antara aplikasi eksternal (frontend) dengan smart contract di blockchain." },
        { q: "Slippage", a: "Perbedaan antara harga yang diharapkan dari sebuah perdagangan dan harga di mana perdagangan tersebut dieksekusi." },
        { q: "MEV (Maximal Extractable Value)", a: "Nilai maksimal yang dapat diekstraksi dari produksi blok melebihi reward blok standar, seringkali dengan memanipulasi urutan transaksi." },
        { q: "Front-running / Sandwich attack", a: "Strategi predatori di mana bot mendeteksi transaksi besar yang tertunda, lalu menempatkan transaksinya sendiri sebelum dan sesudah transaksi korban untuk profit." },
        { q: "Oracles", a: "Layanan pihak ketiga yang menyediakan data dunia nyata (off-chain) ke dalam smart contract (on-chain) secara aman dan andal." }
      ]
    },
    {
      title: "6. TOKENS, NFT & DIGITAL OWNERSHIP",
      color: "bg-[#8D6E63]",
      items: [
        { q: "Fungible Token (ERC-20)", a: "Token yang dapat dipertukarkan satu sama lain dengan nilai yang sama dan dapat dipecah (divisible). Contoh: Stablecoin, Token utilitas." },
        { q: "NFT (ERC-721)", a: "Non-Fungible Token. Aset digital unik yang mewakili kepemilikan item tertentu dan tidak dapat dipertukarkan secara setara (non-interchangeable)." },
        { q: "Multi-token (ERC-1155)", a: "Standar token yang memungkinkan satu smart contract untuk mengelola berbagai jenis token (fungible, non-fungible, semi-fungible) sekaligus." },
        { q: "Metadata", a: "Data deskriptif yang terkait dengan NFT (seperti nama, gambar, atribut) yang biasanya disimpan secara terpisah (off-chain atau on-chain)." },
        { q: "Soulbound Token (SBT)", a: "Token identitas digital yang tidak dapat dipindahtangankan (non-transferable) setelah diterima oleh wallet." },
        { q: "RWA (Real World Asset)", a: "Tokenisasi aset fisik atau tradisional (seperti properti, emas, obligasi) ke dalam blockchain." },
        { q: "Governance Token", a: "Token yang memberikan hak kepada pemegangnya untuk berpartisipasi dalam pengambilan keputusan (voting) dalam sebuah protokol atau DAO." },
        { q: "Utility Token", a: "Token yang dirancang untuk memberikan akses ke layanan atau fungsi tertentu dalam ekosistem blockchain." },
        { q: "Meme Token", a: "Cryptocurrency yang nilainya terutama didorong oleh budaya internet, humor, dan komunitas, seringkali tanpa utilitas teknis yang mendalam." },
        { q: "Security Token", a: "Aset digital yang mewakili kepemilikan dalam aset eksternal atau perusahaan dan tunduk pada regulasi sekuritas federal." }
      ]
    },
    {
      title: "7. DEFI (ON-CHAIN FINANCE)",
      color: "bg-[#22D3EE]",
      items: [
        { q: "AMM (Automated Market Maker)", a: "Protokol bursa terdesentralisasi yang menggunakan rumus matematika untuk menetapkan harga aset, menggantikan sistem order book tradisional." },
        { q: "Liquidity Pool (LP)", a: "Kumpulan dana (biasanya pasangan token) yang dikunci dalam smart contract untuk memfasilitasi perdagangan di DEX." },
        { q: "DEX (Decentralized Exchange)", a: "Platform pertukaran aset kripto yang beroperasi tanpa otoritas pusat, memungkinkan perdagangan peer-to-peer langsung." },
        { q: "Slippage & Price Impact", a: "Slippage adalah selisih harga eksekusi. Price Impact adalah pengaruh ukuran perdagangan terhadap harga pasar aset di pool." },
        { q: "Impermanent Loss", a: "Kerugian sementara dana penyedia likuiditas akibat volatilitas harga aset dibandingkan jika hanya menyimpan (holding) aset tersebut." },
        { q: "Yield Farming", a: "Strategi memaksimalkan pengembalian modal dengan memindahkan aset kripto ke berbagai protokol DeFi untuk mendapatkan bunga atau token reward." },
        { q: "Staking", a: "Tindakan mengunci aset kripto dalam protokol untuk mendukung operasi jaringan (seperti validasi) dengan imbalan hadiah." },
        { q: "Restaking / LRT", a: "Konsep menggunakan kembali aset yang sudah di-stake (seperti ETH) untuk mengamankan protokol atau layanan lain guna mendapatkan yield tambahan." },
        { q: "Lending & Borrowing", a: "Layanan DeFi yang memungkinkan pengguna meminjamkan aset untuk bunga atau meminjam aset dengan memberikan jaminan (kolateral)." },
        { q: "Overcollateralized Loans", a: "Pinjaman di mana nilai jaminan yang diberikan harus lebih besar daripada nilai pinjaman untuk mengurangi risiko gagal bayar." },
        { q: "Liquidation", a: "Proses penjualan otomatis jaminan peminjam oleh protokol ketika nilai jaminan turun di bawah ambang batas aman (liquidation threshold)." },
        { q: "Stablecoins Types", a: "Fiat-backed (dijamin uang fiat), Crypto-backed (dijamin aset kripto), Algorithmic (dijaga stabilitasnya oleh algoritma/insentif)." },
        { q: "Perpetual Futures (Perps)", a: "Kontrak derivatif tanpa tanggal kedaluwarsa yang memungkinkan trader berspekulasi pada harga aset dengan leverage." },
        { q: "Options", a: "Kontrak keuangan yang memberi hak (bukan kewajiban) untuk membeli atau menjual aset pada harga tertentu sebelum tanggal tertentu." },
        { q: "TVL (Total Value Locked)", a: "Metrik yang mengukur total nilai aset yang saat ini dipertaruhkan atau dikunci dalam protokol DeFi tertentu." },
        { q: "APY vs APR", a: "APY (Annual Percentage Yield) memperhitungkan bunga majemuk (compounding). APR (Annual Percentage Rate) adalah bunga sederhana tahunan." }
      ]
    },
    {
      title: "8. CEX / DEX & MARKET MICROSTRUCTURE",
      color: "bg-[#F87171]",
      items: [
        { q: "CEX (Centralized Exchange)", a: "Platform pertukaran yang dioperasikan oleh perusahaan terpusat yang memegang kendali atas dana pengguna (custodial)." },
        { q: "DEX (Decentralized Exchange)", a: "Platform pertukaran on-chain non-custodial di mana pengguna berdagang langsung dari wallet mereka." },
        { q: "Orderbook vs AMM", a: "Orderbook: Daftar pesanan beli/jual yang dicocokkan. AMM: Perdagangan melawan pool likuiditas menggunakan algoritma harga." },
        { q: "Spot Trading", a: "Pembelian atau penjualan aset keuangan untuk penyelesaian segera (pengiriman instan)." },
        { q: "Margin Trading", a: "Perdagangan menggunakan dana pinjaman dari broker/bursa untuk meningkatkan posisi pasar." },
        { q: "Perpetuals / Futures", a: "Instrumen derivatif untuk berdagang berdasarkan pergerakan harga aset tanpa memiliki aset fisiknya." },
        { q: "Leverage", a: "Penggunaan modal pinjaman untuk meningkatkan potensi pengembalian (dan risiko) dari sebuah investasi." },
        { q: "Liquidation Price", a: "Tingkat harga di mana posisi leverage akan ditutup paksa oleh bursa karena margin tidak lagi mencukupi menutupi kerugian." },
        { q: "Limit Order", a: "Pesanan untuk membeli atau menjual aset pada harga tertentu atau lebih baik." },
        { q: "Market Order", a: "Pesanan untuk membeli atau menjual aset segera pada harga pasar terbaik yang tersedia saat itu." },
        { q: "Stop Loss / Take Profit", a: "Pesanan otomatis untuk menutup posisi guna membatasi kerugian atau mengunci keuntungan pada level harga tertentu." },
        { q: "Spread", a: "Selisih antara harga penawaran beli (bid) tertinggi dan harga penawaran jual (ask) terendah di pasar." },
        { q: "Funding Rate", a: "Pembayaran berkala antara trader long dan short di pasar perpetual futures untuk menjaga harga kontrak tetap dekat dengan harga spot." },
        { q: "Maker vs Taker", a: "Maker menyediakan likuiditas (Limit Order). Taker mengambil likuiditas (Market Order). Maker biasanya membayar fee lebih rendah." },
        { q: "Depth & Orderbook Liquidity", a: "Ukuran kemampuan pasar untuk menyerap pesanan beli/jual besar tanpa menyebabkan perubahan harga yang signifikan." }
      ]
    },
    {
      title: "9. TOKEN LAUNCH, FUNDRAISING & TOKENOMICS",
      color: "bg-[#A78BFA]",
      items: [
        { q: "Token Generation Event (TGE)", a: "Peristiwa teknis di mana token dibuat di blockchain dan didistribusikan ke publik atau investor untuk pertama kalinya." },
        { q: "ICO / IDO / IEO / LBP", a: "Metode penggalangan dana. ICO (Initial Coin Offering), IDO (DEX Offering), IEO (Exchange Offering), LBP (Liquidity Bootstrapping Pool)." },
        { q: "Seed / Private / Public Sale", a: "Tahapan penjualan token. Seed/Private untuk investor awal/institusi (harga rendah). Public untuk ritel umum (harga pasar)." },
        { q: "Fair Launch", a: "Model peluncuran token di mana semua orang memiliki kesempatan yang sama untuk mendapatkan token sejak awal, tanpa alokasi pre-mine." },
        { q: "Airdrop Launch", a: "Strategi distribusi token gratis kepada komunitas atau pengguna awal untuk desentralisasi kepemilikan dan pemasaran." },
        { q: "Vesting", a: "Periode penguncian token untuk tim atau investor awal, di mana token dilepaskan secara bertahap untuk mencegah penjualan massal (dump)." },
        { q: "Cliff", a: "Periode waktu awal dalam jadwal vesting di mana tidak ada token yang dilepaskan sama sekali." },
        { q: "Emissions", a: "Laju penciptaan dan perilisan token baru ke dalam sirkulasi (inflasi suplai)." },
        { q: "Unlock Schedule", a: "Jadwal spesifik kapan token yang terkunci (vested) akan tersedia untuk diperdagangkan." },
        { q: "Allocation", a: "Pembagian total suplai token untuk berbagai pemangku kepentingan (Tim, Investor, Kas, Komunitas, Ekosistem)." },
        { q: "Buyback & Burn", a: "Mekanisme di mana proyek membeli kembali tokennya dari pasar dan memusnahkannya secara permanen untuk mengurangi suplai." },
        { q: "Fee capture", a: "Kemampuan token atau protokol untuk mengakumulasi nilai dari biaya penggunaan jaringan dan mendistribusikannya ke pemegang token." }
      ]
    },
    {
      title: "10. GOVERNANCE, DAO & COMMUNITY",
      color: "bg-[#818CF8]",
      items: [
        { q: "DAO (Decentralized Autonomous Organization)", a: "Entitas organisasi yang diatur oleh kode smart contract dan dikendalikan oleh anggotanya melalui pemungutan suara, tanpa otoritas pusat." },
        { q: "Governance Token", a: "Token yang memberikan hak suara dalam DAO untuk mempengaruhi keputusan operasional atau strategis protokol." },
        { q: "Snapshot Voting", a: "Platform pemungutan suara off-chain yang populer digunakan oleh DAO untuk mengukur sentimen komunitas tanpa biaya gas." },
        { q: "On-chain governance", a: "Sistem tata kelola di mana hasil pemungutan suara secara otomatis dieksekusi oleh smart contract di blockchain." },
        { q: "Delegation", a: "Proses mentransfer hak suara (voting power) dari satu pemegang token ke pihak lain (delegasi) untuk mewakili mereka dalam governance." },
        { q: "Quorum & Threshold", a: "Quorum: Jumlah minimum partisipasi yang diperlukan agar voting sah. Threshold: Persentase suara setuju yang diperlukan agar proposal lolos." },
        { q: "Community Roles", a: "Struktur hierarki dalam komunitas (seperti di Discord) yang menandakan tingkat kontribusi atau status anggota." },
        { q: "Discord / Telegram structure", a: "Platform komunikasi utama untuk komunitas kripto, diorganisir dalam saluran (channels) untuk diskusi spesifik." }
      ]
    },
    {
      title: "11. AIRDROP FUNDAMENTALS",
      color: "bg-[#EC4899]",
      items: [
        { q: "What is Airdrop", a: "Distribusi aset kripto secara cuma-cuma ke alamat wallet tertentu sebagai strategi pemasaran atau desentralisasi protokol." },
        { q: "Eligibility", a: "Kriteria atau persyaratan spesifik yang harus dipenuhi oleh pengguna untuk memenuhi syarat menerima airdrop." },
        { q: "Snapshot", a: "Perekaman data status blockchain (saldo/transaksi) pada nomor blok atau waktu tertentu untuk menentukan kelayakan airdrop." },
        { q: "Retroactive Airdrop", a: "Distribusi token kepada pengguna yang telah berinteraksi dengan protokol di masa lalu, sebelum token atau airdrop diumumkan." },
        { q: "Testnet Airdrop", a: "Insentif yang diberikan kepada pengguna yang berpartisipasi dalam pengujian jaringan (testnet) sebelum peluncuran mainnet." },
        { q: "Mainnet Airdrop", a: "Insentif yang diberikan berdasarkan aktivitas pengguna di jaringan utama (mainnet) yang melibatkan nilai aset riil." },
        { q: "Points Airdrop", a: "Sistem di mana pengguna mengumpulkan poin melalui aktivitas, yang nantinya dapat dikonversi menjadi token saat TGE." },
        { q: "Quests / Campaign", a: "Tugas-tugas off-chain (sosial) atau on-chain yang terstruktur di platform pihak ketiga (Galxe/Zealy) untuk mendapatkan reward." },
        { q: "Referral-based Airdrop", a: "Mekanisme distribusi yang memberikan insentif tambahan kepada pengguna yang berhasil mengundang pengguna baru." },
        { q: "Node/Validator Airdrop", a: "Alokasi token khusus untuk operator node atau validator yang telah mendukung infrastruktur jaringan." },
        { q: "NFT-based Airdrop", a: "Distribusi token kepada pemegang koleksi NFT tertentu sebagai bentuk reward loyalitas." }
      ]
    },
    {
      title: "12. AIRDROP ADVANCED & SCORING",
      color: "bg-[#BE185D]",
      items: [
        { q: "Points System", a: "Mekanisme pelacakan kontribusi pengguna secara kuantitatif untuk menentukan besaran alokasi airdrop secara proporsional." },
        { q: "Weighted Activity", a: "Sistem penilaian di mana jenis aktivitas tertentu (misal: Liquidity Provision) memiliki bobot nilai lebih tinggi daripada yang lain." },
        { q: "Multipliers / Boost", a: "Faktor pengali yang meningkatkan skor atau alokasi airdrop pengguna berdasarkan kriteria tertentu (misal: durasi penggunaan, role komunitas)." },
        { q: "Role-Based Allocation", a: "Alokasi token yang didedikasikan untuk anggota komunitas dengan peran atau status tertentu (misal: Kontributor Inti)." },
        { q: "Social Airdrop", a: "Insentif berbasis aktivitas media sosial untuk meningkatkan kesadaran merek dan jangkauan proyek." },
        { q: "Yapper Airdrop", a: "Istilah slang untuk airdrop yang menargetkan pengguna aktif yang sering membahas proyek di media sosial (engagement farming)." },
        { q: "Smart Followers", a: "Metrik kualitas pengikut media sosial yang memprioritaskan akun-akun bereputasi atau berpengaruh dalam industri kripto." },
        { q: "Social Footprint", a: "Analisis jejak digital pengguna untuk memverifikasi keaslian dan pengaruh sosial mereka." },
        { q: "Multi-platform contribution", a: "Strategi berkontribusi di berbagai saluran (on-chain, diskusi discord, media sosial) untuk memaksimalkan peluang airdrop." },
        { q: "Governance participation", a: "Keterlibatan aktif dalam proses voting DAO yang sering menjadi kriteria kualitatif penilaian airdrop." }
      ]
    },
    {
      title: "13. SYBIL, BEHAVIOR & RISK FILTERING",
      color: "bg-[#B91C1C]",
      items: [
        { q: "Sybil", a: "Serangan di mana satu entitas menciptakan banyak identitas palsu untuk memanipulasi sistem atau mendapatkan keuntungan tidak adil (farming airdrop)." },
        { q: "Sybil Filtering", a: "Proses identifikasi dan eliminasi akun Sybil dari daftar penerima airdrop menggunakan analisis data." },
        { q: "Wallet Pattern Analysis", a: "Teknik deteksi Sybil dengan menganalisis kesamaan pola perilaku transaksi antar wallet (waktu, jumlah, tujuan)." },
        { q: "Wallet Linking / Clustering", a: "Metode mengelompokkan wallet-wallet terpisah yang memiliki keterhubungan sumber dana atau jejak transaksi yang sama." },
        { q: "Funding source tracing", a: "Pelacakan asal dana wallet, seringkali untuk mengidentifikasi wallet yang didanai secara massal dari satu sumber (CEX/Mixer)." },
        { q: "Farming Behavior", a: "Pola aktivitas yang berulang dan tidak alami yang menunjukkan tujuan tunggal untuk mengejar insentif, bukan penggunaan organik." },
        { q: "Wallet Age Filtering", a: "Kriteria penyaringan yang mengecualikan wallet yang baru dibuat mendekati waktu snapshot." },
        { q: "IP / Geo Filtering", a: "Pembatasan akses atau kelayakan berdasarkan alamat IP atau lokasi geografis pengguna (sanksi/regulasi)." },
        { q: "Bot vs Human Pattern", a: "Analisis heuristik untuk membedakan aktivitas otomatis (bot) dengan perilaku pengguna manusia yang organik." },
        { q: "On-chain Reputation", a: "Sistem penilaian kredibilitas wallet berdasarkan riwayat aktivitas dan verifikasi identitas terdesentralisasi (DID)." }
      ]
    },
    {
      title: "14. NODES, VALIDATORS & INFRA",
      color: "bg-[#4B5563]",
      items: [
        { q: "Node (Full/Archive/RPC)", a: "Perangkat lunak server yang memelihara salinan blockchain dan melayani permintaan data." },
        { q: "Validator", a: "Entitas yang berpartisipasi dalam konsensus jaringan dengan mempertaruhkan aset dan memvalidasi blok." },
        { q: "Delegation", a: "Mekanisme staking di mana pemegang token mendelegasikan hak validasi mereka ke validator lain dengan imbalan bagi hasil." },
        { q: "Slashing", a: "Mekanisme hukuman dalam PoS di mana sebagian aset validator disita karena perilaku buruk atau downtime." },
        { q: "Uptime & Performance", a: "Metrik keandalan validator yang mengukur ketersediaan server dan efisiensi partisipasi konsensus." },
        { q: "Sequencer", a: "Komponen dalam arsitektur Layer 2 (Rollup) yang bertugas mengumpulkan, mengurutkan, dan mengirimkan transaksi ke Layer 1." },
        { q: "Indexer", a: "Layanan infrastruktur yang mengindeks dan menyusun data blockchain agar mudah dikuery oleh aplikasi (contoh: The Graph)." },
        { q: "RPC Providers", a: "Penyedia layanan infrastruktur yang menyediakan titik akhir (endpoint) API untuk menghubungkan aplikasi dApp ke node blockchain." },
        { q: "DePIN", a: "Decentralized Physical Infrastructure Networks. Jaringan yang memberi insentif pada penyediaan infrastruktur fisik (seperti penyimpanan, sensor, nirkabel) secara terdesentralisasi." }
      ]
    },
    {
      title: "15. ANALYTICS, TOOLS & DATA",
      color: "bg-[#059669]",
      items: [
        { q: "Price & Market Aggregators", a: "Platform yang mengumpulkan dan menyajikan data harga aset kripto dari berbagai bursa (contoh: CoinGecko)." },
        { q: "DeFi Analytics", a: "Alat untuk memantau metrik protokol DeFi seperti Total Value Locked (TVL), volume, dan pendapatan (contoh: DefiLlama)." },
        { q: "On-chain Analytics", a: "Platform intelijen yang menganalisis data mentah blockchain untuk melacak aliran dana dan perilaku entitas (contoh: Nansen)." },
        { q: "Dune-style dashboards", a: "Platform analitik berbasis komunitas yang memungkinkan pengguna membuat visualisasi data blockchain menggunakan kueri SQL." },
        { q: "Portfolio Trackers", a: "Aplikasi manajemen aset yang melacak saldo dan posisi investasi pengguna di berbagai chain dan protokol." },
        { q: "Gas Trackers", a: "Alat untuk memantau biaya gas jaringan secara real-time guna mengoptimalkan waktu transaksi." },
        { q: "NFT Analytics", a: "Alat khusus untuk menganalisis pasar NFT, termasuk kelangkaan, volume, dan tren harga lantai (floor price)." },
        { q: "Governance Trackers", a: "Platform untuk memantau dan berpartisipasi dalam proposal tata kelola DAO di berbagai ekosistem." }
      ]
    },
    {
      title: "16. NARRATIVES & SEKTOR",
      color: "bg-[#D97706]",
      items: [
        { q: "L1 / L2 Narratives", a: "Tren pasar yang berfokus pada persaingan dan inovasi antara protokol Layer 1 dan solusi skalabilitas Layer 2." },
        { q: "DeFi 1.0 / 2.0", a: "Evolusi protokol keuangan terdesentralisasi, dari dasar (Swap/Lend) menuju efisiensi modal dan likuiditas milik protokol (POL)." },
        { q: "GameFi", a: "Sektor yang menggabungkan game dengan elemen keuangan (Play-to-Earn), memungkinkan kepemilikan aset dalam game." },
        { q: "SocialFi", a: "Integrasi media sosial dengan keuangan terdesentralisasi, memungkinkan monetisasi interaksi sosial." },
        { q: "NFT & Metaverse", a: "Ekosistem aset digital unik dan dunia virtual yang imersif." },
        { q: "AI Crypto", a: "Konvergensi antara teknologi blockchain dan kecerdasan buatan, termasuk komputasi terdesentralisasi dan agen AI." },
        { q: "RWA (Real World Assets)", a: "Tokenisasi aset dunia nyata (properti, komoditas, surat berharga) agar dapat diperdagangkan di blockchain." },
        { q: "Privacy Coins", a: "Cryptocurrency yang dirancang untuk menjaga privasi dan anonimitas transaksi pengguna (contoh: Monero)." },
        { q: "DePIN", a: "Jaringan infrastruktur fisik terdesentralisasi yang didukung oleh insentif token." },
        { q: "Meme Coins", a: "Aset kripto yang nilainya didorong oleh sentimen sosial, budaya internet, dan komunitas, seringkali dengan volatilitas tinggi." },
        { q: "Modular Blockchain", a: "Arsitektur blockchain yang memisahkan fungsi inti (eksekusi, penyelesaian, ketersediaan data) ke lapisan khusus." },
        { q: "Restaking / Shared Security", a: "Konsep menggunakan keamanan ekonomi dari satu jaringan (seperti Ethereum) untuk mengamankan jaringan lain." }
      ]
    },
    {
      title: "17. RISK, REGULATION & TAX (HIGH-LEVEL)",
      color: "bg-[#DC2626]",
      items: [
        { q: "Regulatory Risk", a: "Risiko ketidakpastian hukum dan perubahan kebijakan pemerintah yang dapat berdampak negatif pada industri kripto." },
        { q: "KYC / AML", a: "Prosedur 'Know Your Customer' dan 'Anti-Money Laundering' yang wajib dipatuhi oleh penyedia layanan keuangan untuk mencegah kejahatan finansial." },
        { q: "Jurisdiction / Geo-restriction", a: "Pembatasan layanan berdasarkan lokasi geografis pengguna akibat perbedaan regulasi antar negara." },
        { q: "Tax on capital gains", a: "Kewajiban pajak atas keuntungan yang diperoleh dari penjualan atau pertukaran aset kripto." },
        { q: "Tax reporting", a: "Proses pencatatan dan pelaporan aktivitas transaksi kripto kepada otoritas pajak." },
        { q: "Compliance", a: "Kepatuhan terhadap standar hukum dan peraturan industri yang berlaku." }
      ]
    },
    {
      title: "18. PSIKOLOGI & STRATEGI",
      color: "bg-[#7C3AED]",
      items: [
        { q: "FOMO (Fear Of Missing Out)", a: "Kecemasan psikologis karena merasa tertinggal dari peluang keuntungan, sering menyebabkan keputusan investasi impulsif." },
        { q: "FUD (Fear, Uncertainty, Doubt)", a: "Penyebaran informasi negatif atau menyesatkan untuk menimbulkan ketakutan dan mempengaruhi persepsi pasar." },
        { q: "HODL mindset", a: "Strategi investasi jangka panjang di mana aset dipertahankan meskipun terjadi volatilitas pasar jangka pendek." },
        { q: "DCA (Dollar Cost Averaging)", a: "Strategi investasi rutin dengan jumlah nominal tetap secara berkala untuk mengurangi dampak volatilitas harga." },
        { q: "Risk Management", a: "Proses identifikasi, analisis, dan mitigasi risiko investasi untuk melindungi modal." },
        { q: "Convexity", a: "Profil risiko-imbalan asimetris di mana potensi keuntungan jauh melebihi potensi kerugian yang terbatas." },
        { q: "Time Horizon", a: "Jangka waktu yang direncanakan investor untuk memegang aset sebelum dijual." },
        { q: "Overtrading", a: "Aktivitas perdagangan berlebihan yang seringkali kontraproduktif karena biaya transaksi tinggi dan keputusan emosional." },
        { q: "Gambler’s Fallacy", a: "Kesalahan logika di mana seseorang percaya bahwa peristiwa masa lalu mempengaruhi probabilitas peristiwa acak di masa depan." },
        { q: "Profit-taking strategy", a: "Rencana sistematis untuk merealisasikan keuntungan investasi pada target harga tertentu." }
      ]
    },
    {
      title: "19. ROLES & CAREERS IN WEB3",
      color: "bg-[#4F46E5]",
      items: [
        { q: "Dev (Smart contract, fullstack)", a: "Pengembang perangkat lunak yang berspesialisasi dalam membangun protokol blockchain dan dApps." },
        { q: "Protocol Researcher", a: "Profesional yang meneliti desain protokol, mekanisme insentif, dan tren teknologi blockchain." },
        { q: "Tokenomics Designer", a: "Ahli yang merancang model ekonomi dan struktur insentif token untuk keberlanjutan proyek." },
        { q: "Community Manager", a: "Pengelola interaksi komunitas dan saluran komunikasi resmi proyek." },
        { q: "Content Creator / Yapper", a: "Pembuat konten edukasi atau pemasaran untuk meningkatkan visibilitas proyek." },
        { q: "Designer (UI/UX, branding)", a: "Perancang antarmuka pengguna dan identitas visual produk Web3." },
        { q: "BD (Business Development)", a: "Profesional yang bertanggung jawab menjalin kemitraan strategis dan integrasi ekosistem." },
        { q: "Growth / Airdrop Strategist", a: "Spesialis yang merancang kampanye pertumbuhan pengguna dan strategi distribusi token." },
        { q: "Security Auditor", a: "Pakar keamanan yang meninjau kode smart contract untuk mengidentifikasi kerentanan." },
        { q: "Node Operator / Infra Provider", a: "Penyedia infrastruktur teknis yang menjalankan node atau validator jaringan." }
      ]
    }
  ];

  // --- DATA CURRICULUM (ENGLISH - STANDARD DETAIL) ---
  const fullCurriculumEN = [
    {
      title: "0. BASIC FUNDAMENTALS (PRE-CRYPTO)",
      color: "bg-gray-300",
      items: [
        { q: "What is Money", a: "Money is any item or verifiable record that is generally accepted as payment for goods and services. It serves three main functions: a Medium of Exchange, a Unit of Account, and a Store of Value." },
        { q: "Fiat Money", a: "Government-issued currency that is not backed by a physical commodity like gold. Its value is derived from government decree and public trust in the issuing authority's economic stability." },
        { q: "Banking System", a: "A centralized financial system where Central Banks control money supply, and Commercial Banks facilitate transactions, lending, and deposit services using fractional reserve banking." },
        { q: "Inflation & Deflation", a: "Inflation is the rate at which the general level of prices for goods and services is rising, eroding purchasing power. Deflation is the general decline of the price level." },
        { q: "Interest Rate", a: "The amount charged by a lender to a borrower for the use of assets, or paid by a bank to a depositor. Central banks use interest rates as a primary tool to control inflation and economic growth." },
        { q: "Risk vs Reward", a: "The investment principle that the potential return rises with an increase in risk. High-potential crypto assets generally carry higher volatility and risk of loss." },
        { q: "Time Preference", a: "An economic concept describing the relative valuation placed on receiving a good or value at an earlier date compared with a later date. Low time preference enables long-term capital accumulation." }
      ]
    },
    {
      title: "1. CRYPTO FOUNDATIONS",
      color: "bg-[#4ADE80]",
      items: [
        { q: "Cryptocurrency", a: "A digital or virtual currency that uses cryptography for security and operates on a decentralized network, distinct from central authority issuance." },
        { q: "Digital Asset", a: "An asset in binary format that comes with the right of use. In crypto, it refers to tokenized assets on a blockchain that possess properties of scarcity and verifiable ownership." },
        { q: "Coin vs Token", a: "A Coin is the native asset of a specific blockchain (e.g., BTC, ETH). A Token is an asset built upon an existing blockchain using smart contracts (e.g., ERC-20 tokens)." },
        { q: "Stablecoin", a: "A cryptocurrency designed to minimize price volatility by pegging its value to a stable asset, such as a fiat currency (USD) or commodity." },
        { q: "Market Cap", a: "The total market value of a cryptocurrency's circulating supply. Calculated as: Current Price × Circulating Supply." },
        { q: "FDV (Fully Diluted Valuation)", a: "The total market capitalization of a crypto asset if its entire supply (including locked and future tokens) were in circulation at the current price." },
        { q: "Circulating vs Total vs Max Supply", a: "Circulating: Coins currently in public hands. Total: Coins created minus burned. Max: The hard limit of coins that will ever exist." },
        { q: "Liquidity", a: "The efficiency or ease with which an asset can be converted into cash without affecting its market price. High liquidity indicates an active market." },
        { q: "Volume", a: "The total amount of an asset traded over a specific period (usually 24 hours). Volume is a key indicator of market activity and interest." },
        { q: "Volatility", a: "A statistical measure of the dispersion of returns for a given security or market index. Crypto markets are characterized by high volatility." }
      ]
    },
    {
      title: "2. WEB GENERATIONS & WEB3 CORE",
      color: "bg-[#60A5FA]",
      items: [
        { q: "Web1 (Read)", a: "The early static internet (Information Economy). Users could only consume content created by publishers. Read-only." },
        { q: "Web2 (Read + Write)", a: "The social web (Platform Economy). Users create content, but centralized platforms own the data and monetization channels." },
        { q: "Web3 (Read + Write + Own)", a: "The decentralized web (Token Economy). Users own their data, identity, and digital assets via blockchain technology." },
        { q: "What is Web3", a: "An internet vision based on decentralized blockchains, enabling permissionless innovation and user sovereignty." },
        { q: "Centralized vs Decentralized", a: "Centralized: Control is held by a single entity. Decentralized: Control is distributed among many participants, removing single points of failure." },
        { q: "Permissionless", a: "A network property where anyone can participate without authorization from a governing body." },
        { q: "Trust vs Trustless", a: "Trust relies on the integrity of an intermediary. Trustless relies on verifiable code and cryptographic proofs, removing the need for intermediary trust." },
        { q: "Custodial vs Non-Custodial", a: "Custodial: A third party holds your private keys. Non-Custodial: You hold full control of your private keys and assets." },
        { q: "Open Source", a: "Software with source code that anyone can inspect, modify, and enhance. Essential for security and trust in crypto." },
        { q: "P2P (Peer to Peer)", a: "Direct interaction between two parties without a third-party intermediary." },
        { q: "Interoperability", a: "The ability of different blockchain systems to exchange information and value with one another." },
        { q: "On-chain Identity", a: "Digital identity established through blockchain transaction history and cryptographic proofs." },
        { q: "ENS (Ethereum Name Service)", a: "A distributed naming system that maps human-readable names to machine-readable identifiers like crypto addresses." },
        { q: "Blockchain Explorer", a: "A search engine that allows users to explore and verify public blockchain data, including blocks, transactions, and addresses." }
      ]
    },
    {
      title: "3. BLOCKCHAIN & NETWORK ARCHITECTURE",
      color: "bg-[#FACC15]",
      items: [
        { q: "Blockchain", a: "A distributed, immutable ledger that records transactions in a series of blocks linked via cryptography." },
        { q: "Blocks & Transactions", a: "A Block is a container for valid transactions. Each block contains a timestamp and a link to the previous block, forming a chain." },
        { q: "Nodes", a: "Computers connected to the network that maintain a copy of the blockchain and validate protocol rules." },
        { q: "Validators", a: "Network participants responsible for verifying transactions and proposing new blocks, often incentivized by rewards." },
        { q: "Full node vs Light client", a: "Full nodes store the complete blockchain history. Light clients store only headers for simplified verification." },
        { q: "Consensus Mechanisms", a: "Fault-tolerant algorithms used to achieve agreement on a single data value or state of the network among distributed processes." },
        { q: "PoW (Proof of Work)", a: "Consensus mechanism requiring miners to solve complex mathematical puzzles to validate transactions and secure the network." },
        { q: "PoS (Proof of Stake)", a: "Consensus mechanism where validators are chosen to create blocks based on the amount of coins they hold and stake." },
        { q: "DPoS (Delegated Proof of Stake)", a: "A variation of PoS where users vote for delegates to validate blocks on their behalf." },
        { q: "PoA (Proof of Authority)", a: "Consensus based on identity and reputation, where validators are pre-approved entities." },
        { q: "Mainnet vs Testnet vs Devnet", a: "Mainnet: The live production network with real value. Testnet: Simulation network for testing. Devnet: Developer environment." },
        { q: "Layer 1 (L1)", a: "The base blockchain protocol layer where final settlement occurs (e.g., Ethereum, Bitcoin)." },
        { q: "Layer 2 (L2)", a: "Scaling solutions built on top of L1 to increase transaction throughput and reduce costs while inheriting L1 security." },
        { q: "Rollups (Optimistic / ZK)", a: "L2 technologies that execute transactions off-chain and post data summaries to L1." },
        { q: "Sharding", a: "Database partitioning technique that splits the blockchain into smaller segments to process transactions in parallel." },
        { q: "Data Availability (DA)", a: "Guarantee that transaction data required to verify blocks is available to all network participants." },
        { q: "Finality", a: "The assurance that a confirmed transaction cannot be reversed or altered." }
      ]
    },
    {
      title: "4. WALLETS & SECURITY",
      color: "bg-[#FB923C]",
      items: [
        { q: "Web3 Wallet", a: "Software or hardware that stores cryptographic keys to interact with blockchain networks." },
        { q: "Public Address", a: "Alphanumeric identifier derived from the public key, safe to share for receiving funds." },
        { q: "Private Key", a: "Secret cryptographic key used to sign transactions and prove ownership. Must never be shared." },
        { q: "Seed Phrase (Recovery Phrase)", a: "A sequence of 12-24 words that generates the master private key for a wallet." },
        { q: "Hot vs Cold Wallet", a: "Hot Wallet: Connected to the internet (convenient, less secure). Cold Wallet: Offline storage (highly secure)." },
        { q: "Self-Custody", a: "Holding and managing your own private keys without reliance on a custodian." },
        { q: "Multi-sig Wallet", a: "Wallet requiring multiple signatures from different keys to authorize a transaction." },
        { q: "MPC / TSS Wallet", a: "Multi-Party Computation. Private keys are split into shares and never fully reconstructed during signing." },
        { q: "Wallet Signature", a: "Cryptographic proof of ownership used for authentication without broadcasting a transaction." },
        { q: "Allowance / Approvals", a: "Permission granted to a smart contract to spend a specific amount of tokens from a wallet." },
        { q: "Revoke", a: "Canceling smart contract allowances to prevent unauthorized access to funds." },
        { q: "Phishing", a: "Fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity." },
        { q: "Scams: Rug pull", a: "Developers abandoning a project and taking investors' funds." },
        { q: "Scams: Honeypot", a: "Malicious contract that allows buying tokens but prevents selling them." },
        { q: "Scams: Fake airdrop", a: "Distribution of malicious tokens to lure users into connecting wallets to phishing sites." },
        { q: "Scams: Fake support", a: "Impersonators on social media pretending to be support staff to steal private keys." },
        { q: "Wallet Drainers", a: "Malicious scripts that sweep all assets from a wallet upon signature approval." },
        { q: "Wallet Age", a: "The duration since a wallet's first transaction, often used as a reputation metric." }
      ]
    },
    {
      title: "5. TRANSAKSI & SMART CONTRACT",
      color: "bg-[#C084FC]",
      items: [
        { q: "Transaction (TX)", a: "A signed instruction to change the state of the blockchain." },
        { q: "Gas Fee", a: "Fee paid to network validators for the computational effort required to execute a transaction." },
        { q: "Gas Token", a: "Native blockchain asset used to pay for gas fees (e.g., ETH)." },
        { q: "Gas Limit & Gas Price", a: "Gas Limit: Max gas units allowed. Gas Price: Cost per unit of gas." },
        { q: "Nonce", a: "Number used once; a counter to order transactions and prevent replay attacks." },
        { q: "Reverted TX / Failed TX", a: "A transaction that fails execution but is recorded on-chain, incurring gas costs." },
        { q: "Smart Contract", a: "Self-executing contract with the terms of the agreement directly written into code." },
        { q: "dApp (Decentralized App)", a: "Application running on a decentralized network via smart contracts." },
        { q: "ABI (Application Binary Interface)", a: "Standard interface for interacting with smart contracts from external applications." },
        { q: "Slippage", a: "The difference between the expected price of a trade and the executed price." },
        { q: "MEV (Maximal Extractable Value)", a: "Value extracted by miners/validators by reordering or including transactions in a block." },
        { q: "Front-running / Sandwich attack", a: "Predatory trading strategy exploiting pending transaction visibility." },
        { q: "Oracles", a: "Third-party services that feed off-chain data to on-chain smart contracts." }
      ]
    },
    {
      title: "6. TOKENS, NFT & DIGITAL OWNERSHIP",
      color: "bg-[#8D6E63]",
      items: [
        { q: "Fungible Token (ERC-20)", a: "Interchangeable tokens where each unit is identical in value." },
        { q: "NFT (ERC-721)", a: "Non-Fungible Token. Unique digital asset representing ownership of a specific item." },
        { q: "Multi-token (ERC-1155)", a: "Standard for managing multiple token types (fungible and non-fungible) in one contract." },
        { q: "Metadata", a: "Descriptive data associated with an NFT (name, image, attributes)." },
        { q: "Soulbound Token (SBT)", a: "Non-transferable identity token bound to a specific wallet." },
        { q: "RWA (Real World Asset)", a: "Tokenized physical or traditional financial assets on the blockchain." },
        { q: "Governance Token", a: "Token granting voting rights in a DAO or protocol." },
        { q: "Utility Token", a: "Token providing access to a specific product or service within an ecosystem." },
        { q: "Meme Token", a: "Cryptocurrency deriving value primarily from social sentiment and internet culture." },
        { q: "Security Token", a: "Digital asset representing ownership in an external asset, subject to securities regulation." }
      ]
    },
    {
      title: "7. DEFI (ON-CHAIN FINANCE)",
      color: "bg-[#22D3EE]",
      items: [
        { q: "AMM (Automated Market Maker)", a: "DEX protocol using algorithmic pricing and liquidity pools instead of order books." },
        { q: "Liquidity Pool (LP)", a: "Crowdsourced pool of tokens locked in a smart contract to facilitate trading." },
        { q: "DEX (Decentralized Exchange)", a: "Peer-to-peer marketplace for trading crypto assets without intermediaries." },
        { q: "Slippage & Price Impact", a: "Impact of trade size on market price within a liquidity pool." },
        { q: "Impermanent Loss", a: "Temporary loss of funds for liquidity providers due to price volatility." },
        { q: "Yield Farming", a: "Strategy to maximize returns by moving assets across DeFi protocols." },
        { q: "Staking", a: "Locking assets to support network operations in exchange for rewards." },
        { q: "Restaking / LRT", a: "Reusing staked assets to secure additional protocols." },
        { q: "Lending & Borrowing", a: "DeFi services for lending assets for interest or borrowing against collateral." },
        { q: "Overcollateralized Loans", a: "Loans where collateral value exceeds loan value to mitigate default risk." },
        { q: "Liquidation", a: "Automatic sale of collateral when its value drops below a required threshold." },
        { q: "Stablecoins Types", a: "Fiat-backed, Crypto-backed, or Algorithmic mechanisms to maintain price stability." },
        { q: "Perpetual Futures (Perps)", a: "Derivatives contracts without expiry allowing leveraged trading." },
        { q: "Options", a: "Contracts giving the right to buy/sell assets at a specific price." },
        { q: "TVL (Total Value Locked)", a: "Aggregate value of assets deposited in a DeFi protocol." },
        { q: "APY vs APR", a: "APY includes compounding interest; APR is simple interest." }
      ]
    },
    {
      title: "8. CEX / DEX & MARKET MICROSTRUCTURE",
      color: "bg-[#F87171]",
      items: [
        { q: "CEX (Centralized Exchange)", a: "Platform managed by a central entity holding user funds (Custodial)." },
        { q: "DEX (Decentralized Exchange)", a: "Platform facilitating direct on-chain trading (Non-Custodial)." },
        { q: "Orderbook vs AMM", a: "Orderbook matches buy/sell orders. AMM trades against a liquidity pool." },
        { q: "Spot Trading", a: "Direct purchase/sale of assets for immediate settlement." },
        { q: "Margin Trading", a: "Trading with borrowed funds to increase position size." },
        { q: "Perpetuals / Futures", a: "Trading asset price movements without owning the underlying asset." },
        { q: "Leverage", a: "Using borrowed capital to amplify potential returns (and risks)." },
        { q: "Liquidation Price", a: "Price level at which a leveraged position is forcibly closed." },
        { q: "Limit Order", a: "Order to execute a trade at a specific price or better." },
        { q: "Market Order", a: "Order to execute a trade immediately at current market price." },
        { q: "Stop Loss / Take Profit", a: "Automated orders to close positions at set price levels." },
        { q: "Spread", a: "Difference between the highest buy and lowest sell price." },
        { q: "Funding Rate", a: "Periodic payments to align perpetual contract prices with spot prices." },
        { q: "Maker vs Taker", a: "Maker adds liquidity; Taker removes liquidity." },
        { q: "Depth & Orderbook Liquidity", a: "Market's ability to sustain large orders without significant price impact." }
      ]
    },
    {
      title: "9. TOKEN LAUNCH, FUNDRAISING & TOKENOMICS",
      color: "bg-[#A78BFA]",
      items: [
        { q: "Token Generation Event (TGE)", a: "The moment a token is created on the blockchain." },
        { q: "ICO / IDO / IEO / LBP", a: "Fundraising mechanisms: Initial Coin/DEX/Exchange Offering, Liquidity Bootstrapping Pool." },
        { q: "Seed / Private / Public Sale", a: "Investment rounds with varying pricing and access." },
        { q: "Fair Launch", a: "Launch with equal access and no pre-mine allocations." },
        { q: "Airdrop Launch", a: "Distributing tokens freely to build community and decentralization." },
        { q: "Vesting", a: "Lock-up period for early allocations to prevent market dumping." },
        { q: "Cliff", a: "Initial period with zero token unlocks." },
        { q: "Emissions", a: "Rate at which new tokens are released into circulation." },
        { q: "Unlock Schedule", a: "Timeline of when vested tokens become liquid." },
        { q: "Allocation", a: "Distribution plan of token supply to stakeholders." },
        { q: "Buyback & Burn", a: "Deflationary mechanism reducing supply using project revenue." },
        { q: "Fee capture", a: "Token's ability to accrue value from protocol usage fees." }
      ]
    },
    {
      title: "10. GOVERNANCE, DAO & COMMUNITY",
      color: "bg-[#818CF8]",
      items: [
        { q: "DAO (Decentralized Autonomous Organization)", a: "Member-owned organization governed by smart contracts." },
        { q: "Governance Token", a: "Token granting voting rights on protocol decisions." },
        { q: "Snapshot Voting", a: "Off-chain signaling/voting platform for DAOs." },
        { q: "On-chain governance", a: "Binding voting system executed by code." },
        { q: "Delegation", a: "Assigning voting power to a representative." },
        { q: "Quorum & Threshold", a: "Requirements for a valid vote outcome." },
        { q: "Community Roles", a: "Status hierarchy within community platforms." },
        { q: "Discord / Telegram structure", a: "Primary communication channels for crypto communities." }
      ]
    },
    {
      title: "11. AIRDROP FUNDAMENTALS",
      color: "bg-[#EC4899]",
      items: [
        { q: "What is Airdrop", a: "Unsolicited distribution of tokens to wallet addresses." },
        { q: "Eligibility", a: "Criteria determining qualification for an airdrop." },
        { q: "Snapshot", a: "Recording of blockchain state at a specific block height." },
        { q: "Retroactive Airdrop", a: "Rewards for past historical interaction." },
        { q: "Testnet Airdrop", a: "Rewards for participating in network testing." },
        { q: "Mainnet Airdrop", a: "Rewards based on real-value mainnet activity." },
        { q: "Points Airdrop", a: "System converting accrued activity points into tokens." },
        { q: "Quests / Campaign", a: "Structured tasks on platforms like Galxe." },
        { q: "Referral-based Airdrop", a: "Incentives for user acquisition." },
        { q: "Node/Validator Airdrop", a: "Rewards for infrastructure providers." },
        { q: "NFT-based Airdrop", a: "Distribution to holders of specific NFT collections." }
      ]
    },
    {
      title: "12. AIRDROP ADVANCED & SCORING",
      color: "bg-[#BE185D]",
      items: [
        { q: "Points System", a: "Quantitative tracking of user contribution." },
        { q: "Weighted Activity", a: "Scoring system prioritizing high-value actions (e.g., liquidity)." },
        { q: "Multipliers / Boost", a: "Factors increasing reward allocation." },
        { q: "Role-Based Allocation", a: "Guaranteed rewards for specific community roles." },
        { q: "Social Airdrop", a: "Rewards for social media engagement." },
        { q: "Yapper Airdrop", a: "Incentives for active discussion and promotion." },
        { q: "Smart Followers", a: "Quality metric for social influence." },
        { q: "Social Footprint", a: "Analysis of digital presence and influence." },
        { q: "Multi-platform contribution", a: "Engagement across chain, chat, and social." },
        { q: "Governance participation", a: "Voting activity as a qualification metric." }
      ]
    },
    {
      title: "13. SYBIL, BEHAVIOR & RISK FILTERING",
      color: "bg-[#B91C1C]",
      items: [
        { q: "Sybil", a: "Identity manipulation attack using multiple fake accounts." },
        { q: "Sybil Filtering", a: "Removing fake users from distribution lists." },
        { q: "Wallet Pattern Analysis", a: "Detecting algorithmic or coordinated behavior." },
        { q: "Wallet Linking / Clustering", a: "Identifying connections between separate wallets." },
        { q: "Funding source tracing", a: "Tracking origin of funds to identify Sybils." },
        { q: "Farming Behavior", a: "Non-organic activity solely for rewards." },
        { q: "Wallet Age Filtering", a: "Excluding recently created wallets." },
        { q: "IP / Geo Filtering", a: "Blocking access based on location." },
        { q: "Bot vs Human Pattern", a: "Heuristic analysis of user behavior." },
        { q: "On-chain Reputation", a: "Scoring wallet credibility based on history." }
      ]
    },
    {
      title: "14. NODES, VALIDATORS & INFRA",
      color: "bg-[#4B5563]",
      items: [
        { q: "Node", a: "Server maintaining blockchain ledger copy." },
        { q: "Validator", a: "Node participating in consensus." },
        { q: "Delegation", a: "Staking tokens with a validator." },
        { q: "Slashing", a: "Penalty for validator misconduct." },
        { q: "Uptime & Performance", a: "Reliability metrics for validators." },
        { q: "Sequencer", a: "L2 component ordering transactions." },
        { q: "Indexer", a: "Service organizing blockchain data." },
        { q: "RPC Providers", a: "Infrastructure for connecting to blockchains." },
        { q: "DePIN", a: "Decentralized Physical Infrastructure Networks." }
      ]
    },
    {
      title: "15. ANALYTICS, TOOLS & DATA",
      color: "bg-[#059669]",
      items: [
        { q: "Price & Market Aggregators", a: "Platforms consolidating crypto market data." },
        { q: "DeFi Analytics", a: "Tools for tracking protocol metrics." },
        { q: "On-chain Analytics", a: "Intelligence on blockchain transactions." },
        { q: "Dune-style dashboards", a: "Custom SQL-based data visualization." },
        { q: "Portfolio Trackers", a: "Cross-chain asset management tools." },
        { q: "Gas Trackers", a: "Network fee monitoring tools." },
        { q: "NFT Analytics", a: "Tools for NFT market data." },
        { q: "Governance Trackers", a: "Monitors for DAO proposals." }
      ]
    },
    {
      title: "16. NARRATIVES & SEKTOR",
      color: "bg-[#D97706]",
      items: [
        { q: "L1 / L2 Narratives", a: "Market trends focusing on base layers vs scaling." },
        { q: "DeFi 1.0 / 2.0", a: "Evolution of decentralized finance protocols." },
        { q: "GameFi", a: "Intersection of gaming and finance." },
        { q: "SocialFi", a: "Decentralized social media." },
        { q: "NFT & Metaverse", a: "Digital ownership and virtual worlds." },
        { q: "AI Crypto", a: "Blockchain and AI convergence." },
        { q: "RWA", a: "Tokenized real-world assets." },
        { q: "Privacy Coins", a: "Cryptocurrencies offering anonymity." },
        { q: "DePIN", a: "Decentralized physical infrastructure." },
        { q: "Meme Coins", a: "Community and culture-driven assets." },
        { q: "Modular Blockchain", a: "Specialized blockchain architecture." },
        { q: "Restaking", a: "Reusing staked assets for security." }
      ]
    },
    {
      title: "17. RISK, REGULATION & TAX (HIGH-LEVEL)",
      color: "bg-[#DC2626]",
      items: [
        { q: "Regulatory Risk", a: "Impact of laws and government policies." },
        { q: "KYC / AML", a: "Identity verification and anti-money laundering." },
        { q: "Jurisdiction", a: "Legal authority based on location." },
        { q: "Tax on capital gains", a: "Tax liability on investment profits." },
        { q: "Tax reporting", a: "Compliance with tax filing requirements." },
        { q: "Compliance", a: "Adherence to laws and regulations." }
      ]
    },
    {
      title: "18. PSIKOLOGI & STRATEGI",
      color: "bg-[#7C3AED]",
      items: [
        { q: "FOMO", a: "Fear Of Missing Out; impulsive investing." },
        { q: "FUD", a: "Fear, Uncertainty, Doubt; negative sentiment." },
        { q: "HODL", a: "Holding assets long-term despite volatility." },
        { q: "DCA", a: "Dollar Cost Averaging; regular investment." },
        { q: "Risk Management", a: "Strategies to mitigate financial loss." },
        { q: "Convexity", a: "Asymmetric risk/reward profile." },
        { q: "Time Horizon", a: "Planned duration of investment." },
        { q: "Overtrading", a: "Excessive trading leading to losses." },
        { q: "Gambler’s Fallacy", a: "Misunderstanding independent probabilities." },
        { q: "Profit-taking", a: "Strategy for realizing gains." }
      ]
    },
    {
      title: "19. ROLES & CAREERS IN WEB3",
      color: "bg-[#4F46E5]",
      items: [
        { q: "Dev", a: "Blockchain software engineers." },
        { q: "Protocol Researcher", a: "Analyst of crypto mechanisms." },
        { q: "Tokenomics Designer", a: "Architect of token economies." },
        { q: "Community Manager", a: "Facilitator of user communities." },
        { q: "Content Creator", a: "Producer of educational/marketing content." },
        { q: "Designer", a: "UI/UX and brand specialist." },
        { q: "BD", a: "Business Development and partnerships." },
        { q: "Growth Strategist", a: "User acquisition specialist." },
        { q: "Security Auditor", a: "Code security reviewer." },
        { q: "Node Operator", a: "Infrastructure maintainer." }
      ]
    }
  ];

  const curriculum = isId ? fullCurriculumID : fullCurriculumEN;

  // Search Filtering
  const filteredCurriculum = searchQuery 
    ? curriculum.map(section => ({
        ...section,
        items: section.items.filter(item => 
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.items.length > 0)
    : curriculum;

  // Initialize ALL sections as OPEN by default
  const [openSections, setOpenSections] = useState<number[]>([]);

  useEffect(() => {
    // Set all indices to open on mount or when curriculum changes
    setOpenSections(curriculum.map((_, i) => i));
  }, [curriculum]);

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[85dvh] md:min-h-[85vh]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => onNavigate('learn')} 
                className="bg-white dark:bg-black border-2 border-black dark:border-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <ArrowLeft size={24} className="text-black dark:text-white" />
            </button>
            <div>
                <h1 className="text-3xl md:text-5xl font-black uppercase text-black dark:text-white leading-none">
                {t.title}
                </h1>
                <p className="font-mono text-gray-500 dark:text-gray-400 text-sm md:text-base mt-1">
                    {t.subtitle}
                </p>
            </div>
          </div>
          
          <div className="w-full md:w-auto relative">
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-white dark:bg-[#121212] border-2 border-black dark:border-white p-3 pl-10 font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-shadow text-black dark:text-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
      </div>

      {/* Content Grid */}
      <div className="space-y-6">
         {filteredCurriculum.length > 0 ? (
            filteredCurriculum.map((section, idx) => (
                <div key={idx} className="bg-white dark:bg-[#121212] border-2 border-black dark:border-white brutal-shadow">
                    <button 
                        onClick={() => toggleSection(idx)}
                        className={`w-full text-left p-4 md:p-5 flex justify-between items-center border-b-2 border-black dark:border-white transition-colors ${section.color} text-black`}
                    >
                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{section.title}</h2>
                        {openSections.includes(idx) ? <ChevronUp size={24} className="text-black" /> : <ChevronDown size={24} className="text-black" />}
                    </button>
                    
                    {/* Always rendered if openSections includes idx */}
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${openSections.includes(idx) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {section.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="bg-gray-50 dark:bg-[#1a1a1a] p-4 border-l-4 border-black dark:border-white">
                                        <h3 className="font-black text-lg mb-2 text-black dark:text-white flex items-center gap-2">
                                            <Book size={16} className="text-gray-400" />
                                            {item.q}
                                        </h3>
                                        <p className="font-mono text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {item.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))
         ) : (
            <div className="text-center py-20 border-2 border-black dark:border-white bg-gray-100 dark:bg-[#121212] brutal-shadow">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold uppercase mb-2 text-black dark:text-white">{t.notFound}</h3>
                <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[#3B82F6] font-bold underline hover:no-underline"
                >
                    {t.clearSearch}
                </button>
            </div>
         )}
      </div>
      
      <div className="mt-12 text-center">
         <BrutalButton variant="outline" onClick={() => onNavigate('learn')}>
            {t.returnLearn}
         </BrutalButton>
      </div>

    </div>
  );
};
