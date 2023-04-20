import { Suspense } from 'react';
import './App.css';
import Layout from './layouts/Layout';
import ContainerRouter from './routes/ContainerRouter';
import { AuthenticationService } from './services/access/authenticationService';
import { setUserInfo } from './store/slices/userInfoSlice';
import { useAppDispatch } from './store/store';

function App() {
	const userInfo = AuthenticationService.getCurrentUser();
	const { isLogin } = userInfo;

	const dispatch = useAppDispatch();
	if (userInfo?.isLogin) {
		dispatch(setUserInfo(userInfo));
	}

	return (
		<Suspense fallback={isLogin ? <Layout /> : ''}>
			<ContainerRouter />
		</Suspense>
	);
}

export default App;
