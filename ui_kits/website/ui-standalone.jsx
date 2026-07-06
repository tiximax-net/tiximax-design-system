/* global React */
const { useState, useEffect, useRef } = React;

// Re-render Lucide icons after React commits
function useLucide(dep) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
}

function Icon({ name, size = 20, color, style, className }) {
  return <i data-lucide={name} style={{ width: size, height: size, color, ...style }} className={className}></i>;
}

function Logo({ variant = "navy", width = 150 }) {
  const src = variant === "white"
    ? window.__resources.logoWhite
    : window.__resources.logoNavy;
  return <img src={src} alt="TIXIMAX" style={{ width, height: "auto", display: "block" }} />;
}

function Button({ children, variant = "primary", size = "md", icon, iconAfter, full, onClick, type }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "var(--font-sans)", fontWeight: 600, border: "none",
    borderRadius: "var(--radius-md)", cursor: "pointer", lineHeight: 1,
    transition: "all .16s ease-out", width: full ? "100%" : "auto", whiteSpace: "nowrap",
  };
  const sizes = {
    sm: { padding: "8px 14px", fontSize: 14 },
    md: { padding: "12px 20px", fontSize: 15 },
    lg: { padding: "15px 28px", fontSize: 17 },
  };
  const variants = {
    primary: { background: "var(--brand-gold)", color: "var(--navy-900)", boxShadow: "var(--shadow-gold)" },
    secondary: { background: "var(--brand-navy)", color: "#fff" },
    outline: { background: "transparent", color: "var(--text-primary)", border: "1.5px solid var(--border-strong)" },
    ghost: { background: "transparent", color: "var(--text-brand)" },
    danger: { background: "var(--brand-red)", color: "#fff" },
    "on-navy": { background: "#fff", color: "var(--navy-900)" },
  };
  const ic = size === "lg" ? 20 : 18;
  return (
    <button type={type} onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant] }}
      onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
      onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      {icon && <Icon name={icon} size={ic} />}
      {children}
      {iconAfter && <Icon name={iconAfter} size={ic} />}
    </button>
  );
}

function Badge({ children, tone = "gold", icon }) {
  const tones = {
    gold: { background: "var(--gold-100)", color: "var(--gold-700)" },
    navy: { background: "var(--navy-100)", color: "var(--navy-700)" },
    green: { background: "var(--success-bg)", color: "var(--text-success)" },
    red: { background: "var(--error-bg)", color: "var(--text-error)" },
    solid: { background: "var(--brand-gold)", color: "var(--navy-900)" },
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12,
      fontWeight: 700, padding: "4px 10px", borderRadius: "var(--radius-pill)", lineHeight: 1.4, ...tones[tone] }}>
      {icon && <Icon name={icon} size={13} />}{children}
    </span>
  );
}

function Eyebrow({ children, onDark }) {
  return <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: onDark ? "var(--brand-gold)" : "var(--text-brand)" }}>{children}</div>;
}

Object.assign(window, { useLucide, Icon, Logo, Button, Badge, Eyebrow });
