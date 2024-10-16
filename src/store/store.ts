import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { drawerSlice } from './drawer/slice';

/** The Redux store of the application. */
export const store = configureStore({
  reducer: {
    drawer: drawerSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

/** Type definition for the state of the Redux store. */
export type RootState = ReturnType<typeof store.getState>;

/** Type definition for the dispatch function of the Redux store. */
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

/**  Typed `useSelector` hook. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
