import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { Book } from '@/types/dramabox';

export const useLatest = () => {
  return useQuery({
    queryKey: ['latest'],
    queryFn: async () => {
      const response = await api.get<Book[]>('/dramabox/latest');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
