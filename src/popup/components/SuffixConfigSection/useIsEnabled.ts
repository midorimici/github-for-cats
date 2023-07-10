import { useCallback, useState } from 'react';

type UseIsEnabledReturnType = {
  isEnabled: boolean;
  toggle: () => void;
};

export const useIsEnabled = (): UseIsEnabledReturnType => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggle = useCallback(() => {
    setIsEnabled((prev) => !prev);
  }, [setIsEnabled]);

  return { isEnabled, toggle };
};
