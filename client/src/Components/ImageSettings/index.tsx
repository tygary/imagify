import { useEffect, useState } from 'react';
import { useImageSettingsStore } from '../../Store/ImageSettingsStore';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';
import Gear from '../Icons/Gear';

export default function ImageSettings() {
  const { width, height, setHeight, setWidth } = useImageSettingsStore();
  const [widthState, setWidthState] = useState<any>(width);
  const [heightState, setHeightState] = useState<any>(height);

  const updateStore = () => {
    setWidth(parseInt(widthState ?? width));
    setHeight(parseInt(heightState ?? height));
  };

  useEffect(() => {
    setWidthState(width);
    setHeightState(height);
    return () => {
      setWidth(parseInt(widthState ?? width));
      setHeight(parseInt(heightState ?? height));
    };
  }, [width, height]);
  return (
    <Dialog>
      <DialogTrigger>
        <Gear />
      </DialogTrigger>
      <DialogContent>
        <form className="flex flex-col gap-4 p-4 pb-8 align-middle">
          <h2 className="text-xl">Image Generation Settings</h2>
          <label className="flex gap-4 justify-center">
            <span className="text-right w-[20%]">Width:</span>{' '}
            <input
              type="number"
              id="width"
              className="text-black text-right"
              value={widthState}
              onChange={event => {
                setWidthState(event.target.value);
              }}
              onBlur={updateStore}
            />
          </label>
          <label className="flex gap-4 justify-center">
            <span className="text-right w-[20%]">Height:</span>
            <input
              type="number"
              id="height"
              className="text-black text-right"
              value={heightState}
              onChange={event => {
                setHeightState(event.target.value);
              }}
              onBlur={updateStore}
            />
          </label>
        </form>
      </DialogContent>
    </Dialog>
  );
}
