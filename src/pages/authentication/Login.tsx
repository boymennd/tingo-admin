import { Error } from '@mui/icons-material';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import bg_login from '../../assets/images/bg_login.png';
import enLocale from '../../assets/images/enLocale.png';
import HidePasswordIcon from '../../assets/images/hide-password.png';
import ShowPasswordIcon from '../../assets/images/show-password.png';
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

export interface loginData {
  email: string;
  password: string;
}

export default function Login() {
  const classes = useStyles();
  const { t } = useTranslation(['account']);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      loginError: '',
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

  const onHandleLogin = async (data: loginData) => {
    const regex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    if (data.email === '') {
      setError('loginError', { type: 'required', message: 'Sign_in_Pw_01' });
    } else if (data.password === '') {
      setError('loginError', { type: 'required', message: 'Sign_in_Pw_02' });
    } else if (
      !regex.test(data.email) ||
      data.email.length > 125 ||
      data.password.length > 50
    ) {
      setError('loginError', { type: 'required', message: 'Sign_in_Pw_03' });
    }

    dispatch(openLoading(true));
    try {
      // await dispatch(loginKeyCloakAsync(form));
      const loginUser = await AuthenticationService.login(
        data.email,
        data.password
      );

      if (loginUser) {
        const userInfo = {
          email: loginUser?.email,
          phoneNumber: loginUser?.phoneNumber,
          userId: loginUser?.userId,
          isLogin: true,
          userStatus: loginUser?.userStatus,
          isEnabled2FA: loginUser?.isEnabled2FA,
          status: loginUser?.status,
        };
        dispatch(setUserInfo(userInfo));
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate('/', { replace: true });
      } else {
        setError('loginError', { type: 'required', message: 'Sign_in_Pw_03' });
      }
      dispatch(openLoading(false));
    } catch (e) {
      dispatch(openLoading(false));
      setError('loginError', { type: 'required', message: 'Sign_in_Pw_03' });
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
            pr={4}>
            <Grid container p={2} sx={{ justifyContent: 'center' }}>
              <img src={logo} alt="" style={{ marginBottom: '24px' }} />

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {errors.loginError && (
                  <div className={classes.MTextValidate}>
                    <Error fontSize="medium" />
                    {t(`${errors?.loginError.message}`)}
                  </div>
                )}
              </Grid>

              <Grid item xs={12} className={classes.MLoginInput}>
                <div className={classes.MInputLabel}>{t('email')}</div>
                <TextField
                  {...register('email', {
                    onChange: () => {
                      clearErrors('loginError');
                    },
                  })}
                  className={classes.MTextField}
                  id={'email'}
                  name={'email'}
                  size={'small'}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.MLoginInput}
                sx={{ position: 'relative' }}>
                <div className={classes.MInputLabel}>{t('password')}</div>
                <TextField
                  {...register('password', {
                    onChange: () => {
                      clearErrors('loginError');
                    },
                  })}
                  className={classes.MTextField}
                  id={'password'}
                  name={'password'}
                  type={!showPassword ? 'password' : 'text'}
                  autoComplete="current-password"
                  size={'small'}
                  fullWidth
                />
                <div
                  className={classes.showPassword}
                  onClick={() => setShowPassword(!showPassword)}>
                  <img
                    src={!showPassword ? HidePasswordIcon : ShowPasswordIcon}
                    alt=""
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  marginTop: '28px',
                }}>
                <Button
                  className={classes.MButton}
                  variant={'contained'}
                  type={'submit'}>
                  {t('signIn')}
                </Button>
              </Grid>
              <Box sx={{ marginTop: '42px' }}>
                <NavLink
                  to={'/forgot-password'}
                  style={{ textDecoration: 'none' }}>
                  <Typography
                    fontSize={'small'}
                    sx={{
                      color: 'var(--primary-color)',
                      fontSize: '16px',
                      fontWeight: '700',
                    }}>
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
              }}>
              <img src={bg_login} width="100%" alt={''} />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
