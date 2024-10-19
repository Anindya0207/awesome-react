import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { anotherAsyncAction, fetchData } from '../actions';
type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const App: React.FC<Props> = (props) => {
  const { fetchData } = props;
  useEffect(() => {
    return () => {
      fetchData({ data: {} });
    };
  });
  return <div>Hey this is a cool React app made by Anindya</div>;
};

const mapStateToProps = (state: any) => ({
  data: state.data,
  asyncStatus: state.data,
});

const mapDispatchToProps = {
  fetchData,
  anotherAsyncAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
