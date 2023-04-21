import {
	Dashboard,
	Equalizer,
	Group,
	Logout,
	Person,
	Settings,
} from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Menu, MenuItem } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import i18n from 'i18next';
import React, { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import enLocale from '../assets/images/enLocale.png';
import zhLocale from '../assets/images/zhLocale.png';
import menu from '../assets/images/menu.png';
import TLoadingUI from '../components/common/TLoading/TLoadingUI';
import { User } from '../models/userInterface';
import { AuthenticationService } from '../services/access/authenticationService';
import { openLoading } from '../store/slices/loadingSlice';
import { setUserInfo } from '../store/slices/userInfoSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { objectNullOrEmpty, userRole, viewPermission } from '../utils/utils';
import { useStyles } from './styles/makeTheme';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const lstLocale = [
	{
		prefix: 'en',
		imgUrl: enLocale,
		name: 'English',
	},
	{
		prefix: 'zh',
		imgUrl: zhLocale,
		name: 'Hong Kong',
	},
];

interface Props {
	children?: any;
}

export default function Layout({ children }: Props) {
	const classes = useStyles();
	const { t } = useTranslation(['common']);
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [anchorElLocale, setAnchorElLocale] = useState<null | HTMLElement>(
		null
	);
	const openUserMenu = Boolean(anchorElUser);
	const openLocaleMenu = Boolean(anchorElLocale);
	const [currentLocate, setCurrentLocate] = useState<any>({});
	const [lstLocateChange, setLstLocateChange] = useState<object[]>([]);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (i18n.language) {
			const locate: any = lstLocale.find(
				(it: any) => it.prefix === i18n.language
			);
			if (!objectNullOrEmpty(locate)) {
				setCurrentLocate(locate);
			}
			setLstLocateChange(
				lstLocale.filter((it: any) => it.prefix !== i18n.language)
			);
		}
	}, [i18n.language]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setAnchorElUser(null);
	};

	const handleLocaleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElLocale(event.currentTarget);
	};

	const handleLocaleMenuClose = () => {
		setAnchorElLocale(null);
	};

	const delay = (ms: number | undefined) =>
		new Promise((res) => setTimeout(res, ms));
	const handleLogout = async () => {
		setAnchorElUser(null);
		dispatch(openLoading(true));
		dispatch(setUserInfo({ isLogin: false }));
		await delay(500);
		AuthenticationService.logout();
		navigate('/login', { replace: true });
		dispatch(openLoading(false));
	};

	const genCurrentUserName = () => {
		const currentUser: User = AuthenticationService.getCurrentUser();
		if (objectNullOrEmpty(currentUser)) {
			return '';
		}
		return currentUser.fullName;
	};

	const onChangeLanguage = (value: string) => {
		i18n.changeLanguage(value);
	};

	const onNavigateToPage = (path: string) => {
		dispatch(openLoading(true));
		navigate(path, { replace: true });
		dispatch(openLoading(false));
	};

	const SidebarItem = (item: string, path: string, icon: any) => {
		const location = useLocation();

		return (
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: open ? 'initial' : 'center',
					px: 2.5,
				}}
				selected={path === location?.pathname}
				onClick={() => onNavigateToPage(path)}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: open ? 3 : 'auto',
						justifyContent: 'center',
					}}
				>
					{icon}
				</ListItemIcon>
				<ListItemText primary={item} sx={{ opacity: open ? 1 : 0 }} />
			</ListItemButton>
		);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}>
				<Toolbar className={classes.MTopBarContainer}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h5' noWrap component='div'>
						{'TINGO'}
					</Typography>
					<div className={classes.MTopBarUser}>
						<IconButton
							onClick={handleLocaleMenuOpen}
							size='small'
							sx={{ ml: 2 }}
							aria-controls={openLocaleMenu ? 'account-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={openLocaleMenu ? 'true' : undefined}
						>
							<Avatar
								alt=''
								src={
									objectNullOrEmpty(currentLocate) ? '' : currentLocate.imgUrl
								}
							/>
						</IconButton>
						<Menu
							anchorEl={anchorElLocale}
							id='language-menu'
							open={openLocaleMenu}
							onClose={handleLocaleMenuClose}
							onClick={handleLocaleMenuClose}
							PaperProps={{
								elevation: 0,
								className: classes.MMenuPaperProps,
							}}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							{lstLocateChange &&
								lstLocateChange.length > 0 &&
								lstLocateChange.map((it: any) => {
									return (
										<MenuItem
											key={it.name}
											onClick={() => onChangeLanguage(it.prefix)}
										>
											<IconButton size='small'>
												<Avatar alt='' src={it.imgUrl} />
											</IconButton>
											{it.name}
										</MenuItem>
									);
								})}
						</Menu>
						<IconButton
							onClick={handleUserMenuOpen}
							size='small'
							sx={{ ml: 2 }}
							aria-controls={openUserMenu ? 'account-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={openUserMenu ? 'true' : undefined}
						>
							<Avatar alt='' src={''} />
						</IconButton>
						<Menu
							anchorEl={anchorElUser}
							id='account-menu'
							open={openUserMenu}
							onClose={handleUserMenuClose}
							onClick={handleUserMenuClose}
							PaperProps={{
								elevation: 0,
								className: classes.MMenuPaperProps,
							}}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							<MenuItem>
								{t('hi')}&nbsp;
								<Typography>
									<b>{genCurrentUserName()}</b>
								</Typography>
							</MenuItem>
							<Divider />
							<MenuItem onClick={() => onNavigateToPage('/profile')}>
								<ListItemIcon>
									<Person fontSize='small' />
								</ListItemIcon>
								{t('profile')}
							</MenuItem>
							<MenuItem onClick={handleUserMenuClose}>
								<ListItemIcon>
									<Settings fontSize='small' />
								</ListItemIcon>
								{t('setting')}
							</MenuItem>
							<MenuItem onClick={handleLogout}>
								<ListItemIcon>
									<Logout fontSize='small' />
								</ListItemIcon>
								{t('logOut')}
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				open={open}
				className={classes.MSideBarContainer}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>{SidebarItem(t('dashboard'), '/', <Dashboard />)}</List>
				<Divider />
				<List>
					{SidebarItem(t('profile'), '/profile', <Person />)}
					{!userRole() ? (
						SidebarItem(t('userManagement'), '/user-management', <Group />)
					) : (
						<></>
					)}
					{viewPermission() ? (
						SidebarItem(t('formExample'), '/form-example', <Equalizer />)
					) : (
						<></>
					)}
				</List>
			</Drawer>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Suspense fallback={<TLoadingUI />}>{children}</Suspense>
			</Box>
		</Box>
	);
}
