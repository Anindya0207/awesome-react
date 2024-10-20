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

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const Polling = lazy(() => import('./Polling'));
const TextInput = lazy(() => import('./TextInput'));

interface ImperativeProps {
  isValid: () => boolean;
  getValue: () => string;
}

const Fallback = () => <Text>Loading...</Text>;

const App: React.FC<Props> = (props) => {
  const [view, setView] = useState('');
  return (
    <Flex1 flexDirection="column">
      <FlexColumn flex={1}>
        <FlexRow justifyContent ="center" flex={1}>
          <Button onClick={() => setView('POLLING')}>Show Polling</Button>
          <Button onClick={() => setView('TEXT_INPUT')}>Show TextInoput</Button>
        </FlexRow>
      </FlexColumn>
      <FlexColumn my={30}>
        {view == 'POLLING' && (
          <Suspense fallback={<Fallback />}>
            <Polling
              baseUrl={'https://jsonplaceholder.typicode.com/posts'}
              frequency={3000}
            />
          </Suspense>
        )}
        {view == 'TEXT_INPUT' && (
          <Suspense fallback={<Fallback />}>
            <TextInput />
          </Suspense>
        )}
      </FlexColumn>
    </Flex1>
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
