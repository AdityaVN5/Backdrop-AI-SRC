import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 relative flex items-center justify-between">
        
        {/* Logo */}
        <button onClick={() => window.location.href = '/'} className="flex items-center space-x-1 z-10 hover:opacity-80 transition-opacity">
           <span className="font-bold text-2xl tracking-tighter text-black">backdrop ai</span>
        </button>
        
        {/* Nav */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
          <Link 
            href="/research" 
            className="text-[11px] font-bold uppercase tracking-widest text-backdrop-textSecondary hover:text-black transition-colors"
          >
            Research
          </Link>
          <Link 
            href="/product" 
            className="text-[11px] font-bold uppercase tracking-widest text-backdrop-textSecondary hover:text-black transition-colors"
          >
            Product
          </Link>
        </nav>

        {/* Credits / Auth */}
        <div className="flex items-center space-x-4 z-10">
           <div className="hidden sm:flex items-center space-x-2 text-[10px] md:text-[11px] font-medium text-backdrop-textSecondary bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             <span>5 free uses/day per IP</span>
           </div>
           
           <Button variant="primary" className="px-5 py-2 h-auto text-xs uppercase tracking-wide">
             Try Backdrop
           </Button>
        </div>
      </div>
    </header>
  );
};