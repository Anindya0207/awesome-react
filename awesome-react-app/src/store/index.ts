import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../slice';
const { createLogger } = require('redux-logger');

const logger = createLogger({
  collapsed: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
  // preloadedState: {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
