import { useQuery } from 'react-query';
import { ImageObject } from '../Services/api';

export const useImages = () =>
  useQuery(['images'], () =>
    fetch('/api/images/all').then(res => res.json() as Promise<ImageObject[]>)
  );
