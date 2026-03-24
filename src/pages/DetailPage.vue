<template>
  <div class="min-h-screen bg-zinc-950 pb-16 text-white">
    <div v-if="bookLoading" class="mx-auto max-w-6xl px-4 py-6">
      <div class="mb-6 h-10 w-28 animate-pulse rounded-full bg-zinc-900" />
      <div class="grid gap-6 lg:grid-cols-[280px,1fr]">
        <div class="aspect-[2/3] animate-pulse rounded-[28px] bg-zinc-900" />
        <div class="space-y-4 rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div class="h-5 w-24 animate-pulse rounded-full bg-zinc-800" />
          <div class="h-10 w-3/4 animate-pulse rounded-2xl bg-zinc-800" />
          <div class="h-4 w-1/3 animate-pulse rounded-full bg-zinc-800" />
          <div class="h-4 w-full animate-pulse rounded-full bg-zinc-800" />
          <div class="h-4 w-5/6 animate-pulse rounded-full bg-zinc-800" />
          <div class="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
            <div v-for="i in 4" :key="i" class="h-24 animate-pulse rounded-2xl bg-zinc-900" />
          </div>
          <div class="flex flex-wrap gap-3 pt-4">
            <div class="h-12 w-40 animate-pulse rounded-2xl bg-zinc-900" />
            <div class="h-12 w-36 animate-pulse rounded-2xl bg-zinc-900" />
          </div>
        </div>
      </div>
    </div>

    <template v-else-if="book">
      <section class="relative isolate overflow-hidden border-b border-white/10">
        <div class="absolute inset-0">
          <img
            v-if="book.coverWap"
            :src="book.coverWap"
            :alt="book.bookName"
            class="h-full w-full scale-110 object-cover opacity-20 blur-sm"
            @error="hideBrokenImage"
          />
          <div class="absolute inset-0 bg-zinc-950/70" />
          <div class="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/80 to-zinc-950" />
          <div class="absolute -left-20 top-0 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
          <div class="absolute right-0 top-10 h-72 w-72 rounded-full bg-rose-500/15 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-6xl px-4 pb-10 pt-5 md:pb-12">
          <button
            @click="$router.back()"
            class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div class="mt-6 grid items-end gap-6 lg:grid-cols-[280px,1fr] xl:grid-cols-[320px,1fr]">
            <div class="overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/80 shadow-2xl shadow-black/40">
              <div class="relative aspect-[2/3] bg-zinc-900">
                <img
                  v-if="book.coverWap"
                  :src="book.coverWap"
                  :alt="book.bookName"
                  class="h-full w-full object-cover"
                  @error="hideBrokenImage"
                />
                <div v-else class="flex h-full items-center justify-center bg-zinc-900">
                  <svg class="h-12 w-12 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                  </svg>
                </div>

                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-5 pb-5 pt-12">
                  <div class="flex items-end justify-between gap-3">
                    <div>
                      <p class="text-xs uppercase tracking-[0.24em] text-zinc-400">DramaBox</p>
                      <p class="mt-1 text-sm font-medium text-zinc-100">{{ chapterSummary }}</p>
                    </div>
                    <span
                      v-if="book.corner?.name"
                      class="rounded-full px-3 py-1 text-xs font-bold text-white"
                      :style="{ background: book.corner.color || '#f43f5e' }"
                    >
                      {{ book.corner.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
                  Featured Drama
                </span>
                <span
                  v-if="book.rankVo?.recCopy"
                  class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                >
                  {{ book.rankVo.recCopy }}
                </span>
              </div>

              <h1 class="mt-4 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
                {{ book.bookName }}
              </h1>

              <p v-if="book.protagonist" class="mt-3 text-base text-zinc-300">
                Starring {{ book.protagonist }}
              </p>

              <p
                class="mt-5 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base"
                :class="showFull ? '' : 'line-clamp-4'"
              >
                {{ book.introduction || 'No introduction available for this drama yet.' }}
              </p>

              <button
                v-if="book.introduction && book.introduction.length > 180"
                @click="showFull = !showFull"
                class="mt-3 text-sm font-medium text-orange-200 transition hover:text-white"
              >
                {{ showFull ? 'Show less' : 'Read full synopsis' }}
              </button>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="tag in displayTags"
                  :key="tag.id"
                  class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200"
                >
                  {{ tag.label }}
                </span>
              </div>

              <div class="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div
                  v-for="item in heroStats"
                  :key="item.label"
                  class="rounded-2xl border border-white/10 bg-zinc-950/50 p-4"
                >
                  <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">{{ item.label }}</p>
                  <p class="mt-2 text-xl font-semibold text-white">{{ item.value }}</p>
                  <p class="mt-1 text-xs text-zinc-400">{{ item.helper }}</p>
                </div>
              </div>

              <div class="mt-8 flex flex-wrap gap-3">
                <router-link
                  v-if="firstEpisode"
                  :to="{ name: 'watch', params: { bookId: book.bookId, chapterId: firstEpisode.chapterId } }"
                  class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:brightness-110"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Start Watching
                </router-link>

                <router-link
                  v-if="latestEpisode && latestEpisode.chapterId !== firstEpisode?.chapterId"
                  :to="{ name: 'watch', params: { bookId: book.bookId, chapterId: latestEpisode.chapterId } }"
                  class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  Jump to Latest
                  <span class="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-300">
                    {{ formatEpisodeLabel(latestEpisode.chapterIndex) }}
                  </span>
                </router-link>

                <button
                  @click="copyLink"
                  class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
                  </svg>
                  {{ copied ? 'Link Copied' : 'Copy Link' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main class="mx-auto max-w-6xl px-4">
        <div class="mt-8 grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <section class="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Overview</p>
                <h2 class="mt-2 text-2xl font-bold text-white">Story & vibe</h2>
              </div>
              <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                {{ displayTags.length }} tags
              </span>
            </div>

            <p class="mt-5 text-sm leading-7 text-zinc-300 md:text-base">
              {{ book.introduction || 'This drama does not have a synopsis yet, but the episode list is ready to explore.' }}
            </p>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl border border-white/10 bg-zinc-950/50 p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Watching Snapshot</p>
                <div class="mt-4 space-y-3">
                  <div class="flex items-center justify-between gap-4 text-sm">
                    <span class="text-zinc-400">Total episodes</span>
                    <span class="font-semibold text-white">{{ chapterSummary }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-4 text-sm">
                    <span class="text-zinc-400">Playable now</span>
                    <span class="font-semibold text-white">{{ freeEpisodesCount }} free</span>
                  </div>
                  <div class="flex items-center justify-between gap-4 text-sm">
                    <span class="text-zinc-400">Premium locked</span>
                    <span class="font-semibold text-white">{{ vipEpisodesCount }} VIP</span>
                  </div>
                </div>
              </div>

              <div class="rounded-2xl border border-white/10 bg-zinc-950/50 p-4">
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Extra Details</p>
                <div class="mt-4 space-y-3">
                  <div class="flex items-center justify-between gap-4 text-sm">
                    <span class="text-zinc-400">Views</span>
                    <span class="font-semibold text-white">{{ formatCompactCount(book.playCount) }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-4 text-sm">
                    <span class="text-zinc-400">Subtitled episodes</span>
                    <span class="font-semibold text-white">{{ subtitledEpisodesCount }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-4 text-sm">
                    <span class="text-zinc-400">Source</span>
                    <span class="font-semibold text-white">{{ book.dataFrom || 'DramaBox' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-transparent p-6 backdrop-blur-xl">
            <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Watch Guide</p>
            <h2 class="mt-2 text-2xl font-bold text-white">Everything you need before pressing play</h2>
            <p class="mt-4 text-sm leading-7 text-zinc-300">
              Start from the first episode for the full story, jump to the newest release if you are catching up, or scan the tags and episode cards to find the tone that fits your mood tonight.
            </p>

            <div class="mt-6 grid gap-3">
              <div class="rounded-2xl border border-orange-400/20 bg-orange-400/10 p-4">
                <p class="text-sm font-semibold text-orange-100">Best entry point</p>
                <p class="mt-1 text-sm text-orange-50/80">
                  {{ firstEpisode ? `${formatEpisodeLabel(firstEpisode.chapterIndex)} is ready to start right away.` : 'Episode list is loading.' }}
                </p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-zinc-950/50 p-4">
                <p class="text-sm font-semibold text-white">Latest drop</p>
                <p class="mt-1 text-sm text-zinc-300">
                  {{ latestEpisode ? `${latestEpisode.chapterName} is the newest episode in the list.` : 'No latest episode available yet.' }}
                </p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-zinc-950/50 p-4">
                <p class="text-sm font-semibold text-white">Mood board</p>
                <p class="mt-1 text-sm text-zinc-300">
                  {{ displayTags.length ? displayTags.slice(0, 3).map((tag) => tag.label).join(', ') : 'Tags will appear here when the API returns them.' }}
                </p>
              </div>
            </div>
          </section>
        </div>

        <section class="mt-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Episodes</p>
              <h2 class="mt-2 text-2xl font-bold text-white">Episode browser</h2>
              <p class="mt-2 text-sm text-zinc-400">
                Explore {{ filteredEpisodes.length }} episode{{ filteredEpisodes.length === 1 ? '' : 's' }} in
                {{ episodeOrder === 'asc' ? 'watch order' : 'reverse order' }}.
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <div class="inline-flex rounded-full border border-white/10 bg-zinc-950/70 p-1">
                <button
                  v-for="filter in episodeFilters"
                  :key="filter.value"
                  @click="episodeFilter = filter.value"
                  class="rounded-full px-4 py-2 text-sm font-medium transition"
                  :class="episodeFilter === filter.value ? 'bg-white text-zinc-950' : 'text-zinc-300 hover:text-white'"
                >
                  {{ filter.label }}
                </button>
              </div>

              <button
                @click="toggleEpisodeOrder"
                class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3" />
                </svg>
                {{ episodeOrder === 'asc' ? 'Oldest First' : 'Newest First' }}
              </button>
            </div>
          </div>

          <div v-if="episodesLoading" class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div
              v-for="i in 6"
              :key="i"
              class="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60"
            >
              <div class="aspect-video animate-pulse bg-zinc-900" />
              <div class="space-y-3 p-4">
                <div class="h-4 w-20 animate-pulse rounded-full bg-zinc-900" />
                <div class="h-5 w-3/4 animate-pulse rounded-full bg-zinc-900" />
                <div class="h-4 w-1/2 animate-pulse rounded-full bg-zinc-900" />
              </div>
            </div>
          </div>

          <div v-else-if="visibleEpisodes.length" class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <router-link
              v-for="ep in visibleEpisodes"
              :key="ep.chapterId"
              :to="{ name: 'watch', params: { bookId: book.bookId, chapterId: ep.chapterId } }"
              class="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 transition hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900"
            >
              <div class="relative aspect-video overflow-hidden bg-zinc-900">
                <img
                  v-if="ep.chapterImg"
                  :src="ep.chapterImg"
                  :alt="ep.chapterName"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  @error="hideBrokenImage"
                />
                <div v-else class="flex h-full items-center justify-center">
                  <svg class="h-10 w-10 text-zinc-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div class="absolute left-3 top-3 flex items-center gap-2">
                  <span class="rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                    {{ formatEpisodeLabel(ep.chapterIndex) }}
                  </span>
                  <span
                    v-if="ep.chargeChapter || ep.isCharge === 1"
                    class="rounded-full bg-amber-300 px-2.5 py-1 text-xs font-black text-zinc-950"
                  >
                    VIP
                  </span>
                </div>
                <span
                  v-if="formatDuration(ep.viewingDuration)"
                  class="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
                >
                  {{ formatDuration(ep.viewingDuration) }}
                </span>
              </div>

              <div class="p-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">{{ book.bookName }}</p>
                    <h3 class="mt-2 line-clamp-2 text-base font-semibold text-white">{{ ep.chapterName }}</h3>
                  </div>
                  <svg class="mt-1 h-5 w-5 shrink-0 text-zinc-500 transition group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                    {{ episodeAccessLabel(ep) }}
                  </span>
                  <span
                    v-if="subtitleSummary(ep)"
                    class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
                  >
                    {{ subtitleSummary(ep) }}
                  </span>
                  <span
                    v-if="ep.spriteSnapshotUrl"
                    class="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-200"
                  >
                    Preview ready
                  </span>
                </div>
              </div>
            </router-link>
          </div>

          <div v-else class="mt-8 rounded-3xl border border-dashed border-white/10 bg-zinc-950/50 px-6 py-12 text-center">
            <p class="text-base font-medium text-white">No episodes match this filter.</p>
            <p class="mt-2 text-sm text-zinc-500">Try switching between all, free, or VIP episodes.</p>
          </div>

          <div v-if="filteredEpisodes.length > showCount" class="mt-6 flex justify-center">
            <button
              @click="showCount += 12"
              class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
            >
              Load 12 more episodes
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </section>

        <div class="mt-10 space-y-2">
          <BookRow v-if="forYouBooks.length" title="Recommended For You" :books="forYouBooks" />
          <BookRow v-if="trendingBooks.length" title="Trending Right Now" :books="trendingBooks" />
          <BookRow v-if="latestBooks.length" title="Fresh Releases" :books="latestBooks" />
        </div>
      </main>
    </template>

    <div v-else class="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-28 text-center">
      <div class="rounded-full border border-white/10 bg-white/5 p-4">
        <svg class="h-8 w-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75l4.5 4.5m0-4.5-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
        </svg>
      </div>
      <h2 class="mt-6 text-2xl font-bold text-white">Drama not found</h2>
      <p class="mt-3 max-w-md text-sm leading-6 text-zinc-400">
        The detail API did not return data for this title. You can go back and pick another drama from the catalog.
      </p>
      <button
        @click="$router.back()"
        class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Go back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BookRow from '@/components/BookRow.vue';
import { useAllEpisode } from '@/composables/useAllEpisode';
import { useDetail } from '@/composables/useDetail';
import { useForYou } from '@/composables/useForYou';
import { useLatest } from '@/composables/useLatest';
import { useTrending } from '@/composables/useTrending';
import type { Book, Chapter } from '@/types/dramabox';

const route = useRoute();

const bookId = computed(() => route.params.bookId as string);

const showFull = ref(false);
const showCount = ref(12);
const copied = ref(false);
const episodeFilter = ref<'all' | 'free' | 'vip'>('all');
const episodeOrder = ref<'asc' | 'desc'>('asc');

const episodeFilters = [
  { label: 'All', value: 'all' as const },
  { label: 'Free', value: 'free' as const },
  { label: 'VIP', value: 'vip' as const },
];

const { data: book, isLoading: bookLoading } = useDetail(bookId);
const { data: episodes, isLoading: episodesLoading } = useAllEpisode(bookId);
const { data: forYou } = useForYou();
const { data: trending } = useTrending();
const { data: latest } = useLatest();

watch(bookId, () => {
  showFull.value = false;
  showCount.value = 12;
  copied.value = false;
  episodeFilter.value = 'all';
  episodeOrder.value = 'asc';
});

const displayTags = computed(() => {
  if (book.value?.tagV3s?.length) {
    return book.value.tagV3s.map((tag) => ({
      id: String(tag.tagId),
      label: tag.tagName,
    }));
  }

  return (
    book.value?.tags?.map((tag, index) => ({
      id: `${tag}-${index}`,
      label: tag,
    })) ?? []
  );
});

const ascendingEpisodes = computed(() =>
  [...(episodes.value ?? [])].sort((left, right) => left.chapterIndex - right.chapterIndex)
);

const descendingEpisodes = computed(() => [...ascendingEpisodes.value].reverse());

const filteredEpisodes = computed(() => {
  const source = episodeOrder.value === 'asc' ? ascendingEpisodes.value : descendingEpisodes.value;

  return source.filter((episode) => {
    const vip = isVipEpisode(episode);

    if (episodeFilter.value === 'vip') return vip;
    if (episodeFilter.value === 'free') return !vip;
    return true;
  });
});

const visibleEpisodes = computed(() => filteredEpisodes.value.slice(0, showCount.value));

const firstEpisode = computed(() => ascendingEpisodes.value[0] ?? null);
const latestEpisode = computed(() => descendingEpisodes.value[0] ?? null);

const vipEpisodesCount = computed(() =>
  episodes.value?.filter((episode) => isVipEpisode(episode)).length ?? 0
);

const freeEpisodesCount = computed(() =>
  Math.max((episodes.value?.length ?? 0) - vipEpisodesCount.value, 0)
);

const subtitledEpisodesCount = computed(
  () =>
    episodes.value?.filter((episode) =>
      episode.subLanguageVoList?.some((subtitle) => subtitle.url)
    ).length ?? 0
);

const chapterSummary = computed(() => {
  const total = episodes.value?.length ?? book.value?.chapterCount ?? 0;
  return `${total} episode${total === 1 ? '' : 's'}`;
});

const heroStats = computed(() => [
  {
    label: 'Episodes',
    value: String(episodes.value?.length ?? book.value?.chapterCount ?? 0),
    helper: latestEpisode.value ? `${formatEpisodeLabel(latestEpisode.value.chapterIndex)} latest` : 'Full list',
  },
  {
    label: 'Views',
    value: formatCompactCount(book.value?.playCount),
    helper: 'Audience plays',
  },
  {
    label: 'Free',
    value: String(freeEpisodesCount.value),
    helper: 'Playable now',
  },
  {
    label: 'Subtitles',
    value: String(subtitledEpisodesCount.value),
    helper: 'Episodes with captions',
  },
]);

const forYouBooks = computed(() => filterRecommendations(forYou.value, bookId.value));
const trendingBooks = computed(() => filterRecommendations(trending.value, bookId.value));
const latestBooks = computed(() => filterRecommendations(latest.value, bookId.value));

function isVipEpisode(episode: Chapter) {
  return episode.chargeChapter || episode.isCharge === 1;
}

function filterRecommendations(books: Book[] | undefined, currentBookId: string) {
  if (!books?.length) return [];

  return books
    .filter((item, index, array) => {
      if (item.bookId === currentBookId) return false;
      return array.findIndex((candidate) => candidate.bookId === item.bookId) === index;
    })
    .slice(0, 12);
}

function formatCompactCount(value?: string | number | null) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric) || numeric <= 0) return '0';

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: numeric >= 1000 ? 1 : 0,
  }).format(numeric);
}

function formatEpisodeLabel(index?: number | null) {
  if (!Number.isFinite(index)) return 'Episode';
  return `Ep ${index}`;
}

function formatDuration(duration?: number | null) {
  if (!duration || duration <= 0) return '';

  const totalSeconds = Math.floor(duration);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function subtitleSummary(episode: Chapter) {
  const total = episode.subLanguageVoList?.filter((subtitle) => subtitle.url).length ?? 0;

  if (total === 0) return '';
  if (total === 1) return '1 subtitle';
  return `${total} subtitles`;
}

function episodeAccessLabel(episode: Chapter) {
  return isVipEpisode(episode) ? 'VIP access' : 'Free to watch';
}

function toggleEpisodeOrder() {
  episodeOrder.value = episodeOrder.value === 'asc' ? 'desc' : 'asc';
}

async function copyLink() {
  if (typeof window === 'undefined') return;

  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    window.setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    copied.value = false;
  }
}

function hideBrokenImage(event: Event) {
  const image = event.target as HTMLImageElement | null;

  if (!image) return;
  image.style.display = 'none';
}
</script>
