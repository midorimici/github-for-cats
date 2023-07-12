import './styles.scss';
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
        <Description />
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

const Description: React.FC = () => {
  const skipPagesDescription = t('skipPagesDesc', [
    '^https://github.com/',
    '.*settings',
    '^https://github.com/.*settings',
  ]);
  const [desc1, desc2] = skipPagesDescription.split('\n');

  return (
    <>
      <p className="description">{convertToElement(desc1)}</p>
      <p className="description">{convertToElement(desc2)}</p>
    </>
  );
};

const convertToElement = (text: string): JSX.Element => {
  const elements: JSX.Element[] = [];

  const matches = text.matchAll(/(.*?)<(.*?)>([^<]*)/g);
  for (const match of matches) {
    const element: JSX.Element = (
      <>
        {match[1]}
        <code>{match[2]}</code>
        {match[3]}
      </>
    );
    elements.push(element);
  }

  return <>{elements}</>;
};
