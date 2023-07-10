import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

type CheckCircleProps = {
  isChecked: boolean;
};

export const CheckCircle: React.FC<CheckCircleProps> = ({ isChecked }) => {
  if (isChecked) {
    return <FontAwesomeIcon icon={faCheckCircle} color="green" aria-checked="true" />;
  }

  return <FontAwesomeIcon icon={faCircle} aria-checked="false" />;
};
