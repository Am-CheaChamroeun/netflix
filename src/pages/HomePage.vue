<template>
  <div class="relative overflow-hidden pb-14 text-white">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div class="absolute right-[-8%] top-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
    </div>

    <section class="relative">
      <div class="mx-auto max-w-[1440px] px-4 pt-4 md:pt-6">
        <template v-if="heroItem">
          <div class="relative overflow-hidden rounded-[36px] border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/30">
            <img
              :src="heroBackdrop"
              :alt="heroItem.bookName"
              class="absolute inset-0 h-full w-full scale-105 object-cover opacity-35"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/25" />
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

            <div class="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[minmax(0,1.15fr)_380px] xl:p-10">
              <div class="flex min-h-[420px] flex-col justify-end">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">
                    Tonight's Spotlight
                  </span>
                  <span
                    v-if="heroItem.corner?.name"
                    class="rounded-full px-3 py-1 text-xs font-bold text-white"
                    :style="{ background: heroItem.corner.color || '#e11d48' }"
                  >
                    {{ heroItem.corner.name }}
                  </span>
                </div>

                <div class="mt-5 flex flex-wrap gap-2">
                  <span
                    v-for="tag in heroItem.tagV3s?.slice(0, 4)"
                    :key="tag.tagId"
                    class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur"
                  >
                    {{ tag.tagName }}
                  </span>
                </div>

                <h1 class="mt-5 max-w-3xl text-4xl font-black leading-[0.95] text-white md:text-5xl xl:text-[4.5rem]">
                  {{ heroItem.bookName }}
                </h1>

                <p class="mt-5 max-w-2xl text-base leading-8 text-zinc-200 md:text-lg">
                  {{ heroItem.introduction }}
                </p>

                <div class="mt-6 flex flex-wrap gap-3 text-sm text-zinc-200">
                  <div class="rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur">
                    {{ heroItem.totalChapterNum }} episodes
                  </div>
                  <div class="rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur">
                    {{ formatCompactCount(heroItem.playCount) }} plays
                  </div>
                  <div class="rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur">
                    {{ heroItem.chargeChapter ? 'VIP title' : 'Free to start' }}
                  </div>
                </div>

                <div class="mt-8 flex flex-wrap gap-3">
                  <router-link
                    :to="{ name: 'watch', params: { bookId: heroItem.bookId, chapterId: heroItem.chapterId } }"
                    class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:brightness-110"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Episode 1
                  </router-link>

                  <router-link
                    :to="{ name: 'detail', params: { bookId: heroItem.bookId } }"
                    class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                  >
                    View Details
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>

              <div class="grid content-end gap-4 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_190px]">
                <router-link
                  :to="{ name: 'detail', params: { bookId: heroItem.bookId } }"
                  class="group overflow-hidden rounded-[30px] border border-white/10 bg-black/30 shadow-xl shadow-black/30"
                >
                  <div class="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                    <img
                      :src="heroPoster"
                      :alt="heroItem.bookName"
                      class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div class="absolute inset-x-0 bottom-0 p-5">
                      <p class="text-xs uppercase tracking-[0.24em] text-zinc-400">Featured Pick</p>
                      <p class="mt-2 line-clamp-2 text-xl font-semibold text-white">{{ heroItem.bookName }}</p>
                    </div>
                  </div>
                </router-link>

                <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <router-link
                    v-for="item in spotlightItems"
                    :key="item.bookId"
                    :to="{ name: 'detail', params: { bookId: item.bookId } }"
                    class="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                  >
                    <div class="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                      <img
                        :src="item.bookCover"
                        :alt="item.bookName"
                        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div class="min-w-0">
                      <p class="line-clamp-2 text-sm font-semibold text-white">{{ item.bookName }}</p>
                      <p class="mt-1 text-xs text-zinc-400">{{ item.totalChapterNum }} eps</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="overflow-hidden rounded-[36px] border border-white/10 bg-zinc-900/80 p-8">
            <div class="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_380px]">
              <div class="flex min-h-[420px] flex-col justify-end space-y-4">
                <div class="h-5 w-32 animate-pulse rounded-full bg-zinc-800" />
                <div class="h-20 w-3/4 animate-pulse rounded-3xl bg-zinc-800" />
                <div class="h-5 w-full animate-pulse rounded-full bg-zinc-800" />
                <div class="h-5 w-5/6 animate-pulse rounded-full bg-zinc-800" />
                <div class="flex gap-3 pt-4">
                  <div class="h-12 w-40 animate-pulse rounded-2xl bg-zinc-800" />
                  <div class="h-12 w-36 animate-pulse rounded-2xl bg-zinc-800" />
                </div>
              </div>
              <div class="aspect-[4/5] animate-pulse rounded-[30px] bg-zinc-800" />
            </div>
          </div>
        </template>
      </div>
    </section>

    <main class="relative mx-auto max-w-[1440px] px-4">
      <section class="mt-6 grid gap-4 md:grid-cols-3">
        <div class="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Streaming Mood</p>
          <h2 class="mt-3 text-xl font-bold text-white">Short-form stories with bigger drama.</h2>
          <p class="mt-2 text-sm leading-7 text-zinc-400">
            Jump between revenge, romance, and billionaire plot twists without digging through clutter.
          </p>
        </div>

        <div class="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Quick Start</p>
          <h2 class="mt-3 text-xl font-bold text-white">{{ trending?.length ?? 0 }} trending picks ready now.</h2>
          <p class="mt-2 text-sm leading-7 text-zinc-400">
            The homepage now puts stronger focus on featured titles first, then cleaner rails for fast browsing.
          </p>
        </div>

        <div class="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Fresh Drops</p>
          <h2 class="mt-3 text-xl font-bold text-white">{{ latest?.length ?? 0 }} recent updates in the catalog.</h2>
          <p class="mt-2 text-sm leading-7 text-zinc-400">
            Use the featured banner when you want a curated pick, or scroll the rows when you want variety.
          </p>
        </div>
      </section>

      <div class="mt-10 space-y-10">
        <BookRow
          title="Trending Now"
          subtitle="The dramas people are opening first tonight."
          :books="trending || []"
          :loading="trendingLoading"
          :card-width="188"
        />
        <BookRow
          title="Picked For You"
          subtitle="A softer mix of romance, tension, and addictive cliffhangers."
          :books="forYou || []"
          :loading="forYouLoading"
          :card-width="188"
        />
        <BookRow
          title="Latest Drops"
          subtitle="New arrivals and recently updated stories."
          :books="latest || []"
          :loading="latestLoading"
          :card-width="188"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BookRow from '@/components/BookRow.vue';
import { useTrending } from '@/composables/useTrending';
import { useForYou } from '@/composables/useForYou';
import { useLatest } from '@/composables/useLatest';
import { useRandomDrama } from '@/composables/useRandomDrama';

const { data: trending, isLoading: trendingLoading } = useTrending();
const { data: forYou, isLoading: forYouLoading } = useForYou();
const { data: latest, isLoading: latestLoading } = useLatest();
const { data: randomDramas } = useRandomDrama();

const heroItem = computed(() => randomDramas.value?.[0] ?? null);
const spotlightItems = computed(() => randomDramas.value?.slice(1, 4) ?? []);

const heroBackdrop = computed(() => heroItem.value?.chapterImg || heroItem.value?.bookCover || '');
const heroPoster = computed(() => heroItem.value?.bookCover || heroItem.value?.chapterImg || '');

function formatCompactCount(value?: string | number | null) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric) || numeric <= 0) return '0';

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: numeric >= 1000 ? 1 : 0,
  }).format(numeric);
}
</script>
