const t = chrome.i18n.getMessage;

export const SkipUserConfigSection: React.FC = () => {
  const skipUserLabel = t('skipUser');

  return (
    <section className="config-container">
      <label className="label">
        {skipUserLabel}
        <div className="inline-form">
          <input
            type="text"
            onSubmit={() => {
              console.info('submit');
            }}
          />
        </div>
      </label>
    </section>
  );
};
