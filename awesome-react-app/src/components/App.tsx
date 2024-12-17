import React, { useEffect, Suspense } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';
import { Text } from '../BaseElements';
import { fetchData } from '../actions';
import Spinner from './common/Spinner';

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const App: React.FC<Props> = (props) => {
  return <Suspense fallback={<Spinner />}></Suspense>;
};

const mapStateToProps = (state: any) => ({
  data: state.data,
});

const mapDispatchToProps = {
  fetchData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
