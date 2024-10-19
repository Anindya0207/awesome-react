import { useState, useEffect } from 'react';

const useCustomHook = (initialValue: number) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Any effect logic here
  }, []);

  return [value, setValue] as const;
};

export default useCustomHook;
