import { anotherAsyncAction } from '../actions';
import { asyncStatusTypes, createSliceWithAsync } from '../utils/actionCreator';

const initialState = {
  asyncStatus: 'INIT' as asyncStatusTypes,
  data: null,
  error: null,
};

const anotherSlice = createSliceWithAsync('another', initialState, [
  anotherAsyncAction,
]);

export { anotherSlice };
export default anotherSlice.reducer;
