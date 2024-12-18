import React, { lazy, Suspense } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './App.css';
import { fetchData } from '../actions';
import { Text } from '../BaseElements';
import Spinner from './common/Spinner';

const Tabs = lazy(() => import('./Tabs'));
const Polling = lazy(() => import('./Polling'));
const TextInput = lazy(() => import('./TextInput'));
const ModalExample = lazy(() => import('./Modal'));
const StopWatch = lazy(() => import('./StopWatch'));
const TransferList = lazy(() => import('./TransferList'));
const SelectExample = lazy(() => import('./Select'));
const InfiniteScroll = lazy(() => import('./InfiniteScroll'));
const TestProdviderExample = lazy(() => import('./Context/TestProvider'));
const NestedCheckBox = lazy(() => import('./NestedCheckBox'));
const AutoComplete = lazy(() => import('./AutoComplete'));
const MenuApp = lazy(() => import('./MenuBar'));

// New Apps

const Jiraboard = lazy(() => import('./Jiraboard'));
const Pomodoro = lazy(() => import('./25-5'));
const AnalogClock = lazy(() => import('./AnalogClock'));
const DraggableGrid = lazy(() => import('./DraggableGrid'));
const TreeView = lazy(() => import('./FileTree'));
const Chessboard = lazy(() => import('./Chessboard'));
const Carousal = lazy(() => import('./Carousal'));
const ColorMeGame = lazy(() => import('./ColorMeGame'));
const TicTacToe = lazy(() => import('./TicTacToe'));
const SnakeGame = lazy(() => import('./SnakeGame'));
const Pagination = lazy(() => import('./Paginator'));
const NewHookExample = lazy(() => import('./NewHook'));
const LeetcodeCalendar = lazy(() => import('./LeetcodeCalendar'));

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const Fallback = () => <Text>Loading...</Text>;

const App: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<Spinner />}>
      <NewHookExample />
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
