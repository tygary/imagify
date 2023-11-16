import { create } from 'zustand';

interface ImageSettings {
  width: number;
  height: number;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
}

export const useImageSettingsStore = create<ImageSettings>(set => ({
  width: 512,
  height: 512,
  setHeight: (height: number) => set(() => ({ height })),
  setWidth: (width: number) => set(() => ({ width })),
}));
