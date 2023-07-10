import { AvatarImageReplacementSection } from './components/AvatarImageReplacementSection';
import { SuffixConfigSection } from './components/SuffixConfigSection';
import './popup.scss';

const t = chrome.i18n.getMessage;

export const Popup = () => {
  const configLabel = t('configurations');

  return (
    <div className="container">
      <h1 className="title">{configLabel}</h1>
      <SuffixConfigSection />
      <AvatarImageReplacementSection />
    </div>
  );
};
