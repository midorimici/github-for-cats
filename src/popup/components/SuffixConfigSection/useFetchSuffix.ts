import { useCallback, useEffect } from 'react';
import { fetchFromStorage } from '~/lib/storage';

type SetSuffix = (suffix: string) => void;

export const useFetchSuffix = (setAbSuffix: SetSuffix, setJaSuffix: SetSuffix): void => {
  const fetch = useCallback(() => {
    fetchFromStorage(['abSuffix', 'jaSuffix']).then(({ abSuffix, jaSuffix }) => {
      setAbSuffix(abSuffix);
      setJaSuffix(jaSuffix);
    });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);
};
