import { t } from '~/lib/i18n';
import { AvatarImageReplacementSection } from './components/domain/AvatarImageReplacementSection';
import { SuffixConfigSection } from './components/domain/SuffixConfigSection';
import './popup.scss';

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
