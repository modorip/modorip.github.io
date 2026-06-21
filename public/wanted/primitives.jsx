// Wanted Jobs UI Kit — Primitives
// Button, Badge, Chip, Avatar, Icon (Lucide-driven)

const { useState } = React;

// ───────────────────────────────────────────────────────────────
// Icon — uses Lucide static SVG (loaded from CDN in index.html)
// Wanted Lab's own icon font is the production source — we
// substitute Lucide for parity (similar stroke + geometry).
// ───────────────────────────────────────────────────────────────
function Icon({ name, size = 16, color = "currentColor", strokeWidth = 1.75, style }) {
  // Use lucide's static SVG markup pulled from window.lucide
  const [svg, setSvg] = React.useState(null);
  React.useEffect(() => {
    if (!window.lucide) return;
    const icons = window.lucide.icons || window.lucide;
    const key = name
      .split("-")
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join("");
    const iconData = icons[key] || icons[name];
    if (!iconData) return;
    try {
      const node = window.lucide.createElement
        ? window.lucide.createElement(iconData)
        : null;
      if (node) {
        node.setAttribute("width", size);
        node.setAttribute("height", size);
        node.setAttribute("stroke", color);
        node.setAttribute("stroke-width", strokeWidth);
        setSvg(node.outerHTML);
      }
    } catch (e) {}
  }, [name, size, color, strokeWidth]);
  return (
    <span
      style={{ display: "inline-flex", lineHeight: 0, color, ...style }}
      dangerouslySetInnerHTML={{ __html: svg || "" }}
    />
  );
}

// Fallback icon: simple SVG path lookup for the icons we use most.
// This avoids the lucide DOM dance.
const SVG_PATHS = {
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-4.35-4.35',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
  bookmark: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z',
  'bookmark-fill': 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z',
  chevron: 'M9 18l6-6-6-6',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-left': 'M15 18l-6-6 6-6',
  check: 'M20 6L9 17l-5-5',
  close: 'M18 6 6 18M6 6l12 12',
  'map-pin': 'M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  briefcase: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16 M3 7h18v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
  'graduation-cap': 'M22 10v6 M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5',
  'dollar-sign': 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  send: 'M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7Z',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3Z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z',
  building: 'M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-4 M9 9v.01 M9 12v.01 M9 15v.01 M9 18v.01',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z',
  heart: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z',
  share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13',
  plus: 'M12 5v14 M5 12h14',
  arrow: 'M5 12h14 M12 5l7 7-7 7',
  menu: 'M3 6h18 M3 12h18 M3 18h18',
  more: 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  'eye': 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  'lock': 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z M7 11V7a5 5 0 0 1 10 0v4',
};

