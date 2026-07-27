/* ui-shots — widget chèn vào trang: window.__EXPORT + nút "Export screen"
 * ---------------------------------------------------------------------------
 * window.__EXPORT dùng chung cho engine Chrome nền (chụp) và nút trên trình duyệt.
 * Tự nhận diện màn; project có thể tuỳ biến bằng:
 *   window.EXPORT_CONFIG = {
 *     screenSelector:'.screen', frameSelector:'.device', screenFrameSelector:'.device__screen',
 *     goTo:(i)=>myApp.go(i),            // cách chuyển màn (nếu không có sẽ tự đoán)
 *     screens:[{label,slug}, …],        // danh sách màn (nếu muốn đặt tay)
 *   }
 */
(function () {
  var cfg = window.EXPORT_CONFIG || {};
  var SCREEN = cfg.screenSelector || '.screen';
  var FRAME = cfg.frameSelector || '.device';
  var INNER = cfg.screenFrameSelector || '.device__screen';

  function els() { return [].slice.call(document.querySelectorAll(SCREEN)); }
  function frameEls() { return [].slice.call(document.querySelectorAll(FRAME)); }

  /* Hai kiểu layout tự nhận diện:
     1) STACKED (mặc định): nhiều .screen chồng nhau, đổi màn qua __go/is-current (TXM Express).
     2) MULTI-FRAME: nhiều .device/.frame bày cạnh nhau, hiện cùng lúc, KHÔNG có .screen
        (vd vocab-mobile-prototype). Mỗi khung là 1 màn; cô lập khi chụp bằng chính rect clip.
     MULTI chỉ bật khi project không tự khai báo config / không phải state-machine. */
  var MULTI = !cfg.screens && typeof cfg.goTo !== 'function' && typeof window.__go !== 'function'
    && frameEls().length > 1 && els().length <= 1;

  /* đơn vị "màn" để liệt kê + chụp */
  function units() { return MULTI ? frameEls() : els(); }
  /* khung .frame bọc ngoài (chứa caption) — dùng để lấy nhãn ở layout multi-frame */
  function wrapOf(el) { return (el.closest && el.closest('.frame')) || el; }

  var curIndex = 0;

  function list() {
    if (cfg.screens) return cfg.screens;
    return units().map(function (el, i) {
      var wrap = MULTI ? wrapOf(el) : el;
      var t = wrap.getAttribute('data-export-label') || el.getAttribute('data-export-label');
      if (!t) { var h = wrap.querySelector('.frame__cap,.scr-title,h1,h2,h3'); t = h && h.textContent.trim(); }
      return { label: t || ('Màn ' + (i + 1)), slug: el.id || wrap.id || ('screen-' + (i + 1)) };
    });
  }

  function goto(i) {
    curIndex = i;
    if (typeof cfg.goTo === 'function') return cfg.goTo(i);
    if (typeof window.__go === 'function') return window.__go(i);
    if (MULTI) return;   // mọi khung đều hiện sẵn → rect clip lo việc cô lập
    // fallback stacked: hiện đúng 1 màn
    els().forEach(function (el, j) {
      var on = j === i;
      el.classList.toggle('is-current', on);
      el.classList.toggle('is-active', on);
      if (!el.classList.contains('screen')) el.style.display = on ? '' : 'none';
    });
  }

  function rect(mode) {
    var el;
    if (MULTI) {
      var f = frameEls()[curIndex] || frameEls()[0] || document.body;
      el = mode === 'device' ? f : (f.querySelector(INNER) || f);
    } else {
      var cur = document.querySelector(SCREEN + '.is-current') || els()[0] || document.body;
      el = mode === 'device' ? (document.querySelector(FRAME) || cur)
                             : (document.querySelector(INNER) || cur);
    }
    var b = el.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  }

  window.__EXPORT = { list: list, goto: goto, rect: rect };

  /* ───────── chỉ dựng UI khi là trình duyệt thật (không phải lúc engine chụp) ───────── */
  if (navigator.webdriver) return;   // instance Chrome nền → không cần nút
  if (window.top !== window.self) return;

  var page = location.pathname;
  var hasFrame = !!document.querySelector(FRAME);
  var state = { mode: hasFrame ? 'device' : 'screen', sel: new Set() };

  var css = document.createElement('style');
  css.textContent =
    '.uishots-root{position:fixed;inset:auto 20px 20px auto;z-index:2147483000;font:14px/1.4 -apple-system,system-ui,sans-serif}' +
    '.uishots-fab{display:flex;align-items:center;gap:8px;background:#e0a924;color:#3a2c00;font-weight:700;border:0;border-radius:12px;padding:12px 16px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.22)}' +
    '.uishots-fab svg{display:block}' +
    '.uishots-modal{position:fixed;inset:0;z-index:2147483001;background:rgba(10,12,18,.55);display:none;align-items:center;justify-content:center;backdrop-filter:blur(2px)}' +
    '.uishots-modal.on{display:flex}' +
    '.uishots-panel{background:#fff;color:#1a1d24;width:min(900px,92vw);max-height:88vh;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 70px rgba(0,0,0,.4)}' +
    '.uishots-head{display:flex;align-items:center;gap:14px;padding:16px 20px;border-bottom:1px solid #eceef1;flex-wrap:wrap}' +
    '.uishots-head h2{font-size:16px;margin:0;font-weight:700}.uishots-head h2 b{color:#e0a924}' +
    '.uishots-seg{display:inline-flex;border:1px solid #e2e5e9;border-radius:9px;overflow:hidden}' +
    '.uishots-seg button{border:0;background:transparent;color:#1a1d24;padding:6px 12px;cursor:pointer;font:inherit}' +
    '.uishots-seg button[aria-pressed=true]{background:#1e2f5a;color:#fff}' +
    '.uishots-x{margin-left:auto;border:0;background:transparent;font-size:22px;line-height:1;cursor:pointer;color:#6b7280}' +
    '.uishots-body{padding:16px 20px;overflow:auto}' +
    '.uishots-bar{display:flex;gap:14px;align-items:center;margin-bottom:12px;color:#6b7280;font-size:13px}' +
    '.uishots-bar button{border:0;background:transparent;color:#1e2f5a;text-decoration:underline;cursor:pointer;font:inherit}' +
    '.uishots-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}' +
    '.uishots-card{border:2px solid #e6e8ec;border-radius:14px;padding:8px;cursor:pointer;transition:border-color .15s}' +
    '.uishots-card[aria-checked=true]{border-color:#e0a924}' +
    '.uishots-thumb{aspect-ratio:9/19;background:#f4f5f7;border-radius:9px;overflow:hidden;display:flex;align-items:center;justify-content:center}' +
    '.uishots-thumb img{width:100%;height:100%;object-fit:contain}' +
    '.uishots-thumb .sp{width:20px;height:20px;border:3px solid #e2e5e9;border-top-color:#e0a924;border-radius:50%;animation:uishots-sp 1s linear infinite}' +
    '@keyframes uishots-sp{to{transform:rotate(360deg)}}' +
    '.uishots-cap{display:flex;align-items:center;gap:7px;margin-top:8px}' +
    '.uishots-tick{width:18px;height:18px;border:2px solid #d6d9df;border-radius:5px;flex:none;display:flex;align-items:center;justify-content:center}' +
    '.uishots-card[aria-checked=true] .uishots-tick{background:#e0a924;border-color:#e0a924}' +
    '.uishots-tick svg{opacity:0}.uishots-card[aria-checked=true] .uishots-tick svg{opacity:1}' +
    '.uishots-name{font-size:12.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.uishots-foot{padding:14px 20px;border-top:1px solid #eceef1;display:flex;align-items:center;gap:12px}' +
    '.uishots-foot .go{margin-left:auto;background:#e0a924;color:#3a2c00;font-weight:700;border:0;border-radius:11px;padding:11px 20px;cursor:pointer}' +
    '.uishots-foot .go:disabled{opacity:.45;cursor:not-allowed}' +
    '@media(prefers-color-scheme:dark){.uishots-panel{background:#191c22;color:#e8eaed}.uishots-head,.uishots-foot{border-color:#2a2f3a}' +
    '.uishots-seg{border-color:#2f3542}.uishots-seg button{color:#e8eaed}.uishots-card{border-color:#2a2f3a}.uishots-thumb{background:#0f1116}' +
    '.uishots-bar button,a{color:#8fb0ff}}';
  document.head.appendChild(css);

  var root = document.createElement('div');
  root.className = 'uishots-root';
  root.innerHTML =
    '<button class="uishots-fab" title="Xuất ảnh màn hình">' +
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a2c00" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>' +
    'Export screen</button>';
  document.body.appendChild(root);

  var modal = document.createElement('div');
  modal.className = 'uishots-modal';
  modal.innerHTML =
    '<div class="uishots-panel">' +
      '<div class="uishots-head"><h2>Export <b>screen</b></h2>' +
        (hasFrame ? '<div class="uishots-seg" data-seg="mode"><button data-v="device" aria-pressed="true">Có khung</button><button data-v="screen" aria-pressed="false">Không khung</button></div>' : '') +
        '<button class="uishots-x" title="Đóng">×</button></div>' +
      '<div class="uishots-body"><div class="uishots-bar">' +
        '<button data-all>Chọn tất cả</button><button data-none>Bỏ chọn</button>' +
        '<span data-count>Chưa chọn màn nào</span></div>' +
        '<div class="uishots-grid" data-grid></div></div>' +
      '<div class="uishots-foot"><span data-hint style="color:#6b7280;font-size:12.5px">≥2 màn sẽ tải về file .zip</span>' +
        '<button class="go" disabled data-go>Export</button></div>' +
    '</div>';
  document.body.appendChild(modal);

  var grid = modal.querySelector('[data-grid]');
  var countEl = modal.querySelector('[data-count]');
  var goBtn = modal.querySelector('[data-go]');
  var screens = [];

  function thumbUrl(i) { return '/__uishots/thumb?page=' + encodeURIComponent(page) + '&mode=' + state.mode + '&index=' + i + '&t=' + Date.now(); }

  function renderGrid() {
    grid.innerHTML = '';
    screens.forEach(function (s, i) {
      var card = document.createElement('div');
      card.className = 'uishots-card';
      card.setAttribute('aria-checked', state.sel.has(i));
      card.innerHTML =
        '<div class="uishots-thumb"><div class="sp"></div></div>' +
        '<div class="uishots-cap"><span class="uishots-tick"><svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.5 4.8 9 10 3" fill="none" stroke="#3a2c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
        '<span class="uishots-name" title="' + s.label + '">' + s.label + '</span></div>';
      card.addEventListener('click', function () {
        if (state.sel.has(i)) state.sel.delete(i); else state.sel.add(i);
        card.setAttribute('aria-checked', state.sel.has(i));
        syncCount();
      });
      grid.appendChild(card);
      var img = new Image();
      var box = card.querySelector('.uishots-thumb');
      img.onload = function () { box.innerHTML = ''; box.appendChild(img); };
      img.onerror = function () { box.innerHTML = '<span style="color:#9aa0aa;font-size:11px">lỗi</span>'; };
      img.src = thumbUrl(i);
    });
  }

  function syncCount() {
    var n = state.sel.size;
    countEl.textContent = n === 0 ? 'Chưa chọn màn nào' : (n + ' màn' + (n >= 2 ? ' → xuất ZIP' : ' → PNG'));
    goBtn.disabled = n === 0;
    goBtn.textContent = n >= 2 ? ('Export ' + n + ' màn (.zip)') : 'Export';
  }

  function open() {
    modal.classList.add('on');
    if (!screens.length) {
      fetch('/__uishots/screens?page=' + encodeURIComponent(page)).then(function (r) { return r.json(); })
        .then(function (data) { screens = data; renderGrid(); syncCount(); });
    } else { renderGrid(); }
  }
  function close() { modal.classList.remove('on'); }

  root.querySelector('.uishots-fab').addEventListener('click', open);
  modal.querySelector('.uishots-x').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });

  var seg = modal.querySelector('[data-seg=mode]');
  if (seg) seg.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    [].forEach.call(seg.children, function (x) { x.setAttribute('aria-pressed', x === b); });
    state.mode = b.dataset.v; renderGrid();
  });
  modal.querySelector('[data-all]').addEventListener('click', function () { screens.forEach(function (_, i) { state.sel.add(i); }); renderGrid(); syncCount(); });
  modal.querySelector('[data-none]').addEventListener('click', function () { state.sel.clear(); renderGrid(); syncCount(); });

  goBtn.addEventListener('click', function () {
    var label = goBtn.textContent; goBtn.disabled = true; goBtn.textContent = 'Đang xuất…';
    var indices = Array.from(state.sel).sort(function (a, b) { return a - b; });
    var names = indices.map(function (i) { return screens[i] && (screens[i].slug || screens[i].label); });
    fetch('/__uishots/export', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: page, indices: indices, mode: state.mode, names: names }) })
      .then(function (r) { return r.blob().then(function (b) {
        var cd = r.headers.get('Content-Disposition') || ''; var m = /filename="([^"]+)"/.exec(cd);
        var a = document.createElement('a'); a.href = URL.createObjectURL(b);
        a.download = m ? m[1] : 'export'; a.click(); URL.revokeObjectURL(a.href);
      }); })
      .catch(function (err) { alert('Lỗi xuất: ' + err); })
      .then(function () { goBtn.disabled = false; goBtn.textContent = label; syncCount(); });
  });
})();
