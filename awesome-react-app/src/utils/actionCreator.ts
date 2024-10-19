import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type asyncStatusTypes = 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';

interface IAsyncState<T = any> {
  asyncStatus: asyncStatusTypes;
  data?: T;
  error?: string | null;
}

export function isInit<T extends IAsyncState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === 'INIT') return true;
  return false;
}
export function isLoading<T extends IAsyncState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === 'LOADING') return true;
  return false;
}
export function isSuccess<T extends IAsyncState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === 'SUCCESS') return true;
  return false;
}
export function isError<T extends IAsyncState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === 'ERROR') return true;
  return false;
}

// Utility to handle async actions
const handleAsyncActions = <T>(
  builder: any,
  thunk: any,
  transformer?: <V>(data: T) => V,
) => {
  builder
    .addCase(thunk.pending, (state: IAsyncState<T>) => {
      state.asyncStatus = 'LOADING';
      state.error = null;
    })
    .addCase(
      thunk.fulfilled,
      (state: IAsyncState<T>, action: PayloadAction<T>) => {
        state.asyncStatus = 'SUCCESS';
        state.data =
          transformer && typeof transformer == 'function'
            ? transformer(action.payload)
            : action.payload;
      },
    )
    .addCase(
      thunk.rejected,
      (state: IAsyncState<T>, action: PayloadAction<any>) => {
        state.asyncStatus = 'ERROR';
        state.error = action.payload || 'Something went wrong';
      },
    );
};

// Reusable function for creating a slice with async actions
export const createSliceWithAsync = <T>(
  name: string,
  initialState: IAsyncState,
  asyncThunks: any[],
  transformer?: <V>(data: T) => V,
) => {
  return createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      asyncThunks.forEach((thunk) =>
        handleAsyncActions(builder, thunk, transformer),
      );
    },
  });
};
