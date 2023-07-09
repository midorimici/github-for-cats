const storage = chrome.storage.local;

export const abSuffixKey = 'abSuffix';
export const jaSuffixKey = 'jaSuffix';
const skipUsersKey = 'skipUsers';
const avatarImagesKey = 'avatarImages';

const defaultAbSuffix = 'nya';
const defaultJaSuffix = 'にゃ';
const defaultSkipUsers = ['github-actions(?:\\[bot\\])?'];
const defaultAvatarImages = {};

type StorageData = {
  [abSuffixKey]: string;
  [jaSuffixKey]: string;
  [skipUsersKey]: string[];
  [avatarImagesKey]: Record<string, string>;
};

const defaultValues: Readonly<StorageData> = {
  abSuffix: defaultAbSuffix,
  jaSuffix: defaultJaSuffix,
  skipUsers: defaultSkipUsers,
  avatarImages: defaultAvatarImages,
};

export const fetchFromStorage = async <T extends keyof StorageData>(
  keys: T[]
): Promise<Pick<StorageData, T>> => {
  let map: Record<string, StorageData[keyof StorageData]> = {};
  for (const k of keys) {
    map[k] = defaultValues[k];
  }

  return (await storage.get(map)) as Pick<StorageData, T>;
};

export const saveToStorage = <T extends keyof StorageData>(key: T, value: StorageData[T]) => {
  storage.set({ [key]: value });
};

export const removeFromStorage = async (key: keyof StorageData): Promise<void> => {
  return await storage.remove(key);
};
