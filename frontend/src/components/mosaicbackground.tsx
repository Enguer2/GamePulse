import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IconEntry {
  name: string;
  color: string;
}

interface RowConfig {
  icons: IconEntry[];
  size: string;
  duration: string;
  reverse: boolean;
  opacity: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MOSAIC_ROWS: RowConfig[] = [
  {
    icons: [
      { name: "sports_esports",  color: "#d8b9ff" },
      { name: "rocket_launch",   color: "#e6feff" },
      { name: "shield",          color: "#ffb2ba" },
      { name: "swords",          color: "#8635e8" },
      { name: "castle",          color: "#00f4fe" },
      { name: "videogame_asset", color: "#d8b9ff" },
      { name: "skull",           color: "#ffb2ba" },
      { name: "diamond",         color: "#e6feff" },
      { name: "military_tech",   color: "#00dce5" },
      { name: "bolt",            color: "#d8b9ff" },
    ],
    size: "text-7xl", duration: "50s", reverse: false, opacity: "opacity-[0.12]",
  },
  {
    icons: [
      { name: "joystick",              color: "#e6feff" },
      { name: "trophy",                color: "#ffb2ba" },
      { name: "star",                  color: "#d8b9ff" },
      { name: "hexagon",               color: "#8635e8" },
      { name: "target",                color: "#00f4fe" },
      { name: "auto_awesome",          color: "#e6feff" },
      { name: "local_fire_department", color: "#ffb2ba" },
      { name: "psychology",            color: "#d8b9ff" },
      { name: "electric_bolt",         color: "#00dce5" },
      { name: "token",                 color: "#8635e8" },
    ],
    size: "text-5xl", duration: "35s", reverse: true, opacity: "opacity-[0.08]",
  },
  {
    icons: [
      { name: "skull",          color: "#d8b9ff" },
      { name: "castle",         color: "#00f4fe" },
      { name: "rocket_launch",  color: "#e6feff" },
      { name: "sports_esports", color: "#ffb2ba" },
      { name: "military_tech",  color: "#8635e8" },
      { name: "diamond",        color: "#d8b9ff" },
      { name: "shield",         color: "#00dce5" },
      { name: "hexagon",        color: "#ffb2ba" },
      { name: "auto_awesome",   color: "#e6feff" },
      { name: "bolt",           color: "#8635e8" },
    ],
    size: "text-9xl", duration: "70s", reverse: false, opacity: "opacity-[0.06]",
  },
  {
    icons: [
      { name: "token",                 color: "#00f4fe" },
      { name: "local_fire_department", color: "#d8b9ff" },
      { name: "trophy",                color: "#e6feff" },
      { name: "swords",                color: "#ffb2ba" },
      { name: "electric_bolt",         color: "#8635e8" },
      { name: "star",                  color: "#d8b9ff" },
      { name: "joystick",              color: "#00dce5" },
      { name: "videogame_asset",       color: "#ffb2ba" },
      { name: "target",                color: "#e6feff" },
      { name: "psychology",            color: "#d8b9ff" },
    ],
    size: "text-6xl", duration: "45s", reverse: true, opacity: "opacity-[0.10]",
  },
  {
    icons: [
      { name: "diamond",        color: "#8635e8" },
      { name: "sports_esports", color: "#e6feff" },
      { name: "castle",         color: "#ffb2ba" },
      { name: "bolt",           color: "#00f4fe" },
      { name: "skull",          color: "#d8b9ff" },
      { name: "shield",         color: "#8635e8" },
      { name: "auto_awesome",   color: "#e6feff" },
      { name: "military_tech",  color: "#ffb2ba" },
      { name: "rocket_launch",  color: "#d8b9ff" },
      { name: "hexagon",        color: "#00dce5" },
    ],
    size: "text-8xl", duration: "60s", reverse: false, opacity: "opacity-[0.07]",
  },
  {
    icons: [
      { name: "swords",                color: "#e6feff" },
      { name: "trophy",                color: "#d8b9ff" },
      { name: "electric_bolt",         color: "#ffb2ba" },
      { name: "token",                 color: "#8635e8" },
      { name: "videogame_asset",       color: "#00f4fe" },
      { name: "local_fire_department", color: "#e6feff" },
      { name: "joystick",              color: "#d8b9ff" },
      { name: "star",                  color: "#ffb2ba" },
      { name: "psychology",            color: "#00dce5" },
      { name: "target",                color: "#8635e8" },
    ],
    size: "text-4xl", duration: "28s", reverse: true, opacity: "opacity-[0.14]",
  },
  {
    icons: [
      { name: "whatshot",          color: "#ffb2ba" },
      { name: "grade",             color: "#d8b9ff" },
      { name: "workspace_premium", color: "#e6feff" },
      { name: "nights_stay",       color: "#8635e8" },
      { name: "flash_on",          color: "#00f4fe" },
      { name: "radar",             color: "#ffb2ba" },
      { name: "blur_on",           color: "#d8b9ff" },
      { name: "settings_suggest",  color: "#00dce5" },
      { name: "cyclone",           color: "#e6feff" },
      { name: "flare",             color: "#8635e8" },
    ],
    size: "text-6xl", duration: "55s", reverse: false, opacity: "opacity-[0.09]",
  },
  {
    icons: [
      { name: "crisis_alert",      color: "#ffb2ba" },
      { name: "network_node",      color: "#d8b9ff" },
      { name: "acute",             color: "#8635e8" },
      { name: "pattern",           color: "#00f4fe" },
      { name: "change_history",    color: "#e6feff" },
      { name: "hub",               color: "#00dce5" },
      { name: "stadia_controller", color: "#d8b9ff" },
      { name: "token",             color: "#ffb2ba" },
      { name: "blur_on",           color: "#8635e8" },
      { name: "cyclone",           color: "#e6feff" },
    ],
    size: "text-5xl", duration: "38s", reverse: true, opacity: "opacity-[0.11]",
  },
  {
    icons: [
      { name: "sports_esports", color: "#00f4fe" },
      { name: "military_tech",  color: "#e6feff" },
      { name: "whatshot",       color: "#d8b9ff" },
      { name: "bolt",           color: "#ffb2ba" },
      { name: "auto_awesome",   color: "#8635e8" },
      { name: "castle",         color: "#00dce5" },
      { name: "diamond",        color: "#e6feff" },
      { name: "shield",         color: "#d8b9ff" },
      { name: "skull",          color: "#ffb2ba" },
      { name: "swords",         color: "#8635e8" },
    ],
    size: "text-8xl", duration: "80s", reverse: false, opacity: "opacity-[0.05]",
  },
  {
    icons: [
      { name: "flash_on",          color: "#d8b9ff" },
      { name: "hub",               color: "#e6feff" },
      { name: "radar",             color: "#ffb2ba" },
      { name: "flare",             color: "#8635e8" },
      { name: "grade",             color: "#00f4fe" },
      { name: "cyclone",           color: "#d8b9ff" },
      { name: "blur_on",           color: "#00dce5" },
      { name: "nights_stay",       color: "#e6feff" },
      { name: "stadia_controller", color: "#ffb2ba" },
      { name: "workspace_premium", color: "#8635e8" },
    ],
    size: "text-3xl", duration: "22s", reverse: true, opacity: "opacity-[0.15]",
  },
  {
    icons: [
      { name: "joystick",       color: "#00f4fe" },
      { name: "target",         color: "#d8b9ff" },
      { name: "trophy",         color: "#e6feff" },
      { name: "token",          color: "#ffb2ba" },
      { name: "psychology",     color: "#8635e8" },
      { name: "electric_bolt",  color: "#00dce5" },
      { name: "videogame_asset",color: "#d8b9ff" },
      { name: "star",           color: "#e6feff" },
      { name: "hexagon",        color: "#ffb2ba" },
      { name: "rocket_launch",  color: "#8635e8" },
    ],
    size: "text-7xl", duration: "65s", reverse: false, opacity: "opacity-[0.08]",
  },
  {
    icons: [
      { name: "settings_suggest",     color: "#e6feff" },
      { name: "crisis_alert",         color: "#d8b9ff" },
      { name: "network_node",         color: "#ffb2ba" },
      { name: "whatshot",             color: "#8635e8" },
      { name: "pattern",              color: "#00f4fe" },
      { name: "local_fire_department",color: "#e6feff" },
      { name: "change_history",       color: "#d8b9ff" },
      { name: "acute",                color: "#00dce5" },
      { name: "swords",               color: "#ffb2ba" },
      { name: "castle",               color: "#8635e8" },
    ],
    size: "text-5xl", duration: "42s", reverse: true, opacity: "opacity-[0.10]",
  },
];

// ─── Row renderer ──────────────────────────────────────────────────────────────

function MosaicRow({ icons, size, duration, reverse, opacity }: RowConfig) {
  const tripled = [...icons, ...icons, ...icons];

  const trackStyle: React.CSSProperties = {
    display: "flex",
    width: "fit-content",
    animation: `marquee ${duration} linear infinite ${reverse ? "reverse" : "normal"}`,
  };

  return (
    <div className={`flex py-2 overflow-hidden ${opacity}`}>
      <div style={trackStyle}>
        {tripled.map((icon, i) => (
          <span
            key={i}
            className={`material-symbols-outlined ${size} mx-5 shrink-0`}
            style={{
              fontVariationSettings: "'FILL' 1",
              color: icon.color,
              filter: `drop-shadow(0 0 8px ${icon.color}60)`,
            }}
          >
            {icon.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function MosaicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex flex-col justify-center">
      {MOSAIC_ROWS.map((row, i) => (
        <MosaicRow key={i} {...row} />
      ))}

      {/* Radial vignette — keeps centre content readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #10131a 80%)",
        }}
      />
    </div>
  );
}