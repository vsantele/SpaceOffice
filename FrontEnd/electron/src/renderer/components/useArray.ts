import { useCallback, useState } from 'react';

export default function useArray<T>(initialValues: T[] = []) {
  const [items, setItems] = useState<T[]>(initialValues);

  const addItem = useCallback((item: T) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const updateItem = useCallback((item: T) => {
    setItems((prev) => {
      const newItems = [...prev];
      const index = indexOf(prev, item);
      if (index >= 0) {
        newItems[index] = item;
      }
      return newItems;
    });
  }, []);

  const removeItem = useCallback((item: T) => {
    setItems((state) => {
      const newItems = [...state];
      const index = indexOf(state, item);
      if (index >= 0) {
        newItems.splice(index, 1);
      }
      return newItems;
    });
  }, []);

  const indexOf = (beds: T[], bed: T) => {
    return beds.indexOf(bed);
  };

  return {
    items,
    setItems,
    addItem,
    updateItem,
    removeItem,
  } as const;
}
