/* global React, ReactDOM, Navbar, Hero, Services, Steps, Routes, CTA, Footer, Button, Icon, Badge, useLucide */
const { useState, useEffect } = React;

function TrackModal({ open, onClose }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  if (!open) return null;
  const steps = [
    ["Đã đặt mua", "shopping-cart", true],
    ["Về kho quốc tế", "warehouse", true],
    ["Đang vận chuyển", "ship", true],
    ["Về kho Việt Nam", "building-2", false],
    ["Giao tận nhà", "home", false],
  ];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "var(--surface-overlay)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-xl)", width: 480, maxWidth: "100%", overflow: "hidden" }}>
        <div style={{ padding: "22px 24px", borderBottom: "1px solid var(--border-subtle)",
          display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "var(--text-primary)" }}>Tra cứu đơn hàng</div>
          <Icon name="x" size={20} color="var(--text-tertiary)" style={{ cursor: "pointer" }} />
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1.5px solid var(--border-default)",
              borderRadius: "var(--radius-md)", padding: "10px 12px" }}>
              <Icon name="package-search" size={18} color="var(--text-tertiary)" />
              <input value={code} onChange={e => setCode(e.target.value)} placeholder="Nhập mã đơn, vd: TX-48210"
                style={{ border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: 15, width: "100%" }} />
            </div>
            <Button onClick={() => setResult(code || "TX-48210")}>Tra cứu</Button>
          </div>
          {result && (
            <div style={{ marginTop: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Đơn {result.toUpperCase()}</div>
                <Badge tone="gold" icon="ship">Đang vận chuyển</Badge>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {steps.map(([t, ic, done], i) => (
                  <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", flex: "none",
                        background: done ? "var(--brand-gold)" : "var(--surface-sunken)",
                        display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={ic} size={17} color={done ? "var(--navy-900)" : "var(--text-tertiary)"} />
                      </div>
                      {i < steps.length - 1 && <div style={{ width: 2, height: 26,
                        background: done ? "var(--brand-gold)" : "var(--border-default)" }}></div>}
                    </div>
                    <div style={{ paddingTop: 6 }}>
                      <div style={{ fontSize: 15, fontWeight: 600,
                        color: done ? "var(--text-primary)" : "var(--text-tertiary)" }}>{t}</div>
                      {i === 2 && <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Tàu rời cảng Tokyo · 31/05</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [track, setTrack] = useState(false);
  useLucide();
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [track]);
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Navbar onTrack={() => setTrack(true)} onLogin={() => {}} />
      <Hero onTrack={() => setTrack(true)} />
      <Services />
      <Steps />
      <Routes />
      <CTA />
      <Footer />
      <TrackModal open={track} onClose={() => setTrack(false)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
