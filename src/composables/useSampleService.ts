import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import api from '@/plugins/axios';
import type { Ref } from 'vue';

// Sample Types (adjust based on your API)
interface SampleItem {
  id: number;
  name: string;
  description: string;
  created_at?: string;
}

interface CreateSampleRequest {
  name: string;
  description: string;
}

interface UpdateSampleRequest {
  name?: string;
  description?: string;
}

/**
 * GET - Fetch all items
 * Example: /samples
 */
export const useSampleList = () => {
  return useQuery({
    queryKey: ['samples'],
    queryFn: async () => {
      const response = await api.get('/samples');
      return response.data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * GET - Fetch single item by ID
 * Example: /samples/123
 */
export const useSampleById = (id: Ref<number | string> | number | string) => {
  return useQuery({
    queryKey: ['samples', id],
    queryFn: async () => {
      const itemId = typeof id === 'object' ? id.value : id;
      const response = await api.get(`/samples/${itemId}`);
      return response.data;
    },
    enabled: !!id, // Only fetch if ID exists
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * POST - Create new item
 * Example: POST /samples
 */
export const useCreateSample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSampleRequest) => {
      const response = await api.post('/samples', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch samples list after creating
      queryClient.invalidateQueries({ queryKey: ['samples'] });
    },
  });
};

/**
 * PUT - Full update (replace entire resource)
 * Example: PUT /samples/123
 */
export const useUpdateSample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number | string;
      data: SampleItem;
    }) => {
      const response = await api.put(`/samples/${id}`, data);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate specific item and list
      queryClient.invalidateQueries({ queryKey: ['samples', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['samples'] });
    },
  });
};

/**
 * PATCH - Partial update (update specific fields)
 * Example: PATCH /samples/123
 */
export const usePatchSample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number | string;
      data: UpdateSampleRequest;
    }) => {
      const response = await api.patch(`/samples/${id}`, data);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate specific item and list
      queryClient.invalidateQueries({ queryKey: ['samples', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['samples'] });
    },
  });
};

/**
 * DELETE - Remove item
 * Example: DELETE /samples/123
 */
export const useDeleteSample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await api.delete(`/samples/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate list after deletion
      queryClient.invalidateQueries({ queryKey: ['samples'] });
    },
  });
};

// ============================================
// USAGE EXAMPLES IN COMPONENTS
// ============================================

/*
// 1. GET ALL - Fetch list of samples
const { data, isLoading, error } = useSampleList();

// 2. GET ONE - Fetch single sample by ID
const sampleId = ref(123);
const { data, isLoading } = useSampleById(sampleId);

// 3. POST - Create new sample
const { mutate: createSample, isPending } = useCreateSample();

const handleCreate = () => {
  createSample(
    {
      name: 'New Sample',
      description: 'Sample description',
    },
    {
      onSuccess: (data) => {
        console.log('Created:', data);
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    }
  );
};

// 4. PUT - Full update
const { mutate: updateSample } = useUpdateSample();

const handleUpdate = () => {
  updateSample({
    id: 123,
    data: {
      id: 123,
      name: 'Updated Name',
      description: 'Updated description',
    },
  });
};

// 5. PATCH - Partial update
const { mutate: patchSample } = usePatchSample();

const handlePatch = () => {
  patchSample({
    id: 123,
    data: {
      name: 'Only update name', // Only send fields to update
    },
  });
};

// 6. DELETE - Remove item
const { mutate: deleteSample, isPending: isDeleting } = useDeleteSample();

const handleDelete = (id: number) => {
  if (confirm('Are you sure?')) {
    deleteSample(id, {
      onSuccess: () => {
        console.log('Deleted successfully');
      },
    });
  }
};
*/
