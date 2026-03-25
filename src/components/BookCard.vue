<template>
  <router-link
    :to="{ name: 'detail', params: { bookId: book.bookId } }"
    class="group block shrink-0 snap-start"
    :style="{ width: `${width}px` }"
  >
    <article class="rounded-[26px] border border-white/10 bg-white/[0.04] p-2 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
      <div class="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-zinc-900">
        <img
          :src="cover"
          :alt="book.bookName"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div class="absolute left-3 top-3 flex flex-wrap gap-2">
          <div
            v-if="corner?.name"
            class="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
            :style="{ background: corner.color || '#7c3aed' }"
          >
            {{ corner.name }}
          </div>
        </div>

        <div
          v-if="chapterCount"
          class="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"
        >
          {{ chapterCount }} eps
        </div>

        <div class="absolute inset-x-0 bottom-0 flex items-end justify-end p-3">
          <div class="rounded-full border border-white/15 bg-white/10 p-2 text-white opacity-0 transition group-hover:opacity-100">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="px-1 pb-1 pt-3">
        <p class="line-clamp-2 text-sm font-semibold text-white">{{ book.bookName }}</p>
        <p v-if="metaLine" class="mt-1 line-clamp-1 text-xs text-zinc-400">{{ metaLine }}</p>
      </div>
    </article>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Book, SearchResult } from '@/types/dramabox';

const props = withDefaults(defineProps<{
  book: Book | SearchResult;
  width?: number;
}>(), {
  width: 176,
});

const cover = computed(() => {
  if ('coverWap' in props.book) return props.book.coverWap;
  return (props.book as SearchResult).cover;
});

const corner = computed(() => {
  if ('corner' in props.book) return props.book.corner;
  return null;
});

const chapterCount = computed(() => {
  if ('chapterCount' in props.book) return props.book.chapterCount;
  return null;
});

const metaLine = computed(() => {
  if ('chapterCount' in props.book) {
    const segments = [];

    if (props.book.chapterCount) segments.push(`${props.book.chapterCount} episodes`);
    if ('playCount' in props.book && props.book.playCount) segments.push(`${formatCompactCount(props.book.playCount)} plays`);

    return segments.join(' · ');
  }

  if ('protagonist' in props.book && props.book.protagonist) {
    return props.book.protagonist;
  }

  if ('tagNames' in props.book && props.book.tagNames?.length) {
    return props.book.tagNames.slice(0, 2).join(' · ');
  }

  return '';
});

function formatCompactCount(value?: string | number | null) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric) || numeric <= 0) return '0';

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: numeric >= 1000 ? 1 : 0,
  }).format(numeric);
}
</script>
