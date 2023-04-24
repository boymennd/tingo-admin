import { Error, Rowing } from '@mui/icons-material';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import bg_login from '../../assets/images/bg_login.png';
import logo from '../../assets/images/logo.png';
import resetPwSuccess from '../../assets/images/resetPwSuccess.png';
import { useStyles } from '../../layouts/styles/makeTheme';

interface UIProps {
	t: any;
	classes: any;
	errors?: any;
	callback?: any;
	nextStep?: any;
	email?: string;
}

function VerificationCode({
	t,
	classes,
	errors,
	callback,
	nextStep,
	email,
}: UIProps) {
	return (
		<Grid container p={2} className={classes.MLoginInput}>
			<Grid>
				<div
					style={{
						fontWeight: 600,
						fontSize: '24px',
						lineHeight: '29px',
					}}
				>
					{t('forgotPassword')}
				</div>
				<div
					style={{
						margin: '16px 0 24px 0',
						fontSize: '16px',
						lineHeight: '24px',
					}}
				>
					{t('sentVerifyCode')} {email}
				</div>
			</Grid>
			<div className={classes.MInputLabel}>{t('verificationCode')}</div>
			<Grid item xs={12}>
				<TextField
					{...callback('verificationCode', {
						required: t('enterCode').toString(),
						pattern: {
							value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
							message: t('message.invalidCode'),
						},
					})}
					className={classes.MTextField}
					id={'email'}
					name={'email'}
					size={'small'}
					fullWidth
				/>
				{errors.email && (
					<div className={classes.MTextValidate}>
						<Error sx={{ fontSize: 'large' }} />
						{errors.email?.message}
					</div>
				)}
			</Grid>
			<Grid item xs={12} sx={{ marginTop: '48px' }}>
				<Button
					className={classes.MButton}
					sx={{ margin: 0 }}
					variant={'contained'}
					type={'submit'}
					fullWidth
					onClick={nextStep}
				>
					{t('confirm')}
				</Button>
			</Grid>
		</Grid>
	);
}
function ResetPassword({
	t,
	classes,
	errors,
	callback,
	nextStep,
	email,
}: UIProps) {
	return (
		<Grid container p={2} className={classes.MLoginInput}>
			<Grid>
				<div
					style={{
						fontWeight: 600,
						fontSize: '24px',
						lineHeight: '29px',
					}}
				>
					{t('forgotPassword')}
				</div>
				<div
					style={{
						margin: '16px 0 24px 0',
						fontSize: '16px',
						lineHeight: '24px',
					}}
				>
					{t('enterNewPassword')}
				</div>
			</Grid>
			<Grid item xs={12} sx={{ marginBottom: '24px' }}>
				<div className={classes.MInputLabel}>{t('password')}</div>
				<TextField
					{...callback('password', {
						required: t('enterPassword').toString(),
						pattern: {
							value:
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							message: t('message.invalidPassword'),
						},
					})}
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
						{errors.password?.message}
					</div>
				)}
			</Grid>
			<Grid item xs={12}>
				<div className={classes.MInputLabel}>{t('retypePassword')}</div>
				<TextField
					{...callback('password', {
						required: t('enterPassword').toString(),
						pattern: {
							value:
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							message: t('message.invalidPassword'),
						},
					})}
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
						{errors.password?.message}
					</div>
				)}
			</Grid>
			<Grid item xs={12} sx={{ marginTop: '48px' }}>
				<Button
					className={classes.MButton}
					sx={{ margin: 0 }}
					variant={'contained'}
					type={'submit'}
					fullWidth
					onClick={nextStep}
				>
					{t('reset')}
				</Button>
			</Grid>
		</Grid>
	);
}
function ResetSuccessfully({ t, classes, nextStep }: UIProps) {
	return (
		<Grid
			container
			p={2}
			className={classes.MLoginInput}
			sx={{ justifyContent: 'center' }}
		>
			<Grid sx={{ textAlign: 'center' }}>
				<img src={resetPwSuccess} alt='' />
				<div
					style={{
						fontWeight: 600,
						fontSize: '24px',
						lineHeight: '29px',
						marginTop: '20px',
					}}
				>
					{t('passwordChanged')}
				</div>
				<div
					style={{
						margin: '16px 0 24px 0',
						fontSize: '16px',
						lineHeight: '24px',
						color: 'rgba(0, 0, 0, 0.6)',
					}}
				>
					{t('loginWithNewPassword')}
				</div>
			</Grid>
			<Grid item xs={12} sx={{ marginTop: '48px' }}>
				<NavLink to={'/login'} style={{ textDecoration: 'none' }}>
					<Button
						className={classes.MButton}
						sx={{ margin: 0 }}
						variant={'contained'}
						type={'submit'}
						fullWidth
					>
						{t('signInWithNewPassword')}
					</Button>
				</NavLink>
			</Grid>
		</Grid>
	);
}

