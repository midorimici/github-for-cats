import { t } from '~/lib/i18n';
import { List } from '~/options/components/shared/List';
import { useList } from '~/options/components/domain/hooks/useList';

export const SkipPagesSection: React.FC = () => {
  const skipPagesLabel = t('skipPages');
  const regexSupportedLabel = t('regexSupported');

  const { list: pages, handleKeyDown, deleteItem: deletePage } = useList('skipPages');

  return (
    <section className="config-container">
      <label className="label">
        {skipPagesLabel}
        <div className="inline-form">
          <input
            type="text"
            placeholder={regexSupportedLabel}
            maxLength={100}
            onKeyDown={handleKeyDown}
          />
        </div>
      </label>
      <List list={pages} deleteItem={deletePage} />
    </section>
  );
};
