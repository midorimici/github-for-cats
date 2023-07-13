import './styles.scss';
import { t } from '~/lib/i18n';
import type { AnimalOption } from '~/lib/storage';
import { useAnimalChoice } from './useAnimalChoice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons';

export const AnimalChoiceSection: React.FC = () => {
  const displayedAnimalLabel = t('displayedAnimal');
  const catLabel = t('cat');
  const dogLabel = t('dog');

  const { animal, handleChangeOption } = useAnimalChoice();

  return (
    <section className="config-container">
      <fieldset className="radio-group">
        <legend>{displayedAnimalLabel}</legend>
        <RadioButton animal={animal} label={catLabel} value="cat" onChange={handleChangeOption} />
        <RadioButton animal={animal} label={dogLabel} value="dog" onChange={handleChangeOption} />
        <RadioButton
          animal={animal}
          label={`${catLabel} & ${dogLabel}`}
          value="both"
          onChange={handleChangeOption}
        />
      </fieldset>
    </section>
  );
};

type RadioButtonProps = {
  animal: AnimalOption;
  label: string;
  value: AnimalOption;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const RadioButton: React.FC<RadioButtonProps> = ({ animal, label, value, onChange }) => {
  const isChecked = animal === value;

  return (
    <label className="radio-container">
      <input
        className="radio-icon-hidden"
        type="radio"
        name="animal"
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <FontAwesomeIcon
        className="radio-icon"
        icon={isChecked ? faCircleDot : faCircle}
        aria-checked={isChecked}
      />
      {label}
    </label>
  );
};
