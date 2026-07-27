import { useParams } from 'react-router-dom';
import { PagePlaceholder } from '../../components/PagePlaceholder';

// Tracking — route strip, milestone timeline, actual vs estimated weight (docs FR-5).
export function TrackingPage() {
  const { trackingId } = useParams();
  return (
    <PagePlaceholder title="Tracking" requirements="FR-5">
      <p>Tracking code: {trackingId ?? '—'}</p>
    </PagePlaceholder>
  );
}
