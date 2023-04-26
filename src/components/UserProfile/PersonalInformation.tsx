import { Person } from '@mui/icons-material';
import { Avatar, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import ActionBar from './ActionBar';
import { userProfileStyles } from './userProfileTheme';

const personalInfoList = [
	'accountId',
	'dateOfBirth',
	'gender',
	'registrationDate',
	'lateDate',
	'approvedDate',
	'phoneNumber',
	'email',
	'postalCode',
	'residentAddress',
	'billingAddress',
];

const paymentInfoList = ['typeOfCard', 'cardNumber'];

const PersonalInformation = () => {
	const { t } = useTranslation(['userProfile']);
	const classes = userProfileStyles();

	return (
		<>
			<Box className={classes.PersonnalInformation}>
				<Box className={classes.Avatar}>
					<Avatar sx={{ width: '60px', height: '60px' }}>
						<Person />
					</Avatar>
					Guy Hawkins
				</Box>
				<Box className={classes.infoBoxContainer}>
					<div className={classes.infoTitle}>{t('personalInformation')}</div>
					<Box className={classes.infoBox}>
						{personalInfoList.map((info, index) => (
							<div className={classes.infoItem} key={index}>
								<Grid container>
									<Grid item xs={3.5}>
										{t(info)}
									</Grid>
									<Grid
										item
										sx={{ fontWeight: 600, color: 'var(--primary-color)' }}
									>
										sfsfa
									</Grid>
								</Grid>
							</div>
						))}
					</Box>
					<Box className={classes.infoBoxContainer}>
						<div className={classes.infoTitle}>{t('paymentInfo')}</div>
						<Box className={classes.infoBox}>
							{paymentInfoList.map((info, index) => (
								<div className={classes.infoItem} key={index}>
									<Grid container>
										<Grid item xs={3.5}>
											{t(info)}
										</Grid>
										<Grid
											item
											sx={{ fontWeight: 600, color: 'var(--primary-color)' }}
										>
											sfsfa
										</Grid>
									</Grid>
								</div>
							))}
						</Box>
					</Box>
				</Box>
			</Box>
			<ActionBar />
		</>
	);
};

export default PersonalInformation;
