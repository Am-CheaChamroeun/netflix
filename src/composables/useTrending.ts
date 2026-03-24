import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { Book } from '@/types/dramabox';

export const useTrending = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const response = await api.get<Book[]>('/dramabox/trending');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
