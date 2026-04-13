interface FeatureCard {
  icon: string;
  iconColor: string;
  iconBg: string;
  glowColor: string;
  title: string;
  description: string;
  offset?: boolean;
  livePulse?: boolean;
}

const CARDS: FeatureCard[] = [
  {
    icon:        "psychology",
    iconColor:   "text-[#d8b9ff]",
    iconBg:      "bg-[#8635e8]/20",
    glowColor:   "from-[#d8b9ff]/20",
    title:       "Neural RAG Engine",
    description: "Powered by advanced vector embeddings, our semantic search understands the true context of your cravings, going way beyond simple keywords.",
  },
  {
    icon:        "database",
    iconColor:   "text-[#e6feff]",
    iconBg:      "bg-[#00f4fe]/20",
    glowColor:   "from-[#e6feff]/20",
    title:       "120K+ Games Arsenal",
    description: "Currently indexing over 120,000 Steam titles via ultra-fast Cloud Kernels. Upcoming integrations include Epic Games and other major platforms.",
    offset:      true,
  },
  {
    icon:        "tune",
    iconColor:   "text-[#ffb2ba]",
    iconBg:      "bg-[#cd0047]/20",
    glowColor:   "from-[#ffb2ba]/20",
    title:       "Deep Smart Filtering",
    description: "Combine AI queries with precise tag filters. Our evolving algorithm will soon weigh user reviews, prices, and Steam ratings for ultimate precision.",
    livePulse:   true,
  },
];

export default function FeatureCards() {
  return (
    <section className="relative z-10 w-full max-w-7xl px-8 py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CARDS.map(({ icon, iconColor, iconBg, glowColor, title, description, offset, livePulse }) => (
          <div
            key={title}
            className={`relative group h-full ${offset ? "md:mt-12" : ""}`}
          >
            {/* Hover glow */}
            <div
              className={`absolute -inset-0.5 bg-gradient-to-b ${glowColor} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur`}
            />

            <div className="relative h-full bg-[#191c22]/40 backdrop-blur-xl p-8 rounded-3xl glass-edge border border-white/5 flex flex-col gap-6">
              {/* Icon badge */}
              <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center`}>
                <span
                  className={`material-symbols-outlined ${iconColor} text-3xl`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
              </div>

              <div>
                <h3
                  className="text-2xl font-bold text-[#e1e2eb] mb-2"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {title}
                </h3>

                {livePulse && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#ffb2ba] animate-pulse shadow-[0_0_8px_#ffb2ba]" />
                    <span
                      className="text-xs font-bold text-[#ffb2ba] tracking-tighter uppercase"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Live Pulse
                    </span>
                  </div>
                )}

                <p className="text-[#ccc3d8] leading-relaxed">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}