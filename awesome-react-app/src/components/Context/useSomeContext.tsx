import React, { PropsWithChildren, useContext, useMemo } from 'react';

interface TestProps {
  testVal: any;
}
const TestContext = React.createContext<TestProps>({} as TestProps);

export const TestProvider: React.FC<PropsWithChildren & TestProps> = (
  props,
) => {
  const { testVal, children } = props;
  const contextVal = useMemo(() => ({ testVal }), [testVal]);

  return (
    <TestContext.Provider value={contextVal}>{children}</TestContext.Provider>
  );
};

export const useSomeContext = () => useContext(TestContext);
