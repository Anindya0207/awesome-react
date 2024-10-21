import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const fetchData = createAsyncThunk('data/fetchData', api.fetchData);
