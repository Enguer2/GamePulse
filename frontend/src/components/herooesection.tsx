const TRENDING_TAGS = [
  {
    tag:    "#Cyberpunk",
    color:  "text-[#e6feff]",
    border: "border-[#e6feff]/20",
    hover:  "hover:bg-[#e6feff]/10",
    glow:   "shadow-[0_0_10px_rgba(0,244,254,0.1)]",
  },
  {
    tag:    "#OpenWorldRPG",
    color:  "text-[#d8b9ff]",
    border: "border-[#d8b9ff]/20",
    hover:  "hover:bg-[#d8b9ff]/10",
    glow:   "shadow-[0_0_10px_rgba(216,185,255,0.1)]",
  },
  {
    tag:    "#CompetitiveFPS",
    color:  "text-[#ffb2ba]",
    border: "border-[#ffb2ba]/20",
    hover:  "hover:bg-[#ffb2ba]/10",
    glow:   "shadow-[0_0_10px_rgba(255,178,186,0.1)]",
  },
  {
    tag:    "#IndieGems",
    color:  "text-[#00dce5]",
    border: "border-[#00dce5]/20",
    hover:  "hover:bg-[#00dce5]/10",
    glow:   "",
  },
];

export default function HeroSection() {
  return (
    <section className="relative z-10 w-full max-w-5xl px-6 pt-20 flex flex-col items-center text-center">
      {/* Headline */}
      <h1
        className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-[#e1e2eb]"
        style={{ fontFamily: "var(--font-headline)" }}
      >
        QUEST FOR{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d8b9ff] via-[#e6feff] to-[#8635e8]">
          PERFECTION
        </span>
      </h1>

      {/* Search bar */}
      <div className="w-full max-w-3xl relative mt-8 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#8635e8] to-[#e6feff] opacity-20 blur-2xl group-focus-within:opacity-40 transition-opacity" />
        <div className="relative flex items-center bg-[#272a31]/60 backdrop-blur-2xl rounded-xl glass-edge p-2 border border-white/5">
          <span className="material-symbols-outlined ml-4 text-[#958da1]">
            search
          </span>
          <input
            className="w-full bg-transparent border-none outline-none text-[#e1e2eb] placeholder:text-[#4a4455] text-lg px-4"
            placeholder="What are we playing today?"
            type="text"
            style={{ fontFamily: "var(--font-body)" }}
          />
          <button
            className="bg-gradient-to-r from-[#00f4fe] to-[#e6feff] text-[#002021] px-8 py-3 rounded-xl font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(0,244,254,0.3)] hover:shadow-[0_0_30px_rgba(0,244,254,0.5)] transition-all active:scale-95"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            DISCOVER
          </button>
        </div>
      </div>

      {/* Trending tags */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <span
          className="text-[#ccc3d8] text-xs tracking-widest uppercase mr-2 mt-2"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Trending:
        </span>
        {TRENDING_TAGS.map(({ tag, color, border, hover, glow }) => (
          <button
            key={tag}
            className={`px-5 py-2 rounded-full bg-[#32353c]/40 backdrop-blur-md glass-edge ${color} text-sm font-medium ${hover} transition-all border ${border} ${glow}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}