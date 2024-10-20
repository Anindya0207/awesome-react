import React, { useCallback, useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';
import { fetchData } from '../actions';
import { Flex1, FlexColumn } from '../Flex';
import { Button, Text } from '../BaseElements';
import TextInputWrapper from './TextInput';
import useLocalStorage from '../hooks/useLocalStorage';

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

interface ImperativeProps {
  isValid: () => boolean;
  getValue: () => string;
}
const App: React.FC<Props> = (props) => {
  const [value, setValue] = useLocalStorage('someValue');
  useEffect(() => {
    console.log('LocalstorageUpdated', value);
  }, [value]);

  const changeLocalStorage = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setValue(random);
  };
  return (
    <Flex1>
      <FlexColumn>
        <Text py={4}> Hey this is an awesome app built by Anindya</Text>
        <Button onClick={changeLocalStorage}>Submit</Button>
      </FlexColumn>
    </Flex1>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.data,
  asyncStatus: state.data,
});

const mapDispatchToProps = {
  fetchData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
