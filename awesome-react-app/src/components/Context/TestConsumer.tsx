import React from 'react';
import { useSomeContext } from './useSomeContext';
import { Text } from '../../BaseElements';

const TestConsumer: React.FC<{}> = () => {
  const { testVal } = useSomeContext();
  return <Text>Hello {testVal.name}</Text>;
};

export default TestConsumer;
