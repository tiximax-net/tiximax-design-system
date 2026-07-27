// Media / Upload: receive & compress package photos, chat attachments
// Maps to: FR-1.9, FR-6.4
// SKELETON — no business logic yet. Wire routes/handlers in a later phase (docs §3.9).

export const SERVICE = 'media' as const;

export function describe(): string {
  return 'Media / Upload: receive & compress package photos, chat attachments';
}
