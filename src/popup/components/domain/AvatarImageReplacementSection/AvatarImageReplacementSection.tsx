import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSkipUsers } from './useSkipUsers';
import React from 'react';
import { useIsEnabled } from '~/popup/components/domain/hooks/useIsEnabled';
import { CheckCircle } from '~/popup/components/shared/CheckCircle';
import { useRefreshImages } from './useRefreshImages';
import { t } from '~/lib/i18n';

export const AvatarImageReplacementSection: React.FC = () => {
  const replaceImageLabel = t('replaceAvatarImages');
  const skipUserLabel = t('skipUser');
  const regexSupportedLabel = t('regexSupported');

  const { userNames, handleKeyDown, deleteUserName } = useSkipUsers();

  const { isEnabled, toggle } = useIsEnabled('isAvatarImageReplacementEnabled');

  return (
    <section className="config-container">
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
          <UserNameList userNames={userNames} deleteUserName={deleteUserName} />
          <RefreshButton />
        </>
      )}
    </section>
  );
};

type UserNameListProps = {
  userNames: string[];
  deleteUserName: (name: string) => void;
};

const UserNameList: React.FC<UserNameListProps> = ({ userNames, deleteUserName }) => {
  return (
    <div className="username-list">
      {userNames.map((userName: string) => (
        <UserName name={userName} onDelete={() => deleteUserName(userName)} />
      ))}
    </div>
  );
};

type UserNameProps = {
  name: string;
  onDelete: () => void;
};

const UserName: React.FC<UserNameProps> = ({ name, onDelete }) => {
  return (
    <span className="username-item">
      {name}
      <FontAwesomeIcon cursor="pointer" icon={faClose} onClick={onDelete} />
    </span>
  );
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
