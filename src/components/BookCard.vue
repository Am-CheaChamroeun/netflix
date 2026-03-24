<template>
  <router-link
    :to="{ name: 'detail', params: { bookId: book.bookId } }"
    class="group relative block rounded-xl overflow-hidden bg-zinc-900 shrink-0"
    :style="{ width: `${width}px` }"
  >
    <div class="relative aspect-[2/3] overflow-hidden">
      <img
        :src="cover"
        :alt="book.bookName"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div v-if="corner?.name" class="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded" :style="{ background: corner.color || '#7c3aed' }">
        {{ corner.name }}
      </div>

      <div class="absolute bottom-2 left-2 right-2">
        <p class="text-white text-xs font-medium line-clamp-2 leading-tight">{{ book.bookName }}</p>
        <p v-if="chapterCount" class="text-zinc-400 text-xs mt-0.5">{{ chapterCount }} eps</p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Book, SearchResult } from '@/types/dramabox';

const props = withDefaults(defineProps<{
  book: Book | SearchResult;
  width?: number;
}>(), {
  width: 140,
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
</script>
