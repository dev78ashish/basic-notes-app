import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import { Apis } from "@/services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [Apis.reducerPath]: Apis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Apis.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
