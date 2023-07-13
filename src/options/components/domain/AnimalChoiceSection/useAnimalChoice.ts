import { useCallback, useEffect, useState } from 'react';
import { type AnimalOption, fetchFromStorage, saveToStorage } from '~/lib/storage';

type UseAnimalChoiceReturnType = {
  animal: AnimalOption;
  handleChangeOption: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useAnimalChoice = (): UseAnimalChoiceReturnType => {
  const [animal, setAnimal] = useState<AnimalOption>('cat');

  const fetch = useCallback(async () => {
    const { animal: animalOption } = await fetchFromStorage(['animal']);
    setAnimal(animalOption);
  }, [setAnimal]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleChangeOption = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'cat':
      case 'dog':
      case 'both':
        break;

      default:
        console.warn('Invalid input value: ', value);
        return;
    }

    setAnimal(value);
    saveToStorage('animal', value);
  }, []);

  return { animal, handleChangeOption };
};
