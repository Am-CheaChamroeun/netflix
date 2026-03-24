import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { Book } from '@/types/dramabox';

export const useForYou = () => {
  return useQuery({
    queryKey: ['foryou'],
    queryFn: async () => {
      const response = await api.get<Book[]>('/dramabox/foryou');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
