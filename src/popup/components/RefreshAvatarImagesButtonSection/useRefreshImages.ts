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

    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tab !== undefined && tab.id !== undefined && tab.url?.startsWith('https://github.com')) {
      await chrome.tabs.sendMessage(tab.id, { refreshImages: true });
    }

    setIsLoading(false);
  }, [isLoading, setIsLoading]);

  return { isLoading, handleClickRefreshButton };
};
