<template>
  <div class="flex flex-col lg:flex-row min-h-[calc(100vh-56px)]">
    <!-- Main Player Area -->
    <div class="flex-1 flex flex-col">
      <!-- Video Player -->
      <div class="relative w-full bg-black" style="aspect-ratio: 16/9;">
        <video
          v-if="videoUrl"
          :key="videoUrl"
          :src="videoUrl"
          controls
          autoplay
          class="w-full h-full"
          @ended="playNext"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-zinc-900">
          <div v-if="episodesLoading" class="text-zinc-500 flex flex-col items-center gap-3">
            <div class="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span class="text-sm">Loading...</span>
          </div>
          <div v-else class="text-zinc-500 text-sm flex flex-col items-center gap-2">
            <svg class="w-12 h-12 opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            <span>Video unavailable</span>
          </div>
        </div>
      </div>

      <!-- Episode Info -->
      <div class="px-4 py-4 bg-zinc-950">
        <div class="flex items-center gap-3 mb-1">
          <button @click="$router.back()" class="text-zinc-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-white font-semibold text-base">{{ book?.bookName }}</h1>
        </div>
        <p class="text-zinc-400 text-sm ml-8">{{ currentEpisode?.chapterName }}</p>

        <!-- Prev / Next -->
        <div class="flex gap-3 mt-4 ml-8">
          <button
            v-if="prevEpisode"
            @click="goEpisode(prevEpisode.chapterId)"
            class="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            Prev
          </button>
          <button
            v-if="nextEpisode"
            @click="goEpisode(nextEpisode.chapterId)"
            class="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Next
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <!-- Subtitles Info -->
      <div v-if="subtitles.length > 1" class="px-4 py-3 bg-zinc-900 border-t border-zinc-800">
        <p class="text-zinc-500 text-xs mb-2">Subtitles</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="sub in subtitles"
            :key="sub.captionLanguage"
            class="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded uppercase"
          >
            {{ sub.captionLanguage === 'none' ? 'Off' : sub.captionLanguage }}
          </span>
        </div>
      </div>
    </div>

    <!-- Episode List Sidebar -->
    <div class="w-full lg:w-80 bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-800 flex flex-col">
      <div class="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <h2 class="text-white font-semibold text-sm">All Episodes</h2>
        <span class="text-zinc-500 text-xs">{{ episodes?.length ?? 0 }} eps</span>
      </div>
      <div class="flex-1 overflow-y-auto" style="max-height: calc(100vh - 120px)">
        <div v-if="episodesLoading" class="p-3 space-y-2">
          <div v-for="i in 10" :key="i" class="h-14 bg-zinc-800 rounded-lg animate-pulse" />
        </div>
        <div v-else>
          <button
            v-for="ep in episodes"
            :key="ep.chapterId"
            @click="goEpisode(ep.chapterId)"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-zinc-800 transition-colors"
            :class="ep.chapterId === chapterId ? 'bg-zinc-800 border-l-2 border-purple-500' : ''"
          >
            <div class="relative shrink-0 w-20 h-12 rounded overflow-hidden bg-zinc-800">
              <img
                v-if="ep.chapterImg"
                :src="ep.chapterImg"
                :alt="ep.chapterName"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-5 h-5 text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div v-if="ep.chargeChapter || ep.isCharge === 1" class="absolute top-0.5 right-0.5 bg-yellow-500 text-black text-xs font-bold px-1 rounded">
                VIP
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate" :class="ep.chapterId === chapterId ? 'text-purple-400' : 'text-white'">
                {{ ep.chapterName }}
              </p>
              <p v-if="ep.spriteSnapshotUrl" class="text-xs text-zinc-500 mt-0.5">Preview available</p>
            </div>
            <svg v-if="ep.chapterId === chapterId" class="w-4 h-4 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDetail } from '@/composables/useDetail';
import { useAllEpisode } from '@/composables/useAllEpisode';

const route = useRoute();
const router = useRouter();

const bookId = computed(() => route.params.bookId as string);
const chapterId = computed(() => route.params.chapterId as string);

const { data: book } = useDetail(bookId);
const { data: episodes, isLoading: episodesLoading } = useAllEpisode(bookId);

const currentEpisode = computed(() =>
  episodes.value?.find((ep) => ep.chapterId === chapterId.value) ?? null
);

const currentIndex = computed(() =>
  episodes.value?.findIndex((ep) => ep.chapterId === chapterId.value) ?? -1
);

const prevEpisode = computed(() => {
  if (currentIndex.value > 0) return episodes.value![currentIndex.value - 1];
  return null;
});

const nextEpisode = computed(() => {
  if (episodes.value && currentIndex.value < episodes.value.length - 1)
    return episodes.value[currentIndex.value + 1];
  return null;
});

const videoUrl = computed(() => {
  if (!currentEpisode.value?.cdnList?.length) return null;
  const defaultCdn = currentEpisode.value.cdnList.find((c) => c.isDefault === 1)
    ?? currentEpisode.value.cdnList[0];
  const defaultVideo = defaultCdn.videoPathList.find((v) => v.isDefault === 1)
    ?? defaultCdn.videoPathList.find((v) => v.quality === 720)
    ?? defaultCdn.videoPathList[0];
  return defaultVideo?.videoPath ?? null;
});

const subtitles = computed(() =>
  currentEpisode.value?.subLanguageVoList?.filter((s) => s.url) ?? []
);

function goEpisode(id: string) {
  router.replace({ name: 'watch', params: { bookId: bookId.value, chapterId: id } });
}

function playNext() {
  if (nextEpisode.value) goEpisode(nextEpisode.value.chapterId);
}
</script>
