import Image from "next/image";

const NAV_LINKS = [
  { label: "Explore",  active: true  },
  {/*{ label: "Library",  active: false },
  { label: "Rankings", active: false },
  { label: "Support",  active: false },*/}
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(98,0,188,0.08)]">
      <div className="flex justify-between items-center px-8 py-4 w-full max-w-full mx-auto">
        {/* Left — logo + links */}
        <div className="flex items-center gap-12">
          <span
            className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 uppercase tracking-wider"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            GAME PULSE
          </span>

          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map(({ label, active }) => (
              <a
                key={label}
                href="#"
                className={`font-bold uppercase tracking-wider text-sm transition-colors ${
                  active
                    ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                    : "text-slate-400 hover:text-slate-100"
                }`}
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — actions + avatar
        <div className="flex items-center gap-6">
          {["notifications", "settings"].map((icon) => (
            <button
              key={icon}
              className="material-symbols-outlined text-slate-400 hover:text-[#d8b9ff] transition-all duration-300 active:scale-95"
            >
              {icon}
            </button>
          ))}

          <div className="w-10 h-10 rounded-full border-2 border-[#d8b9ff]/50 overflow-hidden shadow-[0_0_15px_rgba(216,185,255,0.3)]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1MiXT6fRkSye2YUkQCzs4AzDWH1qPEyIxPRAlCsJ5Q6KC_fQoLuovdT84XjstXVe0n9jB3_h7D7TPoQLH-9NYuYhNX13tDwzNAc_PaQm1G5zTcVuqMxmO1MfLLOb4NqvlrB1EnNHH1ykWUm-uysf3HjDgQ0qvHxgJL3ruAi8oXK38HWsIc7Mw7DK9IsVHWFtj5d7dWxMx6_1hkdxKQcX9IR0AUSLO_tF8qt0lWN2agHoW8VacZ-btU3Bo4yIWAVdNRj1CbvAK5Ipl"
              alt="User avatar"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </div>*/}
      </div>
    </nav>
  );
}