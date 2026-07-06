/* ═══════════════════════════════════════════════════════════════════════
   showcase.js — Hành vi trang preview design-system DÙNG CHUNG
   Nguồn chuẩn: design-thinking/design-system/  · brand symlink về file này.
   Gồm: scroll-spy sidebar · scaleAll() tự dò khổ canvas · theme-toggle (ds-theme).
   Brand nào không có .slide/.page/.meishi thì vòng lặp rỗng → vô hại.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Scroll-spy: highlight sb-link theo section đang xem ── */
(function () {
  const sections = document.querySelectorAll('.sec');
  const links = document.querySelectorAll('.sb-link');
  if (!sections.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.remove('active'));
        const a = document.querySelector(`.sb-link[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach((s) => io.observe(s));
})();

/* ── Tabs: bấm .tab → hiện .tab-panel tương ứng (theo data-tab / data-panel) ── */
document.querySelectorAll('.ds-tabbar').forEach((bar) => {
  const scope = bar.parentElement;
  bar.addEventListener('click', (e) => {
    const t = e.target.closest('.ds-tab');
    if (!t) return;
    bar.querySelectorAll('.ds-tab').forEach((x) => x.classList.toggle('active', x === t));
    scope.querySelectorAll('.ds-tabpanel').forEach((p) => { p.hidden = p.dataset.panel !== t.dataset.tab; });
  });
});

/* ── Copy hex: bấm .swatch-copy → chép mã hex vào clipboard, đổi ✓ Copied ~1.2s ── */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.swatch-copy');
  if (!btn) return;
  const hex = btn.dataset.hex;
  const done = () => {
    const hexEl = btn.querySelector('.swatch-hex');
    if (!hexEl) return;
    if (btn._orig == null) btn._orig = hexEl.textContent;   // nhớ hex gốc (chống double-click)
    hexEl.textContent = '✓ Copied';
    btn.classList.add('copied');
    clearTimeout(btn._t);
    btn._t = setTimeout(() => { hexEl.textContent = btn._orig; btn.classList.remove('copied'); btn._orig = null; }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(hex).then(done).catch(() => {});
  } else {
    try { const ta = document.createElement('textarea'); ta.value = hex; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); done(); } catch {}
  }
});

/* ── scaleAll: fit slide/page/meishi vào khung preview ──
   Tự dò khổ tự nhiên bằng child.offsetWidth (transform KHÔNG đổi offsetWidth)
   → không hardcode 1280/1920/794/910; brand đặt khổ trong CSS là đủ. */
function scaleAll() {
  const fit = (containerSel, childSel) => {
    document.querySelectorAll(containerSel).forEach((el) => {
      const child = el.querySelector(childSel);
      if (child && child.offsetWidth) {
        child.style.transform = `scale(${el.offsetWidth / child.offsetWidth})`;
      }
    });
  };
  fit('.slide-scaler-idx', '.slide');
  fit('.page-scaler-idx', '.page');
  fit('.meishi-scaler-idx', '.meishi');
  fit('.land-scaler-idx', '.land');
}
window.addEventListener('load', scaleAll);
window.addEventListener('resize', scaleAll);

/* ── Theme toggle — snippet chuẩn toàn workspace (key: ds-theme) ── */
const THEME_KEY = 'ds-theme';
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const i = document.getElementById('theme-icon'), l = document.getElementById('theme-label');
  if (i) i.textContent = t === 'dark' ? '☀️' : '🌙';
  if (l) l.textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
}
function toggleTheme() {
  const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(THEME_KEY, t); } catch {}
  applyTheme(t);
}
applyTheme((() => {
  // Brand light-only (data-theme-lock) → khoá theme, bỏ qua localStorage 'ds-theme' dùng chung origin.
  const lock = document.documentElement.getAttribute('data-theme-lock');
  if (lock) return lock;
  try { return localStorage.getItem(THEME_KEY) || 'light'; } catch { return 'light'; }
})());

/* ── Language toggle — đổi nội dung mẫu EN/JP/VI (key: ds-lang) ──
   Nội dung 3 ngữ nằm sẵn trong DOM: <span data-i18n data-en data-ja data-vi>.
   Nút ngôn ngữ (.ds-langbtn[data-lang]) do ds-index render trong sidebar theo
   manifest.languages; brand 1 ngôn ngữ thì không có nút. Font tự đổi qua
   --font-content (CSS [data-lang]). */
const LANG_KEY = 'ds-lang';
function langList() {
  const btns = [...document.querySelectorAll('.ds-langbtn')].map((b) => b.dataset.lang);
  if (btns.length) return btns;
  const attr = document.documentElement.getAttribute('data-langs');   // brand 1 ngôn ngữ (không có nút): clamp theo data-langs
  return attr ? attr.split(',') : [];
}
function applyLang(lang) {
  const avail = langList();
  if (avail.length && !avail.includes(lang)) lang = avail[0];
  const def = document.documentElement.getAttribute('data-lang-default') || avail[0] || 'en';
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    // snapshot bản gốc (thường = EN) 1 lần — tránh mất khi textContent bị ghi đè lúc đổi ngôn ngữ
    if (el.dataset.i18nBase == null) el.dataset.i18nBase = el.dataset.en ?? el.textContent;
    const t = el.dataset[lang] ?? el.dataset[def] ?? el.dataset.i18nBase;
    if (t != null) el.textContent = t;
  });
  document.querySelectorAll('.ds-langbtn').forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));
}
function setLang(lang) {
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
  applyLang(lang);
}
document.querySelectorAll('.ds-langbtn').forEach((b) => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});
applyLang((() => {
  const def = document.documentElement.getAttribute('data-lang-default') || langList()[0] || 'en';
  try { return localStorage.getItem(LANG_KEY) || def; } catch { return def; }
})());
