/* global React, PLogo, PButton, PIcon, PStatus */
const { useState: useStateP2 } = React;

function OrderDrawer({ order, onClose }) {
  if (!order) return null;
  const timeline = [
    ["Đã đặt mua", "shopping-cart", "27/05 · 09:12", true],
    ["Về kho quốc tế (Tokyo)", "warehouse", "29/05 · 14:30", true],
    ["Đang vận chuyển", "ship", "31/05 · 08:00", true],
    ["Về kho Việt Nam", "building-2", "Dự kiến 06/06", false],
    ["Giao tận nhà", "home", "Dự kiến 08/06", false],
  ];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "var(--surface-overlay)", zIndex: 60,
      display: "flex", justifyContent: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 460, maxWidth: "100%", height: "100%", background: "#fff",
        boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "22px 26px", borderBottom: "1px solid var(--border-subtle)", display: "flex",
          alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-tertiary)", letterSpacing: "0.04em" }}>ĐƠN HÀNG</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", margin: "2px 0 8px" }}>{order.id}</div>
            <PStatus status={order.status} />
          </div>
          <PIcon name="x" size={22} color="var(--text-tertiary)" style={{ cursor: "pointer" }} />
        </div>
        <div style={{ padding: 26, overflow: "auto", flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 26 }}>
            {[["Tuyến", order.route], ["Số sản phẩm", order.items + " sản phẩm"], ["Cân nặng", order.weight], ["Ngày tạo", order.date]].map(([k, v]) => (
              <div key={k} style={{ background: "var(--surface-page)", borderRadius: "var(--radius-md)", padding: "12px 14px" }}>
                <div style={{ fontSize: 12.5, color: "var(--text-tertiary)" }}>{k}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Hành trình đơn hàng</div>
          <div>
            {timeline.map(([t, ic, time, done], i) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", flex: "none",
                    background: done ? "var(--brand-gold)" : "var(--surface-sunken)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PIcon name={ic} size={18} color={done ? "var(--navy-900)" : "var(--text-tertiary)"} />
                  </div>
                  {i < timeline.length - 1 && <div style={{ width: 2, height: 30,
                    background: done ? "var(--brand-gold)" : "var(--border-default)" }}></div>}
                </div>
                <div style={{ paddingTop: 7 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: done ? "var(--text-primary)" : "var(--text-tertiary)" }}>{t}</div>
                  <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 1 }}>{time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "16px 26px", borderTop: "1px solid var(--border-subtle)", display: "flex",
          alignItems: "center", justifyContent: "space-between" }}>
          <div><div style={{ fontSize: 12.5, color: "var(--text-tertiary)" }}>Tổng tiền</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>{order.total}</div></div>
          <PButton icon="download">Tải hóa đơn</PButton>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>{label}</label>
      {children}
    </div>
  );
}
const inputStyle = { border: "1.5px solid var(--border-default)", borderRadius: "var(--radius-md)",
  padding: "11px 13px", fontFamily: "var(--font-sans)", fontSize: 15, outline: "none", width: "100%" };

function CreateOrder({ onDone }) {
  return (
    <div style={{ padding: 28, overflow: "auto", maxWidth: 720 }}>
      <div style={{ background: "#fff", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)", padding: 28 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>Thông tin sản phẩm</div>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "0 0 22px" }}>Dán link sản phẩm, TIXIMAX sẽ báo giá tiền hàng và phí vận chuyển.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <FormField label="Link sản phẩm">
            <div style={{ display: "flex", alignItems: "center", gap: 8, ...inputStyle }}>
              <PIcon name="link" size={17} color="var(--text-tertiary)" />
              <input placeholder="https://..." style={{ border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: 15, width: "100%" }} />
            </div>
          </FormField>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <FormField label="Quốc gia"><select style={inputStyle}><option>Nhật Bản</option><option>Hàn Quốc</option><option>Indonesia</option><option>Hoa Kỳ</option></select></FormField>
            <FormField label="Phương thức"><select style={inputStyle}><option>Đường bay</option><option>Đường biển</option></select></FormField>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <FormField label="Số lượng"><input defaultValue="1" style={inputStyle} /></FormField>
            <FormField label="Giá sản phẩm (nội tệ)"><input placeholder="0" style={inputStyle} /></FormField>
          </div>
          <FormField label="Ghi chú cho TIXIMAX"><textarea rows="2" placeholder="Màu sắc, kích cỡ, yêu cầu khác..." style={{ ...inputStyle, resize: "vertical" }}></textarea></FormField>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <PButton variant="outline" onClick={onDone}>Hủy</PButton>
          <PButton icon="calculator" onClick={onDone}>Nhận báo giá</PButton>
        </div>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 1, background: "var(--brand-navy)", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 48 }}>
        <div style={{ position: "absolute", top: -100, right: -80, width: 460, height: 460,
          background: "radial-gradient(circle, rgba(223,169,48,0.22), transparent 65%)" }}></div>
        <PLogo width={150} />
        <div style={{ position: "relative" }}>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
            Quản lý đơn mua hộ<br />ở một nơi duy nhất.</h1>
          <p style={{ fontSize: 17, color: "var(--navy-200)", marginTop: 16, maxWidth: 380, lineHeight: 1.6 }}>
            Theo dõi đơn hàng, thanh toán và nhận hàng quốc tế — minh bạch từng bước.</p>
        </div>
        <div style={{ fontSize: 13, color: "var(--navy-300)", position: "relative" }}>© 2026 TIXIMAX Logistics</div>
      </div>
      <div style={{ flex: 1, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
        <div style={{ width: 360, maxWidth: "100%" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 6px" }}>Đăng nhập</h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", margin: "0 0 26px" }}>Chào mừng bạn quay lại với TIXIMAX.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <FormField label="Email hoặc số điện thoại"><input defaultValue="minhhoang@email.com" style={inputStyle} /></FormField>
            <FormField label="Mật khẩu"><input type="password" defaultValue="123456" style={inputStyle} /></FormField>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13.5 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text-secondary)" }}>
                <input type="checkbox" defaultChecked /> Ghi nhớ đăng nhập</label>
              <a href="#" style={{ color: "var(--text-brand)", fontWeight: 600, textDecoration: "none" }}>Quên mật khẩu?</a>
            </div>
            <PButton full size="lg" onClick={onLogin}>Đăng nhập</PButton>
            <div style={{ textAlign: "center", fontSize: 14, color: "var(--text-secondary)" }}>
              Chưa có tài khoản? <a href="#" style={{ color: "var(--text-brand)", fontWeight: 700, textDecoration: "none" }}>Đăng ký</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OrderDrawer, CreateOrder, Login });
