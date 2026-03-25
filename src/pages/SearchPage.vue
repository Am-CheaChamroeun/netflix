<template>
  <div class="mx-auto max-w-[1440px] px-4 py-6 text-white">
    <section
      class="theme-surface-glow relative overflow-hidden rounded-[36px] border border-white/10 bg-zinc-900/70"
      style="background:
        radial-gradient(circle at top left, rgb(var(--theme-accent-rgb) / 0.16), transparent 32%),
        radial-gradient(circle at bottom right, rgb(var(--theme-accent-2-rgb) / 0.14), transparent 30%),
        rgba(24, 24, 27, 0.78);"
    >
      <img
        v-if="heroVisual"
        :src="heroVisual"
        :alt="featuredTitle"
        class="absolute inset-y-0 right-0 h-full w-full object-cover opacity-20 lg:w-[48%]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/88 to-zinc-950/40" />

      <div class="relative grid gap-6 p-6 md:p-8 xl:grid-cols-[minmax(0,1.2fr)_300px] xl:p-10">
        <div class="max-w-3xl">
          <div class="flex flex-wrap gap-2">
            <span class="theme-accent-pill rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
              Search Studio
            </span>
            <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {{ popular?.length ?? 0 }} curated picks
            </span>
          </div>

          <h1 class="mt-5 text-4xl font-black leading-[0.95] text-white md:text-5xl xl:text-[4.25rem]">
            Find your next <span class="theme-gradient-text">obsession</span>.
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            Search by title, protagonist, or the kind of chaos you want tonight. Results update automatically after a short pause.
          </p>

          <div class="mt-7 rounded-[28px] border border-white/10 bg-black/20 p-3 backdrop-blur-xl">
            <div class="relative">
              <svg class="pointer-events-none absolute left-4 top-[18px] h-5 w-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                v-model="localQuery"
                type="text"
                placeholder="Search dramas, actors, billionaire tropes..."
                class="theme-focus-ring h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-12 pr-28 text-base text-white placeholder-zinc-500 outline-none transition focus:border-white/20"
                @keydown.enter="submitSearch"
              />

              <button
                v-if="localQuery"
                @click="clearQuery"
                class="absolute right-16 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Clear search"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                @click="submitSearch"
                class="theme-gradient-bg absolute right-3 top-3 inline-flex h-8 items-center rounded-full px-4 text-sm font-bold transition hover:brightness-110"
              >
                Search
              </button>
            </div>

            <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300">
                {{ searchStatus }}
              </span>
              <span class="text-zinc-500">Press Enter for instant search or wait a moment for live results.</span>
            </div>
          </div>

          <div class="mt-5 flex flex-wrap gap-2">
            <button
              v-for="book in suggestionBooks"
              :key="book.bookId"
              @click="pickSuggestion(book.bookName)"
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              {{ book.bookName }}
            </button>
          </div>
        </div>

        <div class="grid content-end gap-3">
          <div class="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
            <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Current Focus</p>
            <h2 class="mt-3 text-xl font-bold text-white">{{ featuredTitle }}</h2>
            <p class="mt-2 text-sm leading-7 text-zinc-400">
              {{ featuredDescription }}
            </p>
          </div>

          <div class="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
            <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Search Pulse</p>
            <div class="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Results</p>
                <p class="mt-2 text-2xl font-bold text-white">{{ resultCount }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Popular</p>
                <p class="mt-2 text-2xl font-bold text-white">{{ popular?.length ?? 0 }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Theme</p>
                <p class="mt-2 text-lg font-semibold text-white">{{ currentTheme.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <template v-if="hasQuery">
      <section class="mt-8">
        <div class="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Search Results</p>
            <h2 class="mt-2 text-2xl font-bold text-white">
              Results for <span class="theme-gradient-text">"{{ searchQuery }}"</span>
            </h2>
            <p class="mt-1 text-sm text-zinc-400">
              {{ resultCount }} match{{ resultCount === 1 ? '' : 'es' }} found in the catalog.
            </p>
          </div>
          <div class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            {{ searchLoading ? 'Refreshing results...' : 'Results ready' }}
          </div>
        </div>

        <div v-if="searchLoading && !displayedResults.length" class="space-y-6">
          <div class="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03]">
            <div class="grid gap-0 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div class="aspect-[4/5] animate-pulse bg-zinc-800" />
              <div class="space-y-4 p-6">
                <div class="h-5 w-28 animate-pulse rounded-full bg-zinc-800" />
                <div class="h-10 w-3/4 animate-pulse rounded-2xl bg-zinc-800" />
                <div class="h-4 w-full animate-pulse rounded-full bg-zinc-800" />
                <div class="h-4 w-5/6 animate-pulse rounded-full bg-zinc-800" />
                <div class="flex gap-2 pt-2">
                  <div v-for="i in 3" :key="i" class="h-8 w-24 animate-pulse rounded-full bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div
              v-for="i in 8"
              :key="i"
              class="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-2"
            >
              <div class="aspect-[3/4] animate-pulse rounded-[20px] bg-zinc-800" />
              <div class="space-y-2 p-3">
                <div class="h-4 w-3/4 animate-pulse rounded-full bg-zinc-800" />
                <div class="h-3 w-1/2 animate-pulse rounded-full bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>

        <template v-else-if="displayedResults.length">
          <router-link
            v-if="featuredResult"
            :to="{ name: 'detail', params: { bookId: featuredResult.bookId } }"
            class="group block overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div class="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div class="relative overflow-hidden bg-zinc-900">
                <div class="aspect-[4/5] h-full">
                  <img
                    :src="getCover(featuredResult)"
                    :alt="featuredResult.bookName"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div class="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <span class="theme-accent-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
                    Top Result
                  </span>
                  <h3 class="mt-4 max-w-3xl text-3xl font-black leading-tight text-white md:text-4xl">
                    {{ featuredResult.bookName }}
                  </h3>
                  <p class="mt-4 max-w-3xl text-sm leading-8 text-zinc-300 md:text-base">
                    {{ getDescription(featuredResult) || 'Open this title to explore episodes, tags, and watch details.' }}
                  </p>
                  <div class="mt-5 flex flex-wrap gap-2">
                    <span
                      v-for="tag in getTags(featuredResult).slice(0, 5)"
                      :key="`${featuredResult.bookId}-${tag}`"
                      class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="mt-6 flex flex-wrap items-center gap-3">
                  <div class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                    {{ getMeta(featuredResult) || 'Drama details available' }}
                  </div>
                  <div class="inline-flex items-center gap-2 text-sm font-semibold theme-accent-soft-text">
                    Open Details
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </router-link>

          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <router-link
              v-for="book in remainingResults"
              :key="book.bookId"
              :to="{ name: 'detail', params: { bookId: book.bookId } }"
              class="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-2 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div class="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-zinc-900">
                <img
                  :src="getCover(book)"
                  :alt="book.bookName"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              </div>
              <div class="p-3">
                <h3 class="line-clamp-2 text-base font-semibold text-white">{{ book.bookName }}</h3>
                <p v-if="getMeta(book)" class="mt-1 line-clamp-1 text-sm text-zinc-400">{{ getMeta(book) }}</p>
              </div>
            </router-link>
          </div>
        </template>

        <div v-else class="rounded-[32px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <svg class="h-6 w-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <h3 class="mt-5 text-2xl font-bold text-white">No matches for "{{ searchQuery }}"</h3>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">
            Try a broader title, a character name, or jump into one of the popular picks below.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <button
              v-for="book in suggestionBooks"
              :key="`retry-${book.bookId}`"
              @click="pickSuggestion(book.bookName)"
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
            >
              {{ book.bookName }}
            </button>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
        <div class="rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Popular Right Now</p>
              <h2 class="mt-2 text-2xl font-bold text-white">Start from a title everyone is opening.</h2>
            </div>
            <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
              Trending search picks
            </span>
          </div>

          <router-link
            v-if="featuredPopular"
            :to="{ name: 'detail', params: { bookId: featuredPopular.bookId } }"
            class="group mt-6 block overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/70 transition hover:border-white/20"
          >
            <div class="grid gap-0 md:grid-cols-[240px_minmax(0,1fr)]">
              <div class="relative overflow-hidden bg-zinc-900">
                <div class="aspect-[4/5]">
                  <img
                    :src="featuredPopular.coverWap"
                    :alt="featuredPopular.bookName"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              <div class="p-6">
                <span class="theme-accent-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
                  Popular Pick
                </span>
                <h3 class="mt-4 text-3xl font-black text-white">{{ featuredPopular.bookName }}</h3>
                <p class="mt-4 text-sm leading-8 text-zinc-300">
                  {{ featuredPopular.introduction }}
                </p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span
                    v-for="tag in featuredPopular.tagV3s?.slice(0, 5)"
                    :key="tag.tagId"
                    class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    {{ tag.tagName }}
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Quick Picks</p>
          <h2 class="mt-2 text-2xl font-bold text-white">Tap a title to launch a search.</h2>
          <div class="mt-6 grid gap-3">
            <button
              v-for="book in suggestionBooks.slice(0, 6)"
              :key="`quick-${book.bookId}`"
              @click="pickSuggestion(book.bookName)"
              class="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-3 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <img
                :src="book.coverWap"
                :alt="book.bookName"
                class="h-16 w-12 shrink-0 rounded-xl object-cover"
                loading="lazy"
              />
              <div class="min-w-0">
                <p class="line-clamp-1 text-sm font-semibold text-white">{{ book.bookName }}</p>
                <p class="mt-1 text-xs text-zinc-400">{{ book.chapterCount }} episodes</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section class="mt-8">
        <div class="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Browse</p>
            <h2 class="mt-2 text-2xl font-bold text-white">Popular search library</h2>
          </div>
          <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
            Click any card to open details
          </span>
        </div>

        <div v-if="popularLoading" class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <div
            v-for="i in 12"
            :key="i"
            class="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-2"
          >
            <div class="aspect-[3/4] animate-pulse rounded-[20px] bg-zinc-800" />
            <div class="space-y-2 p-3">
              <div class="h-4 w-3/4 animate-pulse rounded-full bg-zinc-800" />
              <div class="h-3 w-1/2 animate-pulse rounded-full bg-zinc-800" />
            </div>
          </div>
        </div>

        <div v-else class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <router-link
            v-for="book in popular"
            :key="book.bookId"
            :to="{ name: 'detail', params: { bookId: book.bookId } }"
            class="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-2 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div class="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-zinc-900">
              <img
                :src="book.coverWap"
                :alt="book.bookName"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </div>
            <div class="p-3">
              <h3 class="line-clamp-2 text-sm font-semibold text-white">{{ book.bookName }}</h3>
              <p class="mt-1 text-xs text-zinc-400">{{ book.chapterCount }} episodes</p>
            </div>
          </router-link>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from '@/libs/theme';
import { useSearch } from '@/composables/useSearch';
import { usePopulerSearch } from '@/composables/usePopulerSearch';
import type { Book, SearchResult } from '@/types/dramabox';

const route = useRoute();
const router = useRouter();

const { currentTheme } = useTheme();

const searchQuery = computed(() => ((route.query.q as string) || '').trim());
const hasQuery = computed(() => searchQuery.value.length > 0);
const localQuery = ref(searchQuery.value);

const { data: results, isLoading: searchLoading } = useSearch(searchQuery);
const { data: popular, isLoading: popularLoading } = usePopulerSearch();

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(searchQuery, (value) => {
  if (value !== localQuery.value) {
    localQuery.value = value;
  }
}, { immediate: true });

watch(localQuery, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    syncQuery(value);
  }, 320);
});

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});

