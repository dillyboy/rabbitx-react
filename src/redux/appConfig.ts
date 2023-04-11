import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';

export interface CurrencyType {
  currency: string,
  symbol: string
}

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
    const response = await axios.get(`${URL}/listings?convert=${currency}`)
    return response.data;
  } catch (err: AxiosError | any)  {
    if (axios.isAxiosError(err))  {
      return err.message;
    } else {
      return err;
    }
  }
})

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    updateSelectedCurrency: (state, action: PayloadAction<CurrencyType>) => {
      state.selectedCurrency = action.payload;
    },
    updateLastFetch: (state, action: PayloadAction) => {
      state.lastFetch = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListings.pending, (state, action) => {
      state.loading = true;
    }),
    builder.addCase(fetchListings.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    })
  },
})

export const { updateSelectedCurrency, updateLastFetch } = appConfigSlice.actions

export default appConfigSlice.reducer