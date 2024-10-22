import React from 'react';
import { TestProvider } from './useSomeContext';
import TestConsumer from './TestConsumer';

const TestProdviderExample: React.FC<{}> = () => {
  return (
    <TestProvider testVal={{ id: 1, name: 'Anindya' }}>
      <TestConsumer />
    </TestProvider>
  );
};

export default TestProdviderExample;
