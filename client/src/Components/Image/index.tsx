import clsx from 'clsx';
import { ImageObject } from '../../Services/api';
import Loading from '../Loading';
import * as RadixDialog from '@radix-ui/react-dialog';

function Image({
  image,
  className,
  ...rest
}: {
  image: ImageObject;
  className?: string;
}) {
  return (
    <div className={clsx(image.isPending && 'bg-app-bg1', className)} {...rest}>
      {image.isPending ? (
        <Loading className="flex justify-center content-center h-full w-full flex-wrap" />
      ) : (
        <RadixDialog.Root>
          <RadixDialog.Trigger>
            <img src={image.url} alt={image.prompt} />
          </RadixDialog.Trigger>
          <RadixDialog.Overlay className="dialog-overlay" />
          <RadixDialog.Content className="dialog">
            <RadixDialog.Close className="dialog-close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-app-text hover:text-app-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </RadixDialog.Close>
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
          </RadixDialog.Content>
        </RadixDialog.Root>
      )}
    </div>
  );
}

export default Image;
