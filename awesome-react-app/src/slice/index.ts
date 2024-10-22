import { combineReducers } from 'redux';
import dataSliceReducer from './dataSlice';

const reducers = combineReducers({
  dataSliceReducer,
});

export default reducers;
