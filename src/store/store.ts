import { combineReducers, configureStore, createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';
import { setGlobalDevModeChecks } from 'reselect';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createReduxSagaMiddleware from 'redux-saga';

import { authSlice } from './auth/slice';
import { rootSaga } from './rootSaga';
import { userSlice } from './user/slice';

// Never run the identity function check.
setGlobalDevModeChecks({ identityFunctionCheck: 'never' });

const createSagaMiddleware = () => createReduxSagaMiddleware();
const immutableStateInvariantMiddleware = createImmutableStateInvariantMiddleware();

const reducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

/**
 * Setups user store.
 * @param initialState User initial state.
 */
export const setupStore = (initialState?: RootState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, thunk: false })
      .concat(sagaMiddleware, immutableStateInvariantMiddleware),
    preloadedState: initialState,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

/** Root state. */
export type RootState = ReturnType<typeof reducer>;

/** App store. */
export type AppStore = ReturnType<typeof setupStore>;

/** App dispatcher. */
export type AppDispatch = AppStore['dispatch'];

/** App dispatch hook. */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** App selector hook. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
