export const Popup = () => {
  const configLabel = chrome.i18n.getMessage('configurations');

  return <h1>{configLabel}</h1>;
};
