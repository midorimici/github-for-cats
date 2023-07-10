import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useSkipUsers } from './useSkipUsers';
import React from 'react';
import { useIsEnabled } from '~/popup/components/hooks/useIsEnabled';
import { CheckCircle } from '~/popup/shared/CheckCircle';

const t = chrome.i18n.getMessage;

export const SkipUserConfigSection: React.FC = () => {
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
