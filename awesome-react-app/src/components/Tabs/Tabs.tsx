

import React from 'react';
import { Flex1, FlexColumn } from '../../Flex';
import { Box, Text } from '../../BaseElements';

interface TabsProps {
  activeTab: number;
  onChangeTab: (activeTab: number) => void;
  children: [React.ReactNode, React.ReactNode];
}

interface TabType {
  Headers: typeof TabHeaders;
  Header: typeof TabHeader;
  Body: typeof TabBody;
}

interface TabHeadersProps {
  activeTab?: number;
  onChangeTab?: (activeTab: number) => void;
  children: React.ReactNode[];
}
interface TabHeaderProps {
  children: React.ReactNode;
  isActive?: boolean;
}
interface TabBodyProps {
  children: React.ReactNode;
}

const TabHeader: React.FC<TabHeaderProps> = (props) => {
  const { children, isActive } = props;
  return (
    <FlexColumn
      width={100}
      alignItems="center"
      height={30}
      pr={2}
      borderBottom={isActive ? '2px solid #000' : '1px solid #ddd'}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </FlexColumn>
  );
};

const TabHeaders: React.FC<TabHeadersProps> = (props) => {
  const { children, activeTab, onChangeTab } = props;
  if (
    Array.isArray(children) &&
    children.every((ch: any) => ch.type === TabHeader)
  ) {
    return (
      <Flex1 flexDirection="row">
        {children.map((ch: any, index) => (
          <FlexColumn
            key={`tabheader-${index}`}
            width={100}
            alignItems="center"
            onClick={() =>
              typeof onChangeTab == 'function' && onChangeTab(index)
            }
          >
            {React.cloneElement(ch, { isActive: activeTab == index })}
          </FlexColumn>
        ))}
      </Flex1>
    );
  }
  return null;
};

const TabBody: React.FC<TabBodyProps> = (props) => {
  const { children } = props;
  return (
    <FlexColumn flex={1} my={20}>
      {children}
    </FlexColumn>
  );
};

const Tabs: React.FC<TabsProps> & TabType = (props) => {
  const { children, activeTab = 0, onChangeTab } = props;
  if (
    Array.isArray(children) &&
    children.length == 2 &&
    (children[0] as any)?.type === TabHeaders &&
    (children[1] as any)?.type === TabBody
  ) {
    return (
      <Flex1 flexDirection="column">
        <Flex1 flexDirection="row">
          {React.cloneElement(children[0] as any, { activeTab, onChangeTab })}
        </Flex1>
        <Flex1>{children[1]}</Flex1>
      </Flex1>
    );
  }

  return null;
};

Tabs.Headers = TabHeaders;
Tabs.Header = TabHeader;
Tabs.Body = TabBody;

export default Tabs;
