/* global React, Logo, Button, Badge, Eyebrow, Icon */
const { useState: useStateS } = React;

function Navbar({ onTrack, onLogin }) {
  const links = ["Mua hộ", "Vận chuyển", "Bảng giá", "Tra cứu", "Về chúng tôi"];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 72,
        display: "flex", alignItems: "center", gap: 36 }}>
        <Logo width={132} />
        <nav style={{ display: "flex", gap: 26, marginLeft: 8 }}>
          {links.map((l, i) => (
            <a key={l} href="#" onClick={e => { e.preventDefault(); if (l === "Tra cứu") onTrack(); }}
              style={{ fontSize: 15, fontWeight: 600, color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                textDecoration: "none" }}>{l}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="ghost" size="sm" onClick={onLogin}>Đăng nhập</Button>
          <Button variant="primary" size="sm" icon="plus">Tạo đơn mua hộ</Button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onTrack }) {
  return (
    <section style={{ background: "var(--brand-navy)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -120, right: -80, width: 520, height: 520,
        background: "radial-gradient(circle, rgba(223,169,48,0.22), transparent 65%)" }}></div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "84px 32px 92px", position: "relative",
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
        <div>
          <Eyebrow onDark>Mua hộ &amp; vận chuyển quốc tế</Eyebrow>
          <h1 style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em",
            color: "#fff", margin: "16px 0 18px" }}>
            Mua sắm toàn cầu,<br /><span style={{ color: "var(--brand-gold)" }}>TIXIMAX</span> lo phần còn lại.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--navy-200)", maxWidth: 480, margin: "0 0 28px" }}>
            Đặt mua, thanh toán và vận chuyển hàng từ Nhật, Hàn, Indonesia và Mỹ về tận nhà — minh bạch chi phí, theo dõi từng bước.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <Button variant="primary" size="lg" iconAfter="arrow-right">Nhận báo giá miễn phí</Button>
            <Button variant="on-navy" size="lg" icon="search" onClick={onTrack}>Tra cứu đơn</Button>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {[["120K+", "Đơn đã giao"], ["6", "Quốc gia"], ["12\u201318", "Ngày vận chuyển"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "var(--brand-gold)" }}>{n}</div>
                <div style={{ fontSize: 13, color: "var(--navy-200)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "var(--radius-xl)", padding: 24, backdropFilter: "blur(4px)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy-200)", textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: 14 }}>Ước tính phí vận chuyển</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <MiniField label="Quốc gia" value="Nhật Bản" icon="flag" />
            <MiniField label="Cân nặng (kg)" value="3.5 kg" icon="weight" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              padding: "14px 16px", background: "var(--brand-gold)", borderRadius: "var(--radius-md)" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--navy-900)" }}>Tạm tính</span>
              <span style={{ fontSize: 26, fontWeight: 900, color: "var(--navy-900)" }}>525.000đ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniField({ label, value, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
      background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-md)" }}>
      <Icon name={icon} size={18} color="var(--brand-gold)" />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: "var(--navy-200)" }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{value}</div>
      </div>
      <Icon name="chevron-down" size={16} color="var(--navy-200)" />
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, center }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? 620 : "none",
      margin: center ? "0 auto 48px" : "0 0 40px" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)",
        margin: "12px 0 10px" }}>{title}</h2>
      {sub && <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>{sub}</p>}
    </div>
  );
}

