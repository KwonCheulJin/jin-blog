'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

export function useThemeManager() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  return {
    theme,
    isDark,
    mounted,
    handleToggleTheme,
  };
}
