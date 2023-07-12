import { useCallback, useEffect, useMemo, useState } from 'react';
import { StorageData, fetchFromStorage, saveToStorage } from '~/lib/storage';

type ListKey = {
  [Key in keyof StorageData]: StorageData[Key] extends string[] ? Key : never;
}[keyof StorageData];

type UseListReturnType = {
  list: string[];
  deleteItem: (item: string) => void;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
};

export const useList = (key: ListKey): UseListReturnType => {
  const [listItemSet, setListItemSet] = useState<Set<string>>(new Set());
  const list = useMemo(() => [...listItemSet], [listItemSet]);

  const fetch = useCallback(() => {
    fetchFromStorage([key]).then((value) => {
      setListItemSet(new Set(value[key]));
    });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    saveToStorage(key, list);
  }, [list]);

  const addItem = useCallback(
    (item: string) => {
      if (listItemSet.has(item)) {
        return;
      }

      setListItemSet((prev) => {
        const newSet = new Set(prev);
        newSet.add(item);
        return newSet;
      });
    },
    [listItemSet, setListItemSet]
  );

  const deleteItem = useCallback(
    (item: string) => {
      if (!listItemSet.has(item)) {
        return;
      }

      setListItemSet((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item);
        return newSet;
      });
    },
    [listItemSet, setListItemSet]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key !== 'Enter') {
        return;
      }

      const item = e.currentTarget.value;
      addItem(item);
      e.currentTarget.value = '';
    },
    [addItem]
  );

  return { list, deleteItem, handleKeyDown };
};
