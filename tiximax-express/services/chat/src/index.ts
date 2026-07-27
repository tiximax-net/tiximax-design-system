// Chat: realtime messages, quick-replies, attachments, order cards, unread badge
// Maps to: FR-6
// SKELETON — no business logic yet. Wire routes/handlers in a later phase (docs §3.9).

export const SERVICE = 'chat' as const;

export function describe(): string {
  return 'Chat: realtime messages, quick-replies, attachments, order cards, unread badge';
}
