import { configureStore } from '@reduxjs/toolkit';
import appConfigReducer from './appConfig';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer
  },
})