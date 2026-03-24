import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { Book } from '@/types/dramabox';
import type { Ref } from 'vue';

export const useDetail = (bookId: Ref<string> | string) => {
  return useQuery({
    queryKey: ['detail', bookId],
    queryFn: async () => {
      const id = typeof bookId === 'object' ? bookId.value : bookId;
      const response = await api.get<Book>('/dramabox/detail', {
        params: { bookId: id },
      });
      return response.data;
    },
    enabled: typeof bookId === 'object' ? () => !!bookId.value : !!bookId,
    staleTime: 10 * 60 * 1000,
  });
};
