import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb() {
	const { pathname } = useLocation();
	return (
		<div role='presentation' onClick={handleClick}>
			<Breadcrumbs aria-label='breadcrumb'>
				<Link underline='hover' color='inherit' href='/'>
					MUI
				</Link>
				<Link underline='hover' color='inherit' href={pathname}>
					pathname
				</Link>
				<Link
					underline='hover'
					color='text.primary'
					href='/material-ui/react-breadcrumbs/'
					aria-current='page'
				>
					Breadcrumbs
				</Link>
			</Breadcrumbs>
		</div>
	);
}
