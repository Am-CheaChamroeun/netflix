import { computed, ref } from 'vue';

export type ThemeId =
  | 'ember_rose'
  | 'indigo_sky'
  | 'orchid_mint'
  | 'violet_gold';

export type ThemeOption = {
  id: ThemeId;
  name: string;
  description: string;
  swatches: [string, string];
};

const STORAGE_KEY = 'drama-box-theme';
const DEFAULT_THEME: ThemeId = 'ember_rose';

export const themeOptions: ThemeOption[] = [
  {
    id: 'ember_rose',
    name: 'Ember & Rose',
    description: 'Warm cinematic highlights with a premium glow.',
    swatches: ['#fb7185', '#f59e0b'],
  },
  {
    id: 'indigo_sky',
    name: 'Indigo & Sky',
    description: 'Cool neon accents with cleaner contrast.',
    swatches: ['#818cf8', '#38bdf8'],
  },
  {
    id: 'orchid_mint',
    name: 'Orchid & Mint',
    description: 'Soft vivid color with bright mint energy.',
    swatches: ['#d946ef', '#34d399'],
  },
  {
    id: 'violet_gold',
    name: 'Violet & Gold',
    description: 'A richer royal palette with warmer depth.',
    swatches: ['#8b5cf6', '#fbbf24'],
  },
];

const currentThemeId = ref<ThemeId>(DEFAULT_THEME);

export function initializeTheme() {
  if (typeof window === 'undefined') return;

  const savedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
  const nextTheme = themeOptions.some((theme) => theme.id === savedTheme)
    ? savedTheme!
    : DEFAULT_THEME;

  applyTheme(nextTheme);
}

export function applyTheme(themeId: ThemeId) {
  currentThemeId.value = themeId;

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = themeId;
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, themeId);
  }
}

export function useTheme() {
  const currentTheme = computed(() =>
    themeOptions.find((theme) => theme.id === currentThemeId.value) ?? themeOptions[0]
  );

  return {
    themeOptions,
    currentThemeId,
    currentTheme,
    setTheme: applyTheme,
  };
}
