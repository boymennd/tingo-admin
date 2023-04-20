import { useAppSelector } from '../../../store/store';
import TLoadingUI from './TLoadingUI';

export default function TLoading() {
	const loadingState = useAppSelector((state) => state.loading.state);

	return <TLoadingUI open={loadingState} />;
}
