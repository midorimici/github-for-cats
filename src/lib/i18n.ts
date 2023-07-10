import data from '../../public/_locales/ja/messages.json';

export const t = (key: keyof typeof data): string => {
  return chrome.i18n.getMessage(key);
};
