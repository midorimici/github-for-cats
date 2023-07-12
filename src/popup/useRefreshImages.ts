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
    const [tab] = await ct.query({ active: true, currentWindow: true });
    if (tab !== undefined && tab.id !== undefined) {
      const res = await ct.sendMessage<string, boolean>(tab.id, 'refreshImages');
      if (!res) {
        console.error('refreshImages failed');
      }
    }
  }, []);

  return { isLoading, handleClickRefreshButton };
};
