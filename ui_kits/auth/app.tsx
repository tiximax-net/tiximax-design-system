/* SSO portal — views + app shell. Global-script for the Babel-standalone
   runtime; reads AUTH_DICT and the components declared in the sibling files. */
const { useState, useEffect, useRef } = React;

type OtpEvt = { target: HTMLInputElement; key?: string };

/* ---------- small shared pieces ---------- */
function PwField({ t, showPw, onToggle }: { t: Dict; showPw: boolean; onToggle: () => void }) {
  return (
    <div className="field">
      <label className="flabel">{t.lblPw}</label>
      <div className="iwrap">
        <span className="lead"><AI name="lock" /></span>
        <input type={showPw ? "text" : "password"} placeholder={t.phPw} />
        <button className="eye" type="button" aria-label="Show password" onClick={onToggle}>
          <AI name={showPw ? "eye-off" : "eye"} />
        </button>
      </div>
    </div>
  );
}

function SocialBlock({ t }: { t: Dict }) {
  return (
    <div className="form">
      <div className="divider">{t.orWith}</div>
      <div className="socialrow">
        <button className="btn btn-social" type="button"><GoogleIcon />{t.google}</button>
        <button className="btn btn-social" type="button"><FacebookIcon />{t.facebook}</button>
      </div>
    </div>
  );
}

/* ---------- views ---------- */
interface LoginProps {
  t: Dict; method: Method; setMethod: (m: Method) => void;
  showPw: boolean; togglePw: () => void;
  remember: boolean; toggleRemember: () => void;
  showSocial: boolean; go: (v: AuthView) => void;
}
function LoginView({ t, method, setMethod, showPw, togglePw, remember, toggleRemember, showSocial, go }: LoginProps) {
  return (
    <div className="vblock">
      <div className="vhead">
        <h2 className="vtitle">{t.loginTitle}</h2>
        <p className="vsub">{t.loginSub}</p>
      </div>
      <div className="form">
        <div className="seg">
          <button className={"segbtn" + (method === "email" ? " on" : "")} onClick={() => setMethod("email")}>
            <AI name="mail" />{t.mEmail}
          </button>
          <button className={"segbtn" + (method === "phone" ? " on" : "")} onClick={() => setMethod("phone")}>
            <AI name="phone" />{t.mPhone}
          </button>
        </div>

        {method === "email" ? (
          <div className="form">
            <div className="field">
              <label className="flabel">{t.lblEmail}</label>
              <div className="iwrap">
                <span className="lead"><AI name="mail" /></span>
                <input type="email" placeholder={t.phEmail} />
              </div>
            </div>
            <PwField t={t} showPw={showPw} onToggle={togglePw} />
            <div className="rowb">
              <label className="check">
                <input type="checkbox" checked={remember} onChange={toggleRemember} />{t.remember}
              </label>
              <button className="linka" onClick={() => go("forgot")}>{t.forgot}</button>
            </div>
            <button className="btn btn-primary" type="button">{t.btnLogin}<AI name="arrow-right" /></button>
            <button className="magic" type="button"><AI name="send" />{t.magic}</button>
          </div>
        ) : (
          <div className="form">
            <div className="field">
              <label className="flabel">{t.lblPhone}</label>
              <div className="iwrap">
                <span className="lead"><AI name="phone" /></span>
                <input type="tel" placeholder={t.phPhone} />
              </div>
            </div>
            <p className="note">{t.phoneNote}</p>
            <button className="btn btn-primary" type="button" onClick={() => go("otp")}>
              {t.btnSendOtp}<AI name="arrow-right" />
            </button>
          </div>
        )}

        {showSocial ? <SocialBlock t={t} /> : null}
        <p className="switchline">{t.noAcc} <button className="linka" onClick={() => go("register")}>{t.signup}</button></p>
      </div>
    </div>
  );
}

