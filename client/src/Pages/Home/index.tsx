import { useEffect } from 'react';
import Image from '../../Components/Image';
import { useImages } from '../../Hooks/queries';
import { useUpdatePendingImages } from '../../Hooks/mutations';
import Header from '../../Components/Header';

function Home() {
  const { data: images } = useImages();
  const { mutate: updatePendingImages } = useUpdatePendingImages();

  useEffect(() => {
    if (images && images.length > 0) {
      const pendingImages = images?.filter(image => image.isPending);
      if (pendingImages.length > 0) {
        const interval = setInterval(updatePendingImages, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [images, updatePendingImages]);

  return (
    <div className="flex flex-col h-full">
      <Header className="h-[100px]" />
      <div className="overflow-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 overflow-auto">
          {images && images.length > 0 ? (
            images.map(image => {
              return <Image image={image} key={image.jobId} />;
            })
          ) : (
            <p>No images found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
