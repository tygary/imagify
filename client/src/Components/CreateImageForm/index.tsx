import clsx from 'clsx';
import { useGenerateImage } from '../../Hooks/mutations';
import Button from '../Button';
import ImageSettings from '../ImageSettings';
import { useImageSettingsStore } from '../../Store/ImageSettingsStore';

function CreateImageForm({ className }: { className?: string }) {
  const { mutate: generateImage } = useGenerateImage();
  const { width, height } = useImageSettingsStore();

  const createImage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const prompt = form.prompt.value;
    generateImage({ prompt, width, height });
    form.reset();
  };
  return (
    <div className={clsx('flex gap-4', className)}>
      <form onSubmit={createImage}>
        <label>
          What do you want to create?{' '}
          <input id="prompt" type="text" required className="text-black" />
        </label>
        <Button className="ml-4">Generate</Button>
      </form>
      <ImageSettings />
    </div>
  );
}

export default CreateImageForm;
