<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
    <div class="max-w-screen-xl mx-auto px-4 h-14 flex items-center gap-4">
      <router-link to="/" class="text-xl font-bold text-purple-400 shrink-0">
        DramaBox
      </router-link>

      <div class="flex-1 max-w-md relative">
        <input
          v-model="query"
          type="text"
          placeholder="Search dramas..."
          class="w-full bg-zinc-800 text-white placeholder-zinc-500 text-sm rounded-lg px-4 py-2 pl-9 outline-none focus:ring-1 focus:ring-purple-500"
          @keydown.enter="goSearch"
        />
        <svg class="absolute left-2.5 top-2.5 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const query = ref('');

function goSearch() {
  if (query.value.trim()) {
    router.push({ name: 'search', query: { q: query.value.trim() } });
  }
}
</script>
