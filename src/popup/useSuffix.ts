import { useCallback, useEffect, useState } from 'react';

const storage = chrome.storage.local;

type UseSuffixReturnType = {
  suffix: string;
};

export const useSuffix = (): UseSuffixReturnType => {
  const [suffix, setSuffix] = useState<string>('');

  const fetch = useCallback(() => {
    storage.get({ suffix: chrome.i18n.getMessage('defaultSuffix') }).then((val) => {
      setSuffix(val.suffix);
    });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { suffix };
};
