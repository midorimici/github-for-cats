import { useCallback, useEffect, useState } from 'react';
import { type StorageData, saveToStorage, fetchFromStorage } from '~/lib/storage';

type BooleanKey = {
  [Key in keyof StorageData]: StorageData[Key] extends boolean ? Key : never;
}[keyof StorageData];

type UseIsEnabledReturnType = {
  isEnabled: boolean;
  toggle: () => void;
};

export const useIsEnabled = <T extends BooleanKey>(key: T): UseIsEnabledReturnType => {
  const [isEnabled, setIsEnabled] = useState(true);

  const fetch = useCallback(async () => {
    const value = await fetchFromStorage([key]);
    setIsEnabled(value[key]);
  }, [setIsEnabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const toggle = useCallback(() => {
    const value = !isEnabled;
    setIsEnabled(value);
    saveToStorage(key, value);
  }, [isEnabled, setIsEnabled]);

  return { isEnabled, toggle };
};
