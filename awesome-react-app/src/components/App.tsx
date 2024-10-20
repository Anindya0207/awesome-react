import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';
import { fetchData } from '../actions';
import { Flex1, FlexColumn, FlexRow } from '../Flex';
import { Button, Text } from '../BaseElements';
import TabExample from './Tabs/TabExample';

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const Fallback = () => <Text>Loading...</Text>;

const App: React.FC<Props> = (props) => {
  return <TabExample />;
};

const mapStateToProps = (state: any) => ({
  data: state.data,
});

const mapDispatchToProps = {
  fetchData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
