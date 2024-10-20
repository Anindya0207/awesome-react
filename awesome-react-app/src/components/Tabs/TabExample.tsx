import React, { useState } from 'react';
import { Flex1 } from '../../Flex';
import Tabs from '.';

const TabExample: React.FC<{}> = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Flex1 flexDirection="column">
      <Tabs activeTab={activeTab} onChangeTab={(index) => setActiveTab(index)}>
        <Tabs.Headers>
          <Tabs.Header>Tab1</Tabs.Header>
          <Tabs.Header>Tab2</Tabs.Header>
          <Tabs.Header>Tab3</Tabs.Header>
        </Tabs.Headers>
        <Tabs.Body>
          {activeTab == 0 && <div>This is tab 1</div>}
          {activeTab == 1 && <div>This is tab 2</div>}
          {activeTab == 2 && <div>This is tab 3</div>}
        </Tabs.Body>
      </Tabs>
    </Flex1>
  );
};

export default TabExample;
