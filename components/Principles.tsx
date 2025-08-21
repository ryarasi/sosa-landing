const principles = [
  {
    title: "Independence",
    description: "No single sponsor or interest group can influence our research. Decisions are made collectively through transparent governance mechanisms.",
  },
  {
    title: "Transparency",
    description: "All research methodologies, funding sources, and decision processes are publicly accessible. Our algorithms and data are open for scrutiny.",
  },
  {
    title: "Impact",
    description: "We focus on research that creates measurable societal benefit. Every project must demonstrate clear pathways to positive real-world outcomes.",
  },
];

export default function Principles() {
  return (
    <section className="py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl text-center mb-16 font-bold tracking-wide">
          Our Core Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-sosa-card border border-sosa-border p-8 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-sosa-accent hover:shadow-lg hover:shadow-white/10 hover:bg-white/5"
            >
              <h3 className="font-orbitron text-2xl mb-4 text-sosa-accent font-semibold tracking-wide">
                {principle.title}
              </h3>
              <p className="text-sosa-gray leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}