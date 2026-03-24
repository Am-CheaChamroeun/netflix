import { useQuery } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { Book, DubindoClassify } from '@/types/dramabox';
import type { Ref } from 'vue';

export const useDubindo = (
  classify: Ref<DubindoClassify> | DubindoClassify,
  page: Ref<number> | number
) => {
  return useQuery({
    queryKey: ['dubindo', classify, page],
    queryFn: async () => {
      const classifyVal = typeof classify === 'object' ? classify.value : classify;
      const pageVal = typeof page === 'object' ? page.value : page;
      const response = await api.get<Book[]>('/dramabox/dubindo', {
        params: { classify: classifyVal, page: pageVal },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
