import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { Chapter } from '@/types/dramabox';
import type { Ref } from 'vue';

export const useAllEpisode = (bookId: Ref<string> | string) => {
  return useQuery({
    queryKey: ['allepisode', bookId],
    queryFn: async () => {
      const id = typeof bookId === 'object' ? bookId.value : bookId;
      const response = await api.get<Chapter[]>('/dramabox/allepisode', {
        params: { bookId: id },
      });
      return response.data;
    },
    enabled: typeof bookId === 'object' ? () => !!bookId.value : !!bookId,
    staleTime: 10 * 60 * 1000,
  });
};
