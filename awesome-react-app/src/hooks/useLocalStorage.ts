import React, { useCallback, useEffect, useState } from 'react';

const useLocalStorage = (key: string) => {
  const [value, setCompValue] = useState<any>(null);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const val = JSON.parse(item);
        setCompValue(val);
      }
    } catch {
      console.warn('Could not set item');
    }
  }, []);

  useEffect(() => {
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {
      console.warn('Could not set item');
    }
  }, [key, value]);

  const setValue = useCallback((value: any) => {
    setCompValue(value);
  }, []);

  return [value, setValue];
};

export default useLocalStorage;
