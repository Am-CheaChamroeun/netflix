import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { Book } from '@/types/dramabox';

export const usePopulerSearch = () => {
  return useQuery({
    queryKey: ['populersearch'],
    queryFn: async () => {
      const response = await api.get<Book[]>('/dramabox/populersearch');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