function ForgotPw({ t, classes, errors, callback, nextStep }: UIProps) {
	return (
		<Grid container p={2} className={classes.MLoginInput}>
			<Grid>
				<div
					style={{
						fontWeight: 600,
						fontSize: '24px',
						lineHeight: '29px',
					}}
				>
					{t('forgotPassword')}
				</div>
				<div
					style={{
						margin: '16px 0 24px 0',
						fontSize: '16px',
						lineHeight: '24px',
					}}
				>
					{t('forgotPasswordDescription')}
				</div>
			</Grid>
			<div className={classes.MInputLabel}>{t('email')}</div>
			<Grid item xs={12}>
				<TextField
					{...callback('email', {
						required: t('enterEmail').toString(),
						pattern: {
							value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
							message: t('message.invalidEmail'),
						},
					})}
					className={classes.MTextField}
					id={'email'}
					name={'email'}
					size={'small'}
					fullWidth
				/>
				{errors.email && (
					<div className={classes.MTextValidate}>
						<Error sx={{ fontSize: 'large' }} />
						{errors.email?.message}
					</div>
				)}
			</Grid>
			<Grid item xs={12} sx={{ marginTop: '48px' }}>
				<Button
					className={classes.MButton}
					sx={{ margin: 0 }}
					variant={'contained'}
					type={'submit'}
					fullWidth
					onClick={nextStep}
				>
					{t('sendVerificationCode')}
				</Button>
			</Grid>
		</Grid>
	);
}

export default function ForgotPassword(this: any) {
	const classes = useStyles();
	const [step, setStep] = useState(0);
	const [email, setEmail] = useState('example@example.com');
	const { t } = useTranslation(['account']);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
		},
	});

	const onHandleResetPassword = async (data: any) => {};

	const GenUI = () => {
		switch (step) {
			case 1:
				return (
					<VerificationCode
						t={t}
						classes={classes}
						errors={errors}
						callback={register}
						nextStep={() => setStep(2)}
						email={email}
					/>
				);
			case 2:
				return (
					<ResetPassword
						t={t}
						classes={classes}
						errors={errors}
						callback={register}
						nextStep={() => setStep(3)}
					/>
				);
			case 3:
				return <ResetSuccessfully t={t} classes={classes} />;

			default:
				return (
					<ForgotPw
						t={t}
						classes={classes}
						errors={errors}
						callback={register}
						nextStep={() => setStep(1)}
					/>
				);
		}
	};

	return (
		<Box className={classes.MLoginWrapper}>
			<form onSubmit={handleSubmit((data: any) => onHandleResetPassword(data))}>
				<Grid container className={classes.MLoginContainer}>
					<Grid
						item
						xs={6}
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
						pr={4}
					>
						<Grid
							sx={{
								width: '100%',
								padding: '48px',
								border: '1px solid rgba(0, 0, 0, 0.05)',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
								borderRadius: '16px',
							}}
						>
							<img
								src={logo}
								alt=''
								style={{
									display: 'block',
									margin: '0 auto 48px auto',
								}}
							/>
							{GenUI()}
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
