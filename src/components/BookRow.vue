<template>
  <section class="mb-8">
    <h2 class="text-white font-semibold text-lg mb-3 px-4">{{ title }}</h2>
    <div class="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
      <template v-if="loading">
        <div
          v-for="i in 8"
          :key="i"
          class="shrink-0 rounded-xl bg-zinc-800 animate-pulse"
          style="width: 140px; height: 210px"
        />
      </template>
      <BookCard v-else v-for="book in books" :key="book.bookId" :book="book" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Book, SearchResult } from '@/types/dramabox';
import BookCard from './BookCard.vue';

defineProps<{
  title: string;
  books: (Book | SearchResult)[];
  loading?: boolean;
}>();
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