interface RegisterProps {
  t: Dict; showPw: boolean; togglePw: () => void;
  agree: boolean; toggleAgree: () => void; showSocial: boolean; go: (v: AuthView) => void;
}
function RegisterView({ t, showPw, togglePw, agree, toggleAgree, showSocial, go }: RegisterProps) {
  return (
    <div className="vblock">
      <div className="vhead">
        <h2 className="vtitle">{t.registerTitle}</h2>
        <p className="vsub">{t.registerSub}</p>
      </div>
      <div className="form">
        <div className="field">
          <label className="flabel">{t.lblName}</label>
          <div className="iwrap"><span className="lead"><AI name="user" /></span><input type="text" placeholder={t.phName} /></div>
        </div>
        <div className="field">
          <label className="flabel">{t.lblEmail}</label>
          <div className="iwrap"><span className="lead"><AI name="mail" /></span><input type="email" placeholder={t.phEmail} /></div>
        </div>
        <div className="field">
          <label className="flabel">{t.lblPhone}</label>
          <div className="iwrap"><span className="lead"><AI name="phone" /></span><input type="tel" placeholder={t.phPhone} /></div>
        </div>
        <PwField t={t} showPw={showPw} onToggle={togglePw} />
        <label className="check">
          <input type="checkbox" checked={agree} onChange={toggleAgree} />{t.agree}
        </label>
        <button className="btn btn-primary" type="button">{t.btnRegister}<AI name="arrow-right" /></button>
        {showSocial ? <SocialBlock t={t} /> : null}
        <p className="switchline">{t.hasAcc} <button className="linka" onClick={() => go("login")}>{t.signin}</button></p>
      </div>
    </div>
  );
}

function ForgotView({ t, go }: { t: Dict; go: (v: AuthView) => void }) {
  return (
    <div className="vblock">
      <button className="backbtn" onClick={() => go("login")}><AI name="chevron-left" />{t.back}</button>
      <div className="vhead">
        <h2 className="vtitle">{t.forgotTitle}</h2>
        <p className="vsub">{t.forgotSub}</p>
      </div>
      <div className="form">
        <div className="field">
          <label className="flabel">{t.lblEmail}</label>
          <div className="iwrap"><span className="lead"><AI name="mail" /></span><input type="email" placeholder={t.phEmail} /></div>
        </div>
        <button className="btn btn-primary" type="button" onClick={() => go("otp")}>{t.btnReset}<AI name="arrow-right" /></button>
        <p className="switchline">{t.rememberQ} <button className="linka" onClick={() => go("login")}>{t.signin}</button></p>
      </div>
    </div>
  );
}

function OtpView({ t, resend, restart, go }: { t: Dict; resend: number; restart: () => void; go: (v: AuthView) => void }) {
  const onInput = (e: OtpEvt) => {
    const el = e.target;
    el.value = el.value.replace(/[^0-9]/g, "").slice(0, 1);
    const nx = el.nextElementSibling as HTMLInputElement | null;
    if (el.value && nx && nx.classList.contains("otpbox")) nx.focus();
  };
  const onKey = (e: OtpEvt) => {
    const el = e.target, pv = el.previousElementSibling as HTMLInputElement | null;
    if (e.key === "Backspace" && !el.value && pv && pv.classList.contains("otpbox")) pv.focus();
  };
  const sec = resend % 60, mn = Math.floor(resend / 60);
  const label = mn + ":" + String(sec).padStart(2, "0");
  return (
    <div className="vblock">
      <button className="backbtn" onClick={() => go("login")}><AI name="chevron-left" />{t.back}</button>
      <div className="vhead">
        <h2 className="vtitle">{t.otpTitle}</h2>
        <p className="vsub">{t.otpSub} <span className="otpmail">+84 901 234 567</span></p>
      </div>
      <div className="form">
        <div className="otprow">
          {Array.from({ length: 6 }).map((_, i) => (
            <input className="otpbox" key={i} inputMode="numeric" maxLength={1} onInput={onInput} onKeyDown={onKey} />
          ))}
        </div>
        <button className="btn btn-primary" type="button">{t.btnVerify}<AI name="arrow-right" /></button>
        <div className="resend">
          {resend <= 0
            ? <button className="linka" onClick={restart}>{t.resendNow}</button>
            : <span>{t.resendIn} {label}</span>}
        </div>
      </div>
    </div>
  );
}

