import { combineReducers } from 'redux';
import dataSliceReducer from './dataSlice';
import anotherActionReducer from './anotherSlice';

const reducers = combineReducers({
  dataSliceReducer,
  anotherActionReducer,
});

export default reducers;
