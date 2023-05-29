import { Typography } from '@mui/material';
import { USER_STATUS } from '../../utils/enum/commonEnum';
import { useStyles } from '../../layouts/styles/makeTheme';

interface Props {
  status: any;
}

const UserStatus = ({ status }: Props) => {
  const classes = useStyles();
  let statusLabel;
  let styleCustom;

  switch (status) {
    case USER_STATUS.ACCOUNT_SETUP:
      statusLabel = 'Account Setup';
      styleCustom = {
        color: 'var(--status-wait-color)',
        backgroundColor: 'var(--status-wait-bg-color)',
        width: '140px',
      };

      break;
    case USER_STATUS.LOCKED:
      statusLabel = 'Lock Down';
      styleCustom = {
        color: 'var(--status-reject-color)',
        backgroundColor: 'var(--status-reject-bg-color)',
        width: '120px',
      };

      break;
    case USER_STATUS.INCOMPLETE:
      statusLabel = 'Incomplete';
      styleCustom = {
        color: 'var(--status-wait-color)',
        backgroundColor: 'var(--status-wait-bg-color)',
        width: '120px',
      };

      break;
    case USER_STATUS.IN_REVIEW:
      statusLabel = 'In review';
      styleCustom = {
        color: 'var(--status-wait-color)',
        backgroundColor: 'var(--status-wait-bg-color)',
        width: '120px',
      };

      break;
    case USER_STATUS.ACTIVE:
      statusLabel = 'Active';
      styleCustom = {
        color: 'var(--status-active-color)',
        backgroundColor: 'var(--status-active-bg-color)',
        width: '120px',
      };

      break;
    case USER_STATUS.SUSPENDED:
      statusLabel = 'Suspended';
      styleCustom = {
        color: 'var(--status-reject-color)',
        backgroundColor: 'var(--status-reject-bg-color)',
        width: '120px',
      };

      break;
    case USER_STATUS.CLOSED:
      statusLabel = 'Closed';
      styleCustom = {
        color: 'var(--status-reject-color)',
        backgroundColor: 'var(--status-reject-bg-color)',
        width: '120px',
      };

      break;
  }

  return (
    <Typography
      className={classes.MLabelStatus}
      sx={styleCustom}
      fontWeight={600}>
      {statusLabel}
    </Typography>
  );
};

export default UserStatus;
