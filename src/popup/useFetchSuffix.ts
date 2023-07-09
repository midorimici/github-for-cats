import { useCallback, useEffect } from 'react';

const storage = chrome.storage.local;

export const abSuffixKey = 'abSuffix';
export const jaSuffixKey = 'jaSuffix';
const defaultAbSuffix = 'nya';
const defaultJaSuffix = 'にゃ';

type SetSuffix = (suffix: string) => void;

export const useFetchSuffix = (setAbSuffix: SetSuffix, setJaSuffix: SetSuffix): void => {
  const fetch = useCallback(() => {
    storage.get({ [abSuffixKey]: defaultAbSuffix, [jaSuffixKey]: defaultJaSuffix }).then((val) => {
      setAbSuffix(val[abSuffixKey]);
      setJaSuffix(val[jaSuffixKey]);
    });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);
};
