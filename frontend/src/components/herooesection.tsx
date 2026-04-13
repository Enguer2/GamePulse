"use client";

import { useState } from "react";

const TRENDING_TAGS = [
  { tag: "#Cyberpunk", color: "text-[#e6feff]", border: "border-[#e6feff]/20", hover: "hover:bg-[#e6feff]/10", glow: "shadow-[0_0_10px_rgba(0,244,254,0.1)]" },
  { tag: "#OpenWorldRPG", color: "text-[#d8b9ff]", border: "border-[#d8b9ff]/20", hover: "hover:bg-[#d8b9ff]/10", glow: "shadow-[0_0_10px_rgba(216,185,255,0.1)]" },
  { tag: "#CompetitiveFPS", color: "text-[#ffb2ba]", border: "border-[#ffb2ba]/20", hover: "hover:bg-[#ffb2ba]/10", glow: "shadow-[0_0_10px_rgba(255,178,186,0.1)]" },
  { tag: "#IndieGems", color: "text-[#00dce5]", border: "border-[#00dce5]/20", hover: "hover:bg-[#00dce5]/10", glow: "" },
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTag = (tag: string) => {
    const cleanTag = tag.replace("#", "");
    setSelectedTags((prevTags) => 
      prevTags.includes(cleanTag)
        ? prevTags.filter((t) => t !== cleanTag)
        : [...prevTags, cleanTag]
    );
  };

  const handleSearch = async () => {
    if (!query.trim() && selectedTags.length === 0) return;
    
    setIsLoading(true);
    setResults([]);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      
      const response = await fetch(`${API_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: query,
          top_k: 5,
          required_tags: selectedTags.length > 0 ? selectedTags : undefined 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur HTTP:", response.status, errorData);
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse complète du backend :", data);
      setResults(data.results || []);
    } catch (error) {
      console.error("Échec de la communication :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative z-10 w-full max-w-5xl px-6 pt-20 flex flex-col items-center text-center">
      {/* Headline */}
      <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-[#e1e2eb]" style={{ fontFamily: "var(--font-headline)" }}>
        QUEST FOR <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d8b9ff] via-[#e6feff] to-[#8635e8]">PERFECTION</span>
      </h1>

      {/* Search bar */}
      <div className="w-full max-w-3xl relative mt-8 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#8635e8] to-[#e6feff] opacity-20 blur-2xl group-focus-within:opacity-40 transition-opacity" />
        <div className="relative flex items-center bg-[#272a31]/60 backdrop-blur-2xl rounded-xl glass-edge p-2 border border-white/5">
          <span className="material-symbols-outlined ml-4 text-[#958da1]">search</span>
          <input
            className="w-full bg-transparent border-none outline-none text-[#e1e2eb] placeholder:text-[#4a4455] text-lg px-4"
            placeholder="What are we playing today?"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ fontFamily: "var(--font-body)" }}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-gradient-to-r from-[#00f4fe] to-[#e6feff] text-[#002021] px-8 py-3 rounded-xl font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(0,244,254,0.3)] hover:shadow-[0_0_30px_rgba(0,244,254,0.5)] transition-all active:scale-95 disabled:opacity-50"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {isLoading ? "SEARCHING..." : "DISCOVER"}
          </button>
        </div>
      </div>

      {/* Trending tags */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <span className="text-[#ccc3d8] text-xs tracking-widest uppercase mr-2 mt-2" style={{ fontFamily: "var(--font-headline)" }}>
          Filters:
        </span>
        {TRENDING_TAGS.map(({ tag, color, border, hover, glow }) => {
          const cleanTag = tag.replace("#", "");
          const isSelected = selectedTags.includes(cleanTag);
          
          const activeBg = hover.replace('hover:', '');

          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-5 py-2 rounded-full backdrop-blur-md glass-edge text-sm font-medium transition-all border ${border} ${color} ${glow} 
                ${isSelected 
                  ? `${activeBg} scale-105 border-opacity-100 ring-1 ring-current shadow-lg` 
                  : `bg-[#32353c]/40 ${hover} opacity-70 hover:opacity-100`
                }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Affichage des résultats */}
      {results.length > 0 && (
        <div className="w-full max-w-3xl mt-12 flex flex-col gap-4 text-left">
          {results.map((game, index) => {
            const steamUrl = game.app_id ? `https://store.steampowered.com/app/${game.app_id}` : "#";

            return (
              <div key={index} className="bg-[#272a31]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-[#32353c]/90 transition-all flex flex-col md:flex-row gap-5 items-start group">
                
                {game.header_image && (
                  <a 
                    href={steamUrl}
                    target={game.app_id ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="shrink-0 overflow-hidden rounded-lg border border-white/5 block relative"
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors z-10" />
                    <img 
                      src={game.header_image} 
                      alt={`Cover of ${game.name}`} 
                      className="w-full md:w-48 h-auto object-cover shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>
                )}

                <div className="flex flex-col flex-grow">
                  <a 
                    href={steamUrl}
                    target={game.app_id ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-fit"
                  >
                    <h3 className="text-xl font-bold text-[#e1e2eb] group-hover:text-[#00f4fe] transition-colors">
                      {game.name || "Titre inconnu"}
                    </h3>
                  </a>
                  
                  <p className="text-sm text-[#958da1] mt-2 line-clamp-3">{game.description || "Aucune description disponible."}</p>
                  
                  {game.app_id && (
                    <a 
                      href={steamUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-[#00f4fe] text-sm font-bold tracking-wide hover:underline hover:text-[#e6feff] transition-colors w-fit"
                    >
                      Voir sur Steam <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}