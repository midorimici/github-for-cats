import { useSuffix } from './useSuffix';
import './popup.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const t = chrome.i18n.getMessage;

export const Popup = () => {
  const configLabel = t('configurations');
  const suffixLabel = t('suffix');
  const { suffix, handleBlur, isShowingDoneIcon } = useSuffix();

  return (
    <div>
      <h1 className="title">{configLabel}</h1>
      <label className="label">
        {suffixLabel}
        <div className="inline-form">
          <input type="text" defaultValue={suffix} onBlur={handleBlur} />
          <div className="icon-container">
            {isShowingDoneIcon && <FontAwesomeIcon icon={faCheck} />}
          </div>
        </div>
      </label>
    </div>
  );
};
