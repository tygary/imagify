export interface ImageObject {
  jobId: string;
  prompt: string;
  isPending: boolean;
  dateCreated: Date;
  url?: string;
}

export interface UpdatedImagesResponse {
  remaining: number;
  updated: ImageObject[];
}

export const getImages = async (): Promise<ImageObject[]> => {
  return fetch('/api/images/all').then(res => res.json());
};

export const updatePendingImages = async (): Promise<UpdatedImagesResponse> => {
  return fetch('/api/images/updatePending').then(res => res.json());
};

export const generateImage = async (prompt: string): Promise<ImageObject> => {
  return fetch('/api/images/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  }).then(res => res.json());
};
