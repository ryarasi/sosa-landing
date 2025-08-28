'use client';

import { useState, useEffect, useCallback } from 'react';
import { BackgroundGradientDark } from '@/components/ui/background-gradient-dark';
import { motion } from 'framer-motion';
import LearnMoreModalAnimated from '@/components/LearnMoreModalAnimated';
import { SparklesCore } from '@/components/ui/sparkles';
import { Highlight } from '@/components/ui/hero-highlight';

interface Claim {
  id: string;
  type: string;
  claim: string;
  category: string;
}

export default function ClaimsViewer() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/claims.json')
      .then(res => res.json())
      .then(data => {
        setClaims(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load claims:', err);
        setLoading(false);
      });
  }, []);

  const navigateToClaim = useCallback((claimId: string) => {
    const index = claims.findIndex(c => c.id === claimId);
    if (index !== -1 && index !== currentIndex) {
      const newHistory = [...history.slice(0, historyIndex + 1), index];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentIndex(index);
    }
  }, [claims, currentIndex, history, historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentIndex(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentIndex(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const goPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const newHistory = [...history.slice(0, historyIndex + 1), newIndex];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, history, historyIndex]);

  const goNext = useCallback(() => {
    if (currentIndex < claims.length - 1) {
      const newIndex = currentIndex + 1;
      const newHistory = [...history.slice(0, historyIndex + 1), newIndex];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, claims.length, history, historyIndex]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrevious();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Backspace' && e.metaKey) goBack();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goNext, goPrevious, goBack]);

  const handleClaimClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' && target.dataset.claim) {
      e.preventDefault();
      navigateToClaim(target.dataset.claim);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white font-bold text-xl animate-pulse">Loading claims...</div>
      </div>
    );
  }

  if (claims.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-red-500 font-bold text-xl">No claims found</div>
      </div>
    );
  }

  const currentClaim = claims[currentIndex];

  return (
    <BackgroundGradientDark containerClassName="min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
        {/* Sparkles effect */}
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={30}
          className="w-full h-full"
          particleColor="rgba(255, 255, 255, 0.3)"
        />
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-6 md:top-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => {
          setCurrentIndex(0);
          setHistory([0]);
          setHistoryIndex(0);
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.3em] hover:opacity-80 transition-opacity duration-300">
          <Highlight className="text-black dark:text-white">
            SOSA
          </Highlight>
        </h1>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl w-full px-4">
        {/* Claim Container */}
        <div className="relative py-16 md:py-24">
          {/* Claim ID and Type */}
          <div className="flex justify-between mb-8">
            <span className="text-xs md:text-sm font-bold opacity-50 tracking-wider">
              {currentClaim.id}
            </span>
            <span className="text-xs md:text-sm font-bold opacity-50 uppercase tracking-wider">
              {currentClaim.type}
            </span>
          </div>

          {/* Claim Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentClaim.id}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="claim-text text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed text-center"
            onClick={handleClaimClick}
            dangerouslySetInnerHTML={{ __html: currentClaim.claim }}
          />
        </div>

        {/* Navigation */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            className="px-4 py-2 text-sm md:text-base font-bold border-2 border-white hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            title="Back (⌘+Backspace)"
          >
            Back
          </button>

          <button
            onClick={goPrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 text-sm md:text-base font-bold border-2 border-white hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            title="Previous (←)"
          >
            ←
          </button>

          <div className="px-4 text-sm md:text-base font-bold opacity-60">
            {currentIndex + 1} / {claims.length}
          </div>

          <button
            onClick={goNext}
            disabled={currentIndex === claims.length - 1}
            className="px-4 py-2 text-sm md:text-base font-bold border-2 border-white hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            title="Next (→)"
          >
            →
          </button>

          <button
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            className="px-4 py-2 text-sm md:text-base font-bold border-2 border-white hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            title="Forward"
          >
            Forward
          </button>
        </div>

        {/* Learn More Button */}
        <div className="mt-20 text-center">
          <LearnMoreModalAnimated />
        </div>
        </div>

        {/* Keyboard Hints */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 text-xs md:text-sm opacity-50 font-bold hidden md:flex gap-6">
          <span>← → Navigate</span>
          <span>⌘+Backspace Back</span>
        </div>
      </div>
    </BackgroundGradientDark>
  );
}