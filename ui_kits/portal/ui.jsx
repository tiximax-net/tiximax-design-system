/* global React */
const { useState, useEffect, useRef } = React;

function pUseLucide() { useEffect(() => { if (window.lucide) window.lucide.createIcons(); }); }

function PIcon({ name, size = 20, color, style }) {
  return <i data-lucide={name} style={{ width: size, height: size, color, ...style }}></i>;
}

function PLogo({ variant = "white", width = 128 }) {
  const src = variant === "white" ? "../../assets/tiximax-logo-white.svg" : "../../assets/tiximax-logo-navy.svg";
  return <img src={src} alt="TIXIMAX" style={{ width, height: "auto", display: "block" }} />;
}

function PButton({ children, variant = "primary", size = "md", icon, iconAfter, full, onClick, type }) {
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "var(--font-sans)", fontWeight: 600, border: "none", borderRadius: "var(--radius-md)",
    cursor: "pointer", lineHeight: 1, transition: "all .16s ease-out", width: full ? "100%" : "auto", whiteSpace: "nowrap" };
  const sizes = { sm: { padding: "8px 14px", fontSize: 14 }, md: { padding: "11px 18px", fontSize: 15 }, lg: { padding: "14px 24px", fontSize: 16 } };
  const variants = {
    primary: { background: "var(--brand-gold)", color: "var(--navy-900)", boxShadow: "var(--shadow-gold)" },
    secondary: { background: "var(--brand-navy)", color: "#fff" },
    outline: { background: "#fff", color: "var(--text-primary)", border: "1.5px solid var(--border-default)" },
    ghost: { background: "transparent", color: "var(--text-secondary)" },
  };
  return (
    <button type={type} onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant] }}
      onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
      onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      {icon && <PIcon name={icon} size={size === "lg" ? 19 : 17} />}{children}{iconAfter && <PIcon name={iconAfter} size={17} />}
    </button>
  );
}

const STATUS = {
  delivered: { label: "Đã giao", tone: { background: "var(--success-bg)", color: "var(--text-success)" }, icon: "check-circle-2" },
  shipping: { label: "Đang vận chuyển", tone: { background: "var(--gold-100)", color: "var(--gold-700)" }, icon: "ship" },
  warehouse: { label: "Tại kho", tone: { background: "var(--navy-100)", color: "var(--navy-700)" }, icon: "warehouse" },
  processing: { label: "Đang xử lý", tone: { background: "var(--info-bg)", color: "var(--info)" }, icon: "loader" },
  late: { label: "Trễ hẹn", tone: { background: "var(--error-bg)", color: "var(--text-error)" }, icon: "alert-triangle" },
};

function PStatus({ status }) {
  const s = STATUS[status] || STATUS.processing;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700,
      padding: "4px 10px", borderRadius: "var(--radius-pill)", lineHeight: 1.4, ...s.tone }}>
      <PIcon name={s.icon} size={13} />{s.label}
    </span>
  );
}

Object.assign(window, { pUseLucide, PIcon, PLogo, PButton, PStatus, STATUS });
