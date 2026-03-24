import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { VipResponse } from '@/types/dramabox';

export const useVip = () => {
  return useQuery({
    queryKey: ['vip'],
    queryFn: async () => {
      const response = await api.get<VipResponse>('/dramabox/vip');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
