<template>
  <div class="max-w-screen-xl mx-auto px-4 py-6">
    <!-- Search Bar -->
    <div class="relative max-w-xl mb-8">
      <input
        v-model="localQuery"
        type="text"
        placeholder="Search dramas..."
        class="w-full bg-zinc-800 text-white placeholder-zinc-500 rounded-xl px-5 py-3 pl-11 outline-none focus:ring-2 focus:ring-purple-500 text-base"
        @keydown.enter="updateQuery"
      />
      <svg class="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    </div>

    <!-- Popular when no query -->
    <template v-if="!searchQuery">
      <h2 class="text-white font-semibold text-base mb-4">Popular Searches</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <template v-if="popularLoading">
          <div v-for="i in 12" :key="i" class="rounded-xl bg-zinc-800 animate-pulse aspect-[2/3]" />
        </template>
        <template v-else>
          <router-link
            v-for="book in popular"
            :key="book.bookId"
            :to="{ name: 'detail', params: { bookId: book.bookId } }"
            class="group relative block rounded-xl overflow-hidden bg-zinc-900"
          >
            <div class="relative aspect-[2/3]">
              <img :src="book.coverWap" :alt="book.bookName" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <p class="absolute bottom-2 left-2 right-2 text-white text-xs font-medium line-clamp-2">{{ book.bookName }}</p>
            </div>
          </router-link>
        </template>
      </div>
    </template>

    <!-- Search Results -->
    <template v-else>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-white font-semibold text-base">
          Results for "<span class="text-purple-400">{{ searchQuery }}</span>"
        </h2>
        <span v-if="results?.length" class="text-zinc-500 text-sm">{{ results.length }} found</span>
      </div>

      <div v-if="searchLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <div v-for="i in 12" :key="i" class="rounded-xl bg-zinc-800 animate-pulse aspect-[2/3]" />
      </div>

      <div v-else-if="results?.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <router-link
          v-for="book in results"
          :key="book.bookId"
          :to="{ name: 'detail', params: { bookId: book.bookId } }"
          class="group relative block rounded-xl overflow-hidden bg-zinc-900"
        >
          <div class="relative aspect-[2/3]">
            <img :src="book.cover" :alt="book.bookName" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div class="absolute bottom-2 left-2 right-2">
              <p class="text-white text-xs font-medium line-clamp-2">{{ book.bookName }}</p>
              <p v-if="book.protagonist" class="text-zinc-400 text-xs mt-0.5 truncate">{{ book.protagonist }}</p>
            </div>
          </div>
        </router-link>
      </div>

      <div v-else class="text-center py-16 text-zinc-500">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <p>No results found for "{{ searchQuery }}"</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSearch } from '@/composables/useSearch';
import { usePopulerSearch } from '@/composables/usePopulerSearch';

const route = useRoute();
const router = useRouter();

const searchQuery = computed(() => (route.query.q as string) || '');
const localQuery = ref(searchQuery.value);

watch(searchQuery, (val) => { localQuery.value = val; });

function updateQuery() {
  if (localQuery.value.trim()) {
    router.replace({ name: 'search', query: { q: localQuery.value.trim() } });
  }
}

const { data: results, isLoading: searchLoading } = useSearch(searchQuery);
const { data: popular, isLoading: popularLoading } = usePopulerSearch();
</script>
