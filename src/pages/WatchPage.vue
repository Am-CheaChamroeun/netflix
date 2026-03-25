<template>
  <div class="min-h-[calc(100vh-56px)] bg-zinc-950">
    <div class="mx-auto grid min-h-[calc(100vh-56px)] max-w-[1800px] lg:grid-cols-[minmax(0,1fr)_340px]">
      <section class="min-w-0">
        <div class="mx-auto flex w-full max-w-5xl flex-col px-4 py-4 md:px-6 lg:py-6">
          <div class="overflow-hidden rounded-[28px] border border-zinc-800 bg-black shadow-2xl shadow-black/30">
            <div class="relative aspect-video bg-black">
              <video
                v-if="videoUrl"
                ref="videoElement"
                :key="videoUrl"
                :src="videoUrl"
                :poster="currentEpisode?.chapterImg || undefined"
                controls
                autoplay
                playsinline
                preload="metadata"
                class="h-full w-full bg-black object-contain"
                @canplay="handleCanPlay"
                @play="handlePlay"
                @error="handleVideoError"
                @ended="playNext"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-zinc-900">
                <div v-if="episodesLoading" class="flex flex-col items-center gap-3 text-zinc-500">
                  <div class="h-10 w-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                  <span class="text-sm">Loading...</span>
                </div>
                <div v-else class="flex flex-col items-center gap-2 text-sm text-zinc-500">
                  <svg class="h-12 w-12 opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  <span>Video unavailable</span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="playbackMessage"
            class="mt-3 rounded-2xl border px-4 py-3 text-sm"
            :class="playbackState === 'error'
              ? 'border-rose-500/30 bg-rose-500/10 text-rose-100'
              : 'border-amber-400/30 bg-amber-400/10 text-amber-100'"
          >
            {{ playbackMessage }}
          </div>

          <div class="mt-4 rounded-[28px] border border-zinc-800 bg-zinc-950/90 p-5 shadow-xl shadow-black/20 md:p-6">
            <div class="flex items-start gap-4">
              <button
                @click="$router.back()"
                class="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 transition hover:border-zinc-600 hover:text-white"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div class="min-w-0 flex-1">
                <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Now playing</p>
                <h1 class="mt-2 text-lg font-semibold text-white md:text-xl">{{ book?.bookName }}</h1>
                <p class="mt-1 text-sm text-zinc-400">{{ currentEpisode?.chapterName || 'Loading episode...' }}</p>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap gap-3">
              <button
                v-if="prevEpisode"
                @click="goEpisode(prevEpisode.chapterId)"
                class="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                Prev
              </button>
              <button
                v-if="nextEpisode"
                @click="goEpisode(nextEpisode.chapterId)"
                class="theme-gradient-bg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:brightness-110"
              >
                Next
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <div v-if="subtitles.length > 1" class="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p class="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-500">Subtitles</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="sub in subtitles"
                :key="sub.captionLanguage"
                class="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium uppercase text-zinc-300"
              >
                {{ sub.captionLanguage === 'none' ? 'Off' : sub.captionLanguage }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <aside class="border-t border-zinc-800 bg-zinc-900 lg:min-h-[calc(100vh-56px)] lg:border-l lg:border-t-0">
        <div class="flex h-full flex-col">
          <div class="border-b border-zinc-800 px-4 py-4">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-sm font-semibold text-white">All Episodes</h2>
              <span class="text-xs text-zinc-500">{{ episodes?.length ?? 0 }} eps</span>
            </div>
            <p class="mt-1 text-xs text-zinc-500">Choose another episode without leaving the player.</p>
          </div>

          <div class="flex-1 overflow-y-auto lg:max-h-[calc(100vh-129px)]">
            <div v-if="episodesLoading" class="space-y-2 p-3">
              <div v-for="i in 10" :key="i" class="h-14 animate-pulse rounded-lg bg-zinc-800" />
            </div>
            <div v-else class="p-2">
              <button
                v-for="ep in episodes"
                :key="ep.chapterId"
                @click="goEpisode(ep.chapterId)"
                class="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-zinc-800"
                :class="ep.chapterId === chapterId ? 'bg-zinc-800 theme-accent-ring-soft' : ''"
              >
                <div class="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  <img
                    v-if="ep.chapterImg"
                    :src="ep.chapterImg"
                    :alt="ep.chapterName"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div v-else class="flex h-full w-full items-center justify-center">
                    <svg class="h-5 w-5 text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <div v-if="ep.chargeChapter || ep.isCharge === 1" class="absolute right-1 top-1 rounded bg-yellow-500 px-1 text-xs font-bold text-black">
                    VIP
                  </div>
                </div>

                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium" :class="ep.chapterId === chapterId ? 'theme-accent-text' : 'text-white'">
                    {{ ep.chapterName }}
                  </p>
                  <p v-if="ep.spriteSnapshotUrl" class="mt-0.5 text-xs text-zinc-500">Preview available</p>
                </div>

                <svg v-if="ep.chapterId === chapterId" class="theme-accent-text h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDetail } from '@/composables/useDetail';
import { useAllEpisode } from '@/composables/useAllEpisode';
import type { CdnItem, VideoPathItem } from '@/types/dramabox';

const route = useRoute();
const router = useRouter();

const bookId = computed(() => route.params.bookId as string);
const chapterId = computed(() => route.params.chapterId as string);

const videoElement = ref<HTMLVideoElement | null>(null);
const sourceIndex = ref(0);
const playbackState = ref<'idle' | 'blocked' | 'error'>('idle');
const playbackMessage = ref('');

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

type VideoCandidate = {
  url: string;
  quality: number;
  signed: boolean;
  isDefaultCdn: boolean;
  isDefaultVideo: boolean;
};

const videoCandidates = computed<VideoCandidate[]>(() => {
  if (!currentEpisode.value?.cdnList?.length) return [];

  const candidates = currentEpisode.value.cdnList.flatMap((cdn: CdnItem) =>
    (cdn.videoPathList ?? [])
      .filter((item: VideoPathItem) => item.videoPath)
      .map((item: VideoPathItem) => ({
        url: item.videoPath,
        quality: item.quality,
        signed: item.videoPath.includes('Signature=') || item.videoPath.includes('Key-Pair-Id='),
        isDefaultCdn: cdn.isDefault === 1,
        isDefaultVideo: item.isDefault === 1,
      }))
  );

  const uniqueCandidates = candidates.filter(
    (candidate, index, list) => list.findIndex((item) => item.url === candidate.url) === index
  );

  return uniqueCandidates.sort((left, right) => {
    const leftScore =
      (left.signed ? 100 : 0) +
      (left.isDefaultVideo ? 20 : 0) +
      (left.isDefaultCdn ? 10 : 0) +
      Math.min(left.quality, 1080) / 10;
    const rightScore =
      (right.signed ? 100 : 0) +
      (right.isDefaultVideo ? 20 : 0) +
      (right.isDefaultCdn ? 10 : 0) +
      Math.min(right.quality, 1080) / 10;

    return rightScore - leftScore;
  });
});

const videoUrl = computed(() => {
  return videoCandidates.value[sourceIndex.value]?.url ?? null;
});

const subtitles = computed(() =>
  currentEpisode.value?.subLanguageVoList?.filter((s) => s.url) ?? []
);

watch(videoCandidates, async (candidates) => {
  sourceIndex.value = 0;
  playbackState.value = 'idle';
  playbackMessage.value = '';

  if (!candidates.length) return;

  await nextTick();
  await attemptPlayback();
}, { immediate: true });

function goEpisode(id: string) {
  router.replace({ name: 'watch', params: { bookId: bookId.value, chapterId: id } });
}

function playNext() {
  if (nextEpisode.value) goEpisode(nextEpisode.value.chapterId);
}

async function attemptPlayback() {
  const player = videoElement.value;

  if (!player || !videoUrl.value) return;

  try {
    const playResult = player.play();
    if (playResult) await playResult;
  } catch (error) {
    if (isAutoplayBlocked(error)) {
      playbackState.value = 'blocked';
      playbackMessage.value = 'Autoplay was blocked by the browser. Press play to start this episode.';
      return;
    }

    tryNextSource();
  }
}

function handleCanPlay() {
  if (playbackState.value === 'error') return;
  if (playbackState.value === 'blocked') return;

  playbackState.value = 'idle';
  playbackMessage.value = '';
}

function handlePlay() {
  playbackState.value = 'idle';
  playbackMessage.value = '';
}

function handleVideoError() {
  tryNextSource();
}

function tryNextSource() {
  if (sourceIndex.value < videoCandidates.value.length - 1) {
    sourceIndex.value += 1;
    playbackState.value = 'blocked';
    playbackMessage.value = `Trying another video source (${sourceIndex.value + 1}/${videoCandidates.value.length})...`;
    nextTick(() => {
      void attemptPlayback();
    });
    return;
  }

  playbackState.value = 'error';
  playbackMessage.value = buildVideoErrorMessage();
}

function buildVideoErrorMessage() {
  const error = videoElement.value?.error;

  switch (error?.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      return 'Playback was interrupted before the video could start.';
    case MediaError.MEDIA_ERR_NETWORK:
      return 'The video source responded, but the browser could not keep streaming it.';
    case MediaError.MEDIA_ERR_DECODE:
      return 'The browser received the file, but could not decode this video source.';
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'This video source is not supported by the browser.';
    default:
      return 'The browser could not start playback for this episode. Try another episode or reload the page.';
  }
}

function isAutoplayBlocked(error: unknown) {
  return error instanceof DOMException && error.name === 'NotAllowedError';
}
</script>