function I({ n, s = 16, c = "currentColor", w = 1.75, fill = "none" }) {
  const d = SVG_PATHS[n];
  if (!d) return null;
  const paths = d.split(" M").map((p, i) => (i === 0 ? p : "M" + p));
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={c}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "-2px" }}
    >
      {paths.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────
// Button
// ───────────────────────────────────────────────────────────────
function Button({
  variant = "primary",
  size = "medium",
  children,
  leading,
  trailing,
  fullWidth,
  disabled,
  onClick,
  ariaLabel,
  type = "button",
}) {
  const sizes = {
    xsmall: { padY: 6, padX: 12, fs: 12, lh: 16, gap: 4, rad: 8, h: 30 },
    small:  { padY: 8, padX: 14, fs: 13, lh: 18, gap: 6, rad: 10, h: 36 },
    medium: { padY: 12, padX: 20, fs: 15, lh: 22, gap: 6, rad: 12, h: 46 },
    large:  { padY: 16, padX: 24, fs: 17, lh: 24, gap: 8, rad: 14, h: 56 },
  };
  const s = sizes[size];

  const variants = {
    primary:  { bg: "#0066FF", fg: "#FFFFFF", border: "transparent", hoverBg: "#005EEB", pressBg: "#0054D1" },
    neutral:  { bg: "#171719", fg: "#FFFFFF", border: "transparent", hoverBg: "#000000", pressBg: "#000000" },
    outline:  { bg: "transparent", fg: "#171719", border: "rgba(112,115,124,0.22)", hoverBg: "rgba(112,115,124,0.04)", pressBg: "rgba(112,115,124,0.08)" },
    subtle:   { bg: "#EAF2FE", fg: "#0054D1", border: "transparent", hoverBg: "#C9DEFE", pressBg: "#9EC5FF" },
    ghost:    { bg: "transparent", fg: "#0066FF", border: "transparent", hoverBg: "rgba(0,102,255,0.06)", pressBg: "rgba(0,102,255,0.12)" },
    danger:   { bg: "#FF4242", fg: "#FFFFFF", border: "transparent", hoverBg: "#E52222", pressBg: "#B20C0C" },
  };
  const v = variants[variant];
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const bg = disabled
    ? "#F4F4F5"
    : press ? v.pressBg
    : hover ? v.hoverBg
    : v.bg;
  const fg = disabled ? "rgba(55,56,60,0.28)" : v.fg;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        background: bg,
        color: fg,
        border: `1px solid ${disabled ? "transparent" : v.border}`,
        borderRadius: s.rad,
        padding: `${s.padY}px ${s.padX}px`,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: s.fs,
        lineHeight: `${s.lh}px`,
        letterSpacing: "0.0096em",
        cursor: disabled ? "not-allowed" : "pointer",
        width: fullWidth ? "100%" : undefined,
        height: s.h,
        boxSizing: "border-box",
        transition: "background 120ms ease, color 120ms ease, transform 80ms ease",
        transform: press && !disabled ? "translateY(1px)" : "none",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
}

// ───────────────────────────────────────────────────────────────
// Badge / Chip / Avatar
// ───────────────────────────────────────────────────────────────
function Badge({ children, tone = "neutral", variant = "subtle", size = "small" }) {
  const tones = {
    neutral: { solid: ["#171719","#fff"], subtle: ["#F4F4F5","#46474C"], outline: ["transparent","#171719"] },
    primary: { solid: ["#0066FF","#fff"], subtle: ["#EAF2FE","#0054D1"], outline: ["transparent","#0066FF"] },
    success: { solid: ["#00BF40","#fff"], subtle: ["#D9FFE6","#006E25"], outline: ["transparent","#00BF40"] },
    warning: { solid: ["#FF9200","#fff"], subtle: ["#FEF4E6","#9C5800"], outline: ["transparent","#9C5800"] },
    danger:  { solid: ["#FF4242","#fff"], subtle: ["#FEECEC","#B20C0C"], outline: ["transparent","#B20C0C"] },
    info:    { solid: ["#00AEFF","#fff"], subtle: ["#E5F6FE","#006796"], outline: ["transparent","#006796"] },
    accent:  { solid: ["#6541F2","#fff"], subtle: ["#F0ECFE","#3A16C9"], outline: ["transparent","#6541F2"] },
  };
  const [bg, fg] = tones[tone][variant];
  const sizes = {
    xsmall: { padY: 1, padX: 6, fs: 10, rad: 4 },
    small:  { padY: 2, padX: 8, fs: 11, rad: 6 },
    medium: { padY: 3, padX: 10, fs: 12, rad: 8 },
  };
  const s = sizes[size];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: bg,
        color: fg,
        padding: `${s.padY}px ${s.padX}px`,
        borderRadius: s.rad,
        fontSize: s.fs,
        fontWeight: 600,
        letterSpacing: "0.02em",
        lineHeight: 1.4,
        border: variant === "outline" ? `1px solid ${fg}` : "none",
      }}
    >
      {children}
    </span>
  );
}

function Chip({ children, active, onClick, leading, trailing }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: active ? "#171719" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#171719",
        border: active ? "1px solid #171719" : "1px solid rgba(112,115,124,0.22)",
        borderRadius: 9999,
        padding: "8px 14px",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: "0.0145em",
        cursor: "pointer",
        transition: "background 120ms",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
}

function Avatar({ src, name = "?", size = 36, ring }) {
  const initials = name
    .split(" ")
    .map(s => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#EAF2FE",
        color: "#0054D1",
        fontWeight: 700,
        fontSize: Math.round(size * 0.36),
        flexShrink: 0,
        boxShadow: ring ? `0 0 0 2px ${ring}` : undefined,
      }}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials
      )}
    </div>
  );
}

// CompanyLogo — colored square + initial; used as job thumbnails when no logo.
function CompanyLogo({ name, color, size = 56, rounded = 16 }) {
  const initials = name.split(" ").map(s => s[0]).slice(0, 1).join("");
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        background: color,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: Math.round(size * 0.42),
        fontFamily: "var(--font-brand)",
        flexShrink: 0,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(23,23,23,0.06)",
      }}
    >
      {initials}
    </div>
  );
}

// Expose
Object.assign(window, { Button, Badge, Chip, Avatar, CompanyLogo, I, Icon });
