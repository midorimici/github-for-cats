import { useCallback, useMemo, useState } from 'react';

const defaultUserNameSet = new Set(['github-actions']);

type UseSkipUsersReturnType = {
  userNames: string[];
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  deleteUserName: (name: string) => void;
};

export const useSkipUsers = (): UseSkipUsersReturnType => {
  const [userNameSet, setUserNameSet] = useState<Set<string>>(defaultUserNameSet);
  const userNames = useMemo(() => [...userNameSet], [userNameSet]);

  const addUserName = useCallback(
    (name: string) => {
      if (userNameSet.has(name)) {
        return;
      }

      setUserNameSet((prev) => {
        const newSet = new Set(prev);
        newSet.add(name);
        return newSet;
      });
    },
    [userNameSet, setUserNameSet]
  );

  const deleteUserName = useCallback(
    (name: string) => {
      if (!userNameSet.has(name)) {
        return;
      }

      setUserNameSet((prev) => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    },
    [userNameSet, setUserNameSet]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key !== 'Enter') {
        return;
      }

      const name = e.currentTarget.value;
      addUserName(name);
      e.currentTarget.value = '';
    },
    [addUserName]
  );

  return { userNames, handleKeyDown, deleteUserName };
};
