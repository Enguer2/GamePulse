 {/*const FOOTER_LINKS = ["Privacy Policy", "Terms of Service", "API Docs", "Careers"];*/}
const FOOTER_ICONS = ["share", "public"];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-950 w-full py-12 px-8 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span
            className="text-lg font-bold text-slate-200"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            GAME PULSE
          </span>
          <p
            className="text-xs tracking-tight text-slate-500"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © 2026 GAME PULSE.
          </p>
        </div>

        {/* Links 
        <div className="flex flex-wrap justify-center gap-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs tracking-tight text-slate-500 hover:text-violet-400 transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link}
            </a>
          ))}
        </div>*/}

        {/* Social icons & GitHub Link */}
        <div className="flex gap-4 items-center">
          {/* Existing mapping for share/public icons */}
          {FOOTER_ICONS.map((icon) => (
            <button
              key={icon}
              className="w-10 h-10 rounded-full bg-[#1d2026] flex items-center justify-center text-slate-400 hover:text-[#e6feff] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">{icon}</span>
            </button>
          ))}

          {/* New GitHub Button */}
          <a
            href="https://github.com/Enguer2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f1f21] border border-[#484849]/30 text-gray-400 hover:bg-[#DE35FC] hover:text-black hover:border-[#DE35FC] transition-all group"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-5 h-5 invert group-hover:invert-0 transition-all"
            />
            <span className="text-xs font-bold tracking-widest uppercase">
              Enguer2
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}