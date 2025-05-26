'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { connectWallet } from '../utils/web3';

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsConnected(true);
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Failed to get accounts:", error);
        }
      }
    };

    checkConnection();
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    const result = await connectWallet();
    setConnecting(false);
    
    if (result.success && result.address) {
      setIsConnected(true);
      setWalletAddress(result.address);
    } else {
      alert(result.error || "Failed to connect wallet");
    }
  };

  return (
    <header className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Decentralized Job Marketplace
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/jobs" className="hover:text-blue-300">
            Browse Jobs
          </Link>
          <Link href="/candidates" className="hover:text-blue-300">
            Find Candidates
          </Link>
          <Link href="/post-job" className="hover:text-blue-300">
            Post a Job
          </Link>
          <Link href="/matches" className="hover:text-blue-300">
            View Matches
          </Link>
          
          {isConnected ? (
            <div className="bg-slate-700 px-4 py-2 rounded-full">
              {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
            </div>
          ) : (
            <button 
              onClick={handleConnect}
              disabled={connecting}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
} 