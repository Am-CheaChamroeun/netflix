<template>
  <nav class="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
    <div class="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4">
      <router-link to="/" class="shrink-0 text-2xl font-black tracking-tight theme-gradient-text">
        DramaBox
      </router-link>

      <div class="hidden items-center gap-2 md:flex">
        <router-link
          :to="{ name: 'home' }"
          class="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          :class="route.name === 'home' ? 'theme-nav-active' : ''"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'search' }"
          class="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          :class="route.name === 'search' ? 'theme-nav-active' : ''"
        >
          Search
        </router-link>
      </div>

      <div class="relative min-w-0 max-w-xl flex-1">
        <svg class="pointer-events-none absolute left-3.5 top-3.5 h-[18px] w-[18px] text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          v-model="query"
          type="text"
          placeholder="Search dramas, actors, vibes..."
          class="theme-focus-ring h-11 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-11 pr-11 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white/20"
          @keydown.enter="submitSearch"
        />
        <button
          v-if="query"
          @click="clearSearch"
          class="absolute right-2.5 top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Clear search"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div ref="themeMenuRef" class="relative">
        <button
          @click="themeMenuOpen = !themeMenuOpen"
          class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <svg class="h-4 w-4 theme-accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c2.18 0 4.06 1.24 4.98 3.05A4.5 4.5 0 0 1 20.5 10.5c0 2.15-1.5 3.95-3.5 4.4A5.5 5.5 0 0 1 12 20.5 5.5 5.5 0 0 1 7 14.9c-2-.45-3.5-2.25-3.5-4.4A4.5 4.5 0 0 1 7.02 6.05 5.5 5.5 0 0 1 12 3Z" />
          </svg>
          <span class="hidden lg:inline">Theme</span>
          <span class="hidden xl:inline theme-accent-soft-text">{{ currentTheme.name }}</span>
        </button>

        <div
          v-if="themeMenuOpen"
          class="theme-surface-glow absolute right-0 mt-3 w-[320px] rounded-[26px] border border-white/10 bg-zinc-900/95 p-2"
        >
          <button
            v-for="theme in themeOptions"
            :key="theme.id"
            @click="selectTheme(theme.id)"
            class="flex w-full items-center gap-3 rounded-[20px] border border-transparent px-3 py-3 text-left transition hover:border-white/10 hover:bg-white/5"
            :class="currentThemeId === theme.id ? 'theme-menu-active' : ''"
          >
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/30">
              <span
                v-if="currentThemeId === theme.id"
                class="h-3 w-3 rounded-full"
                :style="{ background: `linear-gradient(135deg, ${theme.swatches[0]}, ${theme.swatches[1]})` }"
              />
            </span>

            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-white">{{ theme.name }}</p>
              <p class="mt-0.5 text-xs text-zinc-400">{{ theme.description }}</p>
            </div>

            <div class="flex shrink-0 gap-1.5">
              <span
                v-for="(color, index) in theme.swatches"
                :key="`${theme.id}-${index}`"
                class="h-3.5 w-3.5 rounded-full"
                :style="{ backgroundColor: color }"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type ThemeId, useTheme } from '@/libs/theme';

const route = useRoute();
const router = useRouter();

const query = ref('');
const themeMenuOpen = ref(false);
const themeMenuRef = ref<HTMLElement | null>(null);

const { themeOptions, currentTheme, currentThemeId, setTheme } = useTheme();

const routeQuery = computed(() => (route.query.q as string) || '');

watch(routeQuery, (value) => {
  query.value = value;
}, { immediate: true });

function submitSearch() {
  const trimmed = query.value.trim();

  if (trimmed) {
    router.push({ name: 'search', query: { q: trimmed } });
    return;
  }

  router.push({ name: 'search' });
}

function clearSearch() {
  query.value = '';

  if (route.name === 'search') {
    router.replace({ name: 'search' });
  }
}

function selectTheme(themeId: ThemeId) {
  setTheme(themeId);
  themeMenuOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (!themeMenuOpen.value) return;
  if (!themeMenuRef.value?.contains(event.target as Node)) {
    themeMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