const displayedResults = computed(() => results.value ?? []);
const featuredResult = computed(() => displayedResults.value[0] ?? null);
const remainingResults = computed(() => displayedResults.value.slice(1));
const featuredPopular = computed(() => popular.value?.[0] ?? null);
const suggestionBooks = computed(() => popular.value?.slice(0, 8) ?? []);

const heroVisual = computed(() =>
  featuredResult.value ? getCover(featuredResult.value) : featuredPopular.value?.coverWap || ''
);

const featuredTitle = computed(() => {
  if (hasQuery.value && featuredResult.value) return featuredResult.value.bookName;
  if (hasQuery.value) return `Searching for "${searchQuery.value}"`;
  return featuredPopular.value?.bookName || 'Search the catalog';
});

const featuredDescription = computed(() => {
  if (hasQuery.value && featuredResult.value) {
    return getDescription(featuredResult.value) || 'This result is currently the strongest match for your query.';
  }

  return featuredPopular.value?.introduction
    || 'Use the search box above to jump directly into the titles everyone is browsing right now.';
});

const resultCount = computed(() => displayedResults.value.length);

const searchStatus = computed(() => {
  if (!localQuery.value.trim()) return 'Browse popular titles or start typing.';
  if (localQuery.value.trim() !== searchQuery.value) return 'Updating search...';
  if (searchLoading.value) return 'Looking through the catalog...';
  return `${resultCount.value} result${resultCount.value === 1 ? '' : 's'} ready`;
});

function submitSearch() {
  if (debounceTimer) clearTimeout(debounceTimer);
  syncQuery(localQuery.value);
}

function clearQuery() {
  localQuery.value = '';
  syncQuery('');
}

function pickSuggestion(query: string) {
  localQuery.value = query;
  submitSearch();
}

function syncQuery(rawQuery: string) {
  const trimmed = rawQuery.trim();

  if (trimmed === searchQuery.value) return;

  if (trimmed) {
    router.replace({ name: 'search', query: { q: trimmed } });
    return;
  }

  router.replace({ name: 'search' });
}

function getCover(book: SearchResult | Book) {
  return 'cover' in book ? book.cover : book.coverWap;
}

function getDescription(book: SearchResult | Book) {
  return book.introduction || '';
}

function getTags(book: SearchResult | Book) {
  if ('tagNames' in book) return book.tagNames ?? [];
  if ('tagV3s' in book && book.tagV3s?.length) return book.tagV3s.map((tag) => tag.tagName);
  return book.tags ?? [];
}

function getMeta(book: SearchResult | Book) {
  if ('protagonist' in book && book.protagonist) return book.protagonist;
  if ('chapterCount' in book) return `${book.chapterCount} episodes`;
  return '';
}
</script>
