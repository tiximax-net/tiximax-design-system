/* Shared icon helpers + the brand marketing aside (left panel).
   Global-script (no imports) — components are shared via window for the
   Babel-standalone runtime; types resolve program-wide via tsconfig. */

// Lucide icon: rendered as <i class="ic" data-lucide>, replaced on createIcons().
// The `ic` class is preserved onto the generated <svg>, so auth.css sizes it per context.
function AI({ name, cls }: { name: string; cls?: string }) {
  return <i className={cls ? "ic " + cls : "ic"} data-lucide={name}></i>;
}

// Custom airplane (journey indicator) — same geometry as assets/airplane.svg,
// inlined with fill:currentColor so .plane { color } + bob animation apply.
function Plane() {
  return (
    <svg className="plane" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      <path d="M 153.50 462.63 C147.73,459.99 143.99,454.09 144.01,447.68 C144.02,445.66 155.95,418.17 176.87,372.00 L 209.71 299.50 L 191.11 298.88 C180.87,298.54 159.16,297.95 142.87,297.57 L 113.23 296.89 L 94.40 319.69 C73.44,345.07 71.23,347.41 66.08,349.71 C62.17,351.46 35.99,352.78 29.47,351.56 C22.62,350.27 16.00,342.14 16.00,335.01 C16.00,333.32 20.77,314.82 26.61,293.89 L 37.22 255.83 L 26.50 217.22 C18.48,188.30 15.92,177.66 16.30,174.83 C17.05,169.19 20.47,164.43 25.54,161.98 C29.63,160.00 31.27,159.85 45.28,160.16 C60.24,160.49 60.69,160.57 67.29,163.82 C73.77,167.01 74.76,168.04 93.26,190.68 L 112.50 214.23 L 140.91 213.62 C156.54,213.28 178.25,213.00 189.16,213.00 C203.66,213.00 209.00,212.68 209.00,211.83 C209.00,211.18 194.32,178.30 176.38,138.76 C145.63,71.00 143.78,66.60 144.27,62.32 C144.82,57.43 146.99,53.84 151.39,50.56 C153.96,48.64 155.51,48.50 173.82,48.50 C192.30,48.50 193.76,48.64 197.70,50.74 C202.89,53.52 201.04,51.35 272.50,138.35 L 331.50 210.19 L 341.50 209.62 C366.30,208.20 416.87,207.79 428.00,208.93 C461.62,212.35 484.29,223.48 492.59,240.65 C495.04,245.71 495.42,247.72 495.46,255.50 C495.50,263.54 495.17,265.20 492.40,271.05 C485.09,286.47 468.36,296.40 440.74,301.72 C432.79,303.25 426.13,303.48 393.00,303.37 C371.83,303.30 349.33,302.95 343.00,302.59 L 331.50 301.93 L 267.19 379.96 C215.51,442.66 201.95,458.53 198.19,460.75 C193.58,463.45 193.18,463.50 175.00,463.75 C161.00,463.94 155.77,463.67 153.50,462.63 Z"></path>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"></path>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"></path>
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"></path>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"></path>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.87 11.85v-8.38H7.08V12h3.05V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95H15.8c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12Z"></path>
    </svg>
  );
}

// icon name per journey stage (matches the design's 4 stage glyphs)
const STAGE_ICONS: string[] = ["shopping-bag", "plane-takeoff", "clipboard-check", "package-check"];
const SERVICE_ICONS: string[] = ["package", "globe", "smartphone"];

function BrandAside({ t, stage, jnoanim }: { t: Dict; lang: Lang; stage: number; jnoanim: boolean }) {
  const progress = (stage / 3) * 100 + "%";
  const planeLeft = 12.5 + (stage / 3) * 75 + "%";
  const wpCls = (i: number) => (stage > i ? "wp on" : stage === i ? "wp on cur" : "wp");
  const cur = t.stages[stage] || t.stages[0];
  const stepLabel = `${t.step} ${stage + 1}/4`;
  const services: Array<[string, string]> = [[t.svc1t, t.svc1d], [t.svc2t, t.svc2d], [t.svc3t, t.svc3d]];

  return (
    <aside className="brand">
      <img className="wm" src="../../assets/tiximax-mark.svg" alt="" />
      <div className="glow"></div>
      <img className="blogo" src="../../assets/tiximax-logo-white.svg" alt="TIXIMAX" />

      <div className="bmid">
        <span className="badge"><AI name="sparkles" />{t.badge}</span>
        <h1 className="bh1">{t.h1}</h1>
        {t.sub ? <p className="bsub">{t.sub}</p> : null}
        <div className="svcs">
          {services.map(([st, sd], i) => (
            <div className="svc" key={i}>
              <span className="ico"><AI name={SERVICE_ICONS[i]} /></span>
              <div>
                <div className="st">{st}</div>
                <div className="sd">{sd}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bbot">
        <div className={jnoanim ? "journey noanim" : "journey"}>
          <div className="jhead">{t.jhead}</div>
          <div className="jline">
            <div className="track"><div className="fill" style={{ width: progress }}></div></div>
            <div className="svcgrid">
              {t.stages.map((s, i) => (
                <div className={wpCls(i)} key={i}>
                  <i className="dot"></i>
                  <b className="wl">{s.l}</b>
                </div>
              ))}
            </div>
            <div className="planewrap" style={{ left: planeLeft }}><Plane /></div>
          </div>
          <div className="jcard">
            <span className="jicon"><AI name={STAGE_ICONS[stage] || STAGE_ICONS[0]} /></span>
            <div className="jtxt">
              <div className="jtop">
                <span className="jname">{cur.l}</span>
                <span className="jlive"><i></i>LIVE</span>
              </div>
              <div className="jdesc">{cur.s}</div>
            </div>
            <span className="jstep">{stepLabel}</span>
          </div>
        </div>

        <div className="stats">
          <div className="stat"><div className="n">{t.stat1n}</div><div className="l">{t.stat1l}</div></div>
          <div className="stat"><div className="n">{t.stat2n}</div><div className="l">{t.stat2l}</div></div>
          <div className="stat"><div className="n">{t.stat3n}</div><div className="l">{t.stat3l}</div></div>
        </div>
      </div>
    </aside>
  );
}

Object.assign(window, { AI, Plane, GoogleIcon, FacebookIcon, BrandAside, STAGE_ICONS, SERVICE_ICONS });
