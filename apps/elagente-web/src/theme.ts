import { useLayoutEffect, useState } from 'react';
import type { ThemeMode } from '@remote-codex/thread-ui';

const storageKey = 'elagente.theme';
const colorSchemeQuery = '(prefers-color-scheme: dark)';

function readThemeMode(): ThemeMode {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  } catch { /* Keep appearance usable when browser storage is unavailable. */ }
  return 'system';
}

function systemTheme(): 'light' | 'dark' {
  return window.matchMedia(colorSchemeQuery).matches ? 'dark' : 'light';
}

function applyTheme(mode: ThemeMode, effective: 'light' | 'dark') {
  const root = document.documentElement;
  root.dataset.themeMode = mode;
  root.dataset.themeEffective = effective;
  root.classList.toggle('dark', effective === 'dark');
  root.style.colorScheme = effective;
}

// Apply the saved preference before React mounts, including portalled dialogs.
const initialMode = readThemeMode();
applyTheme(initialMode, initialMode === 'system' ? systemTheme() : initialMode);

export function useTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(readThemeMode);
  const [preferred, setPreferred] = useState(systemTheme);
  const effectiveTheme = themeMode === 'system' ? preferred : themeMode;

  useLayoutEffect(() => {
    const query = window.matchMedia(colorSchemeQuery);
    const updateSystem = () => setPreferred(query.matches ? 'dark' : 'light');
    const updateSaved = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) setThemeMode(readThemeMode());
    };
    updateSystem();
    query.addEventListener('change', updateSystem);
    window.addEventListener('storage', updateSaved);
    return () => {
      query.removeEventListener('change', updateSystem);
      window.removeEventListener('storage', updateSaved);
    };
  }, []);

  useLayoutEffect(() => {
    applyTheme(themeMode, effectiveTheme);
  }, [themeMode, effectiveTheme]);

  const changeThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    try { localStorage.setItem(storageKey, mode); }
    catch { /* An in-memory preference still works for this tab. */ }
  };
  return { themeMode, effectiveTheme, changeThemeMode };
}
