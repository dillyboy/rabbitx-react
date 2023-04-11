import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';

export interface CurrencyType {
  symbol: string,
  sign: string
}

const initialState = {
  selectedCurrency: {
    symbol: 'USD',
    sign: '$'
  },
  lastFetch: Date.now(),
  loading: false,
  data: [],
  loadingDetails: true,
  details: 
  {
    id: '',
    name: '',
    symbol: '',
    cmc_rank: '',
    circulating_supply: 0,
    total_supply: 0,
    quote: null
  }
}

const URL = import.meta.env.VITE_API_URL;

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

export const getDetails = createAsyncThunk('getDetails', async ({slug, convert}: {slug: string, convert: string}) => {
  try {
    const response = await axios.get(`${URL}/getDetails?slug=${slug}&convert=${convert}`)
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
      state.data = [];
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

    builder.addCase(getDetails.pending, (state, action) => {
      state.loadingDetails = true;
    }),
    builder.addCase(getDetails.fulfilled, (state, action) => {
      const key = Object.keys(action.payload.data)[0];
      state.details = action.payload.data[key];
      state.loadingDetails = false;
    })
  },
})

export const { updateSelectedCurrency, updateLastFetch } = appConfigSlice.actions

export default appConfigSlice.reducer