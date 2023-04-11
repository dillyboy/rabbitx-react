import { configureStore } from '@reduxjs/toolkit';
import appConfigReducer from './appConfig';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;