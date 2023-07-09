import './styles.scss';

const t = chrome.i18n.getMessage;

export const RefreshAvatarImagesButtonSection: React.FC = () => {
  const buttonLabel = t('refreshAvatarImages');

  return (
    <section className="button-container">
      <button className="refresh-button">{buttonLabel}</button>
    </section>
  );
};
