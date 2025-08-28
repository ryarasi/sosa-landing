'use client';

import Link from 'next/link';
import LoginModalAnimated from './LoginModalAnimated';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 p-6 md:p-8 z-40 bg-black/90">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-bold tracking-[0.3em] hover:opacity-80 transition-opacity duration-300">
          SOSA
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6">
          <Link 
            href="/docs" 
            className="text-sm md:text-base font-bold text-white hover:opacity-80 transition-opacity"
          >
            Docs
          </Link>
          
          <LoginModalAnimated />
        </div>
      </div>
    </nav>
  );
}