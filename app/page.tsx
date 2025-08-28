'use client';

import GlobeBackground from '@/components/GlobeBackground';
import NavigationFloating from '@/components/NavigationFloating';
import ClaimsViewer from '@/components/ClaimsViewer';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <GlobeBackground />
      <NavigationFloating />
      <main className="relative">
        <ClaimsViewer />
      </main>
      <Footer />
    </>
  );
}
