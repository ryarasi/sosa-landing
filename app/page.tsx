import GlobeBackground from '@/components/GlobeBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Principles from '@/components/Principles';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <GlobeBackground />
      <Navigation />
      <main>
        <Hero />
        <Principles />
        <section id="waitlist" className="py-20 px-5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl mb-4 font-bold tracking-wide">
              Join the Movement
            </h2>
            <p className="text-lg text-sosa-gray mb-12">
              Be part of the first decentralized think tank shaping tomorrow&apos;s policies
            </p>
            <WaitlistForm />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
