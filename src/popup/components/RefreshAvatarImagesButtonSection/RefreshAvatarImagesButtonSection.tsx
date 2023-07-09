import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';
import { useRefreshImages } from './useRefreshImages';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const t = chrome.i18n.getMessage;

export const RefreshAvatarImagesButtonSection: React.FC = () => {
  const buttonLabel = t('refreshAvatarImages');

  const { isLoading, handleClickRefreshButton } = useRefreshImages();

  return (
    <section className="button-container">
      <button className="refresh-button" disabled={isLoading} onClick={handleClickRefreshButton}>
        {isLoading ? <FontAwesomeIcon pulse={true} icon={faSpinner} /> : buttonLabel}
      </button>
    </section>
  );
};
