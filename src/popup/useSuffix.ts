import { useCallback, useEffect, useState, type FocusEventHandler, type FocusEvent } from 'react';

const storage = chrome.storage.local;
const suffixKey = 'suffix';

type UseSuffixReturnType = {
  suffix: string;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  isShowingDoneIcon: boolean;
};

export const useSuffix = (): UseSuffixReturnType => {
  const [suffix, setSuffix] = useState<string>('');
  const [isShowingDoneIcon, setIsShowingDoneIcon] = useState<boolean>(false);

  const fetch = useCallback(() => {
    storage.get({ [suffixKey]: chrome.i18n.getMessage('defaultSuffix') }).then((val) => {
      setSuffix(val.suffix);
    });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === suffix) {
        return;
      }

      setSuffix(value);
      storage.set({ [suffixKey]: value });

      setIsShowingDoneIcon(true);
      setTimeout(() => {
        setIsShowingDoneIcon(false);
      }, 3000);
    },
    [suffix, setSuffix]
  );

  return { suffix, handleBlur, isShowingDoneIcon };
};
