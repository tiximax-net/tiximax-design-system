/* global React, ReactDOM, Sidebar, Topbar, Dashboard, OrderDrawer, CreateOrder, Login, pUseLucide */
const { useState, useEffect } = React;

const TITLES = { dashboard: "Tổng quan", orders: "Đơn hàng", create: "Tạo đơn mua hộ",
  wallet: "Ví & thanh toán", address: "Địa chỉ nhận", support: "Hỗ trợ" };

function App() {
  const [authed, setAuthed] = useState(false);
  const [nav, setNav] = useState("dashboard");
  const [open, setOpen] = useState(null);
  pUseLucide();
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [authed, nav, open]);

  if (!authed) return <div style={{ height: "100vh" }}><Login onLogin={() => setAuthed(true)} /></div>;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "var(--font-sans)" }}>
      <Sidebar active={nav} onNav={setNav} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "var(--surface-page)" }}>
        <Topbar title={TITLES[nav]} />
        <div style={{ flex: 1, overflow: "auto" }}>
          {(nav === "dashboard" || nav === "orders") && <Dashboard onOpen={setOpen} />}
          {nav === "create" && <CreateOrder onDone={() => setNav("dashboard")} />}
          {!["dashboard", "orders", "create"].includes(nav) && (
            <div style={{ padding: 60, textAlign: "center", color: "var(--text-tertiary)" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>Màn hình "{TITLES[nav]}" — demo placeholder</div>
            </div>
          )}
        </div>
      </div>
      <OrderDrawer order={open} onClose={() => setOpen(null)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
