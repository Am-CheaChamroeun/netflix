<template>
  <section>
    <div class="mb-4 flex items-end justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">Collection</p>
        <h2 class="mt-2 text-2xl font-bold text-white">{{ title }}</h2>
        <p v-if="subtitle" class="mt-1 text-sm text-zinc-400">{{ subtitle }}</p>
      </div>
      <div class="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 md:block">
        Swipe to explore
      </div>
    </div>

    <div class="scrollbar-hide flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
      <template v-if="loading">
        <div
          v-for="i in 8"
          :key="i"
          class="shrink-0 snap-start rounded-[26px] border border-white/10 bg-white/[0.03] p-2"
          :style="{ width: `${cardWidth}px` }"
        >
          <div class="aspect-[3/4] animate-pulse rounded-[20px] bg-zinc-800" />
          <div class="space-y-2 px-1 pb-1 pt-3">
            <div class="h-4 w-3/4 animate-pulse rounded-full bg-zinc-800" />
            <div class="h-3 w-1/2 animate-pulse rounded-full bg-zinc-800" />
          </div>
        </div>
      </template>
      <BookCard
        v-else
        v-for="book in books"
        :key="book.bookId"
        :book="book"
        :width="cardWidth"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Book, SearchResult } from '@/types/dramabox';
import BookCard from './BookCard.vue';

withDefaults(defineProps<{
  title: string;
  subtitle?: string;
  books: (Book | SearchResult)[];
  loading?: boolean;
  cardWidth?: number;
}>(), {
  subtitle: '',
  loading: false,
  cardWidth: 176,
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
