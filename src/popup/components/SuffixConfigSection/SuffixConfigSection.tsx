import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useFetchSuffix } from './useFetchSuffix';
import { useSaveSuffix } from './useSaveSuffix';
import { abSuffixKey, jaSuffixKey } from '../../../lib/storage';

const t = chrome.i18n.getMessage;

export const SuffixConfigSection: React.FC = () => {
  const suffixLabel = t('suffix');
  const abLabel = t('alphabets');
  const jaLabel = t('japanese');

  const [abSuffix, setAbSuffix] = useState<string>('');
  const [jaSuffix, setJaSuffix] = useState<string>('');
  useFetchSuffix(setAbSuffix, setJaSuffix);

  return (
    <section className="config-container">
      {suffixLabel}
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
        <input type="text" defaultValue={suffix} onBlur={handleBlur} />
        <div className="icon-container">
          {isShowingDoneIcon && <FontAwesomeIcon icon={faCheck} />}
        </div>
      </div>
    </label>
  );
};
