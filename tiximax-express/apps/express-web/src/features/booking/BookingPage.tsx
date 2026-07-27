import { PagePlaceholder } from '../../components/PagePlaceholder';

// Booking wizard — 3 steps: route & addresses → package items → review & confirm.
// See docs FR-1 (wizard), FR-2 (quote), FR-3 (confirm).
export function BookingPage() {
  return (
    <PagePlaceholder title="New booking" requirements="FR-1, FR-2, FR-3">
      <ol>
        <li>Route &amp; addresses (origin/destination, sender/recipient)</li>
        <li>Package items (photos, weight, fragile/battery flags)</li>
        <li>Review &amp; confirm (price breakdown, tracking code)</li>
      </ol>
    </PagePlaceholder>
  );
}