function Services() {
  const items = [
    ["shopping-cart", "Mua hộ", "Gửi link sản phẩm, TIXIMAX đặt mua và thanh toán giúp bạn với tỷ giá minh bạch."],
    ["ship", "Vận chuyển", "Đường biển & đường bay từ Nhật, Hàn, Indonesia, Mỹ về Việt Nam."],
    ["warehouse", "Gom hàng", "Gom nhiều đơn vào một kiện để tiết kiệm tối đa chi phí vận chuyển."],
    ["shield-check", "Bảo hiểm hàng hóa", "Bảo vệ giá trị đơn hàng trong suốt quá trình vận chuyển quốc tế."],
  ];
  return (
    <section style={{ background: "#fff", padding: "84px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <SectionHead center eyebrow="Dịch vụ" title="Một điểm chạm, trọn quy trình"
          sub="Từ lúc bạn thấy món hàng ở nước ngoài đến khi nó nằm trong tay bạn." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {items.map(([ic, t, d]) => (
            <div key={t} style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--gold-100)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon name={ic} size={24} color="var(--gold-700)" />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--text-secondary)", margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    ["link", "Gửi link sản phẩm", "Dán đường link món hàng bạn muốn mua từ bất kỳ trang nào."],
    ["receipt", "Nhận báo giá", "TIXIMAX báo giá tiền hàng + phí vận chuyển trong vài phút."],
    ["credit-card", "Thanh toán", "Đặt cọc hoặc thanh toán toàn bộ, chúng tôi đặt mua ngay."],
    ["package-check", "Nhận hàng tận nơi", "Theo dõi đơn theo thời gian thực đến khi giao tận nhà."],
  ];
  return (
    <section style={{ background: "var(--surface-page)", padding: "84px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <SectionHead eyebrow="Quy trình" title="Mua hàng quốc tế trong 4 bước" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {steps.map(([ic, t, d], i) => (
            <div key={t} style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--brand-navy)",
                  color: "var(--brand-gold)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 18 }}>{i + 1}</div>
                <Icon name={ic} size={22} color="var(--text-brand)" />
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 5 }}>{t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--text-secondary)", margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Routes() {
  const routes = [
    ["Nhật Bản", "JP", "Đường bay · 5\u20137 ngày", "210.000đ/kg"],
    ["Hàn Quốc", "KR", "Đường bay · 4\u20136 ngày", "180.000đ/kg"],
    ["Indonesia", "ID", "Đường biển · 12\u201318 ngày", "38.000đ/kg"],
    ["Hoa Kỳ", "US", "Đường bay · 7\u201310 ngày", "260.000đ/kg"],
  ];
  return (
    <section style={{ background: "#fff", padding: "84px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <SectionHead eyebrow="Tuyến vận chuyển" title="Giá cước rõ ràng theo từng tuyến" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {routes.map(([c, code, mode, price]) => (
            <div key={c} style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)",
              overflow: "hidden", boxShadow: "var(--shadow-xs)" }}>
              <div style={{ height: 80, background: "var(--navy-700)", display: "flex", alignItems: "center",
                justifyContent: "center" }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: "var(--brand-gold)", letterSpacing: "0.05em" }}>{code}</span>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>{c}</div>
                <div style={{ fontSize: 13, color: "var(--text-tertiary)", margin: "3px 0 12px" }}>{mode}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>{price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ background: "var(--brand-navy)", padding: "72px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -140, left: -60, width: 460, height: 460,
        background: "radial-gradient(circle, rgba(223,169,48,0.18), transparent 65%)" }}></div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative" }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 14px" }}>
          Sẵn sàng cho đơn hàng đầu tiên?
        </h2>
        <p style={{ fontSize: 18, color: "var(--navy-200)", margin: "0 0 28px" }}>
          Tạo tài khoản miễn phí và nhận báo giá trong 5 phút.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Button variant="primary" size="lg" icon="user-plus">Đăng ký ngay</Button>
          <Button variant="on-navy" size="lg">Liên hệ tư vấn</Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Dịch vụ", ["Mua hộ", "Vận chuyển", "Gom hàng", "Bảng giá"]],
    ["Công ty", ["Về TIXIMAX", "Tuyển dụng", "Tin tức", "Liên hệ"]],
    ["Hỗ trợ", ["Tra cứu đơn", "Câu hỏi thường gặp", "Chính sách", "Điều khoản"]],
  ];
  return (
    <footer style={{ background: "var(--navy-900)", padding: "56px 0 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 36 }}>
        <div>
          <Logo variant="white" width={140} />
          <p style={{ fontSize: 14, color: "var(--navy-200)", lineHeight: 1.6, margin: "16px 0 0", maxWidth: 240 }}>
            Dịch vụ mua hộ &amp; vận chuyển quốc tế uy tín, minh bạch về tận nhà bạn.
          </p>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase",
              letterSpacing: "0.08em", marginBottom: 14 }}>{h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map(i => <a key={i} href="#" style={{ fontSize: 14, color: "var(--navy-200)", textDecoration: "none" }}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "36px auto 0", padding: "20px 32px 0",
        borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, color: "var(--navy-300)" }}>© 2026 TIXIMAX Logistics. All rights reserved.</span>
        <div style={{ display: "flex", gap: 16 }}>
          {["mail", "phone", "globe"].map(s => <Icon key={s} name={s} size={18} color="var(--navy-300)" />)}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Navbar, Hero, Services, Steps, Routes, CTA, Footer });
