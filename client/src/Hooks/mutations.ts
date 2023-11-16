import { useMutation, useQueryClient } from 'react-query';
import { ImageObject, UpdatedImagesResponse } from '../Services/api';

export const useGenerateImage = () => {
  const client = useQueryClient();
  return useMutation(
    ({
      prompt,
      width,
      height,
    }: {
      prompt: string;
      width: number;
      height: number;
    }) =>
      fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, width, height }),
      }).then(res => res.json() as Promise<ImageObject>),
    {
      onSuccess: (data: ImageObject) => {
        client.getQueryData<ImageObject[]>('images')?.push(data);
        client.invalidateQueries('images');
      },
    }
  );
};

export const useUpdatePendingImages = () => {
  const client = useQueryClient();
  return useMutation(
    () =>
      fetch('/api/images/updatePending').then(
        res => res.json() as Promise<UpdatedImagesResponse>
      ),
    {
      onSuccess: (data: UpdatedImagesResponse) => {
        if (data.updated.length > 0) {
          client.invalidateQueries('images');
        }
      },
    }
  );
};
