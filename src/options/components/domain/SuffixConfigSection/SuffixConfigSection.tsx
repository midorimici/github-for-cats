import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useFetchSuffix } from './useFetchSuffix';
import { useSaveSuffix } from './useSaveSuffix';
import { t } from '~/lib/i18n';
import { abSuffixKey, jaSuffixKey } from '~/lib/storage';
import './styles.scss';
import { CheckCircle } from '~/options/components/shared/CheckCircle';
import { useIsEnabled } from '~/options/components/domain/hooks/useIsEnabled';

export const SuffixConfigSection: React.FC = () => {
  const suffixLabel = t('suffix');
  const abLabel = t('alphabets');
  const jaLabel = t('japanese');

  const [abSuffix, setAbSuffix] = useState<string>('');
  const [jaSuffix, setJaSuffix] = useState<string>('');
  useFetchSuffix(setAbSuffix, setJaSuffix);

  const { isEnabled, toggle } = useIsEnabled('isSuffixEnabled');

  return (
    <section className="config-container">
      <label className="config-title-container" onClick={toggle}>
        <CheckCircle isChecked={isEnabled} />
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
