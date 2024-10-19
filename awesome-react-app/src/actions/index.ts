import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const fetchData = createAsyncThunk('data/fetchData', api.fetchData);

export const anotherAsyncAction = createAsyncThunk(
  'data/anotherAsyncAction',
  api.anotherAction,
);
