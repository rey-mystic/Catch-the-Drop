
import React, { useState } from 'react';
import { X, Loader2, Wallet, AlertTriangle, ExternalLink } from 'lucide-react';
import { BrutalButton } from './BrutalButton';
import { Language } from '../types';

interface WalletModalProps {
  onClose: () => void;
  onConnect: (walletName: string, address: string) => void;
  language?: Language;
}

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  providerKey?: string; // e.g., 'isMetaMask', 'isRabby'
  globalKey?: string;   // e.g., 'okxwallet'
  downloadUrl: string;
}

// Add types for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
    okxwallet?: any;
  }
}

const WALLETS: WalletOption[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'https://images.ctfassets.net/clixtyxoaeas/1ezuBGezqfIeifWdVtwU4c/d970d4cdf13b163efddddd5709164d2e/MetaMask-icon-Fox.svg',
    color: 'hover:bg-orange-50',
    providerKey: 'isMetaMask',
    downloadUrl: 'https://metamask.io/download/'
  },
  {
    id: 'okx',
    name: 'OKX Wallet',
    icon: 'https://altcoinsbox.com/wp-content/uploads/2023/03/okx-logo-black-and-white-300x300.webp',
    color: 'hover:bg-black hover:text-white',
    globalKey: 'okxwallet',
    downloadUrl: 'https://www.okx.com/web3'
  },
  {
    id: 'rabby',
    name: 'Rabby Wallet',
    icon: 'https://raw.githubusercontent.com/RabbyHub/logo/master/symbol.svg',
    color: 'hover:bg-blue-50',
    providerKey: 'isRabby',
    downloadUrl: 'https://rabby.io/'
  },
  {
    id: 'coinbase',
    name: 'Coinbase / Base',
    icon: 'https://avatars.githubusercontent.com/u/108554348?s=200&v=4',
    color: 'hover:bg-blue-50',
    providerKey: 'isCoinbaseWallet',
    downloadUrl: 'https://www.coinbase.com/wallet'
  }
];

export const WalletModal: React.FC<WalletModalProps> = ({ onClose, onConnect, language = 'en' }) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = {
    title: language === 'id' ? "Hubungkan Dompet" : "Connect Wallet",
    desc: language === 'id' ? "Pilih penyedia untuk menghubungkan. Kami mendukung semua dompet EVM utama." : "Choose a provider to connect. We support all major EVM wallets.",
    error: "Error",
    download: language === 'id' ? "Unduh Ekstensi" : "Download Extension",
    footer: language === 'id' ? "Baru mengenal kripto?" : "New to crypto?",
    learn: language === 'id' ? "Pelajari cara membuat dompet" : "Learn how to create a wallet",
    install: language === 'id' ? "belum terinstal. Silakan instal ekstensi." : "is not installed. Please install the extension.",
    rejected: language === 'id' ? "Permintaan koneksi ditolak." : "Connection request rejected.",
    failed: language === 'id' ? "Gagal terhubung" : "Failed to connect",
    noAccount: language === 'id' ? "Tidak ada akun ditemukan." : "No accounts found."
  };

  const handleConnect = async (wallet: WalletOption) => {
    setConnecting(wallet.id);
    setError(null);

    try {
      let provider = window.ethereum;

      // Special handling for OKX which injects its own global sometimes
      if (wallet.globalKey && (window as any)[wallet.globalKey]) {
        provider = (window as any)[wallet.globalKey];
      }
      
      // If no provider found at all
      if (!provider) {
        throw new Error(`${wallet.name} ${t.install}`);
      }

      // Try to connect
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      
      if (accounts && accounts.length > 0) {
        // Shorten address for UI
        const address = accounts[0];
        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
        onConnect(wallet.name, shortAddress);
      } else {
        throw new Error(t.noAccount);
      }

    } catch (err: any) {
      console.error("Wallet connection error:", err);
      // Clean up error message
      let msg = err.message || t.failed;
      if (msg.includes("User rejected")) msg = t.rejected;
      setError(msg);
    } finally {
      setConnecting(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-white dark:bg-[#121212] w-full max-w-md border-4 border-black dark:border-white brutal-shadow relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#3B82F6] p-4 border-b-4 border-black dark:border-white flex justify-between items-center">
          <h2 className="text-2xl font-black uppercase text-white flex items-center gap-2">
            <Wallet className="text-white" /> {t.title}
          </h2>
          <button onClick={onClose} className="bg-white text-black border-2 border-black p-1 hover:bg-black hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-6">
            {t.desc}
          </p>

          <div className="space-y-3">
            {WALLETS.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleConnect(wallet)}
                disabled={connecting !== null}
                className={`
                  w-full flex items-center justify-between p-4 border-2 border-black dark:border-white 
                  bg-white dark:bg-gray-800 text-black dark:text-white
                  transition-all active:scale-[0.98]
                  ${wallet.color}
                  ${connecting === wallet.id ? 'opacity-70 cursor-wait' : 'hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src={wallet.icon} alt={wallet.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-lg uppercase">{wallet.name}</span>
                </div>
                {connecting === wallet.id && <Loader2 className="animate-spin" />}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border-2 border-red-500 text-red-600 font-mono text-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 font-bold">
                 <AlertTriangle size={16} /> {t.error}
              </div>
              <p>{error}</p>
              {error.includes(t.install) && (
                 <a 
                   href={WALLETS.find(w => w.id === connecting || error.includes(w.name))?.downloadUrl || "#"} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-1 text-black underline mt-1 font-bold"
                 >
                    {t.download} <ExternalLink size={12} />
                 </a>
              )}
            </div>
          )}

          <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
            <p className="font-mono text-xs text-gray-500">
              {t.footer} <a href="https://metamask.io/" target="_blank" rel="noreferrer" className="underline hover:text-[#3B82F6]">{t.learn}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
