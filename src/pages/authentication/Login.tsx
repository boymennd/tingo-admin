import { Error } from '@mui/icons-material';
import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import enLocale from '../../assets/images/enLocale.png';
import bg_login from '../../assets/images/bg_login.png';
import logo from '../../assets/images/logo.png';
import zhLocale from '../../assets/images/zhLocale.png';
import { useStyles } from '../../layouts/styles/makeTheme';
import { AuthenticationService } from '../../services/access/authenticationService';
import { openLoading } from '../../store/slices/loadingSlice';
import { setUserInfo } from '../../store/slices/userInfoSlice';
import { useAppDispatch } from '../../store/store';
import { objectNullOrEmpty } from '../../utils/utils';

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

export default function Login() {
	const classes = useStyles();
	const { t } = useTranslation(['account']);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [errorLogin, setErrorLogin] = useState<any>({});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	});
	const [currentLocate, setCurrentLocate] = useState<any>(
		lstLocale.find((it: any) => it.prefix === i18n.language)
	);

	useEffect(() => {
		if (i18n.language) {
			const locate: any = lstLocale.find(
				(it: any) => it.prefix === i18n.language
			);
			if (!objectNullOrEmpty(locate)) {
				setCurrentLocate(locate);
			}
		}
	}, [i18n.language]);

	const onChangeLanguage = (e: any) => {
		i18n.changeLanguage(e.target.value);
	};

	const onHandleLogin = async (data: any) => {
		dispatch(openLoading(true));
		try {
			// await dispatch(loginKeyCloakAsync(form));
			const loginUser = await AuthenticationService.login(
				data.username,
				data.password
			);
			if (loginUser) {
				const userInfo = {
					username: loginUser?.username,
					fullName: loginUser?.fullName,
					email: loginUser?.email,
					phone: loginUser?.phone,
					isLogin: true,
					permission: loginUser?.permission,
					role: loginUser?.role,
				};
				dispatch(setUserInfo(userInfo));
				setErrorLogin({});
				navigate('/', { replace: true });
			} else {
				errorLogin.isLogin = false;
				setErrorLogin(errorLogin);
			}
			dispatch(openLoading(false));
		} catch (e) {
			dispatch(openLoading(false));
		}
	};

	return (
		<Box className={classes.MLoginWrapper}>
			<form onSubmit={handleSubmit((data: any) => onHandleLogin(data))}>
				<Grid container className={classes.MLoginContainer}>
					<Grid
						item
						xs={6}
						sx={{ display: 'flex', alignItems: 'center' }}
						pr={4}
					>
						<Grid container p={2} sx={{ justifyContent: 'center' }}>
							<img src={logo} alt='' style={{ marginBottom: '24px' }} />
							{!objectNullOrEmpty(errorLogin) && !errorLogin.isLogin && (
								<div className={classes.MTextValidate}>
									{t('message.loginFail')}
								</div>
							)}
							<Grid item xs={12} className={classes.MLoginInput}>
								<div className={classes.MInputLabel}>{t('user')}</div>
								<TextField
									{...register('username', { required: true })}
									className={classes.MTextField}
									id={'username'}
									name={'username'}
									size={'small'}
									fullWidth
								/>
								{errors.username && (
									<div className={classes.MLoginInput}>
										<Error sx={{ fontSize: 'large' }} />
										{t('enterUser')}
									</div>
								)}
							</Grid>
							<Grid item xs={12} className={classes.MLoginInput}>
								<div className={classes.MInputLabel}>{t('password')}</div>
								<TextField
									{...register('password', { required: true })}
									className={classes.MTextField}
									id={'password'}
									name={'password'}
									type='password'
									autoComplete='current-password'
									size={'small'}
									fullWidth
								/>
								{errors.password && (
									<div className={classes.MTextValidate}>
										<Error sx={{ fontSize: 'large' }} />
										{t('enterPassword')}
									</div>
								)}
								{/* <Box sx={{ float: 'right' }}>
									<NavLink
										to={'/forgot-password'}
										style={{ textDecoration: 'none' }}
									>
										<Typography fontSize={'small'}>
											{t('forgotPassword')}
										</Typography>
									</NavLink>
								</Box> */}
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									marginTop: '28px',
								}}
							>
								<Button
									className={classes.MButton}
									variant={'contained'}
									type={'submit'}
								>
									{t('signIn')}
								</Button>
							</Grid>
							<Box sx={{ marginTop: '42px' }}>
								<NavLink
									to={'/forgot-password'}
									style={{ textDecoration: 'none' }}
								>
									<Typography
										fontSize={'small'}
										sx={{ color: '#000', fontSize: '16px', fontWeight: '700' }}
									>
										{t('forgotPassword')}
									</Typography>
								</NavLink>
							</Box>
							{/* <Grid
								item
								xs={12}
								sx={{ display: 'flex', justifyContent: 'flex-start' }}
							>
								<Typography fontSize={'small'} ml={1} mr={1}>
									{t('noAccountLabel')}{' '}
								</Typography>
								<NavLink to={'/signup'} style={{ textDecoration: 'none' }}>
									<Typography fontSize={'small'}>{t('register')}</Typography>
								</NavLink>
							</Grid> */}
							{/* <Grid
								item
								xs={12}
								sx={{ display: 'flex', justifyContent: 'flex-start' }}
								mt={1}
							>
								<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
									<Select
										labelId='demo-select-small'
										id='demo-select-small'
										value={
											objectNullOrEmpty(currentLocate)
												? ''
												: currentLocate.prefix
										}
										inputProps={{ sx: { fontSize: 'smaller' } }}
										onChange={onChangeLanguage}
									>
										{lstLocale.map((it: any) => {
											return (
												<MenuItem
													sx={{ fontSize: 'small' }}
													key={it.prefix}
													value={it.prefix}
												>
													{it.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid> */}
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100%',
							}}
						>
							<img src={bg_login} width='100%' alt={''} />
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}
