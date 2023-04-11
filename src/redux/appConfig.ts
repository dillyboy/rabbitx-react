import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  selectedCurrency: {
    currency: 'USD',
    symbol: '$'
  },
  lastFetch: Date.now(),
  loading: false,
  data: []
}

const URL = 'http://localhost:3000';

export const fetchListings = createAsyncThunk('fetchListings', async (currency: string) => {
  try {
    console.log(currency);
    const response = await axios.get(`${URL}/listings?convert=${currency}`)
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    updateSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    updateLastFetch: (state, action) => {
      state.lastFetch = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListings.pending, (state, action) => {
      state.loading = true;
    }),
    builder.addCase(fetchListings.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload.data;
      state.loading = false;
    })
  },
})

export const { updateSelectedCurrency, updateLastFetch } = appConfigSlice.actions

export default appConfigSlice.reducer