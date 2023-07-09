import { useCallback, useEffect } from 'react';
import { fetchFromStorage } from '../../lib/storage';

export const abSuffixKey = 'abSuffix';
export const jaSuffixKey = 'jaSuffix';
const defaultAbSuffix = 'nya';
const defaultJaSuffix = 'にゃ';

type SetSuffix = (suffix: string) => void;

export const useFetchSuffix = (setAbSuffix: SetSuffix, setJaSuffix: SetSuffix): void => {
  const fetch = useCallback(() => {
    fetchFromStorage({ [abSuffixKey]: defaultAbSuffix, [jaSuffixKey]: defaultJaSuffix }).then(
      (val) => {
        setAbSuffix(val[abSuffixKey]);
        setJaSuffix(val[jaSuffixKey]);
      }
    );
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);
};
