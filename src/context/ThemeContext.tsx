import React, { createContext, useContext, useState, useEffect } from 'react';
import { mcAudio, MinecraftSoundType } from '../utils/minecraftSounds';

export type DimensionTheme = 'overworld' | 'nether' | 'end';

export interface ThemeClasses {
  id: DimensionTheme;
  label: string;
  dimensionSubtitle: string;
  pageBg: string;
  headerBg: string;
  cardBg: string;
  cardBorder: string;
  activeBorder: string;
  primaryBtn: string;
  secondaryBtn: string;
  accentText: string;
  accentSubtleBg: string;
  inputFocus: string;
  heroGlow: string;
}

export const THEME_CONFIGS: Record<DimensionTheme, ThemeClasses> = {
  overworld: {
    id: 'overworld',
    label: 'Overworld',
    dimensionSubtitle: 'Superfície & Cavernas Deepslate (Y=-59)',
    pageBg: 'bg-slate-950 text-zinc-100',
    headerBg: 'bg-slate-950/90 border-zinc-800/80',
    cardBg: 'bg-zinc-900/50',
    cardBorder: 'border-zinc-800/90',
    activeBorder: 'border-emerald-500/80',
    primaryBtn: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    secondaryBtn: 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/40',
    accentText: 'text-emerald-400',
    accentSubtleBg: 'bg-emerald-950/25 border-emerald-500/35',
    inputFocus: 'focus:border-emerald-500',
    heroGlow: 'from-emerald-950/25 via-slate-950 to-slate-950',
  },
  nether: {
    id: 'nether',
    label: 'Nether',
    dimensionSubtitle: 'Submundo Carmesim & Teto Y=128',
    pageBg: 'bg-[#120507] text-rose-50',
    headerBg: 'bg-[#120507]/90 border-rose-950/80',
    cardBg: 'bg-rose-950/25',
    cardBorder: 'border-rose-900/40',
    activeBorder: 'border-rose-500/80',
    primaryBtn: 'bg-rose-500 hover:bg-rose-400 text-slate-950',
    secondaryBtn: 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border-rose-500/40',
    accentText: 'text-rose-400',
    accentSubtleBg: 'bg-rose-950/35 border-rose-500/40',
    inputFocus: 'focus:border-rose-500',
    heroGlow: 'from-rose-950/35 via-[#120507] to-[#120507]',
  },
  end: {
    id: 'end',
    label: 'The End',
    dimensionSubtitle: 'Ilha do Dragão & End Cities no Vazio',
    pageBg: 'bg-[#080312] text-purple-50',
    headerBg: 'bg-[#080312]/90 border-purple-950/80',
    cardBg: 'bg-purple-950/25',
    cardBorder: 'border-purple-900/40',
    activeBorder: 'border-purple-500/80',
    primaryBtn: 'bg-purple-500 hover:bg-purple-400 text-slate-950',
    secondaryBtn: 'bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border-purple-500/40',
    accentText: 'text-purple-400',
    accentSubtleBg: 'bg-purple-950/35 border-purple-500/40',
    inputFocus: 'focus:border-purple-500',
    heroGlow: 'from-purple-950/35 via-[#080312] to-[#080312]',
  },
};

interface ThemeContextValue {
  theme: DimensionTheme;
  setTheme: (next: DimensionTheme) => void;
  cycleTheme: () => void;
  themeClasses: ThemeClasses;
  isSoundMuted: boolean;
  toggleSoundMute: () => void;
  playSound: (sound: MinecraftSoundType) => void;
}

const STORAGE_KEY_THEME = 'craftlab_dimension_theme_v1';

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'overworld',
  setTheme: () => {},
  cycleTheme: () => {},
  themeClasses: THEME_CONFIGS.overworld,
  isSoundMuted: false,
  toggleSoundMute: () => {},
  playSound: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<DimensionTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME) as DimensionTheme | null;
      if (saved === 'overworld' || saved === 'nether' || saved === 'end') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
    return 'overworld';
  });

  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(() => mcAudio.isMuted());

  useEffect(() => {
    document.documentElement.setAttribute('data-dimension', theme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const setTheme = (next: DimensionTheme) => {
    setThemeState(next);
    if (next === 'overworld') mcAudio.play('portal_overworld');
    else if (next === 'nether') mcAudio.play('portal_nether');
    else mcAudio.play('portal_end');
  };

  const cycleTheme = () => {
    const next: DimensionTheme =
      theme === 'overworld' ? 'nether' : theme === 'nether' ? 'end' : 'overworld';
    setTheme(next);
  };

  const toggleSoundMute = () => {
    const nextMuted = mcAudio.toggleMute();
    setIsSoundMuted(nextMuted);
  };

  const playSound = (sound: MinecraftSoundType) => {
    mcAudio.play(sound);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
        themeClasses: THEME_CONFIGS[theme],
        isSoundMuted,
        toggleSoundMute,
        playSound,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useDimensionTheme = () => useContext(ThemeContext);
