import { useCallback, useState, type FocusEventHandler } from 'react';

type UseSaveSuffixReturnType = {
  handleBlur: FocusEventHandler<HTMLInputElement>;
  isShowingDoneIcon: boolean;
};

export const useSaveSuffix = (
  suffix: string,
  setSuffix: (suffix: string) => void,
  suffixKey: string
): UseSaveSuffixReturnType => {
  const [isShowingDoneIcon, setIsShowingDoneIcon] = useState<boolean>(false);

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (value === suffix) {
        return;
      }

      setSuffix(value);
      chrome.storage.local.set({ [suffixKey]: value });

      setIsShowingDoneIcon(true);
      setTimeout(() => {
        setIsShowingDoneIcon(false);
      }, 3000);
    },
    [suffix, setSuffix, suffixKey]
  );

  return {
    handleBlur,
    isShowingDoneIcon,
  };
};
