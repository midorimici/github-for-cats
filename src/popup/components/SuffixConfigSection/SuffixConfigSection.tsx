import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { useFetchSuffix } from './useFetchSuffix';
import { useSaveSuffix } from './useSaveSuffix';
import { abSuffixKey, jaSuffixKey } from '~/lib/storage';
import './styles.scss';
import { useIsEnabled } from './useIsEnabled';

const t = chrome.i18n.getMessage;

export const SuffixConfigSection: React.FC = () => {
  const suffixLabel = t('suffix');
  const abLabel = t('alphabets');
  const jaLabel = t('japanese');

  const [abSuffix, setAbSuffix] = useState<string>('');
  const [jaSuffix, setJaSuffix] = useState<string>('');
  useFetchSuffix(setAbSuffix, setJaSuffix);

  const { isEnabled, toggle } = useIsEnabled();

  let Icon: () => JSX.Element;
  if (isEnabled) {
    Icon = () => <FontAwesomeIcon icon={faCheckCircle} color="green" aria-checked="true" />;
  } else {
    Icon = () => <FontAwesomeIcon icon={faCircle} aria-checked="false" />;
  }

  return (
    <section className="config-container">
      <label className="config-title-container" onClick={toggle}>
        <Icon />
        {suffixLabel}
      </label>
      {isEnabled && (
        <>
          <SuffixForm
            label={abLabel}
            suffix={abSuffix}
            setSuffix={setAbSuffix}
            suffixKey={abSuffixKey}
          />
          <SuffixForm
            label={jaLabel}
            suffix={jaSuffix}
            setSuffix={setJaSuffix}
            suffixKey={jaSuffixKey}
          />
        </>
      )}
    </section>
  );
};

type SuffixFormProps = {
  label: string;
  suffix: string;
  setSuffix: (suffix: string) => void;
  suffixKey: typeof abSuffixKey | typeof jaSuffixKey;
};

const SuffixForm: React.FC<SuffixFormProps> = ({ label, suffix, setSuffix, suffixKey }) => {
  const { handleBlur, isShowingDoneIcon } = useSaveSuffix(suffix, setSuffix, suffixKey);

  return (
    <label className="label">
      {label}
      <div className="inline-form">
        <input type="text" defaultValue={suffix} maxLength={100} onBlur={handleBlur} />
        <div className="icon-container">
          {isShowingDoneIcon && <FontAwesomeIcon icon={faCheck} />}
        </div>
      </div>
    </label>
  );
};
