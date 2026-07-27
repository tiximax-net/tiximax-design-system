import { create } from 'zustand';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'txm-express-theme';

function initialTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'light';
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'dark' ? 'dark' : 'light';
}

// Theme toggle persisted to localStorage (docs FR-7.3). UI infra, not domain logic.
interface ThemeState {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme(),
  toggle: () =>
    set((state) => {
      const next: Theme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next);
      return { theme: next };
    }),
  setTheme: (theme) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },
}));
