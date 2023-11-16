import { useGenerateImage } from '../../Hooks/mutations';
import Button from '../Button';

function CreateImageForm({ className }: { className?: string }) {
  const { mutate: generateImage } = useGenerateImage();

  const createImage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const prompt = form.prompt.value;
    generateImage(prompt);
    form.reset();
  };
  return (
    <form onSubmit={createImage} className={className}>
      <label>
        What do you want to create?{' '}
        <input id="prompt" type="text" required className="text-black" />
      </label>
      <Button className="ml-4">Generate</Button>
    </form>
  );
}

export default CreateImageForm;
