<template>
  <div class="pb-8">
    <!-- Hero -->
    <div class="relative h-[60vw] max-h-[480px] min-h-[260px] overflow-hidden">
      <template v-if="heroItem">
        <img
          :src="heroItem.chapterImg"
          :alt="heroItem.bookName"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div class="absolute bottom-10 left-4 md:left-8 max-w-sm">
          <div class="flex flex-wrap gap-1 mb-2">
            <span v-for="tag in heroItem.tagV3s?.slice(0, 3)" :key="tag.tagId" class="text-xs bg-purple-600/80 text-white px-2 py-0.5 rounded-full">
              {{ tag.tagName }}
            </span>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">{{ heroItem.bookName }}</h1>
          <p class="text-zinc-300 text-sm line-clamp-2 mb-4">{{ heroItem.introduction }}</p>
          <router-link
            :to="{ name: 'detail', params: { bookId: heroItem.bookId } }"
            class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </router-link>
        </div>
      </template>
      <template v-else>
        <div class="w-full h-full bg-zinc-900 animate-pulse" />
      </template>
    </div>

    <!-- Drama Rows -->
    <div class="mt-6">
      <BookRow title="Trending" :books="trending || []" :loading="trendingLoading" />
      <BookRow title="For You" :books="forYou || []" :loading="forYouLoading" />
      <BookRow title="Latest" :books="latest || []" :loading="latestLoading" />
    </div>
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
</script>
