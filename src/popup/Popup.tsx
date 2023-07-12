import './styles.scss';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from '~/lib/i18n';
import { useRefreshImages } from './useRefreshImages';

export const Popup = () => {
  return <RefreshButton />;
};

const RefreshButton: React.FC = () => {
  const buttonLabel = t('refreshAvatarImages');

  const { isLoading, handleClickRefreshButton } = useRefreshImages();

  return (
    <button className="refresh-button" disabled={isLoading} onClick={handleClickRefreshButton}>
      {isLoading ? <FontAwesomeIcon pulse={true} icon={faSpinner} /> : buttonLabel}
    </button>
  );
};
