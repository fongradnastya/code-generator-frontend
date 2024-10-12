import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { setupStore } from './store';
import { muiTheme } from './theme/muiTheme';

const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Failed to find root element');
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
