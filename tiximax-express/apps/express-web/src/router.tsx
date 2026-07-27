import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { BookingPage } from './features/booking/BookingPage';
import { ShipmentsPage } from './features/shipments/ShipmentsPage';
import { TrackingPage } from './features/tracking/TrackingPage';
import { ChatPage } from './features/chat/ChatPage';

// Routes mirror the prototype's top-nav destinations (docs FR-7.2).
// No loaders/business logic yet — pages are structural placeholders.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/booking" replace /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'shipments', element: <ShipmentsPage /> },
      { path: 'shipments/:trackingId', element: <TrackingPage /> },
      { path: 'chat', element: <ChatPage /> },
    ],
  },
]);
