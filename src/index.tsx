import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../src/locales/i18n';
import App from './App';
import MessageBox from './components/common/MessageBox';
import TLoading from './components/common/TLoading/TLoading';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TLoading />
          <MessageBox />
          <CssBaseline />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
