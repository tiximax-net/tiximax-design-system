/* global React, PLogo, PButton, PIcon, PStatus, STATUS */

const ORDERS = [
  { id: "TX-48210", status: "shipping", route: "Tokyo → Hà Nội", items: 3, weight: "3.5 kg", total: "2.480.000đ", date: "31/05/2026" },
  { id: "TX-48198", status: "warehouse", route: "Seoul → TP.HCM", items: 1, weight: "1.2 kg", total: "860.000đ", date: "29/05/2026" },
  { id: "TX-48155", status: "processing", route: "Jakarta → Hà Nội", items: 5, weight: "8.0 kg", total: "1.240.000đ", date: "27/05/2026" },
  { id: "TX-48090", status: "delivered", route: "Osaka → Đà Nẵng", items: 2, weight: "2.1 kg", total: "1.020.000đ", date: "22/05/2026" },
  { id: "TX-47980", status: "late", route: "Los Angeles → Hà Nội", items: 1, weight: "4.4 kg", total: "3.150.000đ", date: "18/05/2026" },
];

function Sidebar({ active, onNav }) {
  const nav = [
    ["dashboard", "layout-dashboard", "Tổng quan"],
    ["orders", "package", "Đơn hàng"],
    ["create", "plus-circle", "Tạo đơn mua hộ"],
    ["wallet", "wallet", "Ví & thanh toán"],
    ["address", "map-pin", "Địa chỉ nhận"],
    ["support", "headphones", "Hỗ trợ"],
  ];
  return (
    <aside style={{ width: 248, background: "var(--brand-navy)", display: "flex", flexDirection: "column",
      padding: "22px 16px", flex: "none", height: "100%" }}>
      <div style={{ padding: "0 8px 22px" }}><PLogo width={130} /></div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {nav.map(([k, ic, label]) => {
          const on = active === k;
          return (
            <button key={k} onClick={() => onNav(k)} style={{ display: "flex", alignItems: "center", gap: 12,
              padding: "11px 12px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, textAlign: "left",
              background: on ? "rgba(223,169,48,0.16)" : "transparent",
              color: on ? "var(--brand-gold)" : "var(--navy-200)" }}>
              <PIcon name={ic} size={19} />{label}
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: "auto", padding: 14, background: "rgba(255,255,255,0.05)",
        borderRadius: "var(--radius-lg)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Cần hỗ trợ?</div>
        <div style={{ fontSize: 12.5, color: "var(--navy-200)", margin: "4px 0 10px", lineHeight: 1.45 }}>
          Hotline 1900 6868 · 8h–22h hằng ngày</div>
        <PButton size="sm" full>Liên hệ ngay</PButton>
      </div>
    </aside>
  );
}

function Topbar({ title, onCreate }) {
  return (
    <div style={{ height: 68, borderBottom: "1px solid var(--border-subtle)", background: "#fff",
      display: "flex", alignItems: "center", gap: 18, padding: "0 28px", flex: "none" }}>
      <div style={{ fontSize: 21, fontWeight: 800, color: "var(--text-primary)" }}>{title}</div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8,
        border: "1.5px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "9px 12px", width: 280 }}>
        <PIcon name="search" size={17} color="var(--text-tertiary)" />
        <input placeholder="Tìm mã đơn, sản phẩm..." style={{ border: "none", outline: "none",
          fontFamily: "var(--font-sans)", fontSize: 14, width: "100%" }} />
      </div>
      <button style={{ width: 42, height: 42, borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)",
        background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
        <PIcon name="bell" size={19} color="var(--text-secondary)" />
        <span style={{ position: "absolute", top: 8, right: 9, width: 8, height: 8, borderRadius: "50%",
          background: "var(--brand-red)", border: "2px solid #fff" }}></span>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--gold-100)",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "var(--gold-700)" }}>MH</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>Minh Hoàng</div>
          <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Khách VIP</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, delta, tone }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)",
      padding: 20, boxShadow: "var(--shadow-xs)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 42, height: 42, borderRadius: "var(--radius-md)", background: tone || "var(--gold-100)",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PIcon name={icon} size={21} color="var(--gold-700)" />
        </div>
        {delta && <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-success)" }}>{delta}</span>}
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: "var(--text-primary)", marginTop: 14 }}>{value}</div>
      <div style={{ fontSize: 13.5, color: "var(--text-tertiary)", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Dashboard({ onOpen }) {
  return (
    <div style={{ padding: 28, overflow: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
        <StatCard icon="package" label="Đơn đang xử lý" value="4" delta="+2" />
        <StatCard icon="ship" label="Đang vận chuyển" value="2" tone="var(--navy-100)" />
        <StatCard icon="check-circle-2" label="Đã giao tháng này" value="11" delta="+18%" tone="var(--success-bg)" />
        <StatCard icon="wallet" label="Số dư ví" value="1.85tr" tone="var(--gold-100)" />
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px",
          borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>Đơn hàng gần đây</div>
          <PButton variant="ghost" size="sm" iconAfter="arrow-right">Xem tất cả</PButton>
        </div>
        <OrderTable onOpen={onOpen} />
      </div>
    </div>
  );
}

function OrderTable({ onOpen }) {
  const cols = ["Mã đơn", "Tuyến", "SP", "Cân nặng", "Tổng tiền", "Trạng thái", ""];
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>{cols.map((c, i) => <th key={i} style={{ textAlign: i > 1 && i < 5 ? "right" : "left",
          fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase",
          letterSpacing: "0.04em", padding: "12px 22px", borderBottom: "1px solid var(--border-subtle)" }}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {ORDERS.map(o => (
          <tr key={o.id} onClick={() => onOpen(o)} style={{ cursor: "pointer", transition: "background .12s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surface-page)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <td style={{ padding: "15px 22px", borderBottom: "1px solid var(--border-subtle)", fontWeight: 700,
              fontSize: 14.5, color: "var(--text-primary)" }}>{o.id}</td>
            <td style={{ padding: "15px 22px", borderBottom: "1px solid var(--border-subtle)", fontSize: 14,
              color: "var(--text-secondary)" }}>{o.route}</td>
            <td style={{ padding: "15px 22px", borderBottom: "1px solid var(--border-subtle)", fontSize: 14,
              color: "var(--text-secondary)", textAlign: "right" }}>{o.items}</td>
            <td style={{ padding: "15px 22px", borderBottom: "1px solid var(--border-subtle)", fontSize: 14,
              color: "var(--text-secondary)", textAlign: "right" }}>{o.weight}</td>
            <td style={{ padding: "15px 22px", borderBottom: "1px solid var(--border-subtle)", fontSize: 14.5,
              fontWeight: 700, color: "var(--text-primary)", textAlign: "right" }}>{o.total}</td>
            <td style={{ padding: "15px 22px", borderBottom: "1px solid var(--border-subtle)" }}><PStatus status={o.status} /></td>
            <td style={{ padding: "15px 22px", borderBottom: "1px solid var(--border-subtle)" }}>
              <PIcon name="chevron-right" size={18} color="var(--text-tertiary)" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Object.assign(window, { ORDERS, Sidebar, Topbar, Dashboard, OrderTable, StatCard });
