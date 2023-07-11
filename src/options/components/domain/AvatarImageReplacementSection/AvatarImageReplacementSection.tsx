import { useIsEnabled } from '~/options/components/domain/hooks/useIsEnabled';
import { useList } from '~/options/components/domain/hooks/useList';
import { CheckCircle } from '~/options/components/shared/CheckCircle';
import { List } from '~/options/components/shared/List';
import { t } from '~/lib/i18n';

export const AvatarImageReplacementSection: React.FC = () => {
  const replaceImageLabel = t('replaceAvatarImages');
  const skipUserLabel = t('skipUser');
  const regexSupportedLabel = t('regexSupported');

  const { list: userNames, deleteItem: deleteUserName, handleKeyDown } = useList('skipUsers');

  const { isEnabled, toggle } = useIsEnabled('isAvatarImageReplacementEnabled');

  const sectionClassName = `config-container ${isEnabled ? 'active' : 'inactive'}`;

  return (
    <section className={sectionClassName}>
      <label className="config-title-container" onClick={toggle}>
        <CheckCircle isChecked={isEnabled} />
        {replaceImageLabel}
      </label>
      {isEnabled && (
        <>
          <label className="label">
            {skipUserLabel}
            <div className="inline-form">
              <input
                type="text"
                placeholder={regexSupportedLabel}
                maxLength={100}
                onKeyDown={handleKeyDown}
              />
            </div>
          </label>
          <List list={userNames} deleteItem={deleteUserName} />
        </>
      )}
    </section>
  );
};
