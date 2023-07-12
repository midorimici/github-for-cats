import data from '../../public/_locales/ja/messages.json';

export const t = (key: keyof typeof data, args?: string[]): string => {
  return chrome.i18n.getMessage(key, args);
};
