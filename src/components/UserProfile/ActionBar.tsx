import { userProfileStyles } from './userProfileTheme';

import deleteIcon from '../../assets/images/delete.png';
import editIcon from '../../assets/images/edit.png';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/store';
import BtnBorder from '../common/BtnBorder';
import { processStatus } from './PersonalInformation';

interface Props {
  setShowModal: (value: boolean) => void;
  setProcess: (value: string) => void;
}

const ActionBar = ({ setShowModal, setProcess }: Props) => {
  const classes = userProfileStyles();
  const { t } = useTranslation(['userProfile']);
  const menuOpen = useAppSelector((state) => state.layout.menuOpen);
  return (
    <div
      className={classes.actionBar}
      style={{
        width: menuOpen
          ? 'calc(100% - var(--sidebar-width))'
          : 'calc(100% - var(--sidebar-width-collapse))',
      }}
    >
      <div className={classes.groupAction}>
        <div className={classes.delete} onClick={() => setShowModal(true)}>
          <img src={deleteIcon} alt="Delete" /> {t('delete')}
        </div>
        <BtnBorder
          image={editIcon}
          text={t('edit')}
          callback={() => {
            setProcess(processStatus.EDIT);
          }}
        />
      </div>
      <div className={classes.groupAction}>
        <div className={classes.unapprove}>{t('unapprove')}</div>
        <div className={classes.approve}>{t('approve')}</div>
      </div>
    </div>
  );
};

export default ActionBar;
