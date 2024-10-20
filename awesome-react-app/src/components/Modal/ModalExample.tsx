import React, { useState } from 'react';
import { Flex1 } from '../../Flex';

const TabExample: React.FC<{}> = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  return <Flex1 flexDirection="column"></Flex1>;
};

export default TabExample;
