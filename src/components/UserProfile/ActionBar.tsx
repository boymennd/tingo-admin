import { userProfileStyles } from './userProfileTheme';

import deleteIcon from '../../assets/images/delete.png';
import editIcon from '../../assets/images/edit.png';
import { useTranslation } from 'react-i18next';

const ActionBar = () => {
  const classes = userProfileStyles();
  const { t } = useTranslation(['userProfile']);
  return (
    <div className={classes.actionBar}>
      <div className={classes.delete}>
        <img src={deleteIcon} alt="Delete" /> {t('delete')}
      </div>
      <div className={classes.edit}>
        <img src={editIcon} alt="Edit" /> {t('edit')}
      </div>
    </div>
  );
};

export default ActionBar;
