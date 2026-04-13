import Image from "next/image";

export default function InsightsSection() {
  return (
    <section className="relative z-10 w-full max-w-7xl px-8 pb-32">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Copy */}
        <div className="lg:w-1/2">
          <h2
            className="text-5xl font-black mb-6 leading-[1.1] text-[#e1e2eb]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            DATA-DRIVEN <br />
            <span className="text-[#e6feff]">GAMING INSIGHTS</span>
          </h2>
          <p className="text-[#ccc3d8] text-lg leading-relaxed mb-8">
            Stop scrolling, start playing. GAME PULSE doesn&apos;t just search;
            it decodes your DNA to build a custom feed of experiences tailored
            exactly to your mood.
          </p>
          <button
            className="bg-[#363940] text-[#e6feff] px-8 py-4 rounded-full font-bold text-sm tracking-widest backdrop-blur transition-all hover:bg-[#32353c] glass-edge"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            VIEW ANALYTICS
          </button>
        </div>

        {/* Card */}
        <div className="lg:w-1/2 relative">
          <div className="relative z-20 translate-x-4 translate-y-4 bg-[#32353c]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <span
                className="font-bold text-[#d8b9ff]"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                MATCH STRENGTH
              </span>
              <span
                className="text-2xl font-black text-[#e6feff]"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                99.4%
              </span>
            </div>

            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2pozxbZRz9kl56XzC4jG6XyYvmaNPVcFZ-Kh16sexIoHz6xgeIEeS98iUQ75WZ2hzRoNArYW0luW2OTH08rQqBjhkKf9RAkL3tBelv7ZsjqNhbZM31LhMg-tWElPgf1ADt4RGe3rbYbqyG7C8CHSIx56VWdBqaJK01Of_M6tbp1RNLg--EPX7UkUqmgEx3AHnu4xLI4zmdB8jfMfo2FcFi8dEB9wkF0coer-PQhqeF9XmU5JdOdlGvnCDKQNlzHfyf6lxVL_697NM"
              alt="Futuristic gaming setup"
              width={600}
              height={300}
              className="rounded-xl mb-6 grayscale hover:grayscale-0 transition-all duration-500 w-full object-cover"
            />

            <div className="space-y-4">
              <div className="h-2 w-full bg-[#32353c] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#d8b9ff] to-[#e6feff] w-[90%]" />
              </div>
              <div
                className="flex justify-between text-xs uppercase tracking-tighter text-[#958da1]"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                <span>Narrative</span>
                <span>Combat</span>
                <span>Visuals</span>
              </div>
            </div>
          </div>

          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[#d8b9ff]/20 blur-[100px] z-10" />
        </div>
      </div>
    </section>
  );
}