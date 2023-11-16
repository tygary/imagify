import clsx from 'clsx';
import { ImageObject } from '../../Services/api';
import Loading from '../Loading';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';

function Image({
  image,
  className,
  ...rest
}: {
  image: ImageObject;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        image.isPending && 'bg-app-bg1',
        'hover:shadow-lg',
        className
      )}
      {...rest}
    >
      {image.isPending ? (
        <Loading className="flex justify-center content-center h-full w-full flex-wrap" />
      ) : (
        <Dialog>
          <DialogTrigger>
            <img src={image.url} alt={image.prompt} />
          </DialogTrigger>
          <DialogContent>
            <img src={image.url} alt={image.prompt} />
            <div className="m-4">
              <div>
                <span className="font-bold">Prompt:</span> {image.prompt}
              </div>
              <div>
                <span className="font-bold">Created:</span>{' '}
                {new Date(image.dateCreated).toLocaleString()}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Image;
