import { Backdrop, CircularProgress } from '@mui/material';

interface Props {
	open?: boolean;
}

export default function TLoadingUI({ open = true }: Props) {
	return (
		<div>
			<Backdrop
				sx={{ color: '#FFF', zIndex: (theme) => theme.zIndex.modal + 1 }}
				open={open}
			>
				<div style={{ marginRight: '15px' }} />
				<CircularProgress color='inherit' />
			</Backdrop>
		</div>
	);
}
