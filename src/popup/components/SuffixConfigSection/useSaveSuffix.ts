import { useCallback, useState, type FocusEventHandler } from 'react';
import { abSuffixKey, jaSuffixKey, saveToStorage } from '../../lib/storage';

type UseSaveSuffixReturnType = {
  handleBlur: FocusEventHandler<HTMLInputElement>;
  isShowingDoneIcon: boolean;
};

export const useSaveSuffix = (
  suffix: string,
  setSuffix: (suffix: string) => void,
  suffixKey: typeof abSuffixKey | typeof jaSuffixKey
): UseSaveSuffixReturnType => {
  const [isShowingDoneIcon, setIsShowingDoneIcon] = useState<boolean>(false);
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (value === suffix) {
        return;
      }

      clearTimeout(timeoutID);

      setSuffix(value);
      saveToStorage(suffixKey, value);

      setIsShowingDoneIcon(true);
      const id = setTimeout(() => {
        setIsShowingDoneIcon(false);
      }, 3000);
      setTimeoutID(id);
    },
    [suffix, setSuffix, suffixKey]
  );

  return {
    handleBlur,
    isShowingDoneIcon,
  };
};