/* ---------- app shell ---------- */
interface AppProps { defaultView?: AuthView; brandSide?: BrandSide; showSocial?: boolean; }

function App({ defaultView = "login", brandSide = "left", showSocial = true }: AppProps) {
  const [view, setView] = useState<AuthView>(defaultView);
  const [method, setMethod] = useState<Method>("email");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<Lang>("vi");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [agree, setAgree] = useState(false);
  const [resend, setResend] = useState(59);
  const [journey, setJourney] = useState<{ stage: number; jnoanim: boolean }>({ stage: 0, jnoanim: false });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // journey animation loop
  useEffect(() => {
    const id = setInterval(() => {
      setJourney((j) => {
        if (j.jnoanim) return { stage: j.stage, jnoanim: false };
        if (j.stage >= 3) return { stage: 0, jnoanim: true };
        return { stage: j.stage + 1, jnoanim: false };
      });
    }, 1600);
    return () => clearInterval(id);
  }, []);

  // otp resend countdown — runs only while on the otp view
  useEffect(() => {
    if (view !== "otp") return;
    setResend(59);
    timer.current = setInterval(() => setResend((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(timer.current ?? undefined);
  }, [view]);

  // (re)paint lucide icons after every render
  useEffect(() => { if (typeof lucide !== "undefined" && lucide) lucide.createIcons(); });

  const go = (v: AuthView) => setView(v);
  const t = AUTH_DICT[lang] || AUTH_DICT.vi;
  const langs: Array<[Lang, string]> = [["vi", "VI"], ["en", "EN"], ["ja", "JP"]];

  return (
    <div className={"sso" + (theme === "dark" ? " dark" : "") + (brandSide === "right" ? " rev" : "")}>
      <BrandAside t={t} lang={lang} stage={journey.stage} jnoanim={journey.jnoanim} />

      <main className="panel">
        <div className="topbar">
          <div className="langs">
            {langs.map(([code, lbl]) => (
              <button key={code} className={"langbtn" + (lang === code ? " on" : "")} onClick={() => setLang(code)}>{lbl}</button>
            ))}
          </div>
          <button className="ibtn" aria-label="Theme" onClick={() => setTheme((x) => (x === "dark" ? "light" : "dark"))}>
            <AI name={theme === "dark" ? "sun" : "moon"} />
          </button>
        </div>

        <div className="cardwrap">
          <div className="card">
            <div className="chead">
              <img className="spark" src="../../assets/tiximax-mark.svg" alt="" />
              <div>
                <div className="wordmark">TIXIMAX</div>
                <div className="ovln">{t.ovln}</div>
              </div>
            </div>

            {view === "login" && (
              <LoginView t={t} method={method} setMethod={setMethod} showPw={showPw}
                togglePw={() => setShowPw((x) => !x)} remember={remember}
                toggleRemember={() => setRemember((x) => !x)} showSocial={showSocial} go={go} />
            )}
            {view === "register" && (
              <RegisterView t={t} showPw={showPw} togglePw={() => setShowPw((x) => !x)}
                agree={agree} toggleAgree={() => setAgree((x) => !x)} showSocial={showSocial} go={go} />
            )}
            {view === "forgot" && <ForgotView t={t} go={go} />}
            {view === "otp" && <OtpView t={t} resend={resend} restart={() => setResend(59)} go={go} />}
          </div>
        </div>

        <div className="foot">
          <span>{t.copyr}</span>
          <div className="footlinks">
            <a>{t.fTerms}</a><a>{t.fPrivacy}</a><a>{t.fHelp}</a>
          </div>
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
