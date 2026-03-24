import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { RandomDrama } from '@/types/dramabox';

export const useRandomDrama = () => {
  return useQuery({
    queryKey: ['randomdrama'],
    queryFn: async () => {
      const response = await api.get<RandomDrama[]>('/dramabox/randomdrama');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
