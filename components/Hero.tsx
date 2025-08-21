export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-5 relative">
      <div className="max-w-4xl text-center z-10">
        <p className="font-rajdhani text-sm md:text-base lg:text-lg tracking-[0.2em] uppercase text-sosa-gray mb-4 font-semibold">
          Transparent. Future-Forward. Decentralized.
        </p>
        <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-wider">
          Incorruptible research through decentralized governance
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-sosa-gray mb-12 max-w-2xl mx-auto">
          Building a coordinated human civilization through collective intelligence and algorithmic transparency.
        </p>
        <a
          href="#waitlist"
          className="inline-block px-8 py-4 text-lg font-semibold bg-transparent text-sosa-accent border-2 border-sosa-accent rounded-lg transition-all duration-300 hover:bg-sosa-accent hover:text-sosa-dark hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
        >
          Request Early Access
        </a>
      </div>
    </section>
  );
}