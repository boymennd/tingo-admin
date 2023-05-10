import { useTranslation } from 'react-i18next';
import UserProfile from '../../components/UserProfile';
import PageTitle from '../../components/common/PageTitle';

const UserProfilePage = () => {
  const { t } = useTranslation(['userProfile']);
  return (
    <div>
      <PageTitle title={t('userProfile')} />
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;
