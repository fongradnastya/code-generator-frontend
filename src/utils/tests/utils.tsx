import type { FC, PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { type RenderOptions, render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { type AppStore, type RootState, setupStore } from 'src/store';
import { authInitialState } from 'src/store/auth/state';
import { userInitialState } from 'src/store/user/state';
import { muiTheme } from 'src/theme/muiTheme';
import { type StrictOmit } from 'src/utils/types/strictOmit';

type RenderConfiguration = {

  /** Initial state. */
  readonly initialState?: RootState;

  /** Store. */
  readonly store?: AppStore;

  /** Initial route of the rendered component. */
  readonly initialRoute?: string;
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
    store = setupStore(initialState),
    initialRoute = '/',
    ...renderOptions
  }: RenderConfiguration = {},
) => {

  window.history.pushState({}, 'Test page', initialRoute);

  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  return {
    store,
    ...rtlRender(
      ui,
      {
        wrapper: Wrapper,
        ...renderOptions,
      },
    ),
  };
};

export * from '@testing-library/react';
