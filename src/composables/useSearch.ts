import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { SearchResult } from '@/types/dramabox';
import type { Ref } from 'vue';

export const useSearch = (query: Ref<string> | string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const q = (typeof query === 'object' ? query.value : query).trim();
      const response = await api.get<SearchResult[]>('/dramabox/search', {
        params: { query: q },
      });
      return response.data;
    },
    enabled: typeof query === 'object' ? () => !!query.value.trim() : !!query.trim(),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });
};
