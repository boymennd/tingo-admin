import { CssBaseline } from '@mui/material';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../src/locales/i18n';
import App from './App';
import MessageBox from './components/common/MessageBox';
import TLoading from './components/common/TLoading/TLoading';
import './index.css';
import Layout from './layouts/Layout';
import reportWebVitals from './reportWebVitals';
import ContainerRouter from './routes/ContainerRouter';
import store from './store/store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<TLoading />
				<MessageBox />
				<CssBaseline />
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
