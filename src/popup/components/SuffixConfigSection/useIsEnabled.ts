import { useCallback, useEffect, useState } from 'react';
import { fetchFromStorage, saveToStorage } from '~/lib/storage';

type UseIsEnabledReturnType = {
  isEnabled: boolean;
  toggle: () => void;
};

export const useIsEnabled = (): UseIsEnabledReturnType => {
  const [isEnabled, setIsEnabled] = useState(true);

  const fetch = useCallback(async () => {
    const { isSuffixEnabled } = await fetchFromStorage(['isSuffixEnabled']);
    setIsEnabled(isSuffixEnabled);
  }, [setIsEnabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const toggle = useCallback(() => {
    const value = !isEnabled;
    setIsEnabled(value);
    saveToStorage('isSuffixEnabled', value);
  }, [isEnabled, setIsEnabled]);

  return { isEnabled, toggle };
};
