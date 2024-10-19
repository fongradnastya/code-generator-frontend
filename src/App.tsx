import { type FC, Suspense } from 'react';
import { Provider } from 'react-redux';

import { Loader } from './components/Loader';
import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { Header } from './components/Header';

import styles from './App.module.css';
import './theme';

/** The main app component. */
export const App: FC = () => (
  <Provider store={store}>
    <Suspense fallback={<Loader/>}>
      <div className={styles.main}>
        <Header/>
        <RootRouter />
      </div>
    </Suspense>
  </Provider>
);
