import { NavLink, Outlet } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';

// App shell: top nav (docs FR-7.2) + theme toggle (FR-7.3).
// Pure UI infrastructure — domain logic lives in each feature later.
const NAV = [
  { to: '/booking', label: 'New booking' },
  { to: '/shipments', label: 'My shipments' },
  { to: '/chat', label: 'Chat' },
];

export function AppLayout() {
  const { theme, toggle } = useThemeStore();

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="app-nav">
        <NavLink to="/booking" className="app-nav__brand" aria-label="TIXIMAX Express home">
          TIXIMAX <span>Express</span>
        </NavLink>
        <nav className="app-nav__links">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                'app-nav__link' + (isActive ? ' is-active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="app-nav__theme" onClick={toggle}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
