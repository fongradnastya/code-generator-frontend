import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { type RenderOptions, render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import { type StrictOmit } from 'src/utils/types/strictOmit';
import { type AppStore, type RootState, setupStore } from 'src/store';
import { authInitialState } from 'src/store/auth/state';
import { userInitialState } from 'src/store/user/state';

type ExtendedRenderOptions = {

  /** Initial state. */
  readonly initialState?: RootState;

  /** Store. */
  readonly store?: AppStore;
} & StrictOmit<RenderOptions, 'queries'>;

/**
 * Render function that provides integration with Redux store.
 * @param ui React element.
 * @param config Store configuration.
 */
export const render = (
  ui: ReactElement,
  {
    initialState = {
      auth: authInitialState,
      user: userInitialState,
    },

    // Automatically create a store instance if no store was passed in
    store = setupStore(initialState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  // eslint-disable-next-line arrow-body-style
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
};
