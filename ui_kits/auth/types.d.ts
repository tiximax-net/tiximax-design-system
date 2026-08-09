/* Ambient types for the SSO auth kit.
   Not loaded at runtime — the kit runs the .ts/.tsx files via Babel-standalone
   (react + typescript presets strip these annotations in the browser).
   This file only gives editors/tsc real type-checking with no @types deps. */

type Lang = "vi" | "en" | "ja";
type AuthView = "login" | "register" | "forgot" | "otp";
type Method = "email" | "phone";
type BrandSide = "left" | "right";

interface Stage {
  l: string;
  s: string;
}

/** Copy contract for one language — every string the portal renders. */
interface Dict {
  badge: string;
  h1: string;
  sub: string;
  svc1t: string; svc1d: string;
  svc2t: string; svc2d: string;
  svc3t: string; svc3d: string;
  stat1n: string; stat1l: string;
  stat2n: string; stat2l: string;
  stat3n: string; stat3l: string;
  jhead: string;
  stages: Stage[];
  ovln: string;
  loginTitle: string; loginSub: string;
  registerTitle: string; registerSub: string;
  forgotTitle: string; forgotSub: string;
  otpTitle: string; otpSub: string;
  mEmail: string; mPhone: string;
  lblEmail: string; phEmail: string;
  lblPw: string; phPw: string;
  lblPhone: string; phPhone: string;
  lblName: string; phName: string;
  remember: string; forgot: string;
  btnLogin: string; btnSendOtp: string; btnRegister: string;
  btnReset: string; btnVerify: string;
  magic: string; orWith: string;
  noAcc: string; signup: string;
  hasAcc: string; signin: string; rememberQ: string;
  agree: string;
  back: string; phoneNote: string;
  resendIn: string; resendNow: string;
  google: string; facebook: string;
  fTerms: string; fPrivacy: string; fHelp: string;
  copyr: string;
  step: string;
}

/* --- UMD globals loaded from CDN (no @types packages in this repo) --- */
declare const React: {
  useState<S>(init: S | (() => S)): [S, (v: S | ((prev: S) => S)) => void];
  useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  useRef<T>(init: T): { current: T };
  createElement: (...args: unknown[]) => unknown;
  Fragment: unknown;
};
declare const ReactDOM: { createRoot(el: Element | null): { render(node: unknown): void } };
declare const lucide: { createIcons(): void } | undefined;

/* Minimal JSX so tsc treats every tag/component as loosely-typed (no @types/react). */
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: Record<string, unknown>;
  }
  type Element = unknown;
  interface ElementChildrenAttribute { children: unknown; }
}
