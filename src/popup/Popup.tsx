import { useSuffix } from './useSuffix';
import './popup.scss';

const t = chrome.i18n.getMessage;

export const Popup = () => {
  const configLabel = t('configurations');
  const suffixLabel = t('suffix');
  const { suffix } = useSuffix();

  return (
    <div>
      <h1 className="title">{configLabel}</h1>
      <label className="label">
        {suffixLabel}
        <input type="text" defaultValue={suffix} />
      </label>
    </div>
  );
};
