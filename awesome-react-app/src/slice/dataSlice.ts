import { fetchData } from '../actions';
import { asyncStatusTypes, createSliceWithAsync } from '../utils/actionCreator';

const initialState = {
  asyncStatus: 'INIT' as asyncStatusTypes,
  data: null,
  error: null,
};

const dataSlice = createSliceWithAsync('data', initialState, [fetchData]);

export default dataSlice.reducer;
