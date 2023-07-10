import { useCallback, useState } from 'react';
import { removeFromStorage } from '~/lib/storage';

type UseRefreshImagesReturnType = {
  isLoading: boolean;
  handleClickRefreshButton: () => void;
};

export const useRefreshImages = (): UseRefreshImagesReturnType => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickRefreshButton = useCallback(async () => {
    setIsLoading(true);

    await removeFromStorage('avatarImages');
    await refreshImages();

    setIsLoading(false);
  }, [isLoading, setIsLoading]);

  const refreshImages = useCallback(async () => {
    const ct = chrome.tabs;
    const [tab] = await ct.query({ active: true, lastFocusedWindow: true });
    if (tab !== undefined && tab.id !== undefined && tab.url?.startsWith('https://github.com')) {
      await ct.sendMessage(tab.id, { refreshImages: true });
    }
  }, []);

  return { isLoading, handleClickRefreshButton };
};
