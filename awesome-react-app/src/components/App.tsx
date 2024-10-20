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

const Tabs = lazy(() => import('./Tabs'));
const Polling = lazy(() => import('./Polling'));
const TextInput = lazy(() => import('./TextInput'));

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const Fallback = () => <Text>Loading...</Text>;

const App: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<Fallback />}>
      <Tabs />
    </Suspense>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.data,
});

const mapDispatchToProps = {
  fetchData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
