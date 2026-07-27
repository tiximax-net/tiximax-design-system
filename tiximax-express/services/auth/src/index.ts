// Auth & Profile: register/login (OTP/email), profile, saved addresses
// Maps to: FR-8.1, FR-8.2
// SKELETON — no business logic yet. Wire routes/handlers in a later phase (docs §3.9).

export const SERVICE = 'auth' as const;

export function describe(): string {
  return 'Auth & Profile: register/login (OTP/email), profile, saved addresses';
}
