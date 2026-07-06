/* @ds-bundle: {"format":4,"namespace":"TIXIMAXDesignSystem_e800eb","components":[],"sourceHashes":{"ui_kits/portal/app.jsx":"1b2f9d6050e9","ui_kits/portal/screens.jsx":"a9534767bc0c","ui_kits/portal/screens2.jsx":"b5e2170ec5cd","ui_kits/portal/ui.jsx":"ab475fe1413d","ui_kits/website/app.jsx":"27a6b4a846b2","ui_kits/website/sections.jsx":"dcd294b64fb2","ui_kits/website/ui-standalone.jsx":"cb98936df310","ui_kits/website/ui.jsx":"24c41f890edb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TIXIMAXDesignSystem_e800eb = window.TIXIMAXDesignSystem_e800eb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/portal/app.jsx
try { (() => {
/* global React, ReactDOM, Sidebar, Topbar, Dashboard, OrderDrawer, CreateOrder, Login, pUseLucide */
const {
  useState,
  useEffect
} = React;
const TITLES = {
  dashboard: "Tổng quan",
  orders: "Đơn hàng",
  create: "Tạo đơn mua hộ",
  wallet: "Ví & thanh toán",
  address: "Địa chỉ nhận",
  support: "Hỗ trợ"
};
function App() {
  const [authed, setAuthed] = useState(false);
  const [nav, setNav] = useState("dashboard");
  const [open, setOpen] = useState(null);
  pUseLucide();
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [authed, nav, open]);
  if (!authed) return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Login, {
    onLogin: () => setAuthed(true)
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: nav,
    onNav: setNav
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: TITLES[nav]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto"
    }
  }, (nav === "dashboard" || nav === "orders") && /*#__PURE__*/React.createElement(Dashboard, {
    onOpen: setOpen
  }), nav === "create" && /*#__PURE__*/React.createElement(CreateOrder, {
    onDone: () => setNav("dashboard")
  }), !["dashboard", "orders", "create"].includes(nav) && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 60,
      textAlign: "center",
      color: "var(--text-tertiary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 600
    }
  }, "M\xE0n h\xECnh \"", TITLES[nav], "\" \u2014 demo placeholder")))), /*#__PURE__*/React.createElement(OrderDrawer, {
    order: open,
    onClose: () => setOpen(null)
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/screens.jsx
try { (() => {
/* global React, PLogo, PButton, PIcon, PStatus, STATUS */

const ORDERS = [{
  id: "TX-48210",
  status: "shipping",
  route: "Tokyo → Hà Nội",
  items: 3,
  weight: "3.5 kg",
  total: "2.480.000đ",
  date: "31/05/2026"
}, {
  id: "TX-48198",
  status: "warehouse",
  route: "Seoul → TP.HCM",
  items: 1,
  weight: "1.2 kg",
  total: "860.000đ",
  date: "29/05/2026"
}, {
  id: "TX-48155",
  status: "processing",
  route: "Jakarta → Hà Nội",
  items: 5,
  weight: "8.0 kg",
  total: "1.240.000đ",
  date: "27/05/2026"
}, {
  id: "TX-48090",
  status: "delivered",
  route: "Osaka → Đà Nẵng",
  items: 2,
  weight: "2.1 kg",
  total: "1.020.000đ",
  date: "22/05/2026"
}, {
  id: "TX-47980",
  status: "late",
  route: "Los Angeles → Hà Nội",
  items: 1,
  weight: "4.4 kg",
  total: "3.150.000đ",
  date: "18/05/2026"
}];
function Sidebar({
  active,
  onNav
}) {
  const nav = [["dashboard", "layout-dashboard", "Tổng quan"], ["orders", "package", "Đơn hàng"], ["create", "plus-circle", "Tạo đơn mua hộ"], ["wallet", "wallet", "Ví & thanh toán"], ["address", "map-pin", "Địa chỉ nhận"], ["support", "headphones", "Hỗ trợ"]];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      background: "var(--brand-navy)",
      display: "flex",
      flexDirection: "column",
      padding: "22px 16px",
      flex: "none",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 8px 22px"
    }
  }, /*#__PURE__*/React.createElement(PLogo, {
    width: 130
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, nav.map(([k, ic, label]) => {
    const on = active === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => onNav(k),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 12px",
        borderRadius: "var(--radius-md)",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: 15,
        fontWeight: 600,
        textAlign: "left",
        background: on ? "rgba(223,169,48,0.16)" : "transparent",
        color: on ? "var(--brand-gold)" : "var(--navy-200)"
      }
    }, /*#__PURE__*/React.createElement(PIcon, {
      name: ic,
      size: 19
    }), label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      padding: 14,
      background: "rgba(255,255,255,0.05)",
      borderRadius: "var(--radius-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#fff"
    }
  }, "C\u1EA7n h\u1ED7 tr\u1EE3?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--navy-200)",
      margin: "4px 0 10px",
      lineHeight: 1.45
    }
  }, "Hotline 1900 6868 \xB7 8h\u201322h h\u1EB1ng ng\xE0y"), /*#__PURE__*/React.createElement(PButton, {
    size: "sm",
    full: true
  }, "Li\xEAn h\u1EC7 ngay")));
}
function Topbar({
  title,
  onCreate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 68,
      borderBottom: "1px solid var(--border-subtle)",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "0 28px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 800,
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 8,
      border: "1.5px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "9px 12px",
      width: 280
    }
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "search",
    size: 17,
    color: "var(--text-tertiary)"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "T\xECm m\xE3 \u0111\u01A1n, s\u1EA3n ph\u1EA9m...",
    style: {
      border: "none",
      outline: "none",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 42,
      height: 42,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-default)",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "bell",
    size: 19,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 8,
      right: 9,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--brand-red)",
      border: "2px solid #fff"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "var(--gold-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      color: "var(--gold-700)"
    }
  }, "MH"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text-primary)",
      lineHeight: 1.2
    }
  }, "Minh Ho\xE0ng"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)"
    }
  }, "Kh\xE1ch VIP"))));
}
function StatCard({
  icon,
  label,
  value,
  delta,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: 20,
      boxShadow: "var(--shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: "var(--radius-md)",
      background: tone || "var(--gold-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: icon,
    size: 21,
    color: "var(--gold-700)"
  })), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: "var(--text-success)"
    }
  }, delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: "var(--text-primary)",
      marginTop: 14
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, label));
}
function Dashboard({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 18,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    icon: "package",
    label: "\u0110\u01A1n \u0111ang x\u1EED l\xFD",
    value: "4",
    delta: "+2"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "ship",
    label: "\u0110ang v\u1EADn chuy\u1EC3n",
    value: "2",
    tone: "var(--navy-100)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "check-circle-2",
    label: "\u0110\xE3 giao th\xE1ng n\xE0y",
    value: "11",
    delta: "+18%",
    tone: "var(--success-bg)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "wallet",
    label: "S\u1ED1 d\u01B0 v\xED",
    value: "1.85tr",
    tone: "var(--gold-100)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 22px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "\u0110\u01A1n h\xE0ng g\u1EA7n \u0111\xE2y"), /*#__PURE__*/React.createElement(PButton, {
    variant: "ghost",
    size: "sm",
    iconAfter: "arrow-right"
  }, "Xem t\u1EA5t c\u1EA3")), /*#__PURE__*/React.createElement(OrderTable, {
    onOpen: onOpen
  })));
}
function OrderTable({
  onOpen
}) {
  const cols = ["Mã đơn", "Tuyến", "SP", "Cân nặng", "Tổng tiền", "Trạng thái", ""];
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, cols.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: i > 1 && i < 5 ? "right" : "left",
      fontSize: 12,
      fontWeight: 700,
      color: "var(--text-tertiary)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      padding: "12px 22px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, ORDERS.map(o => /*#__PURE__*/React.createElement("tr", {
    key: o.id,
    onClick: () => onOpen(o),
    style: {
      cursor: "pointer",
      transition: "background .12s"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--surface-page)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "15px 22px",
      borderBottom: "1px solid var(--border-subtle)",
      fontWeight: 700,
      fontSize: 14.5,
      color: "var(--text-primary)"
    }
  }, o.id), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "15px 22px",
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: 14,
      color: "var(--text-secondary)"
    }
  }, o.route), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "15px 22px",
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: 14,
      color: "var(--text-secondary)",
      textAlign: "right"
    }
  }, o.items), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "15px 22px",
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: 14,
      color: "var(--text-secondary)",
      textAlign: "right"
    }
  }, o.weight), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "15px 22px",
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: 14.5,
      fontWeight: 700,
      color: "var(--text-primary)",
      textAlign: "right"
    }
  }, o.total), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "15px 22px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(PStatus, {
    status: o.status
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "15px 22px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-tertiary)"
  }))))));
}
Object.assign(window, {
  ORDERS,
  Sidebar,
  Topbar,
  Dashboard,
  OrderTable,
  StatCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/screens2.jsx
try { (() => {
/* global React, PLogo, PButton, PIcon, PStatus */
const {
  useState: useStateP2
} = React;
function OrderDrawer({
  order,
  onClose
}) {
  if (!order) return null;
  const timeline = [["Đã đặt mua", "shopping-cart", "27/05 · 09:12", true], ["Về kho quốc tế (Tokyo)", "warehouse", "29/05 · 14:30", true], ["Đang vận chuyển", "ship", "31/05 · 08:00", true], ["Về kho Việt Nam", "building-2", "Dự kiến 06/06", false], ["Giao tận nhà", "home", "Dự kiến 08/06", false]];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "var(--surface-overlay)",
      zIndex: 60,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 460,
      maxWidth: "100%",
      height: "100%",
      background: "#fff",
      boxShadow: "var(--shadow-xl)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 26px",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text-tertiary)",
      letterSpacing: "0.04em"
    }
  }, "\u0110\u01A0N H\xC0NG"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: "var(--text-primary)",
      margin: "2px 0 8px"
    }
  }, order.id), /*#__PURE__*/React.createElement(PStatus, {
    status: order.status
  })), /*#__PURE__*/React.createElement(PIcon, {
    name: "x",
    size: 22,
    color: "var(--text-tertiary)",
    style: {
      cursor: "pointer"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 26,
      overflow: "auto",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14,
      marginBottom: 26
    }
  }, [["Tuyến", order.route], ["Số sản phẩm", order.items + " sản phẩm"], ["Cân nặng", order.weight], ["Ngày tạo", order.date]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      background: "var(--surface-page)",
      borderRadius: "var(--radius-md)",
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-tertiary)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "var(--text-primary)",
      marginTop: 2
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "var(--text-primary)",
      marginBottom: 16
    }
  }, "H\xE0nh tr\xECnh \u0111\u01A1n h\xE0ng"), /*#__PURE__*/React.createElement("div", null, timeline.map(([t, ic, time, done], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      flex: "none",
      background: done ? "var(--brand-gold)" : "var(--surface-sunken)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: ic,
    size: 18,
    color: done ? "var(--navy-900)" : "var(--text-tertiary)"
  })), i < timeline.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      height: 30,
      background: done ? "var(--brand-gold)" : "var(--border-default)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: done ? "var(--text-primary)" : "var(--text-tertiary)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-tertiary)",
      marginTop: 1
    }
  }, time)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 26px",
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-tertiary)"
    }
  }, "T\u1ED5ng ti\u1EC1n"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: "var(--text-primary)"
    }
  }, order.total)), /*#__PURE__*/React.createElement(PButton, {
    icon: "download"
  }, "T\u1EA3i h\xF3a \u0111\u01A1n"))));
}
function FormField({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, label), children);
}
const inputStyle = {
  border: "1.5px solid var(--border-default)",
  borderRadius: "var(--radius-md)",
  padding: "11px 13px",
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  outline: "none",
  width: "100%"
};
function CreateOrder({
  onDone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      overflow: "auto",
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: "var(--text-primary)",
      marginBottom: 4
    }
  }, "Th\xF4ng tin s\u1EA3n ph\u1EA9m"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      margin: "0 0 22px"
    }
  }, "D\xE1n link s\u1EA3n ph\u1EA9m, TIXIMAX s\u1EBD b\xE1o gi\xE1 ti\u1EC1n h\xE0ng v\xE0 ph\xED v\u1EADn chuy\u1EC3n."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Link s\u1EA3n ph\u1EA9m"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      ...inputStyle
    }
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "link",
    size: 17,
    color: "var(--text-tertiary)"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "https://...",
    style: {
      border: "none",
      outline: "none",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      width: "100%"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Qu\u1ED1c gia"
  }, /*#__PURE__*/React.createElement("select", {
    style: inputStyle
  }, /*#__PURE__*/React.createElement("option", null, "Nh\u1EADt B\u1EA3n"), /*#__PURE__*/React.createElement("option", null, "H\xE0n Qu\u1ED1c"), /*#__PURE__*/React.createElement("option", null, "Indonesia"), /*#__PURE__*/React.createElement("option", null, "Hoa K\u1EF3"))), /*#__PURE__*/React.createElement(FormField, {
    label: "Ph\u01B0\u01A1ng th\u1EE9c"
  }, /*#__PURE__*/React.createElement("select", {
    style: inputStyle
  }, /*#__PURE__*/React.createElement("option", null, "\u0110\u01B0\u1EDDng bay"), /*#__PURE__*/React.createElement("option", null, "\u0110\u01B0\u1EDDng bi\u1EC3n")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "S\u1ED1 l\u01B0\u1EE3ng"
  }, /*#__PURE__*/React.createElement("input", {
    defaultValue: "1",
    style: inputStyle
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Gi\xE1 s\u1EA3n ph\u1EA9m (n\u1ED9i t\u1EC7)"
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "0",
    style: inputStyle
  }))), /*#__PURE__*/React.createElement(FormField, {
    label: "Ghi ch\xFA cho TIXIMAX"
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    placeholder: "M\xE0u s\u1EAFc, k\xEDch c\u1EE1, y\xEAu c\u1EA7u kh\xE1c...",
    style: {
      ...inputStyle,
      resize: "vertical"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(PButton, {
    variant: "outline",
    onClick: onDone
  }, "H\u1EE7y"), /*#__PURE__*/React.createElement(PButton, {
    icon: "calculator",
    onClick: onDone
  }, "Nh\u1EADn b\xE1o gi\xE1"))));
}
function Login({
  onLogin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "var(--brand-navy)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -100,
      right: -80,
      width: 460,
      height: 460,
      background: "radial-gradient(circle, rgba(223,169,48,0.22), transparent 65%)"
    }
  }), /*#__PURE__*/React.createElement(PLogo, {
    width: 150
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 40,
      fontWeight: 900,
      color: "#fff",
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "Qu\u1EA3n l\xFD \u0111\u01A1n mua h\u1ED9", /*#__PURE__*/React.createElement("br", null), "\u1EDF m\u1ED9t n\u01A1i duy nh\u1EA5t."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: "var(--navy-200)",
      marginTop: 16,
      maxWidth: 380,
      lineHeight: 1.6
    }
  }, "Theo d\xF5i \u0111\u01A1n h\xE0ng, thanh to\xE1n v\xE0 nh\u1EADn h\xE0ng qu\u1ED1c t\u1EBF \u2014 minh b\u1EA1ch t\u1EEBng b\u01B0\u1EDBc.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--navy-300)",
      position: "relative"
    }
  }, "\xA9 2026 TIXIMAX Logistics")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      maxWidth: "100%"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: "var(--text-primary)",
      margin: "0 0 6px"
    }
  }, "\u0110\u0103ng nh\u1EADp"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: "var(--text-secondary)",
      margin: "0 0 26px"
    }
  }, "Ch\xE0o m\u1EEBng b\u1EA1n quay l\u1EA1i v\u1EDBi TIXIMAX."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Email ho\u1EB7c s\u1ED1 \u0111i\u1EC7n tho\u1EA1i"
  }, /*#__PURE__*/React.createElement("input", {
    defaultValue: "minhhoang@email.com",
    style: inputStyle
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "M\u1EADt kh\u1EA9u"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    defaultValue: "123456",
    style: inputStyle
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: true
  }), " Ghi nh\u1EDB \u0111\u0103ng nh\u1EADp"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--text-brand)",
      fontWeight: 600,
      textDecoration: "none"
    }
  }, "Qu\xEAn m\u1EADt kh\u1EA9u?")), /*#__PURE__*/React.createElement(PButton, {
    full: true,
    size: "lg",
    onClick: onLogin
  }, "\u0110\u0103ng nh\u1EADp"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 14,
      color: "var(--text-secondary)"
    }
  }, "Ch\u01B0a c\xF3 t\xE0i kho\u1EA3n? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--text-brand)",
      fontWeight: 700,
      textDecoration: "none"
    }
  }, "\u0110\u0103ng k\xFD"))))));
}
Object.assign(window, {
  OrderDrawer,
  CreateOrder,
  Login
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/screens2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/ui.jsx
try { (() => {
/* global React */
const {
  useState,
  useEffect,
  useRef
} = React;
function pUseLucide() {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
}
function PIcon({
  name,
  size = 20,
  color,
  style
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color,
      ...style
    }
  });
}
function PLogo({
  variant = "white",
  width = 128
}) {
  const src = variant === "white" ? "../../assets/tiximax-logo-white.svg" : "../../assets/tiximax-logo-navy.svg";
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "TIXIMAX",
    style: {
      width,
      height: "auto",
      display: "block"
    }
  });
}
function PButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconAfter,
  full,
  onClick,
  type
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    lineHeight: 1,
    transition: "all .16s ease-out",
    width: full ? "100%" : "auto",
    whiteSpace: "nowrap"
  };
  const sizes = {
    sm: {
      padding: "8px 14px",
      fontSize: 14
    },
    md: {
      padding: "11px 18px",
      fontSize: 15
    },
    lg: {
      padding: "14px 24px",
      fontSize: 16
    }
  };
  const variants = {
    primary: {
      background: "var(--brand-gold)",
      color: "var(--navy-900)",
      boxShadow: "var(--shadow-gold)"
    },
    secondary: {
      background: "var(--brand-navy)",
      color: "#fff"
    },
    outline: {
      background: "#fff",
      color: "var(--text-primary)",
      border: "1.5px solid var(--border-default)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant]
    },
    onMouseDown: e => e.currentTarget.style.transform = "scale(0.98)",
    onMouseUp: e => e.currentTarget.style.transform = "scale(1)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, icon && /*#__PURE__*/React.createElement(PIcon, {
    name: icon,
    size: size === "lg" ? 19 : 17
  }), children, iconAfter && /*#__PURE__*/React.createElement(PIcon, {
    name: iconAfter,
    size: 17
  }));
}
const STATUS = {
  delivered: {
    label: "Đã giao",
    tone: {
      background: "var(--success-bg)",
      color: "var(--text-success)"
    },
    icon: "check-circle-2"
  },
  shipping: {
    label: "Đang vận chuyển",
    tone: {
      background: "var(--gold-100)",
      color: "var(--gold-700)"
    },
    icon: "ship"
  },
  warehouse: {
    label: "Tại kho",
    tone: {
      background: "var(--navy-100)",
      color: "var(--navy-700)"
    },
    icon: "warehouse"
  },
  processing: {
    label: "Đang xử lý",
    tone: {
      background: "var(--info-bg)",
      color: "var(--info)"
    },
    icon: "loader"
  },
  late: {
    label: "Trễ hẹn",
    tone: {
      background: "var(--error-bg)",
      color: "var(--text-error)"
    },
    icon: "alert-triangle"
  }
};
function PStatus({
  status
}) {
  const s = STATUS[status] || STATUS.processing;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12.5,
      fontWeight: 700,
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.4,
      ...s.tone
    }
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: s.icon,
    size: 13
  }), s.label);
}
Object.assign(window, {
  pUseLucide,
  PIcon,
  PLogo,
  PButton,
  PStatus,
  STATUS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* global React, ReactDOM, Navbar, Hero, Services, Steps, Routes, CTA, Footer, Button, Icon, Badge, useLucide */
const {
  useState,
  useEffect
} = React;
function TrackModal({
  open,
  onClose
}) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  if (!open) return null;
  const steps = [["Đã đặt mua", "shopping-cart", true], ["Về kho quốc tế", "warehouse", true], ["Đang vận chuyển", "ship", true], ["Về kho Việt Nam", "building-2", false], ["Giao tận nhà", "home", false]];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "var(--surface-overlay)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "#fff",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-xl)",
      width: 480,
      maxWidth: "100%",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 24px",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: "var(--text-primary)"
    }
  }, "Tra c\u1EE9u \u0111\u01A1n h\xE0ng"), /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20,
    color: "var(--text-tertiary)",
    style: {
      cursor: "pointer"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 8,
      border: "1.5px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "package-search",
    size: 18,
    color: "var(--text-tertiary)"
  }), /*#__PURE__*/React.createElement("input", {
    value: code,
    onChange: e => setCode(e.target.value),
    placeholder: "Nh\u1EADp m\xE3 \u0111\u01A1n, vd: TX-48210",
    style: {
      border: "none",
      outline: "none",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement(Button, {
    onClick: () => setResult(code || "TX-48210")
  }, "Tra c\u1EE9u")), result && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "\u0110\u01A1n ", result.toUpperCase()), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    icon: "ship"
  }, "\u0110ang v\u1EADn chuy\u1EC3n")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, steps.map(([t, ic, done], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      flex: "none",
      background: done ? "var(--brand-gold)" : "var(--surface-sunken)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 17,
    color: done ? "var(--navy-900)" : "var(--text-tertiary)"
  })), i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      height: 26,
      background: done ? "var(--brand-gold)" : "var(--border-default)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: done ? "var(--text-primary)" : "var(--text-tertiary)"
    }
  }, t), i === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-tertiary)"
    }
  }, "T\xE0u r\u1EDDi c\u1EA3ng Tokyo \xB7 31/05")))))))));
}
function App() {
  const [track, setTrack] = useState(false);
  useLucide();
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [track]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(Navbar, {
    onTrack: () => setTrack(true),
    onLogin: () => {}
  }), /*#__PURE__*/React.createElement(Hero, {
    onTrack: () => setTrack(true)
  }), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Steps, null), /*#__PURE__*/React.createElement(Routes, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TrackModal, {
    open: track,
    onClose: () => setTrack(false)
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* global React, Logo, Button, Badge, Eyebrow, Icon */
const {
  useState: useStateS
} = React;
function Navbar({
  onTrack,
  onLogin
}) {
  const links = ["Mua hộ", "Vận chuyển", "Bảng giá", "Tra cứu", "Về chúng tôi"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 32px",
      height: 72,
      display: "flex",
      alignItems: "center",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    width: 132
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 26,
      marginLeft: 8
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      if (l === "Tra cứu") onTrack();
    },
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: onLogin
  }, "\u0110\u0103ng nh\u1EADp"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: "plus"
  }, "T\u1EA1o \u0111\u01A1n mua h\u1ED9"))));
}
function Hero({
  onTrack
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--brand-navy)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -120,
      right: -80,
      width: 520,
      height: 520,
      background: "radial-gradient(circle, rgba(223,169,48,0.22), transparent 65%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "84px 32px 92px",
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: 48,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    onDark: true
  }, "Mua h\u1ED9 & v\u1EADn chuy\u1EC3n qu\u1ED1c t\u1EBF"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 54,
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
      color: "#fff",
      margin: "16px 0 18px"
    }
  }, "Mua s\u1EAFm to\xE0n c\u1EA7u,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--brand-gold)"
    }
  }, "TIXIMAX"), " lo ph\u1EA7n c\xF2n l\u1EA1i."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: "var(--navy-200)",
      maxWidth: 480,
      margin: "0 0 28px"
    }
  }, "\u0110\u1EB7t mua, thanh to\xE1n v\xE0 v\u1EADn chuy\u1EC3n h\xE0ng t\u1EEB Nh\u1EADt, H\xE0n, Indonesia v\xE0 M\u1EF9 v\u1EC1 t\u1EADn nh\xE0 \u2014 minh b\u1EA1ch chi ph\xED, theo d\xF5i t\u1EEBng b\u01B0\u1EDBc."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconAfter: "arrow-right"
  }, "Nh\u1EADn b\xE1o gi\xE1 mi\u1EC5n ph\xED"), /*#__PURE__*/React.createElement(Button, {
    variant: "on-navy",
    size: "lg",
    icon: "search",
    onClick: onTrack
  }, "Tra c\u1EE9u \u0111\u01A1n")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 32,
      marginTop: 40
    }
  }, [["120K+", "Đơn đã giao"], ["6", "Quốc gia"], ["12\u201318", "Ngày vận chuyển"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: "var(--brand-gold)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--navy-200)"
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "var(--radius-xl)",
      padding: 24,
      backdropFilter: "blur(4px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--navy-200)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 14
    }
  }, "\u01AF\u1EDBc t\xEDnh ph\xED v\u1EADn chuy\u1EC3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MiniField, {
    label: "Qu\u1ED1c gia",
    value: "Nh\u1EADt B\u1EA3n",
    icon: "flag"
  }), /*#__PURE__*/React.createElement(MiniField, {
    label: "C\xE2n n\u1EB7ng (kg)",
    value: "3.5 kg",
    icon: "weight"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      padding: "14px 16px",
      background: "var(--brand-gold)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--navy-900)"
    }
  }, "T\u1EA1m t\xEDnh"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 900,
      color: "var(--navy-900)"
    }
  }, "525.000\u0111"))))));
}
function MiniField({
  label,
  value,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18,
    color: "var(--brand-gold)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--navy-200)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "#fff"
    }
  }, value)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 16,
    color: "var(--navy-200)"
  }));
}
function SectionHead({
  eyebrow,
  title,
  sub,
  center
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: center ? "center" : "left",
      maxWidth: center ? 620 : "none",
      margin: center ? "0 auto 48px" : "0 0 40px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 36,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      margin: "12px 0 10px"
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, sub));
}
function Services() {
  const items = [["shopping-cart", "Mua hộ", "Gửi link sản phẩm, TIXIMAX đặt mua và thanh toán giúp bạn với tỷ giá minh bạch."], ["ship", "Vận chuyển", "Đường biển & đường bay từ Nhật, Hàn, Indonesia, Mỹ về Việt Nam."], ["warehouse", "Gom hàng", "Gom nhiều đơn vào một kiện để tiết kiệm tối đa chi phí vận chuyển."], ["shield-check", "Bảo hiểm hàng hóa", "Bảo vệ giá trị đơn hàng trong suốt quá trình vận chuyển quốc tế."]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "#fff",
      padding: "84px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    center: true,
    eyebrow: "D\u1ECBch v\u1EE5",
    title: "M\u1ED9t \u0111i\u1EC3m ch\u1EA1m, tr\u1ECDn quy tr\xECnh",
    sub: "T\u1EEB l\xFAc b\u1EA1n th\u1EA5y m\xF3n h\xE0ng \u1EDF n\u01B0\u1EDBc ngo\xE0i \u0111\u1EBFn khi n\xF3 n\u1EB1m trong tay b\u1EA1n."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20
    }
  }, items.map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: 24,
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: "var(--radius-md)",
      background: "var(--gold-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 24,
    color: "var(--gold-700)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "var(--text-primary)",
      marginBottom: 6
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, d))))));
}
function Steps() {
  const steps = [["link", "Gửi link sản phẩm", "Dán đường link món hàng bạn muốn mua từ bất kỳ trang nào."], ["receipt", "Nhận báo giá", "TIXIMAX báo giá tiền hàng + phí vận chuyển trong vài phút."], ["credit-card", "Thanh toán", "Đặt cọc hoặc thanh toán toàn bộ, chúng tôi đặt mua ngay."], ["package-check", "Nhận hàng tận nơi", "Theo dõi đơn theo thời gian thực đến khi giao tận nhà."]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-page)",
      padding: "84px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Quy tr\xECnh",
    title: "Mua h\xE0ng qu\u1ED1c t\u1EBF trong 4 b\u01B0\u1EDBc"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20
    }
  }, steps.map(([ic, t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "var(--brand-navy)",
      color: "var(--brand-gold)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 18
    }
  }, i + 1), /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22,
    color: "var(--text-brand)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: "var(--text-primary)",
      marginBottom: 5
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, d))))));
}
function Routes() {
  const routes = [["Nhật Bản", "JP", "Đường bay · 5\u20137 ngày", "210.000đ/kg"], ["Hàn Quốc", "KR", "Đường bay · 4\u20136 ngày", "180.000đ/kg"], ["Indonesia", "ID", "Đường biển · 12\u201318 ngày", "38.000đ/kg"], ["Hoa Kỳ", "US", "Đường bay · 7\u201310 ngày", "260.000đ/kg"]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "#fff",
      padding: "84px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Tuy\u1EBFn v\u1EADn chuy\u1EC3n",
    title: "Gi\xE1 c\u01B0\u1EDBc r\xF5 r\xE0ng theo t\u1EEBng tuy\u1EBFn"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20
    }
  }, routes.map(([c, code, mode, price]) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80,
      background: "var(--navy-700)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 900,
      color: "var(--brand-gold)",
      letterSpacing: "0.05em"
    }
  }, code)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, c), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-tertiary)",
      margin: "3px 0 12px"
    }
  }, mode), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: "var(--text-primary)"
    }
  }, price)))))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--brand-navy)",
      padding: "72px 0",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -140,
      left: -60,
      width: 460,
      height: 460,
      background: "radial-gradient(circle, rgba(223,169,48,0.18), transparent 65%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: "0 auto",
      padding: "0 32px",
      textAlign: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 40,
      fontWeight: 900,
      color: "#fff",
      letterSpacing: "-0.02em",
      margin: "0 0 14px"
    }
  }, "S\u1EB5n s\xE0ng cho \u0111\u01A1n h\xE0ng \u0111\u1EA7u ti\xEAn?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "var(--navy-200)",
      margin: "0 0 28px"
    }
  }, "T\u1EA1o t\xE0i kho\u1EA3n mi\u1EC5n ph\xED v\xE0 nh\u1EADn b\xE1o gi\xE1 trong 5 ph\xFAt."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "user-plus"
  }, "\u0110\u0103ng k\xFD ngay"), /*#__PURE__*/React.createElement(Button, {
    variant: "on-navy",
    size: "lg"
  }, "Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n"))));
}
function Footer() {
  const cols = [["Dịch vụ", ["Mua hộ", "Vận chuyển", "Gom hàng", "Bảng giá"]], ["Công ty", ["Về TIXIMAX", "Tuyển dụng", "Tin tức", "Liên hệ"]], ["Hỗ trợ", ["Tra cứu đơn", "Câu hỏi thường gặp", "Chính sách", "Điều khoản"]]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--navy-900)",
      padding: "56px 0 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 32px",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    width: 140
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--navy-200)",
      lineHeight: 1.6,
      margin: "16px 0 0",
      maxWidth: 240
    }
  }, "D\u1ECBch v\u1EE5 mua h\u1ED9 & v\u1EADn chuy\u1EC3n qu\u1ED1c t\u1EBF uy t\xEDn, minh b\u1EA1ch v\u1EC1 t\u1EADn nh\xE0 b\u1EA1n.")), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#fff",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 14
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontSize: 14,
      color: "var(--navy-200)",
      textDecoration: "none"
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "36px auto 0",
      padding: "20px 32px 0",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--navy-300)"
    }
  }, "\xA9 2026 TIXIMAX Logistics. All rights reserved."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16
    }
  }, ["mail", "phone", "globe"].map(s => /*#__PURE__*/React.createElement(Icon, {
    key: s,
    name: s,
    size: 18,
    color: "var(--navy-300)"
  })))));
}
Object.assign(window, {
  Navbar,
  Hero,
  Services,
  Steps,
  Routes,
  CTA,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui-standalone.jsx
try { (() => {
/* global React */
const {
  useState,
  useEffect,
  useRef
} = React;

// Re-render Lucide icons after React commits
function useLucide(dep) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
}
function Icon({
  name,
  size = 20,
  color,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color,
      ...style
    },
    className: className
  });
}
function Logo({
  variant = "navy",
  width = 150
}) {
  const src = variant === "white" ? window.__resources.logoWhite : window.__resources.logoNavy;
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "TIXIMAX",
    style: {
      width,
      height: "auto",
      display: "block"
    }
  });
}
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconAfter,
  full,
  onClick,
  type
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    lineHeight: 1,
    transition: "all .16s ease-out",
    width: full ? "100%" : "auto",
    whiteSpace: "nowrap"
  };
  const sizes = {
    sm: {
      padding: "8px 14px",
      fontSize: 14
    },
    md: {
      padding: "12px 20px",
      fontSize: 15
    },
    lg: {
      padding: "15px 28px",
      fontSize: 17
    }
  };
  const variants = {
    primary: {
      background: "var(--brand-gold)",
      color: "var(--navy-900)",
      boxShadow: "var(--shadow-gold)"
    },
    secondary: {
      background: "var(--brand-navy)",
      color: "#fff"
    },
    outline: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1.5px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-brand)"
    },
    danger: {
      background: "var(--brand-red)",
      color: "#fff"
    },
    "on-navy": {
      background: "#fff",
      color: "var(--navy-900)"
    }
  };
  const ic = size === "lg" ? 20 : 18;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant]
    },
    onMouseDown: e => e.currentTarget.style.transform = "scale(0.98)",
    onMouseUp: e => e.currentTarget.style.transform = "scale(1)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: ic
  }), children, iconAfter && /*#__PURE__*/React.createElement(Icon, {
    name: iconAfter,
    size: ic
  }));
}
function Badge({
  children,
  tone = "gold",
  icon
}) {
  const tones = {
    gold: {
      background: "var(--gold-100)",
      color: "var(--gold-700)"
    },
    navy: {
      background: "var(--navy-100)",
      color: "var(--navy-700)"
    },
    green: {
      background: "var(--success-bg)",
      color: "var(--text-success)"
    },
    red: {
      background: "var(--error-bg)",
      color: "var(--text-error)"
    },
    solid: {
      background: "var(--brand-gold)",
      color: "var(--navy-900)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      fontWeight: 700,
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.4,
      ...tones[tone]
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13
  }), children);
}
function Eyebrow({
  children,
  onDark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: onDark ? "var(--brand-gold)" : "var(--text-brand)"
    }
  }, children);
}
Object.assign(window, {
  useLucide,
  Icon,
  Logo,
  Button,
  Badge,
  Eyebrow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui-standalone.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
/* global React */
const {
  useState,
  useEffect,
  useRef
} = React;

// Re-render Lucide icons after React commits
function useLucide(dep) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
}
function Icon({
  name,
  size = 20,
  color,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color,
      ...style
    },
    className: className
  });
}
function Logo({
  variant = "navy",
  width = 150
}) {
  const src = variant === "white" ? "../../assets/tiximax-logo-white.svg" : "../../assets/tiximax-logo-navy.svg";
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "TIXIMAX",
    style: {
      width,
      height: "auto",
      display: "block"
    }
  });
}
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconAfter,
  full,
  onClick,
  type
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    lineHeight: 1,
    transition: "all .16s ease-out",
    width: full ? "100%" : "auto",
    whiteSpace: "nowrap"
  };
  const sizes = {
    sm: {
      padding: "8px 14px",
      fontSize: 14
    },
    md: {
      padding: "12px 20px",
      fontSize: 15
    },
    lg: {
      padding: "15px 28px",
      fontSize: 17
    }
  };
  const variants = {
    primary: {
      background: "var(--brand-gold)",
      color: "var(--navy-900)",
      boxShadow: "var(--shadow-gold)"
    },
    secondary: {
      background: "var(--brand-navy)",
      color: "#fff"
    },
    outline: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1.5px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-brand)"
    },
    danger: {
      background: "var(--brand-red)",
      color: "#fff"
    },
    "on-navy": {
      background: "#fff",
      color: "var(--navy-900)"
    }
  };
  const ic = size === "lg" ? 20 : 18;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant]
    },
    onMouseDown: e => e.currentTarget.style.transform = "scale(0.98)",
    onMouseUp: e => e.currentTarget.style.transform = "scale(1)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: ic
  }), children, iconAfter && /*#__PURE__*/React.createElement(Icon, {
    name: iconAfter,
    size: ic
  }));
}
function Badge({
  children,
  tone = "gold",
  icon
}) {
  const tones = {
    gold: {
      background: "var(--gold-100)",
      color: "var(--gold-700)"
    },
    navy: {
      background: "var(--navy-100)",
      color: "var(--navy-700)"
    },
    green: {
      background: "var(--success-bg)",
      color: "var(--text-success)"
    },
    red: {
      background: "var(--error-bg)",
      color: "var(--text-error)"
    },
    solid: {
      background: "var(--brand-gold)",
      color: "var(--navy-900)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      fontWeight: 700,
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.4,
      ...tones[tone]
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13
  }), children);
}
function Eyebrow({
  children,
  onDark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: onDark ? "var(--brand-gold)" : "var(--text-brand)"
    }
  }, children);
}
Object.assign(window, {
  useLucide,
  Icon,
  Logo,
  Button,
  Badge,
  Eyebrow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }

})();
