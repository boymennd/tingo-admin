import { Person } from '@mui/icons-material';
import {
  Avatar,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountStatus } from '../common/constants';
import ActionBar from './ActionBar';
import ModalConfirm from './ModalConfirm';
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
const documentIdenfication = ['url1', 'url2'];

export const processStatus = {
  CREATE: 'create',
  EDIT: 'edit',
  VIEW: 'view',
};

const PersonalInformation = () => {
  const { t } = useTranslation(['userProfile']);
  const classes = userProfileStyles();
  const [showModal, setShowModal] = useState(false);
  const [process, setProcess] = useState(processStatus.VIEW);
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <>
      {process === processStatus.EDIT ? (
        <Box className={classes.PersonnalInformation}>
          <Box className={classes.Avatar}>
            <Avatar sx={{ width: '60px', height: '60px' }}>
              <Person />
            </Avatar>
            Guy Hawkins EDIT
            <Box>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                className={classes.selectStatus}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {AccountStatus.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Box className={classes.infoBoxContainer}>
            <Box className={classes.editItem}>
              <div className={''}>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('firstName')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('middleName')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('lastName')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('accountId')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('dateOfBirth')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('registerDate')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('lastUpdate')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('approvedDate')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('phoneNumber')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('email')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('postalCode')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
                <Grid container paddingBottom={'12px'}>
                  <Grid item xs={3.5}>
                    <div className={classes.editTittle}>{t('residentAddress')}*</div>
                  </Grid>
                  <Grid
                    item
                    sx={{ fontWeight: 600, color: 'var(--primary-color)', paddingLeft: '12px', }}
                    xs={8.5}
                  >
                   <OutlinedInput className={classes.customInputProfile} placeholder="Please enter text" fullWidth />
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Box>
        </Box>
      ) : (
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
            <Box className={classes.infoBoxContainer}>
              <div className={classes.infoTitle}>
                {t('documentIdenfication')}
              </div>
              <Box className={classes.infoBox}>
                <Grid container>
                  {documentIdenfication.map((info, index) => (
                    <Grid key={index} item xs={6}>
                      <div className={classes.documentIdenficationItem}>
                        <img
                          src={
                            'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg'
                          }
                          alt=""
                          className={classes.documentIdenficationImage}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
            <Box className={classes.infoBoxContainer}>
              <div className={classes.infoTitle}>{t('selfilePhoto')}</div>
              <Box className={classes.infoBox}>
                <Grid container>
                  <Grid item xs={6}>
                    <div className={classes.documentIdenficationItem}>
                      <img
                        src={
                          'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg'
                        }
                        alt=""
                        className={classes.documentIdenficationImage}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className={classes.infoBoxContainer}>
              <div className={classes.infoTitle}>{t('addressProof')}</div>
              <Box className={classes.infoBox}>
                <Grid container>
                  {documentIdenfication.map((info, index) => (
                    <Grid key={index} item xs={6}>
                      <div className={classes.documentIdenficationItem}>
                        <img
                          src={
                            'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg'
                          }
                          alt=""
                          className={classes.documentIdenficationImage}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <ModalConfirm showModal={showModal} setShowModal={setShowModal} />
      <ActionBar setShowModal={setShowModal} setProcess={setProcess} />
    </>
  );
};

export default PersonalInformation;
