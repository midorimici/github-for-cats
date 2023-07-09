const storage = chrome.storage.local;

type Keys<T> = Record<string, T>;

export const fetchFromStorage = async <T>(keys: Keys<T>): Promise<Keys<T>> => {
  return await storage.get(keys);
};
